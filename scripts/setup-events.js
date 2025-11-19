const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupEvents() {
  try {
    console.log('Setting up events tables...')

    // Read the SQL file
    const fs = require('fs')
    const sql = fs.readFileSync('./scripts/create-events-table.sql', 'utf8')

    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim())

    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 50) + '...')
        const { error } = await supabase.rpc('exec', { sql: statement })
        if (error) {
          console.error('Error executing statement:', error)
        } else {
          console.log('✓ Statement executed successfully')
        }
      }
    }

    console.log('✅ Events tables setup completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Run the SQL from scripts/create-events-table.sql manually')
    console.log('4. The events system will be ready to use!')

  } catch (error) {
    console.error('Error setting up events:', error)
  }
}

setupEvents()
