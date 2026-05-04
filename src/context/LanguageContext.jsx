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
    portfolio: 'Concepts',
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
    ourMission: "Our Mission",
    ourMissionText: "We build clean, modern digital experiences that help businesses grow and succeed in the digital world. Our passion for innovation drives everything we do.",
    ourApproach: "Our Approach",
    ourApproachText: "We combine cutting-edge technology with creative design to deliver solutions that not only look great but also perform exceptionally well.",
    whyChooseUs: "Why Choose Us",
    whyChooseUsText: "With years of experience and a passion for excellence, we deliver results that exceed expectations and drive real business growth.",
    ourVision: "Our Vision",
    ourVisionText: "To be the leading digital agency that transforms businesses through innovative technology and exceptional design.",
    ourImpact: "Our Impact",
    projectsCompleted: "Projects Completed",
    happyClients: "Happy Clients",
    yearsExperience: "Years Experience",
    
    // Services Section
    servicesSectionLead:
      "Websites, web and mobile apps, backends, APIs, and long-term care, built as full digital products with the right stack for each project.",
    coreServiceBadge: "Core service",
    webDevelopment: "Web & App Development",
    webDevelopmentDesc:
      "Custom websites and applications tailored to your business, from simple landing pages to complex web and mobile platforms.",
    webDevFeatures: [
      "Custom Web & Mobile Apps",
      "Scalable Backend Systems",
      "API Integrations & Automation",
      "Performance & SEO Optimization",
      "Responsive & Cross-Platform Design",
      "Database & Architecture Design"
    ],
    webDevelopmentTooltip:
      "End-to-end builds: we pick proven tools and patterns that fit your goals, timeline, and budget.",
    uiuxDesign: "UI/UX & Product Design",
    uiuxDesignDesc:
      "Clear, conversion-focused interfaces designed to feel intuitive, modern, and easy to use across every device. Built to reduce friction and guide users to action.",
    uiuxFeatures: [
      "User Flow Planning",
      "Wireframes & Prototypes",
      "Conversion-Focused Layouts",
      "Design Systems",
      "Responsive Interface Design",
      "Handoff-Ready UI"
    ],
    uiuxTooltip: "Product-minded design from structure to polished UI, ready for your team or ours to ship.",
    mobileApps: "Mobile Apps",
    mobileAppsDesc: "Native and cross-platform mobile applications for iOS and Android.",
    branding: "Brand Identity",
    brandingDesc:
      "Visual systems that make your business look professional, memorable, and consistent across every digital touchpoint. So every page and message feels unmistakably you.",
    brandingFeatures: [
      "Logo & Visual Identity",
      "Color & Typography Systems",
      "Brand Guidelines",
      "Social Media Assets",
      "Website Brand Direction",
      "Content Style Support"
    ],
    brandingTooltip: "Identity work that scales from pitch decks to your live site and campaigns.",
    maintenancePlans: "Care & Maintenance",
    maintenancePlansDesc:
      "Ongoing support, monitoring, and updates to keep your digital presence secure and performing well. A steady partnership after launch, without the hassle.",
    maintenanceFeatures: [
      "Website & App Updates",
      "Security Monitoring",
      "Performance Optimization",
      "Content Updates",
      "Bug Fixes & Improvements",
      "Long-Term Technical Support"
    ],
    maintenanceTooltip: "A steady partnership: we stay close after launch so your product keeps pace with your business.",
    
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
    portfolio: 'Konzepte',
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
    ourMission: "Unsere Mission",
    ourMissionText: "Wir bauen saubere, moderne digitale Erlebnisse, die Unternehmen dabei helfen, in der digitalen Welt zu wachsen und erfolgreich zu sein. Unsere Leidenschaft für Innovation treibt alles an, was wir tun.",
    ourApproach: "Unser Ansatz",
    ourApproachText: "Wir kombinieren modernste Technologie mit kreativem Design, um Lösungen zu liefern, die nicht nur großartig aussehen, sondern auch außergewöhnlich gut funktionieren.",
    whyChooseUs: "Warum uns wählen",
    whyChooseUsText: "Mit jahrelanger Erfahrung und Leidenschaft für Exzellenz liefern wir Ergebnisse, die Erwartungen übertreffen und echtes Geschäftswachstum fördern.",
    ourVision: "Unsere Vision",
    ourVisionText: "Die führende Digitalagentur zu sein, die Unternehmen durch innovative Technologie und außergewöhnliches Design transformiert.",
    ourImpact: "Unser Impact",
    projectsCompleted: "Abgeschlossene Projekte",
    happyClients: "Zufriedene Kunden",
    yearsExperience: "Jahre Erfahrung",
    
    // Services Section
    servicesSectionLead:
      "Websites, Web- und Mobile-Apps, Backends, APIs und langfristige Betreuung: wir liefern digitale Produkte end-to-end und wählen Stack und Vorgehen passend zu Zielen, Zeit und Budget.",
    coreServiceBadge: "Kernleistung",
    webDevelopment: "Web- & App-Entwicklung",
    webDevelopmentDesc:
      "Maßgeschneiderte Websites und Anwendungen für Ihr Unternehmen, von schlanken Landing Pages bis zu komplexen Web- und Mobile-Plattformen.",
    webDevFeatures: [
      "Individuelle Web- & Mobile-Apps",
      "Skalierbare Backend-Systeme",
      "API-Integrationen & Automatisierung",
      "Performance- & SEO-Optimierung",
      "Responsives & plattformübergreifendes Design",
      "Datenbank- & Architekturdesign"
    ],
    webDevelopmentTooltip:
      "End-to-end: bewährte Tools und Muster, die zu Zielen, Zeitplan und Budget passen.",
    uiuxDesign: "UI/UX & Produktdesign",
    uiuxDesignDesc:
      "Klare, konversionsstarke Oberflächen, die sich intuitiv, modern und auf jedem Gerät leicht bedienen lassen. Für weniger Reibung und klare nächste Schritte.",
    uiuxFeatures: [
      "Nutzerfluss-Planung",
      "Wireframes & Prototypen",
      "Konversionsstarke Layouts",
      "Design-Systeme",
      "Responsives Interface-Design",
      "Übergabefertiges UI"
    ],
    uiuxTooltip: "Produktorientiertes Design von der Struktur bis zum fertigen UI, bereit für Ihr Team oder unseres.",
    mobileApps: "Mobile Apps",
    mobileAppsDesc: "Native und plattformübergreifende mobile Anwendungen für iOS und Android.",
    branding: "Markenidentität",
    brandingDesc:
      "Visuelle Systeme, die Ihr Unternehmen professionell, wiedererkennbar und konsistent über alle digitalen Kontaktpunkte hinweg präsentieren. Damit alles aus einem Guss wirkt.",
    brandingFeatures: [
      "Logo & visuelle Identität",
      "Farb- & Typografie-Systeme",
      "Markenrichtlinien",
      "Social-Media-Assets",
      "Markenrichtung für die Website",
      "Unterstützung beim Content-Stil"
    ],
    brandingTooltip: "Identität, die von Pitchdeck bis Live-Site und Kampagnen skaliert.",
    maintenancePlans: "Betreuung & Wartung",
    maintenancePlansDesc:
      "Laufender Support, Monitoring und Updates, damit Ihre digitale Präsenz sicher bleibt und gut performt. Verlässlich nach dem Launch, ohne Stress.",
    maintenanceFeatures: [
      "Website- & App-Updates",
      "Sicherheits-Monitoring",
      "Performance-Optimierung",
      "Content-Updates",
      "Bugfixes & Verbesserungen",
      "Langfristiger technischer Support"
    ],
    maintenanceTooltip: "Partnerschaft nach Launch: wir bleiben dran, damit Ihr Produkt mit dem Business Schritt hält.",
    
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