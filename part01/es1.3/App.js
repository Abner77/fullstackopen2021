// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react'
const Header = (props) =>{
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) =>{
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return(
    <>      
      <Part part = {props.params[0].name} exercise = {props.params[0].exercises}/>
      <Part part = {props.params[1].name} exercise = {props.params[1].exercises}/>
      <Part part = {props.params[2].name} exercise = {props.params[2].exercises}/> 
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.sum}</p>
  )  
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]
  console.log (parts)

  return (
    <div>
      <Header course={course} />                  
      <Content params={parts}/>
      <Total sum={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}


export default App;
