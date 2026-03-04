import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [activeStep, setActiveStep] = useState(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%'])

  useEffect(() => {
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1000
          const steps = 60
          const stepDuration = duration / steps

          const timer = setInterval(() => {
            setCounts(prev => {
              const newCounts = { ...prev }
              let allComplete = true

              if (prev.projects < 50) {
                newCounts.projects = Math.min(prev.projects + 50 / steps, 50)
                allComplete = false
              }
              if (prev.clients < 30) {
                newCounts.clients = Math.min(prev.clients + 30 / steps, 30)
                allComplete = false
              }
              if (prev.satisfaction < 98) {
                newCounts.satisfaction = Math.min(prev.satisfaction + 98 / steps, 98)
                allComplete = false
              }

              if (allComplete) {
                clearInterval(timer)
                setHasAnimated(true)
              }

              return newCounts
            })
          }, stepDuration)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.7, 0.2, 1]
      }
    }
  }

  const processSteps = [
    {
      number: "01",
      title: t('processDiscover') || "Discover",
      description: t('processDiscoverDesc') || "We listen, research, and understand your goals, audience, and market to build a solid foundation.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "from-cyan-400 to-blue-500"
    },
    {
      number: "02",
      title: t('processDesign') || "Design",
      description: t('processDesignDesc') || "We create beautiful, functional designs that capture your brand and engage your audience.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
      color: "from-purple-400 to-pink-500"
    },
    {
      number: "03",
      title: t('processDevelop') || "Develop",
      description: t('processDevelopDesc') || "We build with clean, modern code — fast, responsive, and optimized for performance.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      color: "from-emerald-400 to-cyan-500"
    },
    {
      number: "04",
      title: t('processLaunch') || "Launch",
      description: t('processLaunchDesc') || "We deploy, test, and refine — then support you as your digital presence grows.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      color: "from-amber-400 to-orange-500"
    }
  ]

  const stats = [
    { value: Math.round(counts.projects), suffix: '+', label: t('projectsCompleted') || 'Projects Completed' },
    { value: Math.round(counts.clients), suffix: '+', label: t('happyClients') || 'Happy Clients' },
    { value: Math.round(counts.satisfaction), suffix: '%', label: t('clientSatisfaction') || 'Client Satisfaction' }
  ]

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">

        {/* Hero: Headline + Value Proposition */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={itemVariants}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-6"
          >
            {t('aboutSubtitle') || 'Who We Are'}
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          >
            {t('aboutHeadline') || 'Crafting Digital'}{' '}
            <span className="gradient-text">{t('aboutHeadlineAccent') || 'Excellence'}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
          >
            {t('aboutDescription') || "We're a team of designers, developers, and strategists who transform ideas into exceptional digital experiences. Every project we take on is a partnership built on trust, creativity, and results."}
          </motion.p>
        </motion.div>


        {/* Process: How We Work */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white">
              {t('howWeWork') || 'How We'}{' '}
              <span className="gradient-text">{t('howWeWorkAccent') || 'Work'}</span>
            </h3>
          </motion.div>

          {/* Connecting line (desktop) */}
          <div className="hidden lg:block relative mb-4">
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-px bg-white/10 -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-[12.5%] h-px bg-gradient-to-r from-cyan-500 to-purple-500 -translate-y-1/2"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className="group relative"
              >
                <motion.div
                  className="relative glass-card p-8 h-full overflow-hidden cursor-default"
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-3xl`} />

                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-sm font-bold tracking-widest bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                    <motion.div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-20 flex items-center justify-center text-white`}
                      style={{ background: `linear-gradient(135deg, ${step.color.includes('cyan') ? 'rgba(34,211,238,0.15)' : step.color.includes('purple') ? 'rgba(192,132,252,0.15)' : step.color.includes('emerald') ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)'}, transparent)` }}
                      animate={activeStep === index ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Values: Mission / Vision / Approach */}
        <motion.div
          className="grid lg:grid-cols-3 gap-6 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: t('ourMission') || "Our Mission",
              description: t('ourMissionText') || "We create clean, modern digital experiences that help businesses grow and succeed.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              )
            },
            {
              title: t('ourVision') || "Our Vision",
              description: t('ourVisionText') || "To lead in digital innovation, crafting experiences that anticipate tomorrow's possibilities.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              title: t('ourApproach') || "Our Approach",
              description: t('ourApproachText') || "We combine strategic thinking with creative execution to deliver solutions that perform exceptionally.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              )
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="glass-card p-8 h-full relative overflow-hidden"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6">
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">{card.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>


        {/* Impact Stats */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-12">
            {t('ourImpact') || 'Our'}{' '}
            <span className="gradient-text">{t('ourImpactAccent') || 'Impact'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="glass-card p-8 relative group"
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <motion.div
                    className="text-5xl font-bold gradient-text mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-lg text-white font-semibold">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About
