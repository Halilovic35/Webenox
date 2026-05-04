import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HERO_MIN_HEIGHT, colorWithAlpha } from '../utils/portfolioUtils'
import ClinicalCleanLayout from './portfolio/ClinicalCleanLayout'
import LuxuryNoirLayout from './portfolio/LuxuryNoirLayout'
import SoftPastelLayout from './portfolio/SoftPastelLayout'
import BoldNeonLayout from './portfolio/BoldNeonLayout'
import WarmArtisanLayout from './portfolio/WarmArtisanLayout'
import CorporateTrustLayout from './portfolio/CorporateTrustLayout'
import FitnessEnergyLayout from './portfolio/FitnessEnergyLayout'
import CreativeStudioLayout from './portfolio/CreativeStudioLayout'
import EcoNaturalLayout from './portfolio/EcoNaturalLayout'

const LAYOUT_MAP = {
  'clinical-clean': ClinicalCleanLayout,
  'luxury-noir': LuxuryNoirLayout,
  'soft-pastel': SoftPastelLayout,
  'bold-neon': BoldNeonLayout,
  'warm-artisan': WarmArtisanLayout,
  'corporate-trust': CorporateTrustLayout,
  'fitness-energy': FitnessEnergyLayout,
  'creative-studio': CreativeStudioLayout,
  'eco-natural': EcoNaturalLayout
}

const getLayoutSwapMotion = (styleId, industryId) => {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches

  if (prefersReducedMotion) {
    return {
      initial: {},
      animate: {},
      exit: {},
      transition: { duration: 0 }
    }
  }

  const key = `${industryId || 'industry'}::${styleId || 'style'}`

  const presets = {
    'soft-pastel': { initial: { opacity: 0, y: 18, scale: 0.985 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -14, scale: 0.99 } },
    'luxury-noir': { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -18 } },
    'clinical-clean': { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } },
    'corporate-trust': { initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -14 } },
    'creative-studio': { initial: { opacity: 0, rotate: -0.6, y: 14 }, animate: { opacity: 1, rotate: 0, y: 0 }, exit: { opacity: 0, rotate: 0.45, y: -12 } },
    'eco-natural': { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } },
    'fitness-energy': { initial: { opacity: 0, x: -18, y: 10 }, animate: { opacity: 1, x: 0, y: 0 }, exit: { opacity: 0, x: 16, y: -8 } },
    'warm-artisan': { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -14 } },
    'bold-neon': { initial: { opacity: 0, scale: 0.98, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 1.01, y: -10 } }
  }

  const base =
    presets[styleId] || {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 }
    }

  // Tiny deterministic variance so swaps never feel identical even if style ids repeat in dev
  const n = (key.length % 7) - 3
  return {
    initial: { ...base.initial, x: (base.initial?.x ?? 0) + n * 0.5 },
    animate: base.animate,
    exit: base.exit,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const SERVICE_ICONS = {
  clinic: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  specialist: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  care: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  hair: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  ),
  skin: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  wellness: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  dining: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  events: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  catering: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
  ),
  platform: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  integrations: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  training: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  classes: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ),
  nutrition: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  courses: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  workshops: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  cert: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  ),
  buy: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  ),
  sell: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  rent: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  ),
  legal: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
  ),
  consulting: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
  ),
  rep: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  build: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  ),
  maintenance: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  consult: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
  )
}

const spacingMap = {
  compact: { section: '1.5rem', card: '1rem', hero: '2rem' },
  balanced: { section: '2rem', card: '1.25rem', hero: '2.5rem' },
  relaxed: { section: '2.5rem', card: '1.5rem', hero: '3rem' },
  generous: { section: '3rem', card: '1.75rem', hero: '3.5rem' }
}

const PortfolioLivePreview = ({ industry, style }) => {
  const LayoutComponent = LAYOUT_MAP[style?.id]
  const swapMotion = useMemo(() => getLayoutSwapMotion(style?.id, industry?.id), [style?.id, industry?.id])

  if (LayoutComponent) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${industry?.id || 'industry'}-${style?.id || 'style'}`}
          initial={swapMotion.initial}
          animate={swapMotion.animate}
          exit={swapMotion.exit}
          transition={swapMotion.transition}
          style={{ minHeight: '100%' }}
        >
          <LayoutComponent industry={industry} style={style} />
        </motion.div>
      </AnimatePresence>
    )
  }

  const t = style.theme
  const p = t.palette
  const spacing = spacingMap[style.spacing] || spacingMap.balanced

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches
  const transitionDuration = prefersReducedMotion ? 0 : 0.4

  const containerHeightStyle = {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column'
  }

  const bgStyle = () => {
    if (t.background.type === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${p.bg} 0%, ${p.surface} 100%)`
      }
    }
    if (t.background.type === 'noise') {
      return {
        backgroundColor: p.bg,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundBlendMode: 'overlay'
      }
    }
    return { backgroundColor: p.bg }
  }

  const cardStyle = () => {
    const base = {
      borderRadius: t.radius.cardRadius,
      backgroundColor: t.card.glass ? `${p.surface}80` : p.surface,
      color: p.text,
      padding: spacing.card,
      transition: `all ${transitionDuration}s ease`
    }
    if (t.card.border) base.border = `1px solid ${p.muted}30`
    if (t.card.glass) base.backdropFilter = 'blur(12px)'
    if (t.shadow.cardShadowLevel === 'sm') base.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
    if (t.shadow.cardShadowLevel === 'md') base.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'
    if (t.shadow.cardShadowLevel === 'lg') base.boxShadow = '0 20px 60px rgba(0,0,0,0.25)'
    if (t.shadow.cardShadowLevel === 'glow') base.boxShadow = `0 0 40px ${p.primary}40, 0 4px 20px rgba(0,0,0,0.2)`
    return base
  }

  const btnPrimaryStyle = () => {
    const base = {
      borderRadius: t.radius.buttonRadius,
      fontWeight: 600,
      transition: `all ${transitionDuration}s ease`
    }
    if (t.button.type === 'solid') {
      base.backgroundColor = p.primary
      base.color = p.bg
      if (t.shadow.cardShadowLevel === 'glow') base.boxShadow = `0 0 20px ${p.primary}50`
    } else {
      base.border = `2px solid ${p.primary}`
      base.color = p.primary
      base.backgroundColor = colorWithAlpha(p.primary, 0)
    }
    return base
  }

  const btnSecondaryStyle = () => ({
    borderRadius: t.radius.buttonRadius,
    border: `1px solid ${p.muted}50`,
    color: p.text,
    backgroundColor: colorWithAlpha(p.surface, 0),
    transition: `all ${transitionDuration}s ease`
  })

  const heroBgImage = industry.heroImage
    ? { backgroundImage: `linear-gradient(to bottom, ${p.bg}99 0%, ${p.bg}cc 50%, ${p.bg} 100%), url(${industry.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${industry.id}-${style.id}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: transitionDuration, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="portfolio-preview-wrapper"
        style={{
          ...bgStyle(),
          ...heroBgImage,
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: t.typography.bodyFont,
          color: p.text,
          transition: `background-color ${transitionDuration}s, color ${transitionDuration}s`
        }}
      >
        {/* Navbar with hover links - sticky on scroll */}
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing.section} 1.5rem`,
            borderBottom: `1px solid ${p.muted}20`,
            backgroundColor: t.card.glass ? `${p.surface}95` : `${p.surface}ee`,
            backdropFilter: t.card.glass ? 'blur(12px)' : 'none'
          }}
        >
          <span style={{ fontFamily: t.typography.headingFont, fontWeight: 700, fontSize: '1.25rem', color: p.text }}>{industry?.brandName || 'Webenox'}</span>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            {industry.navLabels.map((label) => (
              <motion.span
                key={label}
                style={{ color: p.muted, cursor: 'pointer' }}
                whileHover={{ color: p.primary }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </nav>

        {/* Hero with background image */}
        <section
          style={{
            padding: `2rem 1.5rem`,
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: HERO_MIN_HEIGHT
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <h1
              style={{
                fontFamily: t.typography.headingFont,
                fontWeight: t.typography.headingWeight,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1.15,
                marginBottom: '1rem',
                color: p.text,
                textShadow: industry.heroImage ? `0 2px 20px ${p.bg}99` : 'none'
              }}
            >
              {industry.hero.headline}
            </h1>
            <p style={{ color: p.muted, fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {industry.hero.subheadline}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                style={{ ...btnPrimaryStyle(), padding: '0.75rem 1.5rem', fontSize: '0.875rem', boxShadow: t.shadow.cardShadowLevel === 'glow' ? `0 0 20px ${p.primary}50` : '0 4px 14px rgba(0,0,0,0.15)' }}
                whileHover={!prefersReducedMotion ? { scale: 1.05, y: -3, boxShadow: `0 8px 25px ${p.primary}40` } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                transition={{ duration: 0.2 }}
              >
                {industry.hero.primaryCTA}
              </motion.button>
              <motion.button
                style={{ ...btnSecondaryStyle(), padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                whileHover={!prefersReducedMotion ? { scale: 1.03, y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } : {}}
                transition={{ duration: 0.2 }}
              >
                {industry.hero.secondaryCTA}
              </motion.button>
            </div>
          </div>
        </section>

        {/* Services with icons and section image */}
        <section style={{ padding: `0 1.5rem ${spacing.section}`, maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: spacing.section }}>
            {industry.services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={!prefersReducedMotion ? { y: -4, boxShadow: t.shadow.cardShadowLevel === 'glow' ? `0 0 35px ${p.primary}35` : '0 12px 40px rgba(0,0,0,0.15)' } : {}}
                transition={{ delay: prefersReducedMotion ? 0 : 0.08 * i, duration: 0.35 }}
                style={{ ...cardStyle(), display: 'flex', gap: '1rem', alignItems: 'flex-start', cursor: 'default' }}
              >
                <div style={{ color: p.primary, flexShrink: 0 }}>
                  {SERVICE_ICONS[svc.icon] || SERVICE_ICONS.platform}
                </div>
                <div>
                  <h3 style={{ fontFamily: t.typography.headingFont, fontWeight: 600, fontSize: '1.0625rem', marginBottom: '0.5rem', color: p.text }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: p.muted, lineHeight: 1.55 }}>{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {industry.sectionImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={!prefersReducedMotion ? { y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' } : {}}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{
                marginTop: spacing.section,
                borderRadius: t.radius.cardRadius,
                overflow: 'hidden',
                ...cardStyle(),
                padding: 0
              }}
            >
              <img src={industry.sectionImage} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
            </motion.div>
          )}
        </section>

        {/* Proof strip */}
        <section
          style={{
            ...cardStyle(),
            margin: `0 1.5rem ${spacing.section}`,
            borderLeft: `4px solid ${p.primary}`,
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: spacing.section
          }}
        >
          <p style={{ fontStyle: 'italic', color: p.text, marginBottom: '0.5rem', fontSize: '1.0625rem' }}>"{industry.proof.testimonial}"</p>
          <p style={{ fontSize: '0.875rem', color: p.muted }}>{industry.proof.author}</p>
        </section>

        {/* Contact CTA */}
        <section
          style={{
            padding: `${spacing.hero} 1.5rem`,
            textAlign: 'center',
            backgroundColor: `${p.primary}15`,
            borderTop: `1px solid ${p.muted}20`
          }}
        >
          <p style={{ color: p.muted, marginBottom: '1rem', fontSize: '0.9375rem' }}>{industry.contact.pitch}</p>
          <motion.button
            style={{ ...btnPrimaryStyle(), padding: '0.875rem 1.75rem', fontSize: '1rem', boxShadow: t.shadow.cardShadowLevel === 'glow' ? `0 0 20px ${p.primary}50` : '0 4px 14px rgba(0,0,0,0.15)' }}
            whileHover={!prefersReducedMotion ? { scale: 1.04, boxShadow: `0 6px 20px ${p.primary}40` } : {}}
            transition={{ duration: 0.2 }}
          >
            {industry.contact.ctaLabel}
          </motion.button>
        </section>
      </motion.div>
    </AnimatePresence>
  )
}

export default PortfolioLivePreview
