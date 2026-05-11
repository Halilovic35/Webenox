import { motion } from 'framer-motion'
import { useState } from 'react'
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

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, changeLanguage } = useLanguage()

  const languages = [
    { code: 'en', label: 'EN', name: 'English', Flag: FlagUS },
    { code: 'de', label: 'DE', name: 'Deutsch', Flag: FlagDE }
  ]

  const handleLanguageChange = (lang) => {
    changeLanguage(lang.code)
    setIsOpen(false)
  }

  const currentLang = languages.find((lang) => lang.code === language)
  const CurrentFlag = currentLang?.Flag ?? FlagUS

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
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

      {/* Static wrapper: Framer `transform` on the panel would override Tailwind `-translate-x-1/2` */}
      <div className="pointer-events-none absolute left-1/2 top-full z-[60] mt-[14px] -translate-x-1/2 sm:mt-4">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -10,
            scale: isOpen ? 1 : 0.95
          }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: 'top center' }}
          className={`w-max min-w-[8.75rem] max-w-[9.75rem] overflow-hidden rounded-lg border border-white/20 bg-background/98 shadow-xl backdrop-blur-xl sm:min-w-[9rem] sm:max-w-[10rem] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {languages.map((lang, index) => {
            const F = lang.Flag
            return (
              <motion.button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className={`flex w-full items-center gap-2 px-2.5 py-2.5 text-left transition-colors duration-200 sm:gap-2.5 sm:px-3 sm:py-2.5 ${
                  language === lang.code ? 'bg-accent/10 text-accent' : 'text-text hover:text-accent'
                }`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <span className="flex h-[1.125rem] w-6 shrink-0 overflow-hidden rounded-sm shadow-sm ring-1 ring-white/15 sm:w-7">
                  <F className="h-full w-full" />
                </span>
                <span className="w-5 shrink-0 text-center text-[10px] font-semibold tracking-wide tabular-nums text-current opacity-80 sm:w-6 sm:text-[11px]">
                  {lang.label}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-medium sm:text-[13px]">{lang.name}</span>
                {language === lang.code && (
                  <motion.div layoutId="activeIndicator" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:h-2 sm:w-2" />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
