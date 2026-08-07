import fs from "fs";

export async function detectObject(imagePath) {

    const formData = new FormData();

    formData.append(
        "image",
        new Blob([fs.readFileSync(imagePath)]),
        "image.jpg"
    );

    console.log("CLIP_API_URL =", process.env.CLIP_API_URL);

    let response;

    try {
        response = await fetch(
            process.env.CLIP_API_URL + "/detect",
            {
                method: "POST",
                body: formData
            }
        );
    } catch (e) {
        console.error("FETCH ERROR:", e);
        throw e;
    }

    console.log("Sending request...");

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const result = await response.json();

    return result.id;
}