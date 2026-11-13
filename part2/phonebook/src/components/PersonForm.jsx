import { useState } from 'react'

const PersonForm = ({ addPerson, isSaving }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()

    if (!name || !number || isSaving) {
      return
    }

    addPerson({ name, number }).then(savedPerson => {
      if (savedPerson) {
        setNewName('')
        setNewNumber('')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="person-name">Name: </label>
        <input
          id="person-name"
          value={newName}
          onChange={event => setNewName(event.target.value)}
          disabled={isSaving}
          required
        />
      </div>
      <div>
        <label htmlFor="person-number">Number: </label>
        <input
          id="person-number"
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

export default PersonForm
