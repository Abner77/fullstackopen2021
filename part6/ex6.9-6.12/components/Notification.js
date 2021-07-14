import React from 'react'
// import {upvoteAnecdote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {

  const message = useSelector(state => state.notification) 
  
  const styleShowed = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: ''
  }
  const styleHidden = {display:'none'}

  

  // document.getElementById('divnot').setAttribute('style', JSON.stringify(style))  
  return (
    <div id='divnot' style={message === '' ? styleHidden : styleShowed}>
      <p id='mensaje'>{message}</p>      
    </div>    
  )
}

export default Notification