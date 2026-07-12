import { getRandomWord } from './data/getRandomWord.js';
import { detectObject } from './detectObject.js';
import express, { json } from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path';
import { getWord } from './data/getWord.js';
import { getObject } from './data/getObject.js';

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
        
            const language = req.body.language || 'ja';
            const appLanguage = req.body.appLanguage || 'ru';

            const word = getWord(objectName, language);
            const object = getObject(objectName);

            if (!word || !word.word) {
                return res.status(404).json({
                    error: `Для объекта "${objectName}" нет слова на выбранном языке`,
                });
            }

            const translation =
            object?.translations?.[appLanguage] ||
            object?.translations?.ru ||
            null;

            if (!translation) {
                return res.status(404).json({
                    error: `Для объекта "${objectName}" нет перевода для языка приложения`,
                });
            }

            res.json({
                answer: JSON.stringify({
                    object: objectName,
                    word: word.word,
                    romaji: word.romaji || null,
                    translation,
                    translations: object.translations,
                    language,
                    appLanguage,
                }),
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
