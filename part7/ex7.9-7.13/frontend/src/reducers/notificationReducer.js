/* eslint-disable linebreak-style */



export const showMessage = (message, iserror, duration) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(hideMessage())
    }, duration * 1000)

    dispatch ({ type:'SHOW', data: { message: message, iserror: iserror } })
  }
}

export const hideMessage = () => {
  return async dispatch => {
    dispatch ({ type:'HIDE', data: '' })
  }
}


const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SHOW':
  {
    return action.data
  }
  case 'HIDE':
  {
    return action.data
  }
  default:
    return state
  }
}


export default notificationReducer
