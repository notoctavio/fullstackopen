import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Contact from './components/Contact'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Notification from './components/Notification'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  )

  // Fetch contacts from the server when the component mounts
  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
        console.log('Fetched contacts from the server:', initialContacts)
      })
      .catch(() => {
        alert('Could not fetch contacts. Please try again.')
      })
  }, [])

  // Function to delete a contact
  const deleteContact = id => {
    const contactToDelete = contacts.find(contact => contact.id === id)
    if (window.confirm(`Delete ${contactToDelete.name}?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setContacts(currentContacts => currentContacts.filter(contact => contact.id !== id))
          console.log(`Deleted contact with id ${id}`)
        })
        .catch(error => {
          const isMissing = error.response?.status === 404
          setError(
            isMissing
              ? `Information of ${contactToDelete.name} has already been removed from server`
              : 'Failed to delete the contact. Please try again.'
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
          if (isMissing) {
            setContacts(currentContacts => currentContacts.filter(contact => contact.id !== id))
          }
        })
    }
  }

  const addContact = (newContact) => {
    if (isSaving) {
      return Promise.resolve(null)
    }

    const existingContact = contacts.find(
      contact => contact.name === newContact.name
    )

    if (existingContact) {
      const confirmed = window.confirm(
        `${existingContact.name} is already in the phonebook. Replace the old number?`
      )

      if (!confirmed) {
        return Promise.resolve(null)
      }

      const updatedContact = {
        name: existingContact.name,
        number: newContact.number,
      }

      setIsSaving(true)
      setError(null)

      return contactService
        .update(existingContact.id, updatedContact)
        .then(returnedContact => {
          setContacts(currentContacts =>
            currentContacts.map(contact =>
              contact.id === existingContact.id
                ? returnedContact
                : contact
            )
          )
          setNotification(`Updated ${returnedContact.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)

          return returnedContact
        })
        .catch(error => {
          const isMissing = error.response?.status === 404
          setError(
            isMissing
              ? `Information of ${existingContact.name} has already been removed from server`
              : 'Failed to update the contact. Please try again.'
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
          if (isMissing) {
            setContacts(currentContacts =>
              currentContacts.filter(contact => contact.id !== existingContact.id)
            )
          }
          return null
        })
        .finally(() => {
          setIsSaving(false)
        })
    }
    setIsSaving(true)
    setError(null)

    return contactService
      .create(newContact)
      .then(returnedContact => {
        setContacts(currentContacts => currentContacts.concat(returnedContact))
        console.log('Added new contact:', returnedContact)
        setNotification(`Added ${returnedContact.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        return returnedContact
      })
      .catch(() => {
        alert('Failed to add the contact. Please try again.')
        return null
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} error={error} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new contact</h2>
      <ContactForm addContact={addContact} isSaving={isSaving} />

      <h2>Numbers</h2>
      <ul>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            deleteContact={() => deleteContact(contact.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
