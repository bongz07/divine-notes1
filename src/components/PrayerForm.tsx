import type { ChangeEvent, FormEvent } from 'react'
import type { PrayerDraft } from '../types/prayer'

type PrayerFormProps = {
  categories: string[]
  form: PrayerDraft
  editingId: string | null
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}

export function PrayerForm({
  categories,
  form,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}: PrayerFormProps) {
  return (
    <form className="prayer-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Morning gratitude, healing..."
            required
          />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={onChange}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Intention
        <textarea
          name="intention"
          value={form.intention}
          onChange={onChange}
          placeholder="Write the prayer in your own words..."
          rows={4}
          required
        />
      </label>

      <div className="form-actions">
        {editingId && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit">{editingId ? 'Save changes' : 'Add prayer'}</button>
      </div>
    </form>
  )
}

