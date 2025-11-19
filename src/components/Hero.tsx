'use client'

import { motion, useAnimation } from 'framer-motion'
import { MapPin, ChevronUp } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import { useEffect, useState } from 'react'

interface HeroContent {
  id: string
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  descriptionEn: string
  descriptionAr: string
  videoUrl?: string
}

export default function Hero() {
  const { language } = useLanguage()
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    fetchHeroContent()
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Start animations immediately when component mounts
    setIsLoaded(true)
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  }, [controls])

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/hero')
      const data = await response.json()
      setHeroContent(data)
    } catch (error) {
      console.error('Error fetching hero content:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </section>
    )
  }

  if (!heroContent) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="text-center">
          <p className="text-white">No hero content available</p>
        </div>
      </section>
    )
  }

  const content = {
    tagline: language === 'ar' ? heroContent.subtitleAr : heroContent.subtitleEn,
    title: language === 'ar' ? heroContent.titleAr : heroContent.titleEn,
    subtitle: language === 'ar' ? heroContent.descriptionAr : heroContent.descriptionEn,
    cta: language === 'ar' ? "ابدأ رحلتك" : "Start Your Journey"
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Optimized Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            minHeight: '100vh',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          preload="metadata"
          poster="/photos/gallery/DSC06058-2.jpg"
        >
          <source src={heroContent?.videoUrl || "/videos/hero-video.mp4"} type="video/mp4" />
        </video>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Simplified spotlight effects */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0.1, scale: 1 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"
          />
        </div>
      </div>

      {/* Main Content - Immediate Animation */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto ${isMobile ? 'text-center' : 'text-left'}`}>
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 50 : 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 50 : 30 }}
            transition={{ duration: isMobile ? 0.8 : 0.6, ease: "easeOut" }}
            className={isMobile ? 'space-y-4' : 'space-y-6'}
          >
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-white ${isMobile ? 'text-base' : 'text-lg'} font-medium tracking-wide ${isMobile ? 'mobile-slide-up' : ''}`}
            >
              {content.tagline}
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: isMobile ? 40 : 30, scale: isMobile ? 0.95 : 1 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: isMobile ? 40 : 30, scale: isMobile ? 0.95 : 1 }}
              transition={{ duration: isMobile ? 0.8 : 0.7, delay: 0.2, type: isMobile ? "spring" : "easeOut", stiffness: isMobile ? 100 : undefined }}
              className={`${isMobile ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl lg:text-7xl'} font-black text-white leading-tight tracking-tight ${isMobile ? 'mobile-fade-in-scale' : ''}`}
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.02em'
              }}
            >
              {content.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`text-white ${isMobile ? 'text-base px-2' : 'text-lg sm:text-xl'} font-normal max-w-2xl ${isMobile ? 'mx-auto' : ''} leading-relaxed mb-6 ${isMobile ? 'mobile-slide-up' : ''}`}
            >
              {content.subtitle}
            </motion.p>

            {/* Additional Engaging Text */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${isMobile ? 'mb-6' : 'mb-8'} ${isMobile ? 'mobile-slide-up' : ''}`}
            >
              <div className={`flex flex-wrap items-center ${isMobile ? 'justify-center gap-3' : 'justify-center gap-6'} text-white/90`}>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={isMobile ? { opacity: 0, x: -20 } : {}}
                  animate={isMobile && isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={isMobile ? { delay: 0.5 } : {}}
                >
                  <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-[#B8A16F] rounded-full ${isMobile ? 'mobile-pulse' : ''}`}></div>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                    {language === 'ar' ? 'تدريب احترافي' : 'Professional Training'}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={isMobile ? { opacity: 0, x: 20 } : {}}
                  animate={isMobile && isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={isMobile ? { delay: 0.6 } : {}}
                >
                  <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-[#B8A16F] rounded-full ${isMobile ? 'mobile-pulse' : ''}`}></div>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                    {language === 'ar' ? 'مدربون خبراء' : 'Expert Coaches'}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={isMobile ? { opacity: 0, x: -20 } : {}}
                  animate={isMobile && isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={isMobile ? { delay: 0.7 } : {}}
                >
                  <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-[#B8A16F] rounded-full ${isMobile ? 'mobile-pulse' : ''}`}></div>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                    {language === 'ar' ? 'مرافق حديثة' : 'Modern Facilities'}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`grid grid-cols-3 ${isMobile ? 'gap-4' : 'gap-8'} ${isMobile ? 'mb-6' : 'mb-8'} max-w-md mx-auto ${isMobile ? 'mobile-fade-in-scale' : ''}`}
            >
              {[
                { value: '500+', label: language === 'ar' ? 'طلاب' : 'Students' },
                { value: '15+', label: language === 'ar' ? 'سنوات خبرة' : 'Years Experience' },
                { value: '10+', label: language === 'ar' ? 'برامج' : 'Programs' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={isMobile ? { opacity: 0, scale: 0.8 } : {}}
                  animate={isMobile && isLoaded ? { opacity: 1, scale: 1 } : {}}
                  transition={isMobile ? { delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 } : {}}
                  whileHover={isMobile ? { scale: 1.1 } : {}}
                >
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-[#B8A16F] mb-1 ${isMobile ? 'mobile-bounce' : ''}`}>{stat.value}</div>
                  <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/80 uppercase tracking-wide`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`pt-4 ${isMobile ? 'flex flex-col space-y-3' : ''} ${isMobile ? 'mobile-slide-up' : ''}`}
            >
              <motion.button
                whileHover={isMobile ? {} : {
                  scale: 1.03,
                  y: -2,
                  boxShadow: "0 15px 30px rgba(184, 161, 111, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`bg-[#B8A16F] hover:bg-[#A6915F] text-white ${isMobile ? 'px-6 py-3 w-full' : 'px-8 py-4'} rounded-xl font-semibold ${isMobile ? 'text-base' : 'text-lg'} transition-all duration-300 flex items-center justify-center ${isMobile ? 'space-x-2' : 'space-x-3'} group shadow-xl hover:shadow-2xl ${isMobile ? 'mobile-pulse' : ''}`}
              >
                <MapPin className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover:scale-110 transition-transform duration-300`} />
                <span>{content.cta}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-white rounded-full`}
                ></motion.div>
              </motion.button>
              
              {/* Secondary CTA */}
              <motion.button
                initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const programsSection = document.getElementById('programs')
                  if (programsSection) {
                    programsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`${isMobile ? 'w-full' : 'ml-4'} bg-transparent border-2 border-white/30 hover:border-white text-white ${isMobile ? 'px-6 py-3' : 'px-6 py-3'} rounded-xl font-semibold ${isMobile ? 'text-sm' : 'text-base'} transition-all duration-300 hover:bg-white/10 backdrop-blur-sm`}
              >
                {language === 'ar' ? 'استكشف البرامج' : 'Explore Programs'}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        whileHover={isMobile ? {} : { scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'} bg-[#B8A16F] hover:bg-[#A6915F] text-white ${isMobile ? 'p-2.5' : 'p-3'} rounded-lg shadow-lg transition-all duration-300 z-50 ${isMobile ? 'mobile-bounce' : ''}`}
      >
        <ChevronUp className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
      </motion.button>
    </section>
  )
}
