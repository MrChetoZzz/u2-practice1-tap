import type { TaskFilter } from '../hooks/useStudyPlan'

const filters = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendientes' },
  { id: 'done', label: 'Completadas' },
] as const

type TaskFiltersProps = {
  activeFilter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
}

export function TaskFilters({ activeFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="filters" role="group" aria-label="Filtrar tareas">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={filter.id === activeFilter ? 'filter is-active' : 'filter'}
          data-filter={filter.id}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
