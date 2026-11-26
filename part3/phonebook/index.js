require('dotenv').config()

const express = require('express')
const Contact = require('./models/contact')

const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/contacts', (request, response, next) => {
  Contact.find({})
    .then(contacts => {
      response.json(contacts)
    })
    .catch(next)
})

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).json({ error: 'contact not found' })
      }

      response.json(contact)
    })
    .catch(next)
})

app.post('/api/contacts', (request, response, next) => {
  const body = request.body || {}

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

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(next)
})

app.put('/api/contacts/:id', (request, response, next) => {
  const body = request.body || {}

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, {
    returnDocument: 'after',
    runValidators: true,
  })
    .then(updatedContact => {
      if (!updatedContact) {
        return response.status(404).json({ error: 'contact not found' })
      }

      response.json(updatedContact)
    })
    .catch(next)
})

app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(deletedContact => {
      if (!deletedContact) {
        return response.status(404).json({ error: 'contact not found' })
      }

      response.status(204).end()
    })
    .catch(next)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.path === '_id') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
