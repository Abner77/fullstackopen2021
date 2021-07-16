import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {  connect } from 'react-redux'



const AnecdoteForm = (props) => {  

  const create = (event) => {
    event.preventDefault()
    console.log('pasando por create', event)
    props.createAnecdote(event.target.desc.value)
    event.target.desc.value = ''
  }

  return (
    <form  onSubmit={create}>
      <div><input name='desc' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm