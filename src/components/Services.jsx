import { motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import AccentUnderline from './AccentUnderline'

const Services = () => {
  const { t } = useLanguage()
  const [activeTooltip, setActiveTooltip] = useState(null)
  const [tooltipPos, setTooltipPos] = useState(null)

  const TOOLTIP_WIDTH = 260
  const TOOLTIP_MARGIN = 16
  /** Space between tooltip bottom and icon top (viewport px) */
  const TOOLTIP_GAP = 14

  const services = [
      {
        id: 'web-app',
        highlighted: true,
        title: t('webDevelopment'),
        description: t('webDevelopmentDesc'),
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        features: t('webDevFeatures'),
        gradient: 'from-blue-500/35 to-cyan-500/30',
        tooltip: t('webDevelopmentTooltip')
      },
      {
        id: 'product-design',
        title: t('uiuxDesign'),
        description: t('uiuxDesignDesc'),
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M5 7h6" />
          </svg>
        ),
        features: t('uiuxFeatures'),
        gradient: 'from-purple-500/20 to-pink-500/20',
        tooltip: t('uiuxTooltip')
      },
      {
        id: 'brand-identity',
        title: t('branding'),
        description: t('brandingDesc'),
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        features: t('brandingFeatures'),
        gradient: 'from-green-500/20 to-emerald-500/20',
        tooltip: t('brandingTooltip')
      },
      {
        id: 'care-maintenance',
        title: t('maintenancePlans'),
        description: t('maintenancePlansDesc'),
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        features: t('maintenanceFeatures'),
        gradient: 'from-orange-500/20 to-red-500/20',
        tooltip: t('maintenanceTooltip')
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.7, 0.2, 1]
      }
    }
  }

  const scrollViewport = { once: true, amount: 0.15, margin: '-50px' }

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background: soft orbs, blend seamlessly */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple/3 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-accent/3 rounded-full blur-[110px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-72 bg-gradient-to-r from-transparent via-purple/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          viewport={scrollViewport}
          className="section-header"
        >
          <h2 className="section-title luxury-heading">
            {t('sectionServicesOur')}{' '}
            <AccentUnderline>
              <span className="gradient-text">{t('sectionServicesServices')}</span>
            </AccentUnderline>
          </h2>
          <p className="section-description max-w-3xl mx-auto">{t('servicesSectionLead')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => {
            const featureList = Array.isArray(service.features) ? service.features : []

            return (
              <motion.div key={service.id} variants={cardVariants} className="group relative">
                <div
                  className={`absolute inset-0 rounded-3xl blur-xl transition-opacity duration-200 ${
                    service.highlighted
                      ? 'bg-gradient-to-br from-accent/35 via-cyan-500/25 to-purple-500/20 opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-br from-accent/20 to-purple/20 opacity-0 group-hover:opacity-100'
                  }`}
                />

                <div
                  className={`relative glass-card p-7 equal-height card-hover ${service.gradient} ${
                    service.highlighted
                      ? 'group-hover:ring-1 group-hover:ring-accent/40 group-hover:shadow-[0_0_40px_-12px_rgba(0,201,255,0.42)]'
                      : ''
                  }`}
                >
                  <div className="mb-6 flex justify-center">
                    <div
                      className={`relative mb-5 flex h-16 w-16 cursor-help items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-150 group-hover:bg-accent/20 ${
                        service.highlighted ? 'group-hover:ring-2 group-hover:ring-accent/35 group-hover:shadow-[0_0_22px_rgba(0,201,255,0.22)]' : ''
                      }`}
                      onMouseEnter={(e) => {
                        setActiveTooltip(service.title)
                        const rect = e.currentTarget.getBoundingClientRect()
                        const centerX = rect.left + rect.width / 2
                        const maxLeft = Math.max(TOOLTIP_MARGIN, window.innerWidth - TOOLTIP_WIDTH - TOOLTIP_MARGIN)
                        const left = Math.min(Math.max(centerX - TOOLTIP_WIDTH / 2, TOOLTIP_MARGIN), maxLeft)
                        const arrowLeft = Math.min(Math.max(centerX - left, 14), TOOLTIP_WIDTH - 14)
                        setTooltipPos({
                          left,
                          top: rect.top - TOOLTIP_GAP,
                          arrowLeft,
                          text: service.tooltip
                        })
                      }}
                      onMouseLeave={() => {
                        setActiveTooltip(null)
                        setTooltipPos(null)
                      }}
                    >
                      <div className="transition-transform duration-150 group-hover:scale-110 group-hover:rotate-[5deg]">
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-3 min-h-[3.25rem] text-center text-xl font-bold tracking-tight text-text transition-colors duration-150 group-hover:text-accent lg:text-2xl flex items-center justify-center">
                    {service.title}
                  </h3>

                  <p className="paragraph mb-5 min-h-[6.25rem] text-center text-balance">{service.description}</p>

                  <ul className="mx-auto w-full max-w-[16.5rem] space-y-2.5 text-left">
                    {featureList.map((feature, featureIndex) => (
                      <motion.li
                        key={`${service.id}-${featureIndex}`}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.08 + featureIndex * 0.05,
                          ease: [0.2, 0.7, 0.2, 1]
                        }}
                        viewport={scrollViewport}
                        className="flex items-start gap-2.5 text-sm leading-snug text-secondary transition-colors duration-150 group-hover:text-white/80"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent transition-all duration-150 group-hover:scale-125 group-hover:bg-purple" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-purple/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {typeof document !== 'undefined' &&
          activeTooltip &&
          tooltipPos?.text &&
          createPortal(
            <motion.div
              key={activeTooltip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'fixed',
                left: tooltipPos.left,
                top: tooltipPos.top,
                width: TOOLTIP_WIDTH,
                transform: 'translateY(calc(-100% - 4px))',
                zIndex: 10000
              }}
              className="pointer-events-none rounded-lg border border-accent/25 bg-background/95 px-4 py-2.5 text-left text-sm leading-snug text-text shadow-glow backdrop-blur-sm break-words"
            >
              {tooltipPos.text}
              <div
                style={{ left: tooltipPos.arrowLeft }}
                className="absolute top-full h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-background/95"
              />
            </motion.div>,
            document.body
          )}
      </div>
    </section>
  )
}

export default Services
