import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useLanguage()

  const typewriterTexts = t('typewriterTexts')

  useEffect(() => {
    const currentFullText = typewriterTexts[currentIndex]
    
    if (!isDeleting) {
      if (currentText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setIsDeleting(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % typewriterTexts.length)
      }
    }
  }, [currentText, currentIndex, isDeleting, typewriterTexts])

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 lg:pt-20">
      {/* Interactive Particle Background */}
      <div className="absolute inset-0">
        {/* Main animated gradient background */}
        <div className="absolute inset-0 animated-gradient opacity-30"></div>
        
        {/* Glowing circular background behind logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/40 to-purple/40 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Additional background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple/12 rounded-full blur-2xl"></div>
        
        {/* Animated floating elements - FASTER */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/8 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-purple/12 rounded-full blur-lg"
        />
      </div>

      <div className="container-custom text-center relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Logo with 3D animation - FASTER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              scale: { duration: 0.6, ease: "easeOut" },
              opacity: { duration: 0.6, ease: "easeOut" }
            }}
            className="inline-block mb-8 relative logo-animation"
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
          >
            {/* Enhanced glowing background behind logo */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent/40 to-purple/40 rounded-full blur-2xl scale-150 animate-pulse-slow"></div>
            
            <motion.img 
              src="/images/wlogo.png" 
              alt="Webenox Logo" 
              className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto drop-shadow-2xl"
              loading="eager"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, delay: 0.6, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Title with slide up animation - FASTER */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="heading-1 text-text mb-4 tracking-tight"
        >
          <span className="gradient-text">Webenox</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl lg:text-4xl text-secondary mb-8 font-light"
        >
          {t('premiumDigitalAgency')}
        </motion.h2>

        {/* Typewriter effect subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-secondary max-w-4xl mx-auto leading-relaxed font-light min-h-[4rem] flex items-center justify-center">
            <span className="text-accent">{currentText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-accent ml-1"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Enhanced CTA Button with pulsing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0, 201, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 201, 255, 0.7)",
                "0 0 0 20px rgba(0, 201, 255, 0)",
                "0 0 0 0 rgba(0, 201, 255, 0)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }
            }}
            className="cta-button glow-effect bg-gradient-to-r from-accent to-purple text-background font-bold text-lg sm:text-xl px-12 py-4 sm:px-16 sm:py-5 rounded-xl hover:from-accent/90 hover:to-purple/90 transition-all duration-200 shadow-lg hover:shadow-glow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">{t('letsWorkTogether')}</span>
            {/* Enhanced glowing effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-xl"></div>
          </motion.button>
        </motion.div>

        {/* Services showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <p className="text-secondary text-sm mb-6">{t('ourCoreServices')}</p>
          <div className="flex justify-center items-center space-x-6 opacity-70">
            {['Web Development', 'UI/UX Design', 'Mobile Apps', 'Branding', 'SEO'].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="text-secondary font-semibold text-lg"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Perfectly centered scroll down arrow with proper spacing - FASTER */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ 
              scale: 1.1,
              y: 0,
              transition: { duration: 0.15 }
            }}
            className="text-accent hover:text-purple transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            aria-label="Scroll to about section"
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 