'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Loader2, XCircle, CheckCircle, Upload, Type, AlignLeft, List } from 'lucide-react'

interface ProgramFormData {
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  features: string
  imageUrl?: string
  isActive: boolean
  order: number
}

export default function EditProgram({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [program, setProgram] = useState<ProgramFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [programId, setProgramId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setProgramId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (programId) {
      fetchProgram()
    }
  }, [programId])

  const fetchProgram = async () => {
    try {
      const response = await fetch(`/api/programs/${programId}`)
      if (!response.ok) throw new Error('Failed to fetch program')
      const data = await response.json()
      setProgram(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setProgram((prev) => {
      if (!prev) return null
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (!program) return
    const featuresArray = JSON.parse(program.features)
    featuresArray[index] = value
    setProgram((prev) => {
      if (!prev) return null
      return {
        ...prev,
        features: JSON.stringify(featuresArray),
      }
    })
  }

  const addFeature = () => {
    if (!program) return
    const featuresArray = JSON.parse(program.features)
    setProgram((prev) => {
      if (!prev) return null
      return {
        ...prev,
        features: JSON.stringify([...featuresArray, '']),
      }
    })
  }

  const removeFeature = (index: number) => {
    if (!program) return
    const featuresArray = JSON.parse(program.features)
    featuresArray.splice(index, 1)
    setProgram((prev) => {
      if (!prev) return null
      return {
        ...prev,
        features: JSON.stringify(featuresArray),
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!program) return

    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('titleEn', program.titleEn)
      formData.append('titleAr', program.titleAr)
      formData.append('descriptionEn', program.descriptionEn)
      formData.append('descriptionAr', program.descriptionAr)
      formData.append('features', program.features)
      formData.append('isActive', program.isActive.toString())
      formData.append('order', program.order.toString())
      
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const res = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to update program')

      setSuccess('Program updated successfully!')
      setImageFile(null)
      fetchProgram()
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

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600">Program not found.</div>
      </div>
    )
  }

  const features = JSON.parse(program.features)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Program</h1>

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
                  value={program.titleEn}
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
                  value={program.titleAr}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
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
                  value={program.descriptionEn}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
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
                  value={program.descriptionAr}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  dir="rtl"
                ></textarea>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <span>+ Add Feature</span>
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Program Image
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
                {program.imageUrl && (
                  <div className="flex items-center space-x-2">
                    <img src={program.imageUrl} alt="Current" className="w-16 h-16 object-cover rounded-lg" />
                    <span className="text-sm text-gray-600">Current image</span>
                  </div>
                )}
                {imageFile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                value={program.order}
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
                checked={program.isActive}
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
                    <span>Update Program</span>
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
