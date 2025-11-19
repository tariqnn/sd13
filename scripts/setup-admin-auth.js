const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://jwqtvzxiufvinsliewij.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXR2enhpdWZ2aW5zbGlld2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgyNjA4MSwiZXhwIjoyMDc2NDAyMDgxfQ.vo_IezjNwPrCVX236xSOoTbEfkqa26smOzeOlK_-iek'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupAdminAuth() {
  try {
    console.log('🔐 Setting up admin authentication...')
    
    // Create admin user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@sd13academy.com',
      password: 'SecurePassword123!',
      email_confirm: true,
      user_metadata: {
        name: 'SD13 Admin',
        role: 'admin'
      }
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('✅ Admin user already exists in Supabase Auth')
      } else {
        console.log('⚠️  Auth error:', authError.message)
      }
    } else {
      console.log('✅ Admin user created in Supabase Auth:', authData.user?.email)
    }

    // Update the user in our users table to match
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert({
        email: 'admin@sd13academy.com',
        password: 'hashed_in_supabase_auth', // Password is handled by Supabase Auth
        name: 'SD13 Admin',
        role: 'admin'
      }, { onConflict: 'email' })

    if (userError) {
      console.log('⚠️  User table error:', userError.message)
    } else {
      console.log('✅ Admin user updated in users table')
    }

    console.log('🎉 Admin authentication setup completed!')
    console.log('📧 Email: admin@sd13academy.com')
    console.log('🔑 Password: SecurePassword123!')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

setupAdminAuth()
