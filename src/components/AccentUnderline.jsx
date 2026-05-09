import React, { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Underline that “fills” as it scrolls into view, and “unfills” as you scroll past.
 * Used only for emphasized words inside section titles.
 */
const AccentUnderline = ({ children, className = '', mode = 'scroll', delay = 0, bottom = '0px' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.25'] })
  const scrollScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.18, 1], [0, 1, 1])

  const mask = useMemo(
    () =>
      // Softly fade ends so corners “disappear” into the background.
      // Use white (not black) so mask works in luminance-based implementations too.
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 14%, rgba(255,255,255,1) 86%, transparent 100%)',
    []
  )

  const useScrollMode = mode !== 'load'

  return (
    <span ref={ref} className={`relative inline-block pb-[0.18em] ${className}`}>
      <span className="relative z-10">{children}</span>
      {useScrollMode ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 h-[3px] rounded-full"
          style={{
            bottom,
            opacity: scrollOpacity,
            scaleX: scrollScaleX,
            transformOrigin: 'left',
            background: 'linear-gradient(90deg, rgba(0,201,255,0.95), rgba(146,95,226,0.9))',
            boxShadow: '0 0 18px rgba(0,201,255,0.18)',
            WebkitMaskImage: mask,
            maskImage: mask
          }}
        />
      ) : (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 h-[3px] rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            bottom,
            transformOrigin: 'left',
            // Fade ends so corners “disappear” (no maskImage in load mode for reliability).
            background:
              'linear-gradient(90deg, rgba(0,201,255,0) 0%, rgba(0,201,255,0.95) 18%, rgba(146,95,226,0.9) 82%, rgba(146,95,226,0) 100%)',
            boxShadow: '0 0 18px rgba(0,201,255,0.18)'
          }}
        />
      )}
    </span>
  )
}

export default AccentUnderline

