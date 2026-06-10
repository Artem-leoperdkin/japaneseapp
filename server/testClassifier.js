import { classifyImage } from './imageClassifier.js';

const result = await classifyImage(
    './uploads/test.jpg'
);

console.log('RESULT:', result);