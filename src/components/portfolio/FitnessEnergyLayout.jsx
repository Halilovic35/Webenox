/**
 * FitnessEnergyLayout - Gym, sports, fitness dynamic design
 * Props: { industry, style }
 * DARK: bg #0f0f0f, surface #1e1b4b
 * PURPLE/VIOLET: #7c3aed, #6366f1 - energetic glow
 * Outfit font, 20px radius, energetic
 */
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot } from '../../utils/portfolioUtils'

const SERVICE_ICONS = {
  training: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  classes: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  nutrition: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  recovery: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  ),
  strength: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
  ),
  online: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const FitnessEnergyLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {}
  const red = p.primary || '#ef4444'
  const orange = p.secondary || '#f97316'
  const purple = p.accent || '#7c3aed'
  const bg = p.bg || '#0f0f0f'
  const surface = p.surface || '#1e1b4b'
  const text = p.text || '#f5f3ff'
  const muted = p.muted || '#c4b5fd'
  const radius = style?.theme?.radius?.cardRadius || '20px'
  const headingFont = style?.theme?.typography?.headingFont || "'Outfit', sans-serif"

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Programs', 'Pricing', 'Contact']
  const heroImage = '/images/fitness-hero.png' // Overridden for style
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

  const glowRed = `0 0 25px ${red}50, 0 0 50px ${red}25`
  const glowOrange = `0 0 25px ${orange}50, 0 0 50px ${orange}25`
  const glowPurple = `0 0 25px ${purple}50, 0 0 50px ${purple}25`

  const gradientBg = `linear-gradient(135deg, ${bg} 0%, ${surface} 40%, ${bg} 100%)`
  const heroGradient = heroImage
    ? `linear-gradient(180deg, ${bg}cc 0%, ${surface}80 40%, ${bg} 100%)`
    : `linear-gradient(135deg, ${bg} 0%, ${surface} 50%, ${red}20 100%)`

  const glassStyle = {
    backgroundColor: `${surface}cc`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${red}30`
  }

  return (
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        backgroundColor: bg,
        color: text,
        minHeight: '500px',
        letterSpacing: '-0.01em',
        background: gradientBg,
        maxWidth: '100%'
      }}
    >
      {/* NAVBAR: Dark with purple accent */}
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
          borderBottom: `2px solid ${red}30`,
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.25rem',
              color: text,
              textShadow: `0 0 25px ${red}50`,
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
            <NavLink key={label} label={label} purple={red} muted={muted} prefersReducedMotion={prefersReducedMotion} onClick={() => scrollToSection(label)} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
          <motion.button
            style={{
              borderRadius: radius,
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${red} 0%, ${orange} 100%)`,
              color: text,
              border: 'none',
              cursor: 'pointer',
              boxShadow: glowRed,
              whiteSpace: 'nowrap'
            }}
            whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: glowRed } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Join Today'}
          </motion.button>
        </div>
      </nav>

        {/* HERO: Full-width Immersive Cinematic Hero */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: `calc(${HERO_MIN_HEIGHT} + 8px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1.5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
          backgroundColor: bg
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            opacity: 0.7
          }}
        >
          <source src="/images/fire_loop.mp4" type="video/mp4" />
        </video>
        
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 100%)`,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, scale: 0.95 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ maxWidth: '900px', width: '100%', position: 'relative', zIndex: 2, flexShrink: 0 }}
        >
          <h1
            style={{
              fontFamily: headingFont,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textShadow: `0 4px 30px rgba(0,0,0,0.8)`
            }}
          >
            {hero.headline || 'Unleash Your Power'}
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.5,
              maxWidth: '600px',
              margin: '0 auto 1.5rem',
              fontWeight: 500,
              textShadow: `0 2px 10px rgba(0,0,0,0.5)`
            }}
          >
            {hero.subheadline || 'Join the movement and experience high-performance training like never before.'}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              style={{
                borderRadius: '50px',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                background: `linear-gradient(135deg, ${red} 0%, ${orange} 100%)`,
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: `0 10px 30px ${red}60`
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: `0 15px 40px ${red}80` } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.primaryCTA || 'Start Now'}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* SCOREBOARD (stats + trust) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section
          {...sectionReveal}
          style={{
            padding: '4rem 1.5rem',
            borderTop: `1px solid ${purple}25`,
            borderBottom: `1px solid ${purple}25`,
            background: `linear-gradient(180deg, transparent 0%, ${surface}30 100%)`
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted }}>
                Performance snapshot
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.70)' }}>Built for consistency, not hype.</div>
            </div>

            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
                {stats.slice(0, 4).map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{
                      gridColumn: 'span 3',
                      textAlign: 'left',
                      padding: '1.6rem 1.4rem',
                      borderRadius: radius,
                      ...glassStyle,
                      border: `1px solid ${purple}25`,
                      boxShadow: `0 0 30px ${purple}15`
                    }}
                    whileHover={!prefersReducedMotion ? { y: -6, boxShadow: glowPurple } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ fontSize: '2.15rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                      <span
                        style={{
                          background: `linear-gradient(135deg, ${red} 0%, ${orange} 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: `drop-shadow(0 0 18px ${purple}60)`
                        }}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: muted, fontWeight: 600, lineHeight: 1.35 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem' }}>
                {trustBadges.slice(0, 6).map((badge, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.65rem 0.9rem',
                      borderRadius: 999,
                      ...glassStyle,
                      border: `1px solid ${purple}25`,
                      color: 'rgba(255,255,255,0.82)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span style={{ color: purple, marginRight: 8 }}>★</span>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT: training philosophy */}
      {aboutSection && (
        <motion.section {...sectionReveal} id="about" style={{ padding: '4.75rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'start' }}>
              <div style={{ ...glassStyle, padding: '2rem', borderRadius: radius, border: `1px solid ${purple}30`, boxShadow: `0 0 30px ${purple}12` }}>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>
                  The method
                </div>
                <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: 0, color: text, textShadow: `0 0 30px ${purple}35` }}>
                  {aboutSection.title || 'About Us'}
                </h2>
                {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[0] && (
                  <p style={{ margin: '1rem 0 0', fontSize: '1rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
                    {truncateText(aboutSection.paragraphs[0], ABOUT_PARA_MAX)}
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gap: '0.9rem' }}>
                {(Array.isArray(aboutSection.paragraphs) ? aboutSection.paragraphs.slice(1, 3) : []).map((para, i) => (
                  <motion.div
                    key={i}
                    style={{ ...glassStyle, padding: '1.5rem', borderRadius: radius, border: `1px solid ${purple}25` }}
                    whileHover={!prefersReducedMotion ? { y: -6, boxShadow: glowPurple } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ fontWeight: 800, color: text, marginBottom: '0.35rem' }}>{i === 0 ? 'Consistency > intensity' : 'Recovery is training'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.75 }}>{truncateText(para, ABOUT_PARA_MAX)}</div>
                  </motion.div>
                ))}

                {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.25rem' }}>
                    {aboutSection.highlights.slice(0, 6).map((h, i) => (
                      <span key={i} style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${purple}35`, color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 700, backgroundColor: `${surface}70` }}>
                        {truncateText(h, 20)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* PROGRAMS: stacked lanes */}
      <motion.section {...sectionReveal} id="services" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>Programs</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', margin: 0, color: text, textShadow: `0 0 30px ${purple}40` }}>
              Pick your lane
            </h2>
            <p style={{ margin: '0.9rem auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>
              Three focused tracks with clear outcomes. Add-ons only when they earn their place.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.9rem' }}>
            {services.slice(0, 4).map((svc, i) => {
              const accent = i % 3 === 0 ? red : i % 3 === 1 ? orange : purple
              return (
                <motion.div
                  key={svc.title || i}
                  style={{
                    ...glassStyle,
                    padding: '1.75rem',
                    borderRadius: radius,
                    border: `1px solid ${accent}45`,
                    boxShadow: `0 0 30px ${accent}18`,
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 0.45fr) minmax(0, 0.55fr)',
                    gap: '1.25rem',
                    alignItems: 'start'
                  }}
                  whileHover={!prefersReducedMotion ? { y: -6, boxShadow: `0 0 45px ${accent}35` } : {}}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{ width: 54, height: 54, borderRadius: 18, background: `linear-gradient(135deg, ${accent} 0%, ${purple} 100%)`, display: 'grid', placeItems: 'center', boxShadow: `0 0 30px ${accent}35`, color: '#fff' }}>
                      {getServiceIcon(svc.icon)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem', color: text, letterSpacing: '-0.01em' }}>{svc.title}</div>
                      <div style={{ marginTop: '0.35rem', color: 'rgba(255,255,255,0.76)', lineHeight: 1.65 }}>{truncateText(svc.desc, SERVICE_DESC_MAX)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'flex-end' }}>
                    {(Array.isArray(svc.featureList) ? svc.featureList : [])
                      .slice(0, 4)
                      .map((f, j) => (
                        <span key={j} style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${accent}40`, backgroundColor: `${surface}70`, color: 'rgba(255,255,255,0.82)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                          {truncateText(f, 18)}
                        </span>
                      ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* TRANSFORMATION + COACHES / STORIES */}
      {(featuredCaseStudy || team.length > 0 || testimonials.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '5rem 1.5rem', borderTop: `1px solid ${purple}25`, borderBottom: `1px solid ${purple}25`, backgroundColor: `${surface}35` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'start' }}>
              <div style={{ ...glassStyle, padding: '2rem', borderRadius: radius, border: `1px solid ${purple}30`, boxShadow: `0 0 30px ${purple}14` }}>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>
                  Featured transformation
                </div>
                {featuredCaseStudy ? (
                  <>
                    <h3 style={{ fontWeight: 900, fontSize: '1.35rem', margin: 0, color: text }}>{featuredCaseStudy.title}</h3>
                    <p style={{ margin: '0.8rem 0 0', color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>{featuredCaseStudy.summary}</p>
                    {Array.isArray(featuredCaseStudy.metrics) && featuredCaseStudy.metrics.length > 0 && (
                      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {featuredCaseStudy.metrics.slice(0, 4).map((m, i) => (
                          <span key={i} style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${purple}35`, backgroundColor: `${surface}70`, color: 'rgba(255,255,255,0.86)', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 style={{ fontWeight: 900, fontSize: '1.35rem', margin: 0, color: text }}>Your next 8 weeks</h3>
                    <p style={{ margin: '0.8rem 0 0', color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>
                      Train with intent, track the basics, and win the week. The plan adapts, the standard stays.
                    </p>
                    <div style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem' }}>
                      {['2 strength days', '1 conditioning day', '1 recovery session', '10k steps baseline'].map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'rgba(255,255,255,0.82)', fontWeight: 700 }}>
                          <span style={{ width: 10, height: 10, borderRadius: 999, background: i % 2 === 0 ? red : purple, boxShadow: i % 2 === 0 ? glowRed : glowPurple }} />
                          {s}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'grid', gap: '0.9rem' }}>
                {team.length > 0 ? (
                  <div style={{ ...glassStyle, padding: '2rem', borderRadius: radius, border: `1px solid ${purple}25` }}>
                    <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>Team</div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '0.9rem'
                      }}
                    >
                      {team.slice(0, 3).map((member, i) => (
                        <motion.div
                          key={member.name || i}
                          style={{
                            minWidth: 0,
                            padding: '1.25rem',
                            borderRadius: radius,
                            border: `1px solid ${purple}25`,
                            backgroundColor: `${surface}80`,
                            textAlign: 'center',
                            overflow: 'hidden'
                          }}
                          whileHover={!prefersReducedMotion ? { y: -6, boxShadow: glowPurple } : {}}
                          transition={{ duration: 0.25 }}
                        >
                          <div style={{ width: 72, height: 72, borderRadius: 999, overflow: 'hidden', margin: '0 auto 0.75rem', border: `3px solid ${purple}60`, boxShadow: `0 0 20px ${purple}35` }}>
                            <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ fontWeight: 800, color: text }}>{member.name}</div>
                          <div style={{ fontSize: '0.85rem', color: muted }}>{member.role}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  testimonials.length > 0 && (
                    <div style={{ ...glassStyle, padding: '2rem', borderRadius: radius, border: `1px solid ${purple}25` }}>
                      <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>Stories</div>
                      {testimonials.slice(0, 2).map((t, i) => (
                        <div key={i} style={{ padding: '1.25rem', borderRadius: radius, border: `1px solid ${purple}25`, backgroundColor: `${surface}80`, marginBottom: i === 0 ? '0.9rem' : 0 }}>
                          <div style={{ color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', lineHeight: 1.7 }}>"{truncateText(t.quote, 220)}"</div>
                          <div style={{ marginTop: '0.75rem', fontWeight: 800, color: text }}>{t.author}</div>
                          <div style={{ fontSize: '0.85rem', color: muted }}>{t.role}</div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* CONTACT + FOOTER */}
      <motion.section {...sectionReveal} id="contact" style={{ padding: '5.25rem 1.5rem', background: `linear-gradient(135deg, ${surface} 0%, ${purple}25 100%)`, borderTop: `2px solid ${purple}40` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '1.25rem', alignItems: 'start' }}>
            <div style={{ ...glassStyle, padding: '2.25rem', borderRadius: radius, border: `1px solid ${purple}30`, boxShadow: `0 0 35px ${purple}15` }}>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>Ready</div>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', margin: 0, color: text, textShadow: `0 0 30px ${purple}50` }}>
                {contact.pitch || 'Start Your Journey'}
              </h2>
              <p style={{ margin: '0.9rem 0 0', color: 'rgba(255,255,255,0.76)', lineHeight: 1.75, maxWidth: 600 }}>
                Tell us your goal + schedule. We’ll answer with the simplest plan that moves the needle.
              </p>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none' }}>
                    <span style={{ padding: '0.65rem 0.9rem', borderRadius: 999, ...glassStyle, border: `1px solid ${purple}25`, color: 'rgba(255,255,255,0.86)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                      Email
                    </span>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${String(contact.phone).replace(/\\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                    <span style={{ padding: '0.65rem 0.9rem', borderRadius: 999, ...glassStyle, border: `1px solid ${purple}25`, color: 'rgba(255,255,255,0.86)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                      Call
                    </span>
                  </a>
                )}
                {contact.address && (
                  <span style={{ padding: '0.65rem 0.9rem', borderRadius: 999, ...glassStyle, border: `1px solid ${purple}25`, color: 'rgba(255,255,255,0.86)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                    Location
                  </span>
                )}
              </div>

              <div style={{ marginTop: '1.35rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <motion.button
                  style={{ borderRadius: radius, padding: '1rem 1.6rem', fontSize: '0.95rem', fontWeight: 900, background: `linear-gradient(135deg, ${red} 0%, ${orange} 100%)`, color: text, border: 'none', cursor: 'pointer', boxShadow: glowRed, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  whileHover={!prefersReducedMotion ? { y: -2, boxShadow: `0 0 60px ${purple}70` } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {contact.ctaLabel || 'Contact Us'}
                </motion.button>
                <motion.button
                  style={{ borderRadius: radius, padding: '1rem 1.6rem', fontSize: '0.95rem', fontWeight: 900, backgroundColor: 'transparent', color: text, border: `2px solid ${purple}55`, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  whileHover={!prefersReducedMotion ? { y: -2, borderColor: red, color: red } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                  onClick={() => scrollToSection('Programs')}
                >
                  View programs
                </motion.button>
              </div>
            </div>

            <div style={{ ...glassStyle, padding: '2.25rem', borderRadius: radius, border: `1px solid ${purple}30` }}>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>What happens next</div>
              <div style={{ display: 'grid', gap: '0.8rem' }}>
                {['Reply within 24h', 'Quick goal + baseline check', 'Your plan + schedule'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 14, backgroundColor: `${surface}90`, border: `1px solid ${purple}30`, display: 'grid', placeItems: 'center', color: purple, fontWeight: 900 }}>
                      {i + 1}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, fontWeight: 650 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: `1px solid ${purple}30`, display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', color: muted, fontSize: '0.85rem' }}>
            <div style={{ fontWeight: 900, color: text }}>{industry?.brandName || 'Webenox'}</div>
            <div style={{ opacity: 0.85 }}>© {new Date().getFullYear()} stay consistent.</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

const NavLink = ({ label, purple, muted, prefersReducedMotion, onClick }) => {
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
        fontWeight: 600,
        color: hovered ? purple : muted,
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
          bottom: -5,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${purple}, #6366f1)`,
          borderRadius: 1,
          boxShadow: `0 0 12px ${purple}80`,
          transformOrigin: 'left'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </motion.span>
  )
}

export default FitnessEnergyLayout
