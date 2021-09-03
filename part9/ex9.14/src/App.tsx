import React from 'react';
import Header from './Header';
import Courses from './Courses';
import Total from './Total';
import { ICoursePart } from './types';

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts : ICoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];  

  

  return (
    <div>      
      <Header coursename={courseName}/>
      <Courses courses={courseParts} />
      <Total courses = {courseParts} />
    </div>
  );
};

export default App;