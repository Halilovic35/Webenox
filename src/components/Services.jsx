import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const Services = () => {
  const { t } = useLanguage()
  const [activeTooltip, setActiveTooltip] = useState(null)

  const services = [
    {
      title: t('webDevelopment'),
      description: t('webDevelopmentDesc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: [
        "React & Next.js Development",
        "Custom API Integration",
        "Performance Optimization",
        "SEO Implementation",
        "Responsive Design",
        "Database Design"
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      tooltip: "Full-stack web development with modern frameworks and best practices"
    },
    {
      title: t('uiuxDesign'),
      description: t('uiuxDesignDesc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M5 7h6" />
        </svg>
      ),
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Visual Design Systems",
        "Interactive Prototypes",
        "Design Handoff",
        "Usability Optimization"
      ],
      gradient: "from-purple-500/20 to-pink-500/20",
      tooltip: "Complete design process from research to final implementation"
    },
    {
      title: t('branding'),
      description: t('brandingDesc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: [
        "Brand Identity Design",
        "Logo & Visual Assets",
        "Content Management",
        "Security Updates",
        "Performance Monitoring",
        "24/7 Support"
      ],
      gradient: "from-green-500/20 to-emerald-500/20",
      tooltip: "Comprehensive branding solutions for modern businesses"
    },
    {
      title: t('maintenancePlans'),
      description: t('maintenancePlansDesc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: [
        "Basic: Monthly Updates",
        "Plus: Weekly Monitoring",
        "Premium: Daily Support",
        "Security Patches",
        "Performance Optimization",
        "Content Updates"
      ],
      gradient: "from-orange-500/20 to-red-500/20",
      tooltip: "Flexible maintenance plans to suit your business needs"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple/6 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title luxury-heading">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-description">
            We offer comprehensive digital solutions to help your business thrive in the modern world.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative"
            >
              {/* Enhanced gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative glass-card p-8 equal-height card-hover ${service.gradient}`}>
                {/* Icon with tooltip - Consistent sizing and centering */}
                <div className="relative mb-8 text-center">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent/20 transition-all duration-300 cursor-help mx-auto"
                    onMouseEnter={() => setActiveTooltip(service.title)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Enhanced tooltip */}
                  {activeTooltip === service.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-background border border-accent/20 rounded-lg text-sm text-text whitespace-nowrap z-50 shadow-glow"
                    >
                      {service.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
                    </motion.div>
                  )}
                </div>

                {/* Title - Centered */}
                <h3 className="text-2xl font-bold text-text mb-4 group-hover:text-accent transition-colors duration-300 text-center">
                  {service.title}
                </h3>

                {/* Description - Centered */}
                <p className="paragraph mb-8 text-center flex-grow">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center text-sm text-secondary group-hover:text-white/80 transition-colors duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:bg-purple transition-colors duration-300 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Enhanced hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services 