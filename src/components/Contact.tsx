'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    program: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
      title: "Get In Touch",
      subtitle: "Start Your Journey Today",
      description: "Ready to take your basketball skills to the next level? Contact us today and let's discuss how we can help you achieve your goals.",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        program: "Program Interest",
        message: "Message",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully!"
      },
      info: {
        phone: "+962 6 123 4567",
        email: "info@sd13academy.com"
      }
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "ابدأ رحلتك اليوم",
      description: "مستعد لرفع مهارات كرة السلة إلى المستوى التالي؟ تواصل معنا اليوم ودعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك.",
      form: {
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        phone: "رقم الهاتف",
        program: "اهتمام البرنامج",
        message: "الرسالة",
        submit: "إرسال الرسالة",
        submitting: "جاري الإرسال...",
        success: "تم إرسال الرسالة بنجاح!"
      },
      info: {
        phone: "+962 6 123 4567",
        email: "info@sd13academy.com"
      }
    }
  }

  const content = sectionContent[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '', program: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
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

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'lg:grid-cols-2 gap-12'} max-w-6xl mx-auto`}>
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'space-y-6' : 'space-y-8'} ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6">

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {language === 'ar' ? 'الهاتف' : 'Phone'}
                    </h4>
                    <p className="text-gray-600">{content.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </h4>
                    <p className="text-gray-600">{content.info.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className={`${isMobile ? 'rounded-xl' : 'rounded-2xl'} overflow-hidden shadow-lg ${isMobile ? 'mobile-fade-in-scale' : ''}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.344!2d35.8338515!3d31.9717977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca17ed1965e8d%3A0xd93a3913affa5945!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1640000000000!5m2!1sen!2sjo"
                width="100%"
                height={isMobile ? "250" : "300"}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SD13 Sports Academy Location - Amman, Jordan"
                className={`w-full ${isMobile ? 'h-64' : 'h-64'}`}
              ></iframe>
              <div className="bg-blue-600 text-white p-4 text-center">
                <p className="font-semibold">
                  {language === 'ar' ? 'موقع أكاديمية SD13 الرياضية' : 'SD13 Sports Academy Location'}
                </p>
                <p className="text-sm opacity-90 mt-1">
                  {language === 'ar' ? 'عمان، الأردن - المنطقة التجارية' : 'Amman, Jordan - Business Park'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-xl ${isMobile ? 'p-5' : 'p-8'} ${isMobile ? 'mobile-slide-up' : ''}`}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {content.form.success}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? 'سنرد عليك قريباً!' : 'We\'ll get back to you soon!'}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.form.program}
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">
                        {language === 'ar' ? 'اختر البرنامج' : 'Select Program'}
                      </option>
                      <option value="youth">
                        {language === 'ar' ? 'أكاديمية كرة السلة للشباب' : 'Youth Basketball Academy'}
                      </option>
                      <option value="elite">
                        {language === 'ar' ? 'برنامج التدريب النخبة' : 'Elite Training Program'}
                      </option>
                      <option value="summer">
                        {language === 'ar' ? 'معسكر كرة السلة الصيفي' : 'Summer Basketball Camp'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white ${isMobile ? 'py-3 px-4' : 'py-4 px-6'} ${isMobile ? 'rounded-lg' : 'rounded-lg'} font-semibold ${isMobile ? 'text-base' : 'text-lg'} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${isMobile ? 'mobile-pulse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{content.form.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{content.form.submit}</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
