export type PrayerStatus = 'all' | 'answered' | 'waiting'

export type Prayer = {
  id: string
  title: string
  intention: string
  category: string
  createdAt: string
  updatedAt: string
  answeredAt?: string | null
}

export type PrayerDraft = {
  title: string
  intention: string
  category: string
}

