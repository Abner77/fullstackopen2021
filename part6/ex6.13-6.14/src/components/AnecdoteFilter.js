import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {filter} from '../reducers/anecdoteFilterReducer'


const AnecdoteFilter = () => {

  const dispatch = useDispatch ()

  const handleChange = ((event) => {
    dispatch (filter(event.target.value))
  })


  return ( 
    <div>
      filter <input type="text" onChange={handleChange}></input>
    </div>
  )

}

export default AnecdoteFilter

