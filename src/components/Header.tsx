'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, Search, User } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'Home', nameAr: 'الرئيسية', href: '/' },
  { name: 'Locations', nameAr: 'المواقع', href: '/#locations' },
  { name: 'Services', nameAr: 'الخدمات', href: '/#programs' },
  { name: 'Events', nameAr: 'الأحداث', href: '/#events' },
  { name: 'About Us', nameAr: 'من نحن', href: '/#about' },
  { name: 'Contact', nameAr: 'اتصل بنا', href: '/#contact' },
]

interface HeaderProps {
  alwaysVisible?: boolean
}

export default function Header({ alwaysVisible = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { language, setLanguage, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || alwaysVisible
          ? 'bg-[#282828]/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
                  <motion.div
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}
                    initial={isMobile ? { opacity: 0, x: -20 } : {}}
                    animate={isMobile ? { opacity: 1, x: 0 } : {}}
                    transition={isMobile ? { duration: 0.5 } : {}}
                  >
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <circle cx="20" cy="20" r="18" fill="#B8A16F" />
                        <path d="M 12 20 L 20 12 L 28 20 L 20 28 Z" fill="white" />
                        <circle cx="20" cy="20" r="4" fill="#B8A16F" />
                      </svg>
                    </div>
                    <span className={`${isMobile ? 'text-sm' : 'text-xl'} font-black uppercase tracking-tight ${scrolled || alwaysVisible ? 'text-white' : 'text-white'}`}>
                      {isMobile ? 'SD13' : 'SPORTS ACADEMY'}
                    </span>
                  </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    scrolled || alwaysVisible
                      ? 'text-white hover:text-[#B8A16F]' 
                      : 'text-white hover:text-[#B8A16F]'
                  }`}
                >
                  {language === 'ar' ? item.nameAr : item.name}
                </Link>
              </motion.div>
            ))}
            
             {/* Utility Icons */}
             <div className="flex items-center space-x-4">
               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="text-white hover:text-[#B8A16F] transition-colors duration-200"
               >
                 <Search className="w-5 h-5" />
               </motion.button>
               
               <motion.a
                 href="/admin-access"
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="text-white hover:text-[#B8A16F] transition-colors duration-200"
                 title="Admin Access"
               >
                 <User className="w-5 h-5" />
               </motion.a>
               
             </div>
            
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-[#B8A16F] transition-colors duration-200"
            >
              <Globe className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors duration-200 ${
                scrolled 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-white/20 text-white'
              }`}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors duration-200 ${
                scrolled 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-white/20 text-white'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden bg-white/95 backdrop-blur-md shadow-2xl rounded-xl mt-2 overflow-hidden border border-white/20"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: isMobile ? (index % 2 === 0 ? -30 : 30) : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
                  className={isMobile ? 'mobile-slide-in-left' : ''}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false)
                      if (isMobile) {
                        // Add mobile shake animation on click
                        const element = document.querySelector(`[href="${item.href}"]`)
                        if (element) {
                          element.classList.add('mobile-shake')
                          setTimeout(() => {
                            element.classList.remove('mobile-shake')
                          }, 500)
                        }
                      }
                    }}
                    className="block px-6 py-4 text-gray-700 hover:bg-[#B8A16F]/10 hover:text-[#B8A16F] transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0 active:bg-[#B8A16F]/20"
                  >
                    {language === 'ar' ? item.nameAr : item.name}
                  </Link>
                </motion.div>
              ))}
              {/* Mobile utility buttons */}
              <div className="flex items-center justify-center space-x-4 p-4 border-t border-gray-100">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-[#B8A16F] hover:text-white transition-colors duration-300"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <motion.a
                  href="/admin-access"
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-[#B8A16F] hover:text-white transition-colors duration-300"
                >
                  <User className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
