import axios from 'axios'
const baseURL = 'http://localhost:3003/notes'

const getAll = () => {
    console.log('Fetching all notes...')
    const request = axios.get(baseURL)
    const nonExistentNote = { id: 9999, content: 'This note does not exist', important: true }
    return request.then(response => response.data)
}

const create = newObject => {
    console.log('Creating a new note...')
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, updatedObject) => {
    console.log(`Updating note with id ${id}...`)
    const request = axios.put(`${baseURL}/${id}`, updatedObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }
