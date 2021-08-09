import express from 'express';
import { calculate } from './bmiCalculator';

const app = express();

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
    res.send ('malformatted parameters')
  }
}); 

const PORT = 3000;

app.listen( PORT, () => console.log (`server running on port ${PORT}`));

