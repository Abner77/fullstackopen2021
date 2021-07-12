import React, { useState } from 'react'

const Blog = ({ blog, author, updateHandler }) => {

  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }
  const likeHandler = (event) => {
    blog.likes += 1
    const newblog = { title: blog.title, url:blog.url, likes:blog.likes, author: author.id }
    updateHandler(blog.id, newblog)
  }

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  return (

    <div key={blog.id} id="divblog">
      <div data-testid="divcontraido" style={hideWhenExpanded}>
        {blog.title} {author.name} <button onClick={toggleExpand} >view</button>
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