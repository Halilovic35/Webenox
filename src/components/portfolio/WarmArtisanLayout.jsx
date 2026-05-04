/**
 * WarmArtisanLayout - Complete website preview with ORGANIC/HANDCRAFTED aesthetic
 * Props: { industry, style }
 * Warm cream bg, orange accents, Lora serif headings, Source Sans body.
 * Restaurant/craft/local business vibe. 16px radius, subtle noise texture.
 */
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot } from '../../utils/portfolioUtils'

const SERVICE_ICONS = {
  clinic: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>),
  specialist: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
  care: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
  preventive: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
  telehealth: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>),
  lab: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>),
  hair: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>),
  skin: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>),
  wellness: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>),
  dining: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>),
  events: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>),
  catering: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>),
  platform: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
  build: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>),
  maintenance: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
  default: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>)
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const WarmArtisanLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {
    primary: '#ea580c',
    secondary: '#b45309',
    accent: '#f59e0b',
    bg: '#fffbeb',
    surface: '#fffdf5',
    text: '#431407',
    muted: '#9a3412'
  }

  const cardRadius = '16px'
  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Menu', 'About', 'Contact']
  const heroImage = industry?.heroImage || null
  const aboutSection = industry?.aboutSection || null
  const trustBadges = industry?.trustBadges || []
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

  const noiseBg = {
    backgroundColor: '#fffbeb',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
    backgroundBlendMode: 'overlay'
  }

  const baseStyles = {
    fontFamily: "'Source Sans 3', sans-serif",
    ...noiseBg,
    color: p.text,
    minHeight: '500px',
    maxWidth: '100%'
  }

  const warmShadow = '0 4px 20px rgba(234, 88, 12, 0.12)'
  const warmShadowSoft = '0 2px 12px rgba(245, 158, 11, 0.1)'
  const woodenBg = 'rgba(139, 90, 43, 0.06)'

  const cardStyle = {
    borderRadius: cardRadius,
    backgroundColor: p.surface,
    boxShadow: warmShadowSoft,
    transition: 'all 0.35s ease'
  }

  const btnPrimary = {
    borderRadius: cardRadius,
    backgroundColor: p.primary,
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const btnSecondary = {
    borderRadius: cardRadius,
    backgroundColor: 'rgba(234, 88, 12, 0.12)',
    color: p.primary,
    border: '1px solid rgba(234, 88, 12, 0.35)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={baseStyles}>
      {/* NAVBAR: Warm cream, organic feel */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: 'rgba(255, 253, 245, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(234, 88, 12, 0.12)',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <span
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 600,
              fontSize: '1.25rem',
              color: p.text,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {industry?.brandName || 'Webenox'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'center' }}>
          {navLabels.map((label) => (
            <motion.span
              key={label}
              onClick={() => scrollToSection(label)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection(label)}
              style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.75rem', color: p.text, opacity: 0.9, cursor: 'pointer', whiteSpace: 'nowrap' }}
              whileHover={!prefersReducedMotion ? { color: p.primary } : {}}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
          <motion.button
            style={{ ...btnPrimary, padding: '0.5rem 1rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            whileHover={!prefersReducedMotion ? { scale: 1.03, boxShadow: warmShadow } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* HERO: TWO-ROW, headline+subhead left 50%, image right 50%; then feature strip below (unique) */}
      <section
        id="hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
          height: `calc(${HERO_MIN_HEIGHT} + 8px)`,
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center', flex: 1, minHeight: 0 }}>
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, x: -20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          <h1
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 600,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: p.text
            }}
          >
            {hero.headline || 'Welcome'}
          </h1>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '1.0625rem',
              color: p.text,
              opacity: 0.9,
              lineHeight: 1.7,
              marginBottom: '1.25rem'
            }}
          >
            {hero.subheadline || ''}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <motion.button
              style={{ ...btnPrimary, padding: '0.75rem 1.75rem', fontSize: '1rem' }}
              whileHover={!prefersReducedMotion ? { scale: 1.03, boxShadow: warmShadow } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.primaryCTA || 'Primary CTA'}
            </motion.button>
            <motion.button
              style={{ ...btnSecondary, padding: '0.75rem 1.75rem', fontSize: '1rem' }}
              whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.secondaryCTA || 'Secondary CTA'}
            </motion.button>
          </div>
          </motion.div>
          <div
            style={{
              minHeight: '200px',
              height: '100%',
              borderRadius: cardRadius,
              backgroundImage: heroImage
                ? `url(${heroImage})`
                : 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: warmShadowSoft,
              border: '1px solid rgba(234, 88, 12, 0.1)'
            }}
          />
        </div>
        {Array.isArray(hero.bulletPoints) && hero.bulletPoints.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {hero.bulletPoints.map((point, i) => (
              <span
                key={i}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: cardRadius,
                  backgroundColor: 'rgba(234, 88, 12, 0.12)',
                  color: p.text,
                  fontSize: '0.875rem',
                  fontFamily: "'Source Sans 3', sans-serif"
                }}
              >
                {point}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* AT A GLANCE (stats + trust) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '3rem 1.5rem', backgroundColor: woodenBg, borderTop: '1px solid rgba(234, 88, 12, 0.08)', borderBottom: '1px solid rgba(234, 88, 12, 0.08)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '1.25rem', color: p.text }}>Today’s specials</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.9375rem', color: p.text, opacity: 0.78 }}>Small batch, high care.</div>
            </div>

            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.9rem' }}>
                {stats.slice(0, 3).map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{
                      gridColumn: 'span 4',
                      padding: '1.35rem',
                      borderRadius: cardRadius,
                      backgroundColor: 'rgba(255, 253, 245, 0.92)',
                      boxShadow: warmShadowSoft,
                      border: '1px solid rgba(234, 88, 12, 0.10)'
                    }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: warmShadow } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ fontFamily: "'Lora', serif", fontSize: '1.65rem', fontWeight: 600, color: p.primary, marginBottom: '0.25rem' }}>{stat.value}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.95rem', color: p.text, opacity: 0.85, lineHeight: 1.35 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {trustBadges.slice(0, 5).map((badge, i) => (
                  <span key={i} style={{ padding: '0.55rem 0.85rem', borderRadius: 999, backgroundColor: 'rgba(255, 253, 245, 0.92)', border: '1px solid rgba(234, 88, 12, 0.12)', boxShadow: warmShadowSoft, color: p.text, opacity: 0.9, fontSize: '0.875rem', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT SECTION */}
      {aboutSection && (
        <section id="about" style={{ padding: '3.5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '1.75rem', textAlign: 'center', marginBottom: '2rem', color: p.text }}>
            {aboutSection.title || 'About Us'}
          </h2>
          {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '1rem', color: p.text, opacity: 0.9, lineHeight: 1.75, marginBottom: '1.25rem', textAlign: 'center' }}>{truncateText(para, ABOUT_PARA_MAX)}</p>
          ))}
          {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              {aboutSection.highlights.map((h, i) => (
                <span key={i} style={{ padding: '0.5rem 1rem', borderRadius: cardRadius, backgroundColor: 'rgba(234, 88, 12, 0.12)', color: p.primary, fontSize: '0.875rem', fontWeight: 500 }}>{h}</span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Removed: process / why-choose-us for this style */}

      {/* SERVICES: craft menu */}
      <motion.section {...sectionReveal} id="services" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', margin: 0, color: p.text }}>
              Craft menu
            </h2>
            <p style={{ margin: '0.85rem auto 0', maxWidth: 720, fontFamily: "'Source Sans 3', sans-serif", color: p.text, opacity: 0.82, lineHeight: 1.75 }}>
              A tight set of offerings each one finished carefully, with the details that make it feel handmade.
            </p>
          </div>

          <div style={{ borderRadius: cardRadius, overflow: 'hidden', border: '1px solid rgba(234, 88, 12, 0.12)', backgroundColor: 'rgba(255, 253, 245, 0.92)', boxShadow: warmShadowSoft }}>
            {services.slice(0, 4).map((svc, i) => (
              <motion.div
                key={svc.title || i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr auto',
                  gap: '1rem',
                  alignItems: 'start',
                  padding: '1.35rem 1.5rem',
                  borderTop: i === 0 ? 'none' : '1px dashed rgba(154, 52, 18, 0.22)'
                }}
                whileHover={!prefersReducedMotion ? { backgroundColor: 'rgba(234, 88, 12, 0.06)' } : {}}
                transition={{ duration: 0.2 }}
              >
                <div style={{ width: 44, height: 44, borderRadius: cardRadius, backgroundColor: 'rgba(234, 88, 12, 0.12)', color: p.primary, display: 'grid', placeItems: 'center' }}>
                  {getServiceIcon(svc.icon)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '1.1rem', color: p.text }}>{svc.title}</div>
                    <div style={{ flex: 1, height: 1, background: 'rgba(154, 52, 18, 0.18)', minWidth: 40 }} />
                  </div>
                  <div style={{ marginTop: '0.35rem', fontFamily: "'Source Sans 3', sans-serif", color: p.text, opacity: 0.82, lineHeight: 1.65 }}>
                    {truncateText(svc.desc, SERVICE_DESC_MAX)}
                  </div>
                  {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                      {svc.featureList.slice(0, 2).map((f, j) => (
                        <span key={j} style={{ padding: '0.45rem 0.75rem', borderRadius: 999, backgroundColor: 'rgba(234, 88, 12, 0.10)', border: '1px solid rgba(234, 88, 12, 0.18)', color: p.primary, fontSize: '0.8125rem', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                          {truncateText(f, 22)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: p.primary, opacity: 0.85, whiteSpace: 'nowrap' }}>
                  {i === 0 ? 'Signature' : i === 1 ? 'Seasonal' : i === 2 ? 'Classic' : 'Finish'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PEOPLE (team or testimonials) */}
      {(team.length > 0 || testimonials.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '4rem 1.5rem', backgroundColor: woodenBg, borderTop: '1px solid rgba(234, 88, 12, 0.08)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', margin: 0, color: p.text }}>
                {team.length > 0 ? 'Our craft team' : 'Kind words'}
              </h2>
              <p style={{ margin: '0.85rem auto 0', maxWidth: 720, fontFamily: "'Source Sans 3', sans-serif", color: p.text, opacity: 0.82, lineHeight: 1.75 }}>
                {team.length > 0 ? 'Small crew. High standards. Friendly faces.' : 'Local, honest feedback from people we’ve served.'}
              </p>
            </div>

            {team.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {team.slice(0, 3).map((member, i) => (
                  <motion.div
                    key={member.name || i}
                    style={{ ...cardStyle, padding: '1.5rem', backgroundColor: 'rgba(255, 253, 245, 0.95)', border: '1px solid rgba(234, 88, 12, 0.14)' }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: warmShadow } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: 64, height: 64, borderRadius: cardRadius, overflow: 'hidden', border: '2px solid rgba(234, 88, 12, 0.20)', boxShadow: warmShadowSoft, flexShrink: 0 }}>
                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: p.text }}>{member.name}</div>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: p.primary, opacity: 0.9 }}>{member.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                {testimonials.slice(0, 2).map((t, i) => (
                  <motion.div
                    key={i}
                    style={{ ...cardStyle, padding: '1.75rem', backgroundColor: 'rgba(255, 253, 245, 0.95)', border: '1px solid rgba(234, 88, 12, 0.15)' }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: warmShadow } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: p.text, marginBottom: '1rem', fontSize: '0.95rem', lineHeight: 1.75 }}>
                      &ldquo;{truncateText(t.quote, 220)}&rdquo;
                    </p>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, color: p.primary }}>{t.author}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.85rem', color: p.text, opacity: 0.75 }}>{t.role}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* CONTACT + FOOTER */}
      <motion.section {...sectionReveal} id="contact" style={{ padding: '4.75rem 1.5rem', backgroundColor: woodenBg, borderTop: '1px solid rgba(234, 88, 12, 0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '1.25rem', alignItems: 'start' }}>
            <div style={{ borderRadius: cardRadius, backgroundColor: 'rgba(255, 253, 245, 0.96)', boxShadow: warmShadowSoft, border: '1px solid rgba(234, 88, 12, 0.12)', padding: '2.25rem' }}>
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '1.25rem', color: p.text, marginBottom: '0.75rem' }}>
                {contact.pitch || 'Visit the studio'}
              </div>
              <p style={{ margin: 0, fontFamily: "'Source Sans 3', sans-serif", color: p.text, opacity: 0.82, lineHeight: 1.75, maxWidth: 560 }}>
                Share what you’re building and we’ll reply with a simple next step no pressure, just clarity.
              </p>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.9rem', borderRadius: 999, backgroundColor: 'rgba(234, 88, 12, 0.10)', border: '1px solid rgba(234, 88, 12, 0.18)', color: p.primary, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>
                      Email
                    </span>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${String(contact.phone).replace(/\\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.9rem', borderRadius: 999, backgroundColor: 'rgba(234, 88, 12, 0.10)', border: '1px solid rgba(234, 88, 12, 0.18)', color: p.primary, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>
                      Call
                    </span>
                  </a>
                )}
                {contact.address && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.9rem', borderRadius: 999, backgroundColor: 'rgba(234, 88, 12, 0.10)', border: '1px solid rgba(234, 88, 12, 0.18)', color: p.primary, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>
                    Studio
                  </span>
                )}
              </div>

              <div style={{ marginTop: '1.35rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.button style={{ ...btnPrimary, padding: '0.9rem 1.4rem', fontSize: '0.95rem' }} whileHover={!prefersReducedMotion ? { y: -2, boxShadow: warmShadow } : {}} whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}>
                  {contact.ctaLabel || 'Contact'}
                </motion.button>
                <motion.button style={{ ...btnSecondary, padding: '0.9rem 1.4rem', fontSize: '0.95rem' }} whileHover={!prefersReducedMotion ? { y: -2 } : {}} whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}} onClick={() => scrollToSection('Menu')}>
                  View menu
                </motion.button>
              </div>
            </div>

            <div style={{ ...cardStyle, padding: '2.25rem', backgroundColor: 'rgba(255, 253, 245, 0.94)', border: '1px solid rgba(234, 88, 12, 0.12)' }}>
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '1.125rem', color: p.text, marginBottom: '0.85rem' }}>What happens next</div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {['We reply within 24h', 'Quick scope + fit check', 'A simple plan you can follow'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 34, height: 34, borderRadius: cardRadius, backgroundColor: 'rgba(234, 88, 12, 0.10)', border: '1px solid rgba(234, 88, 12, 0.16)', color: p.primary, fontWeight: 800, display: 'grid', placeItems: 'center', fontFamily: "'Source Sans 3', sans-serif" }}>
                      {i + 1}
                    </div>
                    <div style={{ color: p.text, opacity: 0.82, lineHeight: 1.65, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 650 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(234, 88, 12, 0.12)', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', color: p.text, opacity: 0.75, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.875rem' }}>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: p.text }}>{industry?.brandName || 'Webenox'}</div>
            <div>© {new Date().getFullYear()} made with care.</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default WarmArtisanLayout
