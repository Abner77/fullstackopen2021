require('dotenv').config()
const express = require('express') //json y otras cosas que hace, como ayudar a la hora de construir las operaciones como get, post, etc.
const morgan = require('morgan') //esto es un middelware para mostrar cada petición en la consola
const cors = require('cors')  //cross-site, permite que haya en una peticion, peticiones a diferentes urls que la que se sirve desde aquí. 
const mongoose = require('mongoose')  //librería para conectarse y operar con mongodb
const Person = require('./models/person')



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))   //middleware que hace que se ejecute el build 
morgan.token('body', (req, res) => JSON.stringify(req.body));  //configuración de morgan para que aparezca el/los objetos json del body (que están en jsonm por express, si no, serían una cadena)
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))

//middleware propio para gestionar los erroes  (mostrarlos)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // this has to be the last loaded middleware.
  app.use(errorHandler)




app.get('/info', (request, response) => {    
    Person.find({}).then (persons => {
        response.status(200).send(`Phonebook has info for ${persons.length} <br/> ${new Date()}`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })


app.get('/api/persons/:id', (request, response) => {    
    Person.findById(request.params.id).then(person => {
                if (person)
                    response.json(person)
                else
                    response.status(404).end()
            }
        )
        .catch(error => {next(error)})
    }    
)

app.delete ('/api/persons/:id', (request, response) =>{           
    Person.findByIdAndRemove(request.params.id).then(response.status(204).end()).catch(error => next(error))
})


// app.post('/api/persons/:id', (request, response) =>{    
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)  
//     if (persons.length > 0){

//     }
//     else{
//         response.status(404).end()
//     }
    
// })


app.post('/api/persons', (request, response) => {
    const body = request.body        

    if (!body.name) {      
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }   

    const person = new Person({
        name: body.name,
        number: body.number  
      })

    
    

    person.save().then(result =>{
        console.log('person saved')
        response.json(person)
        //mongoose.connection.close()
    })

    // let filtered = persons.filter(p => p.name === body.name)
    //     //updating the number then
    // if (filtered.length > 0){        
    //     response.status(400).json({error:'entry already exists'})
    // }
    // else{
    //     const person = {      
    //         name: body.name,
    //         number: body.number,
    //         id: generateId(),
    //         }    
    //         persons = persons.concat(person)            
    //         response.json(person)    
    // }                   
  })

app.put('/api/persons/:id', (request, response) => {
    const body = request.body 
    const id = request.params.id

    const newPerson = {'number':body.number}
    

    Person.findByIdAndUpdate(id, newPerson).then(p => response.status(200).end())
        .catch(error => {
                console.log("erroe", error)
                response.status(400).json({error:'entry not found'})}
            )             
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})