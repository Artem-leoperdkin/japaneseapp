import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OBJECTS_PATH = path.join(
    __dirname,
    "..",
    "..",
    "shared",
    "objects.json"
);

export function getObject(objectId) {
    const raw = fs.readFileSync(
        OBJECTS_PATH,
        "utf-8"
    );

    const objects = JSON.parse(raw);

    return (
        objects.find(
            object => object.id === objectId
        ) || null
    );
}