import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

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

export function useSupabaseData() {
  const [heroContent, setHeroContent] = useState<HeroContent[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [heroRes, programsRes, eventsRes, coachesRes, testimonialsRes, galleryRes] = await Promise.all([
        supabase.from('hero_content').select('*'),
        supabase.from('programs').select('*'),
        supabase.from('events').select('*'),
        supabase.from('coaches').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('gallery_images').select('*')
      ])

      if (heroRes.error) throw heroRes.error
      if (programsRes.error) throw programsRes.error
      if (eventsRes.error) throw eventsRes.error
      if (coachesRes.error) throw coachesRes.error
      if (testimonialsRes.error) throw testimonialsRes.error
      if (galleryRes.error) throw galleryRes.error

      setHeroContent(heroRes.data || [])
      setPrograms(programsRes.data || [])
      setEvents(eventsRes.data || [])
      setCoaches(coachesRes.data || [])
      setTestimonials(testimonialsRes.data || [])
      setGalleryImages(galleryRes.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (table: string, data: any) => {
    try {
      const { error } = await supabase.from(table).insert(data)
      if (error) throw error
      await fetchData()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  const updateItem = async (table: string, id: string, data: any) => {
    try {
      const { error } = await supabase.from(table).update(data).eq('id', id)
      if (error) throw error
      await fetchData()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  const deleteItem = async (table: string, id: string) => {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
      await fetchData()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    heroContent,
    programs,
    events,
    coaches,
    testimonials,
    galleryImages,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
  }
}








