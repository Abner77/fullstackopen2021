/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
// import { showMessage } from '../reducers/notificationReducer'

const BlogForm = ({ token }) => {

  console.log('token', token)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => setUrl(event.target.value)


  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title: title, url: url }
    dispatch(createBlog(token, newBlog))
    setTitle('')
    setUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <p>title<input data-testid="title" id="title" type="text" onChange={handleTitleChange} /></p>
      <p>url<input data-testid="url" id="url" type="text" onChange={handleUrlChange}/></p>
      <p><button id="save" type="submit" >Save</button> </p>
    </form>
  )
}

export default BlogForm