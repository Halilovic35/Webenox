import { motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'

/** SVG flags: emoji regional flags render as “US”/“DE” text on many Windows setups */
const FlagUS = ({ className }) => (
  <svg className={className} viewBox="0 0 21 14" aria-hidden>
    <rect width="21" height="14" fill="#B22234" />
    <path
      fill="#fff"
      d="M0 0h21v1H0zm0 2h21v1H0zm0 2h21v1H0zm0 2h21v1H0zm0 2h21v1H0zm0 2h21v1H0zm0 2h21v1H0z"
    />
    <rect width="9" height="7.5" fill="#3C3B6E" />
    <path
      fill="#fff"
      d="M1.1 1.2h1.1v1H1.1zm2.2 0h1.1v1H3.3zm2.2 0h1.1v1H5.5zm2.2 0h1.1v1H7.7zm-5.5 1.8h1.1v1H2.2zm2.2 0h1.1v1H4.4zm2.2 0h1.1v1H6.6zm2.2 0h1.1v1H8.8zm-7.7 1.8h1.1v1H1.1zm2.2 0h1.1v1H3.3zm2.2 0h1.1v1H5.5zm2.2 0h1.1v1H7.7zm-5.5 1.8h1.1v1H2.2zm2.2 0h1.1v1H4.4zm2.2 0h1.1v1H6.6zm2.2 0h1.1v1H8.8zm-7.7 1.8h1.1v1H1.1zm2.2 0h1.1v1H3.3zm2.2 0h1.1v1H5.5zm2.2 0h1.1v1H7.7z"
      opacity={0.95}
    />
  </svg>
)

const FlagDE = ({ className }) => (
  <svg className={className} viewBox="0 0 21 14" aria-hidden>
    <rect width="21" height="4.67" y="0" fill="#000" />
    <rect width="21" height="4.67" y="4.67" fill="#DD0000" />
    <rect width="21" height="4.66" y="9.34" fill="#FFCE00" />
  </svg>
)

const PANEL_W = 168
const PANEL_EST_H = 96
const FLOAT_Z = 200

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [float, setFloat] = useState(null)
  const anchorRef = useRef(null)
  const panelRef = useRef(null)
  const { language, changeLanguage } = useLanguage()

  const languages = [
    { code: 'en', label: 'EN', name: 'English', Flag: FlagUS },
    { code: 'de', label: 'DE', name: 'Deutsch', Flag: FlagDE }
  ]

  const measure = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    let left = r.left + r.width / 2 - PANEL_W / 2
    const pad = 8
    left = Math.max(pad, Math.min(left, window.innerWidth - PANEL_W - pad))
    const spaceBelow = window.innerHeight - r.bottom
    const spaceAbove = r.top
    /** Tailwind `md` — slightly larger gap under trigger on desktop so the panel clears the button visually */
    const edgeGap =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches ? 14 : 8
    const placeAbove = spaceBelow < PANEL_EST_H + edgeGap + 4 && spaceAbove > spaceBelow
    const top = placeAbove ? r.top - PANEL_EST_H - edgeGap : r.bottom + edgeGap
    setFloat({ top, left, placeAbove })
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) {
      setFloat(null)
      return
    }
    measure()
    window.addEventListener('scroll', measure, true)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure, true)
      window.removeEventListener('resize', measure)
    }
  }, [isOpen, measure])

  useEffect(() => {
    if (!isOpen) return
    const onDoc = (e) => {
      const t = e.target
      if (anchorRef.current?.contains(t)) return
      if (panelRef.current?.contains(t)) return
      setIsOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const handleLanguageChange = (lang) => {
    changeLanguage(lang.code)
    setIsOpen(false)
  }

  const currentLang = languages.find((lang) => lang.code === language)
  const CurrentFlag = currentLang?.Flag ?? FlagUS

  const portal =
    isOpen && float && typeof document !== 'undefined'
      ? createPortal(
          <motion.div
            ref={panelRef}
            role="listbox"
            aria-label="Choose language"
            initial={{ opacity: 0, y: float.placeAbove ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: float.top,
              left: float.left,
              width: PANEL_W,
              zIndex: FLOAT_Z,
              transformOrigin: float.placeAbove ? 'bottom center' : 'top center'
            }}
            className="overflow-hidden rounded-lg border border-white/20 bg-[#0f0f0f]/98 shadow-2xl backdrop-blur-xl"
          >
            {languages.map((lang, index) => {
              const F = lang.Flag
              return (
                <motion.button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={language === lang.code}
                  onClick={() => handleLanguageChange(lang)}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className={`flex w-full items-center gap-2 px-2.5 py-2.5 text-left transition-colors duration-200 sm:gap-2.5 sm:px-3 sm:py-2.5 ${
                    language === lang.code ? 'bg-accent/10 text-accent' : 'text-text hover:text-accent'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.04 }}
                >
                  <span className="flex h-[1.125rem] w-6 shrink-0 overflow-hidden rounded-sm shadow-sm ring-1 ring-white/15 sm:w-7">
                    <F className="h-full w-full" />
                  </span>
                  <span className="w-5 shrink-0 text-center text-[10px] font-semibold tracking-wide tabular-nums text-current opacity-80 sm:w-6 sm:text-[11px]">
                    {lang.label}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-medium sm:text-[13px]">{lang.name}</span>
                  {language === lang.code && (
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:h-2 sm:w-2" />
                  )}
                </motion.button>
              )
            })}
          </motion.div>,
          document.body
        )
      : null

  return (
    <>
      <div className="relative inline-flex" ref={anchorRef}>
        <motion.button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={currentLang ? `Language: ${currentLang.name}` : 'Choose language'}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-2 px-2.5 py-2 sm:px-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-50 hover:bg-white/15 transition-all duration-200"
        >
          <span className="flex h-[1.125rem] w-7 shrink-0 overflow-hidden rounded-sm shadow-sm ring-1 ring-white/20">
            <CurrentFlag className="h-full w-full" />
          </span>
          {currentLang?.label ? (
            <span className="min-w-[1.5rem] text-center text-[11px] font-semibold tracking-wide text-slate-200/95 tabular-nums sm:text-xs">
              {currentLang.label}
            </span>
          ) : null}
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </div>
      {portal}
    </>
  )
}

export default LanguageSwitcher
