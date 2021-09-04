import express from 'express';
import { getEntries, addEntry, getEntry } from '../services/patients';
import { objectToNewPatient } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  console.log('invocando get entries de patients ');
  res.send(getEntries());
});

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).send(getEntry(id));
  }
  catch(error){
    console.log('error', error.message); 
    res.status(400).send({'error': error.message as string});  
  }
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
