import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile, deleteFile } from '@/lib/upload'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const program = await prisma.program.findUnique({
      where: { id }
    })
    if (!program) {
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

    const existingProgram = await prisma.program.findUnique({
      where: { id }
    })

    if (!existingProgram) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    let imageUrl = existingProgram.imageUrl

    if (removeImage && imageUrl) {
      await deleteFile(imageUrl)
      imageUrl = null
    }

    if (image && image.size > 0) {
      if (existingProgram.imageUrl) {
        await deleteFile(existingProgram.imageUrl)
      }
      imageUrl = await uploadFile(image, 'programs')
    }

    const program = await prisma.program.update({
      where: { id },
      data: {
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        features,
        imageUrl,
        isActive,
        order
      }
    })

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