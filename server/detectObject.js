import { exec } from "child_process";

export function detectObject(imagePath) {
    return new Promise((resolve, reject) => {
        exec(
            `python yolo.py "${imagePath}"`,
            (error, stdout, stderr) => {        
                if (stderr) {
                    console.log("PYTHON STDERR:");
                    console.log(stderr);
                }
        
                if (error) {
                    reject(error);
                    return;
                }
        
                const lines = stdout.trim().split("\n");
                const objectName = lines[lines.length - 1].trim();
        
                resolve(objectName);
            }
        );

    });
}