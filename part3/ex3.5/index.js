const express = require('express')
const app = express()

app.use(express.json())


 let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]


app.get('/info', (request, response) => {
    return response.status(200).send(`Phonebook has info for ${persons.length} <br/> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
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

app.delete ('/api/persons/:id', (request, response) =>{    
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)  
    console.log(persons)
    response.status(204).end()
})

const generateId = () => {    
    return Math.floor(Math.random() * 10000)          
}

app.post('/api/persons', (request, response) => {
    const body = request.body        

    if (!body.name) {      
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }    
    console.log(body)
    const person = {      
      name: body.name,
      number: body.number,
      id: generateId(),
    }

    console.log (persons)
    persons = persons.concat(person)
    response.json(person)    
  })


const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})