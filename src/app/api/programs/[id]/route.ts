import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile, deleteFile } from '@/lib/upload'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: program, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }
    return NextResponse.json(program)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 })
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
    const titleEn = formData.get('titleEn') as string
    const titleAr = formData.get('titleAr') as string
    const descriptionEn = formData.get('descriptionEn') as string
    const descriptionAr = formData.get('descriptionAr') as string
    const features = formData.get('features') as string
    const isActive = formData.get('isActive') === 'true'
    const order = parseInt(formData.get('order') as string) || 0
    const image = formData.get('image') as File | null
    const removeImage = formData.get('removeImage') === 'true'

    const { data: existingProgram, error: fetchError } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !existingProgram) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    let imageUrl = existingProgram.image_url

    if (removeImage && imageUrl) {
      await deleteFile(imageUrl)
      imageUrl = null
    }

    if (image && image.size > 0) {
      if (existingProgram.image_url) {
        await deleteFile(existingProgram.image_url)
      }
      imageUrl = await uploadFile(image, 'programs')
    }

    const { data: program, error: updateError } = await supabase
      .from('programs')
      .update({
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descriptionEn,
        description_ar: descriptionAr,
        features,
        image_url: imageUrl,
        is_active: isActive,
        order
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Supabase error:', updateError)
      return NextResponse.json({ error: 'Failed to update program' }, { status: 500 })
    }

    return NextResponse.json(program)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 })
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
    
    // First, get the program to check if it exists and get image URL
    const { data: program, error: fetchError } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Delete the image file if it exists
    if (program.image_url) {
      await deleteFile(program.image_url)
    }

    // Delete the program from database
    const { error: deleteError } = await supabase
      .from('programs')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Supabase delete error:', deleteError)
      return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 })
  }
}