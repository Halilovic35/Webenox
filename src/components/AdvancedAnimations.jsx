import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

// Parallax Background Component
const ParallaxBackground = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])
  const y2 = useTransform(scrollY, [0, 1000], [0, 300])
  const y3 = useTransform(scrollY, [0, 1000], [0, -150])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple/3 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple/4 rounded-full blur-2xl"
      />
    </div>
  )
}

// Scroll Progress Indicator
const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-purple origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute w-2 h-2 bg-accent/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// Text Reveal Animation Component
export const TextReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="overflow-hidden"
    >
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Card Hover Effect Component
export const CardHoverEffect = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 201, 255, 0.1), transparent 40%)`,
          }}
        />
      )}
    </motion.div>
  )
}

// Staggered Animation Container
export const StaggeredContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered Animation Item
export const StaggeredItem = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Loading Animation Component
export const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full"
      />
    </div>
  )
}

// Main Advanced Animations Component
const AdvancedAnimations = () => {
  return (
    <>
      {/* Parallax Background */}
      <ParallaxBackground />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Floating Elements */}
      <FloatingElements />
    </>
  )
}

export default AdvancedAnimations 