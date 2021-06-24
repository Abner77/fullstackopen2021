import React from 'react'
import personServices from '../services/Persons'


const Persons = ({filtro, contacts, deleteHandle}) => {  


    // const deleteHandle = (id) => {
    //     useEffect(() => {
    //       personServices.erase(id).then(console.log ("borrado")).catch(console.log('error borrando'))          
    //     }, [])      
    // }    

    console.log('contactos', contacts)
    let filtered = contacts
    if (filtro !== '' && contacts.length > 0)
        filtered = contacts.filter(p => p.name.toLowerCase().search(filtro.toLowerCase()) >= 0)

    
    if (filtered.length > 0){        
        return(
            <ul>                        
                {filtered.map(p => <li key={p.name}>{p.name} {p.number} <button onClick={() => window.confirm('are you sure') ? deleteHandle(p.id) : null}>delete</button></li>)}
            </ul>    

            // () => deleteHandle(p.id)
        )
    }
    else return (<></>)        
  }

export default Persons