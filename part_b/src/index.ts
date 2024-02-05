import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    if (!req.body) {
        res.status(400).json({
            error: "malformatted body"
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({
            error: "malformatted paramaters"
        });
    }

    res.json(calculateExercises(daily_exercises as number[], Number(target as string)));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 