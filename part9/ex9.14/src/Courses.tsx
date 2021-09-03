import React from 'react';
import { ICoursePart } from "./types"

const Courses = ( { courses } : { courses: ICoursePart[] } ) => {  
  return (
    <div>
      {courses.map (c => <p key={c.name}> {c.name} {c.exerciseCount} </p>)}
    </div>
  )
}

export default Courses