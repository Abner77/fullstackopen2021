const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/loginrouter')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const url = config.MONGODB_URI
console.log('url de conexión a mongo ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.getTokenFrom)
app.use('/api/blogs', middleware.userExtractor)
app.use(middleware.requestLogger)

app.use('/', blogsRouter)
app.use('/', usersRouter)
app.use('/', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
