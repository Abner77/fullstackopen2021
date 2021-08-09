import express from 'express';
import { calculate } from './bmiCalculator';
import { GetExerciseResult } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.send('Hello fullstack');
});

app.get('/api/bmi', (req, res) => {
  
  try {
    const weight = req.query.weight?.toString();
    const height = req.query.height?.toString(); 
    let w = 0;
    let h = 0;
    if (weight) {
      w = parseFloat(weight.toString());    
    }
    if (height) {
      h = parseFloat(height.toString()); 
    }
    
    const bmi = calculate(w, h);  
    // const bmi = 0
    // res.send ({...req.query, bmi: bmi});        
    res.send({weight: w, height: h, bmi: bmi.toString()});
  }
  catch(error){
    res.send ('malformatted parameters');
  }
}); 

//input (body request)
// {
//   "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
//   "target": 2.5
// }

interface IParamsExercise {
  daily_exercises:Array<number>;
  target:number;
}


app.post('/api/exercises', (req, res) => {
  try {        
    console.log(req.body);
    const parametros = req.body as IParamsExercise; 
    const result = GetExerciseResult(parametros.daily_exercises, parametros.target);
    res.send(result);    
  } 
  catch(error) {
    res.send({error: 'malformatted request'}); 
  }  
});

const PORT = 3000;



app.listen( PORT, () => console.log (`server running on port ${PORT}`));

