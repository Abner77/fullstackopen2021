import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlogLikes } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, author }) => {

  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector (state => state.user)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }
  const likeHandler = (event) => {
    blog.likes += 1
    const blogtoUpdate = { id: blog.id, title: blog.title, url:blog.url, likes:blog.likes, author: author.id }
    dispatch(updateBlogLikes(token, blogtoUpdate))
  }

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  return (

    <div key={blog.id} id="divblog">
      <div data-testid="divcontraido" style={hideWhenExpanded}>
        <Link to={'/blogs/'.concat(blog.id)} >{blog.title}</Link> {author.name} <Button size='sm' onClick={toggleExpand} >view</Button>
      </div>
      <div data-testid="divexpandido"  style={showWhenExpanded}>
        <p>{blog.title}  <Button size='sm' onClick={toggleExpand}>hide</Button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}  <Button size='sm' onClick={likeHandler}>like</Button></p>
        <p>{author.name}</p>
        <p> </p>
      </div>
    </div>



  )
}

export default Blog