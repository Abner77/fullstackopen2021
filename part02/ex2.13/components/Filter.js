import React from 'react'


const Filter = ({handleFilterChange}) => {


    return (
        <div>
            encuentra paises <input id="filter" onChange={handleFilterChange} />
        </div>
    )

}


export default Filter