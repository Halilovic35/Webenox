import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { name: t('home'), action: () => scrollToSection('hero') },
    { name: t('about'), action: () => scrollToSection('about') },
    { name: t('services'), action: () => scrollToSection('services') },
    { name: t('portfolio'), action: () => scrollToSection('portfolio') },
    { name: t('contact'), action: () => scrollToSection('site-contact') }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-start h-16 lg:h-20 w-full">
          {/* Left: logo */}
          <div 
            className="flex items-center space-x-3 transition-transform duration-150 hover:scale-105 cursor-pointer flex-shrink-0 lg:w-48 lg:min-w-[12rem]" 
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src="/images/wlogo.png" 
              alt="Webenox Logo" 
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <span className="text-lg lg:text-xl font-bold text-text">Webenox</span>
          </div>

          {/* Center: nav links (truly centered) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={item.action}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="text-secondary hover:text-accent transition-colors duration-150 font-medium text-sm lg:text-base relative group hover:-translate-y-0.5"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-purple transition-all duration-200 group-hover:w-full"></span>
              </motion.button>
            ))}
            </div>
          </div>

          {/* Right: CTA + language (same width as left for symmetry) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="hidden lg:flex items-center justify-end w-48 min-w-[12rem] flex-shrink-0 space-x-3"
          >
            <button
              onClick={() => scrollToSection('site-contact')}
              className="bg-gradient-to-r from-accent to-purple text-background font-semibold px-6 py-2 lg:px-8 lg:py-3 rounded-lg hover:from-accent/90 hover:to-purple/90 transition-all duration-150 shadow-lg hover:shadow-glow-lg hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
            >
              {t('getStarted')}
            </button>
            <LanguageSwitcher />
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-transform duration-150 active:scale-95"
          >
            <svg 
              className="w-6 h-6 text-text" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (dropdown panel under nav) */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="lg:hidden overflow-hidden"
        >
          <div className="mt-3 rounded-2xl border border-white/10 bg-background/95/90 backdrop-blur-xl shadow-xl">
            <div className="py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={item.action}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : -6 }}
                  transition={{ duration: 0.2, delay: 0.05 + index * 0.03 }}
                  className="block w-full text-left text-sm font-medium text-slate-100 py-2 px-4 hover:bg-white/5 hover:text-accent transition-all duration-150"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <LanguageSwitcher />
              <button
                onClick={() => scrollToSection('site-contact')}
                className="bg-gradient-to-r from-accent to-purple text-background font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-glow-lg hover:from-accent/90 hover:to-purple/90 transition-all duration-150 text-xs"
              >
                {t('getStarted')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navigation 