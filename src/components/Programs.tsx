'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { Clock, Users, Star, ArrowRight, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Program {
  id: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  features: string
  image_url?: string
  is_active: boolean
  order: number
}
import ImagePlaceholder from './ImagePlaceholder'

export default function Programs() {
  const { language } = useLanguage()
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchPrograms()
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs')
      const data = await response.json()
        setPrograms(data.filter((program: Program) => program.is_active))
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  const sectionContent = {
    en: {
      title: "Training Programs",
      subtitle: "Choose Your Path to Excellence",
      description: "Our comprehensive programs are designed to develop skills, build character, and create champions at every level."
    },
    ar: {
      title: "برامج التدريب",
      subtitle: "اختر طريقك نحو التميز",
      description: "برامجنا الشاملة مصممة لتطوير المهارات وبناء الشخصية وخلق الأبطال على كل المستويات."
    }
  }

  const content = sectionContent[language]

  if (loading) {
    return (
      <section id="programs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading programs...</p>
          </div>
        </div>
      </section>
    )
  }

  // Handle CTA button click
  const handleCTAClick = (program: Program) => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-bold text-gray-900 mb-4 ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-lg' : 'text-xl'} text-primary-600 font-semibold mb-4 ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {content.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-base px-4' : 'text-lg'} text-gray-600 max-w-3xl mx-auto ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {content.description}
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
          {programs.map((program, index) => {
            const features = JSON.parse(program.features || '[]')
            return (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.6 : 0.4, delay: index * (isMobile ? 0.1 : 0.05), type: isMobile ? "spring" : "easeOut", stiffness: isMobile ? 100 : undefined }}
              viewport={{ once: true }}
              whileHover={isMobile ? {} : { y: -5 }}
              className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg overflow-hidden ${isMobile ? 'hover:shadow-xl' : 'hover:shadow-xl'} transition-all duration-300 group ${isMobile ? 'mobile-fade-in-scale' : ''}`}
            >
              {/* Program Image */}
              <div className={`relative ${isMobile ? 'h-48' : 'h-64'} overflow-hidden`}>
                {program.image_url ? (
                  <img
                    src={program.image_url}
                    alt={language === 'ar' ? program.title_ar : program.title_en}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {language === 'ar' ? program.title_ar : program.title_en}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-blue-600 font-bold text-lg">
                      {language === 'ar' ? program.title_ar : program.title_en}
                    </div>
                  </div>
                </div>
              </div>

              {/* Program Content */}
              <div className={`${isMobile ? 'p-5' : 'p-8'}`}>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                      {language === 'ar' ? 'البرنامج' : 'Program'}
                    </span>
                  </div>
                  <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-3' : 'mb-4'} group-hover:text-blue-600 transition-colors duration-300`}>
                    {language === 'ar' ? program.title_ar : program.title_en}
                  </h3>
                  <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''} leading-relaxed`}>
                    {language === 'ar' ? program.description_ar : program.description_en}
                  </p>
                </div>

                {/* Program Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>All Ages</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Flexible Schedule</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'ar' ? 'المميزات:' : 'Features:'}
                  </h4>
                  <ul className="space-y-2">
                    {features.slice(0, 3).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCTAClick(program)}
                  className={`w-full ${isMobile ? 'py-3 px-4' : 'py-4 px-6'} ${isMobile ? 'rounded-lg' : 'rounded-xl'} font-semibold transition-all duration-300 flex items-center justify-center ${isMobile ? 'space-x-2' : 'space-x-2'} group shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white ${isMobile ? 'mobile-pulse' : ''}`}
                >
                  <span className={isMobile ? 'text-base' : 'text-lg'}>{language === 'ar' ? 'انضم الآن' : 'Join Now'}</span>
                  <ArrowRight className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover:translate-x-1 transition-transform duration-300`} />
                </motion.button>
              </div>
            </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
