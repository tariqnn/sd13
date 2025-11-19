const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = 'https://jwqtvzxiufvinsliewij.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXR2enhpdWZ2aW5zbGlld2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgyNjA4MSwiZXhwIjoyMDc2NDAyMDgxfQ.vo_IezjNwPrCVX236xSOoTbEfkqa26smOzeOlK_-iek'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...')

    // 1. Create Admin User
    console.log('👤 Creating admin user...')
    const hashedPassword = await bcrypt.hash('SecurePassword123!', 10)
    
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert({
        email: 'admin@sd13academy.com',
        password: hashedPassword,
        name: 'SD13 Admin',
        role: 'admin'
      }, { onConflict: 'email' })

    if (userError) {
      console.log('⚠️  User creation error:', userError.message)
    } else {
      console.log('✅ Admin user created/updated')
    }

    // 2. Create Hero Content
    console.log('🎬 Creating hero content...')
    const { data: heroData, error: heroError } = await supabase
      .from('hero_content')
      .upsert({
        id: 'hero-1',
        title_en: 'Welcome to SD13 Sports Academy',
        title_ar: 'مرحباً بكم في أكاديمية SD13 الرياضية',
        subtitle_en: 'Where Champions Are Made',
        subtitle_ar: 'حيث يتم صنع الأبطال',
        description_en: 'Join Jordan\'s premier basketball academy and unlock your potential. Professional coaching, state-of-the-art facilities, and a winning culture await you.',
        description_ar: 'انضم إلى أكاديمية كرة السلة الرائدة في الأردن واكتشف إمكاناتك. تدريب احترافي ومرافق متطورة وثقافة الفوز في انتظارك.',
        video_url: '/hero-video.mp4'
      }, { onConflict: 'id' })

    if (heroError) {
      console.log('⚠️  Hero content error:', heroError.message)
    } else {
      console.log('✅ Hero content created/updated')
    }

    // 3. Create Programs
    console.log('🏀 Creating programs...')
    const programs = [
      {
        id: 'program-1',
        title_en: 'Youth Development Program',
        title_ar: 'برنامج تطوير الشباب',
        description_en: 'Comprehensive basketball training for ages 8-14. Focus on fundamentals, teamwork, and character development.',
        description_ar: 'تدريب شامل لكرة السلة للأعمار 8-14. التركيز على الأساسيات والعمل الجماعي وتطوير الشخصية.',
        image_url: '/photos/programs/IMG_7968.jpeg',
        features: JSON.stringify([
          'Age-appropriate training',
          'Fundamental skills development',
          'Team building activities',
          'Character development',
          'Parent communication'
        ]),
        is_active: true,
        order: 1
      },
      {
        id: 'program-2',
        title_en: 'Elite Training Program',
        title_ar: 'برنامج التدريب النخبوي',
        description_en: 'Advanced training for serious players aged 15-18. Intensive skill development and competitive preparation.',
        description_ar: 'تدريب متقدم للاعبين الجادين من عمر 15-18. تطوير مكثف للمهارات والتحضير للمنافسة.',
        image_url: '/photos/programs/IMG_7969.jpeg',
        features: JSON.stringify([
          'Advanced skill development',
          'Competitive preparation',
          'Strength and conditioning',
          'Mental training',
          'College recruitment support'
        ]),
        is_active: true,
        order: 2
      },
      {
        id: 'program-3',
        title_en: 'Lady Hoopers Program',
        title_ar: 'برنامج ليدي هوبرز',
        description_en: 'Specialized program for female basketball players. Empowering women through sport and building confidence.',
        description_ar: 'برنامج متخصص للاعبات كرة السلة. تمكين النساء من خلال الرياضة وبناء الثقة.',
        image_url: '/photos/programs/IMG_7970.jpeg',
        features: JSON.stringify([
          'Female-focused coaching',
          'Confidence building',
          'Leadership development',
          'Community support',
          'Mentorship programs'
        ]),
        is_active: true,
        order: 3
      },
      {
        id: 'program-4',
        title_en: 'Adult Basketball League',
        title_ar: 'دوري كرة السلة للكبار',
        description_en: 'Competitive league for adult players. Stay active, improve your game, and enjoy the sport you love.',
        description_ar: 'دوري تنافسي للاعبين الكبار. ابق نشطاً وحسّن لعبتك واستمتع بالرياضة التي تحبها.',
        image_url: '/photos/programs/IMG_7971.jpeg',
        features: JSON.stringify([
          'Competitive games',
          'Skill improvement',
          'Fitness maintenance',
          'Social networking',
          'Flexible scheduling'
        ]),
        is_active: true,
        order: 4
      }
    ]

    for (const program of programs) {
      const { error } = await supabase
        .from('programs')
        .upsert(program, { onConflict: 'id' })
      
      if (error) {
        console.log(`⚠️  Program ${program.id} error:`, error.message)
      } else {
        console.log(`✅ Program ${program.id} created/updated`)
      }
    }

    // 4. Create Coaches
    console.log('👨‍🏫 Creating coaches...')
    const coaches = [
      {
        id: 'coach-1',
        name_en: 'Coach Ahmad',
        name_ar: 'المدرب أحمد',
        title_en: 'Head Coach',
        title_ar: 'المدرب الرئيسي',
        bio_en: 'Former professional player with 15 years of coaching experience. Specializes in youth development and team building.',
        bio_ar: 'لاعب محترف سابق مع 15 عاماً من الخبرة في التدريب. متخصص في تطوير الشباب وبناء الفريق.',
        image_url: '/photos/coaches/IMG_7964.jpeg',
        experience: 15,
        specialties: JSON.stringify(['Youth Development', 'Team Building', 'Fundamentals']),
        is_active: true,
        order: 1
      },
      {
        id: 'coach-2',
        name_en: 'Coach Sarah',
        name_ar: 'المدربة سارة',
        title_en: 'Assistant Coach',
        title_ar: 'المدربة المساعدة',
        bio_en: 'Former college player and certified trainer. Focuses on skill development and player confidence.',
        bio_ar: 'لاعبة جامعية سابقة ومدربة معتمدة. تركز على تطوير المهارات وثقة اللاعبين.',
        image_url: '/photos/coaches/IMG_7965.jpeg',
        experience: 8,
        specialties: JSON.stringify(['Skill Development', 'Player Confidence', 'Mental Training']),
        is_active: true,
        order: 2
      },
      {
        id: 'coach-3',
        name_en: 'Coach Omar',
        name_ar: 'المدرب عمر',
        title_en: 'Strength & Conditioning Coach',
        title_ar: 'مدرب القوة والتكييف',
        bio_en: 'Certified strength and conditioning specialist. Helps players reach their physical potential.',
        bio_ar: 'أخصائي معتمد في القوة والتكييف. يساعد اللاعبين على الوصول إلى إمكاناتهم الجسدية.',
        image_url: '/photos/coaches/IMG_7968.jpeg',
        experience: 10,
        specialties: JSON.stringify(['Strength Training', 'Conditioning', 'Injury Prevention']),
        is_active: true,
        order: 3
      }
    ]

    for (const coach of coaches) {
      const { error } = await supabase
        .from('coaches')
        .upsert(coach, { onConflict: 'id' })
      
      if (error) {
        console.log(`⚠️  Coach ${coach.id} error:`, error.message)
      } else {
        console.log(`✅ Coach ${coach.id} created/updated`)
      }
    }

    // 5. Create Testimonials
    console.log('💬 Creating testimonials...')
    const testimonials = [
      {
        id: 'testimonial-1',
        name_en: 'Mohammad Al-Rashid',
        name_ar: 'محمد الراشد',
        text_en: 'SD13 Academy transformed my son\'s basketball skills and confidence. The coaches are amazing!',
        text_ar: 'أكاديمية SD13 غيرت مهارات ابني في كرة السلة وثقته. المدربون رائعون!',
        rating: 5,
        image_url: '/photos/testimonials/IMG_8005.jpeg',
        is_active: true,
        order: 1
      },
      {
        id: 'testimonial-2',
        name_en: 'Fatima Al-Zahra',
        name_ar: 'فاطمة الزهراء',
        text_en: 'The Lady Hoopers program helped me become a better player and person. Highly recommended!',
        text_ar: 'برنامج ليدي هوبرز ساعدني لأصبح لاعبة وشخصاً أفضل. أنصح به بشدة!',
        rating: 5,
        image_url: '/photos/testimonials/IMG_8006.jpeg',
        is_active: true,
        order: 2
      },
      {
        id: 'testimonial-3',
        name_en: 'Khalid Al-Mansouri',
        name_ar: 'خالد المنصوري',
        text_en: 'Professional coaching and excellent facilities. My daughter loves coming here every week.',
        text_ar: 'تدريب احترافي ومرافق ممتازة. ابنتي تحب المجيء هنا كل أسبوع.',
        rating: 5,
        image_url: '/photos/testimonials/IMG_8007.jpeg',
        is_active: true,
        order: 3
      },
      {
        id: 'testimonial-4',
        name_en: 'Layla Al-Hassan',
        name_ar: 'ليلى الحسن',
        text_en: 'The best basketball academy in Jordan. The coaches care about each player\'s development.',
        text_ar: 'أفضل أكاديمية كرة سلة في الأردن. المدربون يهتمون بتطوير كل لاعب.',
        rating: 5,
        image_url: '/photos/testimonials/IMG_8008.jpeg',
        is_active: true,
        order: 4
      }
    ]

    for (const testimonial of testimonials) {
      const { error } = await supabase
        .from('testimonials')
        .upsert(testimonial, { onConflict: 'id' })
      
      if (error) {
        console.log(`⚠️  Testimonial ${testimonial.id} error:`, error.message)
      } else {
        console.log(`✅ Testimonial ${testimonial.id} created/updated`)
      }
    }

    // 6. Create Gallery Images
    console.log('🖼️  Creating gallery images...')
    const galleryImages = [
      { filename: 'DSC06058-2.jpg', titleEn: 'Training Session', titleAr: 'جلسة تدريب' },
      { filename: 'DSC06065-2.jpg', titleEn: 'Team Practice', titleAr: 'تدريب الفريق' },
      { filename: 'DSC06080-2.jpg', titleEn: 'Skills Development', titleAr: 'تطوير المهارات' },
      { filename: 'DSC06154-2.jpg', titleEn: 'Game Preparation', titleAr: 'التحضير للمباراة' },
      { filename: 'DSC06176.jpg', titleEn: 'Youth Training', titleAr: 'تدريب الشباب' },
      { filename: 'DSC06261.jpg', titleEn: 'Elite Training', titleAr: 'التدريب النخبوي' },
      { filename: 'DSC06290.jpg', titleEn: 'Coaching Session', titleAr: 'جلسة تدريب' },
      { filename: 'DSC06298.jpg', titleEn: 'Team Building', titleAr: 'بناء الفريق' },
      { filename: 'DSC06312.jpg', titleEn: 'Championship Training', titleAr: 'تدريب البطولة' },
      { filename: 'IMG_3772.jpeg', titleEn: 'Academy Facility', titleAr: 'مرافق الأكاديمية' },
      { filename: 'IMG_4171.jpeg', titleEn: 'Training Court', titleAr: 'ملعب التدريب' },
      { filename: 'IMG_7961.jpeg', titleEn: 'Basketball Action', titleAr: 'حركة كرة السلة' },
      { filename: 'IMG_7964.jpeg', titleEn: 'Player Development', titleAr: 'تطوير اللاعبين' },
      { filename: 'IMG_7965.jpeg', titleEn: 'Team Strategy', titleAr: 'استراتيجية الفريق' },
      { filename: 'IMG_7968.jpeg', titleEn: 'Skills Training', titleAr: 'تدريب المهارات' },
      { filename: 'IMG_7969.jpeg', titleEn: 'Youth Academy', titleAr: 'أكاديمية الشباب' },
      { filename: 'IMG_7970.jpeg', titleEn: 'Professional Coaching', titleAr: 'التدريب الاحترافي' },
      { filename: 'IMG_7971.jpeg', titleEn: 'Team Spirit', titleAr: 'روح الفريق' },
      { filename: 'IMG_7972.jpeg', titleEn: 'Training Excellence', titleAr: 'التميز في التدريب' },
      { filename: 'IMG_7973.jpeg', titleEn: 'Basketball Skills', titleAr: 'مهارات كرة السلة' },
      { filename: 'IMG_7974.jpeg', titleEn: 'Team Building', titleAr: 'بناء الفريق' },
      { filename: 'IMG_7975.jpeg', titleEn: 'Youth Programs', titleAr: 'برامج الشباب' },
      { filename: 'IMG_7977.jpeg', titleEn: 'Elite Training', titleAr: 'التدريب النخبوي' },
      { filename: 'IMG_8009.jpeg', titleEn: 'Training Excellence', titleAr: 'التميز في التدريب' },
      { filename: 'IMG_8010.jpeg', titleEn: 'Sports Development', titleAr: 'التطوير الرياضي' },
      { filename: 'IMG_8011.jpeg', titleEn: 'Athletic Achievement', titleAr: 'الإنجاز الرياضي' },
      { filename: 'IMG_8012.jpeg', titleEn: 'Basketball Academy', titleAr: 'أكاديمية كرة السلة' },
      { filename: 'IMG_8013.jpeg', titleEn: 'SD13 Sports', titleAr: 'SD13 الرياضية' }
    ]

    for (let i = 0; i < galleryImages.length; i++) {
      const image = galleryImages[i]
      const { error } = await supabase
        .from('gallery_images')
        .upsert({
          id: `gallery-${i + 1}`,
          title_en: image.titleEn,
          title_ar: image.titleAr,
          image_url: `/photos/gallery/${image.filename}`,
          category: 'general',
          is_active: true,
          order: i + 1
        }, { onConflict: 'id' })
      
      if (error) {
        console.log(`⚠️  Gallery image ${i + 1} error:`, error.message)
      } else {
        console.log(`✅ Gallery image ${i + 1} created/updated`)
      }
    }

    // 7. Create Contact Info
    console.log('📞 Creating contact info...')
    const { data: contactData, error: contactError } = await supabase
      .from('contact_info')
      .upsert({
        id: 'contact-1',
        phone: '+962 6 123 4567',
        email: 'info@sd13academy.com',
        address_en: 'Business Park, Amman, Jordan',
        address_ar: 'المنطقة التجارية، عمان، الأردن',
        map_embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.1234567890!2d35.1234567!3d31.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA3JzI0LjQiTiAzNcKwMDcnMjQuNCJF!5e0!3m2!1sen!2sjo!4v1234567890123!5m2!1sen!2sjo" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
      }, { onConflict: 'id' })

    if (contactError) {
      console.log('⚠️  Contact info error:', contactError.message)
    } else {
      console.log('✅ Contact info created/updated')
    }

    // 8. Create Site Settings
    console.log('⚙️  Creating site settings...')
    const { data: settingsData, error: settingsError } = await supabase
      .from('site_settings')
      .upsert({
        id: 'settings-1',
        site_name_en: 'SD13 Sports Academy',
        site_name_ar: 'أكاديمية SD13 الرياضية',
        logo_url: '/logo.svg',
        favicon_url: '/logo.svg',
        meta_description_en: 'Jordan\'s premier basketball academy. Professional coaching, state-of-the-art facilities, and a winning culture.',
        meta_description_ar: 'أكاديمية كرة السلة الرائدة في الأردن. تدريب احترافي ومرافق متطورة وثقافة الفوز.',
        meta_keywords_en: 'basketball, academy, training, Jordan, sports, coaching, youth development',
        meta_keywords_ar: 'كرة السلة، أكاديمية، تدريب، الأردن، رياضة، تدريب، تطوير الشباب'
      }, { onConflict: 'id' })

    if (settingsError) {
      console.log('⚠️  Site settings error:', settingsError.message)
    } else {
      console.log('✅ Site settings created/updated')
    }

    console.log('🎉 Database seeding completed successfully!')
    console.log('📊 Summary:')
    console.log('   - 1 Admin user created')
    console.log('   - 1 Hero content created')
    console.log('   - 4 Programs created')
    console.log('   - 3 Coaches created')
    console.log('   - 4 Testimonials created')
    console.log('   - 28 Gallery images created')
    console.log('   - 1 Contact info created')
    console.log('   - 1 Site settings created')

  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
  }
}

seedDatabase()
