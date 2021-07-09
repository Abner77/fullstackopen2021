/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleUser, handlePassword, handleSubmit }) => {

  return (
    <div>
      <h2>Login</h2>
      <form id='frmLogin' onSubmit={handleSubmit}>
        <div>
          <p><input type="text" onChange={handleUser}/></p>
          <p><input type="password" onChange={handlePassword}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="submit">Log in</button></p>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleUser: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired }

export default LoginForm
