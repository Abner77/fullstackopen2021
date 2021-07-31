/* eslint-disable linebreak-style */
import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlogLikes, addBlogComment } from '../reducers/blogsReducer'
import Login from './LoginForm'


const BlogRouted = ( { handlelogoff } ) => {
  const [comment, setComment] = useState ('')
  const dispatch = useDispatch()
  const blogs = useSelector (state => state.blogs)
  console.log ('blogs en BlogRouted', blogs)
  const user = useSelector (state => state.user)
  const id = useParams().id
  const blog = blogs.filter(b => b.id === id)[0]
  console.log (id)
  console.log ('comments', blog.comments)

  const likeHandler = (event) => {
    blog.likes += 1
    const blogtoUpdate = { id: blog.id, title: blog.title, url:blog.url, likes:blog.likes, author: blog.author.id }
    dispatch(updateBlogLikes(user, blogtoUpdate))
  }
  const commentHandler = (event) => setComment(event.target.value)
  const addCommentHandler = (event) => {
    event.preventDefault()
    console.log('addCommentHandler', blog)
    const newBlog = { ...blog }
    newBlog.comments.push(comment)
    dispatch(addBlogComment(user, newBlog))
  }

  if (user == null) {
    return (
      <div>
        <Login />
      </div>
    )
  }

  return (
    <div>
      <p>Logged as {user.username}</p>
      <button id="logoff" onClick={handlelogoff}>Log off</button>
      <h2>blogs</h2>
      <h3>{blog.title}</h3>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>likes: {blog.likes}  <button onClick={likeHandler}>like</button></p>
      <p>Added by {blog.author.name}</p>
      <h3>comments</h3>
      <ul>
        {blog.comments.length !== 0 ? blog.comments.map(c => <li key={c}>{c}</li>) : 'no comments yet'}
      </ul>
      <input type='text' onChange={commentHandler} value={comment} /> <button onClick={addCommentHandler}>Add comment</button>
    </div>
  )
}

export default BlogRouted