'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Loader2, XCircle, CheckCircle, Upload, Type, AlignLeft, List } from 'lucide-react'

interface CoachFormData {
  nameEn: string
  nameAr: string
  titleEn: string
  titleAr: string
  bioEn: string
  bioAr: string
  experience: number
  specialties: string
  imageUrl?: string
  isActive: boolean
  order: number
}

export default function EditCoach({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [coach, setCoach] = useState<CoachFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [coachId, setCoachId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setCoachId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (coachId) {
      fetchCoach()
    }
  }, [coachId])

  const fetchCoach = async () => {
    try {
      const response = await fetch(`/api/coaches/${coachId}`)
      if (!response.ok) throw new Error('Failed to fetch coach')
      const data = await response.json()
      setCoach(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setCoach((prev) => {
      if (!prev) return null
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'experience' ? parseInt(value) || 0 : value),
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSpecialtyChange = (index: number, value: string) => {
    if (!coach) return
    const specialtiesArray = JSON.parse(coach.specialties)
    specialtiesArray[index] = value
    setCoach((prev) => {
      if (!prev) return null
      return {
        ...prev,
        specialties: JSON.stringify(specialtiesArray),
      }
    })
  }

  const addSpecialty = () => {
    if (!coach) return
    const specialtiesArray = JSON.parse(coach.specialties)
    setCoach((prev) => {
      if (!prev) return null
      return {
        ...prev,
        specialties: JSON.stringify([...specialtiesArray, '']),
      }
    })
  }

  const removeSpecialty = (index: number) => {
    if (!coach) return
    const specialtiesArray = JSON.parse(coach.specialties)
    specialtiesArray.splice(index, 1)
    setCoach((prev) => {
      if (!prev) return null
      return {
        ...prev,
        specialties: JSON.stringify(specialtiesArray),
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!coach) return

    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('nameEn', coach.nameEn)
      formData.append('nameAr', coach.nameAr)
      formData.append('titleEn', coach.titleEn)
      formData.append('titleAr', coach.titleAr)
      formData.append('bioEn', coach.bioEn)
      formData.append('bioAr', coach.bioAr)
      formData.append('experience', coach.experience.toString())
      formData.append('specialties', coach.specialties)
      formData.append('isActive', coach.isActive.toString())
      formData.append('order', coach.order.toString())
      
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const res = await fetch(`/api/coaches/${coachId}`, {
        method: 'PUT',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to update coach')

      setSuccess('Coach updated successfully!')
      setImageFile(null)
      fetchCoach()
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

  if (!coach) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600">Coach not found.</div>
      </div>
    )
  }

  const specialties = JSON.parse(coach.specialties)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Coach</h1>

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
            {/* Name English */}
            <div>
              <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 mb-2">
                Name (English)
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  id="nameEn"
                  name="nameEn"
                  value={coach.nameEn}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Name Arabic */}
            <div>
              <label htmlFor="nameAr" className="block text-sm font-medium text-gray-700 mb-2">
                Name (Arabic)
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  id="nameAr"
                  name="nameAr"
                  value={coach.nameAr}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  dir="rtl"
                />
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
                  value={coach.titleEn}
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
                  value={coach.titleAr}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  dir="rtl"
                />
              </div>
            </div>

            {/* Bio English */}
            <div>
              <label htmlFor="bioEn" className="block text-sm font-medium text-gray-700 mb-2">
                Bio (English)
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <textarea
                  id="bioEn"
                  name="bioEn"
                  value={coach.bioEn}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
            </div>

            {/* Bio Arabic */}
            <div>
              <label htmlFor="bioAr" className="block text-sm font-medium text-gray-700 mb-2">
                Bio (Arabic)
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <textarea
                  id="bioAr"
                  name="bioAr"
                  value={coach.bioAr}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  dir="rtl"
                ></textarea>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={coach.experience}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialties
              </label>
              <div className="space-y-2">
                {specialties.map((specialty: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Specialty ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpecialty(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <span>+ Add Specialty</span>
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Coach Photo
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
                {coach.imageUrl && (
                  <div className="flex items-center space-x-2">
                    <img src={coach.imageUrl} alt="Current" className="w-16 h-16 object-cover rounded-lg" />
                    <span className="text-sm text-gray-600">Current photo</span>
                  </div>
                )}
                {imageFile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>New photo: {imageFile.name}</span>
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
                value={coach.order}
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
                checked={coach.isActive}
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
                    <span>Update Coach</span>
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
