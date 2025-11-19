'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Upload, Plus, X } from 'lucide-react'

export default function NewProgram() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    features: [''],
    image: null as File | null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('titleEn', formData.titleEn)
      formDataToSend.append('titleAr', formData.titleAr)
      formDataToSend.append('descriptionEn', formData.descriptionEn)
      formDataToSend.append('descriptionAr', formData.descriptionAr)
      formDataToSend.append('features', JSON.stringify(formData.features.filter(f => f.trim())))
      
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await fetch('/api/programs', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        alert('Error creating program')
      }
    } catch (error) {
      console.error('Error creating program:', error)
      alert('Error creating program')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({
      ...formData,
      image: file
    })
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({
      ...formData,
      features: newFeatures
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Program</h1>
                <p className="text-sm text-gray-600">Create a new training program</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* English Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">English Content</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-2">
                    Program Title
                  </label>
                  <input
                    type="text"
                    id="titleEn"
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Youth Academy"
                  />
                </div>
                <div>
                  <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="descriptionEn"
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Comprehensive basketball training for young athletes..."
                  />
                </div>
              </div>
            </div>

            {/* Arabic Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Arabic Content</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="titleAr" className="block text-sm font-medium text-gray-700 mb-2">
                    Program Title (Arabic)
                  </label>
                  <input
                    type="text"
                    id="titleAr"
                    name="titleAr"
                    value={formData.titleAr}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أكاديمية الشباب"
                  />
                </div>
                <div>
                  <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Arabic)
                  </label>
                  <textarea
                    id="descriptionAr"
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="تدريب شامل لكرة السلة للرياضيين الشباب..."
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Program Features</h2>
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter a feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Feature</span>
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Program Image</h2>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Selected: {formData.image.name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Creating...' : 'Create Program'}</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
