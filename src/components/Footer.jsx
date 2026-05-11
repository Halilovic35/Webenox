import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <footer className="relative overflow-hidden min-w-0">
      {/* Horizontal divider */}
      <div className="border-t border-white/10" />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-purple/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 py-12 sm:py-14 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 min-w-0 sm:gap-11 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-12 items-start"
        >
          {/* Logo and Mission - Fixed Alignment */}
          <motion.div variants={itemVariants} className="footer-align min-w-0 w-full md:max-lg:max-w-none">
            {/* Logo and company name aligned with other headings */}
            <div className="mb-5 flex items-center sm:mb-6">
              <img 
                src="/images/wlogo.png" 
                alt="Webenox Logo" 
                className="mr-3 h-8 w-8 shrink-0"
              />
              <span className="text-lg font-bold text-text sm:text-xl">Webenox</span>
            </div>
            <p className="paragraph mb-0 max-w-none text-pretty text-sm leading-relaxed sm:mb-2 sm:text-base lg:max-w-md lg:text-lg">
              {t('weBuildText')}
            </p>
          </motion.div>

          {/* Quick Links - Aligned and Faster Hover */}
          <motion.div variants={itemVariants} className="footer-align min-w-0 w-full">
            <h3 className="mb-4 text-lg font-bold text-text sm:mb-5 sm:text-xl">{t('quickLinks')}</h3>
            <div className="grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-3 sm:max-w-none sm:gap-4">
              <motion.button
                onClick={scrollToTop}
                whileHover={{ x: 3, color: '#00C9FF' }}
                transition={{ duration: 0.15 }}
                className="footer-link block text-left text-sm sm:text-base"
              >
                {t('home')}
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ x: 3, color: '#00C9FF' }}
                transition={{ duration: 0.15 }}
                className="footer-link block text-left text-sm sm:text-base"
              >
                {t('about')}
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ x: 3, color: '#00C9FF' }}
                transition={{ duration: 0.15 }}
                className="footer-link block text-left text-sm sm:text-base"
              >
                {t('services')}
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('site-contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ x: 3, color: '#00C9FF' }}
                transition={{ duration: 0.15 }}
                className="footer-link block text-left text-sm sm:text-base"
              >
                {t('contact')}
              </motion.button>
            </div>
          </motion.div>

          {/* Newsletter: sign-up not live yet */}
          <motion.div variants={itemVariants} className="footer-align min-w-0 w-full">
            <h3 className="mb-4 text-lg font-bold text-text sm:mb-5 sm:text-xl">{t('newsletter')}</h3>
            <p className="paragraph mb-4 text-sm sm:text-base">
              {t('newsletterText')}
            </p>
            <div
              className="inline-flex w-full max-w-md items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center sm:max-w-none sm:justify-start"
              role="status"
              aria-live="polite"
            >
              <span className="text-sm font-semibold tracking-wide text-accent sm:text-base">
                {t('newsletterComingSoon')}
              </span>
            </div>
          </motion.div>

          {/* Social Media with Enhanced Hover Effects - Aligned */}
          <motion.div variants={itemVariants} className="footer-align min-w-0 w-full">
            <h3 className="mb-4 text-lg font-bold text-text sm:mb-5 sm:text-xl">{t('connect')}</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <motion.a
                href="#"
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  boxShadow: "0 10px 20px rgba(0, 201, 255, 0.4)",
                  backgroundColor: "rgba(0, 201, 255, 0.1)"
                }}
                transition={{ duration: 0.15 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-purple text-background shadow-lg transition-all duration-200 hover:from-accent/90 hover:to-purple/90 hover:shadow-glow-lg sm:h-12 sm:w-12"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  boxShadow: "0 10px 20px rgba(0, 201, 255, 0.4)",
                  backgroundColor: "rgba(0, 201, 255, 0.1)"
                }}
                transition={{ duration: 0.15 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-purple text-background shadow-lg transition-all duration-200 hover:from-accent/90 hover:to-purple/90 hover:shadow-glow-lg sm:h-12 sm:w-12"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  boxShadow: "0 10px 20px rgba(0, 201, 255, 0.4)",
                  backgroundColor: "rgba(0, 201, 255, 0.1)"
                }}
                transition={{ duration: 0.15 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-purple text-background shadow-lg transition-all duration-200 hover:from-accent/90 hover:to-purple/90 hover:shadow-glow-lg sm:h-12 sm:w-12"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright and Legal Links - Better Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8"
        >
          <div className="flex min-w-0 flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-center text-sm text-secondary text-pretty sm:min-w-0 sm:flex-1 sm:text-left">
              {t('allRightsReserved')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:shrink-0 sm:justify-end">
              <Link
                to="/impressum"
                className="text-sm text-secondary transition-all duration-200 hover:text-accent"
              >
                {t('imprint')}
              </Link>
              <Link 
                to="/datenschutz"
                className="text-sm text-secondary transition-all duration-200 hover:text-accent"
              >
                {t('privacyPolicy')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 