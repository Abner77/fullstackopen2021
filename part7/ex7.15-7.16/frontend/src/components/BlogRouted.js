/* eslint-disable linebreak-style */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogsReducer'
import Login from './LoginForm'


const BlogRouted = ( { handlelogoff } ) => {
  const dispatch = useDispatch()
  const blogs = useSelector (state => state.blogs)
  console.log ('blogs en BlogRouted', blogs)
  const user = useSelector (state => state.user)
  const id = useParams().id
  const blog = blogs.filter(b => b.id === id)[0]
  console.log (id)

  const likeHandler = (event) => {
    blog.likes += 1
    const blogtoUpdate = { id: blog.id, title: blog.title, url:blog.url, likes:blog.likes, author: blog.author.id }
    dispatch(updateBlog(user, blogtoUpdate))
  }

  return (
    <div>
      {user == null ? <Login />  : 'Logged as ' + user.username }
      {user != null ? <button id="logoff" onClick={handlelogoff}>Log off</button> : null}
      {user != null ? <h2>blogs</h2> : null}
      {blog != null ? <h2>{blog.title}</h2> : null}
      {blog != null ? <p><a href={blog.url}>{blog.url}</a></p> : null}
      {blog != null ? <p>likes: {blog.likes}  <button onClick={likeHandler}>like</button></p> : null}
      {blog != null ? <p>Added by {blog.author.name}</p> : null}
    </div>
  )
}

export default BlogRouted