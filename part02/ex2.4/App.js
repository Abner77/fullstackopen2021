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
    <div>
      <h1>{name}</h1>
      <ul>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />          
        )}
      </ul>
      <h2>Total of exercises {totalex}</h2>
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  // console.log('parts', course.parts);    
  return (
    <>
      <h1>Web development curriculum</h1>      
      {courses.map((course) => <Course id={course.id} name={course.name} parts={course.parts}/>)}      
    </>
  )
}


export default App;