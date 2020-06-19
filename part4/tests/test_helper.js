const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f3',
    title: 'Hello World',
    author: 'Joshua',
    url: 'http://www.hello.com',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'It is not going to rain tomorrow',
    author: 'Mr Skye',
    url: 'http://www.weather.com',
    likes: 20,
    __v: 0
  }
]

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, notesInDb, usersInDb
}