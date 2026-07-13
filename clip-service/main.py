from fastapi import FastAPI, UploadFile, File
from PIL import Image
import torch
import open_clip
import json
import io

app = FastAPI()

with open("data/objects.json", "r", encoding="utf-8") as file:
    objects = json.load(file)

labels = [obj["clip_label"] for obj in objects]

device = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Device: {device}")
print("Loading CLIP model...")

model, _, preprocess = open_clip.create_model_and_transforms(
    "ViT-B-32",
    pretrained="laion2b_s34b_b79k"
)

model = model.to(device)
model.eval()

tokenizer = open_clip.get_tokenizer("ViT-B-32")

text = tokenizer(labels).to(device)

with torch.no_grad():
    text_features = model.encode_text(text)
    text_features /= text_features.norm(dim=-1, keepdim=True)

print("CLIP loaded")


@app.get("/")
async def root():
    return {
        "status": "ok"
    }


@app.post("/detect")
async def detect(image: UploadFile = File(...)):

    image_bytes = await image.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    image = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():

        image_features = model.encode_image(image)

        image_features /= image_features.norm(
            dim=-1,
            keepdim=True
        )

        similarity = (
            image_features @ text_features.T
        ).squeeze(0)

    best_idx = similarity.argmax().item()

    return {
        "id": objects[best_idx]["id"]
    }