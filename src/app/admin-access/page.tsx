'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function AdminAccess() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        // Check if user is admin
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('email', email)
          .single()

        if (userError || !userData || userData.role !== 'admin') {
          setError('Access denied. Admin privileges required.')
          await supabase.auth.signOut()
        } else {
          // Store session in localStorage for admin check
          localStorage.setItem('adminLoggedIn', 'true')
          localStorage.setItem('adminEmail', email)
          router.push('/admin')
        }
      }
    } catch (err: any) {
      setError('Login failed. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            minHeight: '100vh',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          preload="metadata"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-700/20 to-blue-800/20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16">
              <svg width="64" height="64" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#B8A16F" />
                <path d="M 12 20 L 20 12 L 28 20 L 20 28 Z" fill="white" />
                <circle cx="20" cy="20" r="4" fill="#B8A16F" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600">SD13 Sports Academy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="admin@sd13academy.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            style={{
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
            }}
          >
            {loading ? 'Signing in...' : 'Access Admin Panel'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <strong>Admin credentials:</strong><br/>
            Email: admin@sd13academy.com<br/>
            Password: SecurePassword123!
          </p>
        </div>

        <div className="mt-6 text-center">
          <motion.a 
            href="/" 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
          >
            <span>←</span>
            <span>Back to Homepage</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
