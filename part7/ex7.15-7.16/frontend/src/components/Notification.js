/* eslint-disable linebreak-style */
import React from 'react'
import { useSelector } from 'react-redux'



const Notification = () => {
  const odata = useSelector (state => state.notification)
  console.log('odata notification', odata)
  if (!odata) {
    return null
  }
  const iserror = odata.iserror
  const omessage = odata.message
  if (omessage === '')
    return null

  let className = 'notification '
  className += iserror ? 'error' : 'success'
  console.log (className)

  return (
    <div className={className}>
      {omessage}
    </div>
  )
}

export default Notification