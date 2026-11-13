import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

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

  // Function to delete a person
  const deletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(currentPersons => currentPersons.filter(p => p.id !== id))
          console.log(`Deleted person with id ${id}`)
          console.log('Updated persons list:', persons.filter(p => p.id !== id))
        })
        .catch(() => {
          alert(`Failed to delete ${personToDelete.name}. Please try again.`)
        })
    }
  }

  const addPerson = (newPerson) => {
    if (isSaving) {
      return Promise.resolve(null)
    }

    setIsSaving(true)

    return personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(currentPersons => currentPersons.concat(returnedPerson))
        console.log('Added new person:', returnedPerson)
        return returnedPerson
      })
      .catch(() => {
        alert('Failed to add the person. Please try again.')
        return null
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} isSaving={isSaving} />

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
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
