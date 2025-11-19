import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    const { data: coaches, error } = await supabase
      .from('coaches')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch coaches' }, { status: 500 })
    }
    
    return NextResponse.json(coaches || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch coaches' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check - in production, implement proper auth
    // For now, allow all requests

    const formData = await request.formData()
    const nameEn = formData.get('nameEn') as string
    const nameAr = formData.get('nameAr') as string
    const titleEn = formData.get('titleEn') as string
    const titleAr = formData.get('titleAr') as string
    const bioEn = formData.get('bioEn') as string
    const bioAr = formData.get('bioAr') as string
    const experience = parseInt(formData.get('experience') as string) || 0
    const specialties = formData.get('specialties') as string
    const image = formData.get('image') as File | null

    let imageUrl = null
    if (image && image.size > 0) {
      imageUrl = await uploadFile(image, 'coaches')
    }

    const { data: coach, error } = await supabase
      .from('coaches')
      .insert([{
        name_en: nameEn,
        name_ar: nameAr,
        title_en: titleEn,
        title_ar: titleAr,
        bio_en: bioEn,
        bio_ar: bioAr,
        experience,
        specialties,
        image_url: imageUrl,
        order: 0,
        is_active: true
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create coach' }, { status: 500 })
    }

    return NextResponse.json(coach)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create coach' }, { status: 500 })
  }
}
