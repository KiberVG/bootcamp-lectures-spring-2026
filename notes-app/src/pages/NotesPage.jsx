function NotesPage({ notes }) {
  if (notes.length === 0) {
    return <p className="empty-state">No notes yet. Go to Create Note to add your first one.</p>
  }

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id} className="note-card">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <small>Created: {note.createdAt}</small>
        </li>
      ))}
    </ul>
  )
}

export default NotesPage
