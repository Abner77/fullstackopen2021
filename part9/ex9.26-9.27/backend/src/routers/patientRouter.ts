import express from 'express';
import { getEntries, addEntry, getEntry, addSubentry } from '../services/patients';
import { objectToNewPatient, objectToNewSubentry } from '../utils';
import { Entry } from '../types';


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
    console.log('error', error); 
    res.status(400).send({'error': (error as Error).message});  
  }
});

router.post('/', (req, res) => {
  try {
    console.log('body', req.body);
    const newPatient = objectToNewPatient(req.body);    
    const patient = addEntry(newPatient);
    res.status(200).send(patient);    
  } catch (error) {    
    console.log('error', error);

    res.status(400).send({'error': (error as Error).message});  
  }   
  
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const subentry = objectToNewSubentry(req.body); 
    const result: Entry | null = addSubentry(id, subentry);
    const patient = getEntry(id); 
    if (result !== null)
      res.status(200).send (patient); 
  }
  catch(error) {
    console.log('error', error); 
    if ((error as Error).message !== null)
      res.status(400).send({'error': (error as Error).message});  
  }
});

export default router;
