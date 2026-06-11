from ultralytics import YOLO
import sys

model = YOLO("yolov8n.pt")

image_path = sys.argv[1]

results = model(image_path)

if len(results[0].boxes) == 0:
    print("unknown")
    exit()

best_box = max(
    results[0].boxes,
    key = lambda box: float(box.conf[0])
)

if float(best_box.conf[0]) < 0.6:
    print("unknown")
    exit()

class_id = int(best_box.cls[0])

object_name = results[0].names[class_id]

print(object_name)