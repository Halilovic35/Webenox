import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioConfig } from '../context/PortfolioConfigContext'
import AccentUnderline from './AccentUnderline'
import PortfolioLivePreview from './PortfolioLivePreview'
import AppPhonePreview from './AppPhonePreview'

const INDUSTRY_ICONS = {
  clinic: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  beauty: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  restaurant: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  saas: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  fitness: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  education: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  realestate: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  ),
  legal: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
  ),
  construction: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  )
}

const TryOurDesigns = () => {
  const {
    selectedIndustryId,
    setSelectedIndustryId,
    selectedStyleId,
    setSelectedStyleId,
    selectedIndustry,
    selectedStyle,
    chooseConfiguration,
    industries,
    styles
  } = usePortfolioConfig()

  const handleIndustryChange = (id) => {
    if (id === selectedIndustryId) return
    setSelectedIndustryId(id)
  }

  const handleStyleChange = (id) => {
    if (id === selectedStyleId) return
    setSelectedStyleId(id)
  }

  const scrollViewport = { once: true, amount: 0.1 }
  const hasBothSelected = selectedIndustryId && selectedStyleId
  const [previewMode, setPreviewMode] = useState('website') // 'website' | 'app'

  const switchMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 24, scale: 0.96 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -16, scale: 0.96 },
      transition: { duration: 0.45, ease: 'easeOut' }
    }),
    []
  )

  const cardBase = 'relative rounded-2xl border backdrop-blur-sm transition-all duration-300 cursor-pointer p-4'
  const cardSelected = 'border-accent shadow-glow ring-2 ring-accent/30'
  const cardHover = 'hover:border-white/30 hover:-translate-y-0.5'

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-accent/3 rounded-full blur-[130px]" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple/3 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-accent/2 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={scrollViewport}
          className="section-header"
        >
          <h2 className="section-title luxury-heading">
            Bring Your <AccentUnderline className="gradient-text">Ideas to Life</AccentUnderline>
          </h2>
          <p className="section-description">
            Choose an industry and explore a design concept. These previews are just starting points, every project we build is fully custom, tailored to your business, your goals, and your users.
          </p>
          <p className="text-secondary text-sm lg:text-base max-w-3xl mx-auto mt-3">
            From websites to web apps and mobile applications, we design and build exactly what you need.
          </p>
        </motion.div>

        {/* Preview mode toggle */}
        <div className="flex flex-col items-center justify-center gap-3 mt-2 mb-8">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            {['website', 'app'].map((mode) => {
              const isActive = previewMode === mode
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPreviewMode(mode)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'bg-gradient-to-r from-accent to-purple text-background shadow-glow' : 'text-secondary hover:text-text'
                  }`}
                >
                  {mode === 'website' ? 'Website' : 'App'}
                </button>
              )
            })}
          </div>
          <p className="text-secondary text-sm text-center max-w-3xl">
            Explore websites or interactive app concepts. These are just starting points, every project is fully custom.
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {previewMode === 'website' ? (
            <motion.div
              key="website"
              {...switchMotion}
              className="grid lg:grid-cols-[minmax(260px,32%)_1fr] gap-6 lg:gap-8 items-start"
            >
              {/* Left Panel - Controls */}
              <div className="space-y-6 order-2 lg:order-1 lg:max-w-xs">
                <div>
                  <h3 className="text-base font-semibold text-text mb-3">1. Select Industry</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((ind) => (
                      <motion.button
                        key={ind.id}
                        onClick={() => handleIndustryChange(ind.id)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${cardBase} ${cardHover} flex items-center gap-3 ${
                          selectedIndustryId === ind.id ? `${cardSelected} shadow-accent/20` : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <span className="text-accent flex-shrink-0">{INDUSTRY_ICONS[ind.icon] || INDUSTRY_ICONS.clinic}</span>
                        <span className="block text-sm font-medium text-text truncate">{ind.shortLabel}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-text mb-3">2. Select Style</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((sty) => (
                      <motion.button
                        key={sty.id}
                        onClick={() => handleStyleChange(sty.id)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${cardBase} ${cardHover} text-left ${
                          selectedStyleId === sty.id ? `${cardSelected} shadow-accent/20` : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <span className="block text-xs font-semibold text-text leading-tight">{sty.name}</span>
                        <span className="block text-[10px] text-secondary mt-0.5 truncate">{sty.tagline}</span>
                        {sty.colorStrip && (
                          <div className="flex gap-0.5 mt-2">
                            {sty.colorStrip.map((c, i) => (
                              <span key={i} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Browser-style Preview (~68%) */}
              <div className="order-1 lg:order-2">
                {/* Your Website Concept label */}
                <p className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                  <span>Your Website Concept</span>
                  <span className="w-8 h-px bg-accent/50" />
                </p>
                <div
                  className="rounded-2xl shadow-2xl border border-white/10 bg-background/40 backdrop-blur-sm"
                  style={{
                    overflow: 'clip',
                    boxShadow: '0 25px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                  }}
                >
                  {/* Fake Browser Bar */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-2 text-white/45">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                        aria-label="Back"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="M14 6 8 12l6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                        aria-label="Forward"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex-1 flex justify-center">
                      <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/12 bg-black/25 px-4 py-2 text-[12px] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-emerald-300/80 shrink-0" aria-hidden>
                          <path d="M7.5 11V9a4.5 4.5 0 0 1 9 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                          <path d="M7 11h10v9H7v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                        </svg>
                        <span className="truncate font-medium">{selectedIndustry?.demoDomain || 'yourbusiness.com'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-white/45">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                        aria-label="Reload"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                          <path d="M20 4v6h-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Preview Content with loading overlay */}
                  <div
                    id="portfolio-preview-scroll-container"
                    className="relative overflow-x-hidden overflow-y-auto"
                    style={{ height: 'max(60vh, 520px)' }}
                  >
                    <PortfolioLivePreview industry={selectedIndustry} style={selectedStyle} />
                  </div>

                  {/* CTA Footer */}
                  <div className="p-5 border-t border-white/10 bg-background/90 backdrop-blur-sm">
                    {hasBothSelected && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-accent mb-3 text-center font-medium"
                      >
                        Preview: {selectedIndustry.brandName || selectedIndustry.shortLabel} · {selectedStyle.name}
                      </motion.p>
                    )}
                    <motion.button
                      onClick={chooseConfiguration}
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(0, 201, 255, 0.35)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 px-8 rounded-2xl font-bold text-xl bg-gradient-to-r from-accent to-purple text-background hover:from-accent/90 hover:to-purple/90 transition-all shadow-lg hover:shadow-glow-lg"
                    >
                      Start My Website
                    </motion.button>
                    <p className="text-xs text-secondary mt-3 text-center">
                      We'll customize this design for your brand, content, and goals.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="app" {...switchMotion} className="flex justify-center">
              <AppPhonePreview />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TryOurDesigns 
