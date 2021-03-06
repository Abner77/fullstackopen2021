import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  

  const handleSubmit = (event) => {
    event.preventDefault()    
    setPersons (persons.concat ({name:newName}))
    setNewName ('')
  }
  const handleChange = (event) => {    
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <input value={newName} onChange={handleChange}/>          
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={p.name}>{p.name}</li>)}
      </ul>    
    </div>
  )
}

export default App