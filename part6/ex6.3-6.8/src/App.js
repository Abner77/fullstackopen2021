import React from 'react'
import AnecdoteForm from './components/AnecdoteForm' 
import Anecdote from './components/Anecdote'

const App = () => {  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdote/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App