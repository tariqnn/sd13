'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const { language } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const footerContent = {
    en: {
      description: "SD13 Sports Academy is Jordan's premier basketball training facility, dedicated to developing the next generation of basketball stars through professional coaching and world-class facilities.",
      quickLinks: {
        title: "Quick Links",
        links: [
          { name: "Home", href: "#home" },
          { name: "Programs", href: "#programs" },
          { name: "Coaches", href: "#coaches" },
          { name: "Gallery", href: "#gallery" },
          { name: "Contact", href: "#contact" }
        ]
      },
      programs: {
        title: "Programs",
        links: [
          { name: "Youth Academy", href: "#" },
          { name: "Elite Training", href: "#" },
          { name: "Summer Camp", href: "#" },
          { name: "Private Coaching", href: "#" }
        ]
      },
      contact: {
        title: "Contact Info",
        address: "Amman, Jordan",
        phone: "+962 6 123 4567",
        email: "info@sd13academy.com"
      },
      copyright: "© 2024 SD13 Sports Academy. All rights reserved."
    },
    ar: {
      description: "أكاديمية SD13 الرياضية هي منشأة تدريب كرة السلة الرائدة في الأردن، مكرسة لتطوير الجيل القادم من نجوم كرة السلة من خلال التدريب المهني والمرافق عالمية المستوى.",
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { name: "الرئيسية", href: "#home" },
          { name: "البرامج", href: "#programs" },
          { name: "المدربون", href: "#coaches" },
          { name: "المعرض", href: "#gallery" },
          { name: "اتصل بنا", href: "#contact" }
        ]
      },
      programs: {
        title: "البرامج",
        links: [
          { name: "أكاديمية الشباب", href: "#" },
          { name: "التدريب النخبة", href: "#" },
          { name: "المعسكر الصيفي", href: "#" },
          { name: "التدريب الخاص", href: "#" }
        ]
      },
      contact: {
        title: "معلومات الاتصال",
        address: "عمان، الأردن",
        phone: "+962 6 123 4567",
        email: "info@sd13academy.com"
      },
      copyright: "© 2024 أكاديمية SD13 الرياضية. جميع الحقوق محفوظة."
    }
  }

  const content = footerContent[language]

  return (
    <footer className="bg-gray-900 text-white">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-12' : 'py-16'}`}>
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-4 gap-8'}`}>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-20 h-20">
                <svg width="80" height="80" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="footerSphereGradient" cx="50%" cy="30%" r="70%">
                      <stop offset="0%" style={{stopColor:"#ff6b6b",stopOpacity:1}} />
                      <stop offset="25%" style={{stopColor:"#ff8e8e",stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:"#a8e6cf",stopOpacity:1}} />
                      <stop offset="75%" style={{stopColor:"#88d8c0",stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#4ecdc4",stopOpacity:1}} />
                    </radialGradient>
                    <linearGradient id="footerTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:"#6c5ce7",stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#a29bfe",stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="30" cy="30" r="25" fill="url(#footerSphereGradient)" />
                  <path d="M 10 25 Q 20 20 30 25 Q 40 30 50 25" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.3"/>
                  <path d="M 10 30 Q 20 25 30 30 Q 40 35 50 30" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.4"/>
                  <path d="M 10 35 Q 20 30 30 35 Q 40 40 50 35" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.3"/>
                  <text x="70" y="32" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="url(#footerTextGradient)">SD13</text>
                  <text x="70" y="55" fontFamily="Arial, sans-serif" fontSize="20" fontStyle="italic" fill="url(#footerTextGradient)">SPORTS ACADEMY</text>
                </svg>
              </div>
              <span className="text-2xl font-bold">SD13 Academy</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {content.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">{content.quickLinks.title}</h3>
            <ul className="space-y-3">
              {content.quickLinks.links.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">{content.programs.title}</h3>
            <ul className="space-y-3">
              {content.programs.links.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">{content.contact.title}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{content.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`tel:${content.contact.phone}`}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {content.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {content.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {content.copyright}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
