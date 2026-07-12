import fs from "fs";

export async function detectObject(imagePath) {

    const formData = new FormData();

    formData.append(
        "image",
        new Blob([fs.readFileSync(imagePath)]),
        "image.jpg"
    );

    const response = await fetch(
        process.env.CLIP_API_URL + "/detect",
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const result = await response.json();

    return result.id;
}