const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.9y75oto.mongodb.net/notesApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: true
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP',
        important: false
    }
]

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === Number(id))

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.post('/api/notes', (request, response) => {
    const body = request.body || {}

    if (!body.content) {
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const note = {
        id: (Math.floor(Math.random() * 100000)).toString(),
        content: body.content,
        important: Boolean(body.important || false)
    }

    notes = notes.concat(note)

    response.json(note)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})