import React, { useState, } from 'react'
import {useField} from './hooks/index'
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (       
      <div>
        <Link style={padding} to='/anecdotes'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>    
  )
}

const Anecdote = ({ anecdotes }) => {
  const match = useRouteMatch('/anecdotes/:id')    
  const anecdote = match 
    ? anecdotes.find(a => a.id === match.params.id)
    : anecdotes
  return (
    <div>
      <h2>Anecdotes</h2>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <p>has {anecdote.votes} votes</p>
      <p>for more info visit <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {  
  
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
  )
}

const Notification = ({message}) => {

  if (message !== '') {
    return (
      <div>
          {message}
      </div>
    )
  } else
  return null

}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {  
  const contenido = useField()
  const autor = useField()
  const info = useField()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({ content:contenido.value, author:autor.value, info: info.value, votes: 0  })
    props.handleNotification('Anecdote has been created')
  }
  const handleClear = (e) =>{
    e.preventDefault()
    contenido.reset()
    autor.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contenido} reset=''  />
        </div>
        <div>
          author
          <input name='author' {...autor} reset=''/>
        </div>
        <div>
          url for more info
          <input name='info' {...info} reset=''/>
        </div>
        <button type='submit'>create</button><button onClick={handleClear}>cancel</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
    
  // const anecdotetemp = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  // setAnecdotes([anecdotetemp])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  let timeouthandler = 0

  const handleNotification = (message) => {
    setNotification(message)
    clearTimeout(timeouthandler)
    timeouthandler = setTimeout(() => setNotification(''), 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  // if (id) {
  //   setAnecdotes(anecdoteById(id))
  // }

  return (
    <div>      
      <Router>
        <Menu />
        <Notification message={notification}/>
        <Switch>          
          <Route path="/anecdotes/:id">
          <h1>Software anecdotes</h1>
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/anecdotes">
            <h1>Software anecdotes</h1>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} handleNotification={handleNotification} />
          </Route>
          <Router path="/about">
            <About />
          </Router>
        </Switch>
      </Router>
      <Footer />
    </div>                                        
  )
}

export default App;