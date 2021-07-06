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

module.exports = blogsRouter
