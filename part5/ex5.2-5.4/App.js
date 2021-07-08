import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const prepareNotification = (text, boolerror) => {return {message:text, iserror:boolerror}}
  const showMessage = (mensaje, iserror) => {
    setTimeout(() => setNotification(prepareNotification('',false)), 5000)
    setNotification(prepareNotification(mensaje, iserror))              
  }

  const [ notification, setNotification] = useState(prepareNotification('', false))
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  if (user == null){
    //miramos si está en el windows storage
    const sUser = window.localStorage.getItem('loggedUser')      
    if (sUser != null){    
      setUser(JSON.parse(sUser))        
    }
  }            

  const effectUser = user

  //manejadores de eventos
  const handleSubmitLogin = (event) => {
    event.preventDefault()
    
    loginService.signin(username, password)
      .then(result => {
        console.log('result.data', result.data)
        setUser(result.data)
        setUsername('')
        setPassword('')
        window.localStorage.setItem('loggedUser', JSON.stringify(result.data)) 
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
        showMessage('wrong user or password', true)
        setUser(null)
      })
  }
  const handleUserChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleSubmitBlog = (event) => {
    event.preventDefault()
    blogService.create(user.token, { title: title, url: url })
      .then(result => {
        showMessage('new blog added', false)
        blogService.getAll(effectUser.token).then(result => {
          let blogsRecortados = []
          result.data.forEach(blog => blogsRecortados.push({title: blog.title, author: blog.author.name, id:blog.id})) 
          setBlogs( blogsRecortados)
        })  
      })
      .catch(error => showMessage(error.message, true))
  }
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const handlelogoff = (event) => {
    window.localStorage.removeItem('loggedUser') 
    setUser(null)
  }


  useEffect(() => {        
    if (effectUser != null)
    {            
      blogService.getAll(effectUser.token).then(result => {
        let blogsRecortados = []
        result.data.forEach(blog => blogsRecortados.push({title: blog.title, author: blog.author.name, id:blog.id})) 
        setBlogs( blogsRecortados)
      })
    }          
  }, [])
  
  return (    
    <div>    
      <Notification omessage={notification}/>
      {user == null ? <Login handleUser={handleUserChange} handlePassword={handlePasswordChange} handleSubmit={handleSubmitLogin} />  : 'Logged as ' + user.username }  
      {user != null ? <button onClick={handlelogoff}>Log off</button> : null} 
      {user != null ? <h2>blogs</h2> : null}      
      {user != null ? <BlogForm handleTitle={handleTitleChange} handleUrl={handleUrlChange} handleSubmit={handleSubmitBlog} /> : null}
      {blogs.length > 0 ? blogs.map(blog => <Blog key={blog.id} blog={blog} />) : ''}            
    </div>
  )
}

export default App