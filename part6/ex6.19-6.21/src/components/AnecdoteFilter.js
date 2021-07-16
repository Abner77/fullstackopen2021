import React from 'react'
import { connect } from 'react-redux'
import {filter} from '../reducers/anecdoteFilterReducer'


const AnecdoteFilter = (props) => {

  // const dispatch = useDispatch ()

  const handleChange = ((event) => {
    props.filter(event.target.value)
  })


  return ( 
    <div>
      filter <input type="text" onChange={handleChange}></input>
    </div>
  )
}

const mapDispatchToProps = {
  filter
}

const ConnectedAnecdoteFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)

export default ConnectedAnecdoteFilter

