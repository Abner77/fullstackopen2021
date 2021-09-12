import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  console.log(diagnoseData);
  return diagnoseData as Array<Diagnose>; 
};

export { getEntries };
