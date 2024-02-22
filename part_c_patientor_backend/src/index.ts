import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';

import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (!err.statusCode) err.statusCode = 500;  
  const message: string = err.message as string;
  const code: number = err.statusCode as number;
  res.status(code).send({error : message});
};

app.use(errorHandler); 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});