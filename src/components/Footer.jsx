import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  useEffect(() => {
    if (!comingSoonOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setComingSoonOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [comingSoonOpen])

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
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ x: 3, color: '#00C9FF' }}
                transition={{ duration: 0.15 }}
                className="footer-link block text-left text-sm sm:text-base"
              >
                {t('portfolio')}
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

          {/* Connect: Instagram & LinkedIn (coming soon) + mail */}
          <motion.div variants={itemVariants} className="footer-align min-w-0 w-full">
            <h3 className="mb-4 text-lg font-bold text-text sm:mb-5 sm:text-xl">{t('connect')}</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <motion.button
                type="button"
                onClick={() => setComingSoonOpen(true)}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  boxShadow: '0 10px 20px rgba(0, 201, 255, 0.4)',
                  backgroundColor: 'rgba(0, 201, 255, 0.1)'
                }}
                transition={{ duration: 0.15 }}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-accent to-purple text-background shadow-lg transition-all duration-200 hover:from-accent/90 hover:to-purple/90 hover:shadow-glow-lg sm:h-12 sm:w-12"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setComingSoonOpen(true)}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  boxShadow: '0 10px 20px rgba(0, 201, 255, 0.4)',
                  backgroundColor: 'rgba(0, 201, 255, 0.1)'
                }}
                transition={{ duration: 0.15 }}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-accent to-purple text-background shadow-lg transition-all duration-200 hover:from-accent/90 hover:to-purple/90 hover:shadow-glow-lg sm:h-12 sm:w-12"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.button>
              <motion.a
                href={`mailto:${t('emailContact')}?subject=${encodeURIComponent(t('contactMailSubjectIntro'))}`}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  boxShadow: '0 10px 20px rgba(0, 201, 255, 0.4)',
                  backgroundColor: 'rgba(0, 201, 255, 0.1)'
                }}
                transition={{ duration: 0.15 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-purple text-background shadow-lg transition-all duration-200 hover:from-accent/90 hover:to-purple/90 hover:shadow-glow-lg sm:h-12 sm:w-12"
                aria-label={t('email')}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

      <AnimatePresence>
        {comingSoonOpen && (
          <motion.div
            key="footer-social-soon"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setComingSoonOpen(false)}
              aria-label={t('footerSocialSoonBackdrop')}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="footer-soon-title"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass-card relative z-10 w-full max-w-sm border border-white/15 p-6 text-center shadow-2xl"
            >
              <h4 id="footer-soon-title" className="text-lg font-bold text-text">
                {t('newsletterComingSoon')}
              </h4>
              <p className="mt-2 text-sm text-secondary">{t('footerSocialSoonHint')}</p>
              <button
                type="button"
                onClick={() => setComingSoonOpen(false)}
                className="btn-secondary mt-6 w-full"
              >
                {t('footerSocialSoonOk')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer 