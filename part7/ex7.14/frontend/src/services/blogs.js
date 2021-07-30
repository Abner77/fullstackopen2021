import axios from 'axios'
const baseUrl = '/api/blogs'


const createConfigHeader = (token) => {
  let config = { headers:
    { 'Authorization': 'bearer ' + token.token }
  }
  return config
}


const getAll = (token) => {
  console.log('token getAll', token)
  const config = createConfigHeader(token)
  return axios.get(baseUrl, config)
}

const create = (token, blog) => {
  const config = createConfigHeader(token)
  return axios.post(baseUrl, blog, config)
}

const update = (token, id, blog) => {
  const config = createConfigHeader(token)
  return axios.put(baseUrl + '/' + id, blog, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }