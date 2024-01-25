import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight || 
        !(typeof req.query.height == "string") || !(typeof req.query.weight == "string")) {
            res.status(400).json({ 
                error: "malformatted parameters"
            });
        }

    const heightQ: number = parseInt(req.query.height as string);
    const weightQ: number = parseInt(req.query.weight as string);
    const bmiC = calculateBmi(heightQ, weightQ);

    res.json({
        weight: weightQ,
        height: heightQ,
        bmi: bmiC
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 