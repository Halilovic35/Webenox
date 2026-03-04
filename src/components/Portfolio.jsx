import React, { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const TryOurDesigns = () => {
  const { t } = useLanguage()
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const [autoCloseTimer, setAutoCloseTimer] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [autoCycling, setAutoCycling] = useState(true)

  // Disable scrolling when preview is active
  useEffect(() => {
    if (isPreviewActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isPreviewActive])

  // Handle manual section change
  const handleSectionChange = (sectionName) => {
    const sectionIndex = selectedDesign.sections.findIndex(section => section.type === sectionName)
    if (sectionIndex !== -1) {
      setCurrentSection(sectionIndex)
      setAutoCycling(false) // Stop auto-cycling when user manually changes
      // Reset auto-close timer when manually changing sections
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer)
      }
      const newTimer = setTimeout(() => {
        handleClosePreview()
      }, 30000) // 30 seconds from now
      setAutoCloseTimer(newTimer)
    }
  }

  const handleDesignClick = (design) => {
    // Scroll to top before opening preview
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Small delay to ensure scroll completes before opening preview
    setTimeout(() => {
      setSelectedDesign(design)
      setCurrentSection(0)
      setIsPreviewActive(true)
      setShowInfo(false)
      setAutoCycling(true) // Start with auto-cycling enabled
      
      // Set auto-close timer
      const timer = setTimeout(() => {
        handleClosePreview()
      }, 30000) // 30 seconds
      setAutoCloseTimer(timer)
    }, 300) // 300ms delay
  }

  const handleClosePreview = () => {
    setIsPreviewActive(false)
    setSelectedDesign(null)
    setCurrentSection(0)
    setShowInfo(false)
    setAutoCycling(true) // Reset auto-cycling for next preview
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer)
      setAutoCloseTimer(null)
    }
    // Re-enable scrolling
    document.body.style.overflow = 'auto'
  }

  const designs = [
    {
      id: 'saas-spark',
      name: 'SaaS Spark',
      category: 'SaaS Platform',
      description: 'Modern SaaS platform with powerful analytics',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/20 to-cyan-600/20',
      icon: '⚡',
      color: '#3b82f6',
      accent: '#0891b2',
      inspiration: 'Modern SaaS platform with powerful analytics and user management',
      businessType: 'Technology & SaaS',
      sections: [
        { name: 'Hero', content: 'AI-Driven Analytics Platform', type: 'saas-hero' },
        { name: 'Live Dashboard', content: 'Interactive AI Dashboard', type: 'saas-dashboard' },
        { name: 'Product Features', content: 'Advanced Analytics Tools', type: 'saas-features' },
        { name: 'Customer Logos', content: 'Trusted by Industry Leaders', type: 'saas-logos' },
        { name: 'AI Use Cases', content: 'AI-Powered Insights', type: 'saas-use-cases' },
        { name: 'Testimonials', content: 'Client Success Stories', type: 'saas-testimonials' },
        { name: 'Pricing', content: 'Choose Your Plan', type: 'saas-pricing' },
        { name: 'Billing', content: 'Payment & Billing', type: 'saas-billing' },
        { name: 'CTA', content: 'Scale Your Platform', type: 'saas-cta' }
      ]
    },
    {
      id: 'beautywave',
      name: 'BeautyWave',
      category: 'Beauty Salon',
      description: 'Modern beauty salon with booking system',
      gradient: 'from-pink-500 to-purple-600',
      bgGradient: 'from-pink-500/20 to-purple-600/20',
      icon: '💄',
      color: '#ec4899',
      accent: '#a855f7',
      inspiration: 'Elegant beauty salon with modern booking system and service showcase',
      businessType: 'Beauty & Wellness',
      sections: [
        { name: 'Hero', content: 'Transform Your Beauty Journey', type: 'hero' },
        { name: 'Features', content: 'Why Choose BeautyWave', type: 'features' },
        { name: 'Services', content: 'Our Services', type: 'services' },
        { name: 'Gallery', content: 'Our Work Gallery', type: 'gallery' },
        { name: 'Team', content: 'Meet Our Team', type: 'team' },
        { name: 'Statistics', content: 'Our Numbers', type: 'statistics' },
        { name: 'Testimonials', content: 'What Our Clients Say', type: 'testimonials' },
        { name: 'Pricing', content: 'Choose Your Package', type: 'pricing' },
        { name: 'FAQ', content: 'Frequently Asked Questions', type: 'faq' },
        { name: 'CTA', content: 'Book Your Free Consultation', type: 'cta' }
      ]
    },
    {
      id: 'techforge',
      name: 'TechForge',
      category: 'Tech Startup',
      description: 'Innovative tech solutions for modern businesses',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500/20 to-teal-600/20',
      icon: '🚀',
      color: '#10b981',
      accent: '#0d9488',
      inspiration: 'Innovative tech startup with cutting-edge solutions',
      businessType: 'Technology & Innovation',
      sections: [
        { name: 'Hero', content: 'Building Tomorrow Today', type: 'tech-hero' },
        { name: 'Solutions', content: 'Our Tech Solutions', type: 'tech-features' },
        { name: 'Products', content: 'Innovative Products', type: 'tech-services' },
        { name: 'Showcase', content: 'Project Portfolio', type: 'tech-gallery' },
        { name: 'Plans', content: 'Choose Your Package', type: 'tech-pricing' },
        { name: 'Team', content: 'Tech Experts', type: 'tech-team' },
        { name: 'Reviews', content: 'Client Success Stories', type: 'tech-testimonials' },
        { name: 'Contact', content: 'Start Your Project', type: 'tech-cta' }
      ]
    },
    {
      id: 'culinarycraft',
      name: 'CulinaryCraft',
      category: 'Restaurant',
      description: 'Artisanal dining experience with farm-to-table concept',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/20 to-red-600/20',
      icon: '🍽️',
      color: '#f97316',
      accent: '#dc2626',
      inspiration: 'Artisanal restaurant with farm-to-table dining experience',
      businessType: 'Food & Hospitality',
      sections: [
        { name: 'Welcome', content: 'Culinary Excellence', type: 'hero' },
        { name: 'Experience', content: 'Dining Excellence', type: 'features' },
        { name: 'Menu', content: 'Our Signature Dishes', type: 'services' },
        { name: 'Gallery', content: 'Culinary Art', type: 'gallery' },
        { name: 'Reservations', content: 'Book Your Table', type: 'pricing' },
        { name: 'Chefs', content: 'Master Chefs', type: 'team' },
        { name: 'Reviews', content: 'Guest Reviews', type: 'testimonials' },
        { name: 'Contact', content: 'Make Reservation', type: 'cta' }
      ]
    },
    {
      id: 'fitnessfusion',
      name: 'FitnessFusion',
      category: 'Fitness Center',
      description: 'Modern fitness center with personalized training programs',
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-500/20 to-purple-600/20',
      icon: '💪',
      color: '#6366f1',
      accent: '#9333ea',
      inspiration: 'Modern fitness center with personalized training and wellness programs',
      businessType: 'Health & Fitness',
      sections: [
        { name: 'Home', content: 'Transform Your Life', type: 'hero' },
        { name: 'Programs', content: 'Fitness Programs', type: 'features' },
        { name: 'Classes', content: 'Workout Classes', type: 'services' },
        { name: 'Gallery', content: 'Success Stories', type: 'gallery' },
        { name: 'Membership', content: 'Join Today', type: 'pricing' },
        { name: 'Trainers', content: 'Expert Trainers', type: 'team' },
        { name: 'Testimonials', content: 'Member Stories', type: 'testimonials' },
        { name: 'Contact', content: 'Start Training', type: 'cta' }
      ]
    },
    {
      id: 'creativehub',
      name: 'CreativeHub',
      category: 'Creative Agency',
      description: 'Full-service creative agency for brands and businesses',
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-500/20 to-orange-600/20',
      icon: '🎨',
      color: '#eab308',
      accent: '#ea580c',
      inspiration: 'Full-service creative agency specializing in branding and design',
      businessType: 'Creative & Design',
      sections: [
        { name: 'Studio', content: 'Creative Excellence', type: 'hero' },
        { name: 'Services', content: 'Creative Services', type: 'features' },
        { name: 'Portfolio', content: 'Our Work', type: 'services' },
        { name: 'Projects', content: 'Featured Work', type: 'gallery' },
        { name: 'Packages', content: 'Creative Packages', type: 'pricing' },
        { name: 'Team', content: 'Creative Team', type: 'team' },
        { name: 'Reviews', content: 'Client Feedback', type: 'testimonials' },
        { name: 'Contact', content: 'Start Project', type: 'cta' }
      ]
    },
    {
      id: 'medicore',
      name: 'MediCore',
      category: 'Healthcare',
      description: 'Modern healthcare platform with telemedicine services',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/20 to-emerald-600/20',
      icon: '🏥',
      color: '#22c55e',
      accent: '#059669',
      inspiration: 'Modern healthcare platform with telemedicine and patient care',
      businessType: 'Healthcare & Medical',
      sections: [
        { name: 'Care', content: 'Your Health Matters', type: 'hero' },
        { name: 'Services', content: 'Healthcare Services', type: 'features' },
        { name: 'Specialties', content: 'Medical Specialties', type: 'services' },
        { name: 'Gallery', content: 'Patient Care', type: 'gallery' },
        { name: 'Plans', content: 'Health Plans', type: 'pricing' },
        { name: 'Doctors', content: 'Medical Team', type: 'team' },
        { name: 'Reviews', content: 'Patient Reviews', type: 'testimonials' },
        { name: 'Contact', content: 'Book Appointment', type: 'cta' }
      ]
    },
    {
      id: 'edumind',
      name: 'EduMind',
      category: 'Education',
      description: 'Online learning platform with interactive courses',
      gradient: 'from-blue-600 to-indigo-700',
      bgGradient: 'from-blue-600/20 to-indigo-700/20',
      icon: '📚',
      color: '#2563eb',
      accent: '#4338ca',
      inspiration: 'Online learning platform with interactive courses and certifications',
      businessType: 'Education & Learning',
      sections: [
        { name: 'Learn', content: 'Unlock Your Potential', type: 'hero' },
        { name: 'Courses', content: 'Learning Paths', type: 'features' },
        { name: 'Programs', content: 'Educational Programs', type: 'services' },
        { name: 'Gallery', content: 'Student Success', type: 'gallery' },
        { name: 'Pricing', content: 'Learning Plans', type: 'pricing' },
        { name: 'Instructors', content: 'Expert Teachers', type: 'team' },
        { name: 'Reviews', content: 'Student Reviews', type: 'testimonials' },
        { name: 'Contact', content: 'Start Learning', type: 'cta' }
      ]
    },
    {
      id: 'luxeliving',
      name: 'LuxeLiving',
      category: 'Real Estate',
      description: 'Premium real estate with luxury properties',
      gradient: 'from-amber-500 to-yellow-600',
      bgGradient: 'from-amber-500/20 to-yellow-600/20',
      icon: '🏠',
      color: '#f59e0b',
      accent: '#ca8a04',
      inspiration: 'Premium real estate agency specializing in luxury properties',
      businessType: 'Real Estate & Property',
      sections: [
        { name: 'Properties', content: 'Luxury Living', type: 'hero' },
        { name: 'Services', content: 'Real Estate Services', type: 'features' },
        { name: 'Listings', content: 'Premium Properties', type: 'services' },
        { name: 'Gallery', content: 'Property Showcase', type: 'gallery' },
        { name: 'Packages', content: 'Service Packages', type: 'pricing' },
        { name: 'Agents', content: 'Expert Agents', type: 'team' },
        { name: 'Reviews', content: 'Client Reviews', type: 'testimonials' },
        { name: 'Contact', content: 'Find Your Home', type: 'cta' }
      ]
    }
  ]

  useEffect(() => {
    if (isPreviewActive && autoCycling) {
      const interval = setInterval(() => {
        setCurrentSection((prev) => {
          const next = prev + 1
          if (next >= selectedDesign.sections.length) {
            // Auto-close after completing all sections
            setTimeout(() => handleClosePreview(), 10000) // Extended from 5000ms to 10000ms (10 seconds)
            return prev
          }
          return next
        })
      }, 4000) // Changed from 5000ms to 4000ms (4 seconds)
      return () => clearInterval(interval)
    }
  }, [isPreviewActive, selectedDesign, autoCycling])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  const gridVariants = {
    normal: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    minimized: {
      scale: 0.3,
      opacity: 0.7,
      x: '70%',
      y: '-70%',
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  }

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple/6 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title luxury-heading">
            Bring Your <span className="gradient-text">Ideas to Life</span>
          </h2>
          <p className="section-description">
            Explore our design concepts and see how your vision could look like.
          </p>
        </motion.div>

        {/* Design Grid */}
        <AnimatePresence mode="wait">
          {!isPreviewActive ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {designs.map((design, index) => (
                <motion.div
                  key={design.id}
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => handleDesignClick(design)}
                  className="group cursor-pointer"
                >
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${design.bgGradient} border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-glow-lg`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-8 text-center">
                      {/* Icon */}
                      <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${design.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {design.icon}
                      </div>

                      {/* Brand Name */}
                      <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                        {design.name}
                      </h3>

                      {/* Category */}
                      <p className="text-accent font-semibold text-sm mb-3">
                        {design.category}
                      </p>

                      {/* Description */}
                      <p className="text-secondary text-sm leading-relaxed mb-4">
                        {design.description}
                      </p>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-accent font-semibold text-sm"
                      >
                        Try this design →
                      </motion.div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Full Screen Preview */}
        <AnimatePresence>
          {isPreviewActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999999] bg-black/30 backdrop-blur-3xl flex items-center justify-center"
              style={{ 
                zIndex: 99999999,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                pointerEvents: 'auto',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              {/* Minimized Grid in Top-Right */}
              <motion.div
                variants={gridVariants}
                animate="minimized"
                className="absolute top-8 right-8 z-30"
              >
                <div className="grid grid-cols-3 gap-2 p-3 bg-background/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
                  {designs.map((design) => (
                    <motion.button
                      key={design.id}
                      onClick={() => handleDesignClick(design)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-lg border-2 transition-all duration-300 ${
                        selectedDesign?.id === design.id
                          ? 'border-accent shadow-accent/25'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      style={{ backgroundColor: design.color + '20' }}
                    >
                      {design.icon}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Demo Preview Content */}
                              <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-8" style={{ marginTop: '80px' }}>
                {/* Demo Animation Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-background to-background/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-[100000000]">
                  {/* Demo Header */}
                  <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-background/95 to-background/80 backdrop-blur-sm border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border-2 border-white/20"
                               style={{ backgroundColor: selectedDesign.color + '20' }}>
                            {selectedDesign.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-text">{selectedDesign.name}</h3>
                            <p className="text-accent text-sm">{selectedDesign.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {/* Auto-close timer */}
                        <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                          <span className="text-white/80 text-sm">Auto-close in: {Math.max(0, 30 - Math.floor(Date.now() / 1000) % 30)}s</span>
                        </div>
                        
                        {/* Auto-cycling toggle button */}
                        <motion.button
                          onClick={() => setAutoCycling(!autoCycling)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-text hover:bg-white/20 transition-colors duration-200 ${
                            autoCycling 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}
                          title={autoCycling ? 'Stop auto-cycling' : 'Start auto-cycling'}
                        >
                          {autoCycling ? '▶️' : '⏸️'}
                        </motion.button>
                        
                        {/* Info Button */}
                        <motion.button
                          onClick={() => setShowInfo(!showInfo)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-text hover:bg-white/20 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.button>
                        {/* Close Button */}
                        <motion.button
                          onClick={handleClosePreview}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-text hover:bg-white/20 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Info Popup */}
                  <AnimatePresence>
                    {showInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 right-8 z-30 bg-background/95 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-sm shadow-2xl"
                      >
                        <h4 className="text-lg font-bold text-text mb-3">Design Details</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-accent font-medium">Inspiration:</span>
                            <p className="text-secondary mt-1">{selectedDesign.inspiration}</p>
                          </div>
                          <div>
                            <span className="text-accent font-medium">Business Type:</span>
                            <p className="text-secondary mt-1">{selectedDesign.businessType}</p>
                          </div>
                          <div>
                            <span className="text-accent font-medium">Color Palette:</span>
                            <div className="flex space-x-2 mt-1">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedDesign.color }}></div>
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedDesign.accent }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Demo Animation */}
                  <div className="w-full h-full pt-24">
                    <DesignPreview 
                      design={selectedDesign} 
                      currentSection={currentSection} 
                      handleClosePreview={handleClosePreview} 
                      handleSectionChange={handleSectionChange}
                      setAutoCycling={setAutoCycling}
                      autoCycling={autoCycling}
                    />
                  </div>

                  {/* Section Progress */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedDesign.sections.map((section, index) => (
                      <motion.div
                        key={section.name}
                        animate={{
                          scale: currentSection === index ? 1.2 : 1,
                          opacity: currentSection === index ? 1 : 0.5
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-3 h-3 rounded-full border border-white/20 ${
                          currentSection === index ? 'bg-accent' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        {!isPreviewActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0, 201, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="cta-button bg-gradient-to-r from-accent to-purple text-background font-bold text-lg px-12 py-4 rounded-xl hover:from-accent/90 hover:to-purple/90 transition-all duration-200 shadow-lg hover:shadow-glow-lg"
            >
              Ready to bring your own idea to life? Let's build it together.
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Design Preview Component
const DesignPreview = ({ design, currentSection, handleClosePreview, handleSectionChange, setAutoCycling, autoCycling }) => {
  const section = design.sections[currentSection]

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  // Shared header component
  const SharedHeader = () => {
    // SaaS Spark specific header
    if (design.id === 'saas-spark') {
      return (
        <>
          {/* SaaS Spark Header */}
          <header className="absolute top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/20">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    ⚡
                  </motion.div>
                  <div>
                    <span className="text-2xl font-bold text-white">SaaS Spark</span>
                    <div className="text-cyan-400 text-xs font-semibold">AI Analytics Platform</div>
                  </div>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="#dashboard" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Dashboard</a>
                  <a href="#analytics" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Analytics</a>
                  <a href="#integrations" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Integrations</a>
                  <a href="#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Pricing</a>
                  <a href="#support" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Support</a>
                </nav>
                <div className="flex items-center space-x-4">
                  <button className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                    Sign In
                  </button>
                  <motion.button 
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    Start Free Trial
                  </motion.button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Navigation Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex items-center space-x-3 bg-slate-800/80 backdrop-blur-md rounded-full px-4 py-2 border border-cyan-500/20">
              {design.sections.map((section, index) => (
                <button 
                  key={section.name}
                  onClick={() => handleSectionChange(section.type)}
                  className={`w-3 h-3 rounded-full border border-cyan-500/30 transition-all duration-300 ${
                    currentSection === index 
                      ? 'bg-cyan-400 scale-125' 
                      : 'bg-slate-400/40 hover:bg-cyan-400/60 hover:scale-110'
                  }`}
                  title={section.name}
                />
              ))}
            </div>
          </div>
        </>
      )
    }
    
    // Default BeautyWave header
    return (
      <>
        {/* BeautyWave Header */}
        <header className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  BW
                </div>
                <span className="text-xl font-bold text-white">BeautyWave</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-white/80 hover:text-white transition-colors text-sm">Home</a>
                <a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">Services</a>
                <a href="#gallery" className="text-white/80 hover:text-white transition-colors text-sm">Gallery</a>
                <a href="#team" className="text-white/80 hover:text-white transition-colors text-sm">Team</a>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors text-sm">Contact</a>
              </nav>
              <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 text-sm">
                Book Now
              </button>
            </div>
          </div>
        </header>

        {/* Page Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            {design.sections.map((section, index) => (
              <button 
                key={section.name}
                onClick={() => handleSectionChange(section.type)}
                className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-blue-400 scale-125' 
                    : 'bg-white/20 hover:bg-white/40 hover:scale-110'
                }`}
                title={section.name}
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content - Everything fits in viewport */}
            <div className="h-full pt-16 flex flex-col">
              {/* Hero Section - Compact */}
              <section className="flex-1 flex items-center justify-center relative px-6">
                {/* Background Elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/30 rounded-full blur-xl"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div className="text-left">
                    <motion.h1 
                      className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <span className="text-white">Feel Radiant,</span><br />
                      <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Be Confident.</span>
                    </motion.h1>
                    <motion.p 
                      className="text-lg text-white/80 mb-6 leading-relaxed max-w-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                    >
                      Discover beauty redefined. Personalized salon experience tailored to your style.
                    </motion.p>
                    <motion.div
                      className="flex flex-col sm:flex-row gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    >
                      <motion.button 
                        className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-500"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book an Appointment
                      </motion.button>
                      <motion.button 
                        className="border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white/10 transition-all duration-500"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Services
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Right Image */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <div className="w-full h-64 bg-gradient-to-br from-pink-200 to-purple-300 rounded-3xl flex items-center justify-center text-6xl shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-500/20"></div>
                      <motion.span 
                        className="relative z-10"
                        animate={{ 
                          rotate: [0, 5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        💄
                      </motion.span>
                    </div>
                    {/* Decorative elements */}
                    <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full opacity-60"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <motion.div 
                      className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-400 rounded-full opacity-60"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0.9, 0.6]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'features':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <span className="text-white">Why Choose </span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">BeautyWave</span>
                  </motion.h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { 
                        title: 'Booking Made Easy', 
                        desc: 'Book appointments online with a few clicks. 24/7 availability.', 
                        icon: '📅',
                        animation: 'fadeInLeft'
                      },
                      { 
                        title: 'Professional Stylists', 
                        desc: 'Our experienced team brings your vision to life with precision.', 
                        icon: '👩‍🎨',
                        animation: 'fadeInUp'
                      },
                      { 
                        title: 'Personal Dashboard', 
                        desc: 'Manage bookings and see your beauty history all in one place.', 
                        icon: '📊',
                        animation: 'fadeInRight'
                      }
                    ].map((feature, index) => {
                      // Different animation variants for each feature card
                      const animationVariants = {
                        fadeInLeft: { initial: { opacity: 0, x: -40, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
                        fadeInUp: { initial: { opacity: 0, y: 40, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
                        fadeInRight: { initial: { opacity: 0, x: 40, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } }
                      }
                      
                      return (
                        <motion.div
                          key={feature.title}
                          {...animationVariants[feature.animation]}
                          transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                          className="text-center p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:shadow-lg hover:shadow-pink-500/20"
                          style={{ backgroundColor: 'rgba(236, 72, 153, 0.08)' }}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.05,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        >
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-white/20 bg-gradient-to-r from-pink-400 to-purple-500"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-white/70 leading-relaxed text-sm">{feature.desc}</p>
                      </motion.div>
                    )})}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'services':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <span className="text-white">Our </span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Services</span>
                  </motion.h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { 
                        title: 'Hair Styling', 
                        desc: 'Professional haircuts, coloring, and styling.',
                        icon: '💇‍♀️',
                        price: 'From €35',
                        duration: '1-2 hours',
                        animation: 'slideInUp'
                      },
                      { 
                        title: 'Nail Art', 
                        desc: 'Manicures, pedicures, and creative designs.',
                        icon: '💅',
                        price: 'From €25',
                        duration: '45-90 min',
                        animation: 'slideInRight'
                      },
                      { 
                        title: 'Makeup', 
                        desc: 'Professional makeup for special occasions.',
                        icon: '💄',
                        price: 'From €45',
                        duration: '1-1.5 hours',
                        animation: 'slideInDown'
                      },
                      { 
                        title: 'Facial Treatment', 
                        desc: 'Rejuvenating facials and skin care.',
                        icon: '🧖‍♀️',
                        price: 'From €40',
                        duration: '60-90 min',
                        animation: 'slideInLeft'
                      },
                      { 
                        title: 'Bridal Package', 
                        desc: 'Complete bridal styling package.',
                        icon: '👰',
                        price: 'From €150',
                        duration: '3-4 hours',
                        animation: 'zoomIn'
                      },
                      { 
                        title: 'Consultation', 
                        desc: 'Personalized beauty consultation.',
                        icon: '💡',
                        price: '€20',
                        duration: '30 min',
                        animation: 'bounceIn'
                      }
                    ].map((service, index) => {
                      // Different animation variants for each service card
                      const animationVariants = {
                        slideInUp: { initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
                        slideInRight: { initial: { opacity: 0, x: 30, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
                        slideInDown: { initial: { opacity: 0, y: -30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
                        slideInLeft: { initial: { opacity: 0, x: -30, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
                        zoomIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
                        bounceIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } }
                      }
                      
                      return (
                        <motion.div
                          key={service.title}
                          {...animationVariants[service.animation]}
                          transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                          className="p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:shadow-lg hover:shadow-pink-500/20"
                          style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)' }}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.05,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-lg border-2 border-white/20 flex-shrink-0 bg-gradient-to-r from-pink-400 to-purple-500">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                            <p className="text-white/70 text-xs mb-2 leading-relaxed">{service.desc}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-pink-400 font-semibold">{service.price}</span>
                              <span className="text-white/60">{service.duration}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )})}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'gallery':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <span className="text-white">Our </span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Signature Looks</span>
                  </motion.h2>
                  
                  {/* Gallery Filter */}
                  <motion.div 
                    className="flex justify-center mb-8 space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                {['All', 'Hair', 'Makeup', 'Nails', 'Bridal'].map((filter, index) => (
                  <motion.button
                    key={filter}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-500 ${
                      filter === 'All' 
                        ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-500/25' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg'
                    }`}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -2,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.5, ease: "easeOut" }}
                  >
                    {filter}
                  </motion.button>
                ))}
              </motion.div>

              <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { name: 'Elegant Curls', icon: '💁‍♀️', category: 'Hair', likes: 234, animation: 'fadeInUp' },
                  { name: 'Classic Updo', icon: '👰', category: 'Hair', likes: 189, animation: 'slideInLeft' },
                  { name: 'Soft Waves', icon: '🌊', category: 'Hair', likes: 156, animation: 'fadeInDown' },
                  { name: 'Modern Bob', icon: '💇‍♀️', category: 'Hair', likes: 203, animation: 'slideInRight' },
                  { name: 'Glamorous Style', icon: '✨', category: 'Makeup', likes: 278, animation: 'zoomIn' },
                  { name: 'Natural Beauty', icon: '🌸', category: 'Makeup', likes: 145, animation: 'bounceIn' },
                  { name: 'Bridal Look', icon: '👰‍♀️', category: 'Bridal', likes: 312, animation: 'rotateIn' },
                  { name: 'Evening Glam', icon: '💃', category: 'Makeup', likes: 267, animation: 'flipInX' }
                ].map((style, index) => {
                  // Different animation variants for each card
                  const animationVariants = {
                    fadeInUp: { initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
                    slideInLeft: { initial: { opacity: 0, x: -30, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
                    fadeInDown: { initial: { opacity: 0, y: -30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
                    slideInRight: { initial: { opacity: 0, x: 30, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
                    zoomIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
                    bounceIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
                    rotateIn: { initial: { opacity: 0, rotate: -180, scale: 0.9 }, animate: { opacity: 1, rotate: 0, scale: 1 } },
                    flipInX: { initial: { opacity: 0, rotateX: 90, scale: 0.9 }, animate: { opacity: 1, rotateX: 0, scale: 1 } }
                  }
                  
                  return (
                    <motion.div
                      key={style.name}
                      {...animationVariants[style.animation]}
                      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                      className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer"
                      style={{ backgroundColor: `${design.accent}15` }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotateY: 8,
                        y: -5,
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                    >
                    <div className="w-full h-full flex items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110">
                      {style.icon}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold bg-black/60 text-white">
                      {style.category}
                    </div>
                    
                    {/* Likes Counter */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-black/60 text-white flex items-center">
                      ❤️ {style.likes}
                    </div>
                    
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-center">
                        <h3 className="text-white font-bold text-lg mb-2">{style.name}</h3>
                        <p className="text-white/80 text-sm">{style.category} Style</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )})}
              </div>
              
              {/* Gallery Stats */}
              <motion.div 
                className="mt-8 grid grid-cols-3 gap-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              >
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.color}08` }}>
                  <div className="text-2xl font-bold text-accent">8</div>
                  <div className="text-secondary text-sm">Signature Styles</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.accent}08` }}>
                  <div className="text-2xl font-bold text-accent">1,784</div>
                  <div className="text-secondary text-sm">Total Likes</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.color}08` }}>
                  <div className="text-2xl font-bold text-accent">4</div>
                  <div className="text-secondary text-sm">Categories</div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
        )

      case 'testimonials':
        return (
          <div className="h-full flex items-center justify-center p-8">
            <SharedHeader />
            <div className="max-w-6xl w-full">
              <motion.h2 
                className="text-4xl font-bold text-center mb-16"
                style={{ color: design.color }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                What Our <span style={{ color: design.accent }}>Clients Say</span>
              </motion.h2>
              
              {/* Overall Rating */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex justify-center text-yellow-400 text-4xl mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <div className="text-2xl font-bold text-text mb-2">4.9/5</div>
                <div className="text-secondary">Based on 2,847 reviews</div>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    name: 'Sarah Mitchell', 
                    rating: 5, 
                    text: 'BeautyWave transformed my look completely! The stylists are incredibly talented and the online booking is so convenient. I love how they take the time to understand my style preferences.',
                    avatar: '👩‍🦰',
                    service: 'Hair Styling',
                    date: '2 days ago',
                    verified: true
                  },
                  { 
                    name: 'Emma Rodriguez', 
                    rating: 5, 
                    text: 'Best beauty salon experience ever! The attention to detail and personalized service exceeded all my expectations. The bridal package was absolutely perfect for my wedding day.',
                    avatar: '👩‍🦳',
                    service: 'Bridal Package',
                    date: '1 week ago',
                    verified: true
                  },
                  { 
                    name: 'Jessica Kim', 
                    rating: 5, 
                    text: 'I love how easy it is to book appointments and manage my beauty schedule. The results are always stunning and the team is so professional. Highly recommend!',
                    avatar: '👩‍🦱',
                    service: 'Makeup',
                    date: '3 days ago',
                    verified: true
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="p-8 rounded-3xl border border-white/10 relative overflow-hidden group"
                    style={{ backgroundColor: `${design.color}08` }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Subtle background highlight */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"></div>
                    
                    {/* Verified Badge */}
                    {testimonial.verified && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                    
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full mr-4 flex items-center justify-center text-2xl border-2 border-white/20"
                           style={{ backgroundColor: design.accent }}>
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-text text-lg">{testimonial.name}</h4>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex text-yellow-400">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i}>⭐</span>
                            ))}
                          </div>
                          <span className="text-secondary text-sm">{testimonial.rating}.0</span>
                        </div>
                        <p className="text-accent text-sm font-semibold">{testimonial.service}</p>
                      </div>
                    </div>
                    
                    <p className="text-secondary italic leading-relaxed mb-4">"{testimonial.text}"</p>
                    
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>{testimonial.date}</span>
                      <div className="flex items-center space-x-1">
                        <span>Helpful?</span>
                        <button className="text-accent hover:text-white transition-colors">👍</button>
                        <span>12</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Review Stats */}
              <motion.div 
                className="mt-12 grid grid-cols-4 gap-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.accent}08` }}>
                  <div className="text-2xl font-bold text-accent">2,847</div>
                  <div className="text-secondary text-sm">Total Reviews</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.color}08` }}>
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <div className="text-secondary text-sm">Satisfaction Rate</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.accent}08` }}>
                  <div className="text-2xl font-bold text-accent">4.9</div>
                  <div className="text-secondary text-sm">Average Rating</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10" style={{ backgroundColor: `${design.color}08` }}>
                  <div className="text-2xl font-bold text-accent">24h</div>
                  <div className="text-secondary text-sm">Response Time</div>
                </div>
              </motion.div>
            </div>
          </div>
        )

      case 'pricing':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <span className="text-white">Choose Your </span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Experience</span>
                  </motion.h2>
                  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { 
                    name: 'Essential', 
                    price: '€49', 
                    features: ['Haircut & Styling', 'Basic Consultation', 'Shampoo & Condition'],
                    popular: false
                  },
                  { 
                    name: 'Premium', 
                    price: '€89', 
                    features: ['Haircut & Styling', 'Color Treatment', 'Deep Conditioning', 'Style Consultation'],
                    popular: true
                  },
                  { 
                    name: 'Luxury', 
                    price: '€149', 
                    features: ['Full Service Package', 'VIP Treatment', 'Priority Booking', 'Aftercare Kit'],
                    popular: false
                  }
                ].map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className={`p-6 rounded-3xl border relative overflow-hidden group ${
                      pkg.popular ? 'border-pink-400 scale-105 shadow-lg shadow-pink-500/25' : 'border-white/10'
                    }`}
                    style={{ backgroundColor: pkg.popular ? 'rgba(236, 72, 153, 0.15)' : 'rgba(168, 85, 247, 0.08)' }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    {/* Popular badge */}
                    {pkg.popular && (
                      <motion.div 
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                      >
                        Most Popular
                      </motion.div>
                    )}
                    
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                      <div className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                        {pkg.price}
                      </div>
                      <ul className="space-y-3 mb-8 text-left">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-white/80">
                            <span className="text-green-400 mr-3 text-lg">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        className={`w-full py-4 rounded-xl font-bold transition-all duration-500 ${
                          pkg.popular 
                            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-500/25' 
                            : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg'
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Choose Plan
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
        )

      case 'cta':
        return (
          <div className="h-full flex items-center justify-center text-center relative overflow-hidden">
            <SharedHeader />
            {/* Background with blurred texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-purple-900/20"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            
            {/* Floating decorative elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-20 w-16 h-16 rounded-full opacity-30"
              style={{ backgroundColor: design.color }}
            />
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-20 w-20 h-20 rounded-full opacity-30"
              style={{ backgroundColor: design.accent }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-8">
              <motion.h2 
                className="text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: design.color }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Ready for Your <span style={{ color: design.accent }}>Makeover?</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              >
                Book your consultation now – it takes less than 2 minutes.
              </motion.p>
              <motion.button
                className="px-12 py-6 rounded-xl font-bold text-xl group relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${design.color}, ${design.accent})`,
                  color: 'white'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <span className="text-white">Meet Our </span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Expert Team</span>
                  </motion.h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    name: 'Sophia Chen', 
                    role: 'Senior Hair Stylist',
                    experience: '8+ years',
                    specialties: ['Color Specialist', 'Bridal Styling'],
                    avatar: '👩‍🦰',
                    rating: 5
                  },
                  { 
                    name: 'Isabella Rodriguez', 
                    role: 'Makeup Artist',
                    experience: '6+ years',
                    specialties: ['Bridal Makeup', 'Special Events'],
                    avatar: '👩‍🦳',
                    rating: 5
                  },
                  { 
                    name: 'Emma Thompson', 
                    role: 'Nail Technician',
                    experience: '5+ years',
                    specialties: ['Nail Art', 'Gel Extensions'],
                    avatar: '👩‍🦱',
                    rating: 5
                  },
                  { 
                    name: 'Olivia Martinez', 
                    role: 'Facial Specialist',
                    experience: '7+ years',
                    specialties: ['Anti-Aging', 'Acne Treatment'],
                    avatar: '👩‍🦲',
                    rating: 5
                  }
                ].map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.15, duration: 1, ease: "easeOut" }}
                    className="text-center p-6 rounded-3xl border border-white/10 relative overflow-hidden group"
                    style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)' }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    <motion.div 
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl border-2 border-white/20 bg-gradient-to-r from-pink-400 to-purple-500"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      {member.avatar}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-pink-400 font-semibold text-sm mb-2">{member.role}</p>
                    <p className="text-white/70 text-xs mb-3">{member.experience} experience</p>
                    <div className="flex justify-center text-yellow-400 text-sm mb-3">
                      {[...Array(member.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {member.specialties.map((specialty, i) => (
                        <p key={i} className="text-secondary text-xs">• {specialty}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
        )

      case 'statistics':
        return (
          <div className="h-full flex items-center justify-center p-8">
            <SharedHeader />
            <div className="max-w-6xl w-full">
              <motion.h2 
                className="text-4xl font-bold text-center mb-16"
                style={{ color: design.color }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                BeautyWave <span style={{ color: design.accent }}>by the Numbers</span>
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: '5000+', label: 'Happy Clients', icon: '😊' },
                  { number: '15000+', label: 'Services Completed', icon: '✨' },
                  { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
                  { number: '5+', label: 'Years Experience', icon: '🎉' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="text-center p-8 rounded-3xl border border-white/10 relative overflow-hidden group"
                    style={{ backgroundColor: `${design.color}08` }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-white/20"
                         style={{ backgroundColor: design.accent }}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold mb-2" style={{ color: design.color }}>
                      {stat.number}
                    </div>
                    <p className="text-secondary font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Additional stats row */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { metric: 'Average Rating', value: '4.9/5', icon: '🌟' },
                  { metric: 'Response Time', value: '< 2 hours', icon: '⚡' },
                  { metric: 'Online Booking', value: '24/7', icon: '📱' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.metric}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className="flex items-center p-4 rounded-2xl border border-white/10"
                    style={{ backgroundColor: `${design.accent}08` }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4"
                         style={{ backgroundColor: design.color }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-text">{stat.value}</div>
                      <div className="text-secondary text-sm">{stat.metric}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'faq':
        return (
          <div className="h-full bg-gradient-to-br from-pink-900 via-purple-900 to-black relative overflow-hidden">
            <SharedHeader />
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-4xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <span className="text-white">Frequently Asked </span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Questions</span>
                  </motion.h2>
                  <div className="space-y-6">
                {[
                  {
                    question: 'How far in advance should I book my appointment?',
                    answer: 'We recommend booking at least 1-2 weeks in advance for regular services, and 2-3 months for bridal appointments to ensure availability.'
                  },
                  {
                    question: 'What is your cancellation policy?',
                    answer: 'We require 24 hours notice for cancellations. Late cancellations may incur a 50% charge of the service price.'
                  },
                  {
                    question: 'Do you offer consultations before services?',
                    answer: 'Yes! We offer complimentary 15-minute consultations to discuss your style goals and create a personalized plan.'
                  },
                  {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept cash, credit cards, and digital payments including PayPal and Apple Pay for your convenience.'
                  },
                  {
                    question: 'Do you use cruelty-free and vegan products?',
                    answer: 'Yes, we prioritize cruelty-free and vegan products. We also offer organic and natural alternatives upon request.'
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.15, duration: 1, ease: "easeOut" }}
                    className="p-6 rounded-2xl border border-white/10"
                    style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)' }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                      <motion.span 
                        className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm font-bold bg-gradient-to-r from-pink-400 to-purple-500"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 180,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        ?
                      </motion.span>
                      {faq.question}
                    </h3>
                    <p className="text-white/70 leading-relaxed pl-9">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
        )

      // TechForge specific cases
      case 'tech-hero':
        return (
          <div className="h-full bg-black relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 1px, transparent 1px),
                                  radial-gradient(circle at 75% 75%, #0d9488 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Animated Circuit Lines */}
            <div className="absolute inset-0">
              <motion.div 
                className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-emerald-500 to-transparent"
                animate={{ height: [0, 128, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent to-teal-500"
                animate={{ height: [0, 128, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </div>

            <SharedHeader />
            
            {/* Main Content - Full Screen Layout */}
            <div className="h-full flex items-center justify-center relative z-10">
              <div className="max-w-7xl mx-auto px-6">
                {/* Central Tech Hub */}
                <div className="text-center">
                  {/* Status Indicator */}
                  <motion.div
                    className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-mono mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                    SYSTEM: ONLINE | STATUS: ACTIVE | VERSION: 2.0.1
                  </motion.div>
                  
                  {/* Main Title with Tech Typography */}
                  <motion.h1 
                    className="text-7xl lg:text-8xl font-black mb-8 leading-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <span className="text-white font-mono">TECH</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 bg-clip-text text-transparent font-mono">FORGE</span>
                  </motion.h1>
                  
                  {/* Subtitle with Matrix Effect */}
                  <motion.p 
                    className="text-2xl text-emerald-300/80 mb-12 font-mono max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  >
                    &gt; INITIALIZING INNOVATION ENGINE...
                    <br />
                    &gt; LOADING FUTURE-PROOF SOLUTIONS...
                    <br />
                    &gt; READY TO TRANSFORM YOUR BUSINESS
                  </motion.p>
                  
                  {/* Action Buttons in Tech Style */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                  >
                    <motion.button 
                      className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-none border-2 border-emerald-400 overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">EXECUTE PROJECT</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                    
                    <motion.button 
                      className="px-12 py-6 border-2 border-emerald-400 text-emerald-300 font-bold text-xl font-mono hover:bg-emerald-500/10 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: '#10b981',
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      SCAN SOLUTIONS
                    </motion.button>
                  </motion.div>
                </div>
                
                {/* Floating Tech Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute top-20 left-20 w-4 h-4 bg-emerald-400 rounded-full"
                    animate={{ 
                      scale: [1, 2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute top-40 right-32 w-3 h-3 bg-teal-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute bottom-32 left-1/3 w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ 
                      scale: [1, 2, 1],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )

            case 'tech-features':
        return (
          <div className="h-full bg-black relative overflow-hidden">
            {/* Tech Circuit Background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0,10 L20,10 M10,0 L10,20" stroke="#10b981" strokeWidth="0.5" fill="none"/>
                    <circle cx="10" cy="10" r="1" fill="#10b981"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)"/>
              </svg>
            </div>

            <SharedHeader />
            
            {/* Main Content - Hexagonal Grid Layout */}
            <div className="h-full flex items-center justify-center relative z-10">
              <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.h2 
                    className="text-6xl font-black mb-6 font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <span className="text-white">CORE</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">SYSTEMS</span>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl text-emerald-300/80 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    &gt; LOADING MODULES... &gt; INITIALIZING COMPONENTS...
                  </motion.p>
                </motion.div>
                
                {/* Hexagonal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {[
                    { 
                      title: 'NEURAL NETWORK', 
                      desc: 'AI-Powered Analytics Engine',
                      icon: '🤖',
                      specs: ['99.9% Accuracy', 'Real-time Processing', 'ML Algorithms'],
                      animation: 'fadeInLeft'
                    },
                    { 
                      title: 'CLOUD MATRIX', 
                      desc: 'Scalable Infrastructure Platform',
                      icon: '☁️',
                      specs: ['Auto-scaling', 'Global CDN', '99.99% Uptime'],
                      animation: 'fadeInUp'
                    },
                    { 
                      title: 'BLOCKCHAIN CORE', 
                      desc: 'Next-Gen Security Protocol',
                      icon: '🔗',
                      specs: ['Zero Trust', 'Smart Contracts', 'Immutable Ledger'],
                      animation: 'fadeInRight'
                    }
                  ].map((feature, index) => {
                    const animationVariants = {
                      fadeInLeft: { initial: { opacity: 0, x: -100, rotateY: -90 }, animate: { opacity: 1, x: 0, rotateY: 0 } },
                      fadeInUp: { initial: { opacity: 0, y: 100, rotateX: -90 }, animate: { opacity: 1, y: 0, rotateX: 0 } },
                      fadeInRight: { initial: { opacity: 0, x: 100, rotateY: 90 }, animate: { opacity: 1, x: 0, rotateY: 0 } }
                    }
                    
                    return (
                      <motion.div
                        key={feature.title}
                        {...animationVariants[feature.animation]}
                        transition={{ delay: index * 0.3, duration: 1.2, ease: "easeOut" }}
                        className="relative group perspective-1000"
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.4, ease: "easeOut" }
                        }}
                      >
                        {/* Hexagonal Container */}
                        <div className="relative bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-2 border-emerald-400/30 p-8 transform-gpu">
                          {/* Hexagonal Shape */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 clip-path-hexagon"></div>
                          
                          {/* Content */}
                          <div className="relative z-10 text-center">
                            {/* Icon with Glow Effect */}
                            <motion.div 
                              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 border-2 border-emerald-400/50"
                              whileHover={{ 
                                scale: 1.2,
                                rotate: 360,
                                transition: { duration: 0.6, ease: "easeOut" }
                              }}
                            >
                              {feature.icon}
                            </motion.div>
                            
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-3 font-mono">{feature.title}</h3>
                            
                            {/* Description */}
                            <p className="text-emerald-200/80 mb-6 text-sm">{feature.desc}</p>
                            
                            {/* Specs List */}
                            <div className="space-y-2">
                              {feature.specs.map((spec, i) => (
                                <motion.div
                                  key={spec}
                                  className="text-emerald-300/70 text-xs font-mono"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                >
                                  &gt; {spec}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )

            case 'tech-services':
        return (
          <div className="h-full bg-black relative overflow-hidden">
            {/* DNA Helix Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #10b981 20px, #10b981 22px),
                                  repeating-linear-gradient(-45deg, transparent, transparent 20px, #0d9488 20px, #0d9488 22px)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            <SharedHeader />
            
            {/* Main Content - DNA Structure */}
            <div className="h-full flex items-center justify-center relative z-10">
              <div className="max-w-7xl mx-auto px-6 w-full">
                {/* DNA Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.h2 
                    className="text-6xl font-black mb-6 font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <span className="text-white">GENETIC</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">ALGORITHMS</span>
                  </motion.h2>
                  
                  <motion.div 
                    className="inline-flex items-center px-6 py-3 bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                    SEQUENCING DNA PATTERNS... &gt; 6 GENETIC MODULES IDENTIFIED
                  </motion.div>
                </motion.div>
                
                {/* DNA Helix Structure */}
                <div className="relative max-w-6xl mx-auto">
                  {/* Central Helix */}
                  <motion.div 
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 transform -translate-x-1/2"
                    animate={{ 
                      rotate: 360,
                      scaleY: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                  
                  {/* DNA Base Pairs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { 
                        gene: 'GENE_ALPHA', 
                        function: 'Neural Network Processing',
                        icon: '🧠',
                        complexity: 'HIGH',
                        mutation: 'STABLE',
                        dna: 'ATCG-GCTA',
                        animation: 'helixLeft'
                      },
                      { 
                        gene: 'GENE_BETA', 
                        function: 'Quantum Computing Core',
                        icon: '⚛️',
                        complexity: 'MAXIMUM',
                        mutation: 'EVOLVING',
                        dna: 'GCTA-TAGC',
                        animation: 'helixRight'
                      },
                      { 
                        gene: 'GENE_GAMMA', 
                        function: 'Blockchain Security',
                        icon: '🔐',
                        complexity: 'HIGH',
                        mutation: 'STABLE',
                        dna: 'TAGC-CGAT',
                        animation: 'helixLeft'
                      },
                      { 
                        gene: 'GENE_DELTA', 
                        function: 'IoT Neural Mapping',
                        icon: '🌐',
                        complexity: 'MEDIUM',
                        mutation: 'ADAPTIVE',
                        dna: 'CGAT-GCTA',
                        animation: 'helixRight'
                      },
                      { 
                        gene: 'GENE_EPSILON', 
                        function: 'AI Consciousness',
                        icon: '🤖',
                        complexity: 'MAXIMUM',
                        mutation: 'RAPID',
                        dna: 'GCTA-ATCG',
                        animation: 'helixLeft'
                      },
                      { 
                        gene: 'GENE_ZETA', 
                        function: 'Cloud Evolution',
                        icon: '☁️',
                        complexity: 'HIGH',
                        mutation: 'STABLE',
                        dna: 'ATCG-TAGC',
                        animation: 'helixRight'
                      }
                    ].map((gene, index) => {
                      const isLeft = index % 2 === 0;
                      const animationVariants = {
                        helixLeft: { 
                          initial: { opacity: 0, x: -200, rotateY: -90 }, 
                          animate: { opacity: 1, x: 0, rotateY: 0 } 
                        },
                        helixRight: { 
                          initial: { opacity: 0, x: 200, rotateY: 90 }, 
                          animate: { opacity: 1, x: 0, rotateY: 0 } 
                        }
                      }
                      
                      return (
                        <motion.div
                          key={gene.gene}
                          {...animationVariants[gene.animation]}
                          transition={{ delay: index * 0.3, duration: 1.5, ease: "easeOut" }}
                          className="group perspective-1000"
                          whileHover={{ 
                            scale: 1.1,
                            rotateY: isLeft ? -15 : 15,
                            transition: { duration: 0.6, ease: "easeOut" }
                          }}
                        >
                          {/* DNA Base Pair */}
                          <div className={`relative ${isLeft ? 'mr-auto' : 'ml-auto'} max-w-xs`}>
                            {/* Connection Line */}
                            <motion.div 
                              className={`absolute top-1/2 w-16 h-0.5 bg-gradient-to-r ${isLeft ? 'from-emerald-400 to-transparent right-full' : 'from-transparent to-teal-400 left-full'}`}
                              animate={{ 
                                scaleX: [0, 1, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: index * 0.5 
                              }}
                            />
                            
                            {/* Gene Card */}
                            <div className="relative bg-gradient-to-br from-emerald-900/90 to-teal-900/90 border-2 border-emerald-400/40 p-6 transform-gpu">
                              {/* Gene Header */}
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-emerald-300 text-xs font-mono">{gene.gene}</span>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    gene.mutation === 'STABLE' ? 'bg-green-500' : 
                                    gene.mutation === 'EVOLVING' ? 'bg-yellow-500' : 'bg-red-500'
                                  } animate-pulse`}></div>
                                  <span className="text-xs font-mono text-emerald-300">{gene.mutation}</span>
                                </div>
                              </div>
                              
                              {/* Gene Content */}
                              <div className="space-y-4">
                                {/* Icon */}
                                <motion.div 
                                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-emerald-400/50"
                                  whileHover={{ 
                                    scale: 1.3,
                                    rotate: 360,
                                    transition: { duration: 0.8, ease: "easeOut" }
                                  }}
                                >
                                  {gene.icon}
                                </motion.div>
                                
                                {/* Function */}
                                <h3 className="text-white font-bold text-sm font-mono text-center">{gene.function}</h3>
                                
                                {/* DNA Sequence */}
                                <div className="text-center">
                                  <div className="text-emerald-400 text-xs font-mono bg-emerald-500/20 px-3 py-2 rounded border border-emerald-400/30">
                                    {gene.dna}
                                  </div>
                                </div>
                                
                                {/* Complexity */}
                                <div className="text-center">
                                  <div className="text-emerald-300 text-xs font-mono">
                                    COMPLEXITY: {gene.complexity}
                                  </div>
                                </div>
                                
                                {/* Action */}
                                <motion.button
                                  className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm font-mono border border-emerald-400/50 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  SEQUENCE GENE
                                </motion.button>
                              </div>
                              
                              {/* Glow Effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'tech-gallery':
        return (
          <div className="h-full bg-black relative overflow-hidden">
            {/* Quantum Field Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, #10b981 1px, transparent 1px),
                                  radial-gradient(circle at 80% 80%, #0d9488 1px, transparent 1px),
                                  radial-gradient(circle at 40% 60%, #06b6d4 1px, transparent 1px)`,
                backgroundSize: '60px 60px, 40px 40px, 80px 80px'
              }}></div>
            </div>

            <SharedHeader />
            
            {/* Main Content - Quantum Interface */}
            <div className="h-full flex items-center justify-center relative z-10">
              <div className="max-w-7xl mx-auto px-6 w-full">
                {/* Quantum Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.h2 
                    className="text-6xl font-black mb-6 font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <span className="text-white">QUANTUM</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">PORTFOLIO</span>
                  </motion.h2>
                  
                  <motion.div 
                    className="inline-flex items-center px-6 py-3 bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                    QUANTUM SUPERPOSITION ACTIVE... &gt; 8 QUANTUM STATES DETECTED
                  </motion.div>
                </motion.div>
                
                {/* Quantum States Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {[
                    { 
                      state: '|ψ₁⟩', 
                      name: 'Quantum AI Core', 
                      icon: '⚛️', 
                      category: 'Quantum AI', 
                      superposition: '|0⟩ + |1⟩',
                      entanglement: 0.95,
                      specs: ['Quantum ML', 'Superposition', 'Entanglement'],
                      animation: 'quantumFade'
                    },
                    { 
                      state: '|ψ₂⟩', 
                      name: 'Quantum Security', 
                      icon: '🔐', 
                      category: 'Quantum Crypto', 
                      superposition: '|0⟩ - |1⟩',
                      entanglement: 0.98,
                      specs: ['Quantum Key', 'Entanglement', 'Unbreakable'],
                      animation: 'quantumSlide'
                    },
                    { 
                      state: '|ψ₃⟩', 
                      name: 'Quantum IoT', 
                      icon: '🌐', 
                      category: 'Quantum IoT', 
                      superposition: '|0⟩ + i|1⟩',
                      entanglement: 0.87,
                      specs: ['Quantum Sensors', 'Real-time', 'Precision'],
                      animation: 'quantumSpin'
                    },
                    { 
                      state: '|ψ₄⟩', 
                      name: 'Quantum Blockchain', 
                      icon: '⛓️', 
                      category: 'Quantum Chain', 
                      superposition: '|0⟩ - i|1⟩',
                      entanglement: 0.92,
                      specs: ['Quantum Ledger', 'Entanglement', 'Security'],
                      animation: 'quantumBounce'
                    },
                    { 
                      state: '|ψ₅⟩', 
                      name: 'Quantum Cloud', 
                      icon: '☁️', 
                      category: 'Quantum Cloud', 
                      superposition: '|0⟩ + |1⟩/√2',
                      entanglement: 0.89,
                      specs: ['Quantum Storage', 'Superposition', 'Speed'],
                      animation: 'quantumRotate'
                    },
                    { 
                      state: '|ψ₆⟩', 
                      name: 'Quantum Analytics', 
                      icon: '📊', 
                      category: 'Quantum Data', 
                      superposition: '|0⟩ - |1⟩/√2',
                      entanglement: 0.94,
                      specs: ['Quantum Processing', 'Parallel', 'Exponential'],
                      animation: 'quantumFlip'
                    },
                    { 
                      state: '|ψ₇⟩', 
                      name: 'Quantum Network', 
                      icon: '🕸️', 
                      category: 'Quantum Net', 
                      superposition: '|0⟩ + |1⟩/2',
                      entanglement: 0.91,
                      specs: ['Quantum Routing', 'Entanglement', 'Instant'],
                      animation: 'quantumZoom'
                    },
                    { 
                      state: '|ψ₈⟩', 
                      name: 'Quantum Computing', 
                      icon: '💻', 
                      category: 'Quantum Comp', 
                      superposition: '|0⟩ - |1⟩/2',
                      entanglement: 0.96,
                      specs: ['Quantum Gates', 'Qubits', 'Exponential'],
                      animation: 'quantumWave'
                    }
                  ].map((quantum, index) => {
                    const animationVariants = {
                      quantumFade: { 
                        initial: { opacity: 0, scale: 0.1 }, 
                        animate: { opacity: [0, 1, 0.8, 1], scale: [0.1, 1.2, 0.9, 1] } 
                      },
                      quantumSlide: { 
                        initial: { opacity: 0, x: -200, rotateY: -90 }, 
                        animate: { opacity: 1, x: 0, rotateY: 0 } 
                      },
                      quantumSpin: { 
                        initial: { opacity: 0, rotate: -720, scale: 0.5 }, 
                        animate: { opacity: 1, rotate: 0, scale: 1 } 
                      },
                      quantumBounce: { 
                        initial: { opacity: 0, y: 200, scale: 0.5 }, 
                        animate: { opacity: 1, y: 0, scale: 1 } 
                      },
                      quantumRotate: { 
                        initial: { opacity: 0, rotateX: 180, scale: 0.5 }, 
                        animate: { opacity: 1, rotateX: 0, scale: 1 } 
                      },
                      quantumFlip: { 
                        initial: { opacity: 0, rotateY: 180, scale: 0.5 }, 
                        animate: { opacity: 1, rotateY: 0, scale: 1 } 
                      },
                      quantumZoom: { 
                        initial: { opacity: 0, scale: 0.1, rotate: 360 }, 
                        animate: { opacity: 1, scale: 1, rotate: 0 } 
                      },
                      quantumWave: { 
                        initial: { opacity: 0, y: -200, scale: 0.5 }, 
                        animate: { opacity: 1, y: 0, scale: 1 } 
                      }
                    }
                    
                    return (
                      <motion.div
                        key={quantum.state}
                        {...animationVariants[quantum.animation]}
                        transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
                        className="group perspective-1000"
                        whileHover={{ 
                          scale: 1.15,
                          rotateY: 15,
                          transition: { duration: 0.6, ease: "easeOut" }
                        }}
                      >
                        {/* Quantum State Card */}
                        <div className="relative bg-gradient-to-br from-emerald-900/90 to-teal-900/90 border-2 border-emerald-400/40 p-6 transform-gpu">
                          {/* Quantum State Header */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-emerald-300 text-lg font-mono font-bold">{quantum.state}</span>
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-3 h-3 bg-emerald-400 rounded-full"
                                animate={{ 
                                  scale: [1, 2, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <span className="text-xs font-mono text-emerald-300">{quantum.entanglement.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          {/* Quantum Content */}
                          <div className="text-center space-y-4">
                            {/* Icon with Quantum Effect */}
                            <motion.div 
                              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-emerald-400/50 relative"
                              whileHover={{ 
                                scale: 1.4,
                                rotate: 360,
                                transition: { duration: 0.8, ease: "easeOut" }
                              }}
                            >
                              {quantum.icon}
                              {/* Quantum Particles */}
                              <motion.div 
                                className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 0, 0.5]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                            </motion.div>
                            
                            {/* Name */}
                            <h3 className="text-white font-bold text-sm font-mono">{quantum.name}</h3>
                            
                            {/* Category */}
                            <div className="text-emerald-400 text-xs font-mono bg-emerald-500/20 px-2 py-1 rounded">
                              {quantum.category}
                            </div>
                            
                            {/* Superposition */}
                            <div className="text-center">
                              <div className="text-emerald-300 text-xs font-mono bg-emerald-500/10 px-3 py-2 rounded border border-emerald-400/30">
                                {quantum.superposition}
                              </div>
                            </div>
                            
                            {/* Specs */}
                            <div className="space-y-1">
                              {quantum.specs.map((spec, i) => (
                                <motion.div
                                  key={spec}
                                  className="text-emerald-300/70 text-xs font-mono"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                                >
                                  &gt; {spec}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Quantum Field Effect */}
                          <div className="absolute inset-0 pointer-events-none">
                            <motion.div 
                              className="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald-400 rounded-full"
                              animate={{ 
                                scale: [1, 20, 1],
                                opacity: [1, 0, 1]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                          </div>
                          
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )

      // SaaS Spark Sections - Completely Redesigned
      case 'saas-hero':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            
            {/* Animated Data Network Background */}
            <div className="absolute inset-0">
              {/* Data Pulse Nodes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${15 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
              
              {/* Network Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <motion.path
                  d="M 100 200 Q 300 100 500 200 T 900 200"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Main Content */}
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center relative px-6">
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                  <motion.h1 
                    className="text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                    initial={{ opacity: 0, y: 50, x: -30 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Empower Your SaaS with </span><br />
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                      AI-driven Analytics
                    </span>
                  </motion.h1>
                  <motion.p 
                    className="text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30, x: 30 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  >
                    Track, visualize, and optimize your product metrics in real-time.
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.button
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Get Started</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                    <motion.button
                      className="border-2 border-cyan-400/50 text-cyan-400 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Request Demo
                    </motion.button>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-features':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            
            {/* Animated Circuit Board Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
              {/* Circuit Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                <motion.path
                  d="M 50 100 L 200 100 L 200 200 L 350 200 L 350 300 L 500 300"
                  stroke="url(#circuitGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 600 150 L 750 150 L 750 250 L 900 250"
                  stroke="url(#circuitGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6 py-4">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Next-Gen </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Capabilities</span>
                  </motion.h2>
                  
                                    {/* Interactive Feature Showcase */}
                  <div className="relative h-96">
                    {/* Animated Background Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                          style={{
                            left: `${10 + i * 8}%`,
                            top: `${20 + (i % 3) * 25}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.3, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Orbit Scene */}
                    <div className="relative w-96 h-96 mx-auto">
                      {/* Visible Orbital Track - Glowing Circle Path */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-88 h-88 rounded-full border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/20 z-5">
                        {/* Inner glow ring */}
                        <div className="absolute inset-0 rounded-full border border-cyan-400/20"></div>
                        {/* Outer glow ring */}
                        <div className="absolute -inset-1 rounded-full border border-cyan-500/10 blur-sm"></div>
                      </div>
                      
                      {/* Central Circle */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 z-10">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 360]
                          }}
                          transition={{ 
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                          }}
                          className="text-2xl"
                        >
                          ⚡
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      {/* Perfect Orbit Container with Counter-Rotation */}
                      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: '12s' }}>
                        {/* Card 1 - Top (0°) */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(0deg) translateX(180px)' }}>
                          <div className="group" style={{ transform: 'rotate(0deg)' }}>
                            {/* Glowing Trail Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-xl blur-sm"
                              animate={{
                                opacity: [0, 0.5, 0],
                                scale: [0.8, 1.1, 0.8]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            
                            <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/40 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform-gpu w-32 relative overflow-hidden">
                              {/* Animated Background */}
                              <motion.div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  background: 'radial-gradient(circle at 20% 80%, #06b6d4 0%, transparent 50%)'
                                }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.2, 0.4, 0.2]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                              
                              {/* Icon */}
                              <motion.div 
                                className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center text-lg shadow-lg border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500 to-purple-500 relative overflow-hidden"
                                whileHover={{ 
                                  scale: 1.3,
                                  rotate: 15,
                                  transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                animate={{
                                  y: [0, -3, 0],
                                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                              >
                                <span className="relative z-10">🧠</span>
                              </motion.div>
                              
                              {/* Content */}
                              <div className="text-center relative z-10">
                                <h3 className="text-xs font-bold text-white mb-1 leading-tight">Neural Analytics</h3>
                                <p className="text-slate-300 text-xs mb-2 leading-relaxed">AI-powered insights</p>
                                
                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-1 justify-center">
                                  <motion.div
                                    className="px-1 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                  >
                                    <span className="text-cyan-300 text-xs font-semibold">ML</span>
                                  </motion.div>
                                  <motion.div
                                    className="px-1 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9, duration: 0.4 }}
                                  >
                                    <span className="text-cyan-300 text-xs font-semibold">AI</span>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card 2 - Left (120°) */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(120deg) translateX(180px)' }}>
                          <div className="group" style={{ transform: 'rotate(-120deg)' }}>
                            {/* Glowing Trail Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl blur-sm"
                              animate={{
                                opacity: [0, 0.5, 0],
                                scale: [0.8, 1.1, 0.8]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            
                            <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl p-4 border border-purple-500/40 hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 transform-gpu w-32 relative overflow-hidden">
                              {/* Animated Background */}
                              <motion.div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  background: 'radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 50%)'
                                }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.2, 0.4, 0.2]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                              
                              {/* Icon */}
                              <motion.div 
                                className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center text-lg shadow-lg border-2 border-purple-500/40 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden"
                                whileHover={{ 
                                  scale: 1.3,
                                  rotate: 15,
                                  transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                animate={{
                                  y: [0, -3, 0],
                                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                }}
                              >
                                <span className="relative z-10">📊</span>
                              </motion.div>
                              
                              {/* Content */}
                              <div className="text-center relative z-10">
                                <h3 className="text-xs font-bold text-white mb-1 leading-tight">Data Analytics</h3>
                                <p className="text-slate-300 text-xs mb-2 leading-relaxed">Real-time insights</p>
                                
                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-1 justify-center">
                                  <motion.div
                                    className="px-1 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.0, duration: 0.4 }}
                                  >
                                    <span className="text-purple-300 text-xs font-semibold">Real-time</span>
                                  </motion.div>
                                  <motion.div
                                    className="px-1 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1, duration: 0.4 }}
                                  >
                                    <span className="text-purple-300 text-xs font-semibold">3D</span>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card 3 - Right (240°) */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(240deg) translateX(180px)' }}>
                          <div className="group" style={{ transform: 'rotate(-240deg)' }}>
                            {/* Glowing Trail Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-xl blur-sm"
                              animate={{
                                opacity: [0, 0.5, 0],
                                scale: [0.8, 1.1, 0.8]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                            
                            <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl p-4 border border-emerald-500/40 hover:border-emerald-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30 transform-gpu w-32 relative overflow-hidden">
                              {/* Animated Background */}
                              <motion.div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  background: 'radial-gradient(circle at 20% 80%, #10b981 0%, transparent 50%)'
                                }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.2, 0.4, 0.2]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                              
                              {/* Icon */}
                              <motion.div 
                                className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center text-lg shadow-lg border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500 to-cyan-500 relative overflow-hidden"
                                whileHover={{ 
                                  scale: 1.3,
                                  rotate: 15,
                                  transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                animate={{
                                  y: [0, -3, 0],
                                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                              >
                                <span className="relative z-10">🚨</span>
                              </motion.div>
                              
                              {/* Content */}
                              <div className="text-center relative z-10">
                                <h3 className="text-xs font-bold text-white mb-1 leading-tight">System Monitor</h3>
                                <p className="text-slate-300 text-xs mb-2 leading-relaxed">Proactive alerts</p>
                                
                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-1 justify-center">
                                  <motion.div
                                    className="px-1 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.4 }}
                                  >
                                    <span className="text-emerald-300 text-xs font-semibold">Alerts</span>
                                  </motion.div>
                                  <motion.div
                                    className="px-1 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.3, duration: 0.4 }}
                                  >
                                    <span className="text-emerald-300 text-xs font-semibold">Auto</span>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-dashboard':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6 py-4">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Interactive </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI Dashboard</span>
                  </motion.h2>
                  
                  {/* Theme Toggle */}
                  <motion.div 
                    className="flex justify-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-cyan-500/30">
                      <button className="px-4 py-1 rounded-full bg-cyan-500 text-white font-semibold text-xs">
                        Dark Mode
                      </button>
                      <button className="px-4 py-1 rounded-full text-slate-300 font-semibold text-xs hover:text-white">
                        Light Mode
                      </button>
                    </div>
                  </motion.div>
                  
                  {/* Interactive Dashboard */}
                  <motion.div
                    className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 max-w-5xl mx-auto shadow-2xl shadow-cyan-500/10"
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  >
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        <span className="text-cyan-100 font-bold text-base">AI Analytics Dashboard</span>
                        <div className="px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                          <span className="text-cyan-400 text-xs font-semibold">LIVE</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Real-time Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {[
                        { label: 'Active Users', value: '12,847', change: '+23%', icon: '👥', color: 'cyan' },
                        { label: 'Revenue', value: '€89,230', change: '+18%', icon: '💰', color: 'purple' },
                        { label: 'Conversion', value: '4.7%', change: '+12%', icon: '📈', color: 'green' },
                        { label: 'System Health', value: '99.9%', change: 'Stable', icon: '🟢', color: 'emerald' }
                      ].map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          className="bg-slate-700/50 rounded-xl p-4 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg">{metric.icon}</span>
                            <span className={`text-${metric.color}-400 text-xs font-semibold`}>{metric.change}</span>
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                          <div className="text-slate-300 text-xs">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* AI Chart Section */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* User Growth Chart */}
                      <motion.div 
                        className="bg-slate-700/30 rounded-xl p-4 border border-cyan-500/10"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-cyan-100 font-semibold text-sm">User Growth AI Prediction</span>
                          <span className="text-slate-400 text-xs">Next 30 days</span>
                        </div>
                        <div className="h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {/* Animated Chart Bars */}
                          {[...Array(7)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute bottom-2 w-6 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-t"
                              style={{ left: `${15 + i * 12}%` }}
                              initial={{ height: 0 }}
                              animate={{ height: `${20 + Math.random() * 60}%` }}
                              transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
                            />
                          ))}
                          <div className="text-cyan-300/60 text-xs font-mono">AI Analysis Active</div>
                        </div>
                      </motion.div>
                      
                      {/* System Status */}
                      <motion.div 
                        className="bg-slate-700/30 rounded-xl p-4 border border-cyan-500/10"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-cyan-100 font-semibold text-sm">System Status</span>
                          <span className="text-green-400 text-xs">All Systems Operational</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { service: 'API Gateway', status: 'Online', color: 'green' },
                            { service: 'Database', status: 'Online', color: 'green' },
                            { service: 'AI Engine', status: 'Processing', color: 'cyan' },
                            { service: 'Analytics', status: 'Online', color: 'green' }
                          ].map((item, i) => (
                            <motion.div
                              key={item.service}
                              className="flex items-center justify-between"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                            >
                              <span className="text-slate-300 text-xs">{item.service}</span>
                              <div className="flex items-center space-x-2">
                                <div className={`w-1.5 h-1.5 bg-${item.color}-400 rounded-full animate-pulse`}></div>
                                <span className={`text-${item.color}-400 text-xs`}>{item.status}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-logos':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Trusted by </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Industry Leaders</span>
                  </motion.h2>
                  
                  {/* Auto-scrolling Logos */}
                  <motion.div
                    className="relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="flex space-x-16 animate-scroll">
                      {[
                        { name: 'Slack', logo: '💬', color: 'purple' },
                        { name: 'HubSpot', logo: '🎯', color: 'orange' },
                        { name: 'Stripe', logo: '💳', color: 'blue' },
                        { name: 'Notion', logo: '📝', color: 'black' },
                        { name: 'Figma', logo: '🎨', color: 'pink' },
                        { name: 'Linear', logo: '📊', color: 'purple' },
                        { name: 'Vercel', logo: '⚡', color: 'black' },
                        { name: 'Discord', logo: '🎮', color: 'indigo' },
                        { name: 'Slack', logo: '💬', color: 'purple' },
                        { name: 'HubSpot', logo: '🎯', color: 'orange' },
                        { name: 'Stripe', logo: '💳', color: 'blue' },
                        { name: 'Notion', logo: '📝', color: 'black' }
                      ].map((company, index) => (
                        <motion.div
                          key={`${company.name}-${index}`}
                          className="flex items-center space-x-3 px-8 py-4 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                          whileHover={{ 
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }}
                        >
                          <span className="text-2xl">{company.logo}</span>
                          <span className="text-white font-semibold text-lg">{company.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-use-cases':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            
            {/* Animated Neural Network Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
              {/* Neural Network Nodes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${25 + (i % 2) * 30}%`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
            
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6 py-4">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">AI-Powered </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Intelligence</span>
                  </motion.h2>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    {[
                      { 
                        title: 'Predictive User Analytics', 
                        icon: '🔮',
                        description: 'Forecast user behavior with 99.7% accuracy using advanced ML algorithms',
                        color: 'cyan',
                        features: ['Behavioral Patterns', 'Churn Prediction', 'Lifetime Value'],
                        animation: 'float'
                      },
                      { 
                        title: 'Intelligent System Monitoring', 
                        icon: '🚨',
                        description: 'Proactive anomaly detection with instant alert systems',
                        color: 'red',
                        features: ['Real-time Alerts', 'Auto-remediation', 'Performance Optimization'],
                        animation: 'pulse'
                      },
                      { 
                        title: 'Revenue Intelligence Engine', 
                        icon: '💰',
                        description: 'AI-driven revenue optimization and predictive financial insights',
                        color: 'emerald',
                        features: ['Revenue Forecasting', 'Price Optimization', 'Growth Insights'],
                        animation: 'bounce'
                      }
                    ].map((useCase, index) => (
                      <motion.div
                        key={useCase.title}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                        className="relative group"
                        whileHover={{ 
                          y: -8,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
                          {/* Animated Icon Container */}
                          <motion.div 
                            className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl shadow-xl border-2 border-${useCase.color}-500/30 bg-gradient-to-br from-${useCase.color}-500 to-${useCase.color}-600 relative overflow-hidden`}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: 10,
                              transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            animate={{
                              y: useCase.animation === 'float' ? [0, -8, 0] : 
                                 useCase.animation === 'pulse' ? [1, 1.05, 1] : 
                                 [0, -5, 0],
                              transition: { 
                                duration: useCase.animation === 'pulse' ? 2 : 2.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                              }
                            }}
                          >
                            <span className="relative z-10">{useCase.icon}</span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            {/* Orbital Particles */}
                            {[...Array(2)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  marginLeft: '-3px',
                                  marginTop: '-3px',
                                }}
                                animate={{
                                  x: [0, Math.cos(i * 180 * Math.PI / 180) * 25],
                                  y: [0, Math.sin(i * 180 * Math.PI / 180) * 25],
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                }}
                              />
                            ))}
                          </motion.div>
                          
                          {/* Content */}
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                            <p className="text-slate-300 text-sm font-medium mb-4 leading-relaxed">{useCase.description}</p>
                            
                            {/* Feature Pills */}
                            <div className="flex flex-wrap justify-center gap-2">
                              {useCase.features.map((feature, i) => (
                                <motion.div
                                  key={feature}
                                  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.6 + index * 0.2 + i * 0.1, duration: 0.4 }}
                                  whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: 'rgba(6, 182, 212, 0.2)',
                                    transition: { duration: 0.3 }
                                  }}
                                >
                                  <span className="text-cyan-300 text-xs font-semibold">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Holographic Effect */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: 'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent)',
                              backgroundSize: '200% 200%'
                            }}
                            animate={{
                              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-pricing':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
              {/* Floating Data Points */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                />
              ))}
            </div>
            
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6 py-4">
                <div className="max-w-5xl w-full">
                  <motion.h2 
                    className="text-3xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Select Your </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Tier</span>
                  </motion.h2>
                  
                  <div className="grid lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {[
                      { 
                        name: 'Growth Accelerator', 
                        price: '€149',
                        period: '/month',
                        features: [
                          'Up to 25 team members',
                          'Advanced AI analytics',
                          'Real-time monitoring',
                          'Priority support',
                          'Custom integrations'
                        ],
                        popular: false,
                        tilt: 'left',
                        icon: '🚀'
                      },
                      { 
                        name: 'Enterprise Powerhouse', 
                        price: '€399',
                        period: '/month',
                        features: [
                          'Unlimited team members',
                          'AI-powered insights',
                          'Custom dashboards',
                          '24/7 dedicated support',
                          'Full API access',
                          'Dedicated account manager'
                        ],
                        popular: true,
                        tilt: 'right',
                        icon: '⚡'
                      }
                    ].map((pkg, index) => (
                      <motion.div
                        key={pkg.name}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                        className="relative group perspective-1000"
                        whileHover={{ 
                          rotateY: pkg.tilt === 'left' ? -5 : 5,
                          rotateX: 2,
                          y: -8,
                          transition: { duration: 0.4, ease: "easeOut" }
                        }}
                      >
                        <div className={`bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 pt-6 border relative overflow-hidden transform-gpu transition-all duration-500 min-h-[420px] ${
                          pkg.popular 
                            ? 'border-cyan-400 shadow-xl shadow-cyan-500/30' 
                            : 'border-cyan-500/20 hover:border-cyan-500/40'
                        }`}>
                          {/* Popular badge */}
                          {pkg.popular && (
                            <motion.div 
                              className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-xl z-10"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                            >
                              ⭐ Recommended
                            </motion.div>
                          )}
                          
                          {/* Plan Icon */}
                          <motion.div 
                            className="w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center text-xl bg-gradient-to-br from-cyan-500 to-purple-500"
                            whileHover={{ 
                              scale: 1.1,
                              rotate: 5,
                              transition: { duration: 0.3, ease: "easeOut" }
                            }}
                          >
                            {pkg.icon}
                          </motion.div>
                          
                          <div className="text-center flex flex-col h-full">
                            <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                            <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                              {pkg.price}
                            </div>
                            <div className="text-slate-300 text-sm mb-3">{pkg.period}</div>
                            <ul className="space-y-1.5 mb-4 text-left flex-1">
                              {pkg.features.map((feature, i) => (
                                <motion.li 
                                  key={i} 
                                  className="flex items-center text-slate-300"
                                  initial={{ opacity: 0, x: 15 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + index * 0.2 + i * 0.1, duration: 0.4 }}
                                >
                                  <span className="text-cyan-400 mr-2 text-sm">✓</span>
                                  <span className="text-xs font-medium">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                            <motion.button
                              className={`w-full py-3 rounded-xl font-bold text-base transition-all duration-500 mt-auto ${
                                pkg.popular 
                                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50' 
                                  : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-lg border-2 border-cyan-500/30 hover:border-cyan-500/40'
                              }`}
                              whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.3, ease: "easeOut" }
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {pkg.popular ? 'Get Started Now' : 'Start Free Trial'}
                            </motion.button>
                          </div>
                          
                          {/* Advanced 3D Hover Effects */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                          />
                          
                          {/* Glow Border Animation */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-transparent"
                            style={{ 
                              background: 'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.2), transparent)',
                              backgroundSize: '200% 200%'
                            }}
                            animate={{
                              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-testimonials':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            
            {/* Light Blurred Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 backdrop-blur-3xl"></div>
            
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-7xl w-full">
                  <motion.h2 
                    className="text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Client </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Success Stories</span>
                  </motion.h2>
                  
                  {/* Split Screen Testimonials */}
                  <div className="grid lg:grid-cols-2 gap-12">
                    {[
                      { 
                        name: 'Alex Chen', 
                        role: 'CTO',
                        company: 'TechFlow Inc.',
                        companyLogo: '🚀',
                        quote: 'SaaS Spark helped us cut churn by 25% in the first month! The AI predictions are incredibly accurate.',
                        avatar: '👨‍💼',
                        color: 'cyan'
                      },
                      { 
                        name: 'Maria Rodriguez', 
                        role: 'Head of Product',
                        company: 'DataSync Solutions',
                        companyLogo: '📊',
                        quote: 'The real-time analytics transformed our decision-making process. We can now predict user behavior with 95% accuracy.',
                        avatar: '👩‍💻',
                        color: 'purple'
                      }
                    ].map((testimonial, index) => (
                      <motion.div
                        key={testimonial.name}
                        initial={{ opacity: 0, x: index === 0 ? -50 : 50, y: 30 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                        className="relative group"
                      >
                        <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
                          {/* Company Logo */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-cyan-500 to-purple-500">
                                {testimonial.companyLogo}
                              </div>
                              <div>
                                <h4 className="text-white font-bold text-lg">{testimonial.company}</h4>
                                <p className="text-slate-400 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quote */}
                          <blockquote className="text-2xl font-bold text-white mb-8 leading-relaxed">
                            "{testimonial.quote}"
                          </blockquote>
                          
                          {/* Person */}
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded-full mr-4 flex items-center justify-center text-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500 to-purple-500">
                              {testimonial.avatar}
                            </div>
                            <div>
                              <h5 className="text-white font-bold text-lg">{testimonial.name}</h5>
                              <p className="text-cyan-400 font-semibold">{testimonial.role}</p>
                            </div>
                          </div>
                          
                          {/* Hover Glow Effect */}
                          <motion.div
                            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )

      case 'saas-cta':
        return (
          <div className="h-full flex items-center justify-center text-center relative overflow-hidden">
            <SharedHeader />
            
            {/* Spinning Nodes Background */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                />
              ))}
              
              {/* Radial Chart Expanding */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20"
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-8">
              <motion.h2 
                className="text-6xl lg:text-7xl font-bold mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-white">Ready to Scale Your </span><br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  SaaS Platform?
                </span>
              </motion.h2>
              <motion.p 
                className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              >
                Join thousands of companies using AI-powered analytics to drive growth and optimize performance.
              </motion.p>
              <motion.button
                className="px-16 py-8 rounded-3xl font-bold text-2xl group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-2xl shadow-cyan-500/30"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                <span className="relative z-10 flex items-center">
                  Schedule a Strategy Call
                  <motion.svg 
                    className="w-6 h-6 ml-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </div>
        )

      case 'saas-billing':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 relative overflow-hidden">
            <SharedHeader />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
              {/* Floating Payment Icons */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-40"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
            
            <div className="h-full pt-16 flex flex-col">
              <section className="flex-1 flex items-center justify-center px-6 py-4">
                <div className="max-w-6xl w-full">
                  <motion.h2 
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white">Payment & </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Billing</span>
                  </motion.h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Payment Status */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                      className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Payment Status</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-sm font-semibold">Active</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                          <div>
                            <div className="text-white font-semibold">Enterprise Powerhouse</div>
                            <div className="text-slate-300 text-sm">€399/month</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold">€399.00</div>
                            <div className="text-slate-400 text-xs">Next billing: Dec 15, 2024</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                          <div>
                            <div className="text-white font-semibold">Payment Method</div>
                            <div className="text-slate-300 text-sm">Visa ending in 4242</div>
                          </div>
                          <div className="text-emerald-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Billing History */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                      className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Billing History</h3>
                      
                      <div className="space-y-3">
                        {[
                          { date: 'Nov 15, 2024', amount: '€399.00', status: 'Paid', color: 'green' },
                          { date: 'Oct 15, 2024', amount: '€399.00', status: 'Paid', color: 'green' },
                          { date: 'Sep 15, 2024', amount: '€399.00', status: 'Paid', color: 'green' },
                          { date: 'Aug 15, 2024', amount: '€149.00', status: 'Paid', color: 'green' }
                        ].map((invoice, index) => (
                          <motion.div
                            key={invoice.date}
                            className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                          >
                            <div>
                              <div className="text-white font-medium">{invoice.date}</div>
                              <div className="text-slate-400 text-sm">Invoice #{1000 + index}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">{invoice.amount}</div>
                              <div className={`text-${invoice.color}-400 text-sm font-semibold`}>{invoice.status}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.button
                        className="w-full mt-6 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl font-semibold hover:bg-cyan-500/20 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Download All Invoices
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Usage Analytics */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    className="mt-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Usage Analytics</h3>
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { label: 'API Calls', value: '2.4M', usage: '85%' },
                        { label: 'Data Storage', value: '1.2TB', usage: '60%' },
                        { label: 'Team Members', value: '47', usage: '94%' }
                      ].map((metric, index) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                          <div className="text-slate-300 text-sm mb-2">{metric.label}</div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: metric.usage }}
                              transition={{ delay: 1.0 + index * 0.2, duration: 1 }}
                            />
                          </div>
                          <div className="text-cyan-400 text-xs mt-1">{metric.usage} used</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        )

      default:
        return (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <motion.h2 
                className="text-5xl font-bold mb-6"
                style={{ color: design.color }}
              >
                {section.content}
              </motion.h2>
              <motion.p 
                className="text-xl text-secondary max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Discover our comprehensive {section.name.toLowerCase()} solutions designed for your success.
              </motion.p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 h-full"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        animate={{ width: `${((currentSection + 1) / design.sections.length) * 100}%` }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 left-0 h-1"
        style={{ background: `linear-gradient(90deg, ${design.color}, ${design.accent})` }}
      />
    </div>
  )
}

export default TryOurDesigns 