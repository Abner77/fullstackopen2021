import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (anecdota) => {
  return axios.post(baseUrl, anecdota) 
}

const update = (anecdote) => {
  return axios.put(baseUrl + "/" + anecdote.id, anecdote)
}

export default {
  getAll: getAll,
  create: create, 
  update: update
}