import React from 'react'
const Blog = ({ blog }) => (
  // eslint-disable-next-line
  <div>
    {blog.title} by {blog.author} - <a href={blog.url}>{blog.url}</a>
  </div>
)

export default Blog
