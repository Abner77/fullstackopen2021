export enum Gender  {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type Diagnose = {
  code: string,
  name: string, 
  latin?: string
};



export enum EntryType {
  Hospital,
  OccupationalHealthcare,
  HealthCheck
}

export interface EntryBase {
  id:string,
  date: string,
  specialist: string,
  type: string,
  description: string
}

export interface HealthCheckEntry extends EntryBase {
  healthCheckRating: number
}

export interface Discharge {
  date: string,
  criteria: string
}

export interface SickLeave {
  startDate:string,
  endDate: string
}

export interface HospitalEntry extends EntryBase {
  diagnosisCodes: string[]
  discharge: Discharge
}

export interface OccupationalHealthcareEntry extends EntryBase {
  employerName: string,
  diagnosisCodes?: string[],
  sickLeave?: SickLeave
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;


export type Patient = {
  id: string,
   name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
};

export type NewPatient = {
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string 
  // entries: Entry[]
};

export type NewSubEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

// {
//   "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
//   "name": "Hans Gruber",
//   "dateOfBirth": "1970-04-25",
//   "ssn": "250470-555L",
//   "gender": "male",
//   "occupation": "Technician"
// },
