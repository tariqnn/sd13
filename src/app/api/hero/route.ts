import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile, deleteFile } from '@/lib/upload'
import { mockHeroContent } from '@/data/mockData'

export async function GET() {
  try {
    // Try to fetch from database, fallback to mock data
    try {
      const { data: heroContent, error } = await supabase
        .from('hero_content')
        .select('*')
        .single()
      
      if (!error && heroContent) {
        return NextResponse.json(heroContent)
      }
    } catch (dbError) {
      console.log('Database not available, using mock data')
    }
    
    // Return mock data for preview deployment
    return NextResponse.json(mockHeroContent)
  } catch (error) {
    console.error('API error:', error)
    // Return mock data even on error for preview
    return NextResponse.json(mockHeroContent)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check - in production, implement proper auth
    // For now, allow all requests

    const formData = await request.formData()
    const titleEn = formData.get('titleEn') as string
    const titleAr = formData.get('titleAr') as string
    const subtitleEn = formData.get('subtitleEn') as string
    const subtitleAr = formData.get('subtitleAr') as string
    const descriptionEn = formData.get('descriptionEn') as string
    const descriptionAr = formData.get('descriptionAr') as string
    const video = formData.get('video') as File | null

    let videoUrl = null
    if (video && video.size > 0) {
      videoUrl = await uploadFile(video, 'videos')
    }

    // Check if hero content already exists
    const existingHero = await prisma.heroContent.findFirst()
    
    if (existingHero) {
      // Update existing hero content
      if (video && video.size > 0 && existingHero.videoUrl) {
        await deleteFile(existingHero.videoUrl)
      }
      
      const heroContent = await prisma.heroContent.update({
        where: { id: existingHero.id },
        data: {
          titleEn,
          titleAr,
          subtitleEn,
          subtitleAr,
          descriptionEn,
          descriptionAr,
          videoUrl: videoUrl || existingHero.videoUrl
        }
      })
      return NextResponse.json(heroContent)
    } else {
      // Create new hero content
      const heroContent = await prisma.heroContent.create({
        data: {
          titleEn,
          titleAr,
          subtitleEn,
          subtitleAr,
          descriptionEn,
          descriptionAr,
          videoUrl
        }
      })
      return NextResponse.json(heroContent)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save hero content' }, { status: 500 })
  }
}
