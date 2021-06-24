import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import Filter from './components/Filter'
import personServices from './services/Persons'




const App = () => {  

  const [ persons, setPersons ] = useState([]) 
  //useState
  const [ newName, setNewName ] = useState('')  
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  
  useEffect(() => {
    personServices.getAll().then(response => setPersons(response.data))
      .catch(console.log ("error recuperando listado"))
  }, [])


  //controladores de eventos
  const handleSubmit = (event) => {
    event.preventDefault()            
    let filtro = persons.filter(p => p.name == newName)
    if  (filtro.length > 0){
      console.log(`${newName} already exists, proceeding to update number `)
      let updatedPerson = {name:newName, number:newPhone, id:filtro[0].id}
      personServices.update (filtro[0].id, updatedPerson ).then(setPersons(persons.map (p => p.id !== filtro[0].id ? p : updatedPerson )))
        .catch(console.log("error actualizando número"))
    }
    else{
      if (newName == '' || newPhone == ''){
        alert(`you have to add a number and a name`)
      }
      else{
        let newperson = {name:newName, number:newPhone}
        personServices.create(newperson).then(response => setPersons(persons.concat(response.data))).catch("error añadiendo persona") //saving to database.        
        setNewName ('')
        setNewPhone('')
        document.getElementById('inputName').focus()        
      }
    }    
  }  

  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangePhone = (event) => setNewPhone(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)     
  const deleteHandle = (id) => {      
    console.log('id', id)    
    personServices.erase(id).then(console.log ("borrado")).catch(console.log('error borrando'))
    setPersons(persons.filter (p => p.id !== id))
}

  
  
  return (
    <div>      

      <h2>Phonebook</h2>  
      {/* filter down with <input value={filter} onChange={handleFilter}/> */}
      <Filter filter={filter} handleFilter={handleFilter}/>
      <PersonForm newName={newName} newPhone={newPhone} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone} handleSubmit={handleSubmit} />      
      <h2>Numbers</h2>
      <Persons filtro={filter} contacts={persons} deleteHandle={deleteHandle}/>      
    </div>
  )
}

export default App