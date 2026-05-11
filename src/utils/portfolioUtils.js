/**
 * Text truncation for balanced layout display
 * Prevents verbose industry content (e.g. Construction) from breaking card grids
 */
export const truncateText = (text, maxLength = 100, suffix = '…') => {
  if (!text || typeof text !== 'string') return ''
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  return trimmed.slice(0, maxLength - suffix.length).trim().replace(/\s+\S*$/, '') + suffix
}

/** Max chars for service card descriptions - keeps grid heights balanced */
export const SERVICE_DESC_MAX = 65
/** Max chars for value prop / why choose us cards */
export const CARD_DESC_MAX = 60
/** Max chars for process step descriptions */
export const PROCESS_DESC_MAX = 80
/** Max chars for about section paragraphs when in compact/column layout */
export const ABOUT_PARA_MAX = 150
/** Max chars for testimonial quotes */
export const TESTIMONIAL_QUOTE_MAX = 100
/** Max chars for FAQ answers */
export const FAQ_ANSWER_MAX = 100

/** Hero must fill viewport - min height for preview (accounting for container and navbar) */
export const PREVIEW_CONTAINER_HEIGHT = 'max(60vh, 520px)'
export const HERO_MIN_HEIGHT = `calc(${PREVIEW_CONTAINER_HEIGHT} - 80px)`

/** Scroll container used by the portfolio preview (Framer Motion `whileInView` root) */
export const PORTFOLIO_PREVIEW_SCROLL_CONTAINER_ID = 'portfolio-preview-scroll-container'

export const getPortfolioPreviewScrollRoot = () =>
  typeof document !== 'undefined' ? document.getElementById(PORTFOLIO_PREVIEW_SCROLL_CONTAINER_ID) : null

/**
 * Framer Motion cannot interpolate `transparent` ↔ rgba; use rgba with explicit alpha instead.
 * Accepts #rgb, #rrggbb, or rgb()/rgba() prefixes.
 */
export const colorWithAlpha = (color, alpha) => {
  if (color == null || color === '') return `rgba(0,0,0,${alpha})`
  const c = String(color).trim()
  if (c === 'transparent') return `rgba(0,0,0,${alpha})`
  if (c.startsWith('#')) {
    let h = c.slice(1)
    if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('')
    if (h.length === 6) {
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      if ([r, g, b].some((n) => Number.isNaN(n))) return `rgba(0,0,0,${alpha})`
      return `rgba(${r},${g},${b},${alpha})`
    }
  }
  const m = c.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (m) return `rgba(${m[1]},${m[2]},${m[3]},${alpha})`
  return `rgba(0,0,0,${alpha})`
}

/** Map nav labels to section ids for scroll-to-section */
export const NAV_LABEL_TO_ID = {
  'Services': 'services',
  'Team': 'team',
  'Contact': 'contact',
  'Gallery': 'gallery',
  'About': 'about',
  'Pricing': 'pricing',
  'Programs': 'services',
  'Product': 'services',
  'Menu': 'services',
  'Reservations': 'contact',
  'Book': 'contact',
  'Courses': 'services',
  'Instructors': 'team',
  'Properties': 'gallery',
  'Practice Areas': 'services',
  'Projects': 'gallery'
}

export const scrollToSection = (label) => {
  const id = NAV_LABEL_TO_ID[label] || label.toLowerCase().replace(/\s+/g, '-')
  const scrollContainer = document.getElementById(PORTFOLIO_PREVIEW_SCROLL_CONTAINER_ID)

  if (scrollContainer) {
    const element = scrollContainer.querySelector(`#${id}`)

    if (element) {
      let offset = 0
      const nav = scrollContainer.querySelector('nav')
      if (nav) {
        offset = nav.offsetHeight || 0
      }

      const containerRect = scrollContainer.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()

      const targetScrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - offset

      scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
      return
    }
  }

  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
