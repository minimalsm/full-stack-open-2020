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

const update = async (newObject) => {
  const updatedBlog = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  console.log('this is the service returned data:', updatedBlog.data)
  return updatedBlog.data
}

export default { getAll, create, setToken, update }