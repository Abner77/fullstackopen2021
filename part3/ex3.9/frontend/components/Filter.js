import React from 'react'

const Filter = ({filter, handleFilter}) => {    
    return (
      <div>
        filter down with <input value={filter} onChange={handleFilter} />
      </div>
      )
} 

export default Filter
