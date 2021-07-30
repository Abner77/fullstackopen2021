/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/users'


// const createConfigHeader = (token) => {
//   let config = { headers:
//     { 'Authorization': 'bearer ' + token.token }
//   }
//   return config
// }


// const getAll = (token) => {
//   console.log('token getAll', token)
//   const config = createConfigHeader(token)
//   return axios.get(baseUrl, config)
// }

const getAll = () => {
  // const config = createConfigHeader(token)
  return axios.get(baseUrl)
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }