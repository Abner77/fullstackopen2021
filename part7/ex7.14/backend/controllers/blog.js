const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { name: 1, username: 1 })
  console.log(blogs)
  response.json(blogs)
})

// const getTokenFrom = request => {
//   const authorization = request.get('Authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.post('/api/blogs', async (request, response) => {
  console.log('request.tolen en router', request.token)
  const blog = new Blog(request.body)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
  blog.author = user._id
  const savedblog = await blog.save()
  response.json(savedblog.toJSON()).status(201)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogABorrar = await Blog.findById(id)
  console.log(blogABorrar.author + ' ------- ' + decodedToken.id)
  if (blogABorrar.author.toString() === decodedToken.id.toString()) {
    console.log('id a borrar', id)
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else response.status(400).json({ error: 'you don\'t have permissions to delete this blog' })
})

blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const id = request.params.id
  const updblog = {
    likes: request.body.likes
  }
  try {
    const result = await Blog.findByIdAndUpdate(id, updblog)
    if (result) response.status(200).end()
  } catch (ex) {
    response.statusMessage = ex.toString()
    response.status(400).end()
  }
})

module.exports = blogsRouter
