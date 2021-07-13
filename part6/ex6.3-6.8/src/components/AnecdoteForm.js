import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'



const AnecdoteForm = () => {

  const dispatch = useDispatch()  

  const create = (event) => {
    event.preventDefault()
    console.log('pasando por create', event)
    dispatch (createAnecdote(event.target.desc.value))
    event.target.desc.value = ''
  }

  return (
    <form  onSubmit={create}>
      <div><input name='desc' /></div>
      <button type='submit'>create</button>
    </form>
  )
}


export default AnecdoteForm