require('dotenv').config()

const express = require('express')
const Contact = require('./models/contact')

const app = express()

let notes = []

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(express.static('dist'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/contacts', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts)
  })
})

app.get('/api/contacts/:id', (request, response) => {
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact)
  })
})

app.post('/api/contacts', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then((savedContact) => {
    response.json(savedContact)
  })
})

app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})