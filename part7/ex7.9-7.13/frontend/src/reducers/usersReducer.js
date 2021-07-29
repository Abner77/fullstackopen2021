/* eslint-disable linebreak-style */
import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const qresult = await userService.getAll()
    console.log('listado usuarios recuperado', qresult)
    dispatch ({ type:'GETUSERS', data: qresult.data })
  }
}


const initialState = []


const userReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'GETUSERS':
  {
    return action.data
  }
  default:
    return state
  }
}


export default userReducer