const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)



describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
  })
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('testPassword', saltRounds)

    const user = new User({
      username: 'testUser',
      passwordHash,
    })

    await user.save()

    await api
      .post('/api/login')
      .send({ username: 'testUser', password: 'testPassword' })
      .then((response) => {
        return (token = response.body.token)
      })
    console.log('this is the token', token)
    return token
  })

  test('suceeds with valid data', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Joshua Douglas',
      url: 'www.loremipsum.com',
      likes: 0
    }

    console.log('TOKENISHERE', token)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.notesInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('testPassword', saltRounds)

    const user = new User({
      username: 'testUser',
      passwordHash,
    })

    await user.save()

    await api
      .post('/api/login')
      .send({ username: 'testUser', password: 'testPassword' })
      .then((response) => {
        return (token = response.body.token)
      })

    const newBlog = {
      title: 'Dont steal our software',
      author: 'Bill Gates',
      url: 'www.microsoft.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    return token
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
  })
  test('succeeds with status code of 200 if id is valid', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blogToUpdate = blogsAtStart[0]


    const updatedBlog = {
      ...blogToUpdate,
      likes: (blogToUpdate.likes + 1)
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    console.log(updatedBlog)
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})