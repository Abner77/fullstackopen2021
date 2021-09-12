import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST",
      payload: Patient[]
    }
  | {
      type: "ADD_PATIENT",
      payload: Patient
    }
  | {
      type: "SET_PATIENT_DETAILS",
      payload: Patient
    }
  | {
      type: "SET_DIAGNOSIS_LIST",
      payload: Diagnosis[]
    }
    ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log("payloadreduce patients", action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient })));
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAILS":
      return {...state, patientDetails: action.payload };
    
    case "SET_DIAGNOSIS_LIST":      
      console.log('payloadreduce', action.payload);            
      const diccionarioNuevo: { [code:string]: Diagnosis } = {};             
      action.payload.forEach(d => diccionarioNuevo[d.code] = d);      
      return {...state, diagnosis: diccionarioNuevo};
    
    
    default:
      return state;
  }
};

export const SetPatientList = (patientListFromApi: Patient[]) : Action => {
  return ({ type: "SET_PATIENT_LIST", payload: patientListFromApi });  
};

export const AddPatient = (newPatient: Patient) : Action => {
  return ({ type: "ADD_PATIENT", payload: newPatient });
};

export const SetDiagnosisList = (diagnosisListFromApi: Diagnosis[]) : Action => {
  return ({ type: "SET_DIAGNOSIS_LIST", payload: diagnosisListFromApi});
};

export const SetPatientDetails = (patientFromApi: Patient) : Action => {
  return ({ type: "SET_PATIENT_DETAILS", payload: patientFromApi});
};
