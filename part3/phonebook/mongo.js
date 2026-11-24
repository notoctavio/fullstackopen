const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vizaruoctavio_db_user:${encodeURIComponent(password)}@cluster0.9y75oto.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: 'John Doe',
  number: '123-456-7890',
})

// mongoose.connect(url, { family: 4 })
//   .then(() => note.save())
//   .then(() => {
//     console.log('note saved!')
//   })
//   .finally(() => mongoose.connection.close())
//   .catch(error => {
//     console.error('MongoDB error:', error.message)
//     process.exitCode = 1
//   })

mongoose.connect(url, { family: 4 })
  .then(() => Note.find({}))
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
  })
  .finally(() => mongoose.connection.close())
  .catch(error => {
    console.error('MongoDB error:', error.message)
    process.exitCode = 1
  })
