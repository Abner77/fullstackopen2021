/* eslint-disable linebreak-style */
// import Blog from './Blog'
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogs } from '../reducers/blogsReducer'
import { getUsers } from '../reducers/usersReducer'



const User = ({ user } ) => {

  const dispatch = useDispatch()
  const id = useParams().id

  useEffect ( () => {
    dispatch (getUsers())
  }, [dispatch])
  useEffect( () => {
    dispatch(getBlogs(user))
  }, [dispatch, user])

  const blogs = useSelector (state  => state.blogs)
  const users = useSelector (state => state.users)
  console.log('blogs en User', blogs, id)
  const blogsView = blogs.filter (b => b.author.id === id)
  console.log ('users recovered', users)
  const userSelected = users.filter (u => u.id === id)[0]

  if (!userSelected) {
    return null
  }

  return (
    <div>
      <p>blogs de {userSelected.name}</p>
      <ul>
        {blogsView.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User



