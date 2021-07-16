import React from 'react'
// import {upvoteAnecdote} from '../reducers/anecdoteReducer'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {

  // const message = useSelector(state => state.notification) 
  
  const styleShowed = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: ''
  }
  const styleHidden = {display:'none'}

  

  // document.getElementById('divnot').setAttribute('style', JSON.stringify(style))  
  return (
    <div id='divnot' style={props.notification === '' ? styleHidden : styleShowed}>
      <p id='mensaje'>{props.notification}</p>      
    </div>    
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

// export default Notification
export default ConnectedNotification