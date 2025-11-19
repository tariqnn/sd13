import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    const { data: programs, error } = await supabase
      .from('programs')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 })
    }
    
    return NextResponse.json(programs || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check - in production, implement proper auth
    // For now, allow all requests

    const formData = await request.formData()
    const titleEn = formData.get('titleEn') as string
    const titleAr = formData.get('titleAr') as string
    const descriptionEn = formData.get('descriptionEn') as string
    const descriptionAr = formData.get('descriptionAr') as string
    const features = formData.get('features') as string
    const image = formData.get('image') as File | null

    let imageUrl = null
    if (image && image.size > 0) {
      imageUrl = await uploadFile(image, 'programs')
    }

    const { data: program, error } = await supabase
      .from('programs')
      .insert([{
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descriptionEn,
        description_ar: descriptionAr,
        features,
        image_url: imageUrl,
        order: 0,
        is_active: true
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create program' }, { status: 500 })
    }

    return NextResponse.json(program)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 })
  }
}
