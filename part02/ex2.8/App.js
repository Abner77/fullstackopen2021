import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
    number: '3435645464'}
  ]) 
  const [ newName, setNewName ] = useState('')  
  const [ newPhone, setNewPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()    
    let newperson = {name:newName}
    console.log ('newperson', newperson)
    if  (persons.filter(p => p.name == newName).length > 0){
      alert(`${newName} ya existe`)
    }
    else{
      if (newName == '' || newPhone == ''){
        alert(`you have to add a number and a name`)
      }
      else{
      setPersons (persons.concat ({name:newName, number:newPhone}))
      setNewName ('')
      setNewPhone('')
      document.getElementById('inputName').focus()
      }
    }    
  }

  const handleChange = (event) => setNewName(event.target.value)
  const handleChangePhone = (event) => setNewPhone(event.target.value)

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <p>name: <input id='inputName' value={newName} onChange={handleChange}/></p>          
          <p>number: <input value={newPhone} onChange={handleChangePhone}/></p>          
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
      </ul>    
    </div>
  )
}

export default App