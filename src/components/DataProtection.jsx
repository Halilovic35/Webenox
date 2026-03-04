import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const DataProtection = () => {
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
              <span className="gradient-text">Privacy Policy</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary text-lg"
            >
              Data Protection According to GDPR
            </motion.p>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Controller Information */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">1. Controller Information</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Controller:</strong> Webenox GmbH</p>
                <p><strong className="text-text">Address:</strong> Musterstraße 123, 60313 Frankfurt am Main, Germany</p>
                <p><strong className="text-text">Phone:</strong> +49 (0) 69 123 456 78</p>
                <p><strong className="text-text">Email:</strong> info@webenox.de</p>
                <p><strong className="text-text">Website:</strong> www.webenox.de</p>
                <p><strong className="text-text">Managing Director:</strong> Halil [Last Name]</p>
              </div>
            </section>

            {/* Data Protection Officer */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">2. Data Protection Officer</h2>
              <div className="space-y-3 text-secondary">
                <p>We have appointed a data protection officer for our company:</p>
                <p><strong className="text-text">Name:</strong> [Data Protection Officer Name]</p>
                <p><strong className="text-text">Address:</strong> Musterstraße 123, 60313 Frankfurt am Main, Germany</p>
                <p><strong className="text-text">Phone:</strong> +49 (0) 69 123 456 78</p>
                <p><strong className="text-text">Email:</strong> datenschutz@webenox.de</p>
              </div>
            </section>

            {/* Data Collection and Processing */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">3. Data Collection and Processing</h2>
              <div className="space-y-4 text-secondary">
                <div>
                  <h3 className="text-lg font-semibold text-text mb-2">3.1 Server Log Files</h3>
                  <p>When you visit our website, the browser on your device automatically sends information to our website server. This information is temporarily stored in a so-called log file. The following information is recorded without your intervention and stored until automated deletion:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>IP address of the requesting computer</li>
                    <li>Date and time of access</li>
                    <li>Name and URL of the retrieved file</li>
                    <li>Website from which access is made (referrer URL)</li>
                    <li>Browser used and, if applicable, the operating system of your computer</li>
                    <li>Name of your access provider</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-text mb-2">3.2 Contact Form</h3>
                  <p>When you contact us via our contact form, we collect the following data:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name and email address</li>
                    <li>Company name (optional)</li>
                    <li>Project type and budget information</li>
                    <li>Message content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">4. Legal Basis for Data Processing</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Art. 6(1)(a) GDPR:</strong> Consent for contact form data</p>
                <p><strong className="text-text">Art. 6(1)(f) GDPR:</strong> Legitimate interest for server log files</p>
                <p><strong className="text-text">Art. 6(1)(b) GDPR:</strong> Contract performance for service provision</p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">5. Data Retention Periods</h2>
              <div className="space-y-3 text-secondary">
                <p><strong className="text-text">Server Log Files:</strong> 7 days</p>
                <p><strong className="text-text">Contact Form Data:</strong> Until the request is processed, maximum 2 years</p>
                <p><strong className="text-text">Contract Data:</strong> 10 years (legal retention period)</p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">6. Your Rights</h2>
              <div className="space-y-3 text-secondary">
                <p>According to the GDPR, you have the following rights:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li><strong className="text-text">Right of access</strong> (Art. 15 GDPR)</li>
                  <li><strong className="text-text">Right to rectification</strong> (Art. 16 GDPR)</li>
                  <li><strong className="text-text">Right to erasure</strong> (Art. 17 GDPR)</li>
                  <li><strong className="text-text">Right to restriction of processing</strong> (Art. 18 GDPR)</li>
                  <li><strong className="text-text">Right to data portability</strong> (Art. 20 GDPR)</li>
                  <li><strong className="text-text">Right to object</strong> (Art. 21 GDPR)</li>
                  <li><strong className="text-text">Right to withdraw consent</strong> (Art. 7(3) GDPR)</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us at: <a href="mailto:datenschutz@webenox.de" className="text-accent hover:underline">datenschutz@webenox.de</a></p>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">7. Cookies</h2>
              <div className="space-y-3 text-secondary">
                <p>Our website uses cookies to improve user experience. We use:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li><strong className="text-text">Essential cookies:</strong> Required for website functionality</li>
                  <li><strong className="text-text">Analytics cookies:</strong> To understand website usage (with consent)</li>
                </ul>
                <p>You can manage cookie preferences in your browser settings.</p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">8. Third-Party Services</h2>
              <div className="space-y-3 text-secondary">
                <p>We may use the following third-party services:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li><strong className="text-text">Google Analytics:</strong> Website analytics (with consent)</li>
                  <li><strong className="text-text">Email Services:</strong> For contact form processing</li>
                </ul>
                <p>All third-party services comply with GDPR requirements.</p>
              </div>
            </section>

            {/* Updates */}
            <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-accent mb-4">9. Updates to This Policy</h2>
              <div className="space-y-3 text-secondary">
                <p>We may update this privacy policy from time to time. The current version is always available on our website.</p>
                <p><strong className="text-text">Last updated:</strong> {new Date().toLocaleDateString('en-US')}</p>
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

export default DataProtection 