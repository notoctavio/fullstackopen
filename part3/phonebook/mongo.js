const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('usage: node mongo.js password [name number]')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://vizaruoctavio_db_user:${encodeURIComponent(password)}@cluster0.9y75oto.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url, { family: 4 })
  .then(() => {
    if (process.argv.length === 3) {
      return Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
      })
    }

    const person = new Person({ name, number })
    return person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
    })
  })
  .finally(() => mongoose.connection.close())
  .catch(error => {
    console.error('MongoDB error:', error.message)
    process.exitCode = 1
  })
