import React from 'react'


const Part = (props) => {
    return (
      <li key={props.id}>
         {props.name} {props.exercises}
      </li>
    )
  }
  
  const Course = ({id, name, parts}) => {  
    
    // console.log("acumulado " + course.parts.reduce (p => acumulado + p.exercises))    
  
    let totalex = (parts.map (p => p.exercises)).reduce ((a, e) => a + e)    
  
    return(
      <div key={id}>
        <h1>{name}</h1>
        <ul>
          {parts.map(part => 
            <Part key={id + part.id.toString()} name={part.name} exercises={part.exercises} />          
          )}
        </ul>
        <h2>Total of exercises {totalex}</h2>
      </div>
    )
  }
  

  export default Course