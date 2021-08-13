import express from 'express';
import { getEntries, addEntry } from '../services/patients';
import { objectToNewPatient } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getEntries());
});

router.post('/', (req, res) => {
  try {
    console.log('body', req.body);
    const newPatient = objectToNewPatient(req.body);    
    const patient = addEntry(newPatient);
    res.status(200).send(patient);    
  } catch (error) {    
    console.log('error', error.message);

    res.status(400).send({'error': error.message as string});  
  }   
  
});

export default router;
