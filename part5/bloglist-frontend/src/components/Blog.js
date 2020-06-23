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
      <h4>{blog.title}</h4>
      <Togglable buttonLabel='See Details' toggleOffLabel='Hide Details'>
        <p>Url: <a href={blog.url}>{blog.url}</a></p>
        <span>Likes: {blog.likes} <button onClick={handleLikeClick}>like</button></span>
        <p>Author: {blog.author}</p>
        <p>Added by {blog.user.username}</p>
        {user.username === blog.user.username
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
