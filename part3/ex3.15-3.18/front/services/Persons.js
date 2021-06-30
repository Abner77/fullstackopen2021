import axios from 'axios'   //esto facilita la vida para hacer llamadas a apis rest

const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://afternoon-bastion-93267.herokuapp.com/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    // .then(response => response.data)
    // .catch(console.log('error recuperando listaod'))
}

const create = newObject => {
  return axios.post(baseUrl, newObject)    
}

const update = (id, newObject) => {  
  return axios.put(`${baseUrl}/${id}`, newObject)    
}

const erase = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  erase: erase
}