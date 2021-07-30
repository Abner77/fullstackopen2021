/* eslint-disable linebreak-style */
import React from 'react'
// import PropTypes from 'prop-types'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { tryLogin } from '../reducers/loginReducer'


const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUserChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleSubmitLogin = (event) => {
    event.preventDefault()
    dispatch (tryLogin(username, password))
  }
  return (
    <div>
      <h2>Login</h2>
      <form id='frmLogin' onSubmit={handleSubmitLogin}>
        <div>
          <p><input id="user" type="text" onChange={handleUserChange}/></p>
          <p><input id="password" type="password" onChange={handlePasswordChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="login" type="submit">Log in</button></p>
        </div>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleUser: PropTypes.func.isRequired,
//   handlePassword: PropTypes.func.isRequired,
//   handleSubmit: PropTypes.func.isRequired }

export default LoginForm
