import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    const { data: galleryImages, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
    }
    
    return NextResponse.json(galleryImages || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
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
    const image = formData.get('image') as File | null
    const order = parseInt(formData.get('order') as string) || 0

    if (!image || image.size === 0) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    const imageUrl = await uploadFile(image, 'gallery')

    const galleryImage = await prisma.galleryImage.create({
      data: {
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        imageUrl,
        order
      }
    })

    return NextResponse.json(galleryImage)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 })
  }
}
