import fs from 'fs';
import { getWord } from './getWord.js';

export function getRandomWord(
    language = 'ja',
    allowedObjectIds = []
) {
    const raw = fs.readFileSync(
        'data/objects.json',
        'utf-8'
    );

    const objects = JSON.parse(raw);

    const availableObjects = objects.filter((object) => {
        const isInUserLibrary = allowedObjectIds.includes(
            object.id
        );

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