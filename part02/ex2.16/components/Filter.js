import React from 'react'

const Filter = ({filter, handleFilter}) => {
    console.log ('filter', filter)
    console.log('handleFilter', handleFilter);

    return (
      <div>
        filter down with <input value={filter} onChange={handleFilter} />
      </div>
      )
} 

export default Filter
