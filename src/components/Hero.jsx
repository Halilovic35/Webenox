import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import AccentUnderline from './AccentUnderline'

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
    document.getElementById('site-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="main-hero min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
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
          className="mb-10 sm:mb-12"
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
              animate={{ rotateY: 720 }}
              transition={{ duration: 2.4, delay: 0.6, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Title with slide up animation - FASTER */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="heading-1 text-text mb-3 sm:mb-4 tracking-tight"
        >
          <AccentUnderline mode="load" delay={0.65} bottom="0.14em">
            <span className="gradient-text">Webenox</span>
          </AccentUnderline>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-xl sm:text-3xl lg:text-4xl text-secondary mb-6 sm:mb-8 font-light"
        >
          {t('premiumDigitalAgency')}
        </motion.h2>

        {/* Typewriter effect subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <div className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-secondary max-w-4xl mx-auto leading-relaxed font-light min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center">
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
          className="mb-14 sm:mb-20"
        >
          <button
            onClick={scrollToContact}
            className="hero-cta-btn cta-button glow-effect bg-gradient-to-r from-accent to-purple text-background font-bold text-base sm:text-lg px-9 py-3 sm:px-12 sm:py-4 rounded-xl hover:from-accent/90 hover:to-purple/90 relative overflow-visible group transition-all duration-100 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">{t('letsWorkTogether')}</span>
            {/* Shine overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple opacity-0 group-hover:opacity-25 rounded-xl transition-opacity duration-100" style={{ willChange: 'opacity' }}></div>
          </button>
        </motion.div>

        {/* Services showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-10 sm:mb-16"
        >
          <p className="text-secondary text-xs sm:text-sm mb-4 sm:mb-6">{t('ourCoreServices')}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 opacity-70">
            {['Web Development', 'UI/UX Design', 'Mobile Apps', 'Branding', 'SEO'].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="text-secondary font-semibold text-sm sm:text-base"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 