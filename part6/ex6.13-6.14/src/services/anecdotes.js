import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (anecdota) => {
  return axios.post(baseUrl, anecdota) 
}

export default {
  getAll: getAll,
  create: create
}