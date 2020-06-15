const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
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

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated correctly', () => {
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(35)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
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
      title: 'Dale Carnegie',
      author: 'Joshua',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'It is not going to rain tomorrow',
      author: 'Bob',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 20,
      __v: 0
    }
  ]


  test('is not find when there are no blogs', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog the favorite is that one blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(...listWithOneBlog)
  })

  test('when list has many blog the one with the most likes is the favorite', () => {
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(
      {
        _id: '5a422aa71b54a676234d17f2',
        title: 'It is not going to rain tomorrow',
        author: 'Bob',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 20,
        __v: 0
      })
  })
})