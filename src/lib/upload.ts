import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest } from 'next/server'

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = join(process.cwd(), 'public', folder)
  
  try {
    await mkdir(uploadsDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }

  const filename = `${Date.now()}-${file.name}`
  const path = join(uploadsDir, filename)
  
  await writeFile(path, buffer)
  
  return `/${folder}/${filename}`
}

export async function deleteFile(filePath: string): Promise<void> {
  // Only try to delete local files, not external URLs
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    console.log('Skipping deletion of external URL:', filePath)
    return
  }
  
  const fullPath = join(process.cwd(), 'public', filePath)
  try {
    await import('fs').then(fs => fs.promises.unlink(fullPath))
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}
