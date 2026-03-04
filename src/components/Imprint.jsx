import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Imprint = () => {
  return (
    <div className="min-h-screen bg-background text-text pt-20">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-1 text-text mb-4"
            >
              <span className="gradient-text">Imprint</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary text-lg"
            >
              Legal Information According to German Law
            </motion.p>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Company Information */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">Company Information</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Company Name:</strong> Webenox GmbH</p>
                <p><strong className="text-text">Legal Form:</strong> Gesellschaft mit beschränkter Haftung (GmbH)</p>
                <p><strong className="text-text">Address:</strong> Musterstraße 123, 60313 Frankfurt am Main, Germany</p>
                <p><strong className="text-text">Phone:</strong> +49 (0) 69 123 456 78</p>
                <p><strong className="text-text">Email:</strong> info@webenox.de</p>
                <p><strong className="text-text">Website:</strong> www.webenox.de</p>
              </div>
            </section>

            {/* Management */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">Management</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Managing Director:</strong> Halil [Last Name]</p>
                <p><strong className="text-text">Commercial Register:</strong> Amtsgericht Frankfurt am Main</p>
                <p><strong className="text-text">Registration Number:</strong> HRB 123456</p>
                <p><strong className="text-text">VAT ID:</strong> DE123456789</p>
              </div>
            </section>

            {/* Professional Information */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">Professional Information</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Professional Title:</strong> Web Developer & Designer</p>
                <p><strong className="text-text">Issuing Authority:</strong> Germany</p>
                <p><strong className="text-text">Professional Regulations:</strong> None applicable</p>
                <p><strong className="text-text">Chamber:</strong> Not applicable</p>
              </div>
            </section>

            {/* Content Responsibility */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">Content Responsibility</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Responsible for Content:</strong> Halil [Last Name]</p>
                <p><strong className="text-text">Address:</strong> Musterstraße 123, 60313 Frankfurt am Main, Germany</p>
                <p><strong className="text-text">Email:</strong> info@webenox.de</p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">Dispute Resolution</h2>
              <div className="space-y-3 text-secondary">
                <p>The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a></p>
                <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
              </div>
            </section>

            {/* Copyright */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">Copyright</h2>
              <div className="space-y-3 text-secondary">
                <p>The contents and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.</p>
                <p>Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such.</p>
              </div>
            </section>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-purple text-background font-semibold rounded-lg hover:from-accent/90 hover:to-purple/90 transition-all duration-200 shadow-lg hover:shadow-glow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Imprint 