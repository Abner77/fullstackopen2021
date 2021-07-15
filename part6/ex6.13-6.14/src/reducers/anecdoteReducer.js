import anecdotes from '../services/anecdotes'
import anecdotesServices from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)


const initialState = []

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}




export const createAnecdote = ( desc ) => {
 return { type: 'CREATE', data: desc } 
}

export const upvoteAnecdote = ( id ) => {
  console.log('montando acción')
  return { type: 'UPVOTE', data: id}
}

export const initAnecdotes = (anecdotes) => {
  console.log('init', anecdotes)
  return {type: 'INIT', data : anecdotes}
}

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
 
  switch (action.type) {
    case 'CREATE': 
      {
        //asumimos que state es una lista de anécdotas (objetos anécdota) y que en el create nos van a pasar el texto
        const newAnecdote = asObject(action.data)
        anecdotesServices.create(newAnecdote).then().catch (console.log ("error grave añadiendo elemento, recargar navegador"))
        return state.concat(newAnecdote)
      }
    case 'UPVOTE': 
      {
        // console.log ('upvote de UPVOTE', action)
        const toupdate = state.filter(p => p.id === action.data)        
        if (toupdate !== null && toupdate.length > 0) {
          const newobject = {...toupdate[0], votes: toupdate[0].votes + 1}          
          return state.map (p => p.id === newobject.id ? newobject : p)
        } else { throw new Error('Invalid id') }
      }
    case 'INIT':
      {
        return action.data
      }
    default:
      return state;
  }  
}

export default anecdoteReducer