import type { FormEvent } from 'react'
import type { Subject } from '../hooks/useStudyPlan'

type TaskFormProps = {
  error: string
  onAddTask: (title: string, subject: Subject) => boolean
}

export function TaskForm({ error, onAddTask }: TaskFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get('title') ?? '')
    const subject = String(formData.get('subject') ?? 'programacion') as Subject

    if (onAddTask(title, subject)) form.reset()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>
      <p className="form-help">
        El título es obligatorio y debe tener al menos 3 caracteres.
      </p>

      <label htmlFor="title">Título</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Ej. Repasar los hooks"
        autoComplete="off"
      />

      <label htmlFor="subject">Materia</label>
      <select id="subject" name="subject" defaultValue="programacion">
        <option value="programacion">Programación</option>
        <option value="matematicas">Matemáticas</option>
        <option value="historia">Historia</option>
      </select>

      <p className="form-error" role="alert">{error}</p>

      <button type="submit" className="submit-button">
        Agregar tarea
      </button>
    </form>
  )
}
