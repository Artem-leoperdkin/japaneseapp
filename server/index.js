import { getRandomWord } from './data/getRandomWord.js';
import { dictionary } from './dictionary.js';
import { detectObject } from './detectObject.js';
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


app.post('/random-word', (req, res) => {
    try {
        const language = req.query.language || 'ja';
        const objectIds = req.body.objectIds || [];

        const word = getRandomWord(
            language,
            objectIds
        );

        if (!word) {
            return res.status(404).json({
                error: 'Нет доступных слов для этого языка',
            });
        }

        return res.json(word);
    } catch (error) {
        console.log('RANDOM WORD ERROR:', error);

        return res.status(500).json({
            error: error.message,
        });
    }
});


app.listen(3000, () => {
    console.log('Server started');
});

