import fs from "fs";
import { getWord } from "./getWord.js";

export function getRandomWord(objectId, language = "ja") {

    const raw = fs.readFileSync(
        `data/objects.json`,
        "utf-8"
    );

    const objects = JSON.parse(raw);

    const randomIndex = Math.floor(
        Math.random() * objects.length
    );

    const object = objects[randomIndex];

    const translation = getWord(
        object.id,
        language
    );

    return {
        object: object.id,
        ...translation
    };
}