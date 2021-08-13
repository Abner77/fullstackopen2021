import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoseData as Array<Diagnose>; 
};

export { getEntries };
