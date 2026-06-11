process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

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
        
            const translationResponse =
                await giga.chat({
                    messages: [
                        {
                            role: 'user',
                            content: `Для слова "${objectName}"
                            Верни только JSON.
                            Выбери только ОДИН наиболее распространённый японский вариант.
                            Не используй "or", "/", запятые или несколько вариантов.
                            Формат:
                            {
                                "object": "",
                                "japanese": "",
                                "romaji": "",
                                "translation": ""
                            }`
                        }
                    ]
                });
        
            const answer =
                translationResponse
                .choices[0]
                .message.content;
        
            const cleanAnswer = answer
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
        
            res.json({
                answer: cleanAnswer
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

