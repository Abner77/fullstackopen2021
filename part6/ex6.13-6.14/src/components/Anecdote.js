import React from 'react'
import {upvoteAnecdote} from '../reducers/anecdoteReducer'
import {createNotification, removeNotification} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const Anecdote = () => {          
    const filter = useSelector (state => state.filter)
    const anecdotes = useSelector (state => state.anecdotes.filter(a => a.content.indexOf(filter) >= 0))
    const dispatch = useDispatch () 


  const vote = (id) => {
    console.log('vote', id)
    dispatch (upvoteAnecdote(id))
    dispatch(createNotification('you voted for ' + anecdotes.filter(a => a.id === id)[0].content))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const comparer = (a,b) => { 
    console.log('comparer', a.votes, b.votes)
    if (a.votes < b.votes )
      return 1
    if (a.votes > b.votes )
      return -1
    
    return 0
  }
 
  return (
    <div>
      {anecdotes.sort(comparer).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default Anecdote


