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
    { name: t('testimonials'), action: () => scrollToSection('testimonials') },
    { name: t('contact'), action: () => scrollToSection('contact') }
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
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-3"
          >
            <img 
              src="/images/wlogo.png" 
              alt="Webenox Logo" 
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <span className="text-lg lg:text-xl font-bold text-text">Webenox</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={item.action}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                whileHover={{ 
                  y: -2,
                  color: '#00C9FF',
                  transition: { duration: 0.15 }
                }}
                className="text-secondary hover:text-accent transition-all duration-200 font-medium text-sm lg:text-base relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-purple transition-all duration-200 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* CTA Button and Controls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="hidden lg:flex items-center space-x-4"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 201, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-gradient-to-r from-accent to-purple text-background font-semibold px-6 py-2 lg:px-8 lg:py-3 rounded-lg hover:from-accent/90 hover:to-purple/90 transition-all duration-200 shadow-lg hover:shadow-glow-lg"
            >
              {t('getStarted')}
            </motion.button>
            <LanguageSwitcher />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
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
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-white/10 mt-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={item.action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5, color: '#00C9FF' }}
                transition={{ duration: 0.15 }}
                className="block w-full text-left text-secondary hover:text-accent transition-all duration-200 font-medium py-2 px-4 rounded-lg hover:bg-white/5"
              >
                {item.name}
              </motion.button>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <LanguageSwitcher />
              <motion.button
                onClick={() => scrollToSection('contact')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-accent to-purple text-background font-semibold py-3 px-4 rounded-lg hover:from-accent/90 hover:to-purple/90 transition-all duration-200"
              >
                {t('getStarted')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navigation 