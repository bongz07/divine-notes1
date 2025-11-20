import type { ChangeEvent } from 'react'
import type { PrayerStatus } from '../types/prayer'

type PrayerToolbarProps = {
  statusFilter: PrayerStatus
  onStatusChange: (status: PrayerStatus) => void
  search: string
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const statusLabels: Record<PrayerStatus, string> = {
  all: 'All',
  waiting: 'Waiting',
  answered: 'Answered',
}

const statuses: PrayerStatus[] = ['all', 'waiting', 'answered']

export function PrayerToolbar({
  statusFilter,
  onStatusChange,
  search,
  onSearchChange,
}: PrayerToolbarProps) {
  return (
    <div className="toolbar">
      <div className="filters">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={statusFilter === status ? 'active' : ''}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>
      <input
        className="search"
        type="search"
        placeholder="Search prayers..."
        value={search}
        onChange={onSearchChange}
      />
    </div>
  )
}

