import React, { useState } from 'react'



const Filter = ({filter, handleFilter}) => {
    console.log ('filter', filter)
    console.log('handleFilter', handleFilter);

    return (
      <div>
        filter down with <input value={filter} onChange={handleFilter} />
      </div>
      )
}


const PersonForm = ({newName, newPhone, handleChangeName, handleChangePhone, handleSubmit}) => {
  
  return (
    <form>
        <div>
          <h3>Add new entry</h3>
          <p>name: <input id='inputName' value={newName} onChange={handleChangeName}/></p>          
          <p>number: <input value={newPhone} onChange={handleChangePhone}/></p>          
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >add</button>
        </div>
    </form>
  )
}
 
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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  //useState
  const [ newName, setNewName ] = useState('')  
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')

  //controladores de eventos
  const handleSubmit = (event) => {
    event.preventDefault()        
    
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
  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangePhone = (event) => setNewPhone(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
   
  //función de apoyo para el componente de filtro
  const filterPersons = (filtro, contacts) => {
    if (filtro === '')          
        return contacts
    else      
      return contacts.filter(p => p.name.toLowerCase().search(filtro.toLowerCase()) >= 0)     
  }  

  let contactosFltrados = filterPersons(filter, persons)
  
  return (
    <div>      

      <h2>Phonebook</h2>  
      {/* filter down with <input value={filter} onChange={handleFilter}/> */}
      <Filter filter={filter} handleFilter={handleFilter}/>
      <PersonForm newName={newName} newPhone={newPhone} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone} handleSubmit={handleSubmit} />      
      <h2>Numbers</h2>
      <Persons filtro={filter} contacts={contactosFltrados}/>      
    </div>
  )
}

export default App