'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Calendar, MapPin, Users, ExternalLink, Clock } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'

interface Event {
  id: string
  title_en: string
  title_ar: string
  description_en?: string
  description_ar?: string
  event_date: string
  location_en?: string
  location_ar?: string
  event_type: string
  registration_url?: string
  image_url?: string
  is_featured: boolean
  max_participants?: number
  current_participants?: number
  registration_deadline?: string
}

export default function Events() {
  const { language } = useLanguage()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchEvents()
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      
      // Check if the response is an error or if data is an array
      if (response.ok && Array.isArray(data)) {
        setEvents(data)
      } else {
        console.error('Error fetching events:', data)
        setEvents([]) // Set empty array as fallback
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([]) // Set empty array as fallback
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'training':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'workshop':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventTypeLabel = (type: string) => {
    if (language === 'ar') {
      switch (type) {
        case 'tournament': return 'بطولة'
        case 'training': return 'تدريب'
        case 'workshop': return 'ورشة عمل'
        default: return 'حدث'
      }
    } else {
      switch (type) {
        case 'tournament': return 'Tournament'
        case 'training': return 'Training'
        case 'workshop': return 'Workshop'
        default: return 'Event'
      }
    }
  }

  const sectionContent = {
    en: {
      title: 'Upcoming Events & Tournaments',
      subtitle: 'Join our exciting events and showcase your skills',
      viewAll: 'View All Events',
      register: 'Register Now',
      learnMore: 'Learn More',
      participants: 'Participants',
      maxParticipants: 'Max Participants',
      registrationDeadline: 'Registration Deadline',
      location: 'Location',
      date: 'Date & Time',
      noEvents: 'No upcoming events at the moment',
      checkBack: 'Check back soon for exciting tournaments and training sessions!'
    },
    ar: {
      title: 'الأحداث والبطولات القادمة',
      subtitle: 'انضم إلى أحداثنا المثيرة وأظهر مهاراتك',
      viewAll: 'عرض جميع الأحداث',
      register: 'سجل الآن',
      learnMore: 'اعرف المزيد',
      participants: 'المشاركون',
      maxParticipants: 'الحد الأقصى للمشاركين',
      registrationDeadline: 'موعد انتهاء التسجيل',
      location: 'الموقع',
      date: 'التاريخ والوقت',
      noEvents: 'لا توجد أحداث قادمة في الوقت الحالي',
      checkBack: 'تحقق مرة أخرى قريباً للحصول على بطولات وجلسات تدريبية مثيرة!'
    }
  }

  const content = sectionContent[language]

  if (loading) {
    return (
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredEvents = events.filter(event => event.is_featured)
  const upcomingEvents = events.filter(event => !event.is_featured).slice(0, 3)

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-gray-900 ${isMobile ? 'mb-3' : 'mb-4'} ${isMobile ? 'mobile-slide-up' : ''}`}>
            {content.title}
          </h2>
          <p className={`${isMobile ? 'text-lg px-4' : 'text-xl'} text-gray-600 max-w-3xl mx-auto ${isMobile ? 'mobile-slide-up' : ''}`}>
            {content.subtitle}
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {content.noEvents}
            </h3>
            <p className="text-gray-600">
              {content.checkBack}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {language === 'ar' ? 'الأحداث المميزة' : 'Featured Events'}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={language === 'ar' ? event.title_ar : event.title_en}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <ImagePlaceholder
                          src="/photos/gallery/DSC06058-2.jpg"
                          alt={language === 'ar' ? event.title_ar : event.title_en}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.event_type)}`}>
                            {getEventTypeLabel(event.event_type)}
                          </span>
                          {event.is_featured && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium border border-yellow-200">
                              {language === 'ar' ? 'مميز' : 'Featured'}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {language === 'ar' ? event.title_ar : event.title_en}
                        </h4>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {language === 'ar' ? event.description_ar : event.description_en}
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{formatDate(event.event_date)}</span>
                          </div>
                          
                          {event.location_en && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{language === 'ar' ? event.location_ar : event.location_en}</span>
                            </div>
                          )}

                          {event.max_participants && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              <span>
                                {event.current_participants || 0} / {event.max_participants} {content.participants}
                              </span>
                            </div>
                          )}

                          {event.registration_deadline && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>
                                {content.registrationDeadline}: {formatDate(event.registration_deadline)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-3">
                          {event.registration_url && (
                            <a
                              href={event.registration_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center flex items-center justify-center space-x-2"
                            >
                              <span>{content.register}</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="flex-1 border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                          >
                            {content.learnMore}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {language === 'ar' ? 'الأحداث القادمة' : 'Upcoming Events'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={language === 'ar' ? event.title_ar : event.title_en}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <ImagePlaceholder
                          src="/photos/gallery/DSC06058-2.jpg"
                          alt={language === 'ar' ? event.title_ar : event.title_en}
                          width={300}
                          height={128}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.event_type)}`}>
                            {getEventTypeLabel(event.event_type)}
                          </span>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {language === 'ar' ? event.title_ar : event.title_en}
                        </h4>

                        <div className="space-y-1 mb-4">
                          <div className="flex items-center text-xs text-gray-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(event.event_date)}</span>
                          </div>
                          
                          {event.location_en && (
                            <div className="flex items-center text-xs text-gray-600">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="truncate">{language === 'ar' ? event.location_ar : event.location_en}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          {event.registration_url && (
                            <a
                              href={event.registration_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center text-sm flex items-center justify-center space-x-1"
                            >
                              <span>{content.register}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="flex-1 border border-primary-600 text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                          >
                            {content.learnMore}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ar' ? selectedEvent.title_ar : selectedEvent.title_en}
                  </h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {selectedEvent.image_url && (
                  <img
                    src={selectedEvent.image_url}
                    alt={language === 'ar' ? selectedEvent.title_ar : selectedEvent.title_en}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span className="font-medium">{content.date}:</span>
                    <span className="ml-2">{formatDate(selectedEvent.event_date)}</span>
                  </div>
                  
                  {selectedEvent.location_en && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span className="font-medium">{content.location}:</span>
                      <span className="ml-2">{language === 'ar' ? selectedEvent.location_ar : selectedEvent.location_en}</span>
                    </div>
                  )}

                  {selectedEvent.max_participants && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-3" />
                      <span className="font-medium">{content.participants}:</span>
                      <span className="ml-2">
                        {selectedEvent.current_participants || 0} / {selectedEvent.max_participants}
                      </span>
                    </div>
                  )}

                  {selectedEvent.registration_deadline && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <span className="font-medium">{content.registrationDeadline}:</span>
                      <span className="ml-2">{formatDate(selectedEvent.registration_deadline)}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-6">
                  {language === 'ar' ? selectedEvent.description_ar : selectedEvent.description_en}
                </p>

                {selectedEvent.registration_url && (
                  <a
                    href={selectedEvent.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center flex items-center justify-center space-x-2"
                  >
                    <span>{content.register}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}