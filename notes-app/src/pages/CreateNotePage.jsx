import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function CreateNotePage({ onCreateNote }) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const onSubmit = (formValues) => {
    onCreateNote(formValues)
    reset()
    navigate('/notes')
  }

  return (
    <form className="note-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter a note title"
        {...register('title', {
          required: 'Title is required',
          maxLength: {
            value: 60,
            message: 'Title must be 60 characters or fewer',
          },
        })}
      />
      {errors.title ? <p className="error-message">{errors.title.message}</p> : null}

      <label htmlFor="content">Note</label>
      <textarea
        id="content"
        rows="6"
        placeholder="Write your note here..."
        {...register('content', {
          required: 'Note content is required',
          minLength: {
            value: 5,
            message: 'Note should be at least 5 characters',
          },
        })}
      />
      {errors.content ? <p className="error-message">{errors.content.message}</p> : null}

      <button type="submit">Save Note</button>
    </form>
  )
}

export default CreateNotePage
