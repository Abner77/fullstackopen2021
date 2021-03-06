import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';
import { CoursePart } from './types'
// import { ICoursePart } from './types';

const App = () => {
  const courseName = "Half Stack application development";
  
 // new types


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  }
]

  

  return (
    <div>      
      <Header coursename={courseName}/>
      <Content courses={courseParts} />
      <Total courses = {courseParts} />
    </div>
  );
};

export default App;