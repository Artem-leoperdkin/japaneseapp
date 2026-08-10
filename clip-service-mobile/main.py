from fastapi import FastAPI, UploadFile, File
from PIL import Image
from pathlib import Path
import torch
import mobileclip
import json
import io

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent

OBJECTS_PATH = BASE_DIR.parent / "shared" / "objects.json"
MODEL_PATH = BASE_DIR / "mobileclip_s0.pt"

# -------------------------
# Objects
# -------------------------

with open(OBJECTS_PATH, "r", encoding="utf-8") as file:
    objects = json.load(file)

labels = [obj["clip_label"] for obj in objects]

print(f"Objects loaded: {len(objects)}")

# -------------------------
# Device
# -------------------------

device = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Device: {device}")

# -------------------------
# MobileCLIP
# -------------------------

print("Loading MobileCLIP S0...")

model, _, preprocess = mobileclip.create_model_and_transforms(
    "mobileclip_s0",
    pretrained=str(MODEL_PATH),
    device=device,
)

model.eval()

tokenizer = mobileclip.get_tokenizer("mobileclip_s0")

# -------------------------
# Text embeddings
# -------------------------

print("Creating text embeddings...")

text = tokenizer(labels)

if isinstance(text, dict):
    text = {
        key: value.to(device)
        for key, value in text.items()
    }
else:
    text = text.to(device)

with torch.no_grad():

    if isinstance(text, dict):
        text_features = model.encode_text(text)
    else:
        text_features = model.encode_text(text)

    text_features = text_features / text_features.norm(
        dim=-1,
        keepdim=True
    )

print("MobileCLIP loaded successfully!")


# -------------------------
# Routes
# -------------------------

@app.get("/")
async def root():
    return {
        "status": "ok",
        "model": "MobileCLIP S0",
        "objects": len(objects),
        "device": device,
    }


@app.post("/detect")
async def detect(image: UploadFile = File(...)):

    image_bytes = await image.read()

    pil_image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    image_tensor = preprocess(
        pil_image
    ).unsqueeze(0).to(device)

    with torch.no_grad():

        image_features = model.encode_image(
            image_tensor
        )

        image_features = image_features / image_features.norm(
            dim=-1,
            keepdim=True
        )

        similarity = (
            image_features @ text_features.T
        ).squeeze(0)

    best_idx = similarity.argmax().item()

    best_score = similarity[best_idx].item()

    print(
        f"Detected: {objects[best_idx]['id']} "
        f"(score: {best_score:.4f})"
    )

    return {
        "id": objects[best_idx]["id"],
        "score": best_score,
    }