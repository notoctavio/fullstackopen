require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/api/notes', (request, response) => {
    return Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    return Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body || {}

    if (!body.content) {
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    return note.save().then(savedNote => {
        response.json(savedNote)
    })
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
