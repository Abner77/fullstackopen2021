/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={addBlog}>
      <Form.Group>
        <p><Form.Label>title</Form.Label><Form.Control name="title" data-testid="title" id="title" type="text" onChange={handleTitleChange} /></p>
        <p><Form.Label>url</Form.Label><Form.Control name="url" data-testid="url" id="url" type="text" onChange={handleUrlChange}/></p>
        <p><Button id="save" type="submit" >Save</Button> </p>
      </Form.Group>
    </Form>
  )
}

export default BlogForm