import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'React hooks are cool',
    important: false
  },
  {
    id: 3,
    content: 'HTTP methods are useful',
    important: true
  }
]

createRoot(document.getElementById('root')).render(<App notes={notes} />)
