/**
 * Industry + Style configurator data
 * Used by "Bring Your Ideas to Life" portfolio section
 * Expanded with aboutSection, process, gallery, trustBadges, and more per industry
 * @version 2.0
 * @lastUpdated 2025-03-04
 */

export const DATA_META = {
  version: 2,
  lastUpdated: '2025-03-04',
  totalIndustries: 9,
  totalStyles: 9,
  fieldsPerIndustry: ['aboutSection', 'process', 'gallery', 'trustBadges', 'whyChooseUs', 'seo', 'featuredCaseStudy', 'valueProps', 'gettingStarted', 'specialties', 'socialProof', 'additionalFaq', 'ctaBanner', 'featuredPartners', 'responseTime', 'accessibility', 'serviceArea', 'qualityCommitment', 'communityNote', 'clientPromise', 'relatedResources', 'popularServices', 'bookingNote']
}

export const STYLES = [
  {
    id: 'clinical-clean',
    name: 'Clinical Clean',
    tagline: 'Sterile, trustworthy, professional',
    description: 'A crisp, hygienic aesthetic that conveys professionalism and trust. Ideal for healthcare providers, medical practices, and clinics where cleanliness and credibility are paramount. Light backgrounds, clear typography, and subtle blue accents create a calming, authoritative presence.',
    colorStrip: ['#f0fdfa', '#ffffff', '#0ea5e9', '#14b8a6'],
    bestFor: 'Healthcare, clinics, medical',
    spacing: 'compact',
    theme: {
      palette: {
        primary: '#0ea5e9',
        secondary: '#14b8a6',
        accent: '#5eead4',
        bg: '#f0fdfa',
        surface: '#ffffff',
        text: '#0f172a',
        muted: '#64748b'
      },
      typography: {
        headingFont: "'Inter', sans-serif",
        bodyFont: "'Inter', sans-serif",
        headingWeight: '700',
        bodyWeight: '400'
      },
      radius: { cardRadius: '12px', buttonRadius: '8px' },
      shadow: { cardShadowLevel: 'sm' },
      background: { type: 'solid', intensity: 1 },
      button: { type: 'solid', hoverEffect: 'lift' },
      card: { style: 'border', border: true, blur: false, glass: false }
    }
  },
  {
    id: 'luxury-noir',
    name: 'Luxury Noir',
    tagline: 'Dark, premium, exclusive',
    description: 'A sophisticated dark theme with gold accents that exudes elegance and exclusivity. Perfect for luxury brands, high-end real estate, and premium services. The contrast of dark backgrounds and metallic highlights creates a memorable, aspirational feel.',
    colorStrip: ['#0c0a09', '#d4af37', '#f5f5f4', '#78716c'],
    bestFor: 'High-end brands, real estate, luxury',
    spacing: 'generous',
    theme: {
      palette: {
        primary: '#d4af37',
        secondary: '#e5e7eb',
        accent: '#fef3c7',
        bg: '#0c0a09',
        surface: '#1c1917',
        text: '#fafaf9',
        muted: '#a8a29e'
      },
      typography: {
        headingFont: "'Playfair Display', serif",
        bodyFont: "'DM Sans', sans-serif",
        headingWeight: '600',
        bodyWeight: '400'
      },
      radius: { cardRadius: '4px', buttonRadius: '2px' },
      shadow: { cardShadowLevel: 'lg' },
      background: { type: 'gradient', intensity: 0.3 },
      button: { type: 'outline', hoverEffect: 'glow' },
      card: { style: 'border', border: true, blur: false, glass: false },
      letterSpacing: '0.02em'
    }
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel',
    tagline: 'Gentle, approachable, calming',
    description: 'Soft pinks, lavenders, and gentle gradients create a welcoming, soothing atmosphere. Best for wellness, beauty salons, spas, and family-focused businesses. The palette feels nurturing and inclusive, inviting visitors to relax and feel at ease.',
    colorStrip: ['#fce7f3', '#e9d5ff', '#f472b6', '#a78bfa'],
    bestFor: 'Wellness, beauty, childcare',
    spacing: 'relaxed',
    theme: {
      palette: {
        primary: '#db2777',
        secondary: '#a78bfa',
        accent: '#f9a8d4',
        bg: '#fdf2f8',
        surface: '#fce7f3',
        text: '#581c87',
        muted: '#a78bfa'
      },
      typography: {
        headingFont: "'Plus Jakarta Sans', sans-serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        headingWeight: '600',
        bodyWeight: '400'
      },
      radius: { cardRadius: '24px', buttonRadius: '9999px' },
      shadow: { cardShadowLevel: 'sm' },
      background: { type: 'gradient', intensity: 0.15 },
      button: { type: 'solid', hoverEffect: 'soft' },
      card: { style: 'soft', border: false, blur: false, glass: false },
      letterSpacing: '0'
    }
  },
  {
    id: 'bold-neon',
    name: 'Bold Neon',
    tagline: 'Vibrant, tech-forward, energetic',
    description: 'Vivid cyan and purple against dark backgrounds create a dynamic, cutting-edge vibe. Ideal for SaaS products, tech startups, and innovation-focused brands. Glassmorphism and glow effects convey modernity and forward thinking.',
    colorStrip: ['#0f172a', '#22d3ee', '#ec4899', '#8b5cf6'],
    bestFor: 'SaaS, startups, tech',
    spacing: 'balanced',
    theme: {
      palette: {
        primary: '#22d3ee',
        secondary: '#ec4899',
        accent: '#8b5cf6',
        bg: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        muted: '#94a3b8'
      },
      typography: {
        headingFont: "'Space Grotesk', sans-serif",
        bodyFont: "'Space Grotesk', sans-serif",
        headingWeight: '700',
        bodyWeight: '400'
      },
      radius: { cardRadius: '16px', buttonRadius: '12px' },
      shadow: { cardShadowLevel: 'glow' },
      background: { type: 'gradient', intensity: 0.4 },
      button: { type: 'solid', hoverEffect: 'glow' },
      card: { style: 'glass', border: true, blur: true, glass: true },
      letterSpacing: '-0.02em'
    }
  },
  {
    id: 'warm-artisan',
    name: 'Warm Artisan',
    tagline: 'Organic, handcrafted, authentic',
    description: 'Warm ambers, cream backgrounds, and natural textures evoke authenticity and craft. Perfect for restaurants, artisanal brands, bakeries, and local businesses. The aesthetic feels genuine, inviting, and rooted in quality and tradition.',
    colorStrip: ['#fffbeb', '#ffffff', '#ea580c', '#f59e0b'],
    bestFor: 'Restaurants, crafts, local business',
    spacing: 'relaxed',
    theme: {
      palette: {
        primary: '#ea580c',
        secondary: '#b45309',
        accent: '#f59e0b',
        bg: '#fffbeb',
        surface: '#ffffff',
        text: '#431407',
        muted: '#9a3412'
      },
      typography: {
        headingFont: "'Lora', serif",
        bodyFont: "'Source Sans 3', sans-serif",
        headingWeight: '600',
        bodyWeight: '400'
      },
      radius: { cardRadius: '16px', buttonRadius: '12px' },
      shadow: { cardShadowLevel: 'md' },
      background: { type: 'noise', intensity: 0.05 },
      button: { type: 'solid', hoverEffect: 'lift' },
      card: { style: 'border', border: true, blur: false, glass: false }
    }
  },
  {
    id: 'corporate-trust',
    name: 'Corporate Trust',
    tagline: 'Professional, established, reliable',
    description: 'Classic blues and clean whites signal professionalism and dependability. Suited for law firms, consulting, financial services, and B2B companies. The design conveys competence, stability, and trust without feeling cold or impersonal.',
    colorStrip: ['#1e3a5f', '#faf8f5', '#c9a227', '#0f172a'],
    bestFor: 'Legal, consulting, finance',
    spacing: 'compact',
    theme: {
      palette: {
        primary: '#1e3a5f',
        secondary: '#334155',
        accent: '#c9a227',
        bg: '#faf8f5',
        surface: '#ffffff',
        text: '#0f172a',
        muted: '#64748b'
      },
      typography: {
        headingFont: "'Lora', serif",
        bodyFont: "'Inter', sans-serif",
        headingWeight: '700',
        bodyWeight: '400'
      },
      radius: { cardRadius: '8px', buttonRadius: '6px' },
      shadow: { cardShadowLevel: 'md' },
      background: { type: 'solid', intensity: 1 },
      button: { type: 'solid', hoverEffect: 'subtle' },
      card: { style: 'border', border: true, blur: false, glass: false }
    }
  },
  {
    id: 'fitness-energy',
    name: 'Fitness Energy',
    tagline: 'Dynamic, powerful, motivating',
    description: 'Bold purples and indigos on dark backgrounds radiate energy and motivation. Designed for gyms, fitness coaches, sports brands, and wellness products. The palette inspires action and conveys strength, vitality, and transformation.',
    colorStrip: ['#1e1b4b', '#ef4444', '#7c3aed', '#f97316'],
    bestFor: 'Gyms, coaches, sports',
    spacing: 'generous',
    theme: {
      palette: {
        primary: '#ef4444',
        secondary: '#f97316',
        accent: '#7c3aed',
        bg: '#0f0f0f',
        surface: '#1e1b4b',
        text: '#f5f3ff',
        muted: '#c4b5fd'
      },
      typography: {
        headingFont: "'Outfit', sans-serif",
        bodyFont: "'Outfit', sans-serif",
        headingWeight: '800',
        bodyWeight: '500'
      },
      radius: { cardRadius: '20px', buttonRadius: '16px' },
      shadow: { cardShadowLevel: 'glow' },
      background: { type: 'gradient', intensity: 0.5 },
      button: { type: 'solid', hoverEffect: 'glow' },
      card: { style: 'glass', border: true, blur: true, glass: true }
    }
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    tagline: 'Bold, artistic, expressive',
    description: 'Dark backgrounds with vibrant orange and amber accents create a striking, creative presence. Ideal for design agencies, artists, photographers, and creative studios. The contrast demands attention and showcases a bold, artistic personality.',
    colorStrip: ['#0a0a0a', '#f59e0b', '#fb7185', '#fcd34d'],
    bestFor: 'Agencies, artists, design',
    spacing: 'generous',
    theme: {
      palette: {
        primary: '#f59e0b',
        secondary: '#fb7185',
        accent: '#fcd34d',
        bg: '#0a0a0a',
        surface: '#171717',
        text: '#fafafa',
        muted: '#a3a3a3'
      },
      typography: {
        headingFont: "'Outfit', sans-serif",
        bodyFont: "'DM Sans', sans-serif",
        headingWeight: '800',
        bodyWeight: '400'
      },
      radius: { cardRadius: '4px', buttonRadius: '4px' },
      shadow: { cardShadowLevel: 'lg' },
      background: { type: 'solid', intensity: 1 },
      button: { type: 'outline', hoverEffect: 'fill' },
      card: { style: 'border', border: true, blur: false, glass: false }
    }
  },
  {
    id: 'eco-natural',
    name: 'Eco Natural',
    tagline: 'Sustainable, organic, green',
    description: 'Fresh greens and natural tones communicate sustainability and eco-conscious values. Perfect for organic brands, environmental initiatives, and businesses focused on wellness and the planet. The palette feels fresh, honest, and aligned with nature.',
    colorStrip: ['#fef3c7', '#166534', '#86efac', '#78350f'],
    bestFor: 'Eco brands, organic, sustainability',
    spacing: 'relaxed',
    theme: {
      palette: {
        primary: '#166534',
        secondary: '#15803d',
        accent: '#c2410c',
        bg: '#fefce8',
        surface: '#fef3c7',
        text: '#422006',
        muted: '#78350f'
      },
      typography: {
        headingFont: "'Source Sans 3', sans-serif",
        bodyFont: "'Source Sans 3', sans-serif",
        headingWeight: '700',
        bodyWeight: '400'
      },
      radius: { cardRadius: '20px', buttonRadius: '9999px' },
      shadow: { cardShadowLevel: 'sm' },
      background: { type: 'solid', intensity: 1 },
      button: { type: 'solid', hoverEffect: 'soft' },
      card: { style: 'soft', border: false, blur: false, glass: false }
    }
  }
]

const RAW_INDUSTRIES = [
  {
    id: 'clinic',
    name: 'Clinic / Practice',
    shortLabel: 'Clinic',
    brandName: 'Trust Care Clinic',
    demoDomain: 'trustcareclinic.com',
    icon: 'clinic',
    navLabels: ['Services', 'Team', 'Contact'],
    heroImage: '/images/clinic-hero.png',
    services: [
      { title: 'General Consultation', desc: 'Personalized care plans tailored to your needs.', icon: 'clinic', featureList: ['Same-day appointments', 'EHR', 'Specialist referrals'] },
      { title: 'Specialist Care', desc: 'Board-certified specialists and advanced diagnostics.', icon: 'specialist', featureList: ['Board-certified', 'Advanced equipment', 'Multi-disciplinary'] },
      { title: 'Follow-up Care', desc: 'Ongoing support with post-visit check-ins.', icon: 'care', featureList: ['Post-visit check-ins', 'Care adjustments', '24/7 portal'] },
      { title: 'Preventive Screenings', desc: 'Routine exams to catch issues early.', icon: 'preventive', featureList: ['Annual physicals', 'Vaccinations', 'Risk assessments'] },
      { title: 'Telehealth Visits', desc: 'Secure video consultations from home.', icon: 'telehealth', featureList: ['Video appointments', 'Online refills', 'Same quality'] },
      { title: 'Lab & Diagnostics', desc: 'In-house lab with fast results.', icon: 'lab', featureList: ['Blood work', 'Quick turnaround', 'Portal results'] }
    ],
    hero: {
      headline: 'Care You Can Trust',
      subheadline: 'Professional healthcare for you and your family. Book appointments online, meet our specialists, and experience care that puts you first.',
      bulletPoints: ['Board-certified physicians & specialists', 'Same-day and urgent care appointments', 'Patient portal for records & scheduling', 'Accept most major insurance plans'],
      primaryCTA: 'Book Appointment',
      secondaryCTA: 'View Services'
    },
    stats: [
      { value: '15+', label: 'Years in Practice' },
      { value: '12K+', label: 'Patients Served' },
      { value: '98%', label: 'Patient Satisfaction' },
      { value: '24/7', label: 'Portal Access' }
    ],
    team: [
      { name: 'Dr. Amanda Chen', role: 'Medical Director & Internist', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop', bio: 'Board-certified with 15+ years in primary care. Passionate about preventive medicine and patient-centered care.' },
      { name: 'Dr. Marcus Webb', role: 'Family Medicine Specialist', image: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=200&h=200&fit=crop', bio: 'Expert in family medicine with a focus on chronic disease management and whole-family wellness.' },
      { name: 'Dr. Sofia Reyes', role: 'Pediatrics & Adolescent Care', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop', bio: 'Specializes in pediatric care and adolescent medicine. Makes kids and parents feel comfortable.' },
      { name: 'Dr. James Okonkwo', role: 'Preventive Medicine', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop', bio: 'Focuses on preventive screenings and wellness. Believes in catching issues early for better outcomes.' }
    ],
    testimonials: [
      { quote: 'Professional staff and easy online booking. Highly recommend.', author: 'Sarah M.', role: 'Patient' },
      { quote: 'Dr. Chen listened and created a care plan that actually works.', author: 'Thomas R.', role: 'Patient' },
      { quote: 'Telehealth saved me a trip. Same quality care from home.', author: 'Linda K.', role: 'Patient' },
      { quote: 'Finally found a medical home. They know my history.', author: 'Michael P.', role: 'Patient' },
      { quote: 'Preventive screenings caught something early. Grateful.', author: 'Jennifer L.', role: 'Patient' }
    ],
    proof: {
      testimonial: 'Professional, caring staff. The online booking made it so easy to schedule my visit.',
      author: 'Sarah M., Patient'
    },
    faq: [
      { question: 'Do you accept my insurance?', answer: 'Yes. Most major plans accepted. We verify coverage before your visit.' },
      { question: 'How do I schedule?', answer: 'Book online 24/7, call, or use our app. Same-day often available.' },
      { question: 'What to bring?', answer: 'ID, insurance card, medication list. Arrive 15 min early.' },
      { question: 'Telehealth?', answer: 'Yes. Secure video visits for follow-ups and minor concerns.' },
      { question: 'Prescription refills?', answer: 'Portal or phone. Processed within 24-48 hours.' }
    ],
    pricing: [
      { name: 'Initial Consultation', price: '$150', features: ['Comprehensive health history', 'Physical examination', 'Basic lab review', 'Care plan discussion'] },
      { name: 'Follow-up Visit', price: '$85', features: ['30-minute appointment', 'Progress evaluation', 'Medication adjustments', 'Referrals if needed'] },
      { name: 'Annual Wellness', price: '$299', features: ['Full physical exam', 'Preventive screenings', 'Blood work panel', 'Nutrition consultation'] }
    ],
    contact: {
      pitch: 'Request a Free Consultation',
      ctaLabel: 'Book Free Consultation',
      address: '1847 Medical Center Drive, Suite 200, Austin, TX 78701',
      phone: '(512) 555-0147',
      email: 'appointments@trustcareclinic.com',
      hours: 'Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 2:00 PM'
    },
    aboutSection: {
      title: 'Your Trusted Healthcare Partner',
      paragraphs: [
        '15+ years serving Austin with compassionate care. Board-certified physicians, same-day appointments, and a 24/7 patient portal. Healthcare that fits your life.'
      ],
      highlights: ['15+ years', 'Board-certified', 'Same-day', '24/7 portal']
    },
    process: [
      { step: 1, title: 'Book Your Visit', desc: 'Schedule online 24/7 or by phone. Same-day often available.' },
      { step: 2, title: 'Complete Intake', desc: 'Forms via portal. Bring ID and insurance.' },
      { step: 3, title: 'Meet Your Provider', desc: 'Personalized care plan together.' },
      { step: 4, title: 'Follow-Up & Support', desc: 'Results, refills, messages via portal.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
    ],
    trustBadges: ['HIPAA Compliant', 'Board Certified Physicians', 'Joint Commission Accredited', 'Patient Satisfaction Award'],
    whyChooseUs: [
      { title: 'Continuity of Care', desc: 'A care team that knows your history.' },
      { title: 'Technology', desc: 'Portal, telehealth, online scheduling.' },
      { title: 'Prevention-Focused', desc: 'Screenings that catch issues early.' },
      { title: 'Transparent', desc: 'Clear costs. No surprises.' },
      { title: 'Community Rooted', desc: '15 years serving Austin.' },
      { title: 'Same-Day Care', desc: 'Urgent? We fit you in.' }
    ],
    industryTags: ['primary care', 'preventive medicine', 'telehealth', 'patient portal', 'same-day appointments', 'family medicine', 'Austin healthcare', 'board certified'],
    seo: { metaTitle: 'TrustCare Clinic | Austin Healthcare | Primary Care & Telehealth', metaDescription: 'Board-certified physicians, same-day appointments, and 24/7 patient portal. Family medicine, preventive care, and telehealth in Austin. Schedule your visit today.' },
    featuredCaseStudy: { title: 'Patient-Centered Care', summary: 'Online booking, telehealth, and unified portal. 98% satisfaction.', metrics: ['98% satisfaction', '25% fewer no-shows', '12K+ patients'], testimonial: 'A medical home that works with my schedule.' },
    accreditations: ['Joint Commission Accredited', 'HIPAA Compliant', 'Board Certified Physicians', 'Patient-Centered Medical Home'],
    yearFounded: 2009,
    mission: 'To provide compassionate, comprehensive healthcare that puts patients first and makes quality care accessible to our community.',
    valueProps: [
      { title: 'Comprehensive Care', desc: 'Primary care, preventive, referrals one roof.' },
      { title: 'Convenience', desc: 'Online booking, telehealth, 24/7 portal.' },
      { title: 'Trust', desc: 'Clear communication. No surprises.' },
      { title: 'Continuity', desc: 'A care team that knows you.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Book Online', desc: 'Create an account in our patient portal and schedule your first appointment. Same-day slots often available.' },
      { step: 2, title: 'Complete Forms', desc: 'Fill out new patient forms before your visit. Bring ID, insurance card, and medication list.' },
      { step: 3, title: 'Meet Your Provider', desc: 'Your provider will review your history, perform an exam, and create a personalized care plan.' },
      { step: 4, title: 'Access Your Portal', desc: 'Use the portal for results, refills, messages, and future appointments. We are here for you.' }
    ],
    specialties: ['Primary Care', 'Preventive Medicine', 'Chronic Disease Management', 'Pediatrics', 'Telehealth', 'Laboratory Services'],
    socialProof: { rating: 4.9, reviewCount: 1247, award: 'Patient Satisfaction Award' },
    additionalFaq: [
      { question: 'Specialists?', answer: 'Yes. On staff or we coordinate referrals.' },
      { question: 'Pediatric care?', answer: 'Yes. Dr. Reyes provides well-child visits and vaccinations.' }
    ],
    ctaBanner: { headline: 'Ready to Prioritize Your Health?', subheadline: 'Book your appointment today. Same-day slots available. New patients welcome.', primaryCta: 'Book Now', secondaryCta: 'View Services' },
    featuredPartners: ['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealthcare', 'Medicare', 'Austin Medical Society'],
    responseTime: 'Same-day or next-day appointments typically available',
    accessibility: 'Wheelchair accessible; interpreters available upon request',
    serviceArea: 'Austin metro and surrounding communities',
    qualityCommitment: 'We measure success by patient outcomes and satisfaction. Continuous quality improvement guides everything we do.',
    communityNote: 'Proud member of the Austin medical community. We support local health initiatives and charitable care programs.',
    clientPromise: 'You will receive compassionate, comprehensive care from a team that listens and partners with you on your health journey.',
    relatedResources: ['Patient Portal Login', 'Insurance Accepted', 'New Patient Forms', 'Telehealth Guide'],
    popularServices: ['General Consultation', 'Annual Wellness', 'Telehealth', 'Preventive Screenings'],
    bookingNote: 'Online booking available 24/7. Same-day appointments often available for urgent concerns.',
    industryCategory: 'Healthcare',
    parentIndustry: 'Medical Services'
  },
  {
    id: 'beauty',
    name: 'Beauty Salon / Wellness',
    shortLabel: 'Beauty',
    brandName: 'Luna Beauty Studio',
    demoDomain: 'lunabeautystudio.com',
    icon: 'beauty',
    navLabels: ['Services', 'Gallery', 'Book'],
    heroImage: '/images/beauty-hero.png',
    services: [
      { title: 'Hair Styling', desc: 'Cuts, color, balayage & more.', icon: 'hair', featureList: ['Cuts', 'Color', 'Keratin'] },
      { title: 'Skin Care', desc: 'Facials, peels & LED therapy.', icon: 'skin', featureList: ['Facials', 'Peels', 'LED therapy'] },
      { title: 'Wellness', desc: 'Massage & relaxation.', icon: 'wellness', featureList: ['Swedish', 'Hot stone', 'Aromatherapy'] },
      { title: 'Nail Care', desc: 'Gel, dip & spa pedicures.', icon: 'nails', featureList: ['Gel', 'Spa pedicures', 'Nail art'] },
      { title: 'Bridal & Events', desc: 'Complete glam for your day.', icon: 'bridal', featureList: ['Trials', 'Day-of styling', 'Party packages'] },
      { title: 'Men\'s Grooming', desc: 'Beard, facials & cuts.', icon: 'mens', featureList: ['Beard', 'Facials', 'Hair cuts'] }
    ],
    hero: {
      headline: 'Feel Radiant, Be Confident',
      subheadline: 'Transform your look with our expert stylists and wellness treatments. A sanctuary where beauty meets relaxation.',
      bulletPoints: ['Award-winning stylists & estheticians', 'Premium products & sustainable options', 'Luxury atmosphere with personalized service', 'Membership rewards & loyalty program'],
      primaryCTA: 'Book Now',
      secondaryCTA: 'View Services'
    },
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '15', label: 'Expert Stylists' },
      { value: '4.9', label: 'Star Rating' },
      { value: '8K+', label: 'Happy Clients' }
    ],
    team: [
      { name: 'Nina Patel', role: 'Lead Stylist & Owner', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', bio: 'Award-winning stylist with 15+ years experience. Creates transformative looks for every client.' },
      { name: 'Marcus Johnson', role: 'Color Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: 'Master colorist specializing in balayage and dimensional color. Trained in NYC and Paris.' },
      { name: 'Elena Vasquez', role: 'Licensed Esthetician', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', bio: 'Expert in facials and skin rejuvenation. Uses premium, cruelty-free products for best results.' },
      { name: 'David Kim', role: 'Spa Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', bio: 'Oversees wellness services and ensures every guest receives a luxurious, personalized experience.' }
    ],
    testimonials: [
      { quote: 'Best salon experience. Pampered from the moment I walked in.', author: 'Emma L.', role: 'Client' },
      { quote: 'Nina transformed my hair. Compliments everywhere.', author: 'Jessica T.', role: 'Client' },
      { quote: 'Facials are incredible. Skin never looked better.', author: 'Michelle R.', role: 'Member' },
      { quote: 'Wedding trial felt like a princess. Stunning photos.', author: 'Ashley B.', role: 'Bride' },
      { quote: 'Great cuts, beard work. Relaxed atmosphere.', author: 'Daniel M.', role: 'Client' }
    ],
    proof: {
      testimonial: 'Best salon experience I have ever had. Will definitely be coming back!',
      author: 'Emma L., Regular Client'
    },
    faq: [
      { question: 'How far in advance should I book?', answer: 'We recommend booking 1-2 weeks ahead for peak times such as weekends and evenings. Same-day appointments may be available depending on availability. Call or check our online booking to see real-time openings. For bridal and event packages, we suggest booking 3-6 months in advance.' },
      { question: 'What is your cancellation policy?', answer: 'We ask for 24 hours notice for cancellations to allow us to offer the slot to others. Late cancellations may incur a fee. We understand emergencies happen just give us a call and we will work with you whenever possible.' },
      { question: 'Do you use cruelty-free products?', answer: 'Yes. We prioritize cruelty-free, sustainable brands throughout our salon and spa. Many of our products are also vegan and free from harsh chemicals. Ask your stylist or esthetician for recommendations that match your values.' },
      { question: 'Can I bring my children?', answer: 'Children are welcome for children\'s cuts (under 12) and we have experienced stylists who work well with kids. For longer services like color or facials, we suggest arranging childcare so you can fully relax and enjoy your experience.' },
      { question: 'Do you offer gift cards?', answer: 'Yes. Gift cards are available in any amount and never expire. They make the perfect gift for birthdays, holidays, or any occasion. Purchase online for instant delivery or in-salon they can be used for any of our services.' }
    ],
    pricing: [
      { name: 'Essential', price: '$85', features: ['Women\'s cut & style', 'Shampoo & conditioning', 'Blow dry', 'Basic consultation'] },
      { name: 'Signature', price: '$145', features: ['Cut, color & style', 'Premium products', 'Scalp massage', 'Style tips'] },
      { name: 'Luxury Day', price: '$299', features: ['Full service package', 'Hair + facial + nails', 'Lunch & refreshments', 'Personalized product kit'] }
    ],
    contact: {
      pitch: 'Reserve Your Spot',
      ctaLabel: 'Book Free Consultation',
      address: '892 Glamour Lane, Suite 100, Beverly Hills, CA 90210',
      phone: '(310) 555-0192',
      email: 'book@radiantbeautysalon.com',
      hours: 'Tue-Sat 9:00 AM - 7:00 PM, Sun 10:00 AM - 4:00 PM'
    },
    aboutSection: {
      title: 'Where Beauty Meets Wellness',
      paragraphs: [
        'Award-winning stylists, cruelty-free products, and a serene sanctuary. 10+ years in Beverly Hills.'
      ],
      highlights: ['Award-winning', 'Cruelty-free', 'Luxury', '10+ years']
    },
    process: [
      { step: 1, title: 'Book', desc: 'Online or call. Reminders sent.' },
      { step: 2, title: 'Consultation', desc: 'We discuss your goals and preferences.' },
      { step: 3, title: 'Enjoy', desc: 'Relax. We deliver results you\'ll love.' },
      { step: 4, title: 'Return', desc: 'Product tips. Loyalty rewards.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80'
    ],
    trustBadges: ['Award Winner', 'Licensed Professionals', 'Cruelty-Free Certified', 'Top Rated Salon'],
    whyChooseUs: [
      { title: 'Award-Winning Talent', desc: 'Industry recognition. Advanced training.' },
      { title: 'Premium Products', desc: 'Cruelty-free. Real results.' },
      { title: 'Luxury Experience', desc: 'Serene. Rejuvenating.' },
      { title: 'Personalized', desc: 'Tailored to your style.' },
      { title: 'Loyalty Rewards', desc: 'Points, discounts, perks.' },
      { title: 'Flexible Booking', desc: 'Online. Easy cancellation.' }
    ],
    industryTags: ['hair salon', 'spa', 'facials', 'manicure', 'pedicure', 'bridal', 'wellness', 'cruelty-free', 'Beverly Hills'],
    seo: { metaTitle: 'Radiant Beauty Salon | Beverly Hills | Hair, Skin, Nails & Wellness', metaDescription: 'Award-winning stylists, cruelty-free products, luxury atmosphere. Hair styling, facials, massage, nails, and bridal services in Beverly Hills. Book your appointment.' },
    featuredCaseStudy: { title: 'Bridal Beauty Excellence', summary: 'Radiant Beauty has styled over 500 brides with trial sessions, day-of coordination, and bridal party packages. Their attention to detail and stress-free approach has earned a 4.9-star rating and countless referrals.', metrics: ['500+ brides', '4.9 star rating', '8K+ happy clients'], testimonial: 'They made me feel like a princess on my wedding day.' },
    accreditations: ['Licensed Cosmetologists', 'Licensed Estheticians', 'Cruelty-Free Certified', 'Award-Winning Salon'],
    yearFounded: 2014,
    mission: 'To create a sanctuary where beauty meets wellness, empowering our clients to feel radiant and confident through exceptional service and premium products.',
    valueProps: [
      { title: 'Expert Stylists', desc: 'Advanced training. Results that turn heads.' },
      { title: 'Premium Products', desc: 'Cruelty-free. Real results.' },
      { title: 'Luxury', desc: 'Serene. Relaxing.' },
      { title: 'Personalized', desc: 'Looks for your unique style.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Choose Your Service', desc: 'Browse our menu of hair, skin, nails, and wellness services. Book online or call to schedule.' },
      { step: 2, title: 'Consultation', desc: 'Your stylist or esthetician discusses your goals and preferences. We customize every service.' },
      { step: 3, title: 'Enjoy', desc: 'Relax in our luxury environment. We take care of the rest while you unwind and rejuvenate.' },
      { step: 4, title: 'Return', desc: 'Take home product recommendations. Book your next visit and earn loyalty rewards.' }
    ],
    specialties: ['Hair Styling & Color', 'Facials & Skin Care', 'Massage & Wellness', 'Nail Art & Manicure', 'Bridal & Events', 'Men\'s Grooming'],
    socialProof: { rating: 4.9, reviewCount: 892, award: 'Top Rated Salon' },
    additionalFaq: [
      { question: 'Do you offer bridal packages?', answer: 'Yes. We offer complete bridal packages including trial sessions, day-of styling for you and your party, and coordination so you can focus on celebrating. Book 3-6 months ahead for wedding dates.' },
      { question: 'What products do you use?', answer: 'We use premium, cruelty-free products from trusted brands. Many are also vegan. Ask your stylist or esthetician for recommendations tailored to your hair and skin type.' }
    ],
    ctaBanner: { headline: 'Feel Radiant Today', subheadline: 'Book your next visit and experience the Radiant Beauty difference. New clients welcome.', primaryCta: 'Book Now', secondaryCta: 'View Services' },
    featuredPartners: ['Olaplex', 'Oribe', 'SkinCeuticals', 'Beverly Hills Chamber', 'StyleSeat'],
    responseTime: 'Online booking available 24/7; front desk responds within 2 hours',
    accessibility: 'Wheelchair accessible entrance and facilities',
    serviceArea: 'Beverly Hills, Los Angeles, and Greater LA',
    qualityCommitment: 'Every service meets our high standards. We invest in ongoing education and premium products.',
    communityNote: 'Active in Beverly Hills business community. Supporting local beauty and wellness initiatives.',
    clientPromise: 'You will leave feeling refreshed, confident, and looking your best. We personalize every service to you.',
    relatedResources: ['Service Menu', 'Book Online', 'Gift Cards', 'Loyalty Program'],
    popularServices: ['Hair Styling', 'Facials', 'Massage', 'Bridal Packages'],
    bookingNote: 'Book 1-2 weeks ahead for peak times. Bridal trials 3-6 months before wedding date.',
    industryCategory: 'Beauty & Wellness',
    parentIndustry: 'Personal Care'
  },
  {
    id: 'restaurant',
    name: 'Restaurant / Café',
    shortLabel: 'Restaurant',
    brandName: 'Bianchi Ristorante',
    demoDomain: 'bianchirestaurant.com',
    icon: 'restaurant',
    navLabels: ['Menu', 'Reservations', 'Contact'],
    heroImage: '/images/restaurant-hero.png',
    services: [
      { title: 'Fine Dining', desc: 'Farm-to-table. James Beard chef.', icon: 'dining', featureList: ['Farm-to-table', 'Wine pairings', 'Tasting menu'] },
      { title: 'Private Events', desc: 'Celebrations & corporate dinners.', icon: 'events', featureList: ['Buyout', 'Custom menus', 'Event coordinator'] },
      { title: 'Catering', desc: 'Office lunches to weddings.', icon: 'catering', featureList: ['Staffed or drop-off', 'Dietary options'] },
      { title: 'Brunch', desc: 'Pastries, eggs, mimosas.', icon: 'brunch', featureList: ['Bottomless mimosas', 'Fresh pastries'] },
      { title: 'Wine & Bar', desc: '500+ wines. Cocktails & small plates.', icon: 'bar', featureList: ['Wine Spectator', 'Cocktails', 'Small plates'] },
      { title: 'Cooking Classes', desc: 'Hands-on with our chef.', icon: 'classes', featureList: ['Seasonal', 'Recipes', 'Private groups'] }
    ],
    hero: {
      headline: 'Culinary Excellence Awaits',
      subheadline: 'Farm-to-table ingredients, artisanal techniques, and a dining experience you will remember.',
      bulletPoints: ['James Beard recognized chef', 'Locally sourced, seasonal ingredients', 'Intimate 50-seat dining room', 'Wine Spectator award-winning list'],
      primaryCTA: 'Reserve a Table',
      secondaryCTA: 'View Menu'
    },
    stats: [
      { value: '12', label: 'Years Open' },
      { value: '50', label: 'Seats' },
      { value: '4.8', label: 'Google Rating' },
      { value: '500+', label: 'Wine Selections' }
    ],
    team: [
      { name: 'Chef Marco Bianchi', role: 'Executive Chef & Owner', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop', bio: 'James Beard-recognized chef. Trained in Italy and France. Brings European technique to Pacific Northwest ingredients.' },
      { name: 'Sarah Chen', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop', bio: 'Creates house-made pastries and desserts that complement the seasonal menu. Former Le Cordon Bleu.' },
      { name: 'Antoine Dubois', role: 'Head Sommelier', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop', bio: 'Curates the Wine Spectator award-winning list. Expert in pairings that elevate every course.' },
      { name: 'Maria Santos', role: 'General Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: 'Ensures seamless service and memorable experiences for every guest. 20+ years in fine dining.' }
    ],
    testimonials: [
      { quote: 'The food and atmosphere at Tableaux are simply incredible. This has become our go-to for every special occasion birthdays, anniversaries, promotions. Chef Marco\'s creativity never disappoints, and the service team makes every visit feel like a celebration. We have recommended it to dozens of friends.', author: 'Michael R.', role: 'Dining Guest' },
      { quote: 'The tasting menu exceeded every expectation I had. Each course was a revelation beautifully plated, perfectly seasoned, and paired with wines that elevated the experience. Worth every penny and then some. This is destination dining at its finest.', author: 'Amanda S.', role: 'Food Critic' },
      { quote: 'We had our 20th anniversary dinner here and it was the best meal we have ever had together. The service was impeccable attentive without being intrusive. They even surprised us with a complimentary dessert. We will be back for our 21st.', author: 'David & Lisa K.', role: 'Guests' },
      { quote: 'We hosted our company holiday dinner at Tableaux and the entire team was blown away. The private dining room was perfect, the custom menu was incredible, and the event coordinator made everything seamless. Already booking for next year.', author: 'Sarah C.', role: 'Corporate Host' },
      { quote: 'The brunch is legendary in our household. We drive 45 minutes every few weeks just for those pastries and the eggs benedict. The bottomless mimosas and relaxed vibe make it the perfect weekend ritual. Tableaux has ruined other brunch spots for us.', author: 'Jennifer & Tom W.', role: 'Regulars' }
    ],
    proof: {
      testimonial: 'Incredible food and atmosphere. Our go-to for special occasions.',
      author: 'Michael R., Dining Guest'
    },
    faq: [
      { question: 'Do you accommodate dietary restrictions?', answer: 'Yes. We accommodate vegetarian, vegan, gluten-free, and common allergen needs with care and creativity. Please note your restrictions when making your reservation so our kitchen can prepare accordingly. Our chefs take pride in crafting dishes that meet dietary needs without compromising flavor.' },
      { question: 'What is the dress code?', answer: 'Smart casual is our standard. We recommend collared shirts and ask that guests avoid athletic wear. Jackets are optional but welcome for special occasions. We want you to feel comfortable while respecting the elevated dining atmosphere.' },
      { question: 'Can I book for a large party?', answer: 'For parties of 8 or more, we offer semi-private dining with dedicated service. Full buyouts are available for 20+ guests and include exclusive use of the dining room. Contact our events team for availability, custom menus, and pricing.' },
      { question: 'Do you offer gift cards?', answer: 'Yes. Gift cards are available in any amount and can be purchased online for instant delivery or at the restaurant. They never expire and can be used for dining, catering, or cooking classes. The perfect gift for food lovers.' },
      { question: 'Is valet parking available?', answer: 'Yes. Complimentary valet is offered for dinner guests. Street parking is also available in the surrounding downtown area. We recommend valet for convenience, especially on weekends when the neighborhood can be busy.' }
    ],
    pricing: [
      { name: 'À la Carte', price: '$$$', features: ['Full menu access', 'Appetizers $12-24', 'Entrees $28-48', 'Desserts $12-16'] },
      { name: 'Tasting Menu', price: '$125', features: ['6-course chef\'s selection', 'Wine pairings +$65', '2.5-3 hour experience', 'Advance reservation required'] },
      { name: 'Chef\'s Table', price: '$250', features: ['Exclusive kitchen experience', 'Custom 8-course menu', 'Sommelier pairing', 'Private for 2-6 guests'] }
    ],
    contact: {
      pitch: 'Make a Reservation',
      ctaLabel: 'Book a Table',
      address: '412 Vine Street, Downtown, Portland, OR 97204',
      phone: '(503) 555-0168',
      email: 'reservations@tableauxrestaurant.com',
      hours: 'Tue-Thu 5:00 PM - 10:00 PM, Fri-Sat 5:00 PM - 11:00 PM'
    },
    aboutSection: {
      title: 'Culinary Excellence',
      paragraphs: [
        'James Beard chef. Farm-to-table. Wine Spectator award. 12 years in Portland.'
      ],
      highlights: ['James Beard', 'Farm-to-table', 'Wine Spectator', '12 years']
    },
    process: [
      { step: 1, title: 'Reserve', desc: 'Book online. 1-2 weeks ahead for weekends.' },
      { step: 2, title: 'Arrive', desc: 'Valet. 50-seat room. We\'ll guide you.' },
      { step: 3, title: 'Dine', desc: 'Seasonal. Local. Wine pairings.' },
      { step: 4, title: 'Return', desc: 'Mailing list. Gift cards.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1414237427423-383a68688632?w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80'
    ],
    trustBadges: ['James Beard Recognized', 'Wine Spectator Award', 'Farm-to-Table Certified', 'OpenTable Diner\'s Choice'],
    whyChooseUs: [
      { title: 'Chef-Driven', desc: 'James Beard. Seasonal. Ingredient-focused.' },
      { title: 'Local', desc: 'Pacific Northwest farms. Freshest ingredients.' },
      { title: 'Wine', desc: '500+ selections. Sommelier pairings.' },
      { title: 'Intimate', desc: '50 seats. Every meal special.' },
      { title: 'Private Events', desc: 'Buyout. Custom menus.' },
      { title: 'Quality', desc: '12 years. Memorable every visit.' }
    ],
    industryTags: ['fine dining', 'farm to table', 'Portland restaurant', 'tasting menu', 'wine', 'private events', 'James Beard', 'seasonal'],
    seo: { metaTitle: 'Tableaux Restaurant | Portland Fine Dining | Farm-to-Table', metaDescription: 'James Beard-recognized chef, Wine Spectator award, farm-to-table cuisine. Reservations, tasting menu, private events. Portland\'s premier fine dining experience.' },
    featuredCaseStudy: { title: 'Culinary Destination in Portland', summary: 'Tableaux has become a Portland institution over 12 years. Their farm-to-table approach and Wine Spectator-awarded list draw diners from across the region. Private events and cooking classes extend the experience beyond the dining room.', metrics: ['12 years', '4.8 Google rating', '500+ wine selections'], testimonial: 'The tasting menu exceeded every expectation.' },
    accreditations: ['James Beard Recognized', 'Wine Spectator Award', 'Farm-to-Table Certified', 'OpenTable Diner\'s Choice'],
    yearFounded: 2012,
    mission: 'To celebrate Pacific Northwest ingredients with European technique, creating memorable dining experiences that honor both tradition and innovation.',
    valueProps: [
      { title: 'Chef-Driven Cuisine', desc: 'James Beard-recognized talent. Seasonal menus that showcase the best of the Pacific Northwest.' },
      { title: 'Wine Program', desc: 'Wine Spectator award-winning list. Sommelier-curated pairings that elevate every course.' },
      { title: 'Intimate Setting', desc: '50-seat dining room. Every meal feels special, whether a celebration or a quiet dinner.' },
      { title: 'Private Events', desc: 'Full buyout or semi-private. Custom menus and dedicated coordination for unforgettable occasions.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Reserve', desc: 'Book online or call. Specify party size, date, and any dietary needs. Weekend reservations fill fast.' },
      { step: 2, title: 'Arrive', desc: 'Complimentary valet available. Check in at the host stand. Settle into our intimate dining room.' },
      { step: 3, title: 'Dine', desc: 'Enjoy seasonal dishes and curated pairings. Let our team guide you through the experience.' },
      { step: 4, title: 'Return', desc: 'Join our mailing list for seasonal updates. Gift cards available for friends and food lovers.' }
    ],
    specialties: ['Fine Dining', 'Tasting Menu', 'Private Events', 'Wine Program', 'Catering', 'Cooking Classes'],
    socialProof: { rating: 4.8, reviewCount: 634, award: 'OpenTable Diner\'s Choice' },
    additionalFaq: [
      { question: 'Is the tasting menu available every night?', answer: 'Yes. Our 6-course tasting menu is available Tuesday through Saturday. Advance reservation is recommended. Wine pairings can be added for an additional charge.' },
      { question: 'Can you accommodate large groups?', answer: 'For parties of 8 or more, we offer semi-private dining. Full buyouts are available for 20+ guests. Contact our events team for availability and custom menu options.' }
    ],
    ctaBanner: { headline: 'Reserve Your Table', subheadline: 'Experience culinary excellence in Portland. Weekend reservations recommended.', primaryCta: 'Reserve Now', secondaryCta: 'View Menu' },
    featuredPartners: ['Oregon Wine Board', 'Portland Farmers Market', 'James Beard Foundation', 'Wine Spectator', 'OpenTable'],
    responseTime: 'Reservation confirmations sent within 1 hour',
    accessibility: 'Wheelchair accessible; dietary accommodations available',
    serviceArea: 'Portland metro; catering throughout Pacific Northwest',
    qualityCommitment: 'Every dish reflects our commitment to excellence. We source responsibly and cook with care.',
    communityNote: 'Proud partner of Portland Farmers Market. Supporting local agriculture and sustainable food systems.',
    clientPromise: 'You will experience memorable food, exceptional service, and an atmosphere that makes every meal special.',
    relatedResources: ['Reservations', 'Tasting Menu', 'Private Events', 'Catering'],
    popularServices: ['Tasting Menu', 'Fine Dining', 'Private Events', 'Wine & Bar'],
    bookingNote: 'Reservations recommended. Weekend slots fill 1-2 weeks ahead. Tasting menu requires advance booking.',
    industryCategory: 'Hospitality',
    parentIndustry: 'Food & Beverage'
  },
  {
    id: 'saas',
    name: 'SaaS / Startup',
    shortLabel: 'SaaS',
    brandName: 'WorkflowHQ',
    demoDomain: 'workflowhq.com',
    icon: 'saas',
    navLabels: ['Product', 'Pricing', 'Contact'],
    heroImage: '/images/saas-hero.png',
    services: [
      { title: 'Core Platform', desc: 'Unified dashboard. Deploy in minutes.', icon: 'platform', featureList: ['Dashboard', 'RBAC', 'Real-time'] },
      { title: 'Integrations', desc: '200+ integrations. REST API.', icon: 'integrations', featureList: ['200+ integrations', 'API', 'Zapier'] },
      { title: 'Analytics', desc: 'Custom dashboards & reports.', icon: 'analytics', featureList: ['Dashboards', 'Reports', 'Forecasting'] },
      { title: 'Automation', desc: 'No-code. 40% productivity gain.', icon: 'automation', featureList: ['No-code', 'Triggers', 'Scheduled'] },
      { title: 'Security', desc: 'SOC 2. GDPR. SSO.', icon: 'security', featureList: ['SOC 2', 'SSO', 'Encryption'] },
      { title: 'Support', desc: 'White-glove onboarding. 24/7 chat.', icon: 'support', featureList: ['Onboarding', '24/7 support', 'Training'] }
    ],
    hero: {
      headline: 'Build What\'s Next',
      subheadline: 'Powerful tools for modern teams. Scale faster, work smarter, and achieve more.',
      bulletPoints: ['Free 14-day trial, no credit card', 'Deploy in minutes, not months', 'Trusted by 5,000+ companies', '99.99% uptime SLA'],
      primaryCTA: 'Start Free Trial',
      secondaryCTA: 'Watch Demo'
    },
    stats: [
      { value: '5K+', label: 'Companies' },
      { value: '99.99%', label: 'Uptime' },
      { value: '40%', label: 'Avg. Productivity Gain' },
      { value: '4.9', label: 'Customer Rating' }
    ],
    team: [
      { name: 'Jordan Reeves', role: 'CEO & Co-founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop', bio: 'Former product lead at a Fortune 500. Founded WorkflowHQ to solve the tool fragmentation problem.' },
      { name: 'Priya Sharma', role: 'CTO & Co-founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', bio: 'Ex-Google engineer. Built scalable infrastructure that powers 5,000+ companies with 99.99% uptime.' },
      { name: 'Marcus Chen', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop', bio: 'Designs features that balance power with simplicity. Believes great software should be approachable.' },
      { name: 'Emily Foster', role: 'VP Customer Success', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: 'Leads the team that ensures customers achieve success. 15+ years in SaaS customer experience.' }
    ],
    testimonials: [
      { quote: 'WorkflowHQ has been a game-changing platform for our entire organization. Our team productivity has increased by 40% since we switched, and the unified dashboard means we spend less time jumping between tools and more time actually getting work done. The ROI was visible within the first month.', author: 'David K.', role: 'Product Manager' },
      { quote: 'We cut our operations costs by 30% in the first quarter after implementation. The automation features alone have eliminated countless hours of manual data entry and reporting. ROI was immediate and has only improved as our team has discovered more ways to leverage the platform.', author: 'Jennifer L.', role: 'COO, TechScale' },
      { quote: 'Hands down the best onboarding experience we have ever had with any SaaS product. We were up and running in a day, and the success team actually understood our workflow and helped us configure everything correctly. No more endless documentation they walked us through it.', author: 'Alex M.', role: 'Startup Founder' },
      { quote: 'The integrations were the deciding factor for us. We have a complex stack and WorkflowHQ connected to everything our CRM, our accounting software, our communication tools. The API documentation is excellent for our dev team. It has become the backbone of our operations.', author: 'Priya S.', role: 'CTO' },
      { quote: 'As a security-conscious company, we needed a platform we could trust with sensitive data. SOC 2 certification and SSO were non-negotiables. WorkflowHQ checked every box and the support team helped us through our security review. Highly recommend for enterprise teams.', author: 'Marcus T.', role: 'IT Director' }
    ],
    proof: {
      testimonial: 'Game-changing platform. Our team productivity has increased by 40%.',
      author: 'David K., Product Manager'
    },
    faq: [
      { question: 'Is there a free trial?', answer: 'Yes. Start a 14-day free trial with full feature access no credit card required to begin. You can upgrade, downgrade, or cancel anytime. We want you to experience the platform at its full potential before making a commitment. Many teams see value within the first few days.' },
      { question: 'How does billing work?', answer: 'We offer monthly and annual billing options. Annual plans save 20% and are our most popular choice. Billing is per seat, and we offer volume discounts for teams of 50 or more. Contact sales for custom enterprise pricing and dedicated support options.' },
      { question: 'Can I import data from my current tools?', answer: 'Yes. We provide migration tools and guided imports for popular platforms including Asana, Trello, Jira, and many others. Our success team can assist with large or complex migrations to ensure a smooth transition. Most migrations complete within a few days.' },
      { question: 'Is there an API?', answer: 'Yes. We offer a full REST API with comprehensive documentation, code examples, and SDKs. We also support webhooks for real-time event streaming so you can build custom integrations. Our API is designed for reliability and scale.' },
      { question: 'What security certifications do you have?', answer: 'We are SOC 2 Type II certified and GDPR compliant. We offer SSO, SAML, and enterprise-grade encryption for data at rest and in transit. Our security practices are independently audited annually. We take data protection seriously at every level.' }
    ],
    pricing: [
      { name: 'Starter', price: '$29/mo', features: ['Up to 5 users', 'Core features', 'Email support', '10 GB storage'] },
      { name: 'Pro', price: '$79/mo', features: ['Up to 25 users', 'Advanced analytics', 'Priority support', '100 GB storage'] },
      { name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'Custom integrations', 'Dedicated CSM', 'Unlimited storage'] }
    ],
    contact: {
      pitch: 'Get Started Today',
      ctaLabel: 'Start Free Trial',
      address: '500 Innovation Way, San Francisco, CA 94105',
      phone: '(415) 555-0123',
      email: 'sales@workflowhq.com',
      hours: 'Mon-Fri 9:00 AM - 6:00 PM PT'
    },
    aboutSection: {
      title: 'Built for Modern Teams',
      paragraphs: [
        '5,000+ companies. 99.99% uptime. SOC 2. Unify work, automation & collaboration.'
      ],
      highlights: ['5K+ companies', '99.99% uptime', 'SOC 2', '40% productivity']
    },
    process: [
      { step: 1, title: 'Start Trial', desc: 'Sign up. No credit card. Full access.' },
      { step: 2, title: 'Configure', desc: 'Import data. Connect tools. Guided setup.' },
      { step: 3, title: 'Train', desc: 'Tutorials. 24/7 support. Best practices.' },
      { step: 4, title: 'Scale', desc: 'Add seats. Automate more. Analytics.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    ],
    trustBadges: ['SOC 2 Type II', '99.99% Uptime SLA', 'G2 Leader', 'Forbes Cloud 100'],
    whyChooseUs: [
      { title: 'Unified Platform', desc: 'One tool instead of ten. Reduce context-switching and consolidate work, docs, and collaboration in one place.' },
      { title: 'Fast Time to Value', desc: 'Deploy in minutes with our free trial. No lengthy implementation. Start seeing productivity gains within weeks.' },
      { title: 'Enterprise Security', desc: 'SOC 2 Type II certified, GDPR compliant. Security and compliance built in, not bolted on.' },
      { title: 'Proven ROI', desc: 'Customers report an average 40% productivity gain. Our case studies and testimonials speak to real results.' },
      { title: '24/7 Support', desc: 'When you need help, we are there. Chat, email, and dedicated success managers for enterprise plans.' },
      { title: 'Continuous Innovation', desc: 'We ship new features regularly based on customer feedback. Your success shapes our product roadmap.' }
    ],
    industryTags: ['SaaS', 'productivity', 'workflow automation', 'collaboration', 'integrations', 'startup', 'enterprise', 'SOC 2'],
    seo: { metaTitle: 'WorkflowHQ | Workflow Automation & Collaboration Platform', metaDescription: 'Unify work, automate workflows, collaborate better. Trusted by 5,000+ companies. SOC 2 certified, 99.99% uptime. Start your free 14-day trial today.' },
    featuredCaseStudy: { title: '40% Productivity Gain', summary: 'WorkflowHQ customers report an average 40% productivity increase within the first quarter. Unified dashboards, no-code automation, and 200+ integrations eliminate friction. TechScale cut ops costs by 30% in 90 days.', metrics: ['40% productivity gain', '5K+ companies', '99.99% uptime'], testimonial: 'Game-changing platform. ROI was immediate.' },
    accreditations: ['SOC 2 Type II', 'GDPR Compliant', 'G2 Leader', 'Forbes Cloud 100'],
    yearFounded: 2018,
    mission: 'To empower teams to work better together through unified platforms, automation, and collaboration tools that scale with ambition.',
    valueProps: [
      { title: 'Unified Platform', desc: 'One tool for work, docs, automation, and collaboration. Reduce friction and context-switching.' },
      { title: 'Fast Deployment', desc: 'Free trial, no credit card. Deploy in minutes. See productivity gains within weeks.' },
      { title: 'Enterprise Ready', desc: 'SOC 2 certified, 99.99% uptime. Security and scale for growing teams.' },
      { title: 'Proven ROI', desc: '40% average productivity gain. Real results from real customers.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Start Trial', desc: 'Sign up in minutes. No credit card. Get full access to explore the platform.' },
      { step: 2, title: 'Import & Configure', desc: 'Bring in your data. Connect integrations. Set up workflows with guided help.' },
      { step: 3, title: 'Train Team', desc: 'Custom training and 24/7 support. Get everyone up to speed quickly.' },
      { step: 4, title: 'Scale', desc: 'Add seats. Automate more. Leverage analytics as you grow.' }
    ],
    specialties: ['Workflow Automation', 'Collaboration', 'Integrations', 'Analytics', 'Security & Compliance', 'Customer Success'],
    socialProof: { rating: 4.9, reviewCount: 523, award: 'G2 Leader' },
    additionalFaq: [
      { question: 'Can I integrate with my existing tools?', answer: 'Yes. We offer 200+ native integrations plus REST API access. Connect your CRM, accounting software, communication tools, and more. Migration assistance is available.' },
      { question: 'What happens when my trial ends?', answer: 'You can upgrade to a paid plan, downgrade to a lower tier, or pause your account. We will remind you before your trial ends. No charges without your explicit consent.' }
    ],
    ctaBanner: { headline: 'Start Your Free Trial', subheadline: 'No credit card required. Deploy in minutes. See why 5,000+ companies choose WorkflowHQ.', primaryCta: 'Start Free Trial', secondaryCta: 'Watch Demo' },
    featuredPartners: ['Salesforce', 'Slack', 'Google Workspace', 'Zapier', 'Microsoft 365', 'HubSpot'],
    responseTime: '24/7 chat support; sales responds within 4 business hours',
    accessibility: 'WCAG 2.1 compliant; keyboard navigation; screen reader support',
    serviceArea: 'Global; data centers in US and EU',
    qualityCommitment: 'We ship new features every week. Customer feedback drives our product roadmap.',
    communityNote: 'Trusted by startups and enterprises worldwide. Active in tech community events and open source.',
    clientPromise: 'You will see productivity gains and ROI quickly. We are committed to your success and scale with you.',
    relatedResources: ['Product Tour', 'Integrations', 'Documentation', 'Case Studies'],
    popularServices: ['Core Platform', 'Automation', 'Integrations', 'Analytics'],
    bookingNote: 'Start free trial in minutes. No credit card. Full access for 14 days.',
    industryCategory: 'Technology',
    parentIndustry: 'SaaS & Software'
  },
  {
    id: 'gym',
    name: 'Gym / Fitness Coach',
    shortLabel: 'Fitness',
    brandName: 'Peak Performance',
    demoDomain: 'peakperformance.fit',
    icon: 'fitness',
    navLabels: ['Programs', 'Pricing', 'Contact'],
    heroImage: '/images/gym-hero.png',
    services: [
      { title: 'Personal Training', desc: 'One-on-one sessions tailored specifically to your goals, whether you want to build strength, lose weight, or improve athletic performance. Your trainer designs custom workout programs, tracks your progress, and provides form correction and technique coaching. Every session is focused entirely on you and your results.', icon: 'training', featureList: ['Custom workout programs', 'Progress tracking', 'Form correction & technique'] },
      { title: 'Group Classes', desc: 'HIIT, yoga, spinning, strength, and more in an energizing group setting that keeps you motivated. With 40+ weekly classes, our experienced instructors lead sessions for all fitness levels. The community atmosphere pushes you further than you would go alone and makes workouts fun.', icon: 'classes', featureList: ['40+ weekly classes', 'Experienced instructors', 'All fitness levels welcome'] },
      { title: 'Nutrition', desc: 'Custom meal plans and macro coaching to fuel your fitness journey and amplify your results. Our nutrition coach provides meal planning templates, supplement guidance, and ongoing support. What you eat matters as much as how you train we help you get both right.', icon: 'nutrition', featureList: ['Macro coaching', 'Meal planning templates', 'Supplement guidance'] },
      { title: 'Recovery & Mobility', desc: 'Stretching, foam rolling, and recovery protocols to keep your body performing at its best. Our mobility workshops teach proper techniques, and we offer cryotherapy, sauna, and sports massage. Recovery is not optional it is how you get stronger.', icon: 'recovery', featureList: ['Mobility workshops', 'Cryotherapy & sauna', 'Sports massage'] },
      { title: 'Strength & Conditioning', desc: 'Powerlifting, Olympic lifts, and functional training with dedicated squat racks, platforms, and quality equipment. Our coaches specialize in compound lifts and progressive overload programs. Whether you are new to lifting or chasing a PR, we have the setup and expertise.', icon: 'strength', featureList: ['Squat racks & platforms', 'Coaching for compound lifts', 'Progressive overload programs'] },
      { title: 'Online Coaching', desc: 'Remote training for when you cannot make it to the gym. Get app-based workouts, video form checks from your coach, and weekly check-ins to stay accountable. Perfect for travel, busy schedules, or supplementing in-person training. You stay on track wherever you are.', icon: 'online', featureList: ['Video form checks', 'App-based workouts', 'Weekly check-ins'] }
    ],
    hero: {
      headline: 'Transform Your Life',
      subheadline: 'Personalized training, expert coaches, and a community that pushes you to be your best.',
      bulletPoints: ['Certified NASM & ACE trainers', '24/7 gym access for members', 'No commitment month-to-month', 'Free 7-day trial pass'],
      primaryCTA: 'Join Today',
      secondaryCTA: 'View Programs'
    },
    stats: [
      { value: '5K+', label: 'Members' },
      { value: '40+', label: 'Weekly Classes' },
      { value: '15', label: 'Certified Coaches' },
      { value: '24/7', label: 'Gym Access' }
    ],
    team: [
      { name: 'Coach Mike Torres', role: 'Head Coach & Owner', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop', bio: 'NASM certified. Former collegiate athlete. Built Peak Performance to create an inclusive fitness community.' },
      { name: 'Sarah Williams', role: 'Yoga & HIIT Instructor', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop', bio: 'Leads 40+ weekly classes. Makes every level feel welcome. Energy and motivation in every session.' },
      { name: 'James Chen', role: 'Strength & Conditioning', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop', bio: 'Specializes in powerlifting and Olympic lifts. Coaches proper form and progressive overload.' },
      { name: 'Dr. Lisa Park', role: 'Nutrition Coach', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop', bio: 'RD with focus on macro coaching and meal planning. Fuels members for performance and results.' }
    ],
    testimonials: [
      { quote: 'Joining Peak Performance was the best decision I ever made. I lost 20 pounds and gained confidence I did not know I had. The trainers pushed me in the right way, and the nutrition coaching made the biggest difference. I actually look forward to going to the gym now something I never thought I would say.', author: 'Jessica T.', role: 'Member' },
      { quote: 'The coaches here pushed me to limits I did not know I had. I went from barely being able to run a mile to completing my first half-marathon. The combination of strength training and group classes kept me engaged. I love this gym and the people in it.', author: 'Marcus D.', role: 'Member' },
      { quote: 'I have tried many gyms over the years and finally found one that feels like family. The community is incredible people actually say hello and support each other. The 24/7 access works perfectly with my schedule. This is my fitness home.', author: 'Amy L.', role: 'Member' },
      { quote: 'The personal training has been worth every penny. My trainer understood my goals and created a program that fit my busy life. The form checks alone have prevented injuries and helped me lift heavier safely. I have recommended Peak Performance to everyone I know.', author: 'Chris R.', role: 'Member' },
      { quote: 'The recovery facilities sauna, cryotherapy, sports massage set this gym apart. I train hard and my body needs proper recovery. Having it all under one roof makes it easy to take care of myself. Best gym in Denver, hands down.', author: 'Taylor M.', role: 'Member' }
    ],
    proof: {
      testimonial: 'Best decision I ever made. Lost 20lbs and gained confidence.',
      author: 'Jessica T., Member'
    },
    faq: [
      { question: 'Do you offer a free trial?', answer: 'Yes. Get a 7-day free pass to try all facilities, classes, and amenities. No credit card required just bring a valid ID and wear athletic attire. It is the perfect way to experience our community and see if Peak Performance is the right fit for you.' },
      { question: 'What are your membership options?', answer: 'We offer month-to-month, 6-month, and annual memberships with no long-term contract required. All memberships include 24/7 gym access. Add-ons like personal training, nutrition coaching, and guest passes are available. Annual members save the most.' },
      { question: 'Do I need experience to join?', answer: 'No. We welcome all fitness levels from complete beginners to competitive athletes. New member orientation includes a facility tour and introduction to equipment. Our coaches are here to help you feel confident and get started safely.' },
      { question: 'What should I bring to my first visit?', answer: 'Bring a valid ID, water bottle, workout clothes, and athletic sneakers. Towels are provided for members. Lockers are available bring your own lock or purchase one at the front desk. We have everything else you need.' },
      { question: 'Are there showers and changing rooms?', answer: 'Yes. We have full locker rooms with private showers, shampoo, body wash, and blow dryers. Complimentary towels are provided for all members. Our facilities are cleaned and maintained to high standards throughout the day.' }
    ],
    pricing: [
      { name: 'Basic', price: '$49/mo', features: ['24/7 gym access', 'Free weights & machines', 'Locker room access', 'No contract'] },
      { name: 'Unlimited', price: '$79/mo', features: ['Everything in Basic', 'Unlimited group classes', 'Sauna & recovery room', 'Guest passes'] },
      { name: 'Elite', price: '$149/mo', features: ['Everything in Unlimited', '2 PT sessions/month', 'Nutrition consultation', 'Priority class booking'] }
    ],
    contact: {
      pitch: 'Start Your Journey',
      ctaLabel: 'Get Free Assessment',
      address: '2200 Iron Street, Denver, CO 80202',
      phone: '(303) 555-0175',
      email: 'info@peakperformancegym.com',
      hours: '24/7 Member Access, Front Desk: Mon-Fri 6:00 AM - 10:00 PM'
    },
    aboutSection: {
      title: 'Transform Your Life, One Workout at a Time',
      paragraphs: [
        'Peak Performance Gym was built on the belief that everyone deserves access to expert coaching, quality equipment, and a community that motivates and supports. Our certified NASM and ACE trainers bring decades of combined experience across strength training, conditioning, yoga, nutrition, and recovery. We invest in continuing education so our team stays current with the latest research and techniques. Every coach is passionate about helping you succeed and will push you in the right way.',
        'With over 5,000 members and 40+ weekly classes, we have created an environment where people of all fitness levels achieve their goals whether that is losing weight, building muscle, training for a marathon, or simply feeling stronger and more energetic. Our community is inclusive and welcoming; you will find beginners and athletes alike, all supporting each other. We meet you where you are and design programs that help you progress safely and effectively. The energy in our space is contagious.',
        'Our 24/7 access means your schedule never gets in the way of your fitness. Work out at 5 AM before your commute or at 10 PM after the kids are asleep. No long-term contracts, no pressure, just a commitment to your own growth. Join the community that has transformed thousands of lives and discover what you are capable of.'
      ],
      highlights: ['5K+ members', 'NASM & ACE certified', '24/7 access', '40+ weekly classes']
    },
    process: [
      { step: 1, title: 'Free Assessment', desc: 'Schedule a complimentary fitness assessment with one of our coaches. We discuss your goals, experience level, and any limitations, then create a personalized plan to get you started.' },
      { step: 2, title: 'Choose Your Path', desc: 'Select your membership level Basic, Unlimited, or Elite and any add-ons like personal training or nutrition coaching. No long-term contract required; month-to-month is available.' },
      { step: 3, title: 'Orientation', desc: 'Tour the facility, meet the coaches, and get familiar with equipment and our class schedule. We show you how to use key machines and answer any questions. You will feel confident from day one.' },
      { step: 4, title: 'Train & Grow', desc: 'Start your fitness journey. Use the gym 24/7, join group classes, and track your progress in our app. Our coaches are here to support you every step of the way as you transform.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80'
    ],
    trustBadges: ['NASM Certified', 'ACE Certified', 'BBB Accredited', 'Best Gym Denver'],
    whyChooseUs: [
      { title: 'Certified Coaches', desc: 'NASM and ACE certified trainers who design programs based on science and your individual goals.' },
      { title: '24/7 Access', desc: 'Work out on your schedule. Early morning, late night, weekends the gym is always open for members.' },
      { title: 'Inclusive Community', desc: 'All fitness levels welcome. From beginners to athletes, everyone finds support and motivation here.' },
      { title: 'Comprehensive Offerings', desc: 'Strength, cardio, classes, recovery facilities, nutrition everything you need under one roof.' },
      { title: 'No Long-Term Contract', desc: 'Month-to-month flexibility. Commit to yourself without being locked in.' },
      { title: 'Proven Results', desc: 'Thousands of success stories. Our members achieve real transformations with the right support.' }
    ],
    industryTags: ['gym', 'fitness', 'personal training', 'group classes', '24/7', 'Denver', 'NASM', 'yoga', 'strength training'],
    seo: { metaTitle: 'Peak Performance Gym | Denver | 24/7 Access, Personal Training', metaDescription: '5,000+ members, NASM certified trainers, 40+ weekly classes. Personal training, nutrition, 24/7 access. Free 7-day trial. Transform your life in Denver.' },
    featuredCaseStudy: { title: 'Community-Driven Transformation', summary: 'Peak Performance built a community where members support each other. With 5,000+ members and 40+ weekly classes, members report life-changing results weight loss, strength gains, and improved confidence. The 24/7 model accommodates every schedule.', metrics: ['5K+ members', '40+ classes weekly', '24/7 access'], testimonial: 'Best decision I ever made. Lost 20lbs and gained confidence.' },
    accreditations: ['NASM Certified', 'ACE Certified', 'BBB Accredited', 'Best Gym Denver'],
    yearFounded: 2015,
    mission: 'To transform lives through expert coaching, inclusive community, and facilities that empower people of all levels to achieve their fitness goals.',
    valueProps: [
      { title: 'Expert Coaching', desc: 'NASM and ACE certified. Programs designed for your goals, whether strength, endurance, or wellness.' },
      { title: '24/7 Access', desc: 'Work out on your schedule. Early morning or late night the gym is always open.' },
      { title: 'Inclusive Community', desc: 'All fitness levels welcome. Support, motivation, and camaraderie in every class.' },
      { title: 'Complete Experience', desc: 'Strength, cardio, classes, recovery, nutrition. Everything you need under one roof.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Free Assessment', desc: 'Schedule a complimentary fitness assessment. We discuss goals and create a plan.' },
      { step: 2, title: 'Choose Membership', desc: 'Select Basic, Unlimited, or Elite. Add PT or nutrition if desired. No long-term contract.' },
      { step: 3, title: 'Orientation', desc: 'Tour the facility. Meet coaches. Get familiar with equipment and class schedule.' },
      { step: 4, title: 'Train', desc: 'Start your journey. 24/7 access. Join classes. Track progress. Transform.' }
    ],
    specialties: ['Personal Training', 'Group Classes', 'Strength & Conditioning', 'Yoga & HIIT', 'Nutrition Coaching', 'Recovery & Mobility'],
    socialProof: { rating: 4.9, reviewCount: 756, award: 'Best Gym Denver' },
    additionalFaq: [
      { question: 'What is included in the 7-day free trial?', answer: 'Full access to the gym, all group classes, locker rooms, and amenities. No credit card required. Bring ID and athletic attire. It is the best way to experience our community.' },
      { question: 'Do you offer nutrition coaching?', answer: 'Yes. Our nutrition coach provides macro coaching, meal planning, and supplement guidance. Available as an add-on to Elite membership or as a standalone service.' }
    ],
    ctaBanner: { headline: 'Start Your Transformation', subheadline: 'Get a 7-day free pass. No credit card. Experience the Peak Performance difference.', primaryCta: 'Get Free Pass', secondaryCta: 'View Programs' },
    featuredPartners: ['NASM', 'ACE', 'Colorado Fitness Association', 'Denver Chamber', 'MyFitnessPal'],
    responseTime: 'Front desk responds same day; free trial starts immediately',
    accessibility: 'Wheelchair accessible; adaptive equipment available',
    serviceArea: 'Denver metro; online coaching nationwide',
    qualityCommitment: 'Our coaches are certified and continually trained. We deliver programs that produce results.',
    communityNote: 'Denver fitness community leader. Sponsoring local races, events, and wellness initiatives.',
    clientPromise: 'You will find a supportive community and expert coaching that helps you achieve your fitness goals.',
    relatedResources: ['Class Schedule', 'Membership Options', 'Free Trial', 'Personal Training'],
    popularServices: ['Personal Training', 'Group Classes', 'Nutrition', '24/7 Access'],
    bookingNote: '7-day free trial. No credit card. Bring ID and athletic attire to start.',
    industryCategory: 'Fitness',
    parentIndustry: 'Health & Wellness'
  },
  {
    id: 'education',
    name: 'Education / Course',
    shortLabel: 'Education',
    brandName: 'CodeWorks Academy',
    demoDomain: 'codeworksacademy.com',
    icon: 'education',
    navLabels: ['Courses', 'Instructors', 'Contact'],
    heroImage: '/images/education-hero.png',
    services: [
      { title: 'Online Courses', desc: 'Self-paced learning with expert-led video content that fits your schedule. Get lifetime access to course materials, downloadable resources, and a certificate of completion. Our instructors are practitioners from top companies who bring real-world experience. Learn at your own pace and revisit materials whenever you need them.', icon: 'courses', featureList: ['Lifetime access', 'Downloadable resources', 'Certificate of completion'] },
      { title: 'Live Workshops', desc: 'Interactive sessions with instructors and peers in real time. Ask questions, work through hands-on projects, and collaborate with fellow learners. Our workshops cover in-demand topics and are designed for practical application. Many students form lasting professional connections during these sessions.', icon: 'workshops', featureList: ['Real-time Q&A', 'Hands-on projects', 'Peer collaboration'] },
      { title: 'Certifications', desc: 'Industry-recognized credentials that boost your resume and open doors. Our certification programs include exam prep, practice assessments, and LinkedIn integration so you can showcase your achievement. Employers value these credentials our graduates report increased job opportunities and salary growth.', icon: 'cert', featureList: ['Industry-recognized badges', 'LinkedIn integration', 'Exam prep included'] },
      { title: 'Bootcamps', desc: 'Intensive 12-week programs for career changers and upskillers who want to transform their trajectory. We offer immersive learning with career support services including resume review, interview prep, and job placement assistance. Select programs include a job guarantee for qualifying students.', icon: 'bootcamp', featureList: ['12-week immersive programs', 'Career support services', 'Job guarantee option'] },
      { title: 'Corporate Training', desc: 'Custom programs tailored to your organization\'s needs and goals. We design curriculum around your team\'s skill gaps and industry requirements. Progress dashboards give leaders visibility into learning outcomes. Volume discounts make it scalable for teams of any size.', icon: 'corporate', featureList: ['Tailored curriculum', 'Progress dashboards', 'Volume discounts'] },
      { title: '1:1 Mentorship', desc: 'Personalized guidance from industry experts who have walked the path you are on. Get a custom learning path, weekly 1:1 sessions, and portfolio or project review. Mentorship accelerates your growth by providing accountability, feedback, and insider knowledge that courses alone cannot offer.', icon: 'mentor', featureList: ['Custom learning path', 'Weekly 1:1 sessions', 'Portfolio review'] }
    ],
    hero: {
      headline: 'Unlock Your Potential',
      subheadline: 'Learn from experts. Master new skills. Advance your career with our curated courses and certifications.',
      bulletPoints: ['200+ courses across 12 industries', 'Expert instructors from top companies', 'Learn at your own pace', '30-day money-back guarantee'],
      primaryCTA: 'Browse Courses',
      secondaryCTA: 'View Curriculum'
    },
    stats: [
      { value: '50K+', label: 'Students' },
      { value: '200+', label: 'Courses' },
      { value: '4.8', label: 'Average Rating' },
      { value: '95%', label: 'Completion Rate' }
    ],
    team: [
      { name: 'Dr. Rebecca Foster', role: 'Academic Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', bio: 'PhD in Education. Ensures curriculum quality and alignment with industry needs. Former university professor.' },
      { name: 'Marcus Johnson', role: 'Lead Instructor, Data Science', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: 'Ex-Meta data scientist. Teaches practical skills that employers want. Project-based, hands-on approach.' },
      { name: 'Priya Sharma', role: 'Lead Instructor, Web Dev', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: 'Full-stack developer with 10+ years experience. Helps bootcamp grads land their first dev roles.' },
      { name: 'David Okonkwo', role: 'Career Services Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', bio: 'Connects graduates with hiring partners. Resume review, interview prep, negotiation support.' }
    ],
    testimonials: [
      { quote: 'The content was clear, engaging, and perfectly structured for someone with a full-time job. I studied in the evenings and on weekends, and within 3 months I landed a new role with a 40% salary increase. SkillForge gave me the skills and confidence to make a real career change.', author: 'Alex P.', role: 'Student' },
      { quote: 'The bootcamp was intense there is no sugarcoating it but it was absolutely worth it. I am now a full-time developer at a company I love. The career support team helped me with my resume, mock interviews, and negotiating my offer. Best decision I ever made.', author: 'Jordan M.', role: 'Graduate' },
      { quote: 'I have taken courses from many platforms, and SkillForge stands out. The certifications I earned here opened so many doors recruiters actually mention them. The instructors are practitioners, not just teachers. Best investment I have made in my career.', author: 'Sandra L.', role: 'Professional' },
      { quote: 'Our company enrolled 50 employees in their corporate training program. The tailored curriculum addressed our exact needs, and the progress dashboards gave our L&D team real visibility. Completion rates were higher than any other platform we have tried. Highly recommend for organizations.', author: 'David K.', role: 'L&D Manager' },
      { quote: 'The 1:1 mentorship was a game-changer. My mentor had 15 years in the industry and gave me advice I could never get from a course. The weekly sessions kept me accountable, and the portfolio review helped me land my first client. Worth every penny.', author: 'Maria S.', role: 'Graduate' }
    ],
    proof: {
      testimonial: 'Clear, engaging content. I landed a new job within 3 months.',
      author: 'Alex P., Student'
    },
    faq: [
      { question: 'Can I learn at my own pace?', answer: 'Yes. Most of our courses are self-paced with lifetime access learn when it fits your schedule. Bootcamps and live workshops have set schedules for the cohort experience. You can pause and resume self-paced courses as needed. We understand that life gets busy.' },
      { question: 'Do you offer refunds?', answer: 'Yes. We offer a 30-day money-back guarantee on all courses. If you are not satisfied for any reason, contact us for a full refund no questions asked. We want you to feel confident in your investment. Bootcamp refunds have different terms; see program details.' },
      { question: 'Are certificates recognized by employers?', answer: 'Our certifications are recognized by many employers and industry bodies. We partner with companies for hiring pipelines and have seen graduates hired at top firms. Check individual course pages for specific recognition details. LinkedIn integration helps you showcase credentials to recruiters.' },
      { question: 'Do you offer financial aid?', answer: 'We offer several options: payment plans to spread cost over time, scholarships for select programs based on need and merit, and income share agreements for bootcamps where you pay after landing a job. Contact admissions to discuss which option fits your situation.' },
      { question: 'How do I get help during a course?', answer: 'Each course has a discussion forum where you can ask questions and connect with peers. Bootcamp and workshop students get direct instructor access. 1:1 mentorship includes weekly office hours. Our support team also responds to technical and account questions within 24 hours.' }
    ],
    pricing: [
      { name: 'Single Course', price: '$99', features: ['Lifetime access', 'All video lessons', 'Downloadable resources', 'Certificate'] },
      { name: 'Pro Membership', price: '$29/mo', features: ['Access to all courses', 'New courses monthly', 'Certificates', 'Community forum'] },
      { name: 'Bootcamp', price: '$9,999', features: ['12-week program', 'Career support', 'Job guarantee option', '1:1 mentorship'] }
    ],
    contact: {
      pitch: 'Start Learning',
      ctaLabel: 'Request Course Catalog',
      address: '1500 Learning Way, Boston, MA 02108',
      phone: '(617) 555-0198',
      email: 'enroll@skillforgeacademy.com',
      hours: 'Mon-Fri 9:00 AM - 6:00 PM EST'
    },
    aboutSection: {
      title: 'Unlock Your Potential Through Learning',
      paragraphs: [
        'SkillForge Academy exists to bridge the gap between education and employment we believe learning should lead to opportunity. Our 200+ courses and 50,000+ students worldwide prove that learning from industry practitioners delivers real, measurable results. We focus on skills employers actually want: data science, web development, UX design, digital marketing, and more. Our curriculum is designed with input from hiring managers and updated regularly to reflect current industry needs.',
        'Our instructors come from companies like Google, Meta, Amazon, and leading startups. They teach what they do daily, not theory from a textbook. That practical, project-based focus is why our completion rates exceed 95% and our graduates report tangible career outcomes promotions, new jobs, salary increases. We do not just teach concepts; we help you build portfolios and demonstrate competence. Learning with SkillForge is an investment that pays dividends.',
        'Whether you are changing careers, advancing in your current role, or building new skills for personal growth, SkillForge meets you where you are. Our flexible formats self-paced courses, live workshops, bootcamps, and 1:1 mentorship cater to different learning styles and schedules. Our 30-day money-back guarantee means you can start with confidence. If we are not the right fit, there is no risk.'
      ],
      highlights: ['50K+ students', '200+ courses', '95% completion rate', 'Industry expert instructors']
    },
    process: [
      { step: 1, title: 'Browse & Choose', desc: 'Explore our 200+ courses, bootcamps, or 1:1 mentorship options. Filter by skill area, difficulty level, and format self-paced, live, or hybrid. Read reviews and course syllabi to find the right fit.' },
      { step: 2, title: 'Enroll', desc: 'Sign up and get immediate access to your chosen program. Payment plans and financial aid are available for qualifying students. Our admissions team can help you choose and fund your education.' },
      { step: 3, title: 'Learn', desc: 'Watch video lessons, complete hands-on projects, and engage in discussion forums with instructors and peers. Get help when you need it through Q&A, office hours, or 1:1 support. Learn at your pace.' },
      { step: 4, title: 'Certify & Advance', desc: 'Earn your certificate of completion, add it to your LinkedIn profile, and apply your new skills in your career. Bootcamp graduates get career support. Many of our students land new roles within months.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      'https://images.unsplash.com/photo-1503676260722-fddd7b844214?w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80'
    ],
    trustBadges: ['95% Completion Rate', '30-Day Money-Back', 'Industry Recognized', 'Top Rated on G2'],
    whyChooseUs: [
      { title: 'Industry Expert Instructors', desc: 'Learn from practitioners at Google, Meta, and top startups people who do this work every day.' },
      { title: 'Project-Based Learning', desc: 'Build real portfolios and projects that demonstrate your skills to employers. Theory meets practice.' },
      { title: 'Proven Outcomes', desc: '95% completion rate. Graduates report new jobs, promotions, and salary increases. We measure success by your success.' },
      { title: 'Flexible Formats', desc: 'Self-paced courses, live workshops, bootcamps, and 1:1 mentorship. Choose what fits your life.' },
      { title: 'Career Support', desc: 'Resume review, interview prep, job placement assistance. We help you land the role you want.' },
      { title: '30-Day Guarantee', desc: 'Not satisfied? Full refund, no questions asked. Start with confidence and zero risk.' }
    ],
    industryTags: ['online courses', 'bootcamp', 'certifications', 'career change', 'upskilling', 'mentorship', 'self-paced', 'Boston'],
    seo: { metaTitle: 'SkillForge Academy | Online Courses, Bootcamps & Certifications', metaDescription: '50K+ students, 200+ courses, 95% completion rate. Learn from industry experts. Data science, web dev, design. 30-day money-back guarantee.' },
    featuredCaseStudy: { title: 'Career Transformation at Scale', summary: 'SkillForge graduates land new jobs within months. With 95% completion rates and industry-recognized certifications, students report salary increases and career pivots. Bootcamp job guarantee and 1:1 mentorship accelerate outcomes.', metrics: ['95% completion', '50K+ students', '30-day guarantee'], testimonial: 'Landed a new job within 3 months. Best investment in my career.' },
    accreditations: ['Industry-Recognized Certifications', 'Top Rated on G2', 'Accredited Programs', 'Corporate Training Partner'],
    yearFounded: 2016,
    mission: 'To bridge the gap between education and employment, empowering learners with skills that lead to real career outcomes and opportunity.',
    valueProps: [
      { title: 'Industry Experts', desc: 'Learn from practitioners at top companies. Real skills, real projects, real results.' },
      { title: 'Flexible Learning', desc: 'Self-paced courses, live workshops, bootcamps. Choose the format that fits your life.' },
      { title: 'Career Support', desc: 'Resume review, interview prep, job placement. We help you land the role you want.' },
      { title: '30-Day Guarantee', desc: 'Not satisfied? Full refund. Start with confidence and zero risk.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Browse', desc: 'Explore 200+ courses. Filter by skill, level, format. Read reviews and syllabi.' },
      { step: 2, title: 'Enroll', desc: 'Sign up. Get immediate access. Use payment plans or financial aid if needed.' },
      { step: 3, title: 'Learn', desc: 'Watch videos. Complete projects. Engage in forums. Get help when you need it.' },
      { step: 4, title: 'Certify', desc: 'Earn your certificate. Update LinkedIn. Apply new skills. Advance your career.' }
    ],
    specialties: ['Data Science', 'Web Development', 'UX Design', 'Digital Marketing', 'Bootcamps', '1:1 Mentorship'],
    socialProof: { rating: 4.8, reviewCount: 3421, award: 'Top Rated on G2' },
    additionalFaq: [
      { question: 'Are your bootcamps full-time or part-time?', answer: 'We offer both. Full-time bootcamps run 12 weeks with immersive daily sessions. Part-time options allow you to learn while working. Check individual program pages for schedules.' },
      { question: 'Do employers recognize SkillForge certifications?', answer: 'Yes. Our certifications are recognized by many employers. We partner with companies for hiring pipelines. Graduates report increased job opportunities and salary growth.' }
    ],
    ctaBanner: { headline: 'Unlock Your Potential', subheadline: 'Start learning today. 30-day money-back guarantee. 200+ courses, industry expert instructors.', primaryCta: 'Browse Courses', secondaryCta: 'View Curriculum' },
    featuredPartners: ['Google', 'Meta', 'Amazon', 'LinkedIn Learning', 'Coursera Partners', 'Tech Hiring Networks'],
    responseTime: 'Admissions responds within 24 hours; instant access after enrollment',
    accessibility: 'Closed captions; adjustable playback speed; mobile-friendly',
    serviceArea: 'Global; courses available worldwide',
    qualityCommitment: 'Curriculum is reviewed and updated regularly. We partner with employers to ensure relevance.',
    communityNote: '50,000+ alumni network. Scholarship programs for underserved communities.',
    clientPromise: 'You will gain skills that translate to real career outcomes. We are invested in your success.',
    relatedResources: ['Course Catalog', 'Bootcamps', 'Financial Aid', 'Career Services'],
    popularServices: ['Online Courses', 'Bootcamps', 'Certifications', '1:1 Mentorship'],
    bookingNote: 'Enroll anytime for self-paced. Bootcamp cohorts start monthly. Payment plans available.',
    industryCategory: 'Education',
    parentIndustry: 'Professional Development'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    shortLabel: 'Real Estate',
    brandName: 'Walsh & Associates',
    demoDomain: 'walshandassociates.com',
    icon: 'realestate',
    navLabels: ['Properties', 'About', 'Contact'],
    heroImage: '/images/real-estate-hero.png',
    services: [
      { title: 'Buy', desc: 'Find your dream home from our curated listings with personalized search alerts that match your criteria. We arrange virtual and in-person tours at your convenience and provide expert negotiation support from offer to close. Our buyer specialists know the market and help you make confident decisions.', icon: 'buy', featureList: ['Personalized search alerts', 'Virtual & in-person tours', 'Negotiation support'] },
      { title: 'Sell', desc: 'Expert marketing and strategy to get you the best price for your property. We provide professional photography, MLS listing and syndication to all major portals, and staging consultation. Our sellers often receive multiple offers and close above list price. We handle every detail.', icon: 'sell', featureList: ['Professional photography', 'MLS & syndication', 'Staging consultation'] },
      { title: 'Rent', desc: 'Short and long-term rentals for every need residential and commercial. We handle lease review to protect your interests and conduct thorough tenant screening. Whether you are looking for your next apartment or an office space, we simplify the search and paperwork.', icon: 'rent', featureList: ['Residential & commercial', 'Lease review', 'Tenant screening'] },
      { title: 'Investment', desc: 'Commercial and multi-family opportunities for investors seeking cash flow and appreciation. Our investment team provides market analysis, ROI projections, and property management referrals. We help you evaluate deals, structure purchases, and build your portfolio strategically.', icon: 'investment', featureList: ['Market analysis', 'ROI projections', 'Property management referral'] },
      { title: 'Relocation', desc: 'Smooth moves for corporate and family relocations with area orientation tours, school and commute information, and temporary housing solutions. We understand the stress of moving and coordinate every detail so you can focus on the transition. Many of our clients come from out-of-state.', icon: 'relocation', featureList: ['Area orientation tours', 'School & commute info', 'Temporary housing'] },
      { title: 'Property Management', desc: 'Full-service management for landlords who want hands-off ownership. We handle tenant placement, maintenance coordination, and financial reporting. Our team ensures your property is well-maintained, legally compliant, and consistently profitable. Maximize returns without the hassle.', icon: 'management', featureList: ['Tenant placement', 'Maintenance coordination', 'Financial reporting'] }
    ],
    hero: {
      headline: 'Find Your Perfect Space',
      subheadline: 'Premium properties for every lifestyle. Let us help you discover your next home or investment.',
      bulletPoints: ['Top 1% agents in the metro area', '$500M+ in closed transactions', 'Personalized service from search to close', 'Free home valuation for sellers'],
      primaryCTA: 'Browse Properties',
      secondaryCTA: 'Contact Agent'
    },
    stats: [
      { value: '$500M+', label: 'Closed Volume' },
      { value: '1,200+', label: 'Happy Clients' },
      { value: '15', label: 'Years Experience' },
      { value: '4.9', label: 'Client Rating' }
    ],
    team: [
      { name: 'Jennifer Walsh', role: 'Managing Broker', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', bio: 'Top 1% agent. $100M+ in career sales. Leads the team with integrity and market expertise.' },
      { name: 'Michael Santos', role: 'Senior Agent, Luxury', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: 'Specializes in high-end properties. Understands the luxury buyer and delivers exceptional marketing.' },
      { name: 'Rachel Kim', role: 'Buyer Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: 'Guides buyers through every step. First-time buyer advocate. Finds the right fit for every budget.' },
      { name: 'David Morgan', role: 'Investment Advisor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', bio: 'Focuses on multi-family and commercial. Provides ROI analysis and market insights for investors.' }
    ],
    testimonials: [
      { quote: 'The Premier Realty team was professional, responsive, and genuinely cared about finding us the right home. They listened to our must-haves and deal-breakers, sent us properties before they hit the market, and guided us through every step. We could not be happier with our new place. Highly recommend to anyone buying in the area.', author: 'The Chen Family', role: 'Home Buyers' },
      { quote: 'Our home sold in 5 days for over asking price. Jennifer\'s marketing was exceptional professional photos, a stunning listing, and strategic pricing that created a bidding situation. She handled multiple offers with expertise and kept us informed throughout. Best real estate experience we have ever had.', author: 'Robert T.', role: 'Seller' },
      { quote: 'We relocated from the East Coast for my husband\'s job and Premier Realty made the entire process stress-free. They sent us area guides, set up virtual tours, and helped us find temporary housing. The orientation tour when we arrived was invaluable. Could not have done it without them.', author: 'Sarah & Tom W.', role: 'Relocation Clients' },
      { quote: 'As a first-time buyer, I was nervous about the process. Rachel walked me through everything pre-approval, inspections, closing and never made me feel rushed. She found me a great condo in my budget and negotiated a fair price. I am now a proud homeowner thanks to Premier Realty.', author: 'Marcus J.', role: 'First-Time Buyer' },
      { quote: 'We have worked with Premier Realty on three investment properties. Their market analysis is thorough, their referrals are solid, and they understand what investors need. David helped us build a portfolio that generates strong cash flow. They are our go-to for any real estate transaction.', author: 'Linda & James K.', role: 'Investors' }
    ],
    proof: {
      testimonial: 'Professional, responsive, and found us the perfect home.',
      author: 'The Chen Family, Home Buyers'
    },
    faq: [
      { question: 'How do I get started as a buyer?', answer: 'Contact us to schedule a complimentary consultation. We will discuss your budget, needs, preferred areas, and timeline. From there, we set up a personalized search with automated alerts for new listings that match your criteria. We can also connect you with trusted lenders for pre-approval.' },
      { question: 'What does it cost to sell my home?', answer: 'Our commission structure is negotiable and we are transparent about fees upfront. We provide a comprehensive marketing plan including professional photography, staging consultation, and full MLS syndication. Request a free home valuation to get started and receive a detailed market analysis.' },
      { question: 'Do you work with first-time buyers?', answer: 'Yes. We love working with first-time buyers and guide them through every step pre-approval, down payment assistance programs, inspections, and closing. We offer first-time buyer workshops and have helped hundreds of families purchase their first home. You are in good hands.' },
      { question: 'How long does it take to sell?', answer: 'Timing varies by market conditions, but our average days on market is consistently below the area average. We use professional photography, strategic staging, and data-driven pricing to attract serious buyers quickly. In strong markets, well-priced homes often sell within days.' },
      { question: 'Can you help with investment properties?', answer: 'Yes. Our investment team specializes in multi-family, commercial, and fix-and-flip opportunities. We provide detailed market analysis, cash flow and ROI projections, and connect you with property management and financing resources. Many of our clients have built substantial portfolios with our guidance.' }
    ],
    pricing: [
      { name: 'Buyer Representation', price: 'Included', features: ['Dedicated agent', 'Property tours', 'Offer negotiation', 'Closing coordination'] },
      { name: 'Seller Standard', price: '5%', features: ['Full marketing package', 'Professional photos', 'MLS listing', 'Open houses'] },
      { name: 'Seller Premium', price: '6%', features: ['Everything in Standard', 'Virtual staging', 'Premium placement', 'Video tour'] }
    ],
    contact: {
      pitch: 'Let\'s Find Your Match',
      ctaLabel: 'Schedule a Viewing',
      address: '3400 Commerce Street, Dallas, TX 75201',
      phone: '(214) 555-0134',
      email: 'info@premiererealty.com',
      hours: 'Mon-Fri 9:00 AM - 7:00 PM, Sat 10:00 AM - 5:00 PM'
    },
    aboutSection: {
      title: 'Your Trusted Real Estate Partner',
      paragraphs: [
        'Premier Realty has served the Dallas-Fort Worth metroplex for over 15 years, closing more than $500 million in transactions and building a reputation for excellence. Our top 1% agents combine deep local market knowledge with cutting-edge marketing expertise and an unwavering commitment to personalized service. Whether you are buying your first home, selling a property, or building an investment portfolio, we deliver results. Our agents are full-time professionals who treat every transaction with the attention it deserves.',
        'We believe real estate is about more than transactions it is about helping families find the right home, supporting investors in building long-term wealth, and guiding clients through one of life\'s biggest and most emotional decisions. Our high client satisfaction rating reflects that philosophy. We listen first, then act. We communicate clearly and consistently. We negotiate fiercely on your behalf. When you work with Premier, you have an advocate, not just an agent.',
        'From first-time buyers to seasoned investors, we have the expertise, resources, and network to help. Free home valuations, detailed market reports, and transparent communication are standard. We leverage technology and traditional relationship-building to give you an edge. Experience the Premier difference where results meet relationships.'
      ],
      highlights: ['$500M+ closed', 'Top 1% agents', '15 years experience', '4.9 client rating']
    },
    process: [
      { step: 1, title: 'Consultation', desc: 'Tell us your goals buy, sell, rent, or invest and your timeline. We discuss your needs, preferences, and budget. This complimentary meeting helps us understand how to best serve you.' },
      { step: 2, title: 'Strategy', desc: 'For buyers: we set up personalized search alerts and schedule tours. For sellers: we provide a free home valuation and detailed marketing plan. For investors: we analyze opportunities and ROI.' },
      { step: 3, title: 'Execute', desc: 'Tours, offers, negotiations we guide you through every phase with expertise and clear communication. We handle the details so you can make informed decisions without feeling overwhelmed.' },
      { step: 4, title: 'Close', desc: 'We coordinate inspections, financing, and all closing logistics. Our team ensures a smooth transition so you can focus on the exciting outcome your new home, successful sale, or new investment.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    trustBadges: ['Top 1% Agents', '$500M+ Sold', '5-Star Reviews', 'Local Market Experts'],
    whyChooseUs: [
      { title: 'Top 1% Agents', desc: 'Our agents rank among the best in the metro area for sales volume, client satisfaction, and market knowledge.' },
      { title: 'Full-Service Support', desc: 'From search to close, we handle every detail. You have a dedicated advocate every step of the way.' },
      { title: 'Proven Track Record', desc: '$500M+ in closed transactions. Our results speak for themselves across residential and commercial.' },
      { title: 'Local Expertise', desc: 'Deep knowledge of Dallas-Fort Worth neighborhoods, schools, markets, and investment opportunities.' },
      { title: 'Free Valuations', desc: 'Sellers get complimentary home valuations and market analysis. Know your options before you decide.' },
      { title: 'First-Time Buyer Friendly', desc: 'We guide new buyers through pre-approval, down payment programs, and the entire process with patience.' }
    ],
    industryTags: ['real estate', 'Dallas', 'home buyers', 'sellers', 'investment property', 'relocation', 'luxury', 'top agents'],
    seo: { metaTitle: 'Premier Realty | Dallas-Fort Worth Real Estate | Top 1% Agents', metaDescription: '$500M+ closed, top 1% agents. Buy, sell, rent, invest. First-time buyer programs, free home valuations. Find your perfect space in Dallas-Fort Worth.' },
    featuredCaseStudy: { title: '$500M in Closed Transactions', summary: 'Premier Realty\'s top 1% agents have closed over $500 million in transactions. Their marketing, negotiation, and local expertise consistently deliver results homes selling in days over asking, buyers finding the right fit.', metrics: ['$500M+ closed', '1,200+ clients', '4.9 rating'], testimonial: 'Professional, responsive, and found us the perfect home.' },
    accreditations: ['Top 1% Agents', 'Multi-Million Dollar Club', 'Local Board Member', 'Certified Negotiation Expert'],
    yearFounded: 2009,
    mission: 'To help our clients find their perfect space whether buying, selling, or investing through expertise, integrity, and personalized service.',
    valueProps: [
      { title: 'Top 1% Agents', desc: 'Ranked among the best in the metro area. Deep market knowledge and proven results.' },
      { title: 'Full-Service', desc: 'From search to close, we handle every detail. You have a dedicated advocate.' },
      { title: 'Proven Track Record', desc: '$500M+ closed. Homes sell quickly; buyers find the right fit.' },
      { title: 'Free Valuations', desc: 'Know your home\'s value. Complimentary market analysis for sellers.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Consult', desc: 'Tell us your goals buy, sell, rent, invest. We discuss timeline and next steps.' },
      { step: 2, title: 'Strategy', desc: 'Buyers: personalized search. Sellers: valuation and marketing plan. Investors: ROI analysis.' },
      { step: 3, title: 'Execute', desc: 'Tours, offers, negotiations. We guide you through every phase with expertise.' },
      { step: 4, title: 'Close', desc: 'We coordinate inspections, financing, closing. You focus on the exciting outcome.' }
    ],
    specialties: ['Residential Sales', 'Luxury Properties', 'First-Time Buyers', 'Investment Property', 'Relocation', 'Property Management'],
    socialProof: { rating: 4.9, reviewCount: 423, award: 'Top 1% Agents' },
    additionalFaq: [
      { question: 'How does the free home valuation work?', answer: 'We analyze comparable sales, market trends, and your property\'s features to provide an accurate estimate. No obligation. Helps you understand your options before listing.' },
      { question: 'Do you work with investors?', answer: 'Yes. Our investment team specializes in multi-family, commercial, and fix-and-flip. We provide market analysis, ROI projections, and property management referrals.' }
    ],
    ctaBanner: { headline: 'Find Your Perfect Space', subheadline: 'Buy, sell, or invest. Top 1% agents. Free home valuation for sellers.', primaryCta: 'Browse Properties', secondaryCta: 'Contact Agent' },
    featuredPartners: ['Zillow', 'Realtor.com', 'Multiple Listing Service', 'Dallas Board of Realtors', 'Luxury Portfolio'],
    responseTime: 'Agents respond within 2 hours; free valuations within 24-48 hours',
    accessibility: 'Virtual tours available; flexible viewing times',
    serviceArea: 'Dallas-Fort Worth metroplex; relocation services nationwide',
    qualityCommitment: 'We negotiate fiercely on your behalf. Our marketing and strategy are designed to maximize results.',
    communityNote: 'Top 1% in the metro area. Active in Dallas Board of Realtors and community events.',
    clientPromise: 'You will have a dedicated advocate who works tirelessly to achieve your real estate goals.',
    relatedResources: ['Property Search', 'Free Home Valuation', 'Buyer Guide', 'Seller Guide'],
    popularServices: ['Buy', 'Sell', 'Investment', 'Relocation'],
    bookingNote: 'Free consultation. No obligation. We respond within 2 hours.',
    industryCategory: 'Real Estate',
    parentIndustry: 'Property Services'
  },
  {
    id: 'legal',
    name: 'Legal / Consulting',
    shortLabel: 'Legal',
    brandName: 'Morrison & Chen',
    demoDomain: 'morrisonchen.com',
    icon: 'legal',
    navLabels: ['Practice Areas', 'Team', 'Contact'],
    heroImage: '/images/legal-hero.png',
    services: [
      { title: 'Legal Advice', desc: 'Expert counsel across a range of practice areas with initial case assessment, strategic legal opinions, and thorough document review. Our attorneys take the time to understand your situation and provide clear, actionable guidance. We help you understand your options and make informed decisions about your legal matters.', icon: 'legal', featureList: ['Initial case assessment', 'Strategic legal opinions', 'Document review'] },
      { title: 'Consulting', desc: 'Strategic guidance for complex business decisions including risk assessment, compliance review, and contract drafting. We help organizations navigate regulatory requirements and mitigate legal exposure. Our consulting services are designed to prevent problems before they arise and position you for success.', icon: 'consulting', featureList: ['Risk assessment', 'Compliance review', 'Contract drafting'] },
      { title: 'Representation', desc: 'Dedicated advocacy for your interests in court, at the negotiating table, and throughout the legal process. We provide court representation, negotiation support, and settlement strategy tailored to your goals. Our attorneys fight for outcomes that protect what matters most to you.', icon: 'rep', featureList: ['Court representation', 'Negotiation support', 'Settlement strategy'] },
      { title: 'Business Law', desc: 'Formation, contracts, mergers, and corporate matters for businesses of all sizes. From LLC and corporation formation to M&A advisory and shareholder agreements, we provide the full spectrum of business legal services. Our attorneys understand both the legal and business dimensions of every matter.', icon: 'business', featureList: ['LLC & corporation formation', 'M&A advisory', 'Shareholder agreements'] },
      { title: 'Estate Planning', desc: 'Wills, trusts, and succession planning to protect your family and assets. We draft comprehensive estate plans, administer trusts, and provide probate support when needed. Our approach ensures your wishes are clearly documented and your loved ones are protected.', icon: 'estate', featureList: ['Will drafting', 'Trust administration', 'Probate support'] },
      { title: 'Litigation', desc: 'Dispute resolution and courtroom advocacy when negotiations are not enough. We handle civil and commercial litigation with thorough discovery management and skilled trial presentation. Our litigation team has a strong record of favorable outcomes, including appeal representation when necessary.', icon: 'litigation', featureList: ['Civil & commercial litigation', 'Discovery management', 'Appeal representation'] }
    ],
    hero: {
      headline: 'Expert Guidance When It Matters',
      subheadline: 'Trusted legal and consulting services. We deliver results with integrity and clarity.',
      bulletPoints: ['50+ years combined experience', 'Flat fees available for many matters', 'Confidential initial consultation', 'AV Preeminent rated attorneys'],
      primaryCTA: 'Schedule Consultation',
      secondaryCTA: 'Our Expertise'
    },
    stats: [
      { value: '25+', label: 'Years in Practice' },
      { value: '2,500+', label: 'Cases Closed' },
      { value: 'AV', label: 'Preeminent Rating' },
      { value: '98%', label: 'Client Satisfaction' }
    ],
    team: [
      { name: 'Patricia Morrison', role: 'Managing Partner', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', bio: 'AV Preeminent rated. 25+ years in business law and litigation. Leads with integrity and results.' },
      { name: 'Robert Chen', role: 'Senior Counsel, Corporate', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop', bio: 'M&A and corporate transactions specialist. Guided numerous mergers and acquisitions to close.' },
      { name: 'Amanda Foster', role: 'Partner, Litigation', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: 'Trial attorney with strong record in commercial litigation. Fierce advocate for client interests.' },
      { name: 'James Wright', role: 'Of Counsel, Estate Planning', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', bio: 'Estate planning and trust administration. Helps families protect assets and plan for the future.' }
    ],
    testimonials: [
      { quote: 'Morrison & Associates were thorough, transparent, and always available when I needed them. They guided me through a difficult business dispute and kept me informed at every step. Their strategic approach led to a favorable settlement. I highly recommend them to anyone needing skilled legal counsel.', author: 'James W.', role: 'Client' },
      { quote: 'They guided us through a complex merger that had many moving parts. The team was professional, responsive, and understood both the legal and business implications. We felt confident throughout the process. TechCorp would not have closed the deal without their expertise.', author: 'CEO, TechCorp', role: 'Corporate Client' },
      { quote: 'Our estate plan is now bulletproof thanks to Morrison & Associates. They took the time to understand our family dynamics and goals, then created a comprehensive plan that gives us peace of mind. Knowing our children and grandchildren are protected means everything to us.', author: 'The Henderson Family', role: 'Client' },
      { quote: 'I needed representation in a commercial litigation matter and Morrison & Associates delivered. Their courtroom presence is impressive, and they prepared our case meticulously. We achieved a better outcome than we expected. Worth every dollar.', author: 'Robert M.', role: 'Business Owner' },
      { quote: 'The initial consultation was complimentary and incredibly helpful. They explained my options clearly and did not pressure me. When I decided to move forward, the flat fee for my will and trust was fair and transparent. I have referred several friends to them.', author: 'Patricia L.', role: 'Client' }
    ],
    proof: {
      testimonial: 'Thorough, transparent, and always available. Highly recommend.',
      author: 'James W., Client'
    },
    faq: [
      { question: 'How much does a consultation cost?', answer: 'Initial consultations are complimentary for most practice areas. We use this time to understand your situation, discuss your options, and determine whether we are the right fit. Complex matters or matters requiring extensive preparation may require a paid consultation we will be transparent about that upfront.' },
      { question: 'Do you offer flat fees?', answer: 'Yes. Many matters wills, business formation, contract review, and some transactional work can be billed at a flat fee for predictability. Litigation is typically hourly given the variable nature of disputes. We provide fee estimates upfront and will never surprise you with unexpected charges.' },
      { question: 'How quickly can you take my case?', answer: 'We prioritize urgent matters and work to accommodate client needs. Most clients are seen within 1-2 business days. For time-sensitive matters, we can often arrange same-day or next-day consultations. Contact us to discuss your timeline and our availability.' },
      { question: 'What areas do you practice in?', answer: 'We cover business law, estate planning, litigation, real estate, and strategic consulting. Our attorneys specialize within these areas we match you with the right expertise for your specific matter. For complex cases, we often assemble multi-attorney teams.' },
      { question: 'Is my information confidential?', answer: 'Absolutely. Attorney-client privilege protects all communications between you and our firm. We maintain strict confidentiality in accordance with professional responsibility rules and take data security seriously. Your information is never shared without your consent.' }
    ],
    pricing: [
      { name: 'Consultation', price: 'Free', features: ['30-60 min initial meeting', 'Case assessment', 'Strategy discussion', 'Fee estimate'] },
      { name: 'Fixed Fee', price: 'Varies', features: ['Flat fee for defined scope', 'Wills, formation, contracts', 'No surprise billing', 'Clear deliverables'] },
      { name: 'Hourly', price: '$350-$600', features: ['Complex litigation', 'Ongoing representation', 'Monthly billing', 'Detailed itemization'] }
    ],
    contact: {
      pitch: 'Discuss Your Case',
      ctaLabel: 'Request Free Audit',
      address: '900 Legal Plaza, 12th Floor, Chicago, IL 60601',
      phone: '(312) 555-0187',
      email: 'contact@morrisonandassociates.com',
      hours: 'Mon-Fri 8:30 AM - 5:30 PM'
    },
    aboutSection: {
      title: 'Expert Guidance When It Matters Most',
      paragraphs: [
        'Morrison & Associates has served clients for over 25 years, building a reputation for integrity, expertise, and results. Our AV Preeminent rated attorneys bring decades of combined experience across business law, estate planning, litigation, and strategic consulting. We handle complex, high-stakes matters with the same thoroughness and care as routine ones. Every client receives personalized attention and strategic thinking. We are known for our courtroom prowess, our negotiation skills, and our ability to find creative solutions that protect and advance our clients\' interests.',
        'We believe in transparent communication and fair pricing. Surprises are for birthdays, not legal bills. Flat fees are available for many matters wills, business formation, contract review and we provide clear estimates upfront for hourly work. Our goal is to resolve issues efficiently and effectively while protecting your interests. Client satisfaction is our highest priority, and our 98% satisfaction rating reflects that commitment. We are responsive, accessible, and committed to your success.',
        'From startups to established businesses, from individuals to families, we provide the legal guidance you need when it matters most. Our attorneys specialize within practice areas, so you work with someone who knows your type of matter inside and out. Schedule a complimentary consultation to discuss your situation, understand your options, and explore how we can help. We are here when you need us.'
      ],
      highlights: ['AV Preeminent rated', '25+ years experience', '98% client satisfaction', 'Flat fees available']
    },
    process: [
      { step: 1, title: 'Consultation', desc: 'Schedule a complimentary initial meeting by phone or in person. We learn about your situation, goals, and concerns. This is an opportunity to ask questions and determine if we are the right fit.' },
      { step: 2, title: 'Assessment', desc: 'We analyze your case, research relevant law, and outline your options with pros and cons. We provide a clear fee estimate flat or hourly with no obligation. You leave with clarity.' },
      { step: 3, title: 'Engagement', desc: 'If you decide to proceed, we formalize the scope of work and fee structure in an engagement letter. You know exactly what to expect. We establish communication preferences and next steps.' },
      { step: 4, title: 'Resolution', desc: 'We work diligently toward your desired outcome with regular updates and clear communication. Whether through negotiation, settlement, or litigation, we advocate for your interests every step of the way.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80'
    ],
    trustBadges: ['AV Preeminent', 'Best Lawyers', 'Super Lawyers', 'Bar Association Member'],
    whyChooseUs: [
      { title: 'AV Preeminent Rated', desc: 'The highest peer recognition for legal ability and ethical standards. Our attorneys are among the best in the field.' },
      { title: 'Transparent Pricing', desc: 'Flat fees for many matters. Clear estimates upfront. No surprise bills. We believe in fair, predictable costs.' },
      { title: 'Broad Expertise', desc: 'Business law, estate planning, litigation, consulting. We match you with specialists who know your type of case.' },
      { title: 'Complimentary Consultations', desc: 'Initial meetings are free for most matters. Learn your options and our approach before committing.' },
      { title: '98% Client Satisfaction', desc: 'Our clients recommend us. We measure success by your satisfaction and your results.' },
      { title: 'Responsive & Accessible', desc: 'You will hear from us. We return calls, answer emails, and keep you informed throughout your matter.' }
    ],
    industryTags: ['law firm', 'attorney', 'estate planning', 'business law', 'litigation', 'consulting', 'Chicago', 'AV rated'],
    seo: { metaTitle: 'Morrison & Associates | Chicago Law Firm | Business, Estate, Litigation', metaDescription: 'AV Preeminent rated attorneys. Business law, estate planning, litigation, consulting. 25+ years, 98% client satisfaction. Free initial consultation.' },
    featuredCaseStudy: { title: 'Complex Merger Success', summary: 'Morrison & Associates guided TechCorp through a complex merger with multiple stakeholders. Their strategic approach, transparent communication, and negotiation expertise closed the deal. Corporate clients rely on them for high-stakes matters.', metrics: ['2,500+ cases', '98% satisfaction', 'AV rated'], testimonial: 'They guided us through a complex merger. Professional and responsive.' },
    accreditations: ['AV Preeminent Rated', 'Best Lawyers in America', 'Super Lawyers', 'Illinois State Bar'],
    yearFounded: 1999,
    mission: 'To provide expert legal guidance with integrity, transparency, and a commitment to achieving the best outcomes for our clients.',
    valueProps: [
      { title: 'AV Preeminent', desc: 'The highest peer recognition for legal ability and ethics. Among the best in the field.' },
      { title: 'Transparent Pricing', desc: 'Flat fees where possible. Clear estimates. No surprise bills.' },
      { title: 'Broad Expertise', desc: 'Business, estate, litigation, consulting. Specialists for every type of matter.' },
      { title: 'Responsive', desc: 'We return calls and keep you informed. Your matter gets the attention it deserves.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Consultation', desc: 'Schedule a complimentary meeting. We learn about your situation and goals.' },
      { step: 2, title: 'Assessment', desc: 'We analyze your case, outline options, and provide a clear fee estimate.' },
      { step: 3, title: 'Engagement', desc: 'Formalize scope and fees. You know exactly what to expect.' },
      { step: 4, title: 'Resolution', desc: 'We work toward your outcome with regular updates and clear communication.' }
    ],
    specialties: ['Business Law', 'Estate Planning', 'Litigation', 'Corporate Consulting', 'M&A', 'Contract Review'],
    socialProof: { rating: 4.9, reviewCount: 156, award: 'AV Preeminent' },
    additionalFaq: [
      { question: 'What is an AV Preeminent rating?', answer: 'The highest peer rating for legal ability and ethical standards from Martindale-Hubbell. It reflects recognition by other lawyers and judges in the profession.' },
      { question: 'Do you offer payment plans?', answer: 'For certain matters, we can discuss payment arrangements. We are transparent about fees and work with clients to find solutions that work for their situation.' }
    ],
    ctaBanner: { headline: 'Discuss Your Case', subheadline: 'Free initial consultation for most matters. AV Preeminent rated attorneys. 98% client satisfaction.', primaryCta: 'Schedule Consultation', secondaryCta: 'Our Expertise' },
    featuredPartners: ['Illinois State Bar', 'American Bar Association', 'Martindale-Hubbell', 'Best Lawyers', 'Chambers'],
    responseTime: 'Initial consultation typically scheduled within 1-2 business days',
    accessibility: 'Office wheelchair accessible; video consultations available',
    serviceArea: 'Chicago; Illinois; multi-state licensing where applicable',
    qualityCommitment: 'We prepare every case thoroughly. Our record reflects our dedication to client success.',
    communityNote: 'Pro bono and reduced-fee work for qualifying matters. Bar association leadership.',
    clientPromise: 'You will receive clear advice, transparent communication, and fierce advocacy for your interests.',
    relatedResources: ['Practice Areas', 'Attorney Bios', 'Consultation Request', 'Resources'],
    popularServices: ['Business Law', 'Estate Planning', 'Litigation', 'Consulting'],
    bookingNote: 'Free initial consultation for most matters. Typically scheduled within 1-2 business days.',
    industryCategory: 'Professional Services',
    parentIndustry: 'Legal & Consulting'
  },
  {
    id: 'construction',
    name: 'Construction / Local Services',
    shortLabel: 'Construction',
    brandName: 'Bradley Construction',
    demoDomain: 'bradleyconstruction.com',
    icon: 'construction',
    navLabels: ['Services', 'Projects', 'Contact'],
    heroImage: '/images/construction-hero.png',
    services: [
      { title: 'Construction', desc: 'Full-service building and renovation projects from concept to completion. We handle new construction, additions, and general contracting with full permit coordination. Our experienced team manages every phase foundation to finish with transparent timelines and budgets. Quality craftsmanship and clear communication define every project.', icon: 'build', featureList: ['New construction & additions', 'General contracting', 'Permit coordination'] },
      { title: 'Maintenance', desc: 'Ongoing care to protect your investment and extend the life of your property. We offer preventive maintenance plans, emergency repairs, and seasonal inspections. Catch small issues before they become expensive problems. Our maintenance team is reliable, responsive, and thorough.', icon: 'maintenance', featureList: ['Preventive maintenance plans', 'Emergency repairs', 'Seasonal inspections'] },
      { title: 'Consultation', desc: 'Expert advice before you break ground. We provide feasibility studies, accurate cost estimates, and design feedback to help you make informed decisions. Whether you are planning a major renovation or evaluating options, our consultation ensures you start with clarity and confidence.', icon: 'consult', featureList: ['Feasibility studies', 'Cost estimates', 'Design feedback'] },
      { title: 'Kitchen & Bath Remodel', desc: 'Complete renovations for high-traffic spaces that transform how you live. We handle custom cabinetry, plumbing, electrical, tile, and finishes with attention to detail. Our design-build approach streamlines the process. Kitchens and baths are our specialty we have completed hundreds.', icon: 'remodel', featureList: ['Custom cabinetry', 'Plumbing & electrical', 'Tile & finishes'] },
      { title: 'Roofing & Exterior', desc: 'Roof replacement, siding installation, and weatherproofing to protect your home or business. We install shingle and metal roofs, siding, and gutter systems with quality materials and workmanship. Proper exterior work prevents costly interior damage. Get a free inspection and estimate.', icon: 'roof', featureList: ['Shingle & metal roofs', 'Siding installation', 'Gutter systems'] },
      { title: 'Commercial Build-Out', desc: 'Tenant improvements and office renovations for businesses of all sizes. We specialize in office fit-outs, retail build-outs, and ADA compliance upgrades. Our team understands commercial timelines and requirements. Get your space ready for business on schedule.', icon: 'commercial', featureList: ['Office fit-outs', 'Retail build-outs', 'ADA compliance'] }
    ],
    hero: {
      headline: 'Built to Last',
      subheadline: 'Quality craftsmanship for your home and business. From renovation to new build, we deliver excellence.',
      bulletPoints: ['Licensed, bonded & insured', '30+ years local experience', 'Transparent pricing & timelines', 'Satisfaction guaranteed'],
      primaryCTA: 'Get a Quote',
      secondaryCTA: 'View Projects'
    },
    stats: [
      { value: '30+', label: 'Years Experience' },
      { value: '1,200+', label: 'Projects Completed' },
      { value: '100%', label: 'Licensed & Bonded' },
      { value: '4.9', label: 'Google Rating' }
    ],
    team: [
      { name: 'Tom Bradley', role: 'Owner & General Contractor', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop', bio: 'Founded Bradley Construction in 1994. 30+ years delivering quality. Licensed, bonded, insured.' },
      { name: 'Maria Garcia', role: 'Project Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: 'Coordinates every detail. Keeps projects on schedule and on budget. Your main point of contact.' },
      { name: 'Joe Martinez', role: 'Lead Carpenter', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: 'Master craftsman. 20+ years in residential and commercial. Quality work you can count on.' },
      { name: 'Sarah Chen', role: 'Estimator & Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', bio: 'Provides accurate estimates and design feedback. Helps you visualize and plan your project.' }
    ],
    testimonials: [
      { quote: 'Bradley Construction delivered our project on time, on budget, and the quality exceeded our expectations. Tom kept us informed at every stage and his crew was professional, punctual, and respectful of our property. We have already recommended them to three neighbors. Outstanding experience from start to finish.', author: 'Robert H.', role: 'Property Owner' },
      { quote: 'Our kitchen remodel turned out more beautiful than we imagined. Tom\'s crew was professional, respectful of our home, and cleaned up after themselves every day. The custom cabinetry and tile work are flawless. We use our new kitchen every day and it has completely transformed how we live. Worth every penny.', author: 'Linda M.', role: 'Homeowner' },
      { quote: 'They completed our office build-out ahead of schedule and under budget. The team understood our needs, communicated clearly, and delivered a space that our employees love. We have hired Bradley Construction for a second location. Would recommend to any business owner needing commercial work.', author: 'David K.', role: 'Business Owner' },
      { quote: 'We had a roof leak that turned into a bigger problem. Bradley Construction came out quickly, assessed the damage, and fixed everything including some underlying issues we did not know about. Honest, fair pricing, and excellent work. They have earned our trust for all future projects.', author: 'Patricia S.', role: 'Homeowner' },
      { quote: 'The bathroom renovation was our first major home project and we were nervous. Maria and the team made it stress-free. They explained the process, stuck to the timeline, and the result is stunning. Our master bath now feels like a spa. We will definitely use them again for our next project.', author: 'Michael & Jennifer T.', role: 'Homeowners' }
    ],
    proof: {
      testimonial: 'On time, on budget, and the quality exceeded expectations.',
      author: 'Robert H., Property Owner'
    },
    faq: [
      { question: 'Are you licensed and insured?', answer: 'Yes. We are fully licensed, bonded, and insured. We carry general liability and workers compensation coverage. Certificates are available upon request for homeowners, property managers, or commercial clients. We take our credentials seriously and maintain all requirements.' },
      { question: 'How do estimates work?', answer: 'We provide free estimates for most projects. For complex work requiring extensive planning or engineering, we may charge a small fee for a detailed proposal. All estimates include labor and materials with transparent breakdowns. We stand behind our estimates and communicate any changes before proceeding.' },
      { question: 'How long does a typical project take?', answer: 'Timelines vary by scope. Small repairs: 1-2 days. Kitchens and baths: typically 4-8 weeks. New construction: several months depending on size. We provide a detailed schedule in your contract and keep you updated if anything changes. We pride ourselves on meeting deadlines.' },
      { question: 'Do you handle permits?', answer: 'Yes. We pull all required permits and coordinate inspections throughout the project. Permit costs are included in our estimates where applicable. We handle the paperwork and ensure work meets code. You do not need to worry about permit logistics.' },
      { question: 'What is your warranty?', answer: 'We offer a 1-year workmanship warranty on all projects. Many manufacturers also provide warranties on materials such as roofing, cabinetry, and fixtures. Full warranty details are included in your contract. We stand behind our work and will address any legitimate concerns.' }
    ],
    pricing: [
      { name: 'Small Repairs', price: 'From $150', features: ['Handyman services', 'Same-week scheduling', 'No minimum', 'Transparent hourly rate'] },
      { name: 'Renovation', price: 'From $15K', features: ['Room remodels', 'Fixed-price contracts', 'Timeline guarantee', 'Project manager'] },
      { name: 'New Build', price: 'Custom', features: ['Full construction', 'Architect coordination', 'Turnkey delivery', 'Financing referrals'] }
    ],
    contact: {
      pitch: 'Start Your Project',
      ctaLabel: 'Request Free Quote',
      address: '550 Builder\'s Lane, Phoenix, AZ 85004',
      phone: '(602) 555-0162',
      email: 'projects@bradleyconstruction.com',
      hours: 'Mon-Fri 7:00 AM - 5:00 PM, Sat 8:00 AM - 12:00 PM'
    },
    aboutSection: {
      title: 'Quality Craftsmanship Since 1994',
      paragraphs: [
        'Bradley Construction has been serving the Phoenix area for over 30 years, completing more than 1,200 projects for homeowners and businesses alike. We are fully licensed, bonded, and insured with an unwavering commitment to transparent pricing and satisfaction guaranteed. From small repairs to major renovations and new construction, we deliver the same level of care, craftsmanship, and professionalism. Our reputation is built on doing what we say we will do on time, on budget, and to the highest standards.',
        'Our team includes experienced project managers who coordinate every detail, skilled craftspeople who take pride in their work, and design professionals who help you visualize the result. We work together seamlessly so your project runs smoothly from start to finish. We take pride in our reputation for quality, reliability, and clear communication. When you hire Bradley, you get a partner who treats your property like their own. We clean up, we show up on time, and we respect your space.',
        'We specialize in residential and commercial work kitchens, baths, roofing, siding, additions, and build-outs. Whatever your project, we provide honest estimates, realistic timelines, and results that stand the test of time. Our 1-year workmanship warranty and strong relationships with quality suppliers give you peace of mind. Call us for a free quote and discover why Phoenix families and businesses have trusted Bradley for three decades.'
      ],
      highlights: ['30+ years experience', '1,200+ projects', 'Licensed & bonded', 'Satisfaction guaranteed']
    },
    process: [
      { step: 1, title: 'Request Quote', desc: 'Call, email, or fill out our online form with a description of your project. We will schedule a convenient time for a site visit to assess the work and discuss your vision in detail.' },
      { step: 2, title: 'Estimate & Plan', desc: 'We assess the scope of work, provide a detailed written estimate with labor and materials, and outline a realistic timeline. We answer your questions and help you understand the process.' },
      { step: 3, title: 'Contract & Start', desc: 'Sign the contract when you are ready. We handle permits if required and order materials. Work begins on the scheduled start date. We keep you informed throughout.' },
      { step: 4, title: 'Complete & Inspect', desc: 'We finish the project, perform a final walk-through with you, and ensure you are satisfied. We stand behind our 1-year workmanship warranty. Your project is complete when you say it is.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1503384569795-944ee1e03d9a?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    trustBadges: ['Licensed & Bonded', 'BBB Accredited', '4.9 Google Rating', 'Satisfaction Guaranteed'],
    whyChooseUs: [
      { title: '30+ Years Experience', desc: 'Over 1,200 projects completed. We have seen it all and deliver consistent quality and reliability.' },
      { title: 'Licensed & Insured', desc: 'Fully licensed, bonded, and insured. Certificates available. Your property and our workers are protected.' },
      { title: 'Transparent Pricing', desc: 'Detailed estimates with no hidden fees. We communicate openly about costs and timelines from day one.' },
      { title: 'Satisfaction Guaranteed', desc: 'We stand behind our work. Our 1-year workmanship warranty and commitment to your satisfaction are unmatched.' },
      { title: 'Quality Craftsmanship', desc: 'Skilled tradespeople who take pride in their work. We use quality materials and proven techniques.' },
      { title: 'Respect for Your Space', desc: 'We clean up, show up on time, and treat your home or business with the respect it deserves.' }
    ],
    industryTags: ['general contractor', 'renovation', 'kitchen remodel', 'bathroom', 'roofing', 'Phoenix', 'licensed', 'construction'],
    seo: { metaTitle: 'Bradley Construction | Phoenix | Kitchen, Bath, Roofing & Renovation', metaDescription: '30+ years, 1,200+ projects. Licensed, bonded, insured. Kitchen remodels, roofing, commercial build-outs. Free estimates. Satisfaction guaranteed.' },
    featuredCaseStudy: { title: '1,200+ Projects Delivered', summary: 'Bradley Construction has completed over 1,200 projects across residential and commercial. Their on-time, on-budget track record and 4.9 Google rating reflect a commitment to quality. From kitchens to new builds, they deliver.', metrics: ['1,200+ projects', '30+ years', '4.9 Google rating'], testimonial: 'On time, on budget, and the quality exceeded expectations.' },
    accreditations: ['Licensed Contractor', 'Bonded & Insured', 'BBB Accredited', 'Satisfaction Guaranteed'],
    yearFounded: 1994,
    mission: 'To deliver quality craftsmanship and exceptional service on every project, building trust through transparency, reliability, and results.',
    valueProps: [
      { title: '30+ Years', desc: 'Over 1,200 projects. We have the experience to deliver quality and avoid pitfalls.' },
      { title: 'Licensed & Insured', desc: 'Fully licensed, bonded, insured. Your property and our workers are protected.' },
      { title: 'Transparent', desc: 'Detailed estimates, no hidden fees. We communicate openly from day one.' },
      { title: 'Satisfaction Guaranteed', desc: 'We stand behind our work. Your project is complete when you say it is.' }
    ],
    gettingStarted: [
      { step: 1, title: 'Request Quote', desc: 'Call, email, or submit our form. Describe your project. We schedule a site visit.' },
      { step: 2, title: 'Estimate', desc: 'We assess scope, provide a detailed estimate, and outline the timeline.' },
      { step: 3, title: 'Contract', desc: 'Sign when ready. We handle permits. Work begins on the scheduled start date.' },
      { step: 4, title: 'Complete', desc: 'Final walk-through. Ensure satisfaction. We stand behind our warranty.' }
    ],
    specialties: ['Kitchen Remodel', 'Bathroom Renovation', 'Roofing & Exterior', 'Commercial Build-Out', 'New Construction', 'Maintenance'],
    socialProof: { rating: 4.9, reviewCount: 287, award: 'BBB Accredited' },
    additionalFaq: [
      { question: 'Do you offer financing?', answer: 'We can refer you to trusted financing partners for larger projects. Many homeowners use home equity loans or renovation loans. We provide detailed estimates to support your applications.' },
      { question: 'How do you handle unexpected issues during a project?', answer: 'We communicate immediately if we discover something unexpected. We provide a change order with updated scope and cost before proceeding. Transparency is our policy.' }
    ],
    ctaBanner: { headline: 'Start Your Project', subheadline: 'Free estimates. Licensed, bonded, insured. 30+ years of quality craftsmanship in Phoenix.', primaryCta: 'Get Free Quote', secondaryCta: 'View Projects' },
    featuredPartners: ['Arizona Registrar of Contractors', 'BBB', 'HomeAdvisor', 'Angi', 'Houzz', 'National Association of Home Builders'],
    responseTime: 'Quote requests responded to within 24-48 hours',
    accessibility: 'We accommodate accessibility needs in renovation projects',
    serviceArea: 'Phoenix metro; Greater Arizona for larger projects',
    qualityCommitment: 'We stand behind our work. Our 1-year warranty and satisfaction guarantee reflect our commitment.',
    communityNote: '30+ years serving Phoenix. BBB accredited. Proud to build and maintain our community.',
    clientPromise: 'You will receive quality work, on-time completion, and a team that respects your home and your budget.',
    relatedResources: ['Free Quote', 'Project Gallery', 'Service Areas', 'Warranty Info'],
    popularServices: ['Kitchen Remodel', 'Bathroom', 'Roofing', 'Commercial Build-Out'],
    bookingNote: 'Free estimates. Site visit scheduled within 24-48 hours. No obligation.',
    industryCategory: 'Construction',
    parentIndustry: 'Home Services'
  }
]

const sanitizeImagePath = (v) => {
  const s = String(v || '').trim()
  if (!s) return ''
  if (s.startsWith('/')) return s
  // Block remote image URLs to avoid "broken HTTPS" from third-party cert issues.
  if (s.startsWith('http://') || s.startsWith('https://')) return ''
  return s
}

const sanitizeImageArray = (arr) => (Array.isArray(arr) ? arr.map(sanitizeImagePath).filter((x) => x && x.startsWith('/')) : [])

const FALLBACK_TEAM_IMAGES = ['/images/team-person-1.png', '/images/team-person-2.png', '/images/team-person-3.png']

const sanitizeTeam = (team) => {
  if (!Array.isArray(team)) return team
  const mapped = team.map((m, idx) => {
    const img = sanitizeImagePath(m?.image)
    return { ...m, image: img || FALLBACK_TEAM_IMAGES[idx % FALLBACK_TEAM_IMAGES.length] }
  })
  return mapped
}

const sanitizeIndustry = (ind) => ({
  ...ind,
  heroImage: sanitizeImagePath(ind?.heroImage),
  sectionImage: sanitizeImagePath(ind?.sectionImage),
  gallery: sanitizeImageArray(ind?.gallery),
  team: sanitizeTeam(ind?.team)
})

export const INDUSTRIES = RAW_INDUSTRIES.map(sanitizeIndustry)
