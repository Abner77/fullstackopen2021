import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

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
    dispatch(updateBlog(token, blogtoUpdate))
  }

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  return (

    <div key={blog.id} id="divblog">
      <div data-testid="divcontraido" style={hideWhenExpanded}>
        <Link to={'/blogs/'.concat(blog.id)} >{blog.title}</Link> {author.name} <button onClick={toggleExpand} >view</button>
      </div>
      <div data-testid="divexpandido"  style={showWhenExpanded}>
        <p>{blog.title}  <button onClick={toggleExpand}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}  <button onClick={likeHandler}>like</button></p>
        <p>{author.name}</p>
        <p> </p>
      </div>
    </div>



  )
}

export default Blog