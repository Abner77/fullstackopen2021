import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([])  

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  

  return (
    <div>
      <ul>
        {persons.map (p => <li key={p.id}>{p.name} {p.number}</li>)}
      </ul>
    </div>

  )
  
}

export default App