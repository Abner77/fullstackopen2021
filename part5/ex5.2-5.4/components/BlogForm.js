import React from 'react'

const BlogForm = ({handleTitle, handleUrl, handleSubmit}) => {  


  return (    
    <form onSubmit={handleSubmit}>
      <p>title<input type="text" onChange={handleTitle} /></p>
      <p>url<input type="text" onChange={handleUrl}/></p>
      <p><button type="submit">Save</button> </p>
    </form>    
  )
}

export default BlogForm