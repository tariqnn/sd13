import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jwqtvzxiufvinsliewij.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXR2enhpdWZ2aW5zbGlld2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjYwODEsImV4cCI6MjA3NjQwMjA4MX0.xuVvsMTtCVAOLpWYF930elkPI6j5WrzD_uOzQCF38Y0'

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable')
}

// Create a singleton client to avoid multiple instances
let supabase: any = null

if (typeof window !== 'undefined') {
  // Client-side: use singleton pattern
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} else {
  // Server-side: create new instance
  supabase = createClient(supabaseUrl, supabaseKey)
}

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXR2enhpdWZ2aW5zbGlld2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgyNjA4MSwiZXhwIjoyMDc2NDAyMDgxfQ.vo_IezjNwPrCVX236xSOoTbEfkqa26smOzeOlK_-iek',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export { supabase }