const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_api_test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('should have an id property named id', async () => {
  const blogs = await api.get('/api/blogs')
  console.log(blogs.body[0])
  expect(blogs.body[0].id).toBeDefined()
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Joshua Douglas',
    url: 'www.loremipsum.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.notesInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'New Blog'
  )
})

test('a new blog with no likes in params defaults to 0', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Joshua Douglas',
    url: 'www.loremipsum.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.notesInDb()
  const addedBlog = blogsAtEnd[3]

  expect(addedBlog.likes).toEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
})