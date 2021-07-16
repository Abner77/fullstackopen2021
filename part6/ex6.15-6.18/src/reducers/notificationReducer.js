const initialState = 'sin mensaje'


export const createNotification = (message, seconds) => {
  return async dispatch => {
    await setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
     dispatch({type: 'PUT', data: message})
    }
}

export const removeNotification = () => { return {type:'DELETE', data: null} }

const notificationReducer = (state = initialState, action) => {   
  switch (action.type) {
    case 'PUT': 
      {        
        return action.data
      }    
    case 'DELETE': { return ''}
    default:
      return state;
  }  
}

export default notificationReducer