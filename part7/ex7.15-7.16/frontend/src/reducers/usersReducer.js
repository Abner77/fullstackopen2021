/* eslint-disable linebreak-style */
import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    console.log('reuperando usuarios')
    const qresult = await userService.getAll()
    dispatch ({ type:'GETUSERS', data: qresult.data })
  }
}


const initialState = []


const usersReducer = (state = initialState, action) => {
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


export default usersReducer