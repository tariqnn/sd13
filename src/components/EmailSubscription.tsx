'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, X } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export default function EmailSubscription() {
  const { language } = useLanguage()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already-subscribed'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          preferences: {
            events: true,
            news: true,
            promotions: true
          }
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.alreadySubscribed) {
          setStatus('already-subscribed')
          setMessage(language === 'ar' ? 'أنت مشترك بالفعل في قائمتنا البريدية' : 'You are already subscribed to our newsletter')
        } else {
          setStatus('success')
          setMessage(language === 'ar' ? 'تم الاشتراك بنجاح! شكراً لك' : 'Successfully subscribed! Thank you')
          setEmail('')
          setName('')
        }
      } else {
        setStatus('error')
        setMessage(data.error || (language === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again'))
      }
    } catch (error) {
      setStatus('error')
      setMessage(language === 'ar' ? 'حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى' : 'Connection error, please try again')
    } finally {
      setLoading(false)
    }
  }

  const content = {
    en: {
      title: 'Stay Updated',
      subtitle: 'Subscribe to our newsletter for the latest events, news, and updates',
      emailPlaceholder: 'Enter your email address',
      namePlaceholder: 'Your name (optional)',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      success: 'Successfully subscribed!',
      error: 'Subscription failed',
      alreadySubscribed: 'Already subscribed'
    },
    ar: {
      title: 'ابق على اطلاع',
      subtitle: 'اشترك في نشرتنا الإخبارية للحصول على أحدث الأحداث والأخبار والتحديثات',
      emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
      namePlaceholder: 'اسمك (اختياري)',
      subscribe: 'اشترك',
      subscribing: 'جاري الاشتراك...',
      success: 'تم الاشتراك بنجاح!',
      error: 'فشل الاشتراك',
      alreadySubscribed: 'مشترك بالفعل'
    }
  }

  const t = content[language]

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
        <p className="text-primary-100 mb-6 max-w-md mx-auto">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span>{t.subscribing}</span>
              </>
            ) : (
              <span>{t.subscribe}</span>
            )}
          </button>
        </form>

        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg flex items-center justify-center space-x-2 ${
              status === 'success' || status === 'already-subscribed'
                ? 'bg-green-500/20 text-green-100'
                : 'bg-red-500/20 text-red-100'
            }`}
          >
            {status === 'success' || status === 'already-subscribed' ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
            <span className="text-sm">{message}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
