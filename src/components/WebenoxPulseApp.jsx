import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const cls = (...xs) => xs.filter(Boolean).join(' ')

const fmtInt = (n) => Number(n || 0).toLocaleString()
const fmtMoney = (n) => `€${fmtInt(n)}`
const fmtPct = (n, digits = 1) => `${Number(n).toFixed(digits)}%`
const fmtDeltaPct = (cur, prev, digits = 1) => {
  const p = Number(prev || 0)
  const c = Number(cur || 0)
  if (!p) return null
  const d = ((c - p) / p) * 100
  const sign = d >= 0 ? '+' : ''
  return `${sign}${d.toFixed(digits)}%`
}

const Icon = ({ name, className }) => {
  const base = 'h-4 w-4'
  if (name === 'bolt') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls(base, className)}>
        <path
          d="M13 2L4 14h7l-1 8 10-13h-7l0-7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'globe') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls(base, className)}>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 3c3 3.2 3 14.8 0 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 3c-3 3.2-3 14.8 0 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'device') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls(base, className)}>
        <path
          d="M8 6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5v11A2.5 2.5 0 0 1 13.5 20h-3A2.5 2.5 0 0 1 8 17.5v-11Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M11 7h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'spark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls(base, className)}>
        <path d="M4 18V6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M4 18h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M7.5 14.5l3-3 2.5 2.5 4-5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls(base, className)}>
      <path d="M6 12h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

const Card = ({ children, className }) => (
  <div
    className={cls(
      'relative rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_-45px_rgba(0,0,0,0.95)] backdrop-blur-xl',
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.06),transparent_55%)]" />
    <div className="relative">{children}</div>
  </div>
)

const Metric = ({ label, value, delta, tone = 'neutral' }) => (
  <Card className="p-4">
    <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">{label}</div>
    <div className="mt-1 flex items-end justify-between gap-2">
      <div className="text-[18px] font-black tracking-tight text-white/90">{value}</div>
      {delta ? (
        <div
          className={cls(
            'rounded-full border px-2 py-1 text-[10px] font-extrabold',
            tone === 'good'
              ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100/80'
              : tone === 'bad'
                ? 'border-rose-300/20 bg-rose-400/10 text-rose-100/80'
                : 'border-white/10 bg-black/20 text-white/55'
          )}
        >
          {delta}
        </div>
      ) : null}
    </div>
  </Card>
)

const Bar = ({ label, value, max, onClick, hint }) => {
  const w = max > 0 ? Math.max(6, Math.round((value / max) * 100)) : 0
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cls(
        'w-full text-left rounded-2xl border border-white/10 bg-black/20 px-3 py-2 transition-colors',
        onClick && 'hover:bg-white/[0.06]'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-extrabold text-white/80 truncate">{label}</div>
          {hint ? <div className="mt-0.5 text-[10px] text-white/45 truncate">{hint}</div> : null}
        </div>
        <div className="text-[11px] text-white/55">{value.toLocaleString()}</div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 shadow-[0_0_14px_rgba(56,189,248,0.18)]"
          style={{ width: `${w}%` }}
        />
      </div>
    </Comp>
  )
}

const clamp01 = (n) => Math.min(1, Math.max(0, n))

const Sparkline = ({ points, tone = 'cyan' }) => {
  const w = 220
  const h = 48
  const pad = 4
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = Math.max(1, max - min)
  const step = (w - pad * 2) / Math.max(1, points.length - 1)
  const d = points
    .map((v, i) => {
      const x = pad + i * step
      const t = (v - min) / span
      const y = pad + (1 - t) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  const fillD = `${d} L${(w - pad).toFixed(2)} ${(h - pad).toFixed(2)} L${pad.toFixed(2)} ${(h - pad).toFixed(
    2
  )} Z`

  const gradId = tone === 'purple' ? 'pulseGradPurple' : 'pulseGradCyan'
  const stroke = tone === 'purple' ? 'url(#pulseStrokePurple)' : 'url(#pulseStrokeCyan)'
  const fill = tone === 'purple' ? 'url(#pulseFillPurple)' : 'url(#pulseFillCyan)'

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pulseStrokeCyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(103,232,249,0.95)" />
          <stop offset="0.55" stopColor="rgba(56,189,248,0.92)" />
          <stop offset="1" stopColor="rgba(167,139,250,0.9)" />
        </linearGradient>
        <linearGradient id="pulseStrokePurple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(167,139,250,0.95)" />
          <stop offset="0.55" stopColor="rgba(56,189,248,0.9)" />
          <stop offset="1" stopColor="rgba(103,232,249,0.85)" />
        </linearGradient>
        <linearGradient id="pulseFillCyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(56,189,248,0.22)" />
          <stop offset="1" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
        <linearGradient id="pulseFillPurple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(167,139,250,0.20)" />
          <stop offset="1" stopColor="rgba(167,139,250,0)" />
        </linearGradient>
        <filter id={gradId} x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={fillD} fill={fill} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2.25" strokeLinecap="round" filter={`url(#${gradId})`} />
    </svg>
  )
}

const Donut = ({ items }) => {
  const size = 64
  const r = 22
  const c = 2 * Math.PI * r
  const total = items.reduce((a, b) => a + b.value, 0) || 1
  let acc = 0
  const center = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <defs>
        <filter id="donutGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={center} cy={center} r={r} stroke="rgba(255,255,255,0.10)" strokeWidth="8" fill="none" />
      {items.map((it) => {
        const frac = clamp01(it.value / total)
        const len = frac * c
        const dash = `${len} ${c - len}`
        const offset = -(acc * c)
        acc += frac
        return (
          <circle
            key={it.id}
            cx={center}
            cy={center}
            r={r}
            stroke={it.color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={dash}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
            strokeLinecap="round"
            filter="url(#donutGlow)"
          />
        )
      })}
      <circle cx={center} cy={center} r={r - 9} fill="rgba(0,0,0,0.18)" />
    </svg>
  )
}

const Pill = ({ active, onClick, children, icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={cls(
      'flex items-center gap-2 rounded-2xl border px-3 py-2 text-[11px] font-extrabold transition-all',
      active
        ? 'border-cyan-200/25 bg-gradient-to-r from-cyan-400/12 via-sky-400/10 to-purple-400/10 text-white/85 shadow-[0_0_24px_rgba(56,189,248,0.10)]'
        : 'border-white/10 bg-black/20 text-white/60 hover:bg-white/[0.06] hover:text-white/75'
    )}
  >
    {icon ? <span className={cls('text-white/70', active && 'text-cyan-100/85')}>{icon}</span> : null}
    <span className="truncate">{children}</span>
  </button>
)

const Row = ({ title, right, children }) => (
  <Card className="p-4">
    <div className="flex items-center justify-between gap-3">
      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">{title}</div>
      {right ? <div className="text-[10px] text-white/40">{right}</div> : null}
    </div>
    <div className="mt-3">{children}</div>
  </Card>
)

const Funnel = ({ steps }) => {
  const top = Math.max(...steps.map((s) => s.value))
  return (
    <div className="space-y-2">
      {steps.map((s, idx) => {
        const next = steps[idx + 1]
        const drop = next ? 1 - next.value / Math.max(1, s.value) : 0
        const dropPct = next ? `${Math.round(drop * 100)}% drop` : null
        return (
          <div key={s.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold text-white/80 truncate">{s.label}</div>
                {dropPct ? <div className="mt-0.5 text-[10px] text-white/45">{dropPct}</div> : null}
              </div>
              <div className="shrink-0 text-[11px] text-white/55">{fmtInt(s.value)}</div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400"
                style={{ width: `${Math.max(6, Math.round((s.value / Math.max(1, top)) * 100))}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const DetailHeader = ({ title, subtitle, onBack }) => (
  <div className="flex items-start justify-between gap-3">
    <button
      type="button"
      onClick={onBack}
      className="shrink-0 rounded-2xl border border-white/12 bg-white/[0.03] px-3 py-2 text-[11px] font-extrabold text-white/70 hover:bg-white/[0.06]"
    >
      Back
    </button>
    <div className="min-w-0 flex-1">
      <div className="text-[13px] font-extrabold text-white/90 truncate">{title}</div>
      {subtitle ? <div className="mt-0.5 text-[10px] text-white/55 truncate">{subtitle}</div> : null}
    </div>
    <div className="shrink-0 rounded-2xl border border-white/12 bg-black/20 px-3 py-2 text-[10px] font-extrabold text-white/60">
      read-only
    </div>
  </div>
)

export default function WebenoxPulseApp() {
  const [range, setRange] = useState('7d') // 7d | 30d
  const [tab, setTab] = useState('overview') // overview | acquisition | campaigns
  const [segment, setSegment] = useState('all') // all | organic | paid | referral
  const [realtime, setRealtime] = useState(14)
  const [detail, setDetail] = useState(null) // { kind, label, value }

  const data = useMemo(() => {
    const rangeMult = range === '30d' ? 4.2 : 1
    const segMult = segment === 'paid' ? 1.12 : segment === 'organic' ? 0.92 : segment === 'referral' ? 0.78 : 1
    const mult = rangeMult * segMult
    const base = {
      visits: Math.round(12840 * mult),
      leads: Math.round(312 * mult),
      conv: range === '30d' ? 2.41 : 2.53,
      revenue: Math.round(18900 * mult)
    }
    const prevMult = mult * (range === '30d' ? 0.93 : 0.96)
    const prev = {
      visits: Math.round(12840 * prevMult),
      leads: Math.round(312 * prevMult),
      conv: (range === '30d' ? 2.36 : 2.48) * (segment === 'paid' ? 0.98 : 1),
      revenue: Math.round(18900 * prevMult)
    }
    const seriesBase = range === '30d'
      ? [86, 92, 88, 97, 104, 112, 108, 116, 123, 128, 121, 134, 142, 138, 149, 154, 160, 157, 169, 176, 172, 184, 190, 198, 205, 212, 209, 221, 232, 240]
      : [92, 98, 104, 109, 113, 108, 120]
    const series = seriesBase.map((v) => Math.max(40, Math.round(v * segMult)))
    const pages = [
      { label: 'Home', value: Math.round(5840 * mult) },
      { label: 'Services', value: Math.round(3180 * mult) },
      { label: 'Concepts', value: Math.round(2210 * mult) },
      { label: 'Contact', value: Math.round(1180 * mult) }
    ]
    const campaigns = [
      { label: 'Google Search · Brand', value: Math.round(3920 * mult) },
      { label: 'Instagram · Reels', value: Math.round(2860 * mult) },
      { label: 'LinkedIn · Outreach', value: Math.round(1760 * mult) },
      { label: 'Referral', value: Math.round(980 * mult) }
    ]
    const countries = [
      { id: 'de', label: 'Germany', flag: 'DE', value: Math.round(3320 * mult) },
      { id: 'ch', label: 'Switzerland', flag: 'CH', value: Math.round(1840 * mult) },
      { id: 'at', label: 'Austria', flag: 'AT', value: Math.round(1260 * mult) },
      { id: 'ba', label: 'Bosnia', flag: 'BA', value: Math.round(820 * mult) }
    ]
    const devices = [
      { id: 'mobile', label: 'Mobile', value: Math.round(64 * segMult), color: 'rgba(56,189,248,0.95)' },
      { id: 'desktop', label: 'Desktop', value: Math.round(27 * segMult), color: 'rgba(167,139,250,0.9)' },
      { id: 'tablet', label: 'Tablet', value: Math.round(9 * segMult), color: 'rgba(103,232,249,0.82)' }
    ]
    const events = [
      { id: 'e1', t: 'Just now', label: 'New lead', meta: 'Services → Contact', tone: 'good' },
      { id: 'e2', t: '2m', label: 'Checkout started', meta: 'WebenoxShop', tone: 'neutral' },
      { id: 'e3', t: '6m', label: 'Chat opened', meta: 'WebenoxAI', tone: 'neutral' },
      { id: 'e4', t: '11m', label: 'CTA clicked', meta: 'Hero → Book a call', tone: 'good' }
    ]
    const funnel = (() => {
      const views = base.visits
      const engaged = Math.round(views * 0.62)
      const cta = Math.round(views * 0.18)
      const lead = base.leads
      const purchase = Math.max(1, Math.round(lead * 0.24))
      return [
        { id: 'views', label: 'Page views', value: views },
        { id: 'engaged', label: 'Engaged sessions', value: engaged },
        { id: 'cta', label: 'CTA clicks', value: cta },
        { id: 'lead', label: 'Leads', value: lead },
        { id: 'purchase', label: 'Purchases', value: purchase }
      ]
    })()
    return { base, prev, series, pages, campaigns, countries, devices, events, funnel }
  }, [range, segment])

  const maxPages = Math.max(...data.pages.map((p) => p.value))
  const maxCamps = Math.max(...data.campaigns.map((c) => c.value))
  const maxCountries = Math.max(...data.countries.map((c) => c.value))

  useEffect(() => {
    const id = window.setInterval(() => {
      setRealtime((v) => {
        const drift = Math.random() < 0.55 ? 1 : -1
        const bump = Math.random() < 0.18 ? (Math.random() < 0.5 ? 2 : -2) : 0
        return Math.max(3, Math.min(48, v + drift + bump))
      })
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    setDetail(null)
  }, [tab])

  const openDetail = (kind, item) => {
    setDetail({
      kind,
      id: item.id || item.label,
      label: item.label,
      value: item.value
    })
  }

  const detailSeries = useMemo(() => {
    if (!detail) return null
    const bump = detail.kind === 'campaign' ? 1.08 : detail.kind === 'country' ? 0.92 : 1.02
    const salt = String(detail.id).length % 5
    return data.series.map((v, i) => Math.max(10, Math.round(v * bump + ((i + salt) % 3 === 0 ? 6 : -2))))
  }, [detail, data.series])

  const detailKpis = useMemo(() => {
    if (!detail) return null
    const sessions = Math.max(120, Math.round(detail.value * 0.9))
    const share = Math.min(48, Math.max(3, Math.round((detail.value / Math.max(1, data.base.visits)) * 100)))
    const conv = Math.min(6.5, Math.max(0.6, data.base.conv * (detail.kind === 'campaign' ? 1.08 : 0.94)))
    return { sessions, share, conv }
  }, [detail, data.base.visits, data.base.conv])

  return (
    <div className="relative h-full w-full min-h-0 overflow-hidden bg-[#070810]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-56 w-[640px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="absolute bottom-0 -right-28 h-80 w-80 rounded-full bg-purple-400/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative z-10 flex h-full w-full min-h-0 flex-col overflow-hidden px-4 pt-4 pb-3">
        {detail ? (
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <DetailHeader
              title={detail.label}
              subtitle={`${detail.kind} · Last ${range === '30d' ? '30 days' : '7 days'} · ${segment}`}
              onBack={() => setDetail(null)}
            />
            <div className="mt-3 flex-1 min-h-0 overflow-y-auto hide-scrollbar space-y-3 pb-6">
              <Row title="Trend" right="vs previous">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[12px] font-extrabold text-white/85">Sessions</div>
                    <div className="mt-0.5 text-[10px] text-white/55">Tap rows to drill down further</div>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-[10px] font-extrabold text-white/65">
                    {fmtDeltaPct(detail.value, detail.value * 0.92, 1) || '+0.0%'}
                  </div>
                </div>
                <div className="mt-3">{detailSeries ? <Sparkline points={detailSeries} tone="purple" /> : null}</div>
              </Row>

              <div className="grid grid-cols-2 gap-3">
                <Metric label="Sessions" value={fmtInt(detailKpis.sessions)} delta={fmtDeltaPct(detailKpis.sessions, detailKpis.sessions * 0.94, 1)} tone="good" />
                <Metric label="Share" value={fmtPct(detailKpis.share, 0)} delta="+0.6%" tone="good" />
                <Metric label="Conv. rate" value={fmtPct(detailKpis.conv, 2)} delta="+0.1%" tone="good" />
                <Metric label="Revenue" value={fmtMoney(Math.round((detail.value / Math.max(1, data.base.visits)) * data.base.revenue))} delta="+3.2%" tone="good" />
              </div>

              <Row title="Top referrers" right="Sessions">
                <div className="space-y-2">
                  {[
                    { label: 'Direct', value: Math.round(detail.value * 0.42) },
                    { label: 'Google', value: Math.round(detail.value * 0.31) },
                    { label: 'Instagram', value: Math.round(detail.value * 0.18) },
                    { label: 'Other', value: Math.round(detail.value * 0.09) }
                  ].map((r) => (
                    <Bar
                      key={r.label}
                      label={r.label}
                      hint="source"
                      value={r.value}
                      max={detail.value}
                    />
                  ))}
                </div>
              </Row>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[14px] font-extrabold text-white/90 tracking-tight truncate">WebenoxPulse</div>
            <div className="mt-0.5 text-[10px] text-white/55 truncate">Live analytics for your site/app</div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {['7d', '30d'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setRange(k)}
                className={cls(
                  'rounded-2xl border px-3 py-2 text-[11px] font-extrabold transition-all',
                  range === k
                    ? 'border-cyan-200/25 bg-gradient-to-r from-cyan-400/12 via-sky-400/10 to-purple-400/10 text-white/85 shadow-[0_0_22px_rgba(56,189,248,0.10)]'
                    : 'border-white/12 bg-white/[0.03] text-white/65 hover:bg-white/[0.06] hover:text-white/75'
                )}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex shrink-0 items-center gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: <Icon name="spark" /> },
            { id: 'acquisition', label: 'Acquisition', icon: <Icon name="globe" /> },
            { id: 'campaigns', label: 'Campaigns', icon: <Icon name="bolt" /> }
          ].map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setTab(x.id)}
              className={cls(
                'flex-1 rounded-2xl border px-3 py-2 text-[11px] font-extrabold transition-all',
                tab === x.id
                  ? 'border-white/18 bg-white/[0.07] text-white/85 shadow-[0_0_18px_rgba(255,255,255,0.06)]'
                  : 'border-white/12 bg-white/[0.03] text-white/65 hover:bg-white/[0.06] hover:text-white/75'
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <span className={cls('text-white/65', tab === x.id && 'text-cyan-100/85')}>{x.icon}</span>
                <span>{x.label}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex shrink-0 items-center gap-2">
          <Pill active={segment === 'all'} onClick={() => setSegment('all')} icon={<Icon name="spark" className="h-3.5 w-3.5" />}>
            All traffic
          </Pill>
          <Pill active={segment === 'organic'} onClick={() => setSegment('organic')}>
            Organic
          </Pill>
          <Pill active={segment === 'paid'} onClick={() => setSegment('paid')}>
            Paid
          </Pill>
          <Pill active={segment === 'referral'} onClick={() => setSegment('referral')}>
            Referral
          </Pill>
        </div>

        <div className="mt-3 flex-1 min-h-0 overflow-y-auto hide-scrollbar space-y-3 pb-6">
          <AnimatePresence mode="wait" initial={false}>
            {tab === 'overview' ? (
              <motion.div
                key="ov"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-3"
              >
                <Row
                  title="Realtime"
                  right={
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.22)]" />
                      <span>{realtime} active</span>
                    </span>
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[12px] font-extrabold text-white/85">Traffic trend</div>
                      <div className="mt-0.5 text-[10px] text-white/55">Last {range === '30d' ? '30 days' : '7 days'} · {segment}</div>
                    </div>
                    <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-[10px] font-extrabold text-white/65">
                      +{range === '30d' ? '12.4' : '4.6'}%
                    </div>
                  </div>
                  <div className="mt-3">
                    <Sparkline points={data.series} tone="cyan" />
                  </div>
                </Row>

                <div className="grid grid-cols-2 gap-3">
                  <Metric
                    label="Visits"
                    value={fmtInt(data.base.visits)}
                    delta={fmtDeltaPct(data.base.visits, data.prev.visits, 1)}
                    tone="good"
                  />
                  <Metric
                    label="Leads"
                    value={fmtInt(data.base.leads)}
                    delta={fmtDeltaPct(data.base.leads, data.prev.leads, 1)}
                    tone="good"
                  />
                  <Metric
                    label="Conv. rate"
                    value={fmtPct(data.base.conv, 2)}
                    delta={fmtDeltaPct(data.base.conv, data.prev.conv, 2)}
                    tone={data.base.conv >= data.prev.conv ? 'good' : 'bad'}
                  />
                  <Metric
                    label="Revenue"
                    value={fmtMoney(data.base.revenue)}
                    delta={fmtDeltaPct(data.base.revenue, data.prev.revenue, 1)}
                    tone="good"
                  />
                </div>

                <Row title="Funnel" right="View → Purchase">
                  <Funnel steps={data.funnel} />
                </Row>

                <Row title="Top pages" right="Views">
                  <div className="space-y-2">
                    {data.pages.map((p) => (
                      <Bar
                        key={p.label}
                        label={p.label}
                        hint="tap for details"
                        value={p.value}
                        max={maxPages}
                        onClick={() => openDetail('page', p)}
                      />
                    ))}
                  </div>
                </Row>

                <Row title="Activity feed" right="Last 15m">
                  <div className="space-y-2">
                    {data.events.map((e) => (
                      <div key={e.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div
                              className={cls(
                                'h-1.5 w-1.5 rounded-full',
                                e.tone === 'good' ? 'bg-emerald-400' : 'bg-white/30'
                              )}
                            />
                            <div className="text-[11px] font-extrabold text-white/80 truncate">{e.label}</div>
                          </div>
                          <div className="mt-0.5 text-[10px] text-white/55 truncate">{e.meta}</div>
                        </div>
                        <div className="shrink-0 text-[10px] text-white/45">{e.t}</div>
                      </div>
                    ))}
                  </div>
                </Row>
              </motion.div>
            ) : tab === 'acquisition' ? (
              <motion.div
                key="acq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-3"
              >
                <Row title="Devices" right="Share">
                  <div className="flex items-center gap-4">
                    <Donut items={data.devices} />
                    <div className="min-w-0 flex-1 space-y-2">
                      {data.devices.map((d) => (
                        <div key={d.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                            <div className="text-[11px] font-extrabold text-white/80 truncate">{d.label}</div>
                          </div>
                          <div className="text-[11px] text-white/55">{d.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Row>

                <Row title="Top countries" right="Sessions">
                  <div className="space-y-2">
                    {data.countries.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => openDetail('country', c)}
                        className="w-full text-left flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <div className="h-7 w-7 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[10px] font-black text-white/75">
                            {c.flag}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-extrabold text-white/80 truncate">{c.label}</div>
                            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400"
                                style={{ width: `${Math.max(8, Math.round((c.value / maxCountries) * 100))}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 text-[11px] text-white/55">{c.value.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                </Row>

                <Row title="Quality signals" right="Today">
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">Bounce</div>
                        <Icon name="bolt" className="text-white/55" />
                      </div>
                      <div className="mt-2 text-[18px] font-black text-white/90">32%</div>
                      <div className="mt-1 text-[10px] text-white/55">-3.1% vs last</div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">Avg. time</div>
                        <Icon name="device" className="text-white/55" />
                      </div>
                      <div className="mt-2 text-[18px] font-black text-white/90">2m 14s</div>
                      <div className="mt-1 text-[10px] text-white/55">+8% vs last</div>
                    </Card>
                  </div>
                </Row>
              </motion.div>
            ) : (
              <motion.div
                key="cmp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-3"
              >
                <Row title="Top campaigns" right="Sessions">
                  <div className="space-y-2">
                    {data.campaigns.map((c) => (
                      <Bar
                        key={c.label}
                        label={c.label}
                        hint="tap for details"
                        value={c.value}
                        max={maxCamps}
                        onClick={() => openDetail('campaign', c)}
                      />
                    ))}
                  </div>
                </Row>

                <Row title="Creative performance" right="Last 7d">
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">CTR</div>
                      <div className="mt-2 text-[18px] font-black text-white/90">3.8%</div>
                      <div className="mt-1 text-[10px] text-white/55">+0.4% pts</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">CPL</div>
                      <div className="mt-2 text-[18px] font-black text-white/90">€14.2</div>
                      <div className="mt-1 text-[10px] text-white/55">-9.1%</div>
                    </Card>
                  </div>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[11px] font-extrabold text-white/80">Best ad</div>
                      <div className="text-[10px] text-emerald-100/70 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 font-extrabold">
                        scaling
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-white/55">{`"Premium Agency · Book a Call"`}</div>
                    <div className="mt-3">
                      <Sparkline points={data.series.map((v, i) => v + (i % 3 === 0 ? 6 : -2))} tone="purple" />
                    </div>
                  </div>
                </Row>

                <Row title="Notes">
                  <div className="text-[12px] leading-relaxed text-white/60">
                    Demo data, real UX. Later we can connect a real source (GA4 / Plausible / PostHog) and keep the same UI.
                  </div>
                </Row>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
          </div>
        )}
      </div>
    </div>
  )
}

