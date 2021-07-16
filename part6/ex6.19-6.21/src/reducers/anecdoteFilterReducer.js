
const initialState = ''

export const filter = ( stringfilter ) => {
  return { type: 'FILTER', data: stringfilter } 
 }

 const anecdoteFilterReducer = (state = initialState, action) => {   
  switch (action.type) {
    case 'FILTER': 
      {
        //asumimos que state es una lista de anécdotas (objetos anécdota) y que en el create nos van a pasar el texto        
        return action.data
      }    
    default:
      return state;
  }  
}

export default anecdoteFilterReducer
