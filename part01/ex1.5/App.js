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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }    

  function Suma (parts){
    let result = 0
    parts.forEach (p => result += p.exercises)
    return result 
  }


  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((p, index) => <p key={index}>{p.name} {p.exercises}</p>)}
      <p>Numer of exercises {Suma(course.parts)}</p>
    </div>
  )
}


export default App;
