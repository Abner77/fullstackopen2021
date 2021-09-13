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
import AddEntryFormHospitalEntry, { EntryFormHospitalValues } from './AddEntryFormHospitalEntry';
import AddEntryFormOccupationalHealth, { EntryFormOccupationalValues } from "./AddEntryFormOccupationalHealth";
import {Button } from "semantic-ui-react";




const PatientListDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [, dispatch] = useStateValue();
  const [expanded, setExpanded] = useState([false, false, false]);
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


  const toggleExpand = (index: number) => {    
    const tempval = expanded[index]; 
    for (let i = 0; i < expanded.length; i++) expanded[i]  = false; //
    expanded[index] = !tempval;     
    console.log('expanded', expanded);
    setExpanded([...expanded]);
  };

  // const hideWhenExpanded:  CSS.Properties = { display: expanded ? 'none' : '' };
  // const showWhenExpanded:  CSS.Properties = { display: expanded ? '' : 'none' };
  const hide:  CSS.Properties = { display: 'none'}; 
  const show:  CSS.Properties = { display: ''}; 

  const addNewEntry = async (values: EntryFormHospitalValues | EntryFormOccupationalValues ) => {
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
      {console.log('expanded render', expanded, expanded[0] ? show : hide)}
      <h3>entries</h3>
      {patient?.entries !== undefined ? patient?.entries.map(e =>  <EntryComp key={e.id} entry={e} ></EntryComp>) : null}
      <div  id="divform">
        <div style={ expanded[0] || expanded[1] ? hide : show}>
          <Button color='blue' icon="hospital" size="huge" onClick={() => toggleExpand(0)} ></Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color='blue' icon="user doctor" size="huge" onClick={() => toggleExpand(1)} ></Button>
        </div>        
        <div data-testid="divexpandido"  style={expanded[0] ? show : hide}>          
            <p><Button color='black' onClick={() => toggleExpand(0)}>hide</Button></p>
            <AddEntryFormHospitalEntry onSubmit={(data) => addNewEntry(data)}/>          
        </div>
        <div data-testid="divexpandido"  style={expanded[1] ? show : hide}>          
            <p><Button color='black' onClick={() => toggleExpand(1)}>hide</Button></p>
            <AddEntryFormOccupationalHealth onSubmit={(data) => addNewEntry(data)}/>          
        </div>
      </div>
    </div>
  );  
};

export default PatientListDetails;
