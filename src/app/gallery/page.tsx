'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { LanguageProvider } from '@/components/LanguageContext'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const galleryImages = [
  { id: 1, src: '/photos/gallery/DSC06058-2.jpg', alt: 'Basketball Training Session' },
  { id: 2, src: '/photos/gallery/DSC06065-2.jpg', alt: 'Athletic Training' },
  { id: 3, src: '/photos/gallery/DSC06080-2.jpg', alt: 'Youth Basketball Training' },
  { id: 4, src: '/photos/gallery/DSC06154-2.jpg', alt: 'Skills Development' },
  { id: 5, src: '/photos/gallery/DSC06176.jpg', alt: 'Team Training' },
  { id: 6, src: '/photos/gallery/DSC06261.jpg', alt: 'Basketball Practice' },
  { id: 7, src: '/photos/gallery/DSC06290.jpg', alt: 'High School Training' },
  { id: 8, src: '/photos/gallery/DSC06298.jpg', alt: 'Lady Hoopers Training' },
  { id: 9, src: '/photos/gallery/DSC06312.jpg', alt: 'Athletic Performance Training' },
  { id: 10, src: '/photos/gallery/IMG_3772.jpeg', alt: 'Leagues and Camps' },
  { id: 11, src: '/photos/gallery/IMG_4171.jpeg', alt: 'Court Reservations' },
  { id: 12, src: '/photos/gallery/IMG_7961.jpeg', alt: 'Birthday Parties' },
  { id: 13, src: '/photos/gallery/IMG_7964.jpeg', alt: 'Coach Training' },
  { id: 14, src: '/photos/gallery/IMG_7965.jpeg', alt: 'Youth Development' },
  { id: 15, src: '/photos/gallery/IMG_7968.jpeg', alt: 'Fitness Training' },
  { id: 16, src: '/photos/gallery/IMG_7969.jpeg', alt: 'Program Training' },
  { id: 17, src: '/photos/gallery/IMG_7970.jpeg', alt: 'Athletic Development' },
  { id: 18, src: '/photos/gallery/IMG_7971.jpeg', alt: 'Sports Academy' },
  { id: 19, src: '/photos/gallery/IMG_7972.jpeg', alt: 'Training Session' },
  { id: 20, src: '/photos/gallery/IMG_7973.jpeg', alt: 'Basketball Skills' },
  { id: 21, src: '/photos/gallery/IMG_7974.jpeg', alt: 'Team Building' },
  { id: 22, src: '/photos/gallery/IMG_7975.jpeg', alt: 'Youth Programs' },
  { id: 23, src: '/photos/gallery/IMG_7977.jpeg', alt: 'Elite Training' },
  { id: 24, src: '/photos/testimonials/IMG_8005.jpeg', alt: 'Customer Testimonial' },
  { id: 25, src: '/photos/testimonials/IMG_8006.jpeg', alt: 'Student Success' },
  { id: 26, src: '/photos/testimonials/IMG_8007.jpeg', alt: 'Alumni Achievement' },
  { id: 27, src: '/photos/testimonials/IMG_8008.jpeg', alt: 'Parent Testimonial' },
  { id: 28, src: '/photos/gallery/IMG_8009.jpeg', alt: 'Training Excellence' },
  { id: 29, src: '/photos/gallery/IMG_8010.jpeg', alt: 'Sports Development' },
  { id: 30, src: '/photos/gallery/IMG_8011.jpeg', alt: 'Athletic Achievement' },
  { id: 31, src: '/photos/gallery/IMG_8012.jpeg', alt: 'Basketball Academy' },
  { id: 32, src: '/photos/gallery/IMG_8013.jpeg', alt: 'SD13 Sports' },
]

function GalleryContent() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const sectionContent = {
    en: {
      title: "Photo Gallery",
      subtitle: "All Moments of Excellence",
      description: "Explore our complete collection of training sessions, competitions, and the amazing moments that make SD13 Academy special."
    },
    ar: {
      title: "معرض الصور",
      subtitle: "جميع لحظات التميز",
      description: "استكشف مجموعتنا الكاملة من جلسات التدريب والمنافسات واللحظات الرائعة التي تجعل أكاديمية SD13 مميزة."
    }
  }

  const content = sectionContent[language]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  return (
      <div className="min-h-screen bg-white">
        <Header alwaysVisible={true} />
        
        <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
            >
              {content.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-4"
            >
              {content.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-blue-200 max-w-3xl mx-auto"
            >
              {content.description}
            </motion.p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-square">
                      <ImagePlaceholder
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center"
                      >
                        <X className="w-6 h-6 text-gray-800" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              <ImagePlaceholder
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-white text-lg font-medium">
                {galleryImages[selectedImage].alt}
              </p>
              <p className="text-gray-300 text-sm">
                {selectedImage + 1} of {galleryImages.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      </div>
  )
}

export default function GalleryPage() {
  return (
    <LanguageProvider>
      <GalleryContent />
    </LanguageProvider>
  )
}
