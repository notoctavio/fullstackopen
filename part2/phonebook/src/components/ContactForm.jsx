import { useState } from 'react'

const ContactForm = ({ addContact, isSaving }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()

    if (!name || !number || isSaving) {
      return
    }

    addContact({ name, number }).then(savedContact => {
      if (savedContact) {
        setNewName('')
        setNewNumber('')
      }

    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name">Name: </label>
        <input
          id="contact-name"
          value={newName}
          onChange={event => setNewName(event.target.value)}
          disabled={isSaving}
          required
        />
      </div>
      <div>
        <label htmlFor="contact-number">Number: </label>
        <input
          id="contact-number"
          type="tel"
          value={newNumber}
          onChange={event => setNewNumber(event.target.value)}
          disabled={isSaving}
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSaving || !newName.trim() || !newNumber.trim()}
        >
          {isSaving ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
