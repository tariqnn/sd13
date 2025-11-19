import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:Dragon2002%40@db.jwqtvzxiufvinsliewij.supabase.co:5432/postgres'
    }
  }
})

async function setupSupabaseDatabase() {
  try {
    console.log('🚀 Setting up Supabase database...')

    // Push the schema to Supabase
    console.log('📋 Pushing database schema...')
    // This will be done via: npx prisma db push

    // Create admin user
    console.log('👤 Creating admin user...')
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@sd13academy.com' },
      update: {},
      create: {
        email: 'admin@sd13academy.com',
        password: 'admin123', // In production, this should be hashed
        name: 'Admin',
        role: 'admin'
      }
    })
    console.log('✅ Admin user created:', adminUser.email)

    // Create sample hero content
    console.log('🎬 Creating hero content...')
    const heroContent = await prisma.heroContent.upsert({
      where: { id: 'hero-1' },
      update: {},
      create: {
        id: 'hero-1',
        titleEn: 'Welcome to SD13 Sports Academy',
        titleAr: 'مرحباً بكم في أكاديمية SD13 الرياضية',
        subtitleEn: 'Elite Basketball Training in Amman, Jordan',
        subtitleAr: 'تدريب كرة السلة النخبوي في عمان، الأردن',
        descriptionEn: 'Join our premier basketball academy and develop your skills with professional coaching, state-of-the-art facilities, and a championship mindset.',
        descriptionAr: 'انضم إلى أكاديمية كرة السلة الرائدة وطور مهاراتك مع التدريب المهني والمرافق المتطورة وعقلية البطولة.',
        videoUrl: '/videos/hero-video.mp4'
      }
    })
    console.log('✅ Hero content created')

    // Create sample programs
    console.log('🏀 Creating sample programs...')
    const programs = [
      {
        titleEn: 'Youth Academy',
        titleAr: 'أكاديمية الشباب',
        descriptionEn: 'Comprehensive basketball training for young players aged 8-16',
        descriptionAr: 'تدريب شامل لكرة السلة للاعبين الشباب من سن 8-16',
        features: JSON.stringify(['Age 8-16', 'Professional coaching', 'Skill development', 'Team building']),
        imageUrl: '/photos/programs/IMG_7968.jpeg',
        order: 0
      },
      {
        titleEn: 'Elite Training',
        titleAr: 'التدريب النخبوي',
        descriptionEn: 'Advanced training for serious basketball players',
        descriptionAr: 'تدريب متقدم للاعبين الجادين في كرة السلة',
        features: JSON.stringify(['Advanced techniques', 'Competition preparation', 'Mental training', 'Performance analysis']),
        imageUrl: '/photos/programs/IMG_7969.jpeg',
        order: 1
      }
    ]

    for (let i = 0; i < programs.length; i++) {
      const program = programs[i]
      await prisma.program.upsert({
        where: { id: `program-${i}` },
        update: {},
        create: {
          id: `program-${i}`,
          ...program
        }
      })
    }
    console.log('✅ Sample programs created')

    // Create sample coaches
    console.log('👨‍🏫 Creating sample coaches...')
    const coaches = [
      {
        nameEn: 'Coach Ahmed',
        nameAr: 'المدرب أحمد',
        titleEn: 'Head Coach',
        titleAr: 'المدرب الرئيسي',
        bioEn: 'Professional basketball coach with 10+ years experience',
        bioAr: 'مدرب كرة سلة محترف مع أكثر من 10 سنوات خبرة',
        experience: 10,
        specialties: JSON.stringify(['Leadership', 'Strategy', 'Player Development']),
        imageUrl: '/photos/coaches/IMG_7964.jpeg',
        order: 0
      }
    ]

    for (let i = 0; i < coaches.length; i++) {
      const coach = coaches[i]
      await prisma.coach.upsert({
        where: { id: `coach-${i}` },
        update: {},
        create: {
          id: `coach-${i}`,
          ...coach
        }
      })
    }
    console.log('✅ Sample coaches created')

    console.log('🎉 Supabase database setup complete!')
    console.log('📊 You can now:')
    console.log('   - Access admin panel at: http://localhost:3000/admin-access')
    console.log('   - Login with: admin@sd13academy.com / admin123')
    console.log('   - View your Supabase dashboard at: https://supabase.com/dashboard/project/jwqtvzxiufvinsliewij')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupSupabaseDatabase()
