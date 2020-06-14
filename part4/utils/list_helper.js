const totalLikes = (blogs) => {
  let newArray = blogs.map(blog => blog.likes)

  return newArray.reduce((total, amount) => total + amount, 0)
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = {}

  blogs.forEach(blog => {
    if (blog.likes > favoriteBlog.likes || blog.likes) {
      favoriteBlog = blog
    }
  })

  return favoriteBlog
}

module.exports = {
  totalLikes,
  favoriteBlog
}