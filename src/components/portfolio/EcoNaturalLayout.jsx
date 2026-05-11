/**
 * EcoNaturalLayout - Complete website preview with SUSTAINABLE/ORGANIC aesthetic
 * Props: { industry, style }
 * Light green #f0fdf4, green accents #16a34a, #10b981
 * Source Sans 3, 20px radius, rounded organic feel
 * Natural, calming, leaf/organic motifs. Eco, organic, sustainability brand.
 */
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot } from '../../utils/portfolioUtils'

const LEAF_ICON = (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const SERVICE_ICONS = {
  clinic: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>),
  specialist: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
  care: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
  hair: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>),
  skin: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>),
  wellness: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>),
  dining: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>),
  platform: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
  legal: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>),
  build: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>),
  default: (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>)
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const EcoNaturalLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {
    primary: '#16a34a',
    secondary: '#22c55e',
    accent: '#10b981',
    bg: '#f0fdf4',
    surface: '#ffffff',
    text: '#14532d',
    muted: '#15803d'
  }

  const cardRadius = '20px'
  const pillRadius = '9999px'

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = industry?.heroImage || null
  const aboutSection = industry?.aboutSection || null
  const process = industry?.process || []
  const trustBadges = industry?.trustBadges || []
  const featuredCaseStudy = industry?.featuredCaseStudy || null
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
    fontFamily: "'Source Sans 3', sans-serif",
    backgroundColor: p.bg,
    color: p.text,
    minHeight: '500px',
    maxWidth: '100%'
  }

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }
  const prim = hexToRgb(p.primary)
  const acc = hexToRgb(p.accent || p.primary)
  const greenShadow = `0 4px 20px rgba(${prim.r},${prim.g},${prim.b},0.2)`
  const greenShadowSoft = `0 2px 12px rgba(${prim.r},${prim.g},${prim.b},0.12)`
  const terracottaAccent = p.accent ? `0 2px 12px rgba(${hexToRgb(p.accent).r},${hexToRgb(p.accent).g},${hexToRgb(p.accent).b},0.15)` : greenShadowSoft

  const cardStyle = {
    borderRadius: cardRadius,
    backgroundColor: p.surface,
    boxShadow: greenShadowSoft,
    transition: 'all 0.35s ease'
  }

  const pillBtnPrimary = {
    borderRadius: pillRadius,
    backgroundColor: p.primary,
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const pillBtnSecondary = {
    borderRadius: pillRadius,
    backgroundColor: `${p.primary}15`,
    color: p.primary,
    border: `1px solid ${p.primary}40`,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={baseStyles}>
      {/* NAVBAR: Light green tint */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: `${p.bg}e8`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${p.primary}20`,
          boxShadow: greenShadowSoft,
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: `${p.primary}15`,
              borderRadius: cardRadius,
              borderLeft: `4px solid ${p.accent || p.primary}`,
              minWidth: 0
            }}
          >
            <span style={{ color: p.primary, display: 'flex', alignItems: 'center', flexShrink: 0 }}>{LEAF_ICON}</span>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 700,
                fontSize: '1.125rem',
                color: p.primary,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {industry?.brandName || 'Webenox'}
            </span>
          </div>
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
                color: p.text,
                opacity: 0.85,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              whileHover={!prefersReducedMotion ? { opacity: 1, color: p.primary } : {}}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
          <motion.button
            style={{ ...pillBtnPrimary, padding: '0.5rem 1rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            whileHover={!prefersReducedMotion ? { scale: 1.03, boxShadow: greenShadow } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* HERO: Split layout, text left and image right (different from Soft Pastel's centered) */}
      <section
        id="hero"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
          padding: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
          height: `calc(${HERO_MIN_HEIGHT} + 8px)`,
          background: `linear-gradient(90deg, ${p.primary}08 0%, transparent 50%, ${p.accent || p.primary}06 100%)`,
          borderRadius: cardRadius,
          boxSizing: 'border-box'
        }}
      >
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, x: -20 } : {}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'left', flex: 1, minHeight: 0 }}
        >
        <h1
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 700,
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
            fontSize: '0.9375rem',
            color: p.text,
            opacity: 0.85,
            lineHeight: 1.5,
            marginBottom: '1.5rem'
          }}
        >
          {hero.subheadline || ''}
        </p>
        {Array.isArray(hero.bulletPoints) && hero.bulletPoints.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'flex-start',
              marginBottom: '1.75rem'
            }}
          >
            {hero.bulletPoints.map((point, i) => (
              <span
                key={i}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: pillRadius,
                  backgroundColor: `${p.primary}20`,
                  color: p.text,
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  borderLeft: `3px solid ${p.accent || p.primary}`
                }}
              >
                {point}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          <motion.button
            style={{ ...pillBtnPrimary, padding: '0.6rem 1.5rem', fontSize: '0.9375rem' }}
            whileHover={!prefersReducedMotion ? { scale: 1.03, boxShadow: greenShadow } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Primary CTA'}
          </motion.button>
          <motion.button
            style={{ ...pillBtnSecondary, padding: '0.6rem 1.5rem', fontSize: '0.9375rem' }}
            whileHover={!prefersReducedMotion ? { scale: 1.03, backgroundColor: `${p.primary}25` } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.secondaryCTA || 'Secondary CTA'}
          </motion.button>
        </div>
        </motion.div>
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, x: 20 } : {}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            minHeight: '200px',
            height: '100%',
            borderRadius: cardRadius,
            overflow: 'hidden',
            boxShadow: greenShadow
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: heroImage
                ? `linear-gradient(135deg, ${p.primary}30 0%, ${p.accent || p.primary}20 100%), url(${heroImage})`
                : `linear-gradient(135deg, ${p.primary}25 0%, ${p.secondary}20 50%, ${p.accent || p.primary}15 100%)`,
              // Full bleed image inside the frame.
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
        </motion.div>
      </section>

      {/* IMPACT STRIP (stats + trust) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '3.25rem 1.5rem', backgroundColor: `${p.primary}0f`, borderTop: `1px solid ${p.primary}1a`, borderBottom: `1px solid ${p.primary}1a` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.9rem', borderRadius: pillRadius, backgroundColor: 'rgba(255,255,255,0.8)', border: `1px solid ${p.primary}25`, boxShadow: greenShadowSoft }}>
                <span style={{ color: p.primary, display: 'flex', alignItems: 'center' }}>{LEAF_ICON}</span>
                <span style={{ fontWeight: 700, color: p.text, letterSpacing: '0.04em' }}>Proof, not promises</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: p.text, opacity: 0.75 }}>Small changes. Measurable outcomes.</div>
            </div>

            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.9rem' }}>
                {stats.slice(0, 4).map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{
                      gridColumn: 'span 3',
                      padding: '1.25rem',
                      borderRadius: cardRadius,
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      boxShadow: greenShadowSoft,
                      border: `1px solid ${p.primary}20`
                    }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: greenShadow } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: p.primary, marginBottom: '0.25rem' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.9375rem', color: p.text, opacity: 0.85, lineHeight: 1.35 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                {trustBadges.slice(0, 6).map((badge, i) => (
                  <span key={i} style={{ padding: '0.55rem 0.85rem', borderRadius: pillRadius, backgroundColor: 'rgba(255,255,255,0.82)', border: `1px solid ${p.primary}25`, boxShadow: greenShadowSoft, color: p.text, opacity: 0.9, fontSize: '0.875rem', fontWeight: 600 }}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT: organic story block */}
      {aboutSection && (
        <motion.section {...sectionReveal} id="about" style={{ padding: '4.25rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.95fr)', gap: '1.25rem', alignItems: 'start' }}>
              <div style={{ ...cardStyle, padding: '2rem', border: `1px solid ${p.primary}20`, background: `linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.90) 100%)` }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.5rem 0.85rem', borderRadius: pillRadius, backgroundColor: `${p.primary}12`, border: `1px solid ${p.primary}25`, marginBottom: '1rem' }}>
                  <span style={{ color: p.primary, display: 'flex', alignItems: 'center' }}>{LEAF_ICON}</span>
                  <span style={{ fontWeight: 700, color: p.text, opacity: 0.9 }}>Our approach</span>
                </div>
                <h2 style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: 0, color: p.text, letterSpacing: '-0.02em' }}>
                  {aboutSection.title || 'About Us'}
                </h2>
                {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[0] && (
                  <p style={{ margin: '1rem 0 0', fontSize: '1rem', color: p.text, opacity: 0.86, lineHeight: 1.85 }}>
                    {truncateText(aboutSection.paragraphs[0], ABOUT_PARA_MAX)}
                  </p>
                )}

                {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1.35rem' }}>
                    {aboutSection.highlights.slice(0, 6).map((h, i) => (
                      <span key={i} style={{ padding: '0.55rem 0.9rem', borderRadius: pillRadius, backgroundColor: 'rgba(255,255,255,0.85)', border: `1px solid ${p.primary}25`, boxShadow: greenShadowSoft, color: p.text, fontSize: '0.875rem', fontWeight: 600 }}>
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gap: '0.9rem' }}>
                {(Array.isArray(aboutSection.paragraphs) ? aboutSection.paragraphs.slice(1, 3) : []).map((para, i) => (
                  <motion.div
                    key={i}
                    style={{
                      ...cardStyle,
                      padding: '1.5rem',
                      border: `1px solid ${p.primary}18`,
                      backgroundColor: 'rgba(255,255,255,0.92)'
                    }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: greenShadow } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ fontWeight: 700, color: p.primary, marginBottom: '0.35rem' }}>{i === 0 ? 'Grounded in research' : 'Designed for longevity'}</div>
                    <div style={{ fontSize: '0.95rem', color: p.text, opacity: 0.84, lineHeight: 1.75 }}>{truncateText(para, ABOUT_PARA_MAX)}</div>
                  </motion.div>
                ))}

                <div style={{ ...cardStyle, padding: '1.5rem', border: `1px solid ${p.primary}18`, background: `linear-gradient(135deg, ${p.primary}10 0%, ${p.accent || p.primary}08 100%)` }}>
                  <div style={{ fontWeight: 700, color: p.text, marginBottom: '0.5rem' }}>A calmer way to grow</div>
                  <div style={{ fontSize: '0.95rem', color: p.text, opacity: 0.82, lineHeight: 1.7 }}>
                    We keep the system simple: clarity in messaging, frictionless UX, and sustainable acquisition.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* CASE STUDY OR PATH */}
      {(featuredCaseStudy || process.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '4.25rem 1.5rem', backgroundColor: `${p.secondary}0f`, borderTop: `1px solid ${p.primary}14`, borderBottom: `1px solid ${p.primary}14` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {featuredCaseStudy ? (
              <div style={{ ...cardStyle, padding: '2rem', border: `1px solid ${p.primary}22`, borderLeft: `6px solid ${p.primary}` }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: p.primary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Featured case</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.375rem', margin: 0, color: p.text }}>{featuredCaseStudy.title}</h3>
                <p style={{ margin: '0.8rem 0 0', fontSize: '1rem', color: p.text, opacity: 0.85, lineHeight: 1.75 }}>{featuredCaseStudy.summary}</p>
                {Array.isArray(featuredCaseStudy.metrics) && featuredCaseStudy.metrics.length > 0 && (
                  <div style={{ marginTop: '1.1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {featuredCaseStudy.metrics.slice(0, 4).map((m, i) => (
                      <span key={i} style={{ padding: '0.55rem 0.9rem', borderRadius: pillRadius, backgroundColor: 'rgba(255,255,255,0.82)', border: `1px solid ${p.primary}25`, boxShadow: greenShadowSoft, color: p.text, fontWeight: 700 }}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: 0, color: p.text }}>A gentle path</h2>
                  <p style={{ margin: '0.8rem auto 0', maxWidth: 680, color: p.text, opacity: 0.82, lineHeight: 1.75 }}>
                    Four calm steps that keep the work measurable and easy to maintain.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.9rem' }}>
                  {process.slice(0, 4).map((step, i) => (
                    <motion.div
                      key={i}
                      style={{ gridColumn: 'span 3', ...cardStyle, padding: '1.5rem', border: `1px solid ${p.primary}18`, backgroundColor: 'rgba(255,255,255,0.92)' }}
                      whileHover={!prefersReducedMotion ? { y: -4, boxShadow: greenShadow } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: `${p.primary}18`, border: `1px solid ${p.primary}25`, display: 'grid', placeItems: 'center', color: p.primary, fontWeight: 800, marginBottom: '0.85rem' }}>
                        {step.step}
                      </div>
                      <div style={{ fontWeight: 700, color: p.text, marginBottom: '0.35rem' }}>{step.title}</div>
                      <div style={{ fontSize: '0.9rem', color: p.text, opacity: 0.82, lineHeight: 1.7 }}>{truncateText(step.desc, 110)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* SERVICES: flowing list */}
      <motion.section {...sectionReveal} id="services" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.5rem 0.85rem', borderRadius: pillRadius, backgroundColor: `${p.primary}12`, border: `1px solid ${p.primary}25`, boxShadow: greenShadowSoft, marginBottom: '1rem' }}>
              <span style={{ color: p.primary, display: 'flex', alignItems: 'center' }}>{LEAF_ICON}</span>
              <span style={{ fontWeight: 700, color: p.text, opacity: 0.9 }}>Services</span>
            </div>
            <h2 style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: 0, color: p.text }}>
              What we build (and maintain)
            </h2>
            <p style={{ margin: '0.8rem auto 0', maxWidth: 720, color: p.text, opacity: 0.82, lineHeight: 1.75 }}>
              A small set of services that composes well, stays fast, and doesn’t crumble after launch.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.9rem' }}>
            {services.slice(0, 4).map((svc, i) => (
              <motion.div
                key={svc.title || i}
                style={{
                  gridColumn: 'span 6',
                  ...cardStyle,
                  padding: '1.6rem',
                  border: `1px solid ${p.primary}20`,
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={!prefersReducedMotion ? { y: -6, boxShadow: greenShadow } : {}}
                transition={{ duration: 0.28 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.95rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: `${p.primary}18`, border: `1px solid ${p.primary}25`, color: p.primary, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {getServiceIcon(svc.icon)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, color: p.text, fontSize: '1.05rem', marginBottom: '0.35rem' }}>{svc.title}</div>
                    <div style={{ fontSize: '0.93rem', color: p.text, opacity: 0.82, lineHeight: 1.75 }}>{truncateText(svc.desc, SERVICE_DESC_MAX)}</div>
                    {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                      <div style={{ marginTop: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                        {svc.featureList.slice(0, 2).map((f, j) => (
                          <span key={j} style={{ padding: '0.45rem 0.75rem', borderRadius: pillRadius, backgroundColor: `${p.primary}12`, border: `1px solid ${p.primary}25`, color: p.primary, fontSize: '0.8125rem', fontWeight: 600 }}>
                            {truncateText(f, 22)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Removed: team / gallery / testimonials / FAQ / pricing / CTA for this style */}

      {/* CONTACT + FOOTER */}
      <motion.section {...sectionReveal} id="contact" style={{ padding: '4.75rem 1.5rem', backgroundColor: `${p.primary}14`, borderTop: `1px solid ${p.primary}1a` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '1.25rem', alignItems: 'start' }}>
            <div style={{ borderRadius: cardRadius, backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: greenShadowSoft, border: `1px solid ${p.primary}25`, padding: '2.25rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.5rem 0.85rem', borderRadius: pillRadius, backgroundColor: `${p.primary}12`, border: `1px solid ${p.primary}25`, marginBottom: '1rem' }}>
                <span style={{ color: p.primary, display: 'flex', alignItems: 'center' }}>{LEAF_ICON}</span>
                <span style={{ fontWeight: 700, color: p.text, opacity: 0.9 }}>Contact</span>
              </div>
              <h2 style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: 0, color: p.text }}>
                {contact.pitch || 'Get in Touch'}
              </h2>
              <p style={{ margin: '0.9rem 0 0', color: p.text, opacity: 0.82, lineHeight: 1.75, maxWidth: 560 }}>
                Share the goal and the audience. We’ll respond with a simple plan you can maintain.
              </p>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.9rem', borderRadius: pillRadius, border: `1px solid ${p.primary}25`, backgroundColor: 'rgba(255,255,255,0.85)', boxShadow: greenShadowSoft, color: p.text, fontWeight: 700 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 9999, background: p.primary }} /> Email
                    </span>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${String(contact.phone).replace(/\\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.9rem', borderRadius: pillRadius, border: `1px solid ${p.primary}25`, backgroundColor: 'rgba(255,255,255,0.85)', boxShadow: greenShadowSoft, color: p.text, fontWeight: 700 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 9999, background: p.accent || p.primary }} /> Call
                    </span>
                  </a>
                )}
                {contact.address && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.65rem 0.9rem', borderRadius: pillRadius, border: `1px solid ${p.primary}25`, backgroundColor: 'rgba(255,255,255,0.85)', boxShadow: greenShadowSoft, color: p.text, fontWeight: 700 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 9999, background: p.secondary }} /> Studio
                  </span>
                )}
              </div>

              <div style={{ marginTop: '1.35rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.button
                  style={{ ...pillBtnPrimary, padding: '0.9rem 1.6rem', fontSize: '0.95rem' }}
                  whileHover={!prefersReducedMotion ? { scale: 1.02, boxShadow: greenShadow } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {contact.ctaLabel || 'Contact Us'}
                </motion.button>
                <motion.button
                  style={{ ...pillBtnSecondary, padding: '0.9rem 1.6rem', fontSize: '0.95rem' }}
                  whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                  onClick={() => scrollToSection('Services')}
                >
                  View services
                </motion.button>
              </div>
            </div>

            <div style={{ ...cardStyle, padding: '2.25rem', border: `1px solid ${p.primary}20`, backgroundColor: 'rgba(255,255,255,0.92)' }}>
              <div style={{ fontWeight: 800, color: p.text, fontSize: '1.05rem', marginBottom: '0.75rem' }}>What happens next</div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {['Reply within 24h', 'Quick fit check (scope + budget)', 'First draft plan in 48h'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 14, backgroundColor: `${p.primary}18`, border: `1px solid ${p.primary}25`, color: p.primary, fontWeight: 800, display: 'grid', placeItems: 'center' }}>
                      {i + 1}
                    </div>
                    <div style={{ color: p.text, opacity: 0.84, lineHeight: 1.65, fontWeight: 650 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: `1px solid ${p.primary}20`, display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', color: p.text, opacity: 0.75, fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: p.text }}>
              <span style={{ color: p.primary, display: 'flex', alignItems: 'center' }}>{LEAF_ICON}</span>
              {industry?.brandName || 'Webenox'}
            </div>
            <div>© {new Date().getFullYear()} built to last.</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default EcoNaturalLayout
