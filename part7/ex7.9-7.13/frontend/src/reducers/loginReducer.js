/* eslint-disable linebreak-style */
import loginService from '../services/login'

export const tryLogin = (user, password) => {
  return async dispatch => {
    const qresult = await loginService.signin(user, password)
    dispatch ({ type:'LOGIN', data: qresult.data })
  }
}

export const logOff = () => {
  return async dispatch => {
    dispatch({ type: 'LOGOFF', data: '' })
  }
}

export const recoverLoggedUser = () => {
  return async dispatch => {
    const suser = window.localStorage.getItem('loggedUser')
    let user = null
    if (suser !== undefined && suser !== null) {
      user = JSON.parse(window.localStorage.getItem('loggedUser'))
    }
    dispatch({ type: 'RECOVER', data: user })
  }
}

const initialState = JSON.parse(window.localStorage.getItem('loggedUser'))

const loginReducer = (state = initialState, action) =>  {
  switch (action.type) {
  case 'LOGIN':
  {
    window.localStorage.setItem('loggedUser', JSON.stringify(action.data))
    return action.data
  }
  case 'LOGOFF':
  {
    return null
  }
  case 'RECOVER':
  {
    return action.data
  }
  default:
    return state
  }
}

export default loginReducer
