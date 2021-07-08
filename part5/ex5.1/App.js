import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  //manejadores de eventos
  const handleSubmitLogin = (event) => {
    event.preventDefault()
    
    loginService.signin(username, password)
      .then(result => {
        console.log('result.data', result.data)
        setUser(result.data)
        setUsername('')
        setPassword('')
        blogService.getAll(result.data.token).then(response =>{
          console.log ('blogs ',  response.data)
          let blogsRecortados = []
          response.data.forEach(blog => blogsRecortados.push({title: blog.title, author: blog.author.name, id:blog.id})) 
          setBlogs( blogsRecortados)
        })
        .catch (error => console.log("error en el catch del getall blogservice ", error))
      })
      .catch(error => { 
        console.log(error)
        alert('user or password incorrect')
        setUser(null)
      })

  }

  const handleUserChange = (event) => { 
    console.log('event' , event)
    setUsername(event.target.value)     
  }
  const handlePasswordChange = (event) => setPassword(event.target.value)

  useEffect(() => {
    if (user !== null)
    {      
      blogService.getAll(user.token).then(result => {
        let blogsRecortados = []
        result.data.forEach(blog => blogsRecortados.push({title: blog.title, author: blog.author.name, id:blog.id})) 
        setBlogs( blogsRecortados)
      })
    }  
  }, [])

  return (    
    <div>    
      {user == null ? <Login handleUser={handleUserChange} handlePassword={handlePasswordChange} handleSubmit={handleSubmitLogin} />  : 'Logged as ' + user.username}  
      {user != null ? <h2>blogs</h2> : null}      
      {blogs.length > 0 ? blogs.map(blog => <Blog key={blog.id} blog={blog} />) : ''}            
    </div>
  )
}

export default App