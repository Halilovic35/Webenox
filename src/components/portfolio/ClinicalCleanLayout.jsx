/**
 * ClinicalCleanLayout - Complete website preview with Clinical Clean aesthetic
 * Props: { industry, style }
 * White/light bg, minimal, Inter font, 12px card radius, 8px button radius
 * Scroll animations, hover effects, compact for preview window
 */
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, HERO_MIN_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot, colorWithAlpha } from '../../utils/portfolioUtils'

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
  preventive: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  telehealth: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  lab: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
  ),
  hair: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  ),
  skin: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  wellness: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  dining: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  platform: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

const ClinicalCleanLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {
    primary: '#0ea5e9',
    secondary: '#64748b',
    accent: '#06b6d4',
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#64748b'
  }
  const cardRadius = style?.theme?.radius?.cardRadius || '12px'
  const buttonRadius = style?.theme?.radius?.buttonRadius || '8px'

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = '/images/clinical-hero.png' // Overridden for style
  const aboutSection = industry?.aboutSection || null
  const trustBadges = industry?.trustBadges || []
  const featuredCaseStudy = industry?.featuredCaseStudy || null

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches

  const previewScrollRoot = useMemo(() => getPortfolioPreviewScrollRoot(), [])

  const sectionReveal = useMemo(() => {
    if (prefersReducedMotion) return {}
    return {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.45 },
      viewport: {
        once: true,
        amount: 0.15,
        margin: '0px 0px -12% 0px',
        ...(previewScrollRoot ? { root: previewScrollRoot } : {})
      }
    }
  }, [prefersReducedMotion, previewScrollRoot])

  const baseStyles = {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: p.bg || '#f0fdfa',
    color: p.text,
    minHeight: '500px',
    transformOrigin: 'top center',
    maxWidth: '100%'
  }

  const cardStyle = {
    borderRadius: cardRadius,
    backgroundColor: p.surface,
    border: `1px solid ${p.muted}20`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  const btnPrimaryStyle = {
    borderRadius: buttonRadius,
    backgroundColor: p.primary,
    color: p.bg,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const btnSecondaryStyle = {
    borderRadius: buttonRadius,
    backgroundColor: colorWithAlpha(p.surface, 0),
    color: p.text,
    border: `1px solid ${p.muted}50`,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={baseStyles}>
      {/* NAVBAR: minimal medical - mint-tinted bg */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: p.surface,
          borderBottom: `2px solid ${p.secondary || p.primary}20`,
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '1.25rem',
              color: p.text
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
                fontSize: '0.875rem',
                color: p.muted,
                cursor: 'pointer'
              }}
              whileHover={!prefersReducedMotion ? { color: p.primary } : {}}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            style={{ ...btnPrimaryStyle, padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            whileHover={!prefersReducedMotion ? { scale: 1.02, boxShadow: `0 4px 12px ${p.primary}40` } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
          >
            {hero.primaryCTA || 'Get Started'}
          </motion.button>
        </div>
      </nav>

      {/* HERO: Clean Medical SaaS Layout */}
      <section
        id="hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1.5rem 1.5rem 0',
          height: HERO_MIN_HEIGHT,
          backgroundColor: p.surface,
          backgroundImage: `linear-gradient(180deg, ${p.bg} 0%, ${p.surface} 100%)`,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '2rem', flexShrink: 0 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.35rem 0.85rem', borderRadius: '50px', backgroundColor: `${p.primary}15`, color: p.primary, fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', border: `1px solid ${p.primary}30`, letterSpacing: '0.02em' }}>
            {industry?.shortLabel ? `Next-Gen ${industry.shortLabel}` : 'Next-Gen Platform'}
          </span>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.1,
              marginBottom: '1rem',
              color: p.text,
              letterSpacing: '-0.03em'
            }}
          >
            {hero.headline || 'Modernizing Medical Care'}
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: p.muted,
              lineHeight: 1.5,
              marginBottom: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto 1.5rem',
              fontWeight: 400
            }}
          >
            {hero.subheadline || 'Providing world-class medical services with a patient-first approach. Manage everything in one place.'}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', borderRadius: '8px', border: `1px solid ${p.muted}30`, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ flex: 1, padding: '0.75rem 1rem', border: 'none', outline: 'none', fontSize: '0.875rem', color: p.text, backgroundColor: 'transparent' }}
              />
              <motion.button
                style={{ ...btnPrimaryStyle, borderRadius: 0, padding: '0 1.5rem', fontSize: '0.875rem', margin: 0, height: '100%' }}
                whileHover={!prefersReducedMotion ? { backgroundColor: p.accent } : {}}
              >
                {hero.primaryCTA || 'Get Started'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 60 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {/* Dashboard Preview Wrapper with Image */}
          <div style={{ 
            width: '100%', 
            flex: 1,
            backgroundColor: '#ffffff', 
            borderRadius: '16px 16px 0 0', 
            border: `1px solid ${p.muted}20`, 
            borderBottom: 'none',
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              minHeight: '200px',
              backgroundImage: heroImage ? `url(${heroImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat'
            }}>
              {!heroImage && (
                <div style={{ padding: '2rem', textAlign: 'center', color: p.muted }}>Dashboard Image placeholder</div>
              )}
            </div>
            
            {/* Fade out gradient at bottom so it blends with section below */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: `linear-gradient(180deg, transparent 0%, #ffffff 100%)` }} />
          </div>
        </motion.div>
      </section>

      {/* EVIDENCE (stats + trust) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '2.25rem 1rem', backgroundColor: p.surface, borderTop: `1px solid ${p.muted}15`, borderBottom: `1px solid ${p.muted}15` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.75rem' }}>
                {stats.slice(0, 4).map((stat, i) => (
                  <div key={i} style={{ gridColumn: 'span 3', padding: '1rem 1.1rem', borderRadius: cardRadius, border: `1px solid ${p.muted}18`, backgroundColor: `${p.bg}80` }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: p.primary, marginBottom: '0.2rem' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8125rem', color: p.muted, lineHeight: 1.35 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
                {trustBadges.slice(0, 6).map((badge, i) => (
                  <span key={i} style={{ padding: '0.5rem 0.8rem', borderRadius: 999, border: `1px solid ${p.muted}18`, backgroundColor: `${p.bg}80`, color: p.muted, fontSize: '0.8125rem', fontWeight: 650 }}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT SECTION: title, paragraphs, highlights */}
      {aboutSection && (
        <section id="about" style={{ padding: '3rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem', color: p.text }}>
            {aboutSection.title || 'About Us'}
          </h2>
          {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs.map((para, i) => (
            <p key={i} style={{ fontSize: '1rem', color: p.muted, lineHeight: 1.75, marginBottom: '1.25rem', textAlign: 'center' }}>
              {truncateText(para, ABOUT_PARA_MAX)}
            </p>
          ))}
          {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              {aboutSection.highlights.map((h, i) => (
                <span key={i} style={{ padding: '0.5rem 1rem', borderRadius: buttonRadius, backgroundColor: `${p.primary}15`, color: p.primary, fontSize: '0.875rem', fontWeight: 500 }}>
                  {h}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Removed: process / why-choose-us / long grids for this style */}

      {/* SERVICES: clinical table */}
      <motion.section {...sectionReveal} id="services" style={{ padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', margin: 0, color: p.text }}>
              Services
            </h2>
            <p style={{ margin: '0.75rem auto 0', maxWidth: 720, color: p.muted, lineHeight: 1.6 }}>
              Clear scope, clean handoff, measurable outcomes.
            </p>
          </div>

          <div style={{ borderRadius: cardRadius, border: `1px solid ${p.muted}18`, overflow: 'hidden', backgroundColor: p.surface }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1.2fr 1.6fr 1fr', gap: '0.75rem', padding: '0.85rem 1rem', backgroundColor: `${p.bg}`, color: p.muted, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <div />
              <div>Service</div>
              <div>Description</div>
              <div>Includes</div>
            </div>
            {services.slice(0, 4).map((svc, i) => (
              <div key={svc.title || i} style={{ display: 'grid', gridTemplateColumns: '40px 1.2fr 1.6fr 1fr', gap: '0.75rem', padding: '1rem', borderTop: `1px solid ${p.muted}12`, alignItems: 'start' }}>
                <div style={{ color: p.primary }}>{getServiceIcon(svc.icon)}</div>
                <div style={{ fontWeight: 750, color: p.text, lineHeight: 1.35 }}>{svc.title}</div>
                <div style={{ color: p.muted, lineHeight: 1.55 }}>{truncateText(svc.desc, SERVICE_DESC_MAX)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {(Array.isArray(svc.featureList) ? svc.featureList : []).slice(0, 2).map((f, j) => (
                    <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: p.muted, fontSize: '0.8125rem' }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: p.primary }} />
                      {truncateText(f, 26)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CLINICAL PROOF (case study + care team / testimonial) */}
      {(featuredCaseStudy || team.length > 0 || testimonials.length > 0) && (
        <motion.section {...sectionReveal} style={{ padding: '3.25rem 1rem', backgroundColor: `${p.muted}08`, borderTop: `1px solid ${p.muted}12` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: '1rem', alignItems: 'start' }}>
              <div style={{ ...cardStyle, padding: '1.75rem', borderLeft: `4px solid ${p.primary}` }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.primary, marginBottom: '0.6rem' }}>
                  Featured
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem', color: p.text }}>
                  {featuredCaseStudy?.title || 'Operational improvements'}
                </div>
                <div style={{ marginTop: '0.75rem', color: p.muted, lineHeight: 1.65 }}>
                  {featuredCaseStudy?.summary || 'A short, measurable engagement focused on patient flow, intake, and communication.'}
                </div>
                {Array.isArray(featuredCaseStudy?.metrics) && featuredCaseStudy.metrics.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {featuredCaseStudy.metrics.slice(0, 4).map((m, i) => (
                      <span key={i} style={{ padding: '0.45rem 0.7rem', borderRadius: 999, border: `1px solid ${p.muted}18`, backgroundColor: p.surface, color: p.text, fontWeight: 700, fontSize: '0.8125rem' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ ...cardStyle, padding: '1.75rem' }}>
                <div style={{ fontWeight: 800, color: p.text, marginBottom: '0.85rem' }}>
                  {team.length > 0 ? 'Care team' : 'Patient note'}
                </div>
                {team.length > 0 ? (
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {team.slice(0, 3).map((member, i) => (
                      <div key={member.name || i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 999, overflow: 'hidden', border: `2px solid ${p.muted}15`, flexShrink: 0 }}>
                          <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 750, color: p.text, lineHeight: 1.25 }}>{member.name}</div>
                          <div style={{ fontSize: '0.8125rem', color: p.muted }}>{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: p.text, opacity: 0.9, fontStyle: 'italic', lineHeight: 1.65 }}>
                    “{truncateText(testimonials[0]?.quote || 'Clear communication and a smooth experience from start to finish.', 220)}”
                    <div style={{ marginTop: '0.85rem', fontStyle: 'normal', fontWeight: 750, color: p.text }}>{testimonials[0]?.author}</div>
                    <div style={{ fontSize: '0.8125rem', color: p.muted }}>{testimonials[0]?.role}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* CONTACT + FOOTER */}
      <motion.section {...sectionReveal} id="contact" style={{ padding: '4rem 1rem', backgroundColor: `${p.muted}12`, borderTop: `1px solid ${p.muted}20` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '1rem', alignItems: 'start' }}>
            <div style={{ ...cardStyle, padding: '2rem' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', margin: 0, color: p.text }}>
                {contact.pitch || 'Get in Touch'}
              </h2>
              <p style={{ margin: '0.85rem 0 0', color: p.muted, lineHeight: 1.6, maxWidth: 560 }}>
                Share your goal and timeline. We’ll respond with a clear next step.
              </p>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none' }}>
                    <span style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${p.muted}18`, backgroundColor: p.surface, color: p.text, fontWeight: 700, fontSize: '0.8125rem' }}>
                      Email
                    </span>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${String(contact.phone).replace(/\\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                    <span style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${p.muted}18`, backgroundColor: p.surface, color: p.text, fontWeight: 700, fontSize: '0.8125rem' }}>
                      Call
                    </span>
                  </a>
                )}
                {contact.address && (
                  <span style={{ padding: '0.55rem 0.85rem', borderRadius: 999, border: `1px solid ${p.muted}18`, backgroundColor: p.surface, color: p.text, fontWeight: 700, fontSize: '0.8125rem' }}>
                    Location
                  </span>
                )}
              </div>

              <div style={{ marginTop: '1.35rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.button
                  style={{ ...btnPrimaryStyle, padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
                  whileHover={!prefersReducedMotion ? { y: -2, boxShadow: `0 10px 26px ${p.primary}25` } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {contact.ctaLabel || 'Contact Us'}
                </motion.button>
                <motion.button
                  style={{ ...btnSecondaryStyle, padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
                  whileHover={!prefersReducedMotion ? { y: -2, borderColor: `${p.primary}60`, color: p.primary } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                  onClick={() => scrollToSection('Services')}
                >
                  View services
                </motion.button>
              </div>
            </div>

            <div style={{ ...cardStyle, padding: '2rem' }}>
              <div style={{ fontWeight: 800, color: p.text, marginBottom: '0.85rem' }}>What happens next</div>
              <div style={{ display: 'grid', gap: '0.75rem', color: p.muted, lineHeight: 1.6 }}>
                {['Reply within 24h', 'Quick scope check', 'First draft plan'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 999, backgroundColor: `${p.primary}18`, border: `1px solid ${p.primary}25`, color: p.primary, fontWeight: 800, display: 'grid', placeItems: 'center' }}>
                      {i + 1}
                    </div>
                    <div style={{ fontWeight: 650 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: `1px solid ${p.muted}18`, display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', color: p.muted, fontSize: '0.875rem' }}>
            <div style={{ fontWeight: 800, color: p.text }}>{industry?.brandName || 'Webenox'}</div>
            <div>© {new Date().getFullYear()} clinically simple.</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default ClinicalCleanLayout
