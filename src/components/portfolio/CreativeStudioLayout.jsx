/**
 * CreativeStudioLayout - BOLD/ARTISTIC design for agencies, design studios
 * Props: { industry, style }
 * Dark #0a0a0a, amber #f59e0b, orange #f97316
 * Outfit + DM Sans, 4px radius (sharp, modern)
 * Bold typography, outline buttons, creative agency aesthetic
 */
import React, { useMemo, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot, colorWithAlpha } from '../../utils/portfolioUtils'

/** Match `max-sm` / common phone breakpoint; useSyncExternalStore avoids stale reads and odd HMR scope issues. */
const NARROW_VIEWPORT_MQ = '(max-width: 639px)'

function subscribeNarrowViewport(cb) {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia(NARROW_VIEWPORT_MQ)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getNarrowViewportSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia(NARROW_VIEWPORT_MQ).matches
}

function getNarrowViewportServerSnapshot() {
  return false
}

const SERVICE_ICONS = {
  clinic: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  specialist: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  care: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  platform: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  integrations: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
  ),
  analytics: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  training: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  sparkle: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const CreativeStudioLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {}
  const amber = p.primary || '#f59e0b'
  const coral = p.secondary || '#fb7185'
  const yellow = p.accent || '#fcd34d'
  const bg = p.bg || '#0a0a0a'
  const surface = p.surface || '#171717'
  const text = p.text || '#fafafa'
  const muted = p.muted || '#a3a3a3'
  const radius = style?.theme?.radius?.cardRadius || '4px'

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = '/images/creative-hero.png' // Overridden for style
  const aboutSection = industry?.aboutSection || null
  const gallery = industry?.gallery || []
  const trustBadges = industry?.trustBadges || []
  const relatedResources = industry?.relatedResources || []
  const specialties = industry?.specialties || []
  const mission = industry?.mission || null

  const headingFont = "'Outfit', sans-serif"
  const bodyFont = "'DM Sans', sans-serif"

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches
  const isPhone = useSyncExternalStore(subscribeNarrowViewport, getNarrowViewportSnapshot, getNarrowViewportServerSnapshot)

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

  return (
    <div
      style={{
        fontFamily: bodyFont,
        backgroundColor: bg,
        color: text,
        minHeight: '500px',
        letterSpacing: '-0.02em',
        maxWidth: '100%'
      }}
    >
      {/* NAVBAR: Dark, minimal, bold logo */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: bg,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <span
            style={{
              fontFamily: headingFont,
              fontWeight: 800,
              fontSize: '1.25rem',
              color: text,
              letterSpacing: '-0.03em',
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
                fontWeight: 600,
                color: muted,
                cursor: 'pointer',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              whileHover={!prefersReducedMotion ? { color: amber } : {}}
            >
              {label}
            </motion.span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
          <motion.button
            style={{
              borderRadius: radius,
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: colorWithAlpha(amber, 0),
              color: amber,
              border: `2px solid ${amber}`,
              cursor: 'pointer',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
            whileHover={!prefersReducedMotion ? { backgroundColor: amber, color: bg } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* HERO: Dark SaaS Collaboration Hero */}
      <section
        id="hero"
        style={{
          padding: '1.5rem',
          height: HERO_MIN_HEIGHT,
          backgroundColor: bg,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Soft Glow Accents */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '500px', background: `radial-gradient(ellipse at center, ${amber}20 0%, transparent 60%)`, filter: 'blur(60px)', zIndex: 0 }} />

        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ maxWidth: '800px', position: 'relative', zIndex: 2, marginBottom: '2rem', flexShrink: 0 }}
        >
          <h1
            style={{
              fontFamily: headingFont,
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.1,
              marginBottom: '1rem',
              color: text,
              letterSpacing: '-0.03em'
            }}
          >
            {hero.headline || 'Get Things Done With Your Team'}
          </h1>
            <p
              style={{
                fontSize: '0.875rem',
                color: muted,
                lineHeight: 1.5,
                marginBottom: '1.5rem',
                maxWidth: '600px',
                margin: '0 auto 1.5rem'
              }}
            >
            {hero.subheadline || 'A modern collaboration platform for bold ideas.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.button
              style={{
                borderRadius: '50px',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: text,
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={!prefersReducedMotion ? { backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.primaryCTA || 'Join The Private Beta'}
            </motion.button>
          </div>
        </motion.div>

        {/* UI / Product Preview Elements */}
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 60 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '980px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            alignItems: 'stretch',
            // Phone: keep equal breathing room left/right so the 3 cards feel centered/symmetric.
            margin: '0 auto',
            padding: isPhone ? '0 0.5rem' : undefined,
            boxSizing: 'border-box',
            flex: 1,
            marginBottom: '3px',
            alignSelf: 'stretch',
            minHeight: 0
          }}
        >
          {/* Card 1 */}
          <div style={{ height: '100%', minHeight: 0, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '11px', border: '1px solid rgba(255,255,255,0.05)', padding: '0.9rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.12rem' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: amber }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: coral, marginLeft: '-4px' }} />
              </div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)' }} />
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem', textAlign: 'center' }}>Team To-dos</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.28rem' }}>
              <span style={{ fontSize: '0.58rem', color: muted, opacity: 0.9 }}>2 of 4</span>
              <div style={{ flex: 1, height: '2px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ width: '50%', height: '100%', backgroundColor: amber, opacity: 0.8, borderRadius: 1 }} />
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.32rem', minHeight: 0, overflow: 'hidden', justifyContent: 'space-evenly' }}>
              {(services.length ? services.slice(0, 4).map((s) => s.title) : ['General Consultation', 'Specialist Care', 'Follow-up Care', 'Patient Records']).map((todo, i) => {
                const isCompleted = i < 2
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.28rem 0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.65rem', lineHeight: 1.25, color: isCompleted ? muted : 'rgba(255,255,255,0.9)', opacity: isCompleted ? 0.85 : 1, borderLeft: isCompleted ? `2px solid ${amber}60` : '2px solid transparent', flex: 1, minHeight: 0 }}>
                    {isCompleted ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
                    )}
                    <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{todo}</span>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Card 2 - Visual */}
          <div style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '11px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            {heroImage ? (
               <div style={{ width: '100%', height: '100%', backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }} />
            ) : (
               <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${amber}20 0%, ${coral}20 100%)` }} />
            )}
          </div>
          {/* Card 3 */}
          <div style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '11px', border: '1px solid rgba(255,255,255,0.05)', padding: isPhone ? '0.9rem' : '1.1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.6rem', textAlign: 'center' }}>Press Release</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'flex-start' }}>
               <div style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px 12px 12px 0', fontSize: '0.875rem', lineHeight: 1.4, color: 'rgba(255,255,255,0.95)', maxWidth: '94%' }}>I&apos;ll get started with the copy for the press release this PM</div>
               <div style={{ alignSelf: 'flex-end', padding: '0.75rem 1rem', backgroundColor: `${amber}25`, color: amber, borderRadius: '12px 12px 0 12px', fontSize: '0.875rem' }}>Awesome, thanks!</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STUDIO NOTES (creative stats + trust) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '4.25rem 2rem 3.5rem', borderTop: `1px solid rgba(255,255,255,0.06)`, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.8rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: amber }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: text }}>Studio notes</span>
              </div>
            </div>

            {stats.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                {stats.slice(0, 4).map((stat, i) => {
                  const rotate = i % 2 === 0 ? '-1.5deg' : '1.25deg'
                  const stroke = i % 3 === 0 ? amber : i % 3 === 1 ? coral : yellow
                  return (
                    <motion.div
                      key={i}
                      style={{
                        flex: '1 1 220px',
                        maxWidth: 280,
                        padding: '1.15rem 1.15rem',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: `1px solid rgba(255,255,255,0.08)`,
                        borderLeft: `4px solid ${stroke}`,
                        transform: `rotate(${rotate})`,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
                      }}
                      whileHover={!prefersReducedMotion ? { y: -6, rotate: 0 } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{ fontFamily: headingFont, fontSize: '2.4rem', fontWeight: 800, color: stroke, letterSpacing: '-0.03em' }}>{stat.value}</div>
                      <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: muted, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.85rem' }}>
                {trustBadges.slice(0, 6).map((badge, i) => (
                  <div key={i} style={{ padding: '0.65rem 0.85rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.86)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT: manifesto */}
      {aboutSection && (
        <motion.section {...sectionReveal} id="about" style={{ padding: '5.25rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: '2rem', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: amber, marginBottom: '0.8rem' }}>
                Manifesto
              </div>
              <h2 style={{ fontFamily: headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 3.6vw, 3rem)', margin: 0, color: text, letterSpacing: '-0.03em' }}>
                {aboutSection.title || 'About Us'}
              </h2>
              <p style={{ margin: '1rem 0 0', fontFamily: bodyFont, fontSize: '1rem', color: muted, lineHeight: 1.8 }}>
                {truncateText((Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[0]) || '', ABOUT_PARA_MAX)}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '0.9rem' }}>
              {Array.isArray(aboutSection.paragraphs) &&
                aboutSection.paragraphs.slice(1, 3).map((para, i) => (
                  <motion.div
                    key={i}
                    style={{
                      padding: '1.35rem 1.35rem',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderLeft: `4px solid ${i === 0 ? coral : amber}`
                    }}
                    whileHover={!prefersReducedMotion ? { y: -4 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ fontFamily: headingFont, fontWeight: 700, color: text, marginBottom: '0.5rem' }}>
                      {i === 0 ? 'What we believe' : 'How we build'}
                    </div>
                    <div style={{ fontFamily: bodyFont, color: muted, lineHeight: 1.75 }}>{truncateText(para, ABOUT_PARA_MAX)}</div>
                  </motion.div>
                ))}

              {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.35rem' }}>
                  {aboutSection.highlights.slice(0, 6).map((h, i) => (
                    <span key={i} style={{ padding: '0.45rem 0.7rem', borderRadius: 999, border: `1px solid rgba(255,255,255,0.12)`, background: 'rgba(255,255,255,0.04)', color: text, fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {truncateText(h, 18)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* SERVICES: collage (varied sizes) */}
      <motion.section
        {...sectionReveal}
        id="services"
        style={{
          padding: '5.25rem 2rem',
          backgroundColor: surface,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: amber, marginBottom: '0.6rem' }}>What we do</div>
              <h2 style={{ fontFamily: headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', margin: 0, color: text, letterSpacing: '-0.03em' }}>Services Collage</h2>
            </div>
            <div style={{ color: muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Curated set</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.85rem' }}>
            {services.slice(0, 6).map((svc, i) => {
              const span = i === 0 ? 7 : i === 1 ? 5 : i === 2 ? 5 : i === 3 ? 7 : 6
              const stroke = i % 3 === 0 ? amber : i % 3 === 1 ? coral : yellow
              return (
                <motion.div
                  key={svc.title || i}
                  style={{
                    gridColumn: `span ${span}`,
                    padding: '1.5rem 1.5rem',
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderLeft: `4px solid ${stroke}`,
                    minHeight: i < 2 ? 220 : 180
                  }}
                  whileHover={!prefersReducedMotion ? { y: -6 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                    <div style={{ color: stroke }}>{getServiceIcon(svc.icon)}</div>
                    <div style={{ fontFamily: headingFont, fontWeight: 800, color: text, letterSpacing: '-0.01em' }}>{svc.title}</div>
                  </div>
                  <div style={{ fontFamily: bodyFont, color: muted, lineHeight: 1.7 }}>{truncateText(svc.desc, SERVICE_DESC_MAX)}</div>
                  {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                    <div style={{ marginTop: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                      {svc.featureList.slice(0, 3).map((f, j) => (
                        <span key={j} style={{ padding: '0.35rem 0.65rem', borderRadius: 999, border: `1px solid rgba(255,255,255,0.12)`, background: 'rgba(255,255,255,0.04)', color: text, fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          {truncateText(f, 20)}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* SELECTED WORK */}
      {gallery.length > 0 && (
        <motion.section {...sectionReveal} id="gallery" style={{ padding: '5.25rem 2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: amber, marginBottom: '0.6rem' }}>Selected work</div>
                <h2 style={{ fontFamily: headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', margin: 0, color: text, letterSpacing: '-0.03em' }}>Collage Wall</h2>
              </div>
              <div style={{ color: muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Scroll-stopping</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.85rem' }}>
              {gallery.slice(0, 6).map((img, i) => {
                const span = i === 0 ? 7 : i === 1 ? 5 : i === 2 ? 4 : i === 3 ? 4 : i === 4 ? 5 : 7
                const h = i === 0 ? 320 : i === 1 ? 320 : 220
                const frame = i % 3 === 0 ? amber : i % 3 === 1 ? coral : yellow
                return (
                  <motion.div
                    key={i}
                    style={{ gridColumn: `span ${span}`, height: h, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)', boxShadow: `0 0 0 2px rgba(0,0,0,0.35) inset` }}
                    whileHover={!prefersReducedMotion ? { y: -6, boxShadow: `0 0 0 2px ${frame} inset` } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={img} alt={`Work ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* STUDIO CONTACT + FOOTER */}
      <motion.section {...sectionReveal} id="contact" style={{ padding: '5.5rem 2rem', backgroundColor: surface, borderTop: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{ padding: '1.75rem', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(0,0,0,0.25)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: amber, marginBottom: '0.7rem' }}>Let’s make something loud</div>
              <h2 style={{ fontFamily: headingFont, fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', margin: 0, letterSpacing: '-0.04em' }}>
                {contact.pitch || 'Get in Touch'}
              </h2>
              <p style={{ margin: '1rem 0 0', color: muted, lineHeight: 1.7, maxWidth: 560 }}>
                Two lines are enough. We’ll reply with a clear plan, timeline, and the smallest next step.
              </p>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.85rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: text, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: coral }} /> Email
                    </span>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${String(contact.phone).replace(/\\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.85rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: text, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: yellow }} /> Call
                    </span>
                  </a>
                )}
                {contact.address && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.85rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: text, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: amber }} /> Studio
                  </span>
                )}
              </div>

              <div style={{ marginTop: '1.35rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <motion.button
                  style={{ borderRadius: radius, padding: '0.95rem 1.25rem', fontSize: '0.78rem', fontWeight: 900, backgroundColor: amber, color: bg, border: 'none', cursor: 'pointer', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  whileHover={!prefersReducedMotion ? { backgroundColor: coral, y: -2 } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {contact.ctaLabel || 'Start a project'}
                </motion.button>
                <motion.button
                  style={{ borderRadius: radius, padding: '0.95rem 1.25rem', fontSize: '0.78rem', fontWeight: 900, backgroundColor: 'transparent', color: text, border: '2px solid rgba(255,255,255,0.24)', cursor: 'pointer', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  whileHover={!prefersReducedMotion ? { borderColor: amber, color: amber, y: -2 } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                  onClick={() => scrollToSection('Services')}
                >
                  View services
                </motion.button>
              </div>
            </div>

            <div style={{ padding: '1.75rem', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: amber, marginBottom: '0.7rem' }}>What happens next</div>
              <div style={{ display: 'grid', gap: '0.8rem' }}>
                {['We reply within 24h', 'Quick scope + budget fit', 'First draft plan in 48h'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: amber, fontFamily: headingFont, fontWeight: 900 }}>
                      {i + 1}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, fontWeight: 650 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.10)', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', color: muted, fontSize: '0.8125rem' }}>
            <div style={{ fontFamily: headingFont, fontWeight: 900, letterSpacing: '-0.02em', color: text }}>{industry?.brandName || 'Webenox'}</div>
            <div style={{ opacity: 0.85 }}>© {new Date().getFullYear()} crafted in the dark.</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default CreativeStudioLayout
