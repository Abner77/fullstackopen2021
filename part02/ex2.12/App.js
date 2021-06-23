import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Note from './components/Note'


const Pais = ({pais}) => {

  return (
    <div>
      <h2>{pais.name}</h2>
      <p>{pais.capital}</p>
      <p>{pais.population}</p>
      <h3>idiomas</h3>
      <ul>
        {pais.languages.map (l => <li key={l.name}>{l.name}</li> )}
      </ul>
      <img alt="flag" src={pais.flag} width="120px" height="80px"/>
    </div>
  )

}


const App = () => {
  const [paises, setPaises] = useState([])  
  const [filter, setFilter] = useState('')
  const [inicializacion, setInicializacion] = useState(true)

  let paisesToShow = paises  
  if (filter !== '')
    paisesToShow = paises.filter(p => p.name.match(filter) != null)     

  const handleFilterChange = (event) => {            
    setFilter(event.target.value)       
    setInicializacion(false)
  }
  
  useEffect(() => {    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {        
        setPaises(response.data)
      })
  }, [])
  
  console.log('n paises', paisesToShow.length);

  let mensajeInicial = ''
  if (!inicializacion)
    mensajeInicial = 'Demasiados resultados, acote la búsqueda'
  
  
  if (paisesToShow.length > 10)  {
    return (
      <div>
        encuentra paises <input onChange={handleFilterChange} />
        <p>{mensajeInicial}</p>
      </div>
    )
  }

  if (paisesToShow.length > 1 && paisesToShow.length <= 10)   {
    return (
      <div>
        encuentra paises <input onChange={handleFilterChange} />
        <ul>
          {paisesToShow.map(p => <li key={p.name}>{p.name}</li>)}
        </ul>
      </div>
    )
  }

  if (paisesToShow.length === 0) {
    return (
      <div>
        encuentra paises <input onChange={handleFilterChange} />
      </div>
    )
  }

  if (paisesToShow.length === 1)  {
    console.log('pasa');
    return (
      <div>
        encuentra paises <input onChange={handleFilterChange} />
        {/* <p>
          {paisesToShow.map(p => <li key={p.name}>{p.name}</li>)}
        </p> */}
        <Pais pais={paisesToShow[0]} />
      </div>
    )

  }
}
  


export default App