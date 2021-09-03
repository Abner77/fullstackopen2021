import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Container, Table, Button } from "semantic-ui-react";
import { Patient } from "../types";
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
      
  return (
    <div>
      <h2>{patientDetails?.name} {patientDetails?.gender == 'male' ? <Icon name='man' size='large' /> : <Icon name='woman' size='large'/>}</h2>
      <p>ssn: {patientDetails?.ssn}</p>
      <p>occupation: {patientDetails?.occupation}</p>
    </div>
  );
  
};

export default PatientListDetails;




