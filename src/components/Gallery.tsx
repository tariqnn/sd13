'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'

interface GalleryImage {
  id: string
  title_en: string
  title_ar: string
  description_en?: string
  description_ar?: string
  image_url: string
  is_active: boolean
  order: number
}

export default function Gallery() {
  const { language } = useLanguage()
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchGalleryImages()
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setGalleryImages(data.filter((image: GalleryImage) => image.is_active))
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Use fallback images if database is empty
  const displayImages = galleryImages.length > 0 ? galleryImages : [
    { id: 'fallback-1', title_en: 'Basketball Training', title_ar: 'تدريب كرة السلة', image_url: '/photos/gallery/DSC06058-2.jpg', is_active: true, order: 1 },
    { id: 'fallback-2', title_en: 'Athletic Training', title_ar: 'التدريب الرياضي', image_url: '/photos/gallery/DSC06065-2.jpg', is_active: true, order: 2 },
    { id: 'fallback-3', title_en: 'Youth Basketball', title_ar: 'كرة السلة للشباب', image_url: '/photos/gallery/DSC06080-2.jpg', is_active: true, order: 3 },
    { id: 'fallback-4', title_en: 'Skills Development', title_ar: 'تطوير المهارات', image_url: '/photos/gallery/DSC06154-2.jpg', is_active: true, order: 4 },
    { id: 'fallback-5', title_en: 'Team Training', title_ar: 'التدريب الجماعي', image_url: '/photos/gallery/DSC06176.jpg', is_active: true, order: 5 },
  ]

  const sectionContent = {
    en: {
      title: "Gallery",
      subtitle: "Training in Action",
      description: "See our athletes in action and experience the energy of SD13 Sports Academy.",
      viewAll: "View All Photos"
    },
    ar: {
      title: "المعرض",
      subtitle: "التدريب في العمل",
      description: "شاهد رياضيينا في العمل واختبر طاقة أكاديمية SD13 الرياضية.",
      viewAll: "عرض جميع الصور"
    }
  }

  const content = sectionContent[language]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-sliding effect - never pauses automatically
  useEffect(() => {
    if (isPaused || displayImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length)
    }, 5000) // Change slide every 5 seconds (slower for better performance)

    return () => clearInterval(interval)
  }, [isPaused, displayImages.length])

  const handlePhotoClick = () => {
    setIsPaused(true)
    setIsAutoPlaying(false)
  }

  const handleResume = () => {
    setIsPaused(false)
    setIsAutoPlaying(true)
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl lg:text-6xl'} font-black text-gray-900 ${isMobile ? 'mb-4' : 'mb-6'} ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-lg' : 'text-xl'} text-blue-600 font-semibold mb-4 ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {content.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-base px-4' : 'text-lg'} text-gray-600 max-w-3xl mx-auto ${isMobile ? 'mb-6' : 'mb-8'} ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {content.description}
          </motion.p>
        </motion.div>

        {/* Premium Photo Swiper */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        ) : displayImages.length === 0 ? (
          <div className="text-center py-12">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Gallery Images</h3>
            <p className="text-gray-600">Check back later for gallery photos.</p>
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            <div 
              className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 to-black"
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="aspect-[4/3] relative cursor-pointer"
                onClick={handlePhotoClick}
              >
                <img
                  src={displayImages[currentIndex].image_url}
                  alt={language === 'ar' ? displayImages[currentIndex].title_ar : displayImages[currentIndex].title_en}
                  className="w-full h-full object-contain"
                />
              
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
              {/* Photo counter */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/10">
                <span className="text-white text-sm font-semibold">
                  {currentIndex + 1} / {displayImages.length}
                </span>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={`absolute ${isMobile ? 'left-2' : 'left-4'} top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-lg hover:bg-black/50 text-white ${isMobile ? 'p-2' : 'p-3'} ${isMobile ? 'rounded-lg' : 'rounded-xl'} shadow-lg transition-all duration-300 ${isMobile ? '' : 'hover:scale-110'} hover:shadow-xl border border-white/20 hover:border-white/40 group ${isMobile ? 'mobile-pulse' : ''}`}
            >
              <ChevronLeft className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} group-hover:scale-110 transition-transform duration-300`} />
            </button>
            
            <button
              onClick={nextSlide}
              className={`absolute ${isMobile ? 'right-2' : 'right-4'} top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-lg hover:bg-black/50 text-white ${isMobile ? 'p-2' : 'p-3'} ${isMobile ? 'rounded-lg' : 'rounded-xl'} shadow-lg transition-all duration-300 ${isMobile ? '' : 'hover:scale-110'} hover:shadow-xl border border-white/20 hover:border-white/40 group ${isMobile ? 'mobile-pulse' : ''}`}
            >
              <ChevronRight className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} group-hover:scale-110 transition-transform duration-300`} />
            </button>

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {displayImages.slice(0, 8).map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex 
                      ? 'bg-white w-8 shadow-md' 
                      : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-lg rounded-lg px-3 py-1.5 border border-white/10">
              <div className="flex items-center space-x-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${!isPaused ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                <span className="text-white text-xs font-medium">
                  {!isPaused ? 'Auto' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Resume button - only shows when paused */}
            {isPaused && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleResume}
                className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-lg hover:bg-blue-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Resume Auto
              </motion.button>
            )}
          </div>

            {/* Thumbnail Navigation */}
          <div className={`flex justify-center ${isMobile ? 'mt-6' : 'mt-8'} ${isMobile ? 'space-x-2' : 'space-x-3'} overflow-x-auto pb-4 ${isMobile ? 'mobile-swipe-hint' : ''}`}>
            {displayImages.slice(0, 8).map((image, index) => (
              <motion.button
                key={image.id}
                onClick={() => goToSlide(index)}
                whileHover={isMobile ? {} : { scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} ${isMobile ? 'rounded-lg' : 'rounded-xl'} overflow-hidden transition-all duration-300 shadow-lg ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-400 scale-105 shadow-xl bg-blue-500/20' 
                    : 'opacity-70 hover:opacity-100 hover:shadow-xl hover:bg-white/10'
                } ${isMobile ? 'mobile-fade-in-scale' : ''}`}
              >
                <img
                  src={image.image_url}
                  alt={language === 'ar' ? image.title_ar : image.title_en}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                {/* Active indicator */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto border border-blue-400/30 backdrop-blur-lg hover:border-blue-300/50 relative overflow-hidden group"
              onClick={() => window.location.href = '/gallery'}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Eye className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">{content.viewAll}</span>
            </motion.button>
          </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}