/* eslint-disable linebreak-style */
import blogService from '../services/blogs'
import { showMessage } from './notificationReducer'

export const getBlogs = (token) => {
  console.log('recuperando listado de blogs', token)
  return async dispatch => {
    const qresult = await blogService.getAll(token)
    console.log('listado recuperado', qresult)
    dispatch ({ type:'INIT', data: qresult.data })
  }
}

export const createBlog = (token, newBlog) => {
  console.log ('creando blog', token.token)
  return async dispatch => {
    let qresult = null
    try {
      qresult = await blogService.create(token, { title: newBlog.title, url: newBlog.url })
      console.log('qresult', qresult.data)
      dispatch (showMessage('blog created', false, 5))
      dispatch ({ type:'CREATE', data: qresult.data })
    } catch (e) {
      console.log ('e', e)
      dispatch (showMessage('error creating blog', true, 5))
    }
  }
}

export const updateBlogLikes = (token, blog) => {
  return async dispatch => {
    try {
      await blogService.update(token, blog.id, blog)
      dispatch (showMessage('blog updated', false, 5))
      dispatch ({ type: 'UPDATELIKES', data: blog.id })
    } catch (error) {
      dispatch (showMessage('error updating blog ' + error.message, true, 5))
    }
  }
}

export const addBlogComment = (token, blog) => {
  return async dispatch => {
    try {
      await blogService.update(token, blog.id, blog)
      dispatch (showMessage('blog updated' ,false, 5))
      dispatch ({ type: 'ADDCOMMENT', data: blog })
    } catch (error) {
      dispatch (showMessage('error updating blog ' + error.message, true, 5))
    }
  }
}


const initialState = []


const blogReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'CREATE':
  {
    console.log('state', state)
    return state.concat(action.data)
  }
  case 'UPDATELIKES':
  {
    // console.log ('upvote de UPVOTE', action)
    console.log ('update likes blogreducer', state)
    const toupdate = state.filter(p => p.id === action.data)
    if (toupdate !== null && toupdate.length > 0) {
      const newobject = { ...toupdate[0], votes: toupdate[0].votes + 1 }
      return state.map (p => p.id === newobject.id ? newobject : p)
    } else { throw new Error('Invalid id') }
  }
  case 'ADDCOMMENT':
  {
    console.log ('update blogreducer', state)
    const toupdate = state.filter(p => p.id === action.data.id)
    if (toupdate !== null && toupdate.length > 0) {
      return state.map (p => p.id === action.data.id ? action.data : p)
    } else { throw new Error('Invalid id') }
  }
  case 'INIT':
  {
    return action.data
  }
  default:
    return state
  }
}


export default blogReducer