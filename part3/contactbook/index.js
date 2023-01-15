require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const max = 999999;
const min = 1;

morgan.token('person', (request) => {
  if (request.method === "POST"){
    return JSON.stringify(request.body)
  }
})

  const generateId = () => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

app.get('/info', (request, response) => {
    const len = persons.length;
    const date = new Date();
    response.send(
        `<div>Phonebook has info for ${len} people</div>
        <div>${date}</div>`
    )
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body.number)
  console.log(body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing' 
    })}

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save().then(savedContact =>{
    response.json(savedContact)
  })
  })

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts =>{
    response.json(contacts)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact =>{
    response.json(contact)
  })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})