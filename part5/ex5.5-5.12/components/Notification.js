/* eslint-disable linebreak-style */
import React from 'react'

const Notification = ({ omessage }) => {
  if (omessage === undefined) {
    console.log ('1')
    return null
  }
  console.log ('mensaje', omessage)
  if (omessage.message === '') {
    console.log ('2')
    return null
  }
  let className = 'notification '
  className += omessage.iserror ? 'error' : 'success'
  console.log (className)

  return (
    <div className={className}>
      {omessage.message}
    </div>
  )
}

export default Notification