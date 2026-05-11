/**
 * LuxuryNoirLayout - Complete website preview with Luxury Noir aesthetic
 * Props: { industry, style }
 * Dark theme, gold accents, Playfair Display + DM Sans, asymmetric layouts, generous whitespace
 */
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, TESTIMONIAL_QUOTE_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot, colorWithAlpha } from '../../utils/portfolioUtils'

const SERVICE_ICONS = {
  clinic: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  specialist: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  care: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  preventive: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  telehealth: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  lab: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
  ),
  hair: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  ),
  skin: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  wellness: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  dining: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  platform: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const LuxuryNoirLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {
    primary: '#d4af37',
    secondary: '#a8a29e',
    accent: '#fbbf24',
    bg: '#0c0a09',
    surface: '#1c1917',
    text: '#fafaf9',
    muted: '#78716c'
  }
  const typography = style?.theme?.typography || {
    headingFont: "'Playfair Display', serif",
    bodyFont: "'DM Sans', sans-serif",
    headingWeight: '600',
    bodyWeight: '400'
  }
  const radius = style?.theme?.radius || { cardRadius: '4px', buttonRadius: '4px' }

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const faq = industry?.faq || []
  const pricing = industry?.pricing || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = '/images/luxury-hero.png' // Overridden for style
  const aboutSection = industry?.aboutSection || null
  const process = industry?.process || []
  const gallery = industry?.gallery || []
  const trustBadges = industry?.trustBadges || []
  const whyChooseUs = industry?.whyChooseUs || []
  const featuredCaseStudy = industry?.featuredCaseStudy || null
  const ctaBanner = industry?.ctaBanner || null
  const valueProps = industry?.valueProps || []
  const additionalFaq = industry?.additionalFaq || []
  const relatedResources = industry?.relatedResources || []
  const specialties = industry?.specialties || []
  const mission = industry?.mission || null

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches

  const previewScrollRoot = useMemo(() => getPortfolioPreviewScrollRoot(), [])
  const sectionView = useMemo(
    () => ({
      once: true,
      amount: 0.15,
      margin: '0px 0px -12% 0px',
      ...(previewScrollRoot ? { root: previewScrollRoot } : {})
    }),
    [previewScrollRoot]
  )

  const sectionReveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        viewport: sectionView
      }

  const baseStyles = {
    fontFamily: typography.bodyFont,
    backgroundColor: p.bg,
    color: p.text,
    minHeight: '500px',
    letterSpacing: style?.theme?.letterSpacing || '0.02em',
    maxWidth: '100%'
  }

  const btnOutlineStyle = {
    borderRadius: radius.buttonRadius,
    backgroundColor: colorWithAlpha(p.primary, 0),
    color: p.primary,
    fontWeight: 600,
    border: `1px solid ${p.primary}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const btnGoldStyle = {
    borderRadius: radius.buttonRadius,
    backgroundColor: p.primary,
    color: p.bg,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={baseStyles}>
      {/* NAVBAR: transparent/dark, logo in serif, nav links spaced, gold CTA outline */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: 'rgba(12, 10, 9, 0.85)',
          borderBottom: `1px solid ${p.primary}20`,
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <span
            style={{
              fontFamily: typography.headingFont,
              fontWeight: 600,
              fontSize: '1.25rem',
              color: p.text,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {industry?.brandName || 'Webenox'}
          </span>
        </div>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            justifyContent: 'center'
          }}
        >
          {navLabels.map((label) => (
            <motion.span
              key={label}
              onClick={() => scrollToSection(label)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection(label)}
              style={{
                fontSize: '0.75rem',
                color: p.muted,
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
              whileHover={!prefersReducedMotion ? { color: p.primary } : {}}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
          <motion.button
            style={{ ...btnOutlineStyle, padding: '0.5rem 1rem', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
            whileHover={!prefersReducedMotion ? { backgroundColor: p.primary, color: p.bg } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* HERO: Minimal Editorial Luxury Layout */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: HERO_MIN_HEIGHT,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: p.bg,
          padding: '1.5rem',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          
          {/* Abstract Object / Image Layer */}
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, scale: 0.9 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: '300px',
              height: '200px',
              borderRadius: '150px 150px 0 0',
              overflow: 'hidden',
              marginBottom: '-3rem',
              zIndex: 1,
              position: 'relative',
              backgroundImage: heroImage ? `url(${heroImage})` : `linear-gradient(180deg, ${p.primary}40 0%, ${p.bg} 100%)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: `1px solid ${p.primary}20`,
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
            }}
          />

          {/* Layered Text Positioning */}
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 40 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'rgba(12, 10, 9, 0.6)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              borderRadius: '0',
              border: `1px solid ${p.primary}30`,
              maxWidth: '700px',
              width: '100%'
            }}
          >
            <h1
              style={{
                fontFamily: typography.headingFont,
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                lineHeight: 1.05,
                marginBottom: '1rem',
                color: p.primary,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              {hero.headline || 'The Purity of Noise'}
            </h1>
            <p
              style={{
                fontFamily: typography.bodyFont,
                fontSize: '0.875rem',
                color: p.text,
                lineHeight: 1.5,
                marginBottom: '1.5rem',
                letterSpacing: '0.05em'
              }}
            >
              {hero.subheadline || 'Everyday life is a sound.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.button
                style={{
                  ...btnOutlineStyle,
                  padding: '0.75rem 2rem',
                  fontSize: '0.875rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderWidth: '1px',
                  borderRadius: '0'
                }}
                whileHover={!prefersReducedMotion ? { backgroundColor: p.primary, color: p.bg } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
              >
                {hero.primaryCTA || 'Discover'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL PROOF STRIP */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section
          {...sectionReveal}
          id="stats"
          style={{
            padding: '4rem 3rem 3.25rem',
            backgroundColor: p.accent ? `${p.accent}15` : 'rgba(254, 243, 199, 0.12)',
            borderTop: `1px solid ${p.primary}30`,
            borderBottom: `1px solid ${p.primary}25`
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {stats.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
                {stats.slice(0, 3).map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{ textAlign: 'center' }}
                    whileHover={!prefersReducedMotion ? { y: -2 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ fontFamily: typography.headingFont, fontSize: 'clamp(2rem, 3vw, 2.75rem)', fontWeight: 600, color: p.primary, marginBottom: '0.25rem', letterSpacing: '0.02em' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: typography.bodyFont, fontSize: '0.8125rem', color: p.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '2.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                {trustBadges.slice(0, 4).map((badge, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: p.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    <span style={{ color: p.primary }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT SECTION */}
      {aboutSection && (
        <motion.section {...sectionReveal} id="about" style={{ padding: '6rem 3rem', borderBottom: `1px solid ${p.primary}18` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)', gap: '3rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: typography.bodyFont, fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.muted, marginBottom: '1rem' }}>
                  The story
                </div>
                <h2 style={{ fontFamily: typography.headingFont, fontWeight: typography.headingWeight, fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: 0, color: p.text, letterSpacing: '0.02em' }}>
                  {aboutSection.title || 'About Us'}
                </h2>
              </div>

              <div style={{ borderLeft: `1px solid ${p.primary}22`, paddingLeft: '2rem' }}>
                {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs.slice(0, 3).map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: typography.bodyFont,
                      fontSize: '1rem',
                      color: p.muted,
                      lineHeight: 1.9,
                      margin: i === 0 ? 0 : '1.25rem 0 0'
                    }}
                  >
                    {i === 0 ? (
                      <>
                        <span style={{ float: 'left', fontFamily: typography.headingFont, fontSize: '3rem', lineHeight: 1, marginRight: '0.55rem', marginTop: '0.25rem', color: p.primary }}>
                          {truncateText(para, 1)}
                        </span>
                        {truncateText(para, ABOUT_PARA_MAX).slice(1)}
                      </>
                    ) : (
                      truncateText(para, ABOUT_PARA_MAX)
                    )}
                  </p>
                ))}

                {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
                  <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {aboutSection.highlights.slice(0, 10).map((h, i) => (
                      <span key={i} style={{ padding: '0.45rem 0.95rem', border: `1px solid ${p.primary}45`, color: p.primary, fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}


      {/* SERVICES: editorial list, one per row */}
      <motion.section
        {...sectionReveal}
        id="services"
        style={{
          padding: '6rem 3rem',
          borderBottom: `1px solid ${p.primary}18`
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
            <h2 style={{ fontFamily: typography.headingFont, fontWeight: typography.headingWeight, fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', margin: 0, color: p.text, letterSpacing: '0.03em' }}>
              Services
            </h2>
            <div style={{ fontFamily: typography.bodyFont, color: p.muted, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              One per line, no clutter
            </div>
          </div>

          <div style={{ display: 'grid' }}>
            {services.slice(0, 8).map((svc, i) => (
              <motion.div
                key={svc.title || i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px minmax(0, 1fr)',
                  gap: '2rem',
                  padding: '2rem 0',
                  borderTop: i === 0 ? `1px solid ${p.primary}22` : 'none',
                  borderBottom: `1px solid ${p.primary}22`,
                  alignItems: 'start'
                }}
                whileHover={!prefersReducedMotion ? { paddingLeft: '0.5rem' } : {}}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: p.primary }}>{getServiceIcon(svc.icon)}</div>
                  <div style={{ fontFamily: typography.bodyFont, fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.muted }}>
                    Service
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: typography.headingFont, fontWeight: typography.headingWeight, fontSize: '1.15rem', color: p.text, marginBottom: '0.5rem' }}>
                    {svc.title}
                  </div>
                  <div style={{ fontFamily: typography.bodyFont, fontSize: '0.98rem', color: p.muted, lineHeight: 1.85 }}>
                    {truncateText(svc.desc, SERVICE_DESC_MAX)}
                  </div>
                  {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                    <div style={{ marginTop: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {svc.featureList.slice(0, 5).map((f, j) => (
                        <span key={j} style={{ padding: '0.35rem 0.65rem', border: `1px solid ${p.primary}40`, color: p.primary, fontFamily: typography.bodyFont, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          {truncateText(f, 24)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CLIENT QUOTE / TESTIMONIALS */}
      {testimonials.length > 0 && (
        <motion.section
          {...sectionReveal}
          style={{
            padding: '6rem 3rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              padding: '3rem 3.5rem',
              borderLeft: `4px solid ${p.primary}`,
              backgroundColor: p.surface,
              borderRadius: radius.cardRadius
            }}
          >
            <blockquote
              style={{
                fontFamily: typography.headingFont,
                fontStyle: 'italic',
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                lineHeight: 1.6,
                color: p.text,
                margin: '0 0 1.5rem 0'
              }}
            >
              "{truncateText(testimonials[0]?.quote || '', TESTIMONIAL_QUOTE_MAX)}"
            </blockquote>
            <div style={{ fontFamily: typography.bodyFont, fontWeight: 600, fontSize: '0.9375rem', color: p.text }}>
              {testimonials[0]?.author}
            </div>
            <div style={{ fontFamily: typography.bodyFont, fontSize: '0.8125rem', color: p.muted }}>{testimonials[0]?.role}</div>
          </div>
        </motion.section>
      )}

      {/* CONTACT: Dark form style, gold CTA */}
      <motion.section
        {...sectionReveal}
        id="contact"
        style={{
          padding: '6rem 3rem',
          backgroundColor: p.surface
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: typography.bodyFont, fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.muted, marginBottom: '1rem' }}>
                Concierge
              </div>
              <h2 style={{ fontFamily: typography.headingFont, fontWeight: typography.headingWeight, fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', margin: 0, color: p.text }}>
                {contact.pitch || 'Get in Touch'}
              </h2>
              <p style={{ fontFamily: typography.bodyFont, fontSize: '1rem', color: p.muted, lineHeight: 1.9, margin: '1.25rem 0 0' }}>
                A discreet, premium conversation. We reply with clarity and a thoughtful plan.
              </p>
              <div style={{ marginTop: '2rem', display: 'grid', gap: '0.75rem' }}>
                {contact.address && <div style={{ fontFamily: typography.bodyFont, color: p.muted, lineHeight: 1.8 }}>{contact.address}</div>}
                {contact.phone && <div style={{ fontFamily: typography.bodyFont, color: p.muted, lineHeight: 1.8 }}>{contact.phone}</div>}
                {contact.email && <div style={{ fontFamily: typography.bodyFont, color: p.muted, lineHeight: 1.8 }}>{contact.email}</div>}
                {contact.hours && <div style={{ fontFamily: typography.bodyFont, color: p.muted, lineHeight: 1.8 }}>{contact.hours}</div>}
              </div>
            </div>
            <div style={{ border: `1px solid ${p.primary}35`, backgroundColor: p.bg, padding: '2.25rem' }}>
              <div style={{ fontFamily: typography.bodyFont, fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.muted, marginBottom: '1rem' }}>
                Next steps
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { t: 'A quick reply', d: 'You’ll hear back with clear options and timing.' },
                  { t: 'A short alignment', d: 'We confirm what matters most and what to ignore.' },
                  { t: 'A refined plan', d: 'A premium proposal with scope and deliverables.' }
                ].map((s, i) => (
                  <div key={i} style={{ padding: '1rem 0', borderBottom: i < 2 ? `1px solid ${p.muted}25` : 'none' }}>
                    <div style={{ fontFamily: typography.headingFont, color: p.text, marginBottom: '0.4rem' }}>{s.t}</div>
                    <div style={{ fontFamily: typography.bodyFont, color: p.muted, lineHeight: 1.85 }}>{s.d}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button
                  style={{ ...btnGoldStyle, padding: '0.95rem 2.25rem', fontSize: '0.95rem' }}
                  whileHover={!prefersReducedMotion ? { boxShadow: `0 0 24px ${p.primary}40` } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {contact.ctaLabel || 'Contact Us'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer {...sectionReveal} style={{ padding: '4rem 3rem', backgroundColor: p.text, color: p.bg, borderTop: `1px solid ${p.primary}40` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr) minmax(0, 0.8fr)', gap: '3rem' }}>
          <div>
            <div style={{ fontFamily: typography.headingFont, fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>{industry?.brandName || 'Webenox'}</div>
            {mission && <p style={{ fontFamily: typography.bodyFont, fontSize: '0.875rem', opacity: 0.85, lineHeight: 1.6 }}>{mission}</p>}
          </div>
          {specialties.length > 0 && (
            <div>
              <div style={{ fontFamily: typography.bodyFont, fontWeight: 600, fontSize: '0.75rem', marginBottom: '1rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.primary }}>Specialties</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', opacity: 0.85, display: 'grid', gap: '0.45rem' }}>
                {specialties.slice(0, 6).map((s, i) => <li key={i} style={{ opacity: 0.9 }}>{s}</li>)}
              </ul>
            </div>
          )}
          {relatedResources.length > 0 && (
            <div>
              <div style={{ fontFamily: typography.bodyFont, fontWeight: 600, fontSize: '0.75rem', marginBottom: '1rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.primary }}>Links</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', opacity: 0.85, display: 'grid', gap: '0.45rem' }}>
                {relatedResources.slice(0, 6).map((r, i) => <li key={i} style={{ cursor: 'pointer', textDecoration: 'underline', opacity: 0.9 }}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ maxWidth: '1100px', margin: '2rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8125rem', opacity: 0.7, textAlign: 'center' }}>
          © {new Date().getFullYear()} {industry?.brandName || 'Webenox'}. All rights reserved.
        </div>
      </motion.footer>
    </div>
  )
}

export default LuxuryNoirLayout
