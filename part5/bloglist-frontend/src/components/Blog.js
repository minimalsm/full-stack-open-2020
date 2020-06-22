import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = () => {
    const changedBlog = { 
      likes: ++blog.likes, 
      ...blog, 
    }

    handleLike(changedBlog)
  }

  return (
    // eslint-disable-next-line
    <div style={blogStyle}>
      <h4>{blog.title}</h4>
      <Togglable buttonLabel='See Details' toggleOffLabel='Hide Details'>
      <p>Url: <a href={blog.url}>{blog.url}</a></p>
      <span>Likes: {blog.likes} <button onClick={handleLikeClick}>like</button></span>
      <p>Author: {blog.author}</p>
      </Togglable>
    </div>
)}
export default Blog
