import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleLike, handleDelete, user }) => {
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

  const handleRemoveClick = () => {
    const id = blog.id
    handleDelete(id)
  }

  return (
    <div style={blogStyle}>
      <div className='blog-title'>
        <h4>{blog.title}</h4>
        <p>Author: {blog.author}</p>
      </div>
      <Togglable buttonLabel='See Details' toggleOffLabel='Hide Details'>
        <div className='blog-info'>
          <p>Url: <a href={blog.url}>{blog.url}</a></p>
          <span>Likes: {blog.likes} <button className='blog-like' onClick={handleLikeClick}>like</button></span>
          <p>Added by</p>
        </div>
        {(user.username === blog.user && blog.user.username)
          ? <p><button onClick={handleRemoveClick}>remove</button></p>
          : null}
      </Togglable>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
