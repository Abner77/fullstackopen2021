import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [paises, setPaises] = useState([])  
  const [filter, setFilter] = useState('')  
 
  const handleFilterChange = (event) => setFilter(event.target.value) 
  const handleShowButton = (event) => {        
    document.getElementById('filter').value = event.target.id
    setFilter (event.target.id)
  }
  
  useEffect(() => {    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {        
        setPaises(response.data)
      })
  }, [])      
  
  return (
      <div>
        <Filter handleFilterChange={handleFilterChange}/>
        <Countries paises={paises} filter={filter} handleShowButton={handleShowButton}/>
      </div>
  )
}    

export default App