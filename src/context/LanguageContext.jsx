import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    testimonials: 'Testimonials',
    contact: 'Contact',
    getStarted: 'Get Started',
    
    // Hero Section
    premiumDigitalAgency: 'Premium Digital Agency',
    typewriterTexts: [
      "We build clean, modern websites.",
      "We create exceptional web solutions.",
      "We transform ideas into reality.",
      "We craft beautiful digital experiences.",
      "We code with passion and precision.",
      "We design for the future."
    ],
    letsWorkTogether: "Let's Work Together",
    ourCoreServices: "Our core services",
    
    // About Section
    aboutSubtitle: "Who We Are",
    aboutHeadline: "Crafting Digital",
    aboutHeadlineAccent: "Excellence",
    aboutDescription: "We're a team of designers, developers, and strategists who transform ideas into exceptional digital experiences. Every project we take on is a partnership built on trust, creativity, and results.",
    howWeWork: "How We",
    howWeWorkAccent: "Work",
    processDiscover: "Discover",
    processDiscoverDesc: "We listen, research, and understand your goals, audience, and market to build a solid foundation.",
    processDesign: "Design",
    processDesignDesc: "We create beautiful, functional designs that capture your brand and engage your audience.",
    processDevelop: "Develop",
    processDevelopDesc: "We build with clean, modern code — fast, responsive, and optimized for performance.",
    processLaunch: "Launch",
    processLaunchDesc: "We deploy, test, and refine — then support you as your digital presence grows.",
    ourMission: "Our Mission",
    ourMissionText: "We build clean, modern digital experiences that help businesses grow and succeed in the digital world.",
    ourApproach: "Our Approach",
    ourApproachText: "We combine strategic thinking with creative execution to deliver solutions that perform exceptionally.",
    ourVision: "Our Vision",
    ourVisionText: "To lead in digital innovation, crafting experiences that anticipate tomorrow's possibilities.",
    ourImpact: "Our",
    ourImpactAccent: "Impact",
    projectsCompleted: "Projects Completed",
    happyClients: "Happy Clients",
    clientSatisfaction: "Client Satisfaction",
    
    // Services Section
    webDevelopment: "Web Development",
    webDevelopmentDesc: "Modern, responsive websites built with the latest technologies.",
    uiuxDesign: "UI/UX Design",
    uiuxDesignDesc: "Beautiful, intuitive interfaces that users love to interact with.",
    mobileApps: "Mobile Apps",
    mobileAppsDesc: "Native and cross-platform mobile applications for iOS and Android.",
    branding: "Branding",
    brandingDesc: "Complete brand identity design that tells your unique story.",
    maintenancePlans: "Maintenance Plans",
    maintenancePlansDesc: "Ongoing support and updates to keep your digital presence fresh.",
    
    // Portfolio Section
    portfolioTitle: "Bring Your",
    portfolioTitleAccent: "Ideas to Life",
    portfolioDescription: "Explore our design concepts across industries. Find the style that fits your business and let us build it for you.",
    viewDetails: "View Details",
    colorPalette: "Color Palette",
    includedSections: "Included Sections",
    keyFeatures: "Key Features",
    startProject: "Start This Project",
    portfolioCta: "Don't see your industry? Let's build something custom.",

    // Contact Section
    getInTouch: "Get in Touch",
    getInTouchText: "Ready to start your next project? Let's discuss how we can help bring your vision to life.",
    name: "Name",
    email: "Email",
    company: "Company",
    projectType: "Project Type",
    budget: "Budget",
    message: "Message",
    sendMessage: "Send Message",
    contactInfo: "Contact Information",
    address: "Frankfurt am Main, Germany",
    phone: "+49 (0) 69 123 456 78",
    emailContact: "info@webenox.de",
    
    // Footer
    weBuildText: "We build clean, modern digital experiences that help businesses grow and succeed in the digital world. Our passion for innovation drives everything we do.",
    quickLinks: "Quick Links",
    newsletter: "Newsletter",
    newsletterText: "Stay updated with our latest projects and insights.",
    emailPlaceholder: "your.email@example.com",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    connect: "Connect",
    allRightsReserved: "© 2024 Webenox GmbH. All rights reserved.",
    imprint: "Imprint",
    privacyPolicy: "Privacy Policy"
  },
  de: {
    // Navigation
    home: 'Startseite',
    about: 'Über uns',
    services: 'Dienstleistungen',
    portfolio: 'Portfolio',
    testimonials: 'Referenzen',
    contact: 'Kontakt',
    getStarted: 'Loslegen',
    
    // Hero Section
    premiumDigitalAgency: 'Premium Digitalagentur',
    typewriterTexts: [
      "Wir bauen saubere, moderne Websites.",
      "Wir erstellen außergewöhnliche Web-Lösungen.",
      "Wir verwandeln Ideen in Realität.",
      "Wir gestalten wunderschöne digitale Erlebnisse.",
      "Wir programmieren mit Leidenschaft und Präzision.",
      "Wir designen für die Zukunft."
    ],
    letsWorkTogether: "Lass uns zusammenarbeiten",
    ourCoreServices: "Unsere Kernleistungen",
    
    // About Section
    aboutSubtitle: "Wer wir sind",
    aboutHeadline: "Digitale",
    aboutHeadlineAccent: "Exzellenz",
    aboutDescription: "Wir sind ein Team aus Designern, Entwicklern und Strategen, die Ideen in außergewöhnliche digitale Erlebnisse verwandeln. Jedes Projekt ist eine Partnerschaft, die auf Vertrauen, Kreativität und Ergebnissen aufbaut.",
    howWeWork: "Wie wir",
    howWeWorkAccent: "arbeiten",
    processDiscover: "Entdecken",
    processDiscoverDesc: "Wir hören zu, recherchieren und verstehen Ihre Ziele, Zielgruppe und Markt, um ein solides Fundament zu schaffen.",
    processDesign: "Gestalten",
    processDesignDesc: "Wir erstellen schöne, funktionale Designs, die Ihre Marke einfangen und Ihr Publikum begeistern.",
    processDevelop: "Entwickeln",
    processDevelopDesc: "Wir programmieren mit sauberem, modernem Code — schnell, responsiv und leistungsoptimiert.",
    processLaunch: "Starten",
    processLaunchDesc: "Wir deployen, testen und verfeinern — dann begleiten wir Sie beim Wachstum Ihrer digitalen Präsenz.",
    ourMission: "Unsere Mission",
    ourMissionText: "Wir bauen saubere, moderne digitale Erlebnisse, die Unternehmen helfen, in der digitalen Welt zu wachsen.",
    ourApproach: "Unser Ansatz",
    ourApproachText: "Wir kombinieren strategisches Denken mit kreativer Umsetzung für Lösungen, die außergewöhnlich performen.",
    ourVision: "Unsere Vision",
    ourVisionText: "Die führende Digitalagentur zu sein, die Erlebnisse schafft, die die Möglichkeiten von morgen vorwegnehmen.",
    ourImpact: "Unser",
    ourImpactAccent: "Impact",
    projectsCompleted: "Abgeschlossene Projekte",
    happyClients: "Zufriedene Kunden",
    clientSatisfaction: "Kundenzufriedenheit",
    
    // Services Section
    webDevelopment: "Webentwicklung",
    webDevelopmentDesc: "Moderne, responsive Websites, gebaut mit den neuesten Technologien.",
    uiuxDesign: "UI/UX Design",
    uiuxDesignDesc: "Schöne, intuitive Benutzeroberflächen, mit denen Benutzer gerne interagieren.",
    mobileApps: "Mobile Apps",
    mobileAppsDesc: "Native und plattformübergreifende mobile Anwendungen für iOS und Android.",
    branding: "Branding",
    brandingDesc: "Komplettes Markenidentitätsdesign, das Ihre einzigartige Geschichte erzählt.",
    maintenancePlans: "Wartungspläne",
    maintenancePlansDesc: "Laufende Unterstützung und Updates, um Ihre digitale Präsenz frisch zu halten.",
    
    // Portfolio Section
    portfolioTitle: "Verwirklichen Sie Ihre",
    portfolioTitleAccent: "Ideen",
    portfolioDescription: "Entdecken Sie unsere Designkonzepte für verschiedene Branchen. Finden Sie den Stil, der zu Ihrem Unternehmen passt.",
    viewDetails: "Details ansehen",
    colorPalette: "Farbpalette",
    includedSections: "Enthaltene Sektionen",
    keyFeatures: "Hauptfunktionen",
    startProject: "Projekt starten",
    portfolioCta: "Ihre Branche nicht dabei? Wir erstellen etwas Individuelles.",

    // Contact Section
    getInTouch: "Kontakt aufnehmen",
    getInTouchText: "Bereit, Ihr nächstes Projekt zu starten? Lassen Sie uns besprechen, wie wir Ihnen dabei helfen können, Ihre Vision zum Leben zu erwecken.",
    name: "Name",
    email: "E-Mail",
    company: "Unternehmen",
    projectType: "Projekttyp",
    budget: "Budget",
    message: "Nachricht",
    sendMessage: "Nachricht senden",
    contactInfo: "Kontaktinformationen",
    address: "Frankfurt am Main, Deutschland",
    phone: "+49 (0) 69 123 456 78",
    emailContact: "info@webenox.de",
    
    // Footer
    weBuildText: "Wir bauen saubere, moderne digitale Erlebnisse, die Unternehmen dabei helfen, in der digitalen Welt zu wachsen und erfolgreich zu sein. Unsere Leidenschaft für Innovation treibt alles an, was wir tun.",
    quickLinks: "Schnelllinks",
    newsletter: "Newsletter",
    newsletterText: "Bleiben Sie auf dem Laufenden mit unseren neuesten Projekten und Erkenntnissen.",
    emailPlaceholder: "ihre.email@beispiel.de",
    subscribe: "Abonnieren",
    subscribing: "Abonniere...",
    connect: "Verbinden",
    allRightsReserved: "© 2024 Webenox GmbH. Alle Rechte vorbehalten.",
    imprint: "Impressum",
    privacyPolicy: "Datenschutz"
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage)
      localStorage.setItem('language', newLanguage)
    }
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  const value = {
    language,
    changeLanguage,
    t,
    translations: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
} 