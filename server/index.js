process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { dictionary } from './dictionary.js';
import { detectObject } from './detectObject.js';
import 'dotenv/config'
import GigaChat from 'gigachat'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path';

const app = express()

app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {

        const ext =
            path.extname(file.originalname);

        cb(
            null,
            Date.now() + ext
        );
    }
});

const upload = multer({
    storage
});

const giga = new GigaChat({
    credentials: process.env.GIGACHAT_API_KEY,
    model: 'GigaChat'
})


app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await giga.chat({
            messages: [
                {
                role: 'user',
                content: message
                }
            ]
        });

        res.json({
            answer: response.choices[0].message.content
        });

    }   catch(error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});


app.post(
    '/analyze',
    upload.single('image'),
    async (req, res) => {
        console.log(req.file);
        try {
            const objectName =
                await detectObject(req.file.path);
            
            if (
                !objectName ||
                objectName === 'unknown'
            ) {
                return res.status(400).json({
                    error: 'Object not found'
                });
            }
        
            console.log('Object:', objectName);
        
            const word = dictionary[objectName];

            if (!word) {
            return res.status(404).json({
                error: `Object "${objectName}" not found in dictionary`
            });
            }

            res.json({
            answer: JSON.stringify({
                object: objectName,
                japanese: word.japanese,
                romaji: word.romaji,
                translation: word.translation,
            })
            });
        
        }
        catch (error) {
            console.error(error);
        
            res.status(500).json({
                error: error.message
            });
        }
    }
)

app.listen(3000, () => {
    console.log('Server started');
});

