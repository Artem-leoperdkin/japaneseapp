import sys
import torch
import open_clip
from PIL import Image
import json

image_path = sys.argv[1]
with open(
    "data/objects.json",
    "r",
    encoding="utf-8"
) as file:
    objects = json.load(file)

labels = [obj["clip_label"] for obj in objects]

device = "cuda" if torch.cuda.is_available() else "cpu"

model, _, preprocess = open_clip.create_model_and_transforms(
    "ViT-B-32",
    pretrained="laion2b_s34b_b79k"
)

tokenizer = open_clip.get_tokenizer("ViT-B-32")

image = preprocess(
    Image.open(image_path)
).unsqueeze(0).to(device)

text = tokenizer(labels).to(device)

model = model.to(device)

with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)

    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)

    similarity = (
        image_features @ text_features.T
    ).squeeze(0)

best_idx = similarity.argmax().item()

print(objects[best_idx]["id"])