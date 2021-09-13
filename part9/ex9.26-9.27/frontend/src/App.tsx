import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { SetPatientList, SetDiagnosisList } from "./state/reducer";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailsPage from "./PatientDetailsPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    console.log ('atacando al ping');
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(SetPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        console.log('diagnosisListFromApi', diagnosisListFromApi);
        dispatch(SetDiagnosisList(diagnosisListFromApi));        
      } catch(e) {
        console.error(e);
      }    
    };
    void fetchDiagnosisList(); 
  }, [dispatch]); 

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientDetailsPage/>
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>            
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
