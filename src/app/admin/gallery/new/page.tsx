'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Loader2, XCircle, CheckCircle, Upload, PlusCircle, Type, AlignLeft, Image as ImageIcon } from 'lucide-react'

interface GalleryFormData {
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  order: number
}

export default function NewGalleryImage() {
  const router = useRouter()
  const [formData, setFormData] = useState<GalleryFormData>({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    order: 0,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    if (!imageFile) {
      setError('Please select an image')
      setSubmitting(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('titleEn', formData.titleEn)
      formDataToSend.append('titleAr', formData.titleAr)
      formDataToSend.append('descriptionEn', formData.descriptionEn)
      formDataToSend.append('descriptionAr', formData.descriptionAr)
      formDataToSend.append('order', formData.order.toString())
      formDataToSend.append('image', imageFile)

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!res.ok) throw new Error('Failed to create gallery image')

      setSuccess('Gallery image created successfully!')
      setFormData({
        titleEn: '',
        titleAr: '',
        descriptionEn: '',
        descriptionAr: '',
        order: 0,
      })
      setImageFile(null)
      router.push('/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
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
          <div className="flex items-center space-x-3 mb-6">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Add Gallery Image</h1>
          </div>

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
            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Image *
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
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
                    <span>{imageFile.name}</span>
                  </div>
                )}
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
                  value={formData.titleEn}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter image title in English"
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
                  value={formData.titleAr}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل عنوان الصورة بالعربية"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Description English */}
            <div>
              <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 mb-2">
                Description (English)
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter image description in English"
                ></textarea>
              </div>
            </div>

            {/* Description Arabic */}
            <div>
              <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Arabic)
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <textarea
                  id="descriptionAr"
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل وصف الصورة بالعربية"
                  dir="rtl"
                ></textarea>
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
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
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
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Create Gallery Image</span>
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
