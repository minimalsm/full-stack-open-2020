import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new blog</h2>
        <div>
        title:
          <input 
            value={title} 
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input 
            value={author} 
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input 
            value={url} 
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create it</button>
      </form>
    </div>
  )
}

export default BlogForm