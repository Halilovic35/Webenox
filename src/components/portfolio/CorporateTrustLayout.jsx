/**
 * CorporateTrustLayout - Professional/Corporate aesthetic for legal, consulting, finance
 * Props: { industry, style }
 * White bg #ffffff, blue #1d4ed8, #2563eb, Inter font, 8px radius (minimal rounding)
 * Clean, structured, trustworthy law firm / consulting aesthetic
 */
import React, { useMemo, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import {
  truncateText,
  SERVICE_DESC_MAX,
  CARD_DESC_MAX,
  ABOUT_PARA_MAX,
  PROCESS_DESC_MAX,
  TESTIMONIAL_QUOTE_MAX,
  FAQ_ANSWER_MAX,
  PREVIEW_CONTAINER_HEIGHT,
  HERO_MIN_HEIGHT,
  scrollToSection,
  getPortfolioPreviewScrollRoot,
  colorWithAlpha
} from '../../utils/portfolioUtils'

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
  legal: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
  ),
  consulting: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
  ),
  rep: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  business: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  ),
  estate: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  ),
  litigation: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const CorporateTrustLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {
    primary: '#1d4ed8',
    secondary: '#3b82f6',
    accent: '#2563eb',
    bg: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    muted: '#64748b'
  }
  const cardRadius = style?.theme?.radius?.cardRadius || '8px'
  const buttonRadius = style?.theme?.radius?.buttonRadius || '6px'

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const faq = industry?.faq || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = '/images/corporate-hero.png' // Overridden for style
  const aboutSection = industry?.aboutSection || null
  const process = industry?.process || []
  const gallery = industry?.gallery || []
  const trustBadges = industry?.trustBadges || []
  const whyChooseUs = industry?.whyChooseUs || []
  const featuredCaseStudy = industry?.featuredCaseStudy || null
  const relatedResources = industry?.relatedResources || []
  const specialties = industry?.specialties || []
  const mission = industry?.mission || null

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

  const badgeLabel =
    industry?.hero?.badgeLabel ||
    industry?.badgeLabel ||
    (industry?.shortLabel ? `Trusted ${industry.shortLabel}` : 'Trusted Digital Platform')

  const baseStyles = {
    fontFamily: "'Inter', sans-serif",
    color: p.text,
    minHeight: `max(500px, ${HERO_MIN_HEIGHT})`,
    maxWidth: '100%',
    overflow: 'hidden'
  }

  const cardStyle = {
    borderRadius: cardRadius,
    backgroundColor: p.surface,
    border: `1px solid ${p.muted}20`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    transition: 'all 0.2s ease'
  }

  const btnPrimaryStyle = {
    borderRadius: buttonRadius,
    backgroundColor: p.primary,
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }

  const btnSecondaryStyle = {
    borderRadius: buttonRadius,
    backgroundColor: colorWithAlpha(p.text, 0),
    color: p.text,
    border: `1px solid ${p.muted}40`,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }

  return (
    <div style={baseStyles}>
      {/* CORPORATE TRUST HERO: Jeton-style composition inside shared preview height */}
      <section
        id="hero"
        style={{
          position: 'relative',
          // Full-bleed hero (no top nav row) — match preview scroll “window” exactly
          height: PREVIEW_CONTAINER_HEIGHT,
          width: '100%',
          display: 'flex',
          flexDirection: isPhone ? 'column' : 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
          padding: isPhone ? '1.35rem 1.25rem 2.25rem' : '2.5rem 3.5rem 3.5rem',
          boxSizing: 'border-box',
          backgroundImage: `radial-gradient(circle at top left, ${p.secondary || '#1e40af'}55 0, transparent 55%), radial-gradient(circle at bottom right, ${p.accent || '#facc15'}33 0, transparent 60%), url(${heroImage})`,
          backgroundSize: '140% auto, 120% auto, cover',
          backgroundPosition: 'top left, bottom right, center right',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
          backgroundColor: '#020617',
          overflow: 'hidden'
        }}
      >
        {/* Soft vignette overlay to keep text readable over artwork */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at left, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.85) 30%, transparent 55%), radial-gradient(circle at right, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.75) 40%, rgba(15,23,42,0.9) 100%)',
            mixBlendMode: 'normal',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Top-right utility controls: language, login, signup */}
        <div
          style={{
            position: 'absolute',
            top: isPhone ? '1rem' : '1.75rem',
            right: isPhone ? '1rem' : '3.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 3
          }}
        >
          <button
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid rgba(248,250,252,0.22)',
              backgroundColor: 'rgba(15,23,42,0.6)',
              color: '#e5e7eb',
              fontSize: '0.75rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              backdropFilter: 'blur(14px)'
            }}
          >
            <span role="img" aria-label="globe">
              🌐
            </span>
            <span>EN</span>
          </button>
          <button
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#e5e7eb',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Log in
          </button>
          <button
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: p.accent || '#facc15',
              color: '#020617',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 18px 45px rgba(250,204,21,0.55)'
            }}
          >
            Sign up
          </button>
        </div>

        {/* Upper-left premium badge for visual balance with top-right controls */}
        <div
          style={{
            position: 'absolute',
            top: isPhone ? '1rem' : '1.75rem',
            left: isPhone ? '1rem' : '3.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.25rem 0.7rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.5)',
            backgroundColor: 'rgba(15,23,42,0.75)',
            color: 'rgba(226,232,240,0.9)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            zIndex: 3
          }}
        >
          <span
            style={{
              width: '0.4rem',
              height: '0.4rem',
              borderRadius: '999px',
              background: `radial-gradient(circle at center, ${p.accent || '#facc15'} 0%, transparent 65%)`,
              boxShadow: '0 0 12px rgba(250,204,21,0.7)'
            }}
          />
          <span>{badgeLabel}</span>
        </div>

        {/* Left headline block: lower-left quadrant */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            alignSelf: isPhone ? 'flex-start' : 'flex-end',
            paddingBottom: isPhone ? '1.25rem' : '5.25rem',
            maxWidth: isPhone ? '100%' : '32rem',
            paddingRight: isPhone ? 0 : '2rem'
          }}
        >
          <div
            style={{
              marginBottom: '1.05rem',
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(226,232,240,0.7)'
            }}
          >
            {industry?.tagline || 'Corporate Trust Platform'}
          </div>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: isPhone ? 'clamp(3.4rem, 11vw, 4.2rem)' : 'clamp(2.8rem, 5vw, 4rem)',
              lineHeight: 1,
              color: '#f9fafb',
              letterSpacing: '-0.045em',
              margin: 0,
              textAlign: 'left'
            }}
          >
            {(() => {
              const raw = hero.headline || 'Care You Can Trust'
              const words = raw.split(' ')

              // Special casing for Legal industry: first two words on their own lines,
              // then third and fourth together, final word on its own line.
              if ((industry?.id === 'legal' || industry?.name === 'Legal') && words.length === 5) {
                return (
                  <>
                    {words[0]}
                    <br />
                    {words[1]}
                    <br />
                    {words[2]} {words[3]}
                    <br />
                    {words[4]}
                  </>
                )
              }

              // Default: each word on its own line (Feel / Radiant, / Be / Confident)
              return (
                <>
                  {words.map((word, index) => (
                    <React.Fragment key={`${word}-${index}`}>
                      {word}
                      {index < words.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </>
              )
            })()}
          </h1>
        </div>

        {/* Right supporting content block: description + CTAs */}
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 24 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 2,
            alignSelf: isPhone ? 'flex-start' : 'flex-end',
            marginLeft: isPhone ? 0 : 'auto',
            paddingBottom: isPhone ? '0.5rem' : '6.5rem',
            maxWidth: isPhone ? '100%' : '22rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(226,232,240,0.9)',
              lineHeight: 1.6,
              margin: 0,
              textAlign: 'left'
            }}
          >
            {hero.subheadline || 'Single account for all your corporate payments, treasury, and trust operations.'}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <motion.button
              style={{
                ...btnPrimaryStyle,
                padding: '0.8rem 1.6rem',
                fontSize: '0.8rem',
                borderRadius: '999px',
                backgroundColor: p.accent || '#facc15',
                color: '#020617',
                boxShadow: '0 18px 45px rgba(250,204,21,0.55)'
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.04 } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
            >
              {hero.primaryCTA || 'Book appointment'}
            </motion.button>
            <motion.button
              style={{
                ...btnSecondaryStyle,
                padding: '0.8rem 1.6rem',
                fontSize: '0.8rem',
                borderRadius: '999px',
                backgroundColor: colorWithAlpha('#0f172a', 0),
                color: '#e5e7eb',
                border: '1px solid rgba(148,163,184,0.7)'
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.03, backgroundColor: 'rgba(15,23,42,0.5)' } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
            >
              {hero.secondaryCTA || 'View services'}
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom-center floating navigation pill */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '1.8rem',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 1rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(15,23,42,0.86)',
              border: '1px solid rgba(148,163,184,0.5)',
              color: '#e5e7eb',
              fontSize: '0.75rem',
              boxShadow: '0 20px 60px rgba(15,23,42,0.9)',
              backdropFilter: 'blur(18px)'
            }}
          >
            {['Trust', 'Security', 'Solutions'].map((item, index) => (
              <button
                key={item}
                style={{
                  borderRadius: '999px',
                  border: 'none',
                  padding: '0.35rem 0.9rem',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  backgroundColor: index === 0 ? '#facc15' : 'transparent',
                  color: index === 0 ? '#020617' : '#e5e7eb'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom-left scroll indicator */}
        <div
          style={{
            position: 'absolute',
            left: '3.5rem',
            bottom: '2.1rem',
            zIndex: 3
          }}
        >
          <button
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.6)',
              backgroundColor: 'rgba(15,23,42,0.85)',
              color: '#e5e7eb',
              fontSize: '0.72rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              backdropFilter: 'blur(16px)'
            }}
          >
            <span
              style={{
                width: '0.45rem',
                height: '0.9rem',
                borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.8)',
                display: 'inline-flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '0.12rem'
              }}
            >
              <span
                style={{
                  width: '0.16rem',
                  height: '0.22rem',
                  borderRadius: '999px',
                  backgroundColor: '#e5e7eb'
                }}
              />
            </span>
            <span>Scroll</span>
          </button>
        </div>

        {/* Bottom-right support pill */}
        <div
          style={{
            position: 'absolute',
            right: '3.5rem',
            bottom: '2.1rem',
            zIndex: 3
          }}
        >
          <button
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: '#0ea5e9',
              color: '#0b1120',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              boxShadow: '0 18px 45px rgba(8,47,73,0.85)'
            }}
          >
            <span>Support</span>
          </button>
        </div>
      </section>

      {/* STATS: Blue accent numbers, clean */}
      {stats.length > 0 && (
        <motion.section
          {...sectionReveal}
          style={{
            padding: '2.5rem 2rem',
            backgroundColor: p.surface,
            borderTop: `1px solid ${p.muted}15`
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              maxWidth: '1100px',
              margin: '0 auto'
            }}
          >
            {stats.slice(0, 4).map((stat, i) => (
              <motion.div
                key={i}
                style={{ textAlign: 'center' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <div
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: p.primary,
                    marginBottom: '0.25rem',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: p.muted, fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* TRUST BADGES */}
      {trustBadges.length > 0 && (
        <motion.section {...sectionReveal} style={{ padding: '1.5rem 2rem', backgroundColor: p.bg, borderBottom: `1px solid ${p.muted}15` }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {trustBadges.slice(0, 4).map((badge, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: p.muted }}>
                <span style={{ color: p.primary }}><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>
                {badge}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ABOUT SECTION */}
      {aboutSection && (
        <motion.section {...sectionReveal} id="about" style={{ padding: '4rem 2rem', backgroundColor: p.surface, borderTop: `1px solid ${p.muted}15` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)', gap: '2rem', alignItems: 'start' }}>
              <div style={{ ...cardStyle, padding: '1.75rem', borderLeft: `4px solid ${p.primary}` }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.02em', color: p.text, fontSize: '1.25rem' }}>
                  {aboutSection.title || 'About Us'}
                </div>
                <div style={{ marginTop: '0.85rem', fontSize: '1rem', color: p.muted, lineHeight: 1.75 }}>
                  {truncateText((Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[0]) || '', ABOUT_PARA_MAX)}
                </div>

                {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs.length > 1 && (
                  <div style={{ marginTop: '1.15rem', display: 'grid', gap: '0.65rem' }}>
                    {aboutSection.paragraphs.slice(1, 3).map((para, i) => (
                      <div key={i} style={{ padding: '0.9rem 1rem', borderRadius: '12px', backgroundColor: `${p.primary}08`, border: `1px solid ${p.muted}18` }}>
                        <div style={{ fontSize: '0.95rem', color: p.muted, lineHeight: 1.7 }}>{truncateText(para, ABOUT_PARA_MAX)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ ...cardStyle, padding: '1.75rem' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, color: p.text, marginBottom: '1rem' }}>Proof points</div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {(Array.isArray(aboutSection.highlights) ? aboutSection.highlights : []).slice(0, 8).map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.85rem 1rem', borderRadius: '12px', border: `1px solid ${p.muted}18`, backgroundColor: '#fff' }}>
                      <div style={{ width: 26, height: 26, borderRadius: '8px', backgroundColor: `${p.primary}15`, color: p.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: p.text, lineHeight: 1.6, fontWeight: 600 }}>{h}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* PROCESS */}
      {process.length > 0 && (
        <motion.section {...sectionReveal} style={{ padding: '4rem 2rem', backgroundColor: p.bg, borderTop: `1px solid ${p.muted}15` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', margin: 0, color: p.text }}>How It Works</h2>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: p.muted }}>A clear enterprise delivery flow.</div>
            </div>

            <div style={{ ...cardStyle, padding: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {process.slice(0, 6).map((step, i) => (
                  <motion.div
                    key={i}
                    style={{ padding: '1.15rem 1.15rem', borderRadius: '12px', border: `1px solid ${p.muted}18`, backgroundColor: '#fff' }}
                    whileHover={!prefersReducedMotion ? { y: -2 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '10px', backgroundColor: p.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          {step.step ?? i + 1}
                        </div>
                        <div style={{ fontWeight: 800, color: p.text }}>{step.title}</div>
                      </div>
                      <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: `${p.primary}55` }} />
                    </div>
                    <div style={{ fontSize: '0.95rem', color: p.muted, lineHeight: 1.6 }}>
                      {truncateText(step.desc, PROCESS_DESC_MAX)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* WHY CHOOSE US */}
      {whyChooseUs.length > 0 && (
        <motion.section {...sectionReveal} style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 16 }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.6rem', margin: 0, color: p.text }}>Why Choose Us</h2>
              <p style={{ margin: '0.75rem 0 0', fontSize: '1rem', color: p.muted, lineHeight: 1.7 }}>
                Enterprise-grade clarity, measurable delivery, and risk-aware execution.
              </p>
              <div style={{ marginTop: '1.25rem', ...cardStyle, padding: '1.15rem', border: `1px solid ${p.muted}18` }}>
                <div style={{ fontWeight: 800, color: p.text, marginBottom: '0.5rem' }}>Quality signals</div>
                <div style={{ display: 'grid', gap: '0.5rem', color: p.muted, fontSize: '0.95rem' }}>
                  {['Clear scope', 'Weekly updates', 'Documented decisions', 'Predictable timelines'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: p.primary }} />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.9rem' }}>
              {whyChooseUs.slice(0, 8).map((item, i) => (
                <motion.div
                  key={i}
                  style={{ ...cardStyle, padding: '1.25rem', border: `1px solid ${p.muted}18` }}
                  whileHover={!prefersReducedMotion ? { boxShadow: '0 6px 22px rgba(0,0,0,0.08)' } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: p.text }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: p.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      #{String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div style={{ marginTop: '0.55rem', fontSize: '0.95rem', color: p.muted, lineHeight: 1.65 }}>
                    {truncateText(item.desc, CARD_DESC_MAX)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* SERVICES: Structured list, blue bullets */}
      <motion.section
        {...sectionReveal}
        id="services"
        style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '1.5rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: p.text,
            letterSpacing: '-0.02em'
          }}
        >
          Practice Areas
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
            maxWidth: '700px',
            margin: '0 auto'
          }}
        >
          {services.slice(0, 6).map((svc, i) => (
            <motion.div
              key={svc.title || i}
              style={{
                ...cardStyle,
                padding: '1.5rem'
              }}
              whileHover={!prefersReducedMotion ? { boxShadow: '0 4px 16px rgba(0,0,0,0.08)' } : {}}
              transition={{ duration: 0.2 }}
            >
              <div style={{ color: p.primary, marginBottom: '1rem' }}>{getServiceIcon(svc.icon)}</div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  color: p.text
                }}
              >
                {svc.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: p.muted, lineHeight: 1.45, marginBottom: Array.isArray(svc.featureList) && svc.featureList.length ? '0.5rem' : 0 }}>{truncateText(svc.desc, SERVICE_DESC_MAX)}</p>
              {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                <p style={{ margin: 0, fontSize: '0.75rem', color: p.muted, opacity: 0.9 }}>
                  {svc.featureList.join(' · ')}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CASE STUDY OR PROCESS (choose one) */}
      {featuredCaseStudy ? (
        <motion.section {...sectionReveal} style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto', borderTop: `1px solid ${p.muted}15` }}>
          <div style={{ ...cardStyle, padding: '2rem', borderLeft: `4px solid ${p.primary}` }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: p.primary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Case Study</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '1.35rem', margin: 0, color: p.text }}>{featuredCaseStudy.title}</h3>
                <p style={{ marginTop: '0.85rem', marginBottom: 0, fontSize: '1rem', color: p.muted, lineHeight: 1.7 }}>{truncateText(featuredCaseStudy.summary, 260)}</p>
                {featuredCaseStudy.testimonial && (
                  <p style={{ marginTop: '1rem', marginBottom: 0, fontStyle: 'italic', color: p.muted, lineHeight: 1.7 }}>
                    “{truncateText(featuredCaseStudy.testimonial, 180)}”
                  </p>
                )}
              </div>
              {Array.isArray(featuredCaseStudy.metrics) && featuredCaseStudy.metrics.length > 0 && (
                <div style={{ display: 'grid', gap: '0.6rem' }}>
                  {featuredCaseStudy.metrics.slice(0, 5).map((m, i) => (
                    <div key={i} style={{ padding: '0.65rem 0.75rem', borderRadius: '12px', border: `1px solid ${p.muted}18`, backgroundColor: '#fff', color: p.text, fontWeight: 700 }}>
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      ) : (
        process.length > 0 && (
          <motion.section {...sectionReveal} style={{ padding: '4rem 2rem', backgroundColor: p.bg, borderTop: `1px solid ${p.muted}15` }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', margin: 0, color: p.text }}>Delivery Process</h2>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: p.muted }}>Clear steps. Documented outcomes.</div>
              </div>
              <div style={{ ...cardStyle, padding: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {process.slice(0, 4).map((step, i) => (
                    <motion.div key={i} style={{ padding: '1.15rem 1.15rem', borderRadius: '12px', border: `1px solid ${p.muted}18`, backgroundColor: '#fff' }} whileHover={!prefersReducedMotion ? { y: -2 } : {}} transition={{ duration: 0.2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '10px', backgroundColor: p.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          {step.step ?? i + 1}
                        </div>
                        <div style={{ fontWeight: 800, color: p.text }}>{step.title}</div>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: p.muted, lineHeight: 1.6 }}>{truncateText(step.desc, PROCESS_DESC_MAX)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )
      )}

      {/* CONTACT: Formal layout */}
      <motion.section
        {...sectionReveal}
        id="contact"
        style={{
          padding: '4rem 2rem',
          backgroundColor: p.surface,
          borderTop: `1px solid ${p.muted}15`
        }}
      >
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: p.text,
              letterSpacing: '-0.02em'
            }}
          >
            {contact.pitch || 'Discuss Your Case'}
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
              marginBottom: '1.5rem',
              fontSize: '0.9375rem',
              color: p.muted,
              lineHeight: 1.6
            }}
          >
            {contact.address && (
              <p style={{ margin: 0 }}>{contact.address}</p>
            )}
            {contact.phone && (
              <p style={{ margin: 0 }}>{contact.phone}</p>
            )}
            {contact.email && (
              <p style={{ margin: 0 }}>{contact.email}</p>
            )}
            {contact.hours && (
              <p style={{ margin: 0 }}>{contact.hours}</p>
            )}
          </div>
          <motion.button
            style={{ ...btnPrimaryStyle, padding: '0.875rem 2rem', fontSize: '1rem' }}
            whileHover={!prefersReducedMotion ? { backgroundColor: p.accent, boxShadow: '0 4px 12px rgba(37,99,235,0.35)' } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {contact.ctaLabel || 'Request Consultation'}
          </motion.button>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer {...sectionReveal} style={{ padding: '2.5rem 2rem', backgroundColor: p.text, color: p.bg }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.75rem' }}>{industry?.brandName || 'Webenox'}</div>
            {mission && <p style={{ fontSize: '0.875rem', opacity: 0.85, lineHeight: 1.5 }}>{mission}</p>}
          </div>
          {specialties.length > 0 && (
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Our Specialties</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', opacity: 0.85 }}>
                {specialties.slice(0, 4).map((s, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}
              </ul>
            </div>
          )}
          {relatedResources.length > 0 && (
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Quick Links</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', opacity: 0.85 }}>
                {relatedResources.slice(0, 4).map((r, i) => <li key={i} style={{ marginBottom: '0.25rem', cursor: 'pointer', textDecoration: 'underline' }}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ maxWidth: '1000px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8125rem', opacity: 0.7, textAlign: 'center' }}>
          © {new Date().getFullYear()} {industry?.brandName || 'Webenox'}. All rights reserved.
        </div>
      </motion.footer>
    </div>
  )
}

export default CorporateTrustLayout
