import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm' 
import AnecdoteFilter from './components/AnecdoteFilter'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import {initAnecdotes} from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()  
  useEffect(() => {
    anecdotesService
      .getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes.data)))
  }, [dispatch])

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