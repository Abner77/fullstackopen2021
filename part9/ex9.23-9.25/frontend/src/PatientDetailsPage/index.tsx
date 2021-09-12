import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Container, Table, Button } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { SetPatientDetails } from "../state/reducer";
import { Icon } from "semantic-ui-react";
import EntryComp from "../components/Entry"; 
import CSS from 'csstype';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';



const PatientListDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [, dispatch] = useStateValue();
  const [expanded, setExpanded] = useState(false);
  const [patient, setPatient] = React.useState<Patient | undefined>();
  

  React.useEffect(() => {  
    const fetchPatient = async () => {
      try {
        // const { data: patientListFromApi } = await axios.get<Patient[]>(
        //   `${apiBaseUrl}/patients`
        // );
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        
        if (patientFromApi !== undefined)        
          dispatch(SetPatientDetails(patientFromApi));
          setPatient(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [dispatch]);






  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const hideWhenExpanded:  CSS.Properties = { display: expanded ? 'none' : '' };
  const showWhenExpanded:  CSS.Properties = { display: expanded ? '' : 'none' }; 

  const addNewEntry = async (values: EntryFormValues) => {
    // alert("saltando"); 
    console.log('values addnewentry', values); 
    try {
        const result = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );      

        console.log('result', result.data);      
        setPatient(result.data);         
    } catch (e) {
      console.log((e as Error).message);
    }
  };



  // Hospital,
  // OccupationalHealthcare,
  // HealthCheck

  // const bufferEntries:JSX.Element[] = [];  
  // console.log('diagnosis', diagnosis);
  // let contador = 0;  
  // patientDetails?.entries.map (e => {
  //   bufferEntries.push (<p key={e.id}>{e.description}</p>);
  //   if (e.type == "Hospital") {
  //     const he:HospitalEntry = e as HospitalEntry;
  //     bufferEntries.push (<ul key={e.id.concat((contador++).toString())}>{he.diagnosisCodes.map (d => <li key={d}>{d} {diagnosis[d].name}</li>)}</ul>);
  //   }
  //   if (e.type == "OccupationalHealthcare") {
  //     const oe:OccupationalHealthcareEntry = e as OccupationalHealthcareEntry;
  //     if (oe.diagnosisCodes !== null)
  //       bufferEntries.push (<ul key={e.id.concat((contador++).toString())}>{oe.diagnosisCodes?.map (d => <li key={d}>{d} {diagnosis[d].name}</li>)}</ul>);
  //   }
  // });

  // console.log('buffer', bufferEntries); 
      
  return (
    <div>
      <h2>{patient?.name} {patient?.gender == 'male' ? <Icon name='man' size='large' /> : <Icon name='woman' size='large'/>}</h2>
      {console.log ('patient en render ', patient)}
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {patient?.entries !== undefined ? patient?.entries.map(e =>  <EntryComp key={e.id} entry={e} ></EntryComp>) : null}
      <div  id="divform">
        <div style={hideWhenExpanded}>
          <button onClick={toggleExpand} >add entry</button>
        </div>
        <div data-testid="divexpandido"  style={showWhenExpanded}>          
            <p><button onClick={toggleExpand}>hide</button></p>
            <AddEntryForm onSubmit={(data) => addNewEntry(data)}/>          
        </div>
      </div>
    </div>
  );  
};

export default PatientListDetails;
