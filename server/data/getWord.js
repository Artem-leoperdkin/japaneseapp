import fs from "fs";

export function getWord(objectId, language = 'ja') {
    const raw = fs.readFileSync(
        `data/languages/${language}.json`,
        'utf-8'
    );

    const dictionary = JSON.parse(raw);

    return dictionary[objectId] || null;
}