import axios from 'axios'
const baseUrl = '/'

const signin = async (user, password) => {

  const result = await axios.post(baseUrl, { username: user, password:password })    
  console.log('result', result)
  return result
}

export default { signin }
