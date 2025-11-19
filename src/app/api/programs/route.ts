import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'
import { mockPrograms } from '@/data/mockData'

export async function GET() {
  try {
    // Try to fetch from database, fallback to mock data
    try {
      const { data: programs, error } = await supabase
        .from('programs')
        .select('*')
        .order('order', { ascending: true })
      
      if (!error && programs && programs.length > 0) {
        return NextResponse.json(programs)
      }
    } catch (dbError) {
      console.log('Database not available, using mock data')
    }
    
    // Return mock data for preview deployment
    return NextResponse.json(mockPrograms)
  } catch (error) {
    console.error('API error:', error)
    // Return mock data even on error for preview
    return NextResponse.json(mockPrograms)
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

    const program = await prisma.program.create({
      data: {
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        features,
        imageUrl,
        order: 0
      }
    })

    return NextResponse.json(program)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 })
  }
}
