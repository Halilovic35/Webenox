import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import AccentUnderline from './AccentUnderline'

// SVG Icons for Mission/Vision/Approach
const MissionIcon = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const VisionIcon = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ApproachIcon = () => (
  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

// Process step icons
const DiscoverIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const DesignIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

const DevelopIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const LaunchIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
)

const About = () => {
  const { t } = useLanguage()
  const containerRef = useRef(null)

  const processSteps = useMemo(
    () => [
      { icon: DiscoverIcon, title: t('aboutStepDiscoverTitle'), desc: t('aboutStepDiscoverDesc') },
      { icon: DesignIcon, title: t('aboutStepDesignTitle'), desc: t('aboutStepDesignDesc') },
      { icon: DevelopIcon, title: t('aboutStepDevelopTitle'), desc: t('aboutStepDevelopDesc') },
      { icon: LaunchIcon, title: t('aboutStepLaunchTitle'), desc: t('aboutStepLaunchDesc') }
    ],
    [t]
  )

  const mvCards = useMemo(
    () => [
      { icon: MissionIcon, title: t('aboutMvMissionTitle'), desc: t('aboutMvMissionDesc') },
      { icon: VisionIcon, title: t('aboutMvVisionTitle'), desc: t('aboutMvVisionDesc') },
      { icon: ApproachIcon, title: t('aboutMvApproachTitle'), desc: t('aboutMvApproachDesc') }
    ],
    [t]
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }
    }
  }

  const scrollViewport = { once: true, amount: 0.15, margin: "-50px" }

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-visible">
      {/* Background: soft orbs, blend seamlessly into page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-accent/3 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple/3 rounded-full blur-[100px]"></div>
      </div>

      <div className="container-custom relative z-10">

        {/* A) Hero: Crafting Digital Excellence */}
        <motion.div
          className="text-center mb-24 overflow-visible"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-snug overflow-visible luxury-heading"
            variants={itemVariants}
          >
            <span className="gradient-text block mb-0.2 pb-2" style={{ lineHeight: 1.5 }}>
              {t('aboutTaglineLine1')}
            </span>
            <span className="block" style={{ lineHeight: 1.4 }}>
              {t('aboutTaglineLine2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('aboutTaglineLead')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            variants={itemVariants}
          >
            <a
              href="#portfolio"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] inline-block text-center"
            >
              {t('aboutCtaPortfolio')}
            </a>
            <a
              href="#site-contact"
              className="px-8 py-4 border-2 border-cyan-500/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] inline-block text-center"
            >
              {t('aboutCtaContact')}
            </a>
          </motion.div>
        </motion.div>

        {/* B) 4-Step Process Flow */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          viewport={scrollViewport}
        >
          <h2 className="section-title luxury-heading text-center">
            {t('aboutProcessOur')}{' '}
            <AccentUnderline>
              <span className="gradient-text">{t('aboutProcessProcess')}</span>
            </AccentUnderline>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                  viewport={scrollViewport}
                >
                  {/* Connector line (desktop): centered vertically through cards */}
                  {index < processSteps.length - 1 && (
                    <motion.div 
                      className="hidden lg:block absolute top-1/2 left-[60%] w-[80%] h-px bg-gradient-to-r from-cyan-500/40 to-transparent -z-0 -translate-y-1/2 origin-left"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.2, ease: "easeOut" }}
                      viewport={scrollViewport}
                    />
                  )}

                  <div className="relative glass-card p-6 h-full cursor-default transition-all duration-150 group-hover:scale-[1.02] group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(0,201,255,0.15)]">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 text-cyan-400 transition-transform duration-150 group-hover:scale-110">
                        <Icon />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Step labels for flow (Discover → Design → Develop → Launch) */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={scrollViewport}
          >
            {processSteps.map((s, i) => (
              <span key={i} className="text-slate-500 text-sm">
                {s.title}
                {i < processSteps.length - 1 && <span className="mx-1 text-cyan-500/60">→</span>}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* C) Mission / Vision / Approach: SVG icons */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          {mvCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group transition-transform duration-150 hover:-translate-y-1.5"
              >
                <div className="glass-card p-8 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default About
