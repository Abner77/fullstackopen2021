import React from 'react'
import AnecdoteForm from './components/AnecdoteForm' 
import AnecdoteFilter from './components/AnecdoteFilter'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteFilter/>
      <Anecdote/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App