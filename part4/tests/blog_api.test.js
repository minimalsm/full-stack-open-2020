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

describe('when there is initially some notes saved', () => {
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
})

describe('addition of a note', () => {
  test('suceeds with valid data', async () => {
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

  test('when no likes are passed defaults likes to 0', async () => {
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

  test('fails when title is not present', async () => {
    const newBlog = {
      author: 'Joshua Douglas',
      url: 'www.loremipsum.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.notesInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails when url is not present', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Joshua Douglas',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.notesInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a note', () => {
  test('suceeds with status code 204 if id is invalid', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.notesInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})