import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { uploadFile, deleteFile } from '@/lib/upload'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const galleryImage = await prisma.galleryImage.findUnique({
      where: { id }
    })
    if (!galleryImage) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 })
    }
    return NextResponse.json(galleryImage)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery image' }, { status: 500 })
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
    const isActive = formData.get('isActive') === 'true'
    const order = parseInt(formData.get('order') as string) || 0
    const image = formData.get('image') as File | null
    const removeImage = formData.get('removeImage') === 'true'

    const existingImage = await prisma.galleryImage.findUnique({
      where: { id }
    })

    if (!existingImage) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 })
    }

    let imageUrl = existingImage.imageUrl

    if (removeImage && imageUrl) {
      await deleteFile(imageUrl)
      imageUrl = null
    }

    if (image && image.size > 0) {
      if (existingImage.imageUrl) {
        await deleteFile(existingImage.imageUrl)
      }
      imageUrl = await uploadFile(image, 'gallery')
    }

    const galleryImage = await prisma.galleryImage.update({
      where: { id },
      data: {
        titleEn,
        titleAr,
        imageUrl,
        isActive,
        order
      }
    })

    return NextResponse.json(galleryImage)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 })
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
    
    // First, get the gallery image to check if it exists and get image URL
    const { data: galleryImage, error: fetchError } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !galleryImage) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 })
    }

    // Delete the image file if it exists
    if (galleryImage.image_url) {
      await deleteFile(galleryImage.image_url)
    }

    // Delete the gallery image from database
    const { error: deleteError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Supabase delete error:', deleteError)
      return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Gallery image deleted successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
  }
}