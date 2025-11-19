'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  Image, 
  Video, 
  Settings, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Calendar
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface HeroContent {
  id: string
  title_en: string
  title_ar: string
  subtitle_en: string
  subtitle_ar: string
  description_en: string
  description_ar: string
  video_url?: string
}

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

export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [programs, setPrograms] = useState<Program[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin-access')
      return
    }
    
    if (user && isAdmin) {
      fetchData()
    }
  }, [user, loading, isAdmin, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user || !isAdmin) {
    return null
  }

  const fetchData = async () => {
    try {
      const [programsRes, coachesRes, eventsRes, galleryRes, heroRes] = await Promise.all([
        fetch('/api/programs'),
        fetch('/api/coaches'),
        fetch('/api/events'),
        fetch('/api/gallery'),
        fetch('/api/hero')
      ])
      
      setPrograms(await programsRes.json())
      setCoaches(await coachesRes.json())
      setEvents(await eventsRes.json())
      setGalleryImages(await galleryRes.json())
      setHeroContent(await heroRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogout = async () => {
    try {
      // Import supabase client
      const { supabase } = await import('@/lib/supabase')
      
      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Redirect to login page
      router.push('/admin-access')
    } catch (error) {
      console.error('Error logging out:', error)
      // Still redirect even if logout fails
      router.push('/admin-access')
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'hero', name: 'Hero Section', icon: Video },
    { id: 'programs', name: 'Programs', icon: BookOpen },
    { id: 'coaches', name: 'Coaches', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Professional Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  SD13 Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1 font-medium">Professional Content Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">System Online</span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-200 px-4 py-2 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">View Website</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Tabs */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 mb-8">
          <div className="border-b border-gray-200/50">
            <nav className="-mb-px flex space-x-1 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 py-4 px-6 border-b-2 font-semibold text-sm transition-all duration-200 rounded-t-xl ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Professional Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-8"
        >
          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-600 mt-2">Monitor and manage your website content</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Programs</p>
                      <p className="text-3xl font-bold text-blue-900 mt-2">{programs.length}</p>
                      <p className="text-xs text-blue-700 mt-1">Active training programs</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Coaches</p>
                      <p className="text-3xl font-bold text-green-900 mt-2">{coaches.length}</p>
                      <p className="text-xs text-green-700 mt-1">Professional trainers</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Hero Content</p>
                      <p className="text-3xl font-bold text-purple-900 mt-2">{heroContent ? '1' : '0'}</p>
                      <p className="text-xs text-purple-700 mt-1">Main banner content</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Events</p>
                      <p className="text-3xl font-bold text-purple-900 mt-2">{events.length}</p>
                      <p className="text-xs text-purple-700 mt-1">Upcoming events</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Gallery</p>
                      <p className="text-3xl font-bold text-orange-900 mt-2">{galleryImages.length}</p>
                      <p className="text-xs text-orange-700 mt-1">Media assets</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Image className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab('programs')}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Manage Programs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('coaches')}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
                  >
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Manage Coaches</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                  >
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Manage Events</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                  >
                    <Image className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Manage Gallery</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
                <button
                  onClick={() => router.push('/admin/hero/edit')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Hero Content</span>
                </button>
              </div>
              {heroContent ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Current Hero Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">English</h4>
                      <p className="text-sm text-gray-600 mb-1"><strong>Title:</strong> {heroContent.title_en}</p>
                      <p className="text-sm text-gray-600 mb-1"><strong>Subtitle:</strong> {heroContent.subtitle_en}</p>
                      <p className="text-sm text-gray-600"><strong>Description:</strong> {heroContent.description_en}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Arabic</h4>
                      <p className="text-sm text-gray-600 mb-1"><strong>Title:</strong> {heroContent.title_ar}</p>
                      <p className="text-sm text-gray-600 mb-1"><strong>Subtitle:</strong> {heroContent.subtitle_ar}</p>
                      <p className="text-sm text-gray-600"><strong>Description:</strong> {heroContent.description_ar}</p>
                    </div>
                  </div>
                  {heroContent.video_url && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Video:</p>
                      <video src={heroContent.video_url} controls className="w-full max-w-md rounded-lg" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Hero Content</h3>
                  <p className="text-gray-600 mb-4">Create hero content to get started</p>
                  <button
                    onClick={() => router.push('/admin/hero/edit')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Hero Content
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'programs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
                <button
                  onClick={() => router.push('/admin/programs/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Program</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program: Program) => (
                  <div key={program.id} className="bg-gray-50 p-6 rounded-lg">
                    {program.image_url && (
                      <img src={program.image_url} alt={program.title_en} className="w-full h-48 object-cover rounded-lg mb-4" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title_en}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{program.description_en}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/admin/programs/${program.id}/edit`)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this program?')) {
                            try {
                              const response = await fetch(`/api/programs/${program.id}`, { method: 'DELETE' })
                              if (response.ok) {
                                // Remove from local state immediately
                                setPrograms(programs.filter(p => p.id !== program.id))
                                alert('Program deleted successfully!')
                              } else {
                                const errorData = await response.json()
                                console.error('Failed to delete program:', errorData)
                                alert(`Failed to delete program: ${errorData.error || 'Unknown error'}`)
                              }
                            } catch (error) {
                              console.error('Error deleting program:', error)
                              alert('Error deleting program. Please try again.')
                            }
                          }
                        }}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coaches' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Coaches</h2>
                <button
                  onClick={() => router.push('/admin/coaches/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Coach</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coaches.map((coach: Coach) => (
                  <div key={coach.id} className="bg-gray-50 p-6 rounded-lg">
                    {coach.image_url && (
                      <img src={coach.image_url} alt={coach.name_en} className="w-full h-48 object-cover rounded-lg mb-4" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{coach.name_en}</h3>
                    <p className="text-sm text-gray-600 mb-1">{coach.title_en}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{coach.bio_en}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/admin/coaches/${coach.id}/edit`)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this coach?')) {
                            try {
                              const response = await fetch(`/api/coaches/${coach.id}`, { method: 'DELETE' })
                              if (response.ok) {
                                // Remove from local state immediately
                                setCoaches(coaches.filter(c => c.id !== coach.id))
                                alert('Coach deleted successfully!')
                              } else {
                                const errorData = await response.json()
                                console.error('Failed to delete coach:', errorData)
                                alert(`Failed to delete coach: ${errorData.error || 'Unknown error'}`)
                              }
                            } catch (error) {
                              console.error('Error deleting coach:', error)
                              alert('Error deleting coach. Please try again.')
                            }
                          }
                        }}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Events & Tournaments</h2>
                <button
                  onClick={() => router.push('/admin/events/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: Event) => (
                  <div key={event.id} className="bg-gray-50 p-6 rounded-lg">
                    {event.image_url && (
                      <img src={event.image_url} alt={event.title_en} className="w-full h-48 object-cover rounded-lg mb-4" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title_en}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Type:</strong> {event.event_type}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                    </p>
                    {event.location_en && (
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Location:</strong> {event.location_en}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description_en}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this event?')) {
                            try {
                              const response = await fetch(`/api/events/${event.id}`, { method: 'DELETE' })
                              if (response.ok) {
                                setEvents(events.filter((e: Event) => e.id !== event.id))
                                alert('Event deleted successfully!')
                              } else {
                                const errorData = await response.json()
                                console.error('Failed to delete event:', errorData)
                                alert(`Failed to delete event: ${errorData.error || 'Unknown error'}`)
                              }
                            } catch (error) {
                              console.error('Error deleting event:', error)
                              alert('Error deleting event. Please try again.')
                            }
                          }
                        }}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                <button
                  onClick={() => router.push('/admin/gallery/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image: GalleryImage) => (
                  <div key={image.id} className="bg-gray-50 p-6 rounded-lg">
                    <img src={image.image_url} alt={image.title_en || 'Gallery Image'} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{image.title_en || 'Untitled'}</h3>
                    {image.description_en && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{image.description_en}</p>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/admin/gallery/${image.id}/edit`)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this image?')) {
                            try {
                              const response = await fetch(`/api/gallery/${image.id}`, { method: 'DELETE' })
                              if (response.ok) {
                                // Remove from local state immediately
                                setGalleryImages(galleryImages.filter(g => g.id !== image.id))
                                alert('Gallery image deleted successfully!')
                              } else {
                                const errorData = await response.json()
                                console.error('Failed to delete gallery image:', errorData)
                                alert(`Failed to delete gallery image: ${errorData.error || 'Unknown error'}`)
                              }
                            } catch (error) {
                              console.error('Error deleting gallery image:', error)
                              alert('Error deleting gallery image. Please try again.')
                            }
                          }
                        }}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {galleryImages.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Gallery Images</h3>
                    <p className="text-gray-600 mb-4">Add your first gallery image to get started</p>
                    <button
                      onClick={() => router.push('/admin/gallery/new')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add First Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Site Settings</h3>
                <p className="text-gray-600">Site settings coming soon...</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}