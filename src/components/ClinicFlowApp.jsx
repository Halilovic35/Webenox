import React, { forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_APPOINTMENTS_KEY = 'clinicflow_appointments_v1'
const STORAGE_SETTINGS_KEY = 'clinicflow_settings_v1'

const STATUS_STYLES = {
  confirmed: {
    label: 'Confirmed',
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    chip: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200'
  },
  pending: {
    label: 'Pending',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    chip: 'border-amber-400/25 bg-amber-400/10 text-amber-200'
  },
  completed: {
    label: 'Completed',
    dot: 'bg-cyan-400',
    text: 'text-cyan-300',
    chip: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200'
  },
  cancelled: {
    label: 'Cancelled',
    dot: 'bg-slate-400',
    text: 'text-slate-300',
    chip: 'border-white/10 bg-white/5 text-white/60'
  }
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' }
]

const DEFAULT_SETTINGS = {
  clinicName: 'ClinicFlow',
  workingHours: 'Mon-Fri · 08:00-18:00',
  defaultDurationMin: 30,
  notifications: true,
  theme: 'Webenox Dark'
}

const PATIENT_DIRECTORY = [
  {
    key: 'emma-keller',
    name: 'Emma Keller',
    phone: '+49 171 245 9031',
    profileNotes: 'Prefers afternoon slots. Sensitive skin.'
  },
  {
    key: 'lucas-meyer',
    name: 'Lucas Meyer',
    phone: '+49 160 884 2217',
    profileNotes: 'Regular checkups every 6 months.'
  },
  {
    key: 'sofia-braun',
    name: 'Sofia Braun',
    phone: '+49 176 119 7742',
    profileNotes: 'New patient onboarding completed.'
  },
  {
    key: 'daniel-hoffmann',
    name: 'Daniel Hoffmann',
    phone: '+49 151 902 4410',
    profileNotes: 'Evening availability only.'
  }
]

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** `2026-05-01` → `01.05.2026` (UI only; appointments stay ISO). */
function isoDateToDe(iso) {
  const m = String(iso || '').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return ''
  return `${m[3]}.${m[2]}.${m[1]}`
}

const FORM_DURATION_OPTIONS = [
  { value: '30', label: '30 min' },
  { value: '60', label: '60 min' },
  { value: '90', label: '90 min' },
  { value: '120', label: '120 min' }
]

function isoTodayBerlin() {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date())
    const y = parts.find((p) => p.type === 'year')?.value
    const m = parts.find((p) => p.type === 'month')?.value
    const d = parts.find((p) => p.type === 'day')?.value
    if (y && m && d) return `${y}-${m}-${d}`
  } catch {
    // ignore
  }
  return new Date().toISOString().slice(0, 10)
}

function isoAddDays(isoDate, deltaDays) {
  const [y, m, d] = isoDate.split('-').map((x) => Number(x))
  const dt = new Date(Date.UTC(y, m - 1, d))
  dt.setUTCDate(dt.getUTCDate() + deltaDays)
  return dt.toISOString().slice(0, 10)
}

function parseTimeToMinutes(t) {
  const s = String(t || '').trim()
  const m = s.match(/^(\d{1,2}):(\d{2})$/)
  if (!m) return null
  const hh = Number(m[1])
  const mm = Number(m[2])
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null
  return hh * 60 + mm
}

function minutesNowBerlin() {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date())
    const hh = Number(parts.find((p) => p.type === 'hour')?.value)
    const mm = Number(parts.find((p) => p.type === 'minute')?.value)
    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null
    return hh * 60 + mm
  } catch {
    return null
  }
}

function initialsFromName(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  const a = parts[0]?.[0] || ''
  const b = parts[1]?.[0] || ''
  return `${a}${b}`.toUpperCase() || 'CF'
}

const IconButton = ({ children, label, onClick }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white/90 transition-colors flex items-center justify-center"
  >
    {children}
  </button>
)

const AppHeader = ({ title, subtitle, rightSlot }) => (
  <div className="px-5 pt-2 pb-3 flex items-start justify-between gap-3">
    <div className="min-w-0">
      <div className="text-text font-extrabold text-lg tracking-tight flex items-center gap-1 min-w-0">
        <img
          src="/images/clinicflow.png"
          alt=""
          className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_0_18px_rgba(0,201,255,0.22)] -mr-0.5"
          draggable={false}
        />
        <span className="truncate -ml-px">{title}</span>
      </div>
      {subtitle && <div className="text-secondary text-xs mt-1 truncate">{subtitle}</div>}
    </div>
    <div className="shrink-0 flex items-center gap-2 pt-0.5">{rightSlot}</div>
  </div>
)

const GlowPressable = ({ children, onClick, interactive }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={interactive ? { scale: 0.99 } : undefined}
    className={`relative w-full text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 transition-shadow ${
      interactive ? 'hover:border-accent/25 hover:shadow-[0_0_30px_rgba(0,201,255,0.16)]' : ''
    }`}
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-purple/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    <div className="relative">{children}</div>
  </motion.button>
)

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending
  return (
    <motion.span layout className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-bold ${s.chip}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </motion.span>
  )
}

const StatCard = ({ label, value, tone }) => {
  const toneStyles =
    tone === 'ok'
      ? 'from-emerald-400/15 to-emerald-400/5 border-emerald-400/15 text-emerald-200'
      : tone === 'warn'
        ? 'from-amber-400/15 to-amber-400/5 border-amber-400/15 text-amber-200'
        : 'from-cyan-400/15 to-purple-500/5 border-cyan-400/15 text-cyan-200'

  return (
    <div className={`min-w-0 rounded-2xl border bg-gradient-to-b ${toneStyles} px-3 py-3`}>
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 truncate">{label}</div>
      <div className="mt-1 text-xl font-extrabold text-white/90 tabular-nums leading-none">{value}</div>
    </div>
  )
}

const InlineError = ({ text }) => (
  <div className="text-[11px] font-bold text-rose-200/90">{text}</div>
)

const TextInput = ({ label, value, onChange, placeholder, inputMode, error }) => (
  <label className="block min-w-0">
    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">{label}</div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      className={`mt-2 w-full min-w-0 rounded-2xl border bg-white/5 px-3 py-3 text-sm font-semibold text-white/90 placeholder:text-white/35 outline-none focus:shadow-[0_0_0_3px_rgba(0,201,255,0.14)] ${
        error ? 'border-rose-400/35 focus:border-rose-400/55' : 'border-white/10 focus:border-accent/40'
      }`}
    />
    {error ? (
      <div className="mt-2">
        <InlineError text={error} />
      </div>
    ) : null}
  </label>
)

const SelectInput = ({ label, value, onChange, options, error }) => (
  <label className="block min-w-0">
    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">{label}</div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-2 w-full min-w-0 rounded-2xl border bg-white/5 px-3 py-3 text-sm font-semibold text-white/90 outline-none focus:shadow-[0_0_0_3px_rgba(0,201,255,0.14)] ${
        error ? 'border-rose-400/35 focus:border-rose-400/55' : 'border-white/10 focus:border-accent/40'
      }`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#070a12]">
          {o.label}
        </option>
      ))}
    </select>
    {error ? (
      <div className="mt-2">
        <InlineError text={error} />
      </div>
    ) : null}
  </label>
)

const SearchRow = ({ query, onQueryChange, filterLabel, filterActive, onToggleFilter }) => (
  <div className="px-5 pb-4 flex items-stretch gap-3">
    <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 flex items-center gap-2 text-white/70 h-10">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-white/55">
        <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search patient or treatment"
        className="min-w-0 w-full bg-transparent text-xs font-semibold text-white/80 placeholder:text-white/35 outline-none"
      />
    </div>

    <button
      type="button"
      aria-label="Open filters"
      onClick={onToggleFilter}
      className={`h-10 w-[112px] shrink-0 rounded-2xl border px-3 flex items-center justify-between gap-2 transition-colors ${
        filterActive
          ? 'border-accent/35 bg-accent/10 text-white/90 shadow-[0_0_22px_rgba(0,201,255,0.12)]'
          : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-white/70">
          <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span className="text-[11px] font-extrabold truncate">{filterLabel}</span>
      </div>
      <span className="text-[10px] font-black text-white/35">▾</span>
    </button>
  </div>
)

const Segmented = ({ value, onChange }) => (
  <div className="px-5 pb-4">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-1 flex">
      {[
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'Week' }
      ].map((t) => {
        const active = t.id === value
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`flex-1 rounded-2xl px-3 py-2 text-xs font-extrabold transition-colors ${
              active ? 'bg-white/10 text-white/90' : 'text-white/60 hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  </div>
)

const PrimaryButton = ({ children, onClick, disabled }) => (
  <motion.button
    type="button"
    disabled={disabled}
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className="w-full rounded-2xl bg-gradient-to-r from-accent to-purple px-4 py-3 text-sm font-extrabold text-background shadow-lg hover:from-accent/90 hover:to-purple/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {children}
  </motion.button>
)

const Toast = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
    className="absolute left-1/2 -translate-x-1/2 bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] z-30 px-4 py-2 rounded-2xl border border-white/10 bg-background/80 backdrop-blur-md text-xs text-text shadow-2xl max-w-[calc(100%-2.5rem)] truncate"
  >
    {text}
  </motion.div>
)

const ConfirmDialog = ({ title, body, confirmLabel, onConfirm, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-40 flex items-end justify-center p-4"
  >
    <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} />
    <motion.div
      initial={{ y: 18, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 18, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#070a12]/90 backdrop-blur-md shadow-2xl overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4">
        <div className="text-text font-extrabold text-sm">{title}</div>
        <div className="text-secondary text-xs mt-2 leading-relaxed">{body}</div>
      </div>
      <div className="px-5 pb-5 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-extrabold text-white/80 hover:bg-white/10 transition-colors"
        >
          Keep
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-2xl bg-gradient-to-r from-rose-400/90 to-amber-300/90 px-4 py-3 text-xs font-extrabold text-background shadow-lg hover:from-rose-400 hover:to-amber-300 transition-all"
        >
          {confirmLabel}
        </button>
      </div>
    </motion.div>
  </motion.div>
)

const FormFooter = ({ primary, secondary }) => (
  <div className="px-5 pb-[calc(3.1rem+env(safe-area-inset-bottom,0px))] pt-3">
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
      <div className="grid w-full grid-cols-2 justify-items-stretch gap-2.5">
        {secondary}
        {primary}
      </div>
    </div>
  </div>
)

const BottomTabs = ({ tab, onChange }) => {
  const items = [
    { id: 'schedule', label: 'Schedule' },
    { id: 'patients', label: 'Patients' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <div className="absolute left-0 right-0 bottom-0 z-20 border-t border-white/10 bg-[#05070c]/90 backdrop-blur-md">
      <div className="px-5 pt-1.5 pb-1.5 grid grid-cols-4 gap-1">
        {items.map((it) => {
          const active = it.id === tab
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              className={`rounded-xl px-1.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                active ? 'bg-white/10 text-white/90' : 'text-white/55 hover:bg-white/5 hover:text-white/75'
              }`}
            >
              <div className="truncate">{it.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const AppointmentFormScreen = ({ mode, initialDraft, onBack, onSave }) => {
  const [draft, setDraft] = useState(initialDraft)
  const [errors, setErrors] = useState({})
  const dateInputRef = useRef(null)
  const dateFieldId = useId()

  useEffect(() => {
    setDraft(initialDraft)
    setErrors({})
  }, [initialDraft])

  const openDatePicker = () => {
    const el = dateInputRef.current
    if (!el) return
    try {
      if (typeof el.showPicker === 'function') el.showPicker()
      else el.click()
    } catch {
      el.click()
    }
  }

  const durationOptions = useMemo(() => {
    const v = String(draft.durationMin ?? '30').trim()
    if (FORM_DURATION_OPTIONS.some((o) => o.value === v)) return FORM_DURATION_OPTIONS
    return [{ value: v, label: `${v} min` }, ...FORM_DURATION_OPTIONS]
  }, [draft.durationMin])

  const dateInputValue = /^\d{4}-\d{2}-\d{2}$/.test(String(draft.date || '').trim()) ? String(draft.date).trim() : ''

  const validate = () => {
    const next = {}
    if (!String(draft.patientName || '').trim()) next.patientName = 'Patient name is required'
    if (!String(draft.title || '').trim()) next.title = 'Treatment is required'
    if (!String(draft.time || '').trim()) next.time = 'Time is required'
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(draft.date || '').trim())) next.date = 'Date is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-xs font-semibold text-accent hover:text-accent/90 transition-colors">
          ← Back
        </button>
        <div className="text-text font-extrabold text-sm">{mode === 'edit' ? 'Edit Appointment' : 'New Appointment'}</div>
        <div className="w-10" />
      </div>

      <div className="px-5 pb-3 flex-1 overflow-auto">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Patient"
              value={draft.patientName}
              error={errors.patientName}
              onChange={(v) => setDraft((d) => ({ ...d, patientName: v }))}
              placeholder="Full name"
            />
            <TextInput
              label="Phone"
              value={draft.phone}
              onChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
              placeholder="+49 ..."
              inputMode="tel"
            />
          </div>

          <TextInput
            label="Treatment"
            value={draft.title}
            error={errors.title}
            onChange={(v) => setDraft((d) => ({ ...d, title: v }))}
            placeholder="e.g. Checkup"
          />

          <div className="grid grid-cols-2 gap-3 items-start">
            <div className="block min-w-0">
              {/* Isti uzorak kao TextInput: naslov u <div> (ne <label>), da grid stupci budu poravnati */}
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Date</div>
              <input
                id={dateFieldId}
                ref={dateInputRef}
                type="date"
                value={dateInputValue}
                min="2000-01-01"
                max="2100-12-31"
                onChange={(e) => {
                  const v = e.target.value
                  if (v) setDraft((d) => ({ ...d, date: v }))
                }}
                className="sr-only"
                tabIndex={-1}
                aria-label="Appointment date (calendar)"
              />
              <button
                type="button"
                onClick={openDatePicker}
                className={`mt-2 flex min-h-[46px] w-full items-center justify-between gap-2 rounded-2xl border bg-white/5 px-3 py-3 text-left text-sm font-semibold tabular-nums text-white/90 outline-none transition-colors hover:bg-white/[0.08] focus-visible:border-accent/40 focus-visible:shadow-[0_0_0_3px_rgba(0,201,255,0.14)] ${
                  errors.date ? 'border-rose-400/35' : 'border-white/10'
                }`}
              >
                <span>{isoDateToDe(draft.date) || 'Tap to choose date'}</span>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-white/45" aria-hidden>
                  <path
                    d="M8 2v3M16 2v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {errors.date ? (
                <div className="mt-2">
                  <InlineError text={errors.date} />
                </div>
              ) : null}
            </div>
            <TextInput
              label="Time"
              value={draft.time}
              error={errors.time}
              onChange={(v) => setDraft((d) => ({ ...d, time: v }))}
              placeholder="16:00"
              inputMode="numeric"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-start">
            <SelectInput
              label="Duration"
              value={String(draft.durationMin ?? '30')}
              onChange={(v) => setDraft((d) => ({ ...d, durationMin: v }))}
              options={durationOptions}
            />
            <TextInput label="Room" value={draft.room} onChange={(v) => setDraft((d) => ({ ...d, room: v }))} placeholder="Room 1" />
          </div>

          <SelectInput
            label="Status"
            value={draft.status}
            onChange={(v) => setDraft((d) => ({ ...d, status: v }))}
            options={[
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
          />

          <label className="block min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Notes</div>
            <textarea
              value={draft.notes}
              onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
              placeholder="Add notes for this patient..."
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-white/90 placeholder:text-white/35 outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(0,201,255,0.14)]"
            />
          </label>
        </div>
      </div>

      <FormFooter
        secondary={
          <button
            type="button"
            onClick={onBack}
            className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs font-extrabold text-white/75 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        }
        primary={
          <button
            type="button"
            onClick={() => {
              if (!validate()) return
              onSave(draft)
            }}
            className="w-full min-w-0 rounded-2xl bg-gradient-to-r from-accent to-purple px-3 py-3 text-center text-xs font-extrabold text-background shadow-lg hover:from-accent/90 hover:to-purple/90 transition-all"
          >
            Save Appointment
          </button>
        }
      />
    </div>
  )
}

function buildMockActivity(selected) {
  const status = selected?.status
  const rows = [
    { t: '09:12', m: 'Appointment confirmed', ok: status === 'confirmed' || status === 'completed' },
    { t: '09:40', m: 'Reminder sent', ok: true },
    { t: '10:05', m: 'Notes updated', ok: Boolean(String(selected?.notes || '').trim()) }
  ]
  return rows
}

function normalizeRoomName(room) {
  const s = String(room || '').trim()
  if (!s) return ''
  if (/^room\s*\d+$/i.test(s)) return s.replace(/\s+/g, ' ')
  return s
}

function roomKeyFromName(roomName) {
  const m = String(roomName || '').match(/(\d+)/)
  return m ? `room-${m[1]}` : String(roomName || '').toLowerCase()
}

function derivePatientInsights(appointments, patientName) {
  const name = String(patientName || '').trim().toLowerCase()
  const mine = appointments
    .filter((a) => String(a?.patient?.name || '').trim().toLowerCase() === name)
    .filter((a) => a.status !== 'cancelled')
    .slice()
    .sort((a, b) => {
      const da = String(a.date || '')
      const db = String(b.date || '')
      if (da !== db) return da.localeCompare(db)
      return String(a.time).localeCompare(String(b.time))
    })

  const upcoming = mine.filter((a) => a.status === 'pending' || a.status === 'confirmed').slice(-1)[0] || null
  const pastCompleted = mine.filter((a) => a.status === 'completed')
  const lastTreatment = pastCompleted.slice(-1)[0]?.title || '-'

  const nextLabel = upcoming ? `${upcoming.date} · ${upcoming.time}` : '-'

  return { lastTreatment, nextLabel, history: mine.slice().reverse() }
}

function roomStatusModel({ roomName, appointments, todayIso, nowMin }) {
  const key = roomKeyFromName(roomName)
  const dayAppts = appointments
    .filter((a) => a.status !== 'cancelled')
    .filter((a) => String(a.date || '') === String(todayIso || ''))
    .filter((a) => roomKeyFromName(a.room) === key)
    .slice()
    .sort((a, b) => String(a.time).localeCompare(String(b.time)))

  const active = dayAppts.find((a) => {
    const start = parseTimeToMinutes(a.time)
    const dur = Number(a.durationMin || 0)
    if (start == null || !Number.isFinite(dur) || dur <= 0) return false
    if (nowMin == null) return false
    return nowMin >= start && nowMin < start + dur
  })

  let status = 'available'
  if (active) status = 'occupied'

  // Simple operational feel: if occupied and we're in last 10 minutes, show cleaning
  if (active && nowMin != null) {
    const start = parseTimeToMinutes(active.time)
    const end = start + Number(active.durationMin || 0)
    if (end - nowMin <= 10 && end - nowMin > 0) status = 'cleaning'
  }

  const upcoming = dayAppts.find((a) => {
    const start = parseTimeToMinutes(a.time)
    if (start == null || nowMin == null) return false
    return start > nowMin
  })

  const completedToday = dayAppts.filter((a) => a.status === 'completed').length
  const denom = Math.max(1, dayAppts.length)
  const progress = clamp(Math.round((completedToday / denom) * 100), 8, 100)

  return { status, next: upcoming, progress }
}

const ClinicFlowApp = forwardRef(function ClinicFlowApp(_props, ref) {
  const todayIso = useMemo(() => isoTodayBerlin(), [])

  const initialAppointments = useMemo(
    () => [
      {
        id: 1,
        date: todayIso,
        time: '10:00',
        title: 'Foot Treatment',
        status: 'confirmed',
        patient: { name: 'Emma Keller', phone: '+49 171 245 9031' },
        durationMin: 45,
        room: 'Room 2',
        notes: 'Patient prefers afternoon appointments. Bring previous treatment notes.'
      },
      {
        id: 2,
        date: todayIso,
        time: '13:30',
        title: 'Checkup',
        status: 'confirmed',
        patient: { name: 'Lucas Meyer', phone: '+49 160 884 2217' },
        durationMin: 30,
        room: 'Room 1',
        notes: 'Follow-up: review vitals and recent lab results.'
      },
      {
        id: 3,
        date: todayIso,
        time: '16:00',
        title: 'Nail Care',
        status: 'pending',
        patient: { name: 'Sofia Braun', phone: '+49 176 119 7742' },
        durationMin: 40,
        room: 'Room 3',
        notes: 'New patient. Confirm allergies and preferred products.'
      }
    ],
    [todayIso]
  )

  const [appointments, setAppointments] = useState(initialAppointments)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const [mainTab, setMainTab] = useState('schedule')
  const [route, setRoute] = useState({ name: 'home' }) // home | detail | create | edit | patientDetail
  const [patientKey, setPatientKey] = useState(null)

  const [scheduleMode, setScheduleMode] = useState('today') // today | week

  const [toast, setToast] = useState(null)
  const [showCompleted, setShowCompleted] = useState(false)
  const [query, setQuery] = useState('')
  const [filterId, setFilterId] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const toastTimerRef = useRef(null)
  const prevRouteRef = useRef({ name: 'home' })

  const selected =
    route?.name === 'detail' || route?.name === 'edit'
      ? appointments.find((a) => a.id === route.id) || null
      : null

  const selectedPatient = useMemo(() => {
    if (route.name !== 'patientDetail' || !patientKey) return null
    return PATIENT_DIRECTORY.find((p) => p.key === patientKey) || null
  }, [route.name, patientKey])

  const showToast = (msg) => {
    setToast(msg)
    window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 1700)
  }

  const screenVariants = {
    initial: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -28 : 28, opacity: 0 })
  }

  const direction = useMemo(() => {
    const prev = prevRouteRef.current?.name || 'home'
    const next = route.name

    const depth = (name) => {
      if (name === 'home') return 0
      if (name === 'patientDetail') return 2
      if (name === 'detail' || name === 'create' || name === 'edit') return 2
      return 1
    }

    const dPrev = depth(prev)
    const dNext = depth(next)
    return dNext > dPrev ? 1 : -1
  }, [route.name])

  useEffect(() => {
    prevRouteRef.current = route
  }, [route])

  const counts = useMemo(() => {
    const active = appointments.filter((a) => a.status !== 'cancelled')
    const total = active.length
    const completed = active.filter((a) => a.status === 'completed').length
    const pending = active.filter((a) => a.status === 'pending').length
    return { total, completed, pending }
  }, [appointments])

  const dateLabel = useMemo(() => {
    try {
      const d = new Date()
      return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(d)
    } catch {
      return 'Mon, Apr 28'
    }
  }, [])

  const weekIsoList = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => isoAddDays(todayIso, i))
  }, [todayIso])

  useEffect(() => {
    const savedA = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_APPOINTMENTS_KEY) : null
    if (savedA) {
      const parsed = safeJsonParse(savedA)
      if (Array.isArray(parsed) && parsed.every((a) => a && typeof a === 'object' && typeof a.id !== 'undefined')) {
        const migrated = parsed.map((a) => ({
          ...a,
          date: a.date || todayIso,
          room: normalizeRoomName(a.room)
        }))
        setAppointments(migrated)
      }
    }

    const savedS = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_SETTINGS_KEY) : null
    if (savedS) {
      const parsedS = safeJsonParse(savedS)
      if (parsedS && typeof parsedS === 'object') {
        setSettings({ ...DEFAULT_SETTINGS, ...parsedS })
      }
    }
  }, [todayIso])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_APPOINTMENTS_KEY, JSON.stringify(appointments))
    } catch {
      // ignore
    }
  }, [appointments])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }
  }, [settings])

  useEffect(() => {
    return () => {
      window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  const scheduleAppointments = useMemo(() => {
    if (scheduleMode === 'today') {
      return appointments.filter((a) => String(a.date || '') === todayIso)
    }
    const set = new Set(weekIsoList)
    return appointments.filter((a) => set.has(String(a.date || '')))
  }, [appointments, scheduleMode, todayIso, weekIsoList])

  const filteredAppointments = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = scheduleAppointments
      .filter((a) => (filterId === 'all' ? true : a.status === filterId))
      .filter((a) => {
        if (!q) return true
        const hay = [
          a.patient?.name,
          a.title,
          a.room,
          a.status,
          a.patient?.phone,
          String(a.durationMin ?? ''),
          a.time,
          a.notes,
          a.date
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => {
        const da = String(a.date || '')
        const db = String(b.date || '')
        if (da !== db) return da.localeCompare(db)
        return String(a.time).localeCompare(String(b.time))
      })
    return list
  }, [scheduleAppointments, filterId, query])

  const filterLabel = useMemo(() => FILTERS.find((f) => f.id === filterId)?.label || 'All', [filterId])

  const getNextId = () => {
    const maxId = appointments.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0)
    return maxId + 1
  }

  const normalizeAppointment = (draft) => {
    const status = draft.status || 'pending'
    const durationMin = clamp(Number(draft.durationMin || settings.defaultDurationMin || 30), 5, 240)
    return {
      id: draft.id,
      date: String(draft.date || todayIso).trim() || todayIso,
      time: String(draft.time || '').trim(),
      title: String(draft.title || '').trim(),
      durationMin,
      room: normalizeRoomName(draft.room),
      status,
      patient: {
        name: String(draft.patientName || draft.patient?.name || '').trim(),
        phone: String(draft.phone || draft.patient?.phone || '').trim()
      },
      notes: String(draft.notes || '').trim()
    }
  }

  const upsertAppointment = (appt) => {
    setAppointments((prev) => {
      const idx = prev.findIndex((a) => a.id === appt.id)
      if (idx === -1) return [...prev, appt]
      const next = prev.slice()
      next[idx] = appt
      return next
    })
  }

  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)))
  }

  const resetOverlays = () => {
    setIsFilterOpen(false)
    setConfirm(null)
  }

  const goHome = () => {
    resetOverlays()
    setRoute({ name: 'home' })
    setPatientKey(null)
    setShowCompleted(false)
  }

  useImperativeHandle(
    ref,
    () => ({
      osBack() {
        if (confirm) {
          setConfirm(null)
          return true
        }
        if (isFilterOpen) {
          setIsFilterOpen(false)
          return true
        }
        if (route.name === 'patientDetail') {
          setPatientKey(null)
          setMainTab('patients')
          resetOverlays()
          setRoute({ name: 'home' })
          setShowCompleted(false)
          return true
        }
        if (route.name === 'edit') {
          resetOverlays()
          setRoute({ name: 'detail', id: route.id })
          return true
        }
        if (route.name === 'create') {
          goHome()
          return true
        }
        if (route.name === 'detail') {
          goHome()
          return true
        }
        if (route.name === 'home' && mainTab !== 'schedule') {
          resetOverlays()
          setMainTab('schedule')
          return true
        }
        return false
      }
    }),
    [confirm, isFilterOpen, route, mainTab]
  )

  const nowMin = useMemo(() => minutesNowBerlin(), [])

  const roomsModel = useMemo(() => {
    return ['Room 1', 'Room 2', 'Room 3'].map((roomName) => {
      const m = roomStatusModel({ roomName, appointments, todayIso, nowMin })
      return { roomName, ...m }
    })
  }, [appointments, todayIso, nowMin])

  const patientRows = useMemo(() => {
    return PATIENT_DIRECTORY.map((p) => {
      const ins = derivePatientInsights(appointments, p.name)
      return { ...p, ...ins }
    })
  }, [appointments])

  const weekBuckets = useMemo(() => {
    const map = new Map()
    for (const iso of weekIsoList) map.set(iso, [])
    for (const a of filteredAppointments) {
      const iso = String(a.date || '')
      if (!map.has(iso)) continue
      map.get(iso).push(a)
    }
    for (const iso of weekIsoList) {
      map.set(iso, (map.get(iso) || []).sort((a, b) => String(a.time).localeCompare(String(b.time))))
    }
    return weekIsoList.map((iso) => ({ iso, items: map.get(iso) || [] }))
  }, [filteredAppointments, weekIsoList])

  const renderScheduleHome = () => (
    <motion.div
      key="home"
      custom={1}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full w-full flex flex-col"
    >
      <AppHeader
        title="ClinicFlow"
        subtitle={`Today, ${counts.total} on schedule`}
        rightSlot={
          <>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/75 whitespace-nowrap">
              {dateLabel}
            </div>
            <IconButton label="Notifications" onClick={() => showToast(settings.notifications ? 'Notifications on' : 'Notifications off')}>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </IconButton>
          </>
        }
      />

      <Segmented value={scheduleMode} onChange={setScheduleMode} />

      <div className="px-5 pb-4 grid grid-cols-3 gap-2.5">
        <StatCard label="Today" value={counts.total} tone="info" />
        <StatCard label="Done" value={counts.completed} tone="ok" />
        <StatCard label="Open" value={counts.pending} tone="warn" />
      </div>

      <div className="relative">
        <SearchRow
          query={query}
          onQueryChange={(v) => setQuery(v)}
          filterLabel={filterLabel}
          filterActive={filterId !== 'all'}
          onToggleFilter={() => setIsFilterOpen((v) => !v)}
        />

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute right-5 top-[3.25rem] z-30 w-[220px] rounded-3xl border border-white/10 bg-[#070a12]/90 backdrop-blur-md shadow-2xl overflow-hidden"
            >
              <div className="px-4 pt-4 pb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Filter</div>
              <div className="px-2 pb-3 space-y-1">
                {FILTERS.map((f) => {
                  const active = f.id === filterId
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setFilterId(f.id)
                        setIsFilterOpen(false)
                      }}
                      className={`w-full text-left rounded-2xl px-3 py-2 text-xs font-extrabold transition-colors ${
                        active ? 'bg-white/10 text-white/90' : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-[calc(6.15rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45 mb-3">
          {scheduleMode === 'today' ? 'Timeline' : 'Week overview'}
        </div>

        {scheduleMode === 'week' ? (
          <div className="space-y-3">
            {weekBuckets.map((b) => {
              const label = (() => {
                try {
                  const d = new Date(`${b.iso}T00:00:00Z`)
                  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(d)
                } catch {
                  return b.iso
                }
              })()
              return (
                <div key={b.iso} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-extrabold text-white/85 truncate">{label}</div>
                    <div className="text-[10px] font-bold text-white/45 tabular-nums">{b.items.length}</div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {b.items.length === 0 ? (
                      <div className="text-[11px] font-semibold text-white/45">No appointments</div>
                    ) : (
                      b.items.slice(0, 4).map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => {
                            resetOverlays()
                            setShowCompleted(false)
                            setRoute({ name: 'detail', id: a.id })
                          }}
                          className="w-full text-left rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-[11px] font-extrabold text-white/85 tabular-nums">{a.time}</div>
                            <StatusBadge status={a.status} />
                          </div>
                          <div className="mt-1 text-[11px] font-semibold text-white/70 truncate">{a.patient.name}</div>
                          <div className="mt-0.5 text-[10px] text-white/45 truncate">
                            {a.title} · {a.durationMin}m · {a.room}
                          </div>
                        </button>
                      ))
                    )}
                    {b.items.length > 4 ? (
                      <div className="text-[10px] font-bold text-white/35">+{b.items.length - 4} more</div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-6 text-center">
            <div className="text-secondary text-sm font-bold">No appointments found</div>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setFilterId('all')
              }}
              className="mt-3 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-white/75 hover:bg-white/10 transition-colors"
            >
              Reset search & filter
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments.map((a) => (
              <GlowPressable
                key={a.id}
                interactive
                onClick={() => {
                  resetOverlays()
                  setShowCompleted(false)
                  setRoute({ name: 'detail', id: a.id })
                }}
              >
                <div className="flex gap-3 min-w-0">
                  <div className="flex flex-col items-center pt-1 shrink-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent/85 shadow-[0_0_14px_rgba(0,201,255,0.35)]" />
                    <div className="mt-2 w-px flex-1 bg-white/10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-text font-extrabold text-sm tabular-nums">{a.time}</div>
                        <div className="text-white/90 text-sm mt-0.5 font-semibold truncate">{a.patient.name}</div>
                      </div>
                      <div className="shrink-0">
                        <StatusBadge status={a.status} />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-white/70 min-w-0">
                      <span className="font-semibold text-white/80">{a.title}</span>
                      <span className="text-white/35"> · </span>
                      <span className="tabular-nums">{a.durationMin} min</span>
                      <span className="text-white/35"> · </span>
                      <span className="truncate">{a.room}</span>
                    </div>
                  </div>
                </div>
              </GlowPressable>
            ))}
          </div>
        )}
      </div>

      <div className="absolute left-0 right-0 bottom-[calc(2.75rem+env(safe-area-inset-bottom,0px))] px-5">
        <PrimaryButton
          onClick={() => {
            resetOverlays()
            setRoute({
              name: 'create',
              preset: {
                patientName: '',
                phone: '',
                title: '',
                time: '',
                durationMin: String(settings.defaultDurationMin || 30),
                room: '',
                status: 'pending',
                notes: '',
                date: todayIso
              }
            })
          }}
        >
          + New Appointment
        </PrimaryButton>
      </div>
    </motion.div>
  )

  const renderPatients = () => (
    <motion.div
      key="patients"
      custom={1}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full w-full flex flex-col"
    >
      <AppHeader title="Patients" subtitle="Directory" rightSlot={<div className="w-10" />} />

      <div className="px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto space-y-3">
        {patientRows.map((p) => (
          <GlowPressable
            key={p.key}
            interactive
            onClick={() => {
              resetOverlays()
              setPatientKey(p.key)
              setRoute({ name: 'patientDetail' })
            }}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="h-11 w-11 shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/18 to-cyan-400/14 flex items-center justify-center text-white/90 font-extrabold text-xs">
                {initialsFromName(p.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-extrabold text-white/90 truncate">{p.name}</div>
                  <div className="text-[10px] font-bold text-white/45 whitespace-nowrap">Profile</div>
                </div>
                <div className="mt-1 text-[11px] text-white/55 truncate">{p.phone}</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] font-bold text-white/45">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="uppercase tracking-[0.12em]">Last</div>
                    <div className="mt-1 text-[11px] font-extrabold text-white/75 truncate">{p.lastTreatment}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="uppercase tracking-[0.12em]">Next</div>
                    <div className="mt-1 text-[11px] font-extrabold text-white/75 truncate">{p.nextLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </GlowPressable>
        ))}
      </div>
    </motion.div>
  )

  const renderPatientDetail = () => {
    if (!selectedPatient) {
      return (
        <motion.div
          key="patient-missing"
          custom={-1}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative h-full w-full flex flex-col"
        >
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <button type="button" onClick={goHome} className="text-xs font-semibold text-accent hover:text-accent/90 transition-colors">
              ← Back
            </button>
            <div className="text-text font-extrabold text-sm">Patient</div>
            <div className="w-10" />
          </div>
          <div className="px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-secondary text-sm">Patient not found.</div>
          </div>
        </motion.div>
      )
    }

    const ins = derivePatientInsights(appointments, selectedPatient.name)

    return (
      <motion.div
        key={`patient-${selectedPatient.key}`}
        custom={-1}
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative h-full w-full flex flex-col"
      >
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setPatientKey(null)
              setMainTab('patients')
              goHome()
            }}
            className="text-xs font-semibold text-accent hover:text-accent/90 transition-colors"
          >
            ← Back
          </button>
          <div className="text-text font-extrabold text-sm">Patient</div>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/18 to-cyan-400/14 flex items-center justify-center text-white/90 font-extrabold">
                {initialsFromName(selectedPatient.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/95 font-extrabold text-lg leading-tight truncate">{selectedPatient.name}</div>
                <div className="text-secondary text-xs mt-1 truncate">{selectedPatient.phone}</div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Notes</div>
              <div className="text-secondary text-xs mt-2 leading-relaxed">{selectedPatient.profileNotes}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
            <div className="text-text font-extrabold text-sm">Appointment history</div>
            <div className="mt-3 space-y-2">
              {ins.history.length === 0 ? (
                <div className="text-xs font-semibold text-white/45">No history yet</div>
              ) : (
                ins.history.slice(0, 8).map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      resetOverlays()
                      setRoute({ name: 'detail', id: a.id })
                    }}
                    className="w-full text-left rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] font-extrabold text-white/80 tabular-nums">
                        {a.date} · {a.time}
                      </div>
                      <StatusBadge status={a.status} />
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-white/70 truncate">{a.title}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-[calc(2.75rem+env(safe-area-inset-bottom,0px))] px-5">
          <PrimaryButton
            onClick={() => {
              resetOverlays()
              setRoute({
                name: 'create',
                preset: {
                  patientName: selectedPatient.name,
                  phone: selectedPatient.phone,
                  title: '',
                  time: '',
                  durationMin: String(settings.defaultDurationMin || 30),
                  room: '',
                  status: 'pending',
                  notes: selectedPatient.profileNotes,
                  date: todayIso
                }
              })
            }}
          >
            Create Appointment
          </PrimaryButton>
        </div>
      </motion.div>
    )
  }

  const renderRooms = () => (
    <motion.div
      key="rooms"
      custom={1}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full w-full flex flex-col"
    >
      <AppHeader title="Rooms" subtitle="Live overview" rightSlot={<div className="w-10" />} />

      <div className="px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto space-y-3">
        {roomsModel.map((r) => {
          const statusLabel = r.status === 'occupied' ? 'Occupied' : r.status === 'cleaning' ? 'Cleaning' : 'Available'
          const tone =
            r.status === 'occupied' ? 'text-amber-200' : r.status === 'cleaning' ? 'text-cyan-200' : 'text-emerald-200'

          return (
            <div key={r.roomName} className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-white/90 truncate">{r.roomName}</div>
                  <div className={`mt-1 text-xs font-extrabold ${tone}`}>{statusLabel}</div>
                </div>
                <div className="text-[10px] font-black text-white/35">LIVE</div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-white/45 uppercase tracking-[0.12em]">
                  <span>Day progress</span>
                  <span className="tabular-nums">{r.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent to-purple" style={{ width: `${r.progress}%` }} />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">Next appointment</div>
                {r.next ? (
                  <div className="mt-2 text-xs font-semibold text-white/75">
                    <span className="font-extrabold tabular-nums text-white/85">{r.next.time}</span>
                    <span className="text-white/35"> · </span>
                    <span className="truncate">{r.next.patient.name}</span>
                    <div className="mt-1 text-[11px] text-white/55 truncate">
                      {r.next.title} · {r.next.durationMin}m
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-xs font-semibold text-white/45">No upcoming slots</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div
      key="settings"
      custom={1}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full w-full flex flex-col"
    >
      <AppHeader title="Settings" subtitle={settings.clinicName} rightSlot={<div className="w-10" />} />

      <div className="px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-5 space-y-4">
          <TextInput label="Clinic name" value={settings.clinicName} onChange={(v) => setSettings((s) => ({ ...s, clinicName: v }))} />
          <TextInput label="Working hours" value={settings.workingHours} onChange={(v) => setSettings((s) => ({ ...s, workingHours: v }))} />

          <TextInput
            label="Default duration (minutes)"
            value={String(settings.defaultDurationMin ?? 30)}
            inputMode="numeric"
            onChange={(v) => {
              const n = clamp(Number(v || 0), 5, 240)
              setSettings((s) => ({ ...s, defaultDurationMin: Number.isFinite(n) ? n : s.defaultDurationMin }))
            }}
          />

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-white/90">Notifications</div>
              <div className="text-[11px] text-white/45 mt-1">Alerts for schedule changes</div>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setSettings((s) => ({ ...s, notifications: !s.notifications }))}
              className={`flex h-9 w-14 shrink-0 items-center rounded-full border p-1 transition-colors ${
                settings.notifications ? 'justify-end border-accent/35 bg-accent/15' : 'justify-start border-white/10 bg-white/5'
              }`}
              aria-label="Toggle notifications"
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 520, damping: 34, mass: 0.55 }}
                className="h-7 w-7 rounded-full bg-white/90 shadow-sm ring-1 ring-black/10"
              />
            </motion.button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <div className="text-sm font-extrabold text-white/90">Theme</div>
            <div className="text-[11px] text-white/55 mt-2 leading-relaxed">
              Active: <span className="font-extrabold text-white/80">{settings.theme}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-gradient-to-r from-accent via-purple to-emerald-300 opacity-90" />
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderMainSurface = () => {
    if (route.name !== 'home') return null
    if (mainTab === 'schedule') return renderScheduleHome()
    if (mainTab === 'patients') return renderPatients()
    if (mainTab === 'rooms') return renderRooms()
    if (mainTab === 'settings') return renderSettings()
    return null
  }

  const renderDetail = () => (
    <motion.div
      key="detail"
      custom={-1}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full w-full flex flex-col"
    >
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <button type="button" onClick={goHome} className="text-xs font-semibold text-accent hover:text-accent/90 transition-colors">
          ← Back
        </button>
        <div className="text-text font-extrabold text-sm">Appointment</div>
        <div className="w-10 flex justify-end">{selected ? <StatusBadge status={selected.status} /> : null}</div>
      </div>

      <div className="px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] flex-1 overflow-auto">
        {selected ? (
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/18 to-cyan-400/14 flex items-center justify-center text-white/90 font-extrabold">
                  {initialsFromName(selected.patient.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/95 font-extrabold text-lg leading-tight truncate">{selected.patient.name}</div>
                  <div className="text-secondary text-xs mt-1 truncate">{selected.patient.phone}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 min-w-0">
                  <div className="text-white/55 font-bold uppercase tracking-[0.12em]">Treatment</div>
                  <div className="mt-1 text-white/85 font-semibold truncate">{selected.title}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 min-w-0">
                  <div className="text-white/55 font-bold uppercase tracking-[0.12em]">Time</div>
                  <div className="mt-1 text-white/85 font-semibold tabular-nums truncate">
                    {selected.date} · {selected.time}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 min-w-0">
                  <div className="text-white/55 font-bold uppercase tracking-[0.12em]">Duration</div>
                  <div className="mt-1 text-white/85 font-semibold tabular-nums">{selected.durationMin} min</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 min-w-0">
                  <div className="text-white/55 font-bold uppercase tracking-[0.12em]">Room</div>
                  <div className="mt-1 text-white/85 font-semibold truncate">{selected.room}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">Status</div>
                <StatusBadge status={selected.status} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <div className="text-text font-extrabold text-sm">Notes</div>
              <div className="text-secondary text-xs mt-2 leading-relaxed">{selected.notes || '-'}</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <div className="text-text font-extrabold text-sm">Activity</div>
              <div className="mt-3 space-y-3">
                {buildMockActivity(selected).map((row) => (
                  <div key={row.m} className="flex gap-3">
                    <div className="text-[11px] font-extrabold text-white/45 tabular-nums w-10 shrink-0">{row.t}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${row.ok ? 'text-white/75' : 'text-white/35'}`}>{row.m}</div>
                      <div className="mt-2 h-px bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-5">
              <div className="flex items-center justify-between">
                <div className="text-text font-extrabold text-sm">Actions</div>
                <AnimatePresence>
                  {showCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="flex items-center gap-2 text-xs font-bold text-cyan-200"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 0.55, ease: 'easeInOut' }}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 border border-cyan-400/25"
                      >
                        ✓
                      </motion.span>
                      Saved
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => showToast(`Calling ${selected.patient.name}...`)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-bold text-white/80 hover:bg-white/10 transition-colors"
                >
                  Call
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    resetOverlays()
                    setRoute({ name: 'edit', id: selected.id })
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-bold text-white/80 hover:bg-white/10 transition-colors"
                >
                  Edit
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  disabled={selected.status === 'completed' || selected.status === 'cancelled'}
                  onClick={() => {
                    setAppointments((prev) => prev.map((a) => (a.id === selected.id ? { ...a, status: 'completed' } : a)))
                    setShowCompleted(true)
                    showToast('Appointment completed')
                    window.setTimeout(() => setShowCompleted(false), 1400)
                  }}
                  className="rounded-2xl bg-gradient-to-r from-emerald-400/90 to-cyan-400/90 px-3 py-3 text-xs font-extrabold text-background shadow-lg hover:from-emerald-400 hover:to-cyan-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Complete
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  disabled={selected.status === 'cancelled'}
                  onClick={() =>
                    setConfirm({
                      title: 'Cancel this appointment?',
                      body: 'Cancel this appointment?',
                      confirmLabel: 'Cancel',
                      onConfirm: () => {
                        cancelAppointment(selected.id)
                        setConfirm(null)
                        showToast('Appointment cancelled')
                        goHome()
                      }
                    })
                  }
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-extrabold text-white/70 hover:bg-white/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-secondary text-sm">Appointment not found.</div>
        )}
      </div>
    </motion.div>
  )

  const renderForm = () => {
    const preset = route?.preset || {}
    const initialDraft =
      route.name === 'edit' && selected
        ? {
            id: selected.id,
            date: selected.date || todayIso,
            patientName: selected.patient.name,
            phone: selected.patient.phone,
            title: selected.title,
            time: selected.time,
            durationMin: String(selected.durationMin ?? ''),
            room: selected.room,
            status: selected.status,
            notes: selected.notes
          }
        : {
            id: getNextId(),
            date: preset.date || todayIso,
            patientName: preset.patientName || '',
            phone: preset.phone || '',
            title: preset.title || '',
            time: preset.time || '',
            durationMin: String(preset.durationMin ?? settings.defaultDurationMin ?? 30),
            room: preset.room || '',
            status: preset.status || 'pending',
            notes: preset.notes || ''
          }

    return (
      <motion.div
        key={route.name}
        custom={-1}
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative h-full w-full"
      >
        <AppointmentFormScreen
          mode={route.name}
          initialDraft={initialDraft}
          onBack={() => {
            if (route.name === 'edit') setRoute({ name: 'detail', id: route.id })
            else goHome()
          }}
          onSave={(draft) => {
            const appt = normalizeAppointment(draft)
            upsertAppointment(appt)
            showToast(route.name === 'edit' ? 'Appointment updated' : 'Appointment created')
            setRoute(route.name === 'edit' ? { name: 'detail', id: appt.id } : { name: 'home' })
            setMainTab('schedule')
          }}
        />
      </motion.div>
    )
  }

  return (
    <div className="h-full w-full min-h-0 flex flex-col overflow-hidden">
      <div className="relative flex-1 min-h-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#070a12] to-[#05070c]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-14 -left-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute top-24 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
                backgroundSize: '26px 26px'
              }}
            />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            {route.name === 'patientDetail'
              ? renderPatientDetail()
              : route.name === 'detail'
                ? renderDetail()
                : route.name === 'create' || route.name === 'edit'
                  ? renderForm()
                  : renderMainSurface()}
          </AnimatePresence>

          {route.name === 'home' ? <BottomTabs tab={mainTab} onChange={(t) => {
            resetOverlays()
            setMainTab(t)
          }} /> : null}

          <AnimatePresence>{toast && <Toast text={toast} />}</AnimatePresence>
          <AnimatePresence>
            {confirm && (
              <ConfirmDialog
                title={confirm.title}
                body={confirm.body}
                confirmLabel={confirm.confirmLabel}
                onConfirm={confirm.onConfirm}
                onClose={() => setConfirm(null)}
              />
            )}
          </AnimatePresence>
        </div>
    </div>
  )
})

export default ClinicFlowApp
