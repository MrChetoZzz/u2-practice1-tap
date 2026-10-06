import { useReducer } from 'react'

export type Subject = 'programacion' | 'matematicas' | 'historia'
export type TaskFilter = 'all' | 'pending' | 'done'

export type StudyTask = {
  id: string
  title: string
  subject: Subject
  done: boolean
}

type StudyPlanState = {
  tasks: StudyTask[]
  filter: TaskFilter
  error: string
}

type StudyPlanAction =
  | { type: 'add'; task: StudyTask }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'set-filter'; filter: TaskFilter }

const initialState: StudyPlanState = {
  tasks: [],
  filter: 'all',
  error: '',
}

const titleError = 'Escribe un título de al menos 3 caracteres.'

function isValidTitle(title: string) {
  return title.trim().length >= 3
}

function reducer(state: StudyPlanState, action: StudyPlanAction): StudyPlanState {
  switch (action.type) {
    case 'add': {
      const title = action.task.title.trim()

      if (!isValidTitle(title)) {
        return { ...state, error: titleError }
      }

      return {
        ...state,
        tasks: [...state.tasks, { ...action.task, title, done: false }],
        error: '',
      }
    }
    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task,
        ),
      }
    case 'delete':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      }
    case 'set-filter':
      return { ...state, filter: action.filter }
  }
}

export function useStudyPlan() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const completedCount = state.tasks.filter((task) => task.done).length
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'pending') return !task.done
    if (state.filter === 'done') return task.done
    return true
  })

  return {
    tasks: filteredTasks,
    filter: state.filter,
    error: state.error,
    counts: {
      total: state.tasks.length,
      pending: state.tasks.length - completedCount,
      done: completedCount,
    },
    addTask: (title: string, subject: Subject) => {
      const valid = isValidTitle(title)
      dispatch({
        type: 'add',
        task: { id: crypto.randomUUID(), title, subject, done: false },
      })
      return valid
    },
    toggleTask: (id: string) => dispatch({ type: 'toggle', id }),
    deleteTask: (id: string) => dispatch({ type: 'delete', id }),
    setFilter: (filter: TaskFilter) => dispatch({ type: 'set-filter', filter }),
  }
}