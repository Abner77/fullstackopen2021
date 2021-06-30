import React from 'react'
import personServices from '../services/Persons'


const Persons = ({filtro, contacts, deleteHandle}) => {      
    let filtered = contacts
    if (filtro !== '' && contacts.length > 0)
        filtered = contacts.filter(p => p.name.toLowerCase().search(filtro.toLowerCase()) >= 0)

    
    if (filtered.length > 0){        
        return(
            <ul>                        
                {filtered.map(p => <li className='person' key={p.name}>{p.name} {p.number} <button onClick={() => window.confirm('are you sure') ? deleteHandle(p.id) : null}>delete</button></li>)}
            </ul>                
        )
    }
    else return (<></>)        
  }

export default Persons