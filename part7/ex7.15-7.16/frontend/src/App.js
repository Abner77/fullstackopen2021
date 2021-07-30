import React, { useRef } from 'react'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Login from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogRouted from './components/BlogRouted'
import Notification from './components/Notification'
import User from './components/User'
// import { showMessage } from './reducers/notificationReducer'
// import { getBlogs } from './reducers/blogsReducer'
import Toggable from './components/Toggable'
// import blogService from './services/blogs'
// import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { logOff, recoverLoggedUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'



const App = () => {

  // const prepareNotification = (text, boolerror) => {return { message:text, iserror:boolerror }}
  // const showMessage = (mensaje, iserror) => {
  //   setTimeout(() => setNotification(prepareNotification('',false)), 5000)
  //   setNotification(prepareNotification(mensaje, iserror))
  // }
  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  console.log ('user app', user)
  if (user === undefined || user === null)
  {
    dispatch (recoverLoggedUser())
  }

  // const [ notification, setNotification] = useState(prepareNotification('', false))
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const padding = {
    padding: 5
  }


  const blogFormRef = useRef()

  // if (user === null){
  //   //miramos si está en el windows storage
  //   const sUser = window.localStorage.getItem('loggedUser')
  //   if (sUser != null){
  //     user = JSON.parse(sUser)
  //   }
  // }

  // const effectUser = user

  //manejadores de eventos
  // const handleSubmitLogin = (event) => {
  //   event.preventDefault()

  //   loginService.signin(username, password)
  //     .then(result => {
  //       console.log('result.data', result.data)
  //       setUser(result.data)
  //       setUsername('')
  //       setPassword('')
  //       window.localStorage.setItem('loggedUser', JSON.stringify(result.data))
  //       dispatch (getBlogs(result.data))
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       dispatch(showMessage('wrong user or password', true, 5))
  //       setUser(null)
  //     })
  // }
  // const handleUserChange = (event) => setUsername(event.target.value)
  // const handlePasswordChange = (event) => setPassword(event.target.value)

  // const createBlog = (newBlog) => {
  //   blogService.create(user.token, { title: newBlog.title, url: newBlog.url })
  //     .then(result => {
  //       dispatch(showMessage('new blog added', false, 5))
  //       blogFormRef.current.toggleVisibility()
  //       // getAllPostsSortedByLieks()
  //     })
  //     .catch(error => dispatch(showMessage(error.message, true, 5)))
  // }

  // const updateBlog = (id, blogtoUpdate) => {

  //   blogService.update(user.token, id, blogtoUpdate)
  //     .then (result => {
  //       showMessage('blog updated', false)
  //       // getAllPostsSortedByLieks()
  //     })
  //     .catch (error => showMessage(error.message, true))
  // }

  const handlelogoff = (event) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logOff())
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>

      <Switch>
        <Route path='/users/:id'>
          <User user={user}/>
        </Route>
        <Route path='/users'>
          <Users handlelogoff={handlelogoff}/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogRouted/>
        </Route>
        <Route path="/">
          <div>
            <Notification/>
            {user == null ? <Login />  : 'Logged as ' + user.username }
            {user != null ? <button id="logoff" onClick={handlelogoff}>Log off</button> : null}
            {user != null ? <h2>blogs</h2> : null}
            <Toggable buttonLabel='create new blog' ref={blogFormRef}>
              {user != null ? <BlogForm token={user}/> : null}
            </Toggable>
            <Blogs/>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App