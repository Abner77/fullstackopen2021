import React from 'react'


const Persons = ({filtro, contacts}) => {  

    console.log('contactos', contacts)

    if (filtro == '')
    {
        if (contacts.length > 0){
            console.log('sin filtro')
            return(
                <ul>                        
                {contacts.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
                </ul>    
            )
        }
        else return (<></>)
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

export default Persons