import axios from 'axios'
const baseURL = '/api/contacts'

const getAll = () => {
    console.log('Fetching all contacts...')
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    console.log('Creating a new contact...')
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    console.log(`Deleting contact with id ${id}...`)
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log(`Updating contact with id ${id}...`)
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, deleteContact, update }
