import patientDataTemp from '../../data/patients.json';
import { Patient, NewPatient, Gender } from '../types';
import { v4 } from 'uuid';

const patientData: Array<Patient> = [];

patientDataTemp.forEach (p => {   
  const g = Gender[p.gender as keyof typeof Gender];
  patientData.push({ id: p.id, name: p.name, occupation:p.occupation, gender:g, ssn: p.ssn, dateOfBirth: p.dateOfBirth });
});



const getEntries = (): Array<Omit<Patient, 'ssn'>> => {
  return patientData.map ( ({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));  
};

const addEntry = (patient:NewPatient): Patient => {
  const newid = v4();
  const patientToAdd = { ...patient, id:newid };
  patientData.push(patientToAdd); 
  return patientToAdd;
};


export { getEntries, addEntry };
