import { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './components/Note'

const notesUrl = 'http://localhost:3003/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch notes from the server when the component mounts
  useEffect(() => {
    axios
      .get(notesUrl)
      .then(response => {
        setNotes(response.data)
      })
      .catch(() => {
        setErrorMessage('Could not load notes. Check that the server is running on port 3003.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Function to add a new note
  const addNote = event => {
    event.preventDefault()

    if (!newNote.trim() || isLoading || isSaving) {
      return
    }

    const noteObject = {
      content: newNote.trim(),
      important: Math.random() < 0.5,
    }

    setIsSaving(true)
    setErrorMessage('')

    // Save the new note to the server
    axios
      .post(notesUrl, noteObject)
      .then(response => {
        console.log(response)
        setNotes(currentNotes => currentNotes.concat(response.data))
        setNewNote('')
      })
      .catch(() => {
        setErrorMessage('Could not save the note. Please try again.')
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  // Function to toggle the importance of a note
  const toggleImportanceOf = id => {
    const url = `${notesUrl}/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    setErrorMessage('')

    //Update the note
    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(currentNotes =>
          currentNotes.map(note => note.id !== id ? note : response.data)
        )
      })
      .catch(() => {
        setErrorMessage('Could not update the note. Please try again.')
      })
  }

  // Function to handle changes in the new note input field
  const handleNoteChange = event => {
    setNewNote(event.target.value)
  }

  // Determine which notes to show based on the showAll state
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      {errorMessage && <p role="alert">{errorMessage}</p>}
      {isLoading && <p>Loading notes...</p>}
      <button type="button" onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <label htmlFor="new-note">New note </label>
        <input
          id="new-note"
          value={newNote}
          onChange={handleNoteChange}
          disabled={isLoading || isSaving}
          required
        />
        <button
          type="submit"
          disabled={isLoading || isSaving || !newNote.trim()}
        >
          {isSaving ? 'saving...' : 'save'}
        </button>
      </form>
    </div>
  )
}

export default App
