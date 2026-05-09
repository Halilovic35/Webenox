import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { PortfolioConfigProvider } from './context/PortfolioConfigContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import TryOurDesigns from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import AdvancedAnimations from './components/AdvancedAnimations'
import Imprint from './components/Imprint'
import DataProtection from './components/DataProtection'

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="section-padding">
    <div className="container-custom">
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    </div>
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Router>
          <div className="App bg-background text-text min-h-screen">
            <AdvancedAnimations />
            <ScrollProgress />
            
            <Routes>
              <Route path="/" element={
                <PortfolioConfigProvider>
                  <Navigation />
                  <main className="home-content">
                    <Hero />
                    <About />
                    <Services />
                    <Suspense fallback={<SectionLoader />}>
                      <TryOurDesigns />
                    </Suspense>
                    <Contact />
                  </main>
                  <Footer />
                  <ScrollToTop />
                </PortfolioConfigProvider>
              } />
              
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/datenschutz" element={<DataProtection />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </LanguageProvider>
  )
}

export default App 