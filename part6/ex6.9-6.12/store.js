import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer, 
  filter: anecdoteFilterReducer
})


const store = createStore(reducer, composeWithDevTools())

export default store