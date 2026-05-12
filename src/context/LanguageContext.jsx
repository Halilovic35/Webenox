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
    phone: "+49 173 416 0361",
    emailContact: "info@webenox.de",
    
    // Footer
    weBuildText: "We build clean, modern digital experiences that help businesses grow and succeed in the digital world. Our passion for innovation drives everything we do.",
    quickLinks: "Quick Links",
    newsletter: "Newsletter",
    newsletterText: "Project updates and insights. Email sign-up is not available yet.",
    newsletterComingSoon: "Coming soon",
    emailPlaceholder: "your.email@example.com",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    connect: "Connect",
    footerSocialSoonHint: "Instagram and LinkedIn will be linked here soon.",
    footerSocialSoonOk: "Got it",
    footerSocialSoonBackdrop: "Close",
    allRightsReserved: "© 2026 Webenox. All rights reserved.",
    imprint: "Impressum",
    privacyPolicy: "Privacy Policy",

    // Contact page (hardcoded strings moved here)
    contactPageTitleLets: "Let's",
    contactPageTitleWork: "Work Together",
    contactPageLead:
      "Ready to transform your ideas into reality? Choose the contact option that works best for you. No long forms, just direct access to our team.",
    contactQuickResponseTitle: "Quick Response",
    contactQuickResponseBody:
      "We typically reply within 24 hours on business days. Use the channel that feels most natural to you.",
    contactHubFootnote:
      "No long forms, just direct ways to reach our team. Every message is read and answered by a real person.",
    contactLabelEmail: "Email",
    contactHintEmail: "Best for detailed briefs and RFPs.",
    contactLabelPhone: "Call / WhatsApp",
    contactHintPhone: "For quick questions and time-sensitive projects.",
    contactLabelBookCall: "Book an Intro Call",
    contactHintBookCall: "Choose a time that works for you. We'll confirm the slot by email.",
    contactLabelLocation: "Location",
    contactHintLocation: "Available for remote and on-site collaborations.",
    contactFlowTitle: "What happens after you reach out",
    contactFlowStep1: "1. We review your message and context.",
    contactFlowStep2: "2. You receive a reply with clarifying questions or a link to book a call.",
    contactFlowStep3: "3. If there's a fit, we prepare a tailored proposal for your project.",
    contactMailSubjectIntro: "Intro call request",

    // Hero service chips
    heroServiceChips: ["Web Development", "UI/UX Design", "Mobile Apps", "Branding", "SEO"],

    // Services section title split
    sectionServicesOur: "Our",
    sectionServicesServices: "Services",

    // Portfolio / concepts section
    portfolioTitleBring: "Bring Your",
    portfolioTitleIdeas: "Ideas to Life",
    portfolioLead1:
      "Choose an industry and explore a design concept. These previews are just starting points, every project we build is fully custom, tailored to your business, your goals, and your users.",
    portfolioLead2:
      "From websites to web apps and mobile applications, we design and build exactly what you need.",
    portfolioTabWebsite: "Website",
    portfolioTabApp: "App",
    portfolioTabHint:
      "Explore websites or interactive app concepts. These are just starting points, every project is fully custom.",
    portfolioStep1Industry: "1. Select Industry",
    portfolioStep2Style: "2. Select Style",
    portfolioWebsiteConceptLabel: "Your Website Concept",
    portfolioPreviewPrefix: "Preview:",
    portfolioStartWebsiteCta: "Start My Website",
    portfolioCustomizeNote: "We'll customize this design for your brand, content, and goals.",
    portfolioAriaBack: "Back",
    portfolioAriaForward: "Forward",
    portfolioAriaReload: "Reload",

    // About section (extra copy not covered elsewhere)
    aboutTaglineLine1: "Crafting Digital",
    aboutTaglineLine2: "Excellence",
    aboutTaglineLead:
      "We're passionate digital craftsmen building exceptional web experiences that make a difference. Every project is a journey of discovery, design, development, and launch.",
    aboutCtaPortfolio: "View Our Work",
    aboutCtaContact: "Get in Touch",
    aboutProcessOur: "Our",
    aboutProcessProcess: "Process",
    aboutStepDiscoverTitle: "Discover",
    aboutStepDiscoverDesc:
      "We dive deep into your vision, goals, and challenges to understand what matters most.",
    aboutStepDesignTitle: "Design",
    aboutStepDesignDesc: "Beautiful, functional solutions crafted to exceed expectations and delight users.",
    aboutStepDevelopTitle: "Develop",
    aboutStepDevelopDesc: "Clean code, modern tech stack, and precision execution bring designs to life.",
    aboutStepLaunchTitle: "Launch",
    aboutStepLaunchDesc: "Smooth deployment, testing, and ongoing support ensure success from day one.",
    aboutMvMissionTitle: "Our Mission",
    aboutMvMissionDesc:
      "We create clean, modern digital experiences that help businesses grow and succeed.",
    aboutMvVisionTitle: "Our Vision",
    aboutMvVisionDesc:
      "To lead in digital innovation, crafting experiences that anticipate tomorrow's possibilities.",
    aboutMvApproachTitle: "Our Approach",
    aboutMvApproachDesc:
      "Strategic thinking meets creative execution: solutions that look great and perform exceptionally.",

    // Testimonials
    testimonialTitleWhat: "What Our",
    testimonialTitleClientsSay: "Clients Say",
    testimonialSectionLead:
      "Don't just take our word for it. Here's what our clients have to say about working with us.",
    statClientSatisfaction: "Client Satisfaction",
    statProjectsCompleted: "Projects Completed",
    statHappyClients: "Happy Clients",
    statSupportAvailable: "Support Available",
    testimonialVideoBadge: "Video Testimonial",
    testimonialProjectLabel: "Project",
    testimonialDurationLabel: "Duration",
    testimonialJoinCta: "Join Our Happy Clients",
    testimonialsItems: [
      {
        name: "Mark Johnson",
        position: "Owner",
        company: "Pizza Palace",
        text: "Webenox created an amazing website for our restaurant! The online ordering system works perfectly and our customers love the easy-to-use interface. Sales increased by 200% in the first month!",
        project: "Restaurant Website",
        duration: "3 weeks"
      },
      {
        name: "Sarah Chen",
        position: "Founder",
        company: "TechStart",
        text: "Working with Webenox was fantastic! They delivered our landing page on time and the design exceeded our expectations. The conversion rate optimization really helped us get more customers.",
        project: "Startup Landing Page",
        duration: "2 weeks"
      },
      {
        name: "David Rodriguez",
        position: "CEO",
        company: "FashionStore",
        text: "Webenox built our e-commerce platform from scratch. The team was professional, responsive, and delivered exactly what we needed. Our online sales have never been better!",
        project: "E-Commerce Platform",
        duration: "6 weeks"
      },
      {
        name: "Emma Wilson",
        position: "Marketing Director",
        company: "BusinessCorp",
        text: "The corporate website Webenox created for us is modern, professional, and perfectly represents our brand. The SEO optimization has significantly improved our online visibility.",
        project: "Corporate Website",
        duration: "5 weeks"
      }
    ]
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
    phone: "+49 173 416 0361",
    emailContact: "info@webenox.de",
    
    // Footer
    weBuildText: "Wir bauen saubere, moderne digitale Erlebnisse, die Unternehmen dabei helfen, in der digitalen Welt zu wachsen und erfolgreich zu sein. Unsere Leidenschaft für Innovation treibt alles an, was wir tun.",
    quickLinks: "Schnelllinks",
    newsletter: "Newsletter",
    newsletterText: "Updates und Einblicke. E-Mail-Anmeldung folgt in Kürze.",
    newsletterComingSoon: "Demnächst",
    emailPlaceholder: "ihre.email@beispiel.de",
    subscribe: "Abonnieren",
    subscribing: "Abonniere...",
    connect: "Verbinden",
    footerSocialSoonHint: "Instagram und LinkedIn werden hier bald verlinkt.",
    footerSocialSoonOk: "Alles klar",
    footerSocialSoonBackdrop: "Schließen",
    allRightsReserved: "© 2026 Webenox. Alle Rechte vorbehalten.",
    imprint: "Impressum",
    privacyPolicy: "Datenschutz",

    contactPageTitleLets: "Lass uns",
    contactPageTitleWork: "zusammenarbeiten",
    contactPageLead:
      "Bereit, Ihre Ideen in die Realität umzusetzen? Wählen Sie den Kontaktweg, der für Sie passt. Keine langen Formulare, direkter Draht zu unserem Team.",
    contactQuickResponseTitle: "Schnelle Antwort",
    contactQuickResponseBody:
      "In der Regel melden wir uns innerhalb von 24 Stunden an Werktagen. Nutzen Sie den Kanal, der sich für Sie am natürlichsten anfühlt.",
    contactHubFootnote:
      "Keine langen Formulare, nur direkte Wege zu unserem Team. Jede Nachricht wird von einer echten Person gelesen und beantwortet.",
    contactLabelEmail: "E-Mail",
    contactHintEmail: "Ideal für ausführliche Briefings und Anfragen.",
    contactLabelPhone: "Anruf / WhatsApp",
    contactHintPhone: "Für kurze Fragen und zeitkritische Projekte.",
    contactLabelBookCall: "Intro-Call buchen",
    contactHintBookCall: "Wählen Sie einen passenden Termin. Wir bestätigen den Slot per E-Mail.",
    contactLabelLocation: "Standort",
    contactHintLocation: "Remote und vor Ort, je nach Projekt und Bedarf.",
    contactFlowTitle: "So geht es nach Ihrer Nachricht weiter",
    contactFlowStep1: "1. Wir lesen Ihre Nachricht und den Kontext.",
    contactFlowStep2: "2. Sie erhalten eine Antwort mit Rückfragen oder einem Link zur Terminbuchung.",
    contactFlowStep3: "3. Passt es für beide Seiten, erstellen wir ein passendes Angebot für Ihr Projekt.",
    contactMailSubjectIntro: "Anfrage Intro-Call",

    heroServiceChips: ["Webentwicklung", "UI/UX-Design", "Mobile Apps", "Branding", "SEO"],

    sectionServicesOur: "Unsere",
    sectionServicesServices: "Leistungen",

    portfolioTitleBring: "Bringen Sie Ihre",
    portfolioTitleIdeas: "Ideen zum Leben",
    portfolioLead1:
      "Wählen Sie eine Branche und entdecken Sie ein Designkonzept. Die Vorschauen sind nur Ausgangspunkte. Jedes Projekt ist vollständig individuell, abgestimmt auf Ihr Business, Ihre Ziele und Ihre Nutzer.",
    portfolioLead2:
      "Von Websites über Web-Apps bis zu mobilen Anwendungen: wir konzipieren und entwickeln genau das, was Sie brauchen.",
    portfolioTabWebsite: "Website",
    portfolioTabApp: "App",
    portfolioTabHint:
      "Entdecken Sie Website- oder App-Konzepte. Das sind Startpunkte. Jedes Projekt ist vollständig maßgeschneidert.",
    portfolioStep1Industry: "1. Branche wählen",
    portfolioStep2Style: "2. Stil wählen",
    portfolioWebsiteConceptLabel: "Ihr Website-Konzept",
    portfolioPreviewPrefix: "Vorschau:",
    portfolioStartWebsiteCta: "Website starten",
    portfolioCustomizeNote:
      "Wir passen dieses Design an Ihre Marke, Inhalte und Ziele an.",
    portfolioAriaBack: "Zurück",
    portfolioAriaForward: "Vor",
    portfolioAriaReload: "Neu laden",

    aboutTaglineLine1: "Digitale",
    aboutTaglineLine2: "Exzellenz",
    aboutTaglineLead:
      "Wir sind leidenschaftliche Digital-Craftspeople und bauen herausragende Web-Erlebnisse mit Wirkung. Jedes Projekt ist eine Reise aus Discovery, Design, Development und Launch.",
    aboutCtaPortfolio: "Unsere Arbeit ansehen",
    aboutCtaContact: "Kontakt aufnehmen",
    aboutProcessOur: "Unser",
    aboutProcessProcess: "Prozess",
    aboutStepDiscoverTitle: "Entdecken",
    aboutStepDiscoverDesc:
      "Wir vertiefen Vision, Ziele und Herausforderungen, damit wir das Wesentliche treffen.",
    aboutStepDesignTitle: "Design",
    aboutStepDesignDesc: "Funktionale, ästhetische Lösungen, entwickelt, um Erwartungen zu übertreffen.",
    aboutStepDevelopTitle: "Entwicklung",
    aboutStepDevelopDesc: "Sauberer Code, moderner Stack und präzise Umsetzung bringen Designs live.",
    aboutStepLaunchTitle: "Go-Live",
    aboutStepLaunchDesc: "Deployment, Tests und Support, damit es von Tag eins stabil läuft.",
    aboutMvMissionTitle: "Unsere Mission",
    aboutMvMissionDesc:
      "Wir schaffen klare, moderne digitale Erlebnisse, die Unternehmen beim Wachsen unterstützen.",
    aboutMvVisionTitle: "Unsere Vision",
    aboutMvVisionDesc:
      "Voran in digitaler Innovation: Erlebnisse, die die Möglichkeiten von morgen schon heute denkbar machen.",
    aboutMvApproachTitle: "Unser Ansatz",
    aboutMvApproachDesc:
      "Strategie trifft Umsetzung: Lösungen, die stark aussehen und technisch überzeugen.",

    testimonialTitleWhat: "Was Kunden",
    testimonialTitleClientsSay: "sagen",
    testimonialSectionLead:
      "Nicht nur unser Wort. Lesen Sie, was Kunden über die Zusammenarbeit mit uns sagen.",
    statClientSatisfaction: "Kundenzufriedenheit",
    statProjectsCompleted: "Abgeschlossene Projekte",
    statHappyClients: "Zufriedene Kunden",
    statSupportAvailable: "Support verfügbar",
    testimonialVideoBadge: "Video-Testimonial",
    testimonialProjectLabel: "Projekt",
    testimonialDurationLabel: "Dauer",
    testimonialJoinCta: "Zusammenarbeit starten",
    testimonialsItems: [
      {
        name: "Mark Johnson",
        position: "Inhaber",
        company: "Pizza Palace",
        text: "Webenox hat eine großartige Website für unser Restaurant gebaut! Bestellungen laufen reibungslos, Gäste finden sich sofort zurecht, der Umsatz stieg im ersten Monat um 200 %.",
        project: "Restaurant-Website",
        duration: "3 Wochen"
      },
      {
        name: "Sarah Chen",
        position: "Gründerin",
        company: "TechStart",
        text: "Die Zusammenarbeit mit Webenox war top: Landingpage pünktlich, Design über den Erwartungen, CRO hat uns spürbar mehr Anfragen gebracht.",
        project: "Startup-Landingpage",
        duration: "2 Wochen"
      },
      {
        name: "David Rodriguez",
        position: "CEO",
        company: "FashionStore",
        text: "Webenox hat unsere E-Commerce-Plattform von Grund auf umgesetzt: professionell, schnell in der Kommunikation, genau das, was wir brauchten.",
        project: "E-Commerce-Plattform",
        duration: "6 Wochen"
      },
      {
        name: "Emma Wilson",
        position: "Marketing Director",
        company: "BusinessCorp",
        text: "Unsere neue Corporate-Site ist modern, seriös und trägt die Marke perfekt, SEO hat unsere Sichtbarkeit deutlich verbessert.",
        project: "Corporate Website",
        duration: "5 Wochen"
      }
    ]
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
    const value = translations[language][key]
    return value !== undefined && value !== null ? value : key
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