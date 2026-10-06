import { TaskItem } from './TaskItem'
import type { StudyTask } from '../hooks/useStudyPlan'

type TaskListProps = {
  tasks: StudyTask[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <section className="task-panel" aria-label="Tareas">
      {tasks.length === 0 ? (
        <p className="empty-state">No hay tareas para este filtro.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
