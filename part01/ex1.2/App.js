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
       <Part part = {props.params[0][0]} exercise = {props.params[1][0]}/>
       <Part part = {props.params[0][1]} exercise = {props.params[1][1]}/>
       <Part part = {props.params[0][2]} exercise = {props.params[1][2]}/>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]

  const params = [parts, exercises]

  return (
    <div>
      <Header course={course} />            
      {console.log(params)}
      <Content params = {params}/>
      <Total sum={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}


export default App;
