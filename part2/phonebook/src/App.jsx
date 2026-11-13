import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])

  // Fetch persons from the server when the component mounts
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('Fetched persons from the server:', initialPersons)
      })
      .catch(() => {
        alert('Could not fetch persons. Please try again.')
      })
  }, [])

  const deletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(() => {
          alert(`Failed to delete ${personToDelete.name}. Please try again.`)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <ul>
        {persons.map(person => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />  
        ))}
      </ul>
    </div>
  )
}

export default App