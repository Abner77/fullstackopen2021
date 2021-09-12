export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[]
}



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
