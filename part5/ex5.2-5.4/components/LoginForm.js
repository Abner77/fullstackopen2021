import React from 'react'

const LoginForm = ({handleUser, handlePassword, handleSubmit}) => {
  
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

export default LoginForm
