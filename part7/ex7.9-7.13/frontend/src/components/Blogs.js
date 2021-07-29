/* eslint-disable linebreak-style */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBlogs } from '../reducers/blogsReducer'
import Blog from './Blog'
import React from 'react'

const Blogs = ( ) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user)
  console.log('token en blogs', token)
  useEffect(() => {
    if (token)
      dispatch(getBlogs(token))
  }, [token, dispatch])
  const blogs = useSelector (state => state.blogs)

  return (
    <div>
      {blogs.length > 0 ? blogs.map(blog => <Blog key={blog.id} blog={blog} author={blog.author} updateHandler={null} />) : ''}
    </div>
  )
}

export default Blogs