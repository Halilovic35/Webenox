import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import AccentUnderline from './AccentUnderline'

/** Same shell for every contact tile: size, radius, stroke weight aligned. */
const ContactIconShell = ({ children }) => (
  <div
    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-purple text-background ring-1 ring-white/15 shadow-md shadow-black/25"
    aria-hidden
  >
    <span className="flex h-6 w-6 items-center justify-center [&>svg]:h-full [&>svg]:w-full">{children}</span>
  </div>
)

const contactTileClass =
  'group glass-card grid h-full min-h-[118px] grid-cols-[48px_1fr] items-center gap-x-4 gap-y-1 rounded-2xl border border-white/10 bg-background/50 p-4 transition-all duration-200 hover:border-accent/40 hover:bg-background/60 hover:shadow-[0_0_28px_rgba(0,201,255,0.18)]'

const Contact = () => {
  const { t } = useLanguage()
  const scrollViewport = { once: true, amount: 0.15, margin: '-50px' }

  return (
    <section id="site-contact" className="section-padding relative overflow-hidden">
      {/* Background: soft CTA glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-accent/4 rounded-full blur-[130px]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple/3 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-20 w-[400px] h-[400px] bg-accent/2 rounded-full blur-3xl" />
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
            Let&apos;s{' '}
            <AccentUnderline>
              <span className="gradient-text">Work Together</span>
            </AccentUnderline>
          </h2>
          <p className="section-description">
            Ready to transform your ideas into reality? Choose the contact option that works best for you. No long forms, just direct access to our team.
          </p>
        </motion.div>

        {/* Contact Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          viewport={scrollViewport}
          className="max-w-5xl mx-auto mt-10 glass-card bg-background/40 border border-white/10 backdrop-blur-xl p-8 lg:p-10 grid lg:grid-cols-[minmax(260px,1.05fr)_minmax(320px,1.35fr)] gap-10"
        >
          {/* Left: intro + quick response + note */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text mb-3">{t('getInTouch')}</h3>
              <p className="text-secondary leading-relaxed">
                {t('getInTouchText')}
              </p>
            </div>

            <div className="glass-card bg-background/60 border border-white/10 p-5">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Quick Response</span>
              </div>
              <p className="text-secondary text-sm">
                We typically reply within 24 hours on business days. Use the channel that feels most natural to you.
              </p>
            </div>

            <div className="text-xs text-slate-500/90">
              <p>
                No long forms, just direct ways to reach our team. Every message is read and answered by a real person.
              </p>
            </div>
          </div>

          {/* Right: contact methods grid */}
          <div className="space-y-5">
            <div className="grid auto-rows-fr sm:grid-cols-2 gap-4">
              {/* Email */}
              <a href="mailto:info@webenox.de" className={contactTileClass}>
                <ContactIconShell>
                  <svg fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </ContactIconShell>
                <div className="min-w-0">
                  <h4 className="font-semibold text-text text-sm mb-1">Email</h4>
                  <p className="text-secondary text-xs mb-1">Best for detailed briefs and RFPs.</p>
                  <p className="text-accent text-sm font-medium break-all">info@webenox.de</p>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a href="tel:+496912345678" className={contactTileClass}>
                <ContactIconShell>
                  <svg fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </ContactIconShell>
                <div className="min-w-0">
                  <h4 className="font-semibold text-text text-sm mb-1">Call / WhatsApp</h4>
                  <p className="text-secondary text-xs mb-1">For quick questions and time-sensitive projects.</p>
                  <p className="text-text text-sm font-medium">{t('phone')}</p>
                </div>
              </a>

              {/* Book a call */}
              <a
                href="mailto:info@webenox.de?subject=Intro%20call%20request"
                className={contactTileClass}
              >
                <ContactIconShell>
                  <svg fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </ContactIconShell>
                <div className="min-w-0">
                  <h4 className="font-semibold text-text text-sm mb-1">Book an Intro Call</h4>
                  <p className="text-secondary text-xs">
                    Choose a time that works for you. We&apos;ll confirm the slot by email.
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className={contactTileClass}>
                <ContactIconShell>
                  {/* Classic map pin: inner dot + teardrop (Heroicons-style), reads clearly at 24px */}
                  <svg fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </ContactIconShell>
                <div className="min-w-0">
                  <h4 className="font-semibold text-text text-sm mb-1">Location</h4>
                  <p className="text-secondary text-xs mb-1">{t('address')}</p>
                  <p className="text-secondary text-xs">Available for remote and on-site collaborations.</p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.18em] text-secondary mb-2">
                What happens after you reach out
              </p>
              <ol className="space-y-1 text-xs text-secondary">
                <li>1. We review your message and context.</li>
                <li>2. You receive a reply with clarifying questions or a link to book a call.</li>
                <li>3. If there&apos;s a fit, we prepare a tailored proposal for your project.</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
