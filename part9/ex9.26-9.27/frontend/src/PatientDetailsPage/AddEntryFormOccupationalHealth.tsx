import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry, SickLeave } from "../types";

export type EntryFormOccupationalValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormOccupationalValues) => void;
  // onCancel: () => void;
}


const AddEntryFormOccupationalHealth = ({ onSubmit }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        description: "",        
        employerName: "", 
        sickLeave: {startDate: "", endDate: ""} as SickLeave
      }}
      onSubmit={onSubmit}
      validate={values => {
      {
        const requiredError = "Field is required";
        const invalidDate = "Invalid date format";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError; 
        }
        if(!Date.parse(values.date)) {
            errors.date = invalidDate; 
        }                 
        if (!values.specialist) {
            errors.specialist = requiredError;
          }
          console.log('sickLeave', values.sickLeave);
        if (!Date.parse(values.sickLeave.startDate)) {          
          errors.startDate = invalidDate; 
        }
        if (!Date.parse(values.sickLeave.endDate)) {
          errors.endDate = invalidDate; 
        }
        return errors;
      }
      }}    
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
            />    
            <p>SickLeave</p>
            <Field  label="start date" placeholder="YYYY-MM-DD" name="sickLeave.startDate" component={TextField}/>
            <Field  label="end date" placeholder="YYYY-MM-DD" name="sickLeave.endDate" component={TextField}/>            
            <Button type="submit" floated="left" color="green" disabled={!dirty || !isValid}>Add</Button>                            
          </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryFormOccupationalHealth;