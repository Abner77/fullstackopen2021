import React from 'react'
import {upvoteAnecdote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const Anecdote = () => {

  const anecdotes = useSelector (state => state)
  const dispatch = useDispatch () 

  const vote = (id) => {
    console.log('vote', id)
    dispatch (upvoteAnecdote(id))
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


