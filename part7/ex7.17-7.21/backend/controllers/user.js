const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

const iup = (user) => {
  return { id: user.id, username: user.username, name: user.name }
}

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({ })
  const userresponse = users.map(u => iup(u))
  response.json(userresponse)
})

usersRouter.post('/api/users', async (request, response) => {
  console.log('body', request.body)
  const pwd = request.body.password
  if (pwd) {
    if (pwd.length < 3) {
      response.status(400).json({ error: 'password and username must be at least 3 characters' })
      return
    }
  }
  request.body.password = await bcrypt.hash(pwd, saltRounds)
  console.log(request.body)
  const newuser = new User(request.body)
  try {
    const saveduser = await newuser.save()
    response.json(saveduser.toJSON())
  } catch (e) {
    response.status(400).json({ error: 'password and username must be at least 3 characters and username must be available and unique' })
  }
})

// blogsRouter.delete('/api/blogs/:id', async (request, response) => {
//   const id = request.params.id
//   console.log(id)
//   await Blog.findByIdAndDelete(id)
//   response.status(204).end()
// })

// blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
//   const id = request.params.id
//   const updblog = {
//     likes: request.body.likes
//   }
//   try {
//     const result = await Blog.findByIdAndUpdate(id, updblog)
//     if (result) response.status(200).end()
//   } catch (ex) {
//     response.statusMessage = ex.toString()
//     response.status(400).end()
//   }
// })

module.exports = usersRouter
