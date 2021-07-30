/* eslint-disable linebreak-style */
// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// import Blog from './Blog'
import React from 'react'



const Users = () => {

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [dispatch])
  // const users = useSelector (state => state.users)
  const blogs = useSelector (state => state.blogs)
  let users = []
  blogs.forEach(blog => {
    if (users.filter( u => u.username === blog.author.username).length === 0) {
      users.push ({ user: blog.author.name, username: blog.author.username, blogs: 1, id: blog.author.id })
    }
    else {
      const filtrados = users.filter( u => u.username === blog.author.username)[0].blogs += 1
      console.log ('filtrados', filtrados)
    }

  })

  return (
    <div>
      <table>
        <tbody>
          {users.length > 0 ? users.map(u => <tr key={u.id}><td key={u.id}><Link  to={'users/'.concat(u.id)} >{u.user}</Link></td><td><b>{u.blogs}</b></td></tr> ) : ''}
        </tbody>
      </table>
    </div>
  )
}

export default Users