import App from './App.jsx'
import axios from 'axios'
import { createRoot } from 'react-dom/client'

const promise = axios
    .get('http://localhost:3001/notes')
    .then(response => {
        const notes = response.data
        console.log(notes)
    })

createRoot(document.getElementById('root')).render(<App />)
