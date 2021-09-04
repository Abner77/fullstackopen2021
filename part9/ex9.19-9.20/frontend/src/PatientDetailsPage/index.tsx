import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Container, Table, Button } from "semantic-ui-react";
import { Patient, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";


const PatientListDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();

  React.useEffect(() => {  
    const fetchPatient = async () => {
      try {
        // const { data: patientListFromApi } = await axios.get<Patient[]>(
        //   `${apiBaseUrl}/patients`
        // );
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        
        if (patientFromApi !== undefined)        
          dispatch({ type: "SET_PATIENT_DETAILS", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [dispatch]);

  // Hospital,
  // OccupationalHealthcare,
  // HealthCheck

  const bufferEntries:JSX.Element[] = [];  
  patientDetails?.entries.map (e => {
    bufferEntries.push (<p>{e.description}</p>);
    if (e.type == "Hospital") {
      const he:HospitalEntry = e as HospitalEntry;
      bufferEntries.push (<ul>{he.diagnosisCodes.map (d => <li key={d}>{d}</li>)}</ul>);
    }
    if (e.type == "OccupationalHealthcare") {
      const oe:OccupationalHealthcareEntry = e as OccupationalHealthcareEntry;
      if (oe.diagnosisCodes !== null)
        bufferEntries.push (<ul>{oe.diagnosisCodes?.map (d => <li key={d}>{d}</li>)}</ul>);
    }
  });
      
  return (
    <div>
      <h2>{patientDetails?.name} {patientDetails?.gender == 'male' ? <Icon name='man' size='large' /> : <Icon name='woman' size='large'/>}</h2>
      <p>ssn: {patientDetails?.ssn}</p>
      <p>occupation: {patientDetails?.occupation}</p>
      <h3>entries</h3>
      {bufferEntries}
      
    </div>
  );
  
};

export default PatientListDetails;




