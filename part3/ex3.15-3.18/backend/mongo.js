const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]
const url =  `mongodb+srv://dbaccess:${password}@cluster0.thowg.mongodb.net/phonebook?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String,
    number: String,  
  })
  
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const Person = mongoose.model('person', personSchema)

//recover all the data stored until now
if (process.argv.length === 3){
    console.log(process.argv.length)

    Person.find({}).then(result => {        
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
        process.exit(0)
      })    
}

if (process.argv.length == 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]  
      })
    person.save().then(result =>{
        console.log('person saved')
        mongoose.connection.close()
    })
}
else {
    console.log("number of parameters incorrect, should provide password name and number (check also quotes for the name in case it has blank spaces");
}







// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })

