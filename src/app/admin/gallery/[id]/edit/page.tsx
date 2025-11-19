'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Loader2, XCircle, CheckCircle, Upload, Type, Image as ImageIcon } from 'lucide-react'

interface GalleryFormData {
  titleEn: string
  titleAr: string
  imageUrl: string
  isActive: boolean
  order: number
}

export default function EditGalleryImage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [galleryImage, setGalleryImage] = useState<GalleryFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [galleryId, setGalleryId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setGalleryId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (galleryId) {
      fetchGalleryImage()
    }
  }, [galleryId])

  const fetchGalleryImage = async () => {
    try {
      const response = await fetch(`/api/gallery/${galleryId}`)
      if (!response.ok) throw new Error('Failed to fetch gallery image')
      const data = await response.json()
      setGalleryImage(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setGalleryImage((prev) => {
      if (!prev) return null
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'order' ? parseInt(value) || 0 : value),
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!galleryImage) return

    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('titleEn', galleryImage.titleEn)
      formData.append('titleAr', galleryImage.titleAr)
      formData.append('isActive', galleryImage.isActive.toString())
      formData.append('order', galleryImage.order.toString())
      
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const res = await fetch(`/api/gallery/${galleryId}`, {
        method: 'PUT',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to update gallery image')

      setSuccess('Gallery image updated successfully!')
      setImageFile(null)
      fetchGalleryImage()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!galleryImage) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600">Gallery image not found.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Gallery Image</h1>

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-100 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-4"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{success}</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-4"
            >
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Image Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>
              <div className="flex items-center space-x-4">
                <img src={galleryImage.imageUrl} alt="Current" className="w-32 h-32 object-cover rounded-lg" />
                <div className="text-sm text-gray-600">
                  <p>Current image preview</p>
                </div>
              </div>
            </div>

            {/* Title English */}
            <div>
              <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-2">
                Title (English)
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  value={galleryImage.titleEn}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Title Arabic */}
            <div>
              <label htmlFor="titleAr" className="block text-sm font-medium text-gray-700 mb-2">
                Title (Arabic)
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  id="titleAr"
                  name="titleAr"
                  value={galleryImage.titleAr}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  dir="rtl"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Replace Image (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {imageFile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ImageIcon className="w-4 h-4" />
                    <span>New image: {imageFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order */}
            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={galleryImage.order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={galleryImage.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm font-medium text-gray-900">
                Is Active
              </label>
            </div>

            <div className="flex space-x-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-md"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Update Image</span>
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => router.push('/admin')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
