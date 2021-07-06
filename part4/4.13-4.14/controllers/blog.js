const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', async (request, response) => {
  await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  const savedblog = await blog.save()
  response.json(savedblog.toJSON()).status(201)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  console.log(id)
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
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
