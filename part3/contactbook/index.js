require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person'
  )
)

morgan.token('person', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

//Api info page
app.get('/info', (request, response, next) => {
  Contact.find({})
    .then((contacts) => {
      response.send(
        `<div>Phonebook has info for ${contacts.length} people</div>
            <div>${new Date()}</div>`
      )
    })
    .catch((error) => next(error))
})

//Search and edit if name is already found
app.put('/api/persons/:id', (request, response, next) => {
  const name = request.body.name
  const number = request.body.number

  Contact.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then((updatedContact) => {
      response.json(updatedContact)
    })
    .catch((error) => next(error))
})

//Add new contact to contact book
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact
    .save()
    .then((savedContact) => {
      response.json(savedContact)
    })
    .catch((error) => next(error))
})

//Get all persons from contactbook
app.get('/api/persons', (request, response, next) => {
  Contact.find({})
    .then((contacts) => {
      response.json(contacts)
    })
    .catch((error) => next(error))
})

//Delete contact by id
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

//Get the contact with certain id number
app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// UnknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

//PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
