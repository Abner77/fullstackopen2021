import React from 'react';
import { CoursePart } from "./types"
import Part from "./Part";

const Content = ( { courses } : { courses: CoursePart[] } ) => {  
  return (
    <div>
      {courses.map (c => <Part key={c.name} coursePart={c} />)}
    </div>
  )
}

export default Content