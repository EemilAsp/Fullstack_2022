import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

//compiles with warning - does not make sense ?
// eslint-disable-next-line
export default { getAll, create, update, deleteContact }