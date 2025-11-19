import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile, deleteFile } from '@/lib/upload'

export async function GET() {
  try {
    const { data: heroContent, error } = await supabase
      .from('hero_content')
      .select('*')
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 })
    }
    
    return NextResponse.json(heroContent)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 })
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
    const { data: existingHero } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single()
    
    if (existingHero) {
      // Update existing hero content
      if (video && video.size > 0 && existingHero.video_url) {
        await deleteFile(existingHero.video_url)
      }
      
      const { data: heroContent, error } = await supabase
        .from('hero_content')
        .update({
          title_en: titleEn,
          title_ar: titleAr,
          subtitle_en: subtitleEn,
          subtitle_ar: subtitleAr,
          description_en: descriptionEn,
          description_ar: descriptionAr,
          video_url: videoUrl || existingHero.video_url
        })
        .eq('id', existingHero.id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 })
      }

      return NextResponse.json(heroContent)
    } else {
      // Create new hero content
      const { data: heroContent, error } = await supabase
        .from('hero_content')
        .insert([{
          title_en: titleEn,
          title_ar: titleAr,
          subtitle_en: subtitleEn,
          subtitle_ar: subtitleAr,
          description_en: descriptionEn,
          description_ar: descriptionAr,
          video_url: videoUrl
        }])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json({ error: 'Failed to create hero content' }, { status: 500 })
      }

      return NextResponse.json(heroContent)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save hero content' }, { status: 500 })
  }
}
