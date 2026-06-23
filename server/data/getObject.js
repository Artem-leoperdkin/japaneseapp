import fs from 'fs';

export function getObject(objectId) {
    const raw = fs.readFileSync(
        'data/objects.json',
        'utf-8'
    );

    const objects = JSON.parse(raw);

    return objects.find(
        object => object.id === objectId
    ) || null;
}