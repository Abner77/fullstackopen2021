import React from 'react'
import Country from './Country'

const Countries = ({paises, filter, handleShowButton}) =>{

    if (filter === '')
        return (<></>)
    
    
    let paisesFiltrados = paises.filter(p => p.name.toLowerCase().match(filter.toLowerCase()) !== null)    
    if (paisesFiltrados.length > 10)
    {
        return (<p>Too many results, narrow your search</p>)   
    }
    if (paisesFiltrados.length === 1)
    {
        return (<Country pais={paisesFiltrados[0]}/>)
    }
    if (paisesFiltrados.length <= 10)
    {
        return (
            <div>
                <ul>
                    {paisesFiltrados.map(p => <li key={p.name}>{p.name}  <button onClick={handleShowButton} id={p.name} >show</button></li>)}
                </ul>
            </div>
        )
    }  
    if (paisesFiltrados.length === 0)  
    {
        return (
            <p>
                No countries found!
            </p>
        )
    }
}

export default Countries