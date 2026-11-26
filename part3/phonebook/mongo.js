const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${encodeURIComponent(password)}@cluster0.9y75oto.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Contact = mongoose.model('Contact', contactSchema)

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

Contact.find({}).then(result => {
  result.forEach(contact => {
    console.log(contact)
  })
  mongoose.connection.close()
})