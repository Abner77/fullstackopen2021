/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/'

const signin = async (user, password) => {

  const result = await axios.post(baseUrl, { username: user, password:password })
  console.log('result', result)
  return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { signin }
