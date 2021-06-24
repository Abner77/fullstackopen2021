import React from 'react'

const Country = ({pais}) =>{

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
export default Country

