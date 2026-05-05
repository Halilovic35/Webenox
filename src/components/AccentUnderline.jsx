import React, { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Underline that “fills” as it scrolls into view, and “unfills” as you scroll past.
 * Used only for emphasized words inside section titles.
 */
const AccentUnderline = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.25']
  })

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 1], [0, 1, 1])

  const mask = useMemo(
    () =>
      // Softly fade ends so corners “disappear” into the background.
      'linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 14%, rgba(0,0,0,1) 86%, transparent 100%)',
    []
  )

  return (
    <span ref={ref} className={`relative inline-block pb-[0.18em] ${className}`}>
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] rounded-full"
        style={{
          opacity,
          scaleX,
          transformOrigin: 'left',
          background: 'linear-gradient(90deg, rgba(0,201,255,0.95), rgba(146,95,226,0.9))',
          boxShadow: '0 0 18px rgba(0,201,255,0.18)',
          WebkitMaskImage: mask,
          maskImage: mask
        }}
      />
    </span>
  )
}

export default AccentUnderline

