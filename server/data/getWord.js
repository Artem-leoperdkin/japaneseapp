import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES_DIR = path.join(
    __dirname,
    "languages"
);

export function getWord(
    objectId,
    language = "ja"
) {
    const languagePath = path.join(
        LANGUAGES_DIR,
        `${language}.json`
    );

    const raw = fs.readFileSync(
        languagePath,
        "utf-8"
    );

    const dictionary = JSON.parse(raw);

    return dictionary[objectId] || null;
}