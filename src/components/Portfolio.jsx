import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const designs = [
  {
    id: 'saas-spark',
    name: 'SaaS Spark',
    category: 'SaaS Platform',
    description: 'Modern SaaS platform with powerful analytics dashboard, user management, and seamless billing integration.',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-500/20 to-cyan-600/20',
    icon: '⚡',
    color: '#3b82f6',
    accent: '#0891b2',
    businessType: 'Technology & SaaS',
    sections: ['Hero & CTA', 'Live Dashboard', 'Feature Showcase', 'Customer Logos', 'Use Cases', 'Testimonials', 'Pricing Plans', 'Billing Portal'],
    features: ['Interactive analytics dashboard', 'Tiered pricing pages', 'User onboarding flow', 'API documentation']
  },
  {
    id: 'beautywave',
    name: 'BeautyWave',
    category: 'Beauty Salon',
    description: 'Elegant beauty salon website with online booking, service showcase, and team profiles.',
    gradient: 'from-pink-500 to-purple-600',
    bgGradient: 'from-pink-500/20 to-purple-600/20',
    icon: '💄',
    color: '#ec4899',
    accent: '#a855f7',
    businessType: 'Beauty & Wellness',
    sections: ['Hero', 'Services', 'Gallery', 'Team', 'Testimonials', 'Pricing', 'Booking', 'FAQ'],
    features: ['Online booking system', 'Before/after gallery', 'Service packages', 'Team showcase']
  },
  {
    id: 'techforge',
    name: 'TechForge',
    category: 'Tech Startup',
    description: 'Innovative tech startup site with product demos, case studies, and investor-ready design.',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/20 to-teal-600/20',
    icon: '🚀',
    color: '#10b981',
    accent: '#0d9488',
    businessType: 'Technology & Innovation',
    sections: ['Hero', 'Solutions', 'Products', 'Case Studies', 'Pricing', 'Team', 'Reviews', 'Contact'],
    features: ['Product demo sections', 'Technical documentation', 'Integration showcase', 'Performance metrics']
  },
  {
    id: 'culinarycraft',
    name: 'CulinaryCraft',
    category: 'Restaurant',
    description: 'Artisanal restaurant site with digital menu, reservation system, and chef profiles.',
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-500/20 to-red-600/20',
    icon: '🍽️',
    color: '#f97316',
    accent: '#dc2626',
    businessType: 'Food & Hospitality',
    sections: ['Welcome', 'Menu', 'Gallery', 'Reservations', 'Chef Profiles', 'Reviews', 'Events', 'Contact'],
    features: ['Digital menu with categories', 'Table reservation system', 'Photo gallery', 'Event showcase']
  },
  {
    id: 'fitnessfusion',
    name: 'FitnessFusion',
    category: 'Fitness Center',
    description: 'Dynamic fitness website with class schedules, membership plans, and trainer profiles.',
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-500/20 to-purple-600/20',
    icon: '💪',
    color: '#6366f1',
    accent: '#9333ea',
    businessType: 'Health & Fitness',
    sections: ['Hero', 'Programs', 'Classes', 'Trainers', 'Membership', 'Success Stories', 'Schedule', 'Contact'],
    features: ['Class schedule & booking', 'Membership comparison', 'Trainer profiles', 'Progress tracking']
  },
  {
    id: 'creativehub',
    name: 'CreativeHub',
    category: 'Creative Agency',
    description: 'Full-service creative agency portfolio with project showcase and client testimonials.',
    gradient: 'from-yellow-500 to-orange-600',
    bgGradient: 'from-yellow-500/20 to-orange-600/20',
    icon: '🎨',
    color: '#eab308',
    accent: '#ea580c',
    businessType: 'Creative & Design',
    sections: ['Studio', 'Services', 'Portfolio', 'Case Studies', 'Packages', 'Team', 'Testimonials', 'Contact'],
    features: ['Interactive portfolio grid', 'Case study pages', 'Service packages', 'Creative process showcase']
  },
  {
    id: 'medicore',
    name: 'MediCore',
    category: 'Healthcare',
    description: 'Professional healthcare platform with appointment booking and patient portal.',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/20 to-emerald-600/20',
    icon: '🏥',
    color: '#22c55e',
    accent: '#059669',
    businessType: 'Healthcare & Medical',
    sections: ['Hero', 'Services', 'Specialties', 'Doctors', 'Appointments', 'Patient Portal', 'Reviews', 'Contact'],
    features: ['Online appointment booking', 'Doctor directory', 'Patient portal', 'Health resources']
  },
  {
    id: 'edumind',
    name: 'EduMind',
    category: 'Education',
    description: 'Online learning platform with course catalog, progress tracking, and certification.',
    gradient: 'from-blue-600 to-indigo-700',
    bgGradient: 'from-blue-600/20 to-indigo-700/20',
    icon: '📚',
    color: '#2563eb',
    accent: '#4338ca',
    businessType: 'Education & Learning',
    sections: ['Hero', 'Courses', 'Learning Paths', 'Instructors', 'Pricing', 'Student Reviews', 'Certifications', 'Contact'],
    features: ['Course catalog & filters', 'Progress tracking', 'Video lessons', 'Certification system']
  },
  {
    id: 'luxeliving',
    name: 'LuxeLiving',
    category: 'Real Estate',
    description: 'Premium real estate showcase with property listings, virtual tours, and agent profiles.',
    gradient: 'from-amber-500 to-yellow-600',
    bgGradient: 'from-amber-500/20 to-yellow-600/20',
    icon: '🏠',
    color: '#f59e0b',
    accent: '#ca8a04',
    businessType: 'Real Estate & Property',
    sections: ['Hero', 'Listings', 'Virtual Tours', 'Agents', 'Neighborhood Guide', 'Testimonials', 'Calculator', 'Contact'],
    features: ['Property search & filters', 'Virtual tour integration', 'Mortgage calculator', 'Agent directory']
  }
]

const TryOurDesigns = () => {
  const { t } = useLanguage()
  const [selectedDesign, setSelectedDesign] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }
    }
  }

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title luxury-heading">
            {t('portfolioTitle') || 'Bring Your'}{' '}
            <span className="gradient-text">{t('portfolioTitleAccent') || 'Ideas to Life'}</span>
          </h2>
          <p className="section-description">
            {t('portfolioDescription') || 'Explore our design concepts across industries. Find the style that fits your business and let us build it for you.'}
          </p>
        </motion.div>

        {/* Design Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {designs.map((design) => (
            <motion.div
              key={design.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelectedDesign(design)}
              className="group cursor-pointer"
            >
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${design.bgGradient} border border-white/10 backdrop-blur-sm hover:border-white/20 hover:shadow-glow-lg transition-all duration-300 h-full`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
                </div>

                <div className="relative p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-5 bg-gradient-to-r ${design.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {design.icon}
                  </div>

                  <h3 className="text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors duration-300">
                    {design.name}
                  </h3>
                  <p className="text-accent font-semibold text-xs mb-3 tracking-wide uppercase">
                    {design.category}
                  </p>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {design.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                    {t('viewDetails') || 'View Details'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0, 201, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="cta-button bg-gradient-to-r from-accent to-purple text-background font-bold text-lg px-12 py-4 rounded-xl hover:from-accent/90 hover:to-purple/90 transition-all duration-200 shadow-lg hover:shadow-glow-lg"
          >
            {t('portfolioCta') || "Don't see your industry? Let's build something custom."}
          </motion.button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <DesignModal
            design={selectedDesign}
            onClose={() => setSelectedDesign(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  )
}


const DesignModal = ({ design, onClose, t }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-3xl shadow-2xl"
      >
        {/* Header with gradient */}
        <div className={`relative p-8 pb-6 bg-gradient-to-br ${design.bgGradient} border-b border-white/10`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 bg-gradient-to-r ${design.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
              {design.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{design.name}</h3>
              <p className="text-cyan-300 font-medium text-sm">{design.businessType}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <p className="text-slate-300 leading-relaxed">{design.description}</p>

          {/* Color Palette */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              {t('colorPalette') || 'Color Palette'}
            </h4>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg shadow-inner" style={{ backgroundColor: design.color }} />
                <span className="text-sm text-slate-400 font-mono">{design.color}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg shadow-inner" style={{ backgroundColor: design.accent }} />
                <span className="text-sm text-slate-400 font-mono">{design.accent}</span>
              </div>
            </div>
          </div>

          {/* Sections included */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              {t('includedSections') || 'Included Sections'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {design.sections.map((section) => (
                <span
                  key={section}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300"
                >
                  {section}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              {t('keyFeatures') || 'Key Features'}
            </h4>
            <ul className="space-y-2">
              {design.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <motion.button
            onClick={() => {
              onClose()
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }, 300)
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-glow transition-all duration-300"
          >
            {t('startProject') || "Start This Project"} →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TryOurDesigns
