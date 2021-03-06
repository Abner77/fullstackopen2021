import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { HospitalEntry, Discharge } from "../types";

export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  // onCancel: () => void;
}


const AddEntryForm = ({ onSubmit }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        description: "",
        healthCheckRating: 0,
        discharge: {} as Discharge
      }}
      onSubmit={onSubmit}
      validate={values => {
      {
        const requiredError = "Field is required";
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
        if(!Date.parse(values.date)) {
            errors.date = "Invalid date format"; 
        }                 
        if (!values.specialist) {
            errors.specialist = requiredError;
          }
        if (values.discharge !== (null) )
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
            <Field
                label="Health check rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
                />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
                {/* <Button onClick={onCancel}>Close</Button> */}
              </Grid.Column>
            </Grid>
          </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;