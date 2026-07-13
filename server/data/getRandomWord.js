import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getWord } from "./getWord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OBJECTS_PATH = path.join(
    __dirname,
    "..",
    "..",
    "shared",
    "objects.json"
);

export function getRandomWord(
    language = "ja",
    allowedObjectIds = []
) {
    const raw = fs.readFileSync(
        OBJECTS_PATH,
        "utf-8"
    );

    const objects = JSON.parse(raw);

    const availableObjects = objects.filter((object) => {
        const isInUserLibrary =
            allowedObjectIds.includes(object.id);

        const translation = getWord(
            object.id,
            language
        );

        return (
            isInUserLibrary &&
            translation &&
            translation.word
        );
    });

    if (availableObjects.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * availableObjects.length
    );

    const object = availableObjects[randomIndex];

    const translation = getWord(
        object.id,
        language
    );

    return {
        object: object.id,
        word: translation.word,
        romaji: translation.romaji || null,
    };
}