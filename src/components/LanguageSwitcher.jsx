import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, changeLanguage } = useLanguage()

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' }
  ]

  const handleLanguageChange = (lang) => {
    const newLanguage = lang.code === 'EN' ? 'en' : 'de'
    changeLanguage(newLanguage)
    setIsOpen(false)
  }

  const currentLang = languages.find(lang => 
    (lang.code === 'EN' && language === 'en') || 
    (lang.code === 'DE' && language === 'de')
  )

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-slate-50 hover:bg-white/15 transition-all duration-200"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium">{currentLang?.code}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          scale: isOpen ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full right-0 mt-2 bg-background/98 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl overflow-hidden min-w-[10rem] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            onClick={() => handleLanguageChange(lang)}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            className={`flex items-center space-x-3 px-4 py-3 w-full text-left transition-colors duration-200 ${
              currentLang?.code === lang.code ? 'bg-accent/10 text-accent' : 'text-text hover:text-accent'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
            {currentLang?.code === lang.code && (
              <motion.div
                layoutId="activeIndicator"
                className="w-2 h-2 bg-accent rounded-full"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default LanguageSwitcher 