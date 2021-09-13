import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnoseRouter';
import patientRouter from './routers/patientRouter';
// import { Diagnose } from './types';




const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3001;


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
// app.get('/api/patients', (_req, res) => {
//   console.log('patients');
//   res.send('pong');
// });

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

