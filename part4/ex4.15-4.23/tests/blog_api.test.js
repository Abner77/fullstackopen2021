const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const blogsStart = [
  {
    title: 'Ameritamientos del javascript',
    author: 'David Cristóbal',
    url: 'http://fuckstackopen.hard',
    likes: 4
  },
  {
    title: 'Despotricando de async',
    author: 'Luisa Domingas',
    url: 'http://pron-ounces.tough',
    likes: 100
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await new Blog(blogsStart[0]).save()
  await new Blog(blogsStart[1]).save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('property id is included in blog', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('if the likes property is missing, make sure it is saved as 0', async () => {
  const newblog2 = {
    title: 'prueba de objectos sin likes',
    author: 'José Jiménez',
    url: 'http://bored-panda.com'
  }
  const response = await api.post('/api/blogs').send(newblog2).expect(200)
  expect(response.body.likes).toBeDefined()
  if (response.body.likes) {
    expect(response.body.likes).toBe(0)
  }
})

test('a post has been correctly saved to the database', async () => {
  const response = await api.get('/api/blogs')
  const totalBlogs = response.body.length
  const newblog = {
    title: 'un curso geniaal',
    author: 'Pepe Pérez',
    url: 'http://tomshardware.com',
    likes: 4
  }
  await api.post('/api/blogs').send(newblog).expect(200)

  const blogsAtEnd = await api.get('/api/blogs')
  const endBlogs = blogsAtEnd.body.length
  expect(endBlogs).toBe(totalBlogs + 1)
})

test('missing properties url and or title', async () => {
  const newblog = {
    author: 'Poncio Pelado',
    likes: 3
  }
  await api.post('/api/blogs').send(newblog).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
