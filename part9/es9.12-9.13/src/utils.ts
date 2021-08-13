import { NewPatient, Gender } from './types';
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

export { objectToNewPatient }; 
