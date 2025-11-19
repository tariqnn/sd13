'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name_en: string
  name_ar: string
  text_en: string
  text_ar: string
  rating: number
  image_url?: string
  is_active: boolean
  order: number
}

export default function Testimonials() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sectionContent = {
    en: {
      title: "What Our Athletes Say",
      subtitle: "Success Stories",
      description: "Hear from the athletes and families who have experienced the SD13 difference."
    },
    ar: {
      title: "ماذا يقول رياضيونا",
      subtitle: "قصص النجاح",
      description: "استمع إلى الرياضيين والعائلات الذين اختبروا فرق SD13."
    }
  }

  const content = sectionContent[language]

  useEffect(() => {
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [testimonials])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.filter((testimonial: Testimonial) => testimonial.is_active))
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
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

        {/* Testimonials Carousel */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <Quote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Testimonials Available</h3>
            <p className="text-gray-600">Check back later for testimonials from our athletes.</p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-xl ${isMobile ? 'p-6' : 'p-8 md:p-12'} ${isMobile ? 'mobile-fade-in-scale' : ''}`}
            >
              <div className="text-center">
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Quote className="w-8 h-8 text-primary-600" />
                </motion.div>

                {/* Testimonial Content */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
                >
                  {`"${language === 'ar' ? testimonials[currentIndex].text_ar : testimonials[currentIndex].text_en}"`}
                </motion.blockquote>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center space-x-1 mb-6"
              >
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </motion.div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center space-x-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {(language === 'ar' ? testimonials[currentIndex].name_ar : testimonials[currentIndex].name_en).charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-900">
                    {language === 'ar' ? testimonials[currentIndex].name_ar : testimonials[currentIndex].name_en}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    Athlete
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={isMobile ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className={`absolute ${isMobile ? 'left-2' : 'left-4'} top-1/2 transform -translate-y-1/2 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors duration-300 ${isMobile ? 'mobile-pulse' : ''}`}
          >
            <ChevronLeft className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </motion.button>

          <motion.button
            whileHover={isMobile ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className={`absolute ${isMobile ? 'right-2' : 'right-4'} top-1/2 transform -translate-y-1/2 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors duration-300 ${isMobile ? 'mobile-pulse' : ''}`}
          >
            <ChevronRight className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          </div>
        )}
      </div>
    </section>
  )
}
