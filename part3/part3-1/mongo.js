const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vizaruoctavio_db_user:${encodeURIComponent(password)}@cluster0.9y75oto.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

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

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})