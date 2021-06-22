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

  return(
    <div>
      <h1>{name}</h1>
      <ul>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />          
        )}
      </ul>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Parte de prueba',
        exercises: 4,
        id: 4
      }
    ]
  }  
  
  // console.log('parts', course.parts);  
  let totalex = (course.parts.map (p => p.exercises)).reduce ((a, e) => a + e)    
  return (
    <>
      {/* {console.log(course.parts.map(p => p.name))} */}
      <Course id={course.id} name={course.name} parts={course.parts}  />
      <p><b>Total of exercises {totalex}</b></p>
    </>
  )
}


export default App;