import axios from 'axios'
const baseUrl = '/api/blogs'


const createConfigHeader = (token) => {
  let config = { headers:
    { "Authorization": "bearer " + token}
}
  return config
}


const getAll = (token) => {
  console.log(token)
  const config = createConfigHeader(token)
  return axios.get(baseUrl, config)  
}

const create = (token, blog) => {
  const config = createConfigHeader(token)
  return axios.post(baseUrl, blog, config)
}

export default { getAll, create }