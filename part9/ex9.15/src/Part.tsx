import React from "react";
import { CoursePart } from './types'


const Part = ( { coursePart } : { coursePart: CoursePart} ) => {
  /**
    * Helper function for exhaustive type checking
  */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const buffer = []; 
  buffer.push (<strong>{coursePart.name} {coursePart.exerciseCount}<br/></strong>)

  switch (coursePart.type)
  {
    case "normal": 
      buffer.push (<i>{coursePart.description} </i>);
      break;
    case "groupProject":
      buffer.push (<>project exercises {coursePart.groupProjectCount}</>);
      break;
    case "submission":
      buffer.push (<><i>{coursePart.description}</i> <br/> submit to {coursePart.exerciseSubmissionLink}</>);
      break;
    default:
      assertNever(coursePart);
      break;
  }  

  return (<p>{ buffer }</p>);
}

export default Part
