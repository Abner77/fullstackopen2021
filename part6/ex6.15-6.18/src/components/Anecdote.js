import React from 'react'
import {upvoteAnecdote} from '../reducers/anecdoteReducer'
import {createNotification, removeNotification} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const Anecdote = () => {          
    const filter = useSelector (state => state.filter)    
    console.log('filter en componente anécdota', filter)
    const anecdotes = useSelector (state => {             
        return state.anecdotes.filter(a => a.content.indexOf(filter) >= 0)
    })
    console.log('anecdotas estado en componente anécdota', anecdotes)
    const dispatch = useDispatch () 


  const vote = (anecdota) => {
    console.log('vote', anecdota.id)
    dispatch (upvoteAnecdote(anecdota))
    dispatch(createNotification('you voted for ' + anecdota.content, 5))        
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
      {anecdotes !== undefined ? anecdotes.sort(comparer).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ) : null}
    </div>
  )

}

export default Anecdote


