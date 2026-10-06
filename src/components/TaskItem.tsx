const subjects = {
  programacion: 'Programación',
  matematicas: 'Matemáticas',
  historia: 'Historia',
} as const

type SubjectId = keyof typeof subjects

type TaskItemProps = {
  id: string
  title: string
  subject: SubjectId
  done: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ id, title, subject, done, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={done ? 'task is-done' : 'task'}>
      <label className="task-check">
        <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
        <span>{title}</span>
      </label>
      <span className={`badge badge-${subject}`}>{subjects[subject]}</span>
      <button type="button" className="delete-button" onClick={() => onDelete(id)}>
        Eliminar
      </button>
    </li>
  )
}
