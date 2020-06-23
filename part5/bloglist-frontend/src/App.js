import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    const newBlogs = blogs.map((blog) => { 
      return blog.id === updatedBlog.id ? updatedBlog : blog
    })
    setBlogs(newBlogs) 
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
    .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage('')
        setErrorMessage('Created')
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      })
  }
  
  const deleteBlog = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this entry?')

    if (confirm) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setErrorMessage('Blog Deleted')
      setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
    }
  }
  

  const blogForm = () => (
    <Togglable buttonLabel="Add a blog" > 
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  if (user === null) {
    return (
      <div>
      <h2>Log in to see posts</h2>
      <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  const blogsSortedLikes = [...blogs].sort((a, b) => b.likes - a.likes)
 
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in</p> <button onClick={handleLogout}>log out</button>
      {blogForm()}
      {blogsSortedLikes.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            handleLike={handleLike} 
            handleDelete={deleteBlog} 
            user={user}
          />
      )}
    </div>
  )
}

export default App