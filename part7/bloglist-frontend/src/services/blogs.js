import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const updateBlog = async (newObject) => {
  const updatedBlog = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  console.log('this is the service returned data:', updatedBlog.data)
  return updatedBlog.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const blogToBeDeleted = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('blogToBeDeleted', blogToBeDeleted)
  console.log('DATAFOR: blogToBeDeleted', blogToBeDeleted.data)
  return blogToBeDeleted.data
}

export default { getAll, create, setToken, updateBlog, deleteBlog }