import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jwqtvzxiufvinsliewij.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXR2enhpdWZ2aW5zbGlld2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjYwODEsImV4cCI6MjA3NjQwMjA4MX0.xuVvsMTtCVAOLpWYF930elkPI6j5WrzD_uOzQCF38Y0'

// Allow preview mode without database
const isPreviewMode = !supabaseKey || supabaseKey.includes('your-') || supabaseKey === ''

// Create a singleton client to avoid multiple instances
let supabase: any = null

// Create a mock client for preview mode that returns errors (so API routes use mock data)
const createMockClient = () => ({
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        order: (column: string, options?: any) => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
        }),
        single: () => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
      }),
      order: (column: string, options?: any) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
      }),
      single: () => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
    }),
    insert: (values: any) => ({
      select: (columns?: string) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
      })
    }),
    update: (values: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: { message: 'Preview mode - no database' } })
    })
  })
})

if (isPreviewMode) {
  // Use mock client in preview mode
  supabase = createMockClient() as any
} else if (typeof window !== 'undefined') {
  // Client-side: use singleton pattern
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} else {
  // Server-side: create new instance
  supabase = createClient(supabaseUrl, supabaseKey)
}

// For server-side operations
export const supabaseAdmin = isPreviewMode 
  ? createMockClient() as any
  : createClient(
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