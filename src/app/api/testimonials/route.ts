import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { mockTestimonials } from '@/data/mockData'

export async function GET() {
  try {
    // Try to fetch from database, fallback to mock data
    try {
      const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })
      
      if (!error && testimonials && testimonials.length > 0) {
        return NextResponse.json(testimonials)
      }
    } catch (dbError) {
      console.log('Database not available, using mock data')
    }
    
    // Return mock data for preview deployment
    return NextResponse.json(mockTestimonials)
  } catch (error) {
    console.error('API error:', error)
    // Return mock data even on error for preview
    return NextResponse.json(mockTestimonials)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const nameEn = formData.get('nameEn') as string
    const nameAr = formData.get('nameAr') as string
    const textEn = formData.get('textEn') as string
    const textAr = formData.get('textAr') as string
    const rating = parseInt(formData.get('rating') as string) || 5
    const image = formData.get('image') as File | null

    // In preview mode, just return success without saving
    if (!process.env.SUPABASE_KEY || process.env.SUPABASE_KEY.includes('your-')) {
      return NextResponse.json({ 
        message: 'Preview mode - data not saved',
        id: 'preview-' + Date.now()
      })
    }

    // Try to save to database
    try {
      const { data: testimonial, error } = await supabase
        .from('testimonials')
        .insert([{
          name_en: nameEn,
          name_ar: nameAr,
          text_en: textEn,
          text_ar: textAr,
          rating,
          image_url: image ? 'placeholder' : null,
          is_active: true,
          order: 0
        }])
        .select()
        .single()

      if (error) {
        throw error
      }

      return NextResponse.json(testimonial)
    } catch (dbError) {
      return NextResponse.json({ 
        message: 'Database not available in preview mode',
        id: 'preview-' + Date.now()
      })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}

