/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title: title, url: url }
    createBlog(newBlog)
    setTitle('')
    setUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <p>title<input type="text" onChange={handleTitleChange} /></p>
      <p>url<input type="text" onChange={handleUrlChange}/></p>
      <p><button type="submit" >Save</button> </p>
    </form>
  )
}

export default BlogForm