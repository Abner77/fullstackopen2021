export type Diagnose = {
  code: string,
  name: string, 
  latin?: string
};

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
};

// {
//   "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
//   "name": "Hans Gruber",
//   "dateOfBirth": "1970-04-25",
//   "ssn": "250470-555L",
//   "gender": "male",
//   "occupation": "Technician"
// },
