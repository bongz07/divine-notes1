import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './App.css'
import { Hero } from './components/Hero'
import { PrayerForm } from './components/PrayerForm'
import { PrayerList } from './components/PrayerList'
import { PrayerToolbar } from './components/PrayerToolbar'
import type { Prayer, PrayerDraft, PrayerStatus } from './types/prayer'

const STORAGE_KEY = 'divine-notes:prayers'

const categories = [
  'Family',
  'Health',
  'Guidance',
  'Gratitude',
  'Hope',
  'Other',
]

const emptyForm: PrayerDraft = {
  title: '',
  intention: '',
  category: categories[0],
}

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

const loadPrayers = (): Prayer[] => {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved) as Prayer[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [prayers, setPrayers] = useState<Prayer[]>(loadPrayers)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<PrayerStatus>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers))
  }, [prayers])

  const filteredPrayers = useMemo(() => {
    return prayers
      .filter((prayer) => {
        if (!search.trim()) return true
        const haystack = `${prayer.title} ${prayer.intention} ${prayer.category}`.toLowerCase()
        return haystack.includes(search.toLowerCase())
      })
      .filter((prayer) => {
        if (statusFilter === 'all') return true
        const answered = Boolean(prayer.answeredAt)
        return statusFilter === 'answered' ? answered : !answered
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [prayers, search, statusFilter])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim() || !form.intention.trim()) return

    if (editingId) {
      setPrayers((prev) =>
        prev.map((prayer) =>
          prayer.id === editingId
            ? {
                ...prayer,
                title: form.title.trim(),
                intention: form.intention.trim(),
                category: form.category,
                updatedAt: new Date().toISOString(),
              }
            : prayer,
        ),
      )
    } else {
      const now = new Date().toISOString()
      const newPrayer: Prayer = {
        id: createId(),
        title: form.title.trim(),
        intention: form.intention.trim(),
        category: form.category,
        createdAt: now,
        updatedAt: now,
        answeredAt: null,
      }
      setPrayers((prev) => [newPrayer, ...prev])
    }

    resetForm()
  }

  const handleDelete = (id: string) => {
    setPrayers((prev) => prev.filter((prayer) => prayer.id !== id))
    if (editingId === id) {
      resetForm()
    }
  }

  const handleEdit = (prayer: Prayer) => {
    setForm({
      title: prayer.title,
      intention: prayer.intention,
      category: prayer.category,
    })
    setEditingId(prayer.id)
  }

  const handleToggleAnswered = (id: string) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === id
          ? {
              ...prayer,
              answeredAt: prayer.answeredAt ? null : new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : prayer,
      ),
    )
  }

  const activeCount = prayers.filter((prayer) => !prayer.answeredAt).length
  const answeredCount = prayers.length - activeCount

  return (
    <div className="app-shell">
      <Hero activeCount={activeCount} answeredCount={answeredCount} />

      <section className="panel">
        <PrayerForm
          categories={categories}
          form={form}
          editingId={editingId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </section>

      <section className="panel">
        <PrayerToolbar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          search={search}
          onSearchChange={(event) => setSearch(event.target.value)}
        />

        <PrayerList
          prayers={filteredPrayers}
          hasAnyPrayers={prayers.length > 0}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleAnswered={handleToggleAnswered}
        />
      </section>
    </div>
  )
}

export default App
