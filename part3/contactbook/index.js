const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

const max = 999999;
const min = 1;

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
      
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523" 
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
      
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122" 
    }
  ]

morgan.token('person', (request) => {
  if (request.method === "POST"){
    return JSON.stringify(request.body)
  }
})

app.use(cors())

app.use(express.static('build'))
app.use(express.json())


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.get('/info', (request, response) => {
    const len = persons.length;
    const date = new Date();
    response.send(
        `<div>Phonebook has info for ${len} people</div>
        <div>${date}</div>`
    )
})

const generateId = () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body.number)
  console.log(body.name)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing' 
    })
  }
  if(persons.find(person => person.name === body.name))
  {return response.status(400).json({
    error: 'name must be unique'
  })}


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  response.json(person)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})