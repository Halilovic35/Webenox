import { createContext, useContext, useState, useCallback } from 'react'
import { STYLES, INDUSTRIES } from '../data/portfolioData'

const PortfolioConfigContext = createContext(null)

export const usePortfolioConfig = () => {
  const ctx = useContext(PortfolioConfigContext)
  if (!ctx) {
    throw new Error('usePortfolioConfig must be used within PortfolioConfigProvider')
  }
  return ctx
}

export const PortfolioConfigProvider = ({ children }) => {
  const defaultIndustry = INDUSTRIES[0]
  const defaultStyle = STYLES.find(s => s.id === 'clinical-clean') || STYLES[0]

  const [selectedIndustryId, setSelectedIndustryId] = useState(defaultIndustry.id)
  const [selectedStyleId, setSelectedStyleId] = useState(defaultStyle.id)
  const [prefillData, setPrefillData] = useState(null)

  const selectedIndustry = INDUSTRIES.find(i => i.id === selectedIndustryId) || defaultIndustry
  const selectedStyle = STYLES.find(s => s.id === selectedStyleId) || defaultStyle

  const chooseConfiguration = useCallback(() => {
    const messageTemplate = `Hi, I'm interested in a ${selectedIndustry.name} website with the ${selectedStyle.name} design. I'd like to discuss: page count, my current site, and goals.`
    setPrefillData({
      selectedIndustry: selectedIndustry.name,
      selectedStyle: selectedStyle.name,
      message: messageTemplate
    })
    document.getElementById('site-contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedIndustry, selectedStyle])

  const clearPrefill = useCallback(() => {
    setPrefillData(null)
  }, [])

  const value = {
    selectedIndustryId,
    setSelectedIndustryId,
    selectedStyleId,
    setSelectedStyleId,
    selectedIndustry,
    selectedStyle,
    chooseConfiguration,
    prefillData,
    clearPrefill,
    industries: INDUSTRIES,
    styles: STYLES
  }

  return (
    <PortfolioConfigContext.Provider value={value}>
      {children}
    </PortfolioConfigContext.Provider>
  )
}
