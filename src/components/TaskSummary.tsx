type TaskSummaryProps = {
  counts: { total: number; pending: number; done: number }
}

export function TaskSummary({ counts }: TaskSummaryProps) {
  return (
    <dl className="summary">
      <div>
        <dt>Total</dt>
        <dd>{counts.total}</dd>
      </div>
      <div>
        <dt>Pendientes</dt>
        <dd>{counts.pending}</dd>
      </div>
      <div>
        <dt>Completadas</dt>
        <dd>{counts.done}</dd>
      </div>
    </dl>
  )
}
