import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({pais}) =>{

    // http://api.weatherstack.com/current
    // ? access_key = YOUR_ACCESS_KEY
    // & query = New York

    console.log('nombre de pais pasado a weather api', pais.name);

    const [data, setData] = useState('')
    
    useEffect(() => {            
        axios
          .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_WEATHER_API + '&query=' + pais.name)
          .then(response => {    
            console.log('response', response.status);            
            setData(response.data)            
          })
          .catch(error => {
            console.log(error)
          });

      }, [])      

    if (data !== null)
    {
    return (
        <div>
          <h2>{pais.name}</h2>
          <div>
            <p>{pais.capital}</p>
            <p>{pais.population}</p>
            <h3>idiomas</h3>
            <ul>
                {pais.languages.map (l => <li key={l.name}>{l.name}</li> )}
            </ul>
            <img alt="flag" src={pais.flag} width="120px" height="80px"/>
          </div>
          <h2>Weather in {pais.name}</h2>
          <div>
            <p>Temperature {data.current.temperature}º celsius</p>
            <ul>
                {data.current.weather_icons.map((i, index) => <li key={index}><img src={i}/></li>)}
            </ul>
          </div>
        </div>
      )
    }
}
export default Country

