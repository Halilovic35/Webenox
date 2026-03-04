import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX - innerWidth / 2) / 100
      const y = (clientY - innerHeight / 2) / 100
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Counter animation - only once when in view
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
        staggerChildren: 0.09,
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
        duration: 0.3,
        ease: [0.2, 0.7, 0.2, 1]
      }
    }
  }

  const timelineSteps = [
    {
      icon: "🔍",
      title: "Discover",
      description: "We dive deep into your vision, goals, and challenges"
    },
    {
      icon: "🎨", 
      title: "Design",
      description: "Beautiful, functional solutions that exceed expectations"
    },
    {
      icon: "🚀",
      title: "Deliver", 
      description: "Bringing your vision to life with precision and excellence"
    }
  ]

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background decorative elements - matching site */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple/6 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* A) Kinetic Hero */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Orb with W logo */}
          <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-start">
            <motion.div 
              className="relative w-[min(36vw,520px)] h-[min(36vw,520px)] md:w-[min(48vw,360px)] md:h-[min(48vw,360px)] sm:w-[260px] sm:h-[260px]"
              style={{ 
                x: useTransform(springX, [-1, 1], [-18, 18]),
                y: useTransform(springY, [-1, 1], [-18, 18])
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Glow rings */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-4 bg-gradient-to-br from-cyan-400/15 to-purple-500/15 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              
              {/* Main orb */}
              <div className="relative w-full h-full glass-card rounded-full flex items-center justify-center overflow-hidden">
                {/* Inner particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                    style={{
                      left: `${50 + 30 * Math.cos(i * Math.PI / 4)}%`,
                      top: `${50 + 30 * Math.sin(i * Math.PI / 4)}%`,
                    }}
                    animate={{
                      x: [0, 10 * Math.cos(i * Math.PI / 4), 0],
                      y: [0, 10 * Math.sin(i * Math.PI / 4), 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 6 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* W logo */}
                <motion.div 
                  className="text-8xl md:text-6xl sm:text-5xl font-bold gradient-text"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  W
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Title + CTAs */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative">
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                viewport={{ once: true }}
              >
                Our Story in{' '}
                <span className="gradient-text">Motion</span>
              </motion.h1>
            </div>

            <motion.p 
              className="text-xl text-slate-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              viewport={{ once: true }}
            >
              We're passionate digital craftsmen dedicated to building exceptional web experiences that make a difference. Every project is a journey of discovery, design, and delivery.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-cyan-500/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* B) Mission / Vision / Approach */}
        <motion.div 
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: "Our Mission",
              description: "We create clean, modern digital experiences that help businesses grow and succeed.",
              icon: "🎯"
            },
            {
              title: "Our Vision", 
              description: "To lead in digital innovation, crafting experiences that not only meet today's needs but anticipate tomorrow's possibilities.",
              icon: "⚡"
            },
            {
              title: "Our Approach",
              description: "We combine strategic thinking with creative execution to deliver solutions that look great and perform exceptionally well.",
              icon: "🤝"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ 
                y: -4,
                scale: 1.015,
                transition: { duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }
              }}
            >
              <div className="relative glass-card p-8 h-full overflow-hidden">
                {/* Gradient sheen */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6 relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 10,
                    transition: { duration: 0.3 }
                  }}
                  animate={{
                    y: [0, -5, 0],
                    transition: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                  }}
                >
                  {card.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-slate-300 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* C) Impact Stats */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12">
            Our <span className="gradient-text">Impact</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: Math.round(counts.projects), suffix: '+', label: 'Projects Completed', badge: 'since 2020' },
              { value: Math.round(counts.clients), suffix: '+', label: 'Happy Clients', badge: 'worldwide' },
              { value: Math.round(counts.satisfaction), suffix: '%', label: 'Client Satisfaction', badge: 'average' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="glass-card p-8 relative overflow-hidden">
                  {/* Sparkle Animation */}
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 text-cyan-400"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 2 + Math.random() * 4,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div 
                    className="text-5xl font-bold gradient-text mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                    viewport={{ once: true }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-xl text-white font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-cyan-400 font-medium">{stat.badge}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* D) Why Choose Us - Process Rail */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform -translate-y-1/2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              viewport={{ once: true }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.15, ease: [0.2, 0.7, 0.2, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="w-4 h-4 bg-cyan-400 rounded-full mx-auto mb-6 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  <div className="glass-card p-6 relative">
                    <motion.div 
                      className="text-4xl mb-4"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-300 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 