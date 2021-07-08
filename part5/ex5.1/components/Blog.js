import React from 'react'

const Blog = ({blog}) => {
  console.log ('blog unitario', blog)
  return (
    <div key={blog.id}> 
      {blog.title} {blog.author}
    </div>  
  )
}

export default Blog