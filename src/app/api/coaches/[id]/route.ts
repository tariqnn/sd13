import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile, deleteFile } from '@/lib/upload'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: coach, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error || !coach) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
    }
    
    return NextResponse.json(coach)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch coach' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Simple authentication check - in production, implement proper auth
    // For now, allow all requests

    const { id } = await params
    const formData = await request.formData()
    const name_en = formData.get('nameEn') as string
    const name_ar = formData.get('nameAr') as string
    const title_en = formData.get('titleEn') as string
    const title_ar = formData.get('titleAr') as string
    const bio_en = formData.get('bioEn') as string
    const bio_ar = formData.get('bioAr') as string
    const experience = parseInt(formData.get('experience') as string) || 0
    const specialties = formData.get('specialties') as string
    const is_active = formData.get('isActive') === 'true'
    const order = parseInt(formData.get('order') as string) || 0
    const image = formData.get('image') as File | null
    const removeImage = formData.get('removeImage') === 'true'

    // Get existing coach
    const { data: existingCoach, error: fetchError } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !existingCoach) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
    }

    let image_url = existingCoach.image_url

    if (removeImage && image_url) {
      await deleteFile(image_url)
      image_url = null
    }

    if (image && image.size > 0) {
      if (existingCoach.image_url) {
        await deleteFile(existingCoach.image_url)
      }
      image_url = await uploadFile(image, 'coaches')
    }

    // Update coach in database
    const { data: coach, error: updateError } = await supabase
      .from('coaches')
      .update({
        name_en,
        name_ar,
        title_en,
        title_ar,
        bio_en,
        bio_ar,
        experience,
        specialties,
        image_url,
        is_active,
        order
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json({ error: 'Failed to update coach' }, { status: 500 })
    }

    return NextResponse.json(coach)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to update coach' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Simple authentication check - in production, implement proper auth
    // For now, allow all requests

    const { id } = await params
    
    // First, get the coach to check if it exists and get image URL
    const { data: coach, error: fetchError } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !coach) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
    }

    // Delete the image file if it exists
    if (coach.image_url) {
      await deleteFile(coach.image_url)
    }

    // Delete the coach from database
    const { error: deleteError } = await supabase
      .from('coaches')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Supabase delete error:', deleteError)
      return NextResponse.json({ error: 'Failed to delete coach' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Coach deleted successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to delete coach' }, { status: 500 })
  }
}