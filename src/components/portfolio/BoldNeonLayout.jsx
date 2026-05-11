/**
 * BoldNeonLayout - Futuristic tech/SaaS design
 * Props: { industry, style }
 * DARK: bg #0f172a, surface #1e293b
 * CYAN/PURPLE neon: #22d3ee, #a78bfa - glowing effects
 * Space Grotesk font, 16px radius, glassmorphism
 */
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot } from '../../utils/portfolioUtils'

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
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const BoldNeonLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {}
  const cyan = p.primary || '#22d3ee'
  const pink = p.secondary || '#ec4899'
  const purple = p.accent || '#8b5cf6'
  const bg = p.bg || '#0f172a'
  const surface = p.surface || '#1e293b'
  const text = p.text || '#f8fafc'
  const muted = p.muted || '#94a3b8'
  const radius = style?.theme?.radius?.cardRadius || '16px'

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const testimonials = industry?.testimonials || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = industry?.heroImage || null
  const aboutSection = industry?.aboutSection || null
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

  const glowCyan = `0 0 20px ${cyan}40, 0 0 40px ${cyan}20`
  const glowPink = `0 0 20px ${pink}40, 0 0 40px ${pink}20`
  const glowPurple = `0 0 20px ${purple}40, 0 0 40px ${purple}20`
  const glowCyanStrong = `0 0 30px ${cyan}60, 0 0 60px ${cyan}30`

  const glassStyle = {
    backgroundColor: `${surface}cc`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${cyan}25`
  }

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        backgroundColor: bg,
        color: text,
        minHeight: '500px',
        letterSpacing: '-0.02em',
        maxWidth: '100%'
      }}
    >
      {/* NAVBAR: Glass bg blur, neon underline on nav hover */}
      <nav
        style={{
          ...glassStyle,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderBottom: `1px solid ${cyan}20`,
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: text,
              textShadow: `0 0 20px ${cyan}50`,
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
            <NavLink key={label} label={label} cyan={cyan} muted={muted} prefersReducedMotion={prefersReducedMotion} onClick={() => scrollToSection(label)} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
          <motion.button
            style={{
              borderRadius: '12px',
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: cyan,
              color: bg,
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 0 20px ${cyan}50`,
              whiteSpace: 'nowrap'
            }}
            whileHover={!prefersReducedMotion ? { scale: 1.03, boxShadow: glowCyanStrong } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* HERO: BENTO GRID, mixed-size cards (unique pattern) */}
      <section
        id="hero"
        style={{
          height: HERO_MIN_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundImage: heroImage
            ? `linear-gradient(180deg, ${bg}ee 0%, ${bg} 50%), url(${heroImage})`
            : `linear-gradient(135deg, ${bg} 0%, ${surface} 50%, ${bg} 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '1rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              gridRow: '1 / 3',
              ...glassStyle,
              padding: '2rem',
              borderRadius: radius,
              border: `1px solid ${cyan}25`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2, marginBottom: '0.75rem', color: text, textShadow: `0 0 20px ${cyan}40` }}>
              {hero.headline || 'Build What\'s Next'}
            </h1>
            <p style={{ fontSize: '0.9375rem', color: muted, lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {hero.subheadline || ''}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <motion.button
              style={{
                borderRadius: '12px',
                padding: '0.875rem 1.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: cyan,
                color: bg,
                border: 'none',
                cursor: 'pointer',
                boxShadow: glowCyanStrong
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: `0 0 40px ${cyan}70` } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.primaryCTA || 'Start Free Trial'}
            </motion.button>
            <motion.button
              style={{
                borderRadius: '12px',
                padding: '0.875rem 1.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'transparent',
                color: pink,
                border: `2px solid ${pink}`,
                cursor: 'pointer',
                boxShadow: `0 0 15px ${pink}30`
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.03, boxShadow: glowPink } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.secondaryCTA || 'Watch Demo'}
            </motion.button>
            </div>
          </div>
          <div
            style={{
              minHeight: '140px',
              borderRadius: radius,
              backgroundImage: heroImage ? `url(${heroImage})` : `linear-gradient(135deg, ${cyan}20 0%, ${purple}15 100%)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...glassStyle,
              border: `1px solid ${cyan}30`
            }}
          />
          <div style={{ ...glassStyle, padding: '1.25rem', borderRadius: radius, border: `1px solid ${purple}25` }}>
            {Array.isArray(hero.bulletPoints) && hero.bulletPoints.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {hero.bulletPoints.slice(0, 4).map((point, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: text }}>
                    <span style={{ color: cyan }}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: '0.875rem', color: muted }}>Trusted by teams worldwide</div>
            )}
          </div>
        </div>
      </section>

      {/* METRICS STRIP (stats + trust) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '3.75rem 1.5rem', borderTop: `1px solid ${cyan}20`, borderBottom: `1px solid ${cyan}20`, backgroundColor: `${surface}30` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
                {stats.slice(0, 4).map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{ gridColumn: 'span 3', padding: '1.5rem', borderRadius: radius, ...glassStyle, border: `1px solid ${cyan}20` }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: glowCyan } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ fontSize: '1.85rem', fontWeight: 700, color: cyan, marginBottom: '0.25rem', textShadow: `0 0 20px ${cyan}50` }}>{stat.value}</div>
                    <div style={{ fontSize: '0.875rem', color: muted, lineHeight: 1.35 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                {trustBadges.slice(0, 6).map((badge, i) => (
                  <span key={i} style={{ padding: '0.6rem 0.9rem', borderRadius: 999, ...glassStyle, border: `1px solid ${cyan}20`, color: muted, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    <span style={{ color: cyan, marginRight: 8 }}>✓</span>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT: ops terminal */}
      {aboutSection && (
        <motion.section {...sectionReveal} id="about" style={{ padding: '4.75rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ ...glassStyle, borderRadius: radius, border: `1px solid ${cyan}25`, overflow: 'hidden', boxShadow: glowCyan }}>
              <div style={{ padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: `${surface}ee`, borderBottom: `1px solid ${cyan}15` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: pink, boxShadow: glowPink }} />
                  <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: cyan, boxShadow: glowCyan }} />
                  <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: purple, boxShadow: glowPurple }} />
                </div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>ops</div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ fontWeight: 700, fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', color: text, textShadow: `0 0 20px ${cyan}30` }}>
                  {aboutSection.title || 'About Us'}
                </div>

                {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[0] && (
                  <div style={{ marginTop: '0.85rem', color: muted, lineHeight: 1.8, fontSize: '1rem' }}>
                    <span style={{ color: cyan }}>$</span> {truncateText(aboutSection.paragraphs[0], ABOUT_PARA_MAX)}
                  </div>
                )}

                {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[1] && (
                  <div style={{ marginTop: '0.65rem', color: muted, lineHeight: 1.8 }}>
                    <span style={{ color: cyan }}>$</span> {truncateText(aboutSection.paragraphs[1], ABOUT_PARA_MAX)}
                  </div>
                )}

                {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
                  <div style={{ marginTop: '1.35rem', display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                    {aboutSection.highlights.slice(0, 6).map((h, i) => (
                      <span key={i} style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${cyan}35`, backgroundColor: `${surface}80`, color: text, fontSize: '0.85rem', fontWeight: 600 }}>
                        {truncateText(h, 18)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Removed: process / why-choose-us for this style */}

      {/* SERVICES: Glass cards with blur, neon border on hover, grid layout */}
      <section
        id="services"
        style={{
          padding: '4rem 1.5rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: '1.75rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: text,
            textShadow: `0 0 20px ${cyan}30`
          }}
        >
          Our Services
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
                ...glassStyle,
                padding: '1.5rem',
                borderRadius: radius,
                border: `1px solid ${cyan}15`,
                transition: 'all 0.3s ease'
              }}
              whileHover={
                !prefersReducedMotion
                  ? {
                      borderColor: `${cyan}60`,
                      boxShadow: glowCyan
                    }
                  : {}
              }
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  color: cyan,
                  marginBottom: '1rem',
                  filter: `drop-shadow(0 0 8px ${cyan}60)`
                }}
              >
                {getServiceIcon(svc.icon)}
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '1.0625rem',
                  marginBottom: '0.5rem',
                  color: text
                }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: muted,
                  lineHeight: 1.45,
                  marginBottom: Array.isArray(svc.featureList) && svc.featureList.length ? '0.5rem' : 0
                }}
              >
                {truncateText(svc.desc, SERVICE_DESC_MAX)}
              </p>
              {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                <p style={{ margin: 0, fontSize: '0.75rem', color: muted, opacity: 0.9 }}>
                  {svc.featureList.join(' · ')}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIGNAL (case study or quote) */}
      {(featuredCaseStudy || testimonials.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '4.75rem 1.5rem', backgroundColor: `${surface}40`, borderTop: `1px solid ${cyan}20`, borderBottom: `1px solid ${cyan}20` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cyan, letterSpacing: '0.18em', textTransform: 'uppercase', textShadow: `0 0 18px ${cyan}45` }}>
                Signal
              </div>
              <h2 style={{ margin: '0.75rem 0 0', fontWeight: 700, fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', color: text, textShadow: `0 0 20px ${cyan}30` }}>
                One proof point
              </h2>
            </div>

            {featuredCaseStudy ? (
              <div style={{ ...glassStyle, padding: '2rem', borderRadius: radius, border: `1px solid ${cyan}30`, boxShadow: glowCyan }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cyan, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>Featured case</div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: text }}>{featuredCaseStudy.title}</div>
                <div style={{ marginTop: '0.8rem', color: muted, lineHeight: 1.75 }}>{featuredCaseStudy.summary}</div>
                {Array.isArray(featuredCaseStudy.metrics) && featuredCaseStudy.metrics.length > 0 && (
                  <div style={{ marginTop: '1.15rem', display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                    {featuredCaseStudy.metrics.slice(0, 4).map((m, i) => (
                      <span key={i} style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${cyan}35`, backgroundColor: `${surface}80`, color: text, fontWeight: 600 }}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ ...glassStyle, padding: '2rem', borderRadius: radius, border: `1px solid ${cyan}30`, boxShadow: glowCyan }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cyan, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>Client quote</div>
                <div style={{ color: text, fontStyle: 'italic', lineHeight: 1.75, fontSize: '1.05rem' }}>
                  “{truncateText(testimonials[0]?.quote || '', 240)}”
                </div>
                <div style={{ marginTop: '1rem', fontWeight: 600, color: text }}>{testimonials[0]?.author}</div>
                <div style={{ color: muted, fontSize: '0.875rem' }}>{testimonials[0]?.role}</div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* CONTACT: Dark with neon CTA */}
      <section
        id="contact"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: `${surface}60`,
          borderTop: `1px solid ${cyan}25`
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              color: text,
              textShadow: `0 0 20px ${cyan}30`
            }}
          >
            {contact.pitch || 'Get in Touch'}
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              fontSize: '0.9375rem',
              color: muted
            }}
          >
            {contact.address && <p style={{ margin: 0 }}>{contact.address}</p>}
            {contact.phone && <p style={{ margin: 0 }}>{contact.phone}</p>}
            {contact.email && <p style={{ margin: 0 }}>{contact.email}</p>}
            {contact.hours && <p style={{ margin: 0 }}>{contact.hours}</p>}
          </div>
          <motion.button
            style={{
              borderRadius: '12px',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              backgroundColor: cyan,
              color: bg,
              border: 'none',
              cursor: 'pointer',
              boxShadow: glowCyanStrong
            }}
            whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: `0 0 50px ${cyan}70` } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {contact.ctaLabel || 'Contact Us'}
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2.5rem 1.5rem', backgroundColor: surface, color: text, borderTop: `1px solid ${cyan}25` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.75rem' }}>{industry?.brandName || 'Webenox'}</div>
            {mission && <p style={{ fontSize: '0.875rem', opacity: 0.85, lineHeight: 1.5, color: muted }}>{mission}</p>}
          </div>
          {specialties.length > 0 && (
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Our Specialties</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', opacity: 0.85, color: muted }}>
                {specialties.slice(0, 4).map((s, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}
              </ul>
            </div>
          )}
          {relatedResources.length > 0 && (
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Quick Links</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', opacity: 0.85, color: muted }}>
                {relatedResources.slice(0, 4).map((r, i) => <li key={i} style={{ marginBottom: '0.25rem', cursor: 'pointer', textDecoration: 'underline' }}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ maxWidth: '1000px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: `1px solid ${cyan}20`, fontSize: '0.8125rem', opacity: 0.7, textAlign: 'center', color: muted }}>
          © {new Date().getFullYear()} {industry?.brandName || 'Webenox'}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

const NavLink = ({ label, cyan, muted, prefersReducedMotion, onClick }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.span
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '0.75rem',
        color: hovered ? cyan : muted,
        cursor: 'pointer',
        position: 'relative',
        transition: 'color 0.2s ease',
        whiteSpace: 'nowrap'
      }}
    >
      {label}
      <motion.span
        style={{
          position: 'absolute',
          bottom: -4,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: cyan,
          borderRadius: 1,
          boxShadow: `0 0 10px ${cyan}80`,
          transformOrigin: 'left'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.span>
  )
}

export default BoldNeonLayout
