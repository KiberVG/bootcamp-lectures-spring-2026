import { useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router'
import CreateNotePage from './pages/CreateNotePage.jsx'
import NotesPage from './pages/NotesPage.jsx'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  const createNote = ({ title, content }) => {
    setNotes((currentNotes) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toLocaleString(),
      },
      ...currentNotes,
    ])
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Notes App</h1>
        <nav className="tabs">
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}
          >
            Your Notes
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}
          >
            Create Note
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/notes" replace />} />
          <Route path="/notes" element={<NotesPage notes={notes} />} />
          <Route path="/create" element={<CreateNotePage onCreateNote={createNote} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
