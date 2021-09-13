import React  from "react";
import { Entry, OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import CSS from 'csstype';

const EntryComp = ( { entry } : {entry: Entry}) => {

  //  Hospital,
  // OccupationalHealthcare,
  // HealthCheck

  const estilo: CSS.Properties = {fontSize: "1.5em", fontStyle: "bold"};

  switch (entry.type) {
    case "Hospital":
      return (
        <Card>
          <Card.Content>
            <div style={estilo}>{entry.date} <Icon name="hospital" size="large"/></div>
          </Card.Content>
          <Card.Content description>{entry.description}</Card.Content>
          {/* <Card.Content extra>
            <Icon name="heart" color="blue" />
          </Card.Content> */}
        </Card>
      );
      break;
    case "OccupationalHealthcare":
      return (
        <Card>
          <Card.Content>
          <div style={estilo}>{entry.date} <Icon name="user doctor" size="large"/> {(entry as OccupationalHealthcareEntry).employerName} </div>
          </Card.Content>
          <Card.Content description>{entry.description}</Card.Content>
        </Card>
      );
      break;
    case "HealthCheck":
      return (
        <Card>
          <Card.Content>
          <div style={estilo}>{entry.date} <Icon name="stethoscope"  size="large"/></div>
          </Card.Content>
          <Card.Content description>{entry.description}</Card.Content>
      </Card>
      );
      break;
    default:
        throw new Error("tipo no reconocido");
  }  
};

export default EntryComp;