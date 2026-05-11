const clampText = (v, max) => {
  const s = String(v ?? '').trim().replace(/\s+/g, ' ')
  if (!s) return ''
  if (!max || s.length <= max) return s
  return `${s.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}

const ensureArray = (v) => (Array.isArray(v) ? v : [])

const padTo = (arr, n, makeItem) => {
  const out = ensureArray(arr).slice(0, n)
  while (out.length < n) out.push(makeItem(out.length))
  return out
}

const STYLE_LIMITS = {
  default: {
    heroHeadline: 44,
    heroSubheadline: 160,
    serviceTitle: 32,
    serviceDesc: 130,
    teamName: 22,
    teamRole: 28,
    teamBio: 120,
    testimonialQuote: 170,
    faqQ: 64,
    faqA: 180
  },
  'soft-pastel': { heroHeadline: 40, heroSubheadline: 150, serviceDesc: 120, testimonialQuote: 160 },
  'fitness-energy': { heroHeadline: 36, heroSubheadline: 135, serviceDesc: 120, testimonialQuote: 155 },
  'eco-natural': { heroHeadline: 40, heroSubheadline: 155, serviceDesc: 125, testimonialQuote: 160 },
  'bold-neon': { heroHeadline: 38, heroSubheadline: 140, serviceDesc: 115, testimonialQuote: 150 },
  'warm-artisan': { heroHeadline: 40, heroSubheadline: 155, serviceDesc: 125, testimonialQuote: 160 },
  'corporate-trust': { heroHeadline: 42, heroSubheadline: 160, serviceDesc: 125, testimonialQuote: 165 },
  'clinical-clean': { heroHeadline: 44, heroSubheadline: 165, serviceDesc: 130, testimonialQuote: 170 },
  'luxury-noir': { heroHeadline: 38, heroSubheadline: 145, serviceDesc: 120, testimonialQuote: 150 },
  'creative-studio': { heroHeadline: 44, heroSubheadline: 165, serviceDesc: 130, testimonialQuote: 170 }
}

const getLimits = (styleId) => ({ ...STYLE_LIMITS.default, ...(STYLE_LIMITS[styleId] || {}) })

export function normalizeIndustryForStyle(styleId, industry) {
  const limits = getLimits(styleId)
  const ind = industry && typeof industry === 'object' ? industry : {}

  const hero = ind.hero && typeof ind.hero === 'object' ? ind.hero : {}
  const services = ensureArray(ind.services)
  const team = ensureArray(ind.team)
  const testimonials = ensureArray(ind.testimonials)
  const faq = ensureArray(ind.faq)
  const stats = ensureArray(ind.stats)

  const normalized = {
    ...ind,
    navLabels: padTo(ind.navLabels || ['Services', 'Team', 'Contact'], 3, (i) => (i === 0 ? 'Services' : i === 1 ? 'Team' : 'Contact')),
    hero: {
      ...hero,
      headline: clampText(hero.headline, limits.heroHeadline) || 'Build something great',
      subheadline: clampText(hero.subheadline, limits.heroSubheadline) || 'A premium starting point you can customize for your brand.',
      bulletPoints: padTo(hero.bulletPoints, 4, (i) => ['Premium design', 'Fast performance', 'Clear messaging', 'Conversion focused'][i] || 'Premium'),
      primaryCTA: clampText(hero.primaryCTA || 'Get Started', 22) || 'Get Started',
      secondaryCTA: clampText(hero.secondaryCTA || 'Learn More', 22) || 'Learn More'
    },
    services: padTo(services, 6, (i) => ({
      title: `Service ${i + 1}`,
      desc: 'A premium service description tailored to your industry.',
      icon: 'platform',
      featureList: ['High quality', 'Fast delivery', 'Clear results']
    })).map((s) => ({
      ...s,
      title: clampText(s.title, limits.serviceTitle) || 'Service',
      desc: clampText(s.desc, limits.serviceDesc) || 'A premium service description.',
      featureList: padTo(s.featureList, 3, (j) => ['High quality', 'Fast delivery', 'Clear results'][j] || 'Feature')
    })),
    stats: padTo(stats, 4, (i) => ({ value: ['10+', '24/7', '98%', '5★'][i] || '-', label: ['Years', 'Support', 'Satisfaction', 'Rating'][i] || 'Metric' })).map((x) => ({
      ...x,
      value: clampText(x.value, 8) || '-',
      label: clampText(x.label, 18) || 'Metric'
    })),
    team: padTo(team, 3, (i) => ({
      name: ['Alex', 'Jordan', 'Taylor'][i] || `Member ${i + 1}`,
      role: 'Team',
      bio: 'Experienced, reliable, and focused on results.',
      image: ''
    })).map((m) => ({
      ...m,
      name: clampText(m.name, limits.teamName) || 'Team member',
      role: clampText(m.role, limits.teamRole) || 'Team',
      bio: clampText(m.bio, limits.teamBio) || ''
    })),
    testimonials: padTo(testimonials, 2, (i) => ({
      quote: i === 0 ? 'High-quality work and a smooth process from start to finish.' : 'Great communication and an outcome we’re proud of.',
      author: i === 0 ? 'Client' : 'Client',
      role: ''
    })).map((t) => ({
      ...t,
      quote: clampText(t.quote, limits.testimonialQuote) || 'Great experience.',
      author: clampText(t.author, 28) || 'Client',
      role: clampText(t.role, 32) || ''
    })),
    faq: padTo(faq, 4, (i) => ({
      question: ['How long does it take?', 'What’s included?', 'How do we start?', 'Can we customize it?'][i] || 'Question',
      answer: 'Yes. We tailor the solution to your needs and goals.'
    })).map((q) => ({
      ...q,
      question: clampText(q.question, limits.faqQ) || 'Question',
      answer: clampText(q.answer, limits.faqA) || 'Answer'
    }))
  }

  return normalized
}

