/* eslint-disable linebreak-style */
import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="toggle" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children} <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Togglable'

export default Toggable