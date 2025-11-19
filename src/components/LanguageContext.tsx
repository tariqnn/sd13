'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('sd13-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    setIsRTL(language === 'ar')
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en'
    localStorage.setItem('sd13-language', language)
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

