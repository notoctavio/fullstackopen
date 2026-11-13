import axios from 'axios'
const baseURL = 'http://localhost:3003/api/notes'

const getAll = () => {
    console.log('Fetching all notes...')
    return axios.get(baseURL)
}

const create = newObject => {
    console.log('Creating a new note...')
    return axios.post(baseURL, newObject)
}

const update = (id, updatedObject) => {
    console.log(`Updating note with id ${id}...`)
    return axios.put(`${baseURL}/${id}`, updatedObject)
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update 
}