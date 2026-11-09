import App from './App.jsx'
import axios from 'axios'

const promise = axios.get('https://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('https://localhost:3001/foobar')
console.log(promise2)

createRoot(document.getElementById('root')).render(<App />)
