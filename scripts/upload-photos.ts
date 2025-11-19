import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function uploadPhotos() {
  try {
    console.log('Starting photo upload to database...')

    // Upload Gallery Images
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
      { filename: 'IMG_7970.jpeg', titleEn: 'Professional Coaching', titleAr: 'التدريب المهني' },
      { filename: 'IMG_7971.jpeg', titleEn: 'Basketball Excellence', titleAr: 'التميز في كرة السلة' },
      { filename: 'IMG_7972.jpeg', titleEn: 'Training Intensity', titleAr: 'كثافة التدريب' },
      { filename: 'IMG_7973.jpeg', titleEn: 'Team Unity', titleAr: 'وحدة الفريق' },
      { filename: 'IMG_7974.jpeg', titleEn: 'Championship Mindset', titleAr: 'عقلية البطولة' },
      { filename: 'IMG_7975.jpeg', titleEn: 'Academy Pride', titleAr: 'فخر الأكاديمية' },
      { filename: 'IMG_7977.jpeg', titleEn: 'Future Champions', titleAr: 'أبطال المستقبل' },
      { filename: 'IMG_8005.jpeg', titleEn: 'Basketball Passion', titleAr: 'شغف كرة السلة' },
      { filename: 'IMG_8006.jpeg', titleEn: 'Training Dedication', titleAr: 'التفاني في التدريب' },
      { filename: 'IMG_8007.jpeg', titleEn: 'Skill Mastery', titleAr: 'إتقان المهارات' },
      { filename: 'IMG_8008.jpeg', titleEn: 'Team Success', titleAr: 'نجاح الفريق' },
      { filename: 'IMG_8009.jpeg', titleEn: 'Academy Excellence', titleAr: 'تميز الأكاديمية' },
      { filename: 'IMG_8010.jpeg', titleEn: 'Basketball Dreams', titleAr: 'أحلام كرة السلة' },
      { filename: 'IMG_8011.jpeg', titleEn: 'Training Innovation', titleAr: 'ابتكار التدريب' },
      { filename: 'IMG_8012.jpeg', titleEn: 'Championship Spirit', titleAr: 'روح البطولة' },
      { filename: 'IMG_8013.jpeg', titleEn: 'Academy Legacy', titleAr: 'إرث الأكاديمية' }
    ]

    console.log('Uploading gallery images...')
    for (let i = 0; i < galleryImages.length; i++) {
      const image = galleryImages[i]
      await prisma.galleryImage.create({
        data: {
          titleEn: image.titleEn,
          titleAr: image.titleAr,
          imageUrl: `/photos/gallery/${image.filename}`,
          order: i,
          isActive: true
        }
      })
      console.log(`Uploaded gallery image: ${image.filename}`)
    }

    // Upload Coaches
    const coaches = [
      { filename: 'IMG_7964.jpeg', nameEn: 'Coach Ahmed', nameAr: 'المدرب أحمد', titleEn: 'Head Coach', titleAr: 'المدرب الرئيسي', bioEn: 'Professional basketball coach with 10+ years experience', bioAr: 'مدرب كرة سلة محترف مع أكثر من 10 سنوات خبرة', experience: 10, specialties: JSON.stringify(['Leadership', 'Strategy', 'Player Development']) },
      { filename: 'IMG_7965.jpeg', nameEn: 'Coach Sarah', nameAr: 'المدربة سارة', titleEn: 'Assistant Coach', titleAr: 'المدربة المساعدة', bioEn: 'Former professional player turned coach', bioAr: 'لاعبة محترفة سابقة تحولت إلى مدربة', experience: 8, specialties: JSON.stringify(['Skills Training', 'Youth Development', 'Team Building']) },
      { filename: 'IMG_7968.jpeg', nameEn: 'Coach Omar', nameAr: 'المدرب عمر', titleEn: 'Youth Coach', titleAr: 'مدرب الشباب', bioEn: 'Specialized in youth development and training', bioAr: 'متخصص في تطوير وتدريب الشباب', experience: 6, specialties: JSON.stringify(['Youth Training', 'Fundamentals', 'Character Building']) }
    ]

    console.log('Uploading coaches...')
    for (let i = 0; i < coaches.length; i++) {
      const coach = coaches[i]
      await prisma.coach.create({
        data: {
          nameEn: coach.nameEn,
          nameAr: coach.nameAr,
          titleEn: coach.titleEn,
          titleAr: coach.titleAr,
          bioEn: coach.bioEn,
          bioAr: coach.bioAr,
          experience: coach.experience,
          specialties: coach.specialties,
          imageUrl: `/photos/coaches/${coach.filename}`,
          order: i,
          isActive: true
        }
      })
      console.log(`Uploaded coach: ${coach.nameEn}`)
    }

    // Upload Programs
    const programs = [
      { filename: 'IMG_7968.jpeg', titleEn: 'Youth Academy', titleAr: 'أكاديمية الشباب', descriptionEn: 'Comprehensive basketball training for young players', descriptionAr: 'تدريب شامل لكرة السلة للاعبين الشباب', features: JSON.stringify(['Age 8-16', 'Professional coaching', 'Skill development', 'Team building']) },
      { filename: 'IMG_7969.jpeg', titleEn: 'Elite Training', titleAr: 'التدريب النخبوي', descriptionEn: 'Advanced training for serious basketball players', descriptionAr: 'تدريب متقدم للاعبين الجادين في كرة السلة', features: JSON.stringify(['Advanced techniques', 'Competition preparation', 'Mental training', 'Performance analysis']) },
      { filename: 'IMG_7970.jpeg', titleEn: 'Summer Camp', titleAr: 'المعسكر الصيفي', descriptionEn: 'Intensive summer basketball camp program', descriptionAr: 'برنامج معسكر كرة سلة صيفي مكثف', features: JSON.stringify(['Daily training', 'Tournament play', 'Skill workshops', 'Fun activities']) },
      { filename: 'IMG_7971.jpeg', titleEn: 'Private Coaching', titleAr: 'التدريب الخاص', descriptionEn: 'One-on-one personalized basketball coaching', descriptionAr: 'تدريب كرة سلة شخصي فردي', features: JSON.stringify(['Personalized training', 'Flexible schedule', 'Individual attention', 'Custom programs']) }
    ]

    console.log('Uploading programs...')
    for (let i = 0; i < programs.length; i++) {
      const program = programs[i]
      await prisma.program.create({
        data: {
          titleEn: program.titleEn,
          titleAr: program.titleAr,
          descriptionEn: program.descriptionEn,
          descriptionAr: program.descriptionAr,
          features: program.features,
          imageUrl: `/photos/programs/${program.filename}`,
          order: i,
          isActive: true
        }
      })
      console.log(`Uploaded program: ${program.titleEn}`)
    }

    console.log('✅ All photos uploaded successfully to database!')
  } catch (error) {
    console.error('❌ Error uploading photos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

uploadPhotos()
