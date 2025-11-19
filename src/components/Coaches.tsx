'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { Award, Instagram, Twitter, Linkedin, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

interface Coach {
  id: string
  name_en: string
  name_ar: string
  title_en: string
  title_ar: string
  bio_en: string
  bio_ar: string
  experience: number
  specialties: string
  image_url?: string
  is_active: boolean
  order: number
}

export default function Coaches() {
  const { language } = useLanguage()
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchCoaches()
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchCoaches = async () => {
    try {
      const response = await fetch('/api/coaches')
      if (response.ok) {
        const data = await response.json()
        setCoaches(data.filter((coach: Coach) => coach.is_active))
      }
    } catch (error) {
      console.error('Error fetching coaches:', error)
    } finally {
      setLoading(false)
    }
  }

  const sectionContent = {
    en: {
      title: "Meet Our Coaches",
      subtitle: "Elite Coaching Staff",
      description: "Our world-class coaching team brings decades of experience and championship-winning expertise to develop the next generation of basketball stars."
    },
    ar: {
      title: "تعرف على مدربينا",
      subtitle: "طاقم التدريب النخبة",
      description: "فريق التدريب عالمي المستوى يجلب عقود من الخبرة وخبرة الفوز بالبطولات لتطوير الجيل القادم من نجوم كرة السلة."
    }
  }

  const content = sectionContent[language]

  return (
    <section id="coaches" className="py-20 bg-white">
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
            initial={{ opacity: 0, y: 20 }}
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

        {/* Coaches Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading coaches...</p>
          </div>
        ) : coaches.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Coaches Available</h3>
            <p className="text-gray-600">Check back later for our coaching staff information.</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
            {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: isMobile ? 40 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.7 : 0.6, delay: index * (isMobile ? 0.15 : 0.1), type: isMobile ? "spring" : "easeOut", stiffness: isMobile ? 100 : undefined }}
              viewport={{ once: true }}
              whileHover={isMobile ? {} : { y: -10 }}
              className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${isMobile ? 'mobile-fade-in-scale' : ''}`}
            >
              {/* Coach Image */}
              <div className={`relative ${isMobile ? 'h-56' : 'h-64'} overflow-hidden`}>
                {coach.image_url ? (
                  <img
                    src={coach.image_url}
                    alt={language === 'ar' ? coach.name_ar : coach.name_en}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face&auto=format&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    alt={language === 'ar' ? coach.name_ar : coach.name_en}
                    width={600}
                    height={400}
                    className="w-full h-full"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-blue-600 text-sm font-bold">
                      {coach.experience} years experience
                    </div>
                  </div>
                </div>
              </div>

              {/* Coach Content */}
              <div className={`${isMobile ? 'p-5' : 'p-6'}`}>
                <motion.h3
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-2' : 'mb-2'} group-hover:text-primary-600 transition-colors duration-300`}
                >
                  {language === 'ar' ? coach.name_ar : coach.name_en}
                </motion.h3>
                
                <p className="text-primary-600 font-semibold mb-3">
                  {language === 'ar' ? coach.title_ar : coach.title_en}
                </p>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {language === 'ar' ? coach.bio_ar : coach.bio_en}
                </p>

                {/* Specialization */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    {language === 'ar' ? 'التخصص:' : 'Specialization:'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {coach.specialties}
                  </p>
                </div>

                {/* Experience Badge */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{coach.experience} years experience</span>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {language === 'ar' ? 'تعرف على المزيد' : 'Learn More About Our Team'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
