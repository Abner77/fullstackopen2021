import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Container, Table, Button } from "semantic-ui-react";
import { Patient, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { SetPatientDetails } from "../state/reducer";
import { Icon } from "semantic-ui-react";



const PatientListDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails, diagnosis }, dispatch] = useStateValue();

  React.useEffect(() => {  
    const fetchPatient = async () => {
      try {
        // const { data: patientListFromApi } = await axios.get<Patient[]>(
        //   `${apiBaseUrl}/patients`
        // );
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        
        if (patientFromApi !== undefined)        
          dispatch(SetPatientDetails(patientFromApi));
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
  console.log('diagnosis', diagnosis);
  let contador = 0;  
  patientDetails?.entries.map (e => {
    bufferEntries.push (<p key={e.id}>{e.description}</p>);
    if (e.type == "Hospital") {
      const he:HospitalEntry = e as HospitalEntry;
      bufferEntries.push (<ul key={e.id.concat((contador++).toString())}>{he.diagnosisCodes.map (d => <li key={d}>{d} {diagnosis[d].name}</li>)}</ul>);
    }
    if (e.type == "OccupationalHealthcare") {
      const oe:OccupationalHealthcareEntry = e as OccupationalHealthcareEntry;
      if (oe.diagnosisCodes !== null)
        bufferEntries.push (<ul key={e.id.concat((contador++).toString())}>{oe.diagnosisCodes?.map (d => <li key={d}>{d} {diagnosis[d].name}</li>)}</ul>);
    }
  });

  console.log('buffer', bufferEntries); 
      
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




