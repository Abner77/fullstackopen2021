import React, { useState } from 'react'



const Persons = ({filtro, contacts}) => {

  console.log('personas', contacts)
  console.log('filtro', filtro)
  if (filtro == '')
  {
    console.log('sin filtro')
    return(
      <ul>                        
        {contacts.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
      </ul>    
    )
  }
  else
  {
    
    let filtered = contacts.filter(p => p.name.toLowerCase().search(filtro.toLowerCase()) >= 0)
    if (filtered.length > 0)
    {
      return(
        <ul>                        
          {filtered.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
        </ul>    
      )
    }
    else
    {
      return(
        <p>there are no results that match the filter</p>
      )
    }
  }

}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
    number: '3435645464'}
  ]) 
  const [ newName, setNewName ] = useState('')  
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')

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
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  
  return (
    <div>      

      <h2>Phonebook</h2>  
      filter down with <input value={filter} onChange={handleFilter}/>
      <form>
        <div>
          <h3>Add new entry</h3>
          <p>name: <input id='inputName' value={newName} onChange={handleChange}/></p>          
          <p>number: <input value={newPhone} onChange={handleChangePhone}/></p>          
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons filtro={filter} contacts={persons}/>      
    </div>
  )
}

export default App