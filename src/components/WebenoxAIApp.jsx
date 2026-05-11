import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const cls = (...xs) => xs.filter(Boolean).join(' ')

const welcomeChatMessage = () => ({
  id: `welcome_${Date.now()}`,
  role: 'ai',
  text: 'Ask anything you want. Welcome to WebenoxAI.'
})

const Screen = ({ children }) => (
  <div className="relative h-full w-full min-h-0 overflow-hidden bg-[#070810]">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 left-1/2 h-56 w-[640px] -translate-x-1/2 rounded-full bg-fuchsia-400/10 blur-[110px]" />
      <div className="absolute top-28 -left-40 h-72 w-72 rounded-full bg-cyan-400/8 blur-[110px]" />
      <div className="absolute bottom-0 -right-28 h-80 w-80 rounded-full bg-purple-400/8 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.78)_100%)]" />
      <motion.div
        className="absolute inset-0 opacity-[0.14]"
        animate={{ backgroundPosition: ['0% 0%', '130% 130%'] }}
        transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.20) 0px, transparent 1px)',
          backgroundSize: '140px 140px'
        }}
      />
    </div>
    {children}
  </div>
)

const Surface = ({ children, className }) => (
  <div
    className={cls(
      'relative rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl',
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.06),transparent_55%)]" />
    {/* h-full min-h-0: so nested overflow-y (chat) gets a bounded height inside flex layouts */}
    <div className="relative h-full min-h-0">{children}</div>
  </div>
)

const PrimaryButton = ({ children, onClick, className, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cls(
      'w-full rounded-2xl px-4 py-3 text-[12px] font-extrabold transition-all',
      disabled
        ? 'border border-white/10 bg-white/5 text-white/40'
        : 'bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 text-background shadow-[0_18px_55px_-38px_rgba(146,95,226,0.85)]',
      className
    )}
  >
    {children}
  </button>
)

const GhostButton = ({ children, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={cls(
      'rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-extrabold text-white/70 hover:bg-white/10 transition-colors',
      className
    )}
  >
    {children}
  </button>
)

const TinyPill = ({ children, tone = 'neutral' }) => (
  <span
    className={cls(
      'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]',
      tone === 'brand'
        ? 'border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100/75'
        : 'border-white/10 bg-black/20 text-white/55'
    )}
  >
    {children}
  </span>
)

const Toast = ({ toast }) => (
  <AnimatePresence>
    {toast ? (
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute left-1/2 top-4 z-30 -translate-x-1/2"
      >
        <div className="rounded-2xl border border-white/12 bg-black/60 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur-md">
          {toast}
        </div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)

const TypingDots = () => (
  <div className="inline-flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-white/60"
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.14 }}
      />
    ))}
  </div>
)

const SectionTitle = ({ overline, title, right }) => (
  <div className="flex items-end justify-between gap-3">
    <div className="min-w-0">
      <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/45">{overline}</div>
      <div className="mt-1 text-[14px] font-extrabold text-white/88 tracking-tight">{title}</div>
    </div>
    {right ? <div className="shrink-0">{right}</div> : null}
  </div>
)

const ResultCard = ({ title, children }) => (
  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
    <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">{title}</div>
    <div className="mt-2">{children}</div>
  </div>
)

const TabButton = ({ active, icon: IconComp, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cls(
      'relative flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 transition-colors',
      active ? 'text-white' : 'text-white/55 hover:text-white/75'
    )}
  >
    <div
      className={cls(
        'relative h-10 w-10 rounded-full border flex items-center justify-center transition-all',
        active ? 'border-white/18 bg-white/[0.08]' : 'border-white/10 bg-white/[0.03]'
      )}
    >
      {active && (
        <motion.div
          layoutId="tab-active-circle"
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-300/18 via-purple-300/16 to-cyan-200/16 shadow-[0_0_22px_rgba(146,95,226,0.18)]"
        />
      )}
      <div className="relative">
        <IconComp />
      </div>
    </div>
    <div className="text-[10px] font-extrabold">{label}</div>
  </button>
)

const Icon = {
  Spark: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5" {...props}>
      <path d="M12 2l1.6 6.1L20 10l-6.4 1.9L12 18l-1.6-6.1L4 10l6.4-1.9L12 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Brain: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5" {...props}>
      <path
        d="M9.5 5.5a3 3 0 0 1 5 0 3 3 0 0 1 2.7 4.3 3 3 0 0 1-.2 5.5 3.2 3.2 0 0 1-3.2 3.2H10.2A3.2 3.2 0 0 1 7 15.3a3 3 0 0 1-.2-5.5A3 3 0 0 1 9.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 6v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      <path d="M9 9h3M12 12h3M9 15h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    </svg>
  ),
  Chat: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5" {...props}>
      <path d="M5 6h14v9H8l-3 3V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  ),
  Globe: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5" {...props}>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.8 10.2h16.4M3.8 13.8h16.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <path d="M12 3c2.7 2.6 4.2 6 4.2 9s-1.5 6.4-4.2 9c-2.7-2.6-4.2-6-4.2-9S9.3 5.6 12 3Z" stroke="currentColor" strokeWidth="1.2" opacity="0.85" />
    </svg>
  ),
  Palette: (props) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5" {...props}>
      <path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1.2a1.8 1.8 0 0 1 0-3.6H14a7 7 0 0 0-2-13.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.3 10.3h.01M11.3 8.7h.01M14.3 10.3h.01M9.8 13.1h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

const defaultWebsitePrompt = 'A modern clinic website with booking and premium design.'
const stepsWebsite = ['Analyzing…', 'Structuring…', 'Finalizing…']
const stepsLogo = ['Analyzing…', 'Crafting…', 'Finalizing…']

/** Tailwind `md` — intro overlay only on desktop; skip on phone browsers (narrow viewport). */
const INTRO_MIN_VIEWPORT_W = 768

export default function WebenoxAIApp() {
  const [route, setRoute] = useState('chat') // chat | vault
  const [toast, setToast] = useState(null)
  const [showIntro, setShowIntro] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= INTRO_MIN_VIEWPORT_W
  )
  const [introStep, setIntroStep] = useState(0)

  const [anonId, setAnonId] = useState(() => {
    try {
      const x = localStorage.getItem('webenoxai_anon')
      if (x && String(x).trim()) return String(x).trim().slice(0, 80)
    } catch {
      // ignore
    }
    const gen = `anon_${crypto.randomUUID()}`
    try {
      localStorage.setItem('webenoxai_anon', gen)
    } catch {
      // ignore
    }
    return gen
  })
  const [conversationId, setConversationId] = useState('')
  const [routeHistory, setRouteHistory] = useState(() => ['chat'])
  const [conversations, setConversations] = useState([])
  const [isThreadsOpen, setThreadsOpen] = useState(false)

  const [savedItems, setSavedItems] = useState([])
  const [aiOnline, setAiOnline] = useState(true)
  const [aiMode, setAiMode] = useState('Neural')

  const [createMode, setCreateMode] = useState('website') // website | logo
  const [websitePrompt, setWebsitePrompt] = useState(defaultWebsitePrompt)
  const [websitePhase, setWebsitePhase] = useState('idle') // idle | loading | result
  const [websiteStep, setWebsiteStep] = useState(-1)
  const [websiteConcept, setWebsiteConcept] = useState(null)
  const [websiteError, setWebsiteError] = useState('')

  const [logoPrompt, setLogoPrompt] = useState('Luxury fitness brand')
  const [logoPhase, setLogoPhase] = useState('idle') // idle | loading | result
  const [logoStep, setLogoStep] = useState(-1)
  const [logoResult, setLogoResult] = useState(null)
  const [logoError, setLogoError] = useState('')

  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState(() => [welcomeChatMessage()])
  const chatScrollRef = useRef(null)
  const chatEndRef = useRef(null)
  const chatStickRef = useRef(true)
  const [chatStuck, setChatStuck] = useState(true)
  const streamRef = useRef({ t: 0 })

  const loadingTimerRef = useRef({ ids: [] })

  useEffect(() => {
    return () => {
      loadingTimerRef.current.ids.forEach((id) => window.clearTimeout(id))
      loadingTimerRef.current.ids = []
      if (streamRef.current.t) window.clearInterval(streamRef.current.t)
      streamRef.current.t = 0
    }
  }, [])

  const updateChatStickiness = () => {
    const el = chatScrollRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    // Stick to bottom unless user intentionally scrolls up.
    const stuck = distanceFromBottom < 120
    chatStickRef.current = stuck
    setChatStuck(stuck)
  }

  const scrollChatToEnd = (behavior = 'auto') => {
    const el = chatScrollRef.current
    if (!el) return
    // IMPORTANT: don't use scrollIntoView here; it can scroll the whole page
    // (and yank the user above the phone preview). Only scroll the chat container.
    const top = el.scrollHeight
    if (behavior === 'smooth') el.scrollTo({ top, behavior: 'smooth' })
    else el.scrollTop = top
  }

  const startStream = (id, fullText) => {
    if (streamRef.current.t) window.clearInterval(streamRef.current.t)
    streamRef.current.t = 0

    const txt = String(fullText || '')
    let i = 0
    const step = () => {
      const burst = 3 + Math.floor(Math.random() * 3) // 3-5 chars
      i = Math.min(txt.length, i + burst)
      const chunk = txt.slice(0, i)
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: chunk } : m)))
      if (chatStickRef.current) scrollChatToEnd('auto')
      if (i >= txt.length) {
        window.clearInterval(streamRef.current.t)
        streamRef.current.t = 0
      }
    }
    // start quickly so it feels alive
    step()
    streamRef.current.t = window.setInterval(step, 18)
  }

  useEffect(() => {
    if (route !== 'chat') return
    // allow layout to paint first
    window.requestAnimationFrame(() => scrollChatToEnd('auto'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route])

  useEffect(() => {
    if (route !== 'chat') return
    scrollChatToEnd('smooth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, isTyping, route])

  useEffect(() => {
    setRouteHistory((prev) => {
      const last = prev[prev.length - 1]
      if (last === route) return prev
      return [...prev, route].slice(-8)
    })
  }, [route])

  useEffect(() => {
    if (!anonId) return
    try {
      localStorage.setItem('webenoxai_anon', anonId)
    } catch {
      // ignore
    }
  }, [anonId])

  useEffect(() => {
    const id = window.setInterval(() => {
      setAiOnline(true)
      setAiMode((m) => (m === 'Neural' ? 'Vision' : m === 'Vision' ? 'Systems' : 'Neural'))
    }, 7000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!showIntro) return
    setIntroStep(0)
    const t1 = window.setTimeout(() => setIntroStep(1), 620)
    const t2 = window.setTimeout(() => setIntroStep(2), 1240)
    const t = window.setTimeout(() => {
      setShowIntro(false)
    }, 2400)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t)
    }
  }, [showIntro])

  const showToast = (msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 1400)
  }

  const apiFetch = async (path, opts = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
    if (anonId) headers['x-webenox-anon'] = anonId
    const r = await fetch(path, { ...opts, headers })
    const data = await r.json().catch(() => ({}))
    if (data?.anonId && data.anonId !== anonId) setAnonId(data.anonId)
    if (!r.ok) {
      const err = new Error(data?.error || 'api_error')
      err.detail = data
      throw err
    }
    return data
  }

  const refreshSaved = async () => {
    try {
      const data = await apiFetch('/api/webenoxai/saved', { method: 'GET', headers: {} })
      if (Array.isArray(data.items)) {
        setSavedItems(
          data.items.map((x) => ({
            id: x.id,
            type: x.type,
            title: x.title,
            summary: x.summary,
            payload: x.payload,
            createdAt: x.createdAt
          }))
        )
      }
    } catch {
      // ignore
    }
  }

  const refreshConversations = async () => {
    try {
      const data = await apiFetch('/api/webenoxai/conversations', { method: 'GET', headers: {} })
      if (Array.isArray(data.conversations)) setConversations(data.conversations)
    } catch {
      // ignore
    }
  }

  const loadConversation = async (id) => {
    if (!id) return
    try {
      const data = await apiFetch(`/api/webenoxai/conversations/${id}/messages`, { method: 'GET', headers: {} })
      if (data?.conversationId) setConversationId(data.conversationId)
      if (Array.isArray(data.messages)) {
        const mapped = data.messages.map((m) => ({ id: m.id, role: m.role, text: m.text }))
        setMessages(mapped.length ? mapped : [welcomeChatMessage()])
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    refreshSaved()
    refreshConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const websiteResult = useMemo(() => {
    if (websiteConcept && typeof websiteConcept === 'object') return websiteConcept
    return null
  }, [websiteConcept])

  const saveItem = ({ type, title, summary, payload }) => {
    apiFetch('/api/webenoxai/saved', { method: 'POST', body: JSON.stringify({ type, title, summary, payload }) })
      .then((data) => {
        if (data?.item) setSavedItems((prev) => [data.item, ...prev.filter((p) => p.id !== data.item.id)])
        showToast('Saved to Vault')
      })
      .catch(() => {
        const next = { id: `m_${Date.now()}`, type, title, summary, payload, createdAt: new Date().toISOString() }
        setSavedItems((prev) => [next, ...prev])
        showToast('Saved to Vault')
      })
  }

  const openVaultItem = (item) => {
    const t = String(item?.type || '')
    if (t === 'website') {
      setWebsiteConcept(item.payload || null)
      setWebsitePhase('result')
      setCreateMode('website')
      setRoute('create')
      return
    }
    if (t === 'logo') {
      setLogoResult(item.payload || null)
      setLogoPhase('result')
      setCreateMode('logo')
      setRoute('create')
      return
    }
    setRoute('home')
  }

  const runWebsite = () => {
    if (!websitePrompt.trim()) {
      showToast('Add a prompt first')
      return
    }
    setWebsiteError('')
    setWebsitePhase('loading')
    setWebsiteStep(-1)
    setWebsiteConcept(null)
    loadingTimerRef.current.ids.forEach((id) => window.clearTimeout(id))
    loadingTimerRef.current.ids = []
    stepsWebsite.forEach((_, idx) => {
      const id = window.setTimeout(() => setWebsiteStep(idx), 280 + idx * 360)
      loadingTimerRef.current.ids.push(id)
    })
    const done = window.setTimeout(async () => {
      try {
        const data = await apiFetch('/api/webenoxai/generate-website', { method: 'POST', body: JSON.stringify({ prompt: websitePrompt }) })
        if (data?.concept) {
          setWebsiteConcept(data.concept)
          setWebsitePhase('result')
          return
        }
        throw new Error('no_concept')
      } catch {
        setWebsitePhase('idle')
        setWebsiteError('Generation failed. Check API / network and try again.')
        showToast('Website generation failed')
      }
    }, 240 + stepsWebsite.length * 320 + 420)
    loadingTimerRef.current.ids.push(done)
  }

  const runLogo = () => {
    if (!logoPrompt.trim()) {
      showToast('Add a prompt first')
      return
    }
    setLogoError('')
    setLogoPhase('loading')
    setLogoStep(-1)
    setLogoResult(null)
    loadingTimerRef.current.ids.forEach((id) => window.clearTimeout(id))
    loadingTimerRef.current.ids = []
    stepsLogo.forEach((_, idx) => {
      const id = window.setTimeout(() => setLogoStep(idx), 260 + idx * 340)
      loadingTimerRef.current.ids.push(id)
    })
    const done = window.setTimeout(async () => {
      try {
        const data = await apiFetch('/api/webenoxai/create-logo', { method: 'POST', body: JSON.stringify({ prompt: logoPrompt }) })
        if (data?.logo) {
          setLogoResult(data.logo)
          setLogoPhase('result')
          return
        }
        throw new Error('no_logo')
      } catch {
        setLogoPhase('idle')
        setLogoError('Generation failed. Check API / network and try again.')
        showToast('Logo generation failed')
      }
    }, 220 + stepsLogo.length * 300 + 420)
    loadingTimerRef.current.ids.push(done)
  }

  // No prompt suggestions. User should ask freely.

  const sendChat = async (text) => {
    const value = (text ?? chatInput).trim()
    if (!value) return

    // Tools-as-chat commands (ChatGPT-style)
    if (value.startsWith('/website ')) {
      const p = value.replace('/website', '').trim()
      setWebsitePrompt(p || defaultWebsitePrompt)
      setWebsitePhase('idle')
      setWebsiteConcept(null)
      setWebsiteError('')
      setMessages((prev) => [...prev, { id: `u_${Date.now()}`, role: 'user', text: value }])
      setChatInput('')
      window.setTimeout(() => runWebsite(), 80)
      return
    }
    if (value.startsWith('/logo ')) {
      const p = value.replace('/logo', '').trim()
      setLogoPrompt(p || 'Luxury fitness brand')
      setLogoPhase('idle')
      setLogoResult(null)
      setLogoError('')
      setMessages((prev) => [...prev, { id: `u_${Date.now()}`, role: 'user', text: value }])
      setChatInput('')
      window.setTimeout(() => runLogo(), 80)
      return
    }

    const userMsg = { id: `u_${Date.now()}`, role: 'user', text: value }
    setMessages((prev) => [...prev, userMsg])
    setChatInput('')
    window.requestAnimationFrame(() => scrollChatToEnd('auto'))
    setIsTyping(true)
    try {
      const data = await apiFetch('/api/webenoxai/chat', {
        method: 'POST',
        body: JSON.stringify({ conversationId: conversationId || undefined, message: value })
      })
      if (data?.conversationId) setConversationId(data.conversationId)
      refreshConversations()
      const aiText = String(data?.message?.text || '').trim()
      if (!aiText) throw new Error('empty_ai')
      const id = `a_${Date.now()}`
      setMessages((prev) => prev.concat([{ id, role: 'ai', text: '' }]))
      setIsTyping(false)
      chatStickRef.current = true
      setChatStuck(true)
      window.requestAnimationFrame(() => scrollChatToEnd('auto'))
      startStream(id, aiText)
    } catch {
      showToast('Chat failed (API/network)')
    } finally {
      setIsTyping(false)
    }
  }

  const pageDirection = useMemo(() => {
    const prev = routeHistory[routeHistory.length - 2]
    if (!prev) return 1
    const order = ['chat', 'vault']
    const a = order.indexOf(prev)
    const b = order.indexOf(route)
    if (a === -1 || b === -1) return 1
    return b >= a ? 1 : -1
  }, [route, routeHistory])

  const pageMotion = useMemo(
    () => ({
      initial: { opacity: 0, x: 16 * pageDirection, y: 6, scale: 0.995 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x: -12 * pageDirection, y: -4, scale: 0.995 },
      transition: { type: 'spring', stiffness: 420, damping: 34, mass: 0.5 }
    }),
    [pageDirection]
  )

  const header = (
    <div className="relative z-10 px-4 pt-4 pb-3">
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex min-w-0 items-center -ml-3">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[156px] w-[156px] -translate-x-[72%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(185,51,255,0.42),transparent_58%),radial-gradient(circle_at_38%_58%,rgba(0,201,255,0.26),transparent_60%)] blur-2xl"
            aria-hidden
          />
          <div className="relative z-10 h-24 w-24 shrink-0 -ml-3">
            <img
              src="/images/WebenoxAI.png"
              alt="WebenoxAI"
              className="relative h-24 w-24 object-contain opacity-100 drop-shadow-[0_20px_46px_rgba(0,0,0,0.62)]"
              draggable={false}
              style={{ filter: 'contrast(1.14) saturate(1.2) brightness(1.12)' }}
            />
          </div>
          <div className="relative z-20 min-w-0 -ml-7 h-24 flex flex-col justify-center translate-x-[2px] -translate-y-[3.5px]">
            <div className="text-[14px] font-extrabold text-white/90 tracking-tight truncate leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              WebenoxAI
            </div>
            <div className="-mt-0.5 text-[10px] text-white/60 truncate leading-tight drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]">
              Premium assistant
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TinyPill tone="brand">{aiOnline ? 'ONLINE' : 'OFFLINE'}</TinyPill>
          <TinyPill>{aiMode}</TinyPill>
        </div>
      </div>
    </div>
  )

  return (
    <Screen>
      <div className="relative z-20 h-full w-full min-h-0 flex flex-col overflow-hidden">
        <Toast toast={toast} />
        {header}

        <div className="relative z-10 flex flex-1 min-h-0 flex-col overflow-hidden px-4 pb-3">
          <AnimatePresence mode="wait" initial={false}>
            {showIntro && (
              <MotionConfig reducedMotion="never">
                <motion.div
                  key="intro"
                  role="presentation"
                  className="absolute inset-0 z-30 overflow-hidden bg-[#05060c]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.06, filter: 'blur(14px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                <div className="pointer-events-none absolute inset-0">
                  <motion.div
                    className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-[100px]"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="absolute top-1/3 -left-40 h-72 w-72 rounded-full bg-cyan-400/18 blur-[90px]"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 1, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[110px]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1.05, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_0%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.92)_100%)]" />
                  <motion.div
                    className="absolute inset-0 opacity-[0.07]"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)'
                    }}
                  />
                  <motion.div
                    className="absolute inset-y-0 -left-1/4 w-1/2"
                    initial={{ x: '-30%', opacity: 0 }}
                    animate={{ x: ['-30%', '120%'], opacity: [0, 0.45, 0] }}
                    transition={{ duration: 1.35, ease: 'easeInOut', times: [0, 0.45, 1], delay: 0.35 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)'
                    }}
                  />
                  {[
                    { l: '14%', t: '22%', s: 2.0, o: 0.22, d: 0.0 },
                    { l: '78%', t: '18%', s: 1.6, o: 0.18, d: 0.15 },
                    { l: '66%', t: '64%', s: 2.2, o: 0.24, d: 0.25 },
                    { l: '22%', t: '72%', s: 1.4, o: 0.16, d: 0.35 },
                    { l: '48%', t: '34%', s: 1.8, o: 0.18, d: 0.45 },
                    { l: '86%', t: '78%', s: 1.5, o: 0.14, d: 0.55 },
                    { l: '10%', t: '52%', s: 1.2, o: 0.12, d: 0.6 },
                    { l: '56%', t: '84%', s: 2.1, o: 0.18, d: 0.7 }
                  ].map((p, idx) => (
                    <motion.span
                      key={`p_${idx}`}
                      className="absolute rounded-full bg-white"
                      style={{
                        left: p.l,
                        top: p.t,
                        width: `${p.s * 2}px`,
                        height: `${p.s * 2}px`,
                        opacity: p.o,
                        filter: 'blur(0.2px)'
                      }}
                      initial={{ y: 0, scale: 1, opacity: p.o }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [p.o * 0.55, p.o * 1.25, p.o * 0.55],
                        scale: [1, 1.15, 1]
                      }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: p.d + 0.2 }}
                    />
                  ))}
                </div>

                <motion.div
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-16 pt-10"
                  animate={{ y: [0, -6, 0], scale: [1, 1.006, 1] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="relative mb-8 flex h-28 w-28 items-center justify-center"
                    initial={{ scale: 0.2, opacity: 0, rotate: -12 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                      transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.85 }
                    }}
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(185,51,255,0.55),transparent_62%),radial-gradient(circle_at_35%_55%,rgba(0,201,255,0.35),transparent_65%)] blur-2xl"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.img
                      src="/images/WebenoxAI.png"
                      alt=""
                      className="relative h-24 w-24 object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
                      draggable={false}
                      style={{ filter: 'contrast(1.12) saturate(1.18) brightness(1.1)' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center text-center -translate-y-4"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } }
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
                        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
                      }}
                      className="text-[11px] font-extrabold uppercase tracking-[0.38em] text-fuchsia-200/70"
                    >
                      <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Welcome
                      </motion.span>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 28, scale: 0.92 },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { type: 'spring', stiffness: 320, damping: 24 }
                        }
                      }}
                      className="relative mt-3 bg-gradient-to-r from-white via-white to-fuchsia-100/90 bg-clip-text text-[26px] font-black tracking-tight text-transparent sm:text-[28px]"
                    >
                      <span className="relative z-10">WebenoxAI</span>
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-24 z-0 w-40 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] blur-[0.2px]"
                        animate={{ x: ['0%', '240%'] }}
                        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.65 }}
                      />
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                      }}
                      className="mt-1.5 max-w-[272px] text-[12px] leading-relaxed text-white/55"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {introStep === 0 && (
                          <motion.div
                            key="s0"
                            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          >
                            Open Chat and type below. Answers stream in as you go.
                          </motion.div>
                        )}
                        {introStep === 1 && (
                          <motion.div
                            key="s1"
                            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          >
                            Use tools in chat: <span className="text-white/75 font-semibold">/website</span> and{' '}
                            <span className="text-white/75 font-semibold">/logo</span>.
                          </motion.div>
                        )}
                        {introStep === 2 && (
                          <motion.div
                            key="s2"
                            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          >
                            Save anything important to your <span className="text-white/75 font-semibold">Vault</span>.
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="mt-2.5 flex items-center justify-center gap-2">
                        {[
                          { k: 0, label: 'Chat', hint: 'Ask' },
                          { k: 1, label: 'Tools', hint: '/website /logo' },
                          { k: 2, label: 'Vault', hint: 'Save' }
                        ].map((x) => {
                          const active = introStep === x.k
                          return (
                            <motion.div
                              key={x.k}
                              layout
                              className={cls(
                                'relative rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em]',
                                active
                                  ? 'border-fuchsia-200/25 bg-fuchsia-400/10 text-white/80'
                                  : 'border-white/10 bg-black/20 text-white/40'
                              )}
                              animate={active ? { y: [0, -2, 0], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 26px rgba(185,51,255,0.22)', '0 0 0 rgba(0,0,0,0)'] } : { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' }}
                              transition={{ duration: 0.9, ease: 'easeInOut' }}
                            >
                              <span className="relative z-10">{x.label}</span>
                              <span className="ml-2 text-white/35 font-bold tracking-normal normal-case">{x.hint}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-10 left-8 right-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.45 }}
                  >
                    <div className="mb-2 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/35">
                      <span>Boot sequence</span>
                      <span className="flex items-center gap-2 text-white/45">
                        <TypingDots />
                      </span>
                    </div>
                    <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                      />
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-40"
                        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                        transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                        style={{
                          backgroundImage:
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 38%, transparent 76%)',
                          backgroundSize: '140px 100%'
                        }}
                      />
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]"
                        animate={{ x: ['0%', '420%'], opacity: [0, 0.9, 0] }}
                        transition={{ duration: 1.25, ease: 'easeInOut', delay: 0.55 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
                </motion.div>
              </MotionConfig>
            )}
            {route === 'home' && (
              <motion.div key="home" {...pageMotion} className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="flex-1 min-h-0 overflow-auto pb-24 space-y-3">
                  <Surface className="p-4">
                    <SectionTitle overline="WELCOME" title="What do you want to build?" right={<TinyPill tone="brand">v2</TinyPill>} />
                    <div className="mt-3 text-[12px] text-white/60 leading-relaxed">
                      A clean workspace for ideas, planning, and fast iteration. Save important outputs to your Vault.
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <PrimaryButton
                        className="col-span-2"
                        onClick={() => {
                          setCreateMode('website')
                          setRoute('create')
                        }}
                      >
                        Start a Website Concept
                      </PrimaryButton>
                      <GhostButton
                        onClick={() => {
                          setCreateMode('logo')
                          setRoute('create')
                        }}
                        className="w-full py-3"
                      >
                        Create Logo Direction
                      </GhostButton>
                      <GhostButton onClick={() => setRoute('chat')} className="w-full py-3">
                        Open AI Chat
                      </GhostButton>
                    </div>
                  </Surface>

                  <Surface className="p-4">
                    <SectionTitle overline="RECENT" title="Your latest Vault items" right={<GhostButton onClick={() => setRoute('vault')}>View all</GhostButton>} />
                    <div className="mt-3 space-y-2">
                      {savedItems.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-black/20 px-4 py-4 text-[12px] text-white/60">
                          Nothing saved yet. Save anything important to your Vault and it will show up here.
                        </div>
                      ) : (
                        savedItems.slice(0, 3).map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => openVaultItem(c)}
                            className="w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-left hover:bg-white/[0.06] transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-[12px] font-extrabold text-white/85 line-clamp-1">{c.title}</div>
                                <div className="mt-1 text-[11px] text-white/55 line-clamp-1">{c.summary}</div>
                              </div>
                              <TinyPill>{String(c.type || 'saved')}</TinyPill>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </Surface>
                </div>
              </motion.div>
            )}

            {route === 'create' && (
              <motion.div key="create" {...pageMotion} className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div className="text-sm font-extrabold text-white/90">Create</div>
                  <GhostButton onClick={() => setRoute('home')}>Close</GhostButton>
                </div>

                <Surface className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCreateMode('website')}
                      className={cls(
                        'flex-1 rounded-2xl border px-3 py-2 text-[11px] font-extrabold transition-colors',
                        createMode === 'website' ? 'border-white/16 bg-white/[0.06] text-white/85' : 'border-white/10 bg-black/20 text-white/55'
                      )}
                    >
                      Website
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreateMode('logo')}
                      className={cls(
                        'flex-1 rounded-2xl border px-3 py-2 text-[11px] font-extrabold transition-colors',
                        createMode === 'logo' ? 'border-white/16 bg-white/[0.06] text-white/85' : 'border-white/10 bg-black/20 text-white/55'
                      )}
                    >
                      Logo
                    </button>
                  </div>
                </Surface>

                <div className="mt-3 flex-1 min-h-0 overflow-auto pb-24 space-y-3">
                  {createMode === 'website' && (
                    <>
                      <Surface className="p-4">
                        <SectionTitle overline="WEBSITE" title="Describe the business idea" />
                        <div className="mt-3 rounded-3xl border border-white/10 bg-black/20 px-3 py-3">
                          <textarea
                            value={websitePrompt}
                            onChange={(e) => setWebsitePrompt(e.target.value)}
                            rows={3}
                            className="w-full resize-none bg-transparent text-[12px] text-white/85 placeholder:text-white/35 outline-none"
                            placeholder="Describe your business idea…"
                          />
                        </div>
                        <div className="mt-3">
                          <PrimaryButton onClick={runWebsite} disabled={websitePhase === 'loading'}>
                            {websitePhase === 'loading' ? 'Generating…' : 'Generate Website Concept'}
                          </PrimaryButton>
                        </div>
                        {websiteError ? <div className="mt-3 text-[12px] text-rose-200/80">{websiteError}</div> : null}
                      </Surface>

                      {websitePhase === 'loading' && (
                        <Surface className="p-4">
                          <SectionTitle overline="ENGINE" title="Synthesizing structure" right={<TypingDots />} />
                          <div className="mt-3 space-y-2">
                            {stepsWebsite.map((s, idx) => {
                              const active = idx <= websiteStep
                              return (
                                <div
                                  key={s}
                                  className={cls(
                                    'rounded-2xl border px-3 py-2 text-[12px]',
                                    active ? 'border-white/16 bg-white/[0.06] text-white/80' : 'border-white/10 bg-black/20 text-white/45'
                                  )}
                                >
                                  {s}
                                </div>
                              )
                            })}
                          </div>
                        </Surface>
                      )}

                      {websitePhase === 'result' && (
                        <Surface className="p-4">
                          <SectionTitle overline="RESULT" title={websiteResult?.title || 'Website Concept'} right={<TinyPill tone="brand">Website</TinyPill>} />
                          <div className="mt-2 text-[12px] text-white/60">{websiteResult?.tagline || 'Generated concept preview'}</div>

                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <ResultCard title="Sections">
                              <div className="space-y-2">
                                {(websiteResult?.sections || []).slice(0, 6).map((s) => (
                                  <div key={s} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/75">
                                    {s}
                                  </div>
                                ))}
                              </div>
                            </ResultCard>
                            <ResultCard title="Features">
                              <div className="space-y-2">
                                {(websiteResult?.features || []).slice(0, 6).map((s) => (
                                  <div key={s} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/75">
                                    {s}
                                  </div>
                                ))}
                              </div>
                            </ResultCard>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <ResultCard title="CTAs">
                              <div className="space-y-2">
                                {(websiteResult?.ctas || []).slice(0, 5).map((s) => (
                                  <div key={s} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/75">
                                    {s}
                                  </div>
                                ))}
                              </div>
                            </ResultCard>
                            <ResultCard title="Stack">
                              <div className="text-[12px] text-white/75">{websiteResult?.stack}</div>
                            </ResultCard>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <GhostButton
                              onClick={() => {
                                setWebsitePhase('idle')
                                setWebsiteStep(-1)
                                setWebsiteConcept(null)
                              }}
                              className="py-3 w-full"
                            >
                              New
                            </GhostButton>
                            <PrimaryButton
                              onClick={() => {
                                saveItem({
                                  type: 'website',
                                  title: websiteResult?.title || 'Website Concept',
                                  summary: websitePrompt.trim(),
                                  payload: websiteResult
                                })
                                setRoute('vault')
                              }}
                              className="py-3"
                            >
                              Save to Vault
                            </PrimaryButton>
                          </div>
                        </Surface>
                      )}
                    </>
                  )}

                  {createMode === 'logo' && (
                    <>
                      <Surface className="p-4">
                        <SectionTitle overline="LOGO" title="Describe the brand" />
                        <div className="mt-3 rounded-3xl border border-white/10 bg-black/20 px-3 py-2">
                          <input
                            value={logoPrompt}
                            onChange={(e) => setLogoPrompt(e.target.value)}
                            className="w-full bg-transparent text-[12px] text-white/85 placeholder:text-white/35 outline-none"
                            placeholder="Luxury fitness brand"
                          />
                        </div>
                        <div className="mt-3">
                          <PrimaryButton onClick={runLogo} disabled={logoPhase === 'loading'}>
                            {logoPhase === 'loading' ? 'Generating…' : 'Generate Logo Direction'}
                          </PrimaryButton>
                        </div>
                        {logoError ? <div className="mt-3 text-[12px] text-rose-200/80">{logoError}</div> : null}
                      </Surface>

                      {logoPhase === 'loading' && (
                        <Surface className="p-4">
                          <SectionTitle overline="ENGINE" title="Synthesizing identity" right={<TypingDots />} />
                          <div className="mt-3 space-y-2">
                            {stepsLogo.map((s, idx) => {
                              const active = idx <= logoStep
                              return (
                                <div
                                  key={s}
                                  className={cls(
                                    'rounded-2xl border px-3 py-2 text-[12px]',
                                    active ? 'border-white/16 bg-white/[0.06] text-white/80' : 'border-white/10 bg-black/20 text-white/45'
                                  )}
                                >
                                  {s}
                                </div>
                              )
                            })}
                          </div>
                        </Surface>
                      )}

                      {logoPhase === 'result' && (
                        <Surface className="p-4">
                          <SectionTitle overline="RESULT" title={logoResult?.title || 'Logo Direction'} right={<TinyPill tone="brand">Logo</TinyPill>} />
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <ResultCard title="Typography">
                              <div className="text-[12px] font-extrabold text-white/80">{logoResult?.typography || 'Modern grotesk + tight tracking'}</div>
                            </ResultCard>
                            <ResultCard title="Keywords">
                              <div className="text-[11px] text-white/70">{(logoResult?.keywords || ['Luxury', 'Performance', 'Minimal']).join(', ')}</div>
                            </ResultCard>
                          </div>
                          <div className="mt-3">
                            <ResultCard title="Directions">
                              <div className="space-y-2">
                                {(logoResult?.directions || ['Monogram + sharp geometry', 'Icon + wordmark lockup', 'Glow accent outline'])
                                  .slice(0, 7)
                                  .map((d) => (
                                    <div key={d} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/75">
                                      {d}
                                    </div>
                                  ))}
                              </div>
                            </ResultCard>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <GhostButton
                              onClick={() => {
                                setLogoPhase('idle')
                                setLogoStep(-1)
                                setLogoResult(null)
                              }}
                              className="py-3 w-full"
                            >
                              New
                            </GhostButton>
                            <PrimaryButton
                              onClick={() => {
                                saveItem({
                                  type: 'logo',
                                  title: logoResult?.title || 'Logo Direction',
                                  summary: logoPrompt.trim(),
                                  payload: logoResult || { prompt: logoPrompt }
                                })
                                setRoute('vault')
                              }}
                              className="py-3"
                            >
                              Save to Vault
                            </PrimaryButton>
                          </div>
                        </Surface>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {route === 'chat' && (
              <motion.div key="chat" {...pageMotion} className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="flex shrink-0 items-center justify-between gap-3 pb-2">
                  <div className="text-sm font-extrabold text-white/90 ml-3">Chat</div>
                  <div className="flex items-center gap-2">
                    <GhostButton
                      onClick={() => {
                        refreshConversations()
                        setThreadsOpen(true)
                      }}
                    >
                      Threads
                    </GhostButton>
                    <GhostButton
                      onClick={() => {
                        setConversationId('')
                        setMessages([welcomeChatMessage()])
                        showToast('New chat started')
                      }}
                    >
                      New
                    </GhostButton>
                  </div>
                </div>

                <Surface className="flex-1 min-h-0 overflow-hidden">
                  <div
                    ref={chatScrollRef}
                    onScroll={updateChatStickiness}
                    className="webenoxai-chat-scroll h-full min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-4 pb-6 space-y-3 scroll-smooth touch-pan-y [-webkit-overflow-scrolling:touch]"
                  >
                    {messages.map((m) => (
                      <div key={m.id} className={cls('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                        <div
                          className={cls(
                            'max-w-[85%] rounded-3xl border px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-line',
                            m.role === 'user' ? 'border-white/14 bg-white/[0.06] text-white/85' : 'border-white/10 bg-black/20 text-white/75'
                          )}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="rounded-3xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-[12px] text-white/70">
                          <TypingDots />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </Surface>

                <div className="shrink-0 pt-3">
                  <Surface className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') sendChat()
                        }}
                        className="min-w-0 flex-1 bg-transparent text-[12px] text-white/85 placeholder:text-white/35 outline-none"
                        placeholder="Ask whatever you need…"
                      />
                      <button
                        type="button"
                        onClick={() => sendChat()}
                        className="h-9 w-9 rounded-2xl bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 text-background"
                        aria-label="Send message"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 mx-auto">
                          <path d="M5 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </Surface>
                </div>

                <AnimatePresence>
                  {!chatStuck && (
                    <motion.button
                      type="button"
                      onClick={() => {
                        chatStickRef.current = true
                        setChatStuck(true)
                        scrollChatToEnd('smooth')
                      }}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute bottom-[108px] right-4 z-20 rounded-full border border-white/12 bg-black/50 px-3.5 py-2 text-[11px] font-extrabold text-white/80 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.9)] backdrop-blur-md"
                      aria-label="Scroll to latest"
                    >
                      Latest
                    </motion.button>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isThreadsOpen && (
                    <motion.div
                      key="threads"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30"
                    >
                      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setThreadsOpen(false)} />
                      <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 18, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute inset-x-0 bottom-0 p-5"
                      >
                        <Surface className="p-4">
                          <SectionTitle overline="THREADS" title="Conversations" right={<GhostButton onClick={() => setThreadsOpen(false)}>Close</GhostButton>} />
                          <div className="webenoxai-chat-scroll mt-3 max-h-[46vh] space-y-2 overflow-y-auto overflow-x-hidden overscroll-contain pr-1">
                            {conversations.length === 0 ? (
                              <div className="rounded-3xl border border-white/10 bg-black/20 px-4 py-4 text-[12px] text-white/60">
                                No conversations yet.
                              </div>
                            ) : (
                              conversations.map((c) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => {
                                    loadConversation(c.id)
                                    setThreadsOpen(false)
                                  }}
                                  className={cls(
                                    'w-full rounded-3xl border px-4 py-3 text-left transition-colors',
                                    c.id === conversationId ? 'border-white/18 bg-white/[0.06]' : 'border-white/10 bg-black/20 hover:bg-white/[0.06]'
                                  )}
                                >
                                  <div className="text-[12px] font-extrabold text-white/85 line-clamp-1">{c.title || 'Conversation'}</div>
                                  <div className="mt-1 text-[11px] text-white/55">Updated: {new Date(c.updatedAt).toLocaleString()}</div>
                                </button>
                              ))
                            )}
                          </div>
                        </Surface>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {route === 'vault' && (
              <motion.div key="vault" {...pageMotion} className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div className="text-sm font-extrabold text-white/90">Vault</div>
                  <GhostButton onClick={() => setRoute('home')}>Close</GhostButton>
                </div>

                <Surface className="flex-1 min-h-0 overflow-hidden">
                  <div className="h-full min-h-0 overflow-auto p-4 space-y-3">
                    {savedItems.length === 0 ? (
                      <div className="rounded-3xl border border-white/10 bg-black/20 px-4 py-4 text-[12px] text-white/60">
                        Your Vault is empty. Save a Website or Logo result to keep it here.
                      </div>
                    ) : (
                      savedItems.map((c) => (
                        <div key={c.id} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                          <button type="button" onClick={() => openVaultItem(c)} className="w-full text-left">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-[12px] font-extrabold text-white/85">{c.title}</div>
                                <div className="mt-1 text-[11px] text-white/55 line-clamp-2">{c.summary}</div>
                              </div>
                              <TinyPill>{String(c.type || 'saved')}</TinyPill>
                            </div>
                          </button>
                          <div className="mt-3 flex justify-end">
                            <GhostButton
                              onClick={() => {
                                apiFetch(`/api/webenoxai/saved/${c.id}`, { method: 'DELETE', headers: {} })
                                  .then(() => setSavedItems((prev) => prev.filter((x) => x.id !== c.id)))
                                  .catch(() => setSavedItems((prev) => prev.filter((x) => x.id !== c.id)))
                              }}
                            >
                              Delete
                            </GhostButton>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Surface>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10 px-4 pb-4">
          <div className="rounded-3xl border border-white/12 bg-black/40 backdrop-blur-xl px-2 py-2 shadow-[0_22px_70px_-50px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between gap-2">
              <TabButton active={route === 'chat'} icon={Icon.Chat} label="Chat" onClick={() => setRoute('chat')} />
              <TabButton active={route === 'vault'} icon={Icon.Brain} label="Vault" onClick={() => setRoute('vault')} />
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

