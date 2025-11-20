import type { Prayer } from '../types/prayer'

type PrayerListProps = {
  prayers: Prayer[]
  hasAnyPrayers: boolean
  onEdit: (prayer: Prayer) => void
  onDelete: (id: string) => void
  onToggleAnswered: (id: string) => void
}

export function PrayerList({
  prayers,
  hasAnyPrayers,
  onEdit,
  onDelete,
  onToggleAnswered,
}: PrayerListProps) {
  if (prayers.length === 0) {
    return (
      <p className="empty-state">
        {hasAnyPrayers ? 'No prayers match your filters yet.' : 'Add your first prayer above.'}
      </p>
    )
  }

  return (
    <ul className="prayer-list">
      {prayers.map((prayer) => (
        <li key={prayer.id} className={prayer.answeredAt ? 'answered' : ''}>
          <header>
            <div>
              <p className="category">{prayer.category}</p>
              <h3>{prayer.title}</h3>
            </div>
            <div className="card-actions">
              <button type="button" onClick={() => onEdit(prayer)}>
                Edit
              </button>
              <button type="button" className="ghost" onClick={() => onDelete(prayer.id)}>
                Delete
              </button>
            </div>
          </header>
          <p className="intention">{prayer.intention}</p>
          <footer>
            <small>
              Added {new Date(prayer.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              {prayer.answeredAt &&
                ` • Answered ${new Date(prayer.answeredAt).toLocaleDateString(undefined, {
                  dateStyle: 'medium',
                })}`}
            </small>
            <button type="button" className="link" onClick={() => onToggleAnswered(prayer.id)}>
              {prayer.answeredAt ? 'Mark as waiting' : 'Mark answered'}
            </button>
          </footer>
        </li>
      ))}
    </ul>
  )
}

