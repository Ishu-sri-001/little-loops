'use client'

import { useSyncExternalStore } from 'react'
import { SITE } from '@/lib/site'
import { format12h } from '@/lib/time'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Current studio status in IST, as a stable string so React can compare snapshots */
const getStatus = () => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = WEEKDAYS.indexOf(get('weekday'))
  const now = `${get('hour')}:${get('minute')}`

  const today = SITE.hours.find((h) => (h.days as readonly number[]).includes(day))
  if (today?.open && today.close && now >= today.open && now < today.close) return `open|${today.close}`
  return 'closed'
}

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000)
  return () => window.clearInterval(id)
}

const StudioStatus = () => {
  // null on the server: the badge appears once we know the visitor's clock
  const status = useSyncExternalStore(subscribe, getStatus, () => null)
  if (!status) return null

  const [state, closesAt] = status.split('|')
  const open = state === 'open'

  return (
    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-clean/70 px-3 py-1 text-xs" role="status">
      <span className={`size-2 rounded-full ${open ? 'bg-secondary' : 'bg-accent'}`} aria-hidden />
      {open ? `Open now · until ${format12h(closesAt)}` : 'Closed right now'}
    </p>
  )
}

export default StudioStatus
