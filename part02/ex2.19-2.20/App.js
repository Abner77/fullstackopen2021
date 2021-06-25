import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import Filter from './components/Filter'
import personServices from './services/Persons'


const Notification = ({omessage}) => {  
  if (omessage == undefined) {
    console.log ("1")
    return null
  }
  console.log ('mensaje', omessage)
  if (omessage.message == '') {
    console.log ("2")
    return null
  }
  let className = "notification "
  className += omessage.iserror ? 'error' : 'success'  
  console.log (className)

  return (    
    <div className={className}>
      {omessage.message}
    </div>
  )
}



const App = () => {  

  const prepareNotification = (text, boolerror) => {return {message:text, iserror:boolerror}}
  const showMessage = (mensaje, iserror) => {
    setTimeout(() => setNotification(prepareNotification('',false)), 5000)
    setNotification(prepareNotification(mensaje, iserror))              
}

  const [ persons, setPersons ] = useState([]) 
  //useState
  const [ newName, setNewName ] = useState('')  
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notification, setNotification] = useState(prepareNotification('', false))
  

  console.log ('notification', notification)

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
      personServices.update (filtro[0].id, updatedPerson )
        .then(() => {                            
              showMessage("user already existed, number updated successfully", false)
              setPersons(persons.map (p => p.id !== filtro[0].id ? p : updatedPerson ))              
            }            
          )
        .catch(() =>  {
          showMessage("error updating number, user has been deleted", true)          
          personServices.getAll().then(response => setPersons(response.data))
          })        
          .catch(console.log ("error recuperando listado"))            
    }
    else{
      if (newName == '' || newPhone == ''){
        showMessage(`you have to add a number and a name`, true)
      }
      else{
        let newperson = {name:newName, number:newPhone}
        personServices.create(newperson).then(response => 
              {                
                showMessage(`${newperson.name} added successfully`, false)
                setPersons(persons.concat(response.data))
              }
            ).catch(error => console.log('error adding', error)) //saving to database.        
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
    personServices.erase(id).then(console.log ("borrado")).
      catch(error => showMessage(`Person ${id} was already deleted`, true))      
    setPersons(persons.filter (p => p.id !== id))
}

  
  
  return (
    <div>      

      <h1>Phonebook</h1>
      <Notification omessage={notification}/>
      {/* filter down with <input value={filter} onChange={handleFilter}/> */}
      <Filter filter={filter} handleFilter={handleFilter}/>
      <PersonForm newName={newName} newPhone={newPhone} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone} handleSubmit={handleSubmit} />      
      <h2>Numbers</h2>
      <Persons filtro={filter} contacts={persons} deleteHandle={deleteHandle}/>      
    </div>
  )
}

export default App