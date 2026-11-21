import { useEffect, useState } from 'react'
import Note from './components/Notes'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch notes from the server when the component mounts
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        setIsLoading(false)
      })
      .catch(() => {
        setErrorMessage('Could not fetch notes. Please try again.')
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
    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log(returnedNote)
        setNotes(currentNotes => currentNotes.concat(returnedNote))
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
    const note = notes.find(n => n.id === id) 
    const changedNote = { ...note, important: !note.important }

    //Update the note
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(currentNotes =>
          currentNotes.map(note => note.id !== id ? note : returnedNote)
        )
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content} was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
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
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  )
}

export default App
