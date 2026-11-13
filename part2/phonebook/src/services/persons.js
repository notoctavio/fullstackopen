import axios from 'axios'
const baseURL = 'http://localhost:3002/persons'

const getAll = () => {
    console.log('Fetching all persons...')
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    console.log('Creating a new person...')
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    console.log(`Deleting person with id ${id}...`)
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson }
