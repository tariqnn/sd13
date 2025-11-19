'use client'

import { motion } from 'framer-motion'
import { Star, X } from 'lucide-react'
import { useLanguage } from './LanguageContext'

const partnersContent = {
  en: {
    title: "TRUSTED BY THE BEST IN SPORTS:",
    review: {
      name: "SD13 Sports Academy",
      rating: "4.8",
      reviews: "366 reviews"
    }
  },
  ar: {
    title: "موثوق من قبل الأفضل في الرياضة:",
    review: {
      name: "أكاديمية SD13 الرياضية",
      rating: "4.8",
      reviews: "366 تقييم"
    }
  }
}

// Sports league logos as SVG components
const Logos = {
  MLB: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <rect x="10" y="15" width="80" height="10" rx="2"/>
      <circle cx="20" cy="20" r="3" fill="#1a1a1a"/>
      <path d="M25 15 L30 25 L35 15" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
    </svg>
  ),
  NFL: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <path d="M20 10 L80 10 L75 30 L25 30 Z" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <text x="50" y="25" textAnchor="middle" className="text-[#1a1a1a] font-bold text-sm">NFL</text>
    </svg>
  ),
  WNBA: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <circle cx="20" cy="20" r="8" fill="#1a1a1a"/>
      <rect x="35" y="15" width="50" height="10" rx="2"/>
      <text x="60" y="22" textAnchor="middle" className="text-[#1a1a1a] font-bold text-xs">WNBA</text>
    </svg>
  ),
  LARams: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <path d="M20 20 Q30 10 40 20 Q50 30 60 20 Q70 10 80 20" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
      <text x="50" y="25" textAnchor="middle" className="text-[#1a1a1a] font-bold text-sm">LA</text>
    </svg>
  ),
  Cowboys: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <path d="M50 10 L60 20 L50 30 L40 20 Z" fill="#1a1a1a"/>
      <text x="50" y="35" textAnchor="middle" className="text-[#1a1a1a] font-bold text-xs">COWBOYS</text>
    </svg>
  ),
  Momentous: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <path d="M20 30 L30 10 L40 30 Z" fill="#1a1a1a"/>
      <text x="50" y="25" textAnchor="middle" className="text-[#1a1a1a] font-bold text-xs">MOMENTOUS</text>
    </svg>
  ),
  NBA: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <circle cx="20" cy="20" r="8" fill="#1a1a1a"/>
      <rect x="35" y="15" width="50" height="10" rx="2"/>
      <text x="60" y="22" textAnchor="middle" className="text-[#1a1a1a] font-bold text-xs">NBA</text>
    </svg>
  ),
  PK: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <circle cx="50" cy="20" r="12" fill="#1a1a1a"/>
      <text x="50" y="25" textAnchor="middle" className="text-white font-bold text-sm">pk</text>
    </svg>
  ),
  Gatorade: () => (
    <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white">
      <path d="M10 15 L20 10 L30 15 L20 20 Z" fill="#1a1a1a"/>
      <rect x="35" y="12" width="50" height="6" rx="1"/>
      <text x="60" y="17" textAnchor="middle" className="text-[#1a1a1a] font-bold text-xs">GATORADE</text>
    </svg>
  )
}

const partnerLogos = [
  { name: 'MLB', component: Logos.MLB },
  { name: 'NFL', component: Logos.NFL },
  { name: 'WNBA', component: Logos.WNBA },
  { name: 'LA Rams', component: Logos.LARams },
  { name: 'Cowboys', component: Logos.Cowboys },
  { name: 'Momentous', component: Logos.Momentous },
  { name: 'NBA', component: Logos.NBA },
  { name: 'PK', component: Logos.PK },
  { name: 'Gatorade', component: Logos.Gatorade }
]

export default function Partners() {
  const { language } = useLanguage()
  const content = partnersContent[language]

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-12"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-[#B8A16F] uppercase tracking-tight"
          >
            {content.title}
          </motion.h2>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"
          >
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center justify-center p-4 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <partner.component />
              </motion.div>
            ))}
          </motion.div>

          {/* Google Review Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center pt-8"
          >
            <div className="relative bg-[#2C2C2C] rounded-2xl p-6 shadow-2xl max-w-sm">
              {/* Close button */}
              <button className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors duration-200">
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-4">
                {/* Google Logo */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#4285F4] font-bold text-xl">G</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {content.review.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-white font-bold text-xl">
                      {content.review.rating}
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'text-[#FFD700] fill-current' : 'text-[#FFD700]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm mt-1">
                    {content.review.reviews}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}










