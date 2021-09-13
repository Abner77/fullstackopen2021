import { NewPatient, Gender, NewSubEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from './types';
// type NewPatient = {
//   name: string,
//   dateOfBirth: string,
//   ssn: string,
//   gender: string,
//   occupation: string
// };

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (text:string): text is string => {
  return Boolean(Date.parse(text));
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing comment');
  }
  return text;
};

/**
 * Helper function for exhaustive type checking
 */
//  const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const parseDate = (textDate: unknown): string => {
  if (!textDate || !isString(textDate) || !isDate(textDate)) {
    throw new Error ('Incorrect or missing date'); 
  }
  return textDate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectToNewPatient = (object: any): NewPatient => {
  console.log('gender', object.gender); 

  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  };
  return newPatient;  
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectToNewSubentry = (object: any): NewSubEntry => {
  let result: NewSubEntry = {} as NewSubEntry;
  if (object.type !== undefined) {
    switch (object.type) {
      case "Hospital":
        const entho = object as HospitalEntry; 
        const newHospitalEntry: Omit<HospitalEntry, "id"> = {} as Omit<HospitalEntry, "id">;                
        Object.assign (newHospitalEntry, entho);
        result = newHospitalEntry;
        break;
      case "OccupationalHealthcare":
        const entohc = object as OccupationalHealthcareEntry; 
        const newOccupational: Omit<OccupationalHealthcareEntry, "id"> = {} as Omit<OccupationalHealthcareEntry, "id">;                
        Object.assign (newOccupational, entohc);
        result = newOccupational;
        break;
      case "HealthCheck":
        const enhc = object as HealthCheckEntry; 
        const newHealthCheck: Omit<HealthCheckEntry, "id"> = {} as Omit<HealthCheckEntry, "id">;                
        Object.assign (newHealthCheck, enhc);
        result = newHealthCheck;
        break;
      default: 
        throw new Error("unknown type");
        break;
    }
  }

  return result;
};


export { objectToNewPatient, objectToNewSubentry }; 
