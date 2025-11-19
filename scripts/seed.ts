import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sd13academy.com' },
    update: {},
    create: {
      email: 'admin@sd13academy.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  })

  console.log('Admin user created:', admin.email)

  // Create hero content
  const heroContent = await prisma.heroContent.upsert({
    where: { id: 'hero-1' },
    update: {},
    create: {
      id: 'hero-1',
      titleEn: 'Elite Basketball Training',
      titleAr: 'تدريب كرة السلة النخبة',
      subtitleEn: 'SD13 Sports Academy',
      subtitleAr: 'أكاديمية SD13 الرياضية',
      descriptionEn: 'Transform your game with professional coaching, world-class facilities, and a winning mindset. Join Jordan\'s premier basketball academy.',
      descriptionAr: 'حول لعبتك مع التدريب المهني والمرافق عالمية المستوى وعقلية الفوز. انضم إلى أكاديمية كرة السلة الرائدة في الأردن.',
      videoUrl: '/hero-video.mp4'
    }
  })

  console.log('Hero content created')

  // Create sample programs
  const programs = [
    {
      titleEn: 'Youth Academy',
      titleAr: 'أكاديمية الشباب',
      descriptionEn: 'Comprehensive basketball training for young athletes aged 8-16. Focus on fundamentals, teamwork, and character development.',
      descriptionAr: 'تدريب شامل لكرة السلة للرياضيين الشباب من سن 8-16. التركيز على الأساسيات والعمل الجماعي وتطوير الشخصية.',
      features: JSON.stringify([
        'Age-appropriate training',
        'Fundamental skills development',
        'Team building activities',
        'Character development',
        'Regular assessments'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
      order: 1
    },
    {
      titleEn: 'Elite Training',
      titleAr: 'تدريب النخبة',
      descriptionEn: 'Advanced training program for serious athletes looking to compete at the highest level. Intensive skill development and performance optimization.',
      descriptionAr: 'برنامج تدريب متقدم للرياضيين الجادين الذين يتطلعون للتنافس على أعلى مستوى. تطوير المهارات المكثف وتحسين الأداء.',
      features: JSON.stringify([
        'Advanced skill training',
        'Performance analytics',
        'Mental conditioning',
        'Competition preparation',
        'Individual coaching'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      order: 2
    },
    {
      titleEn: 'Summer Camp',
      titleAr: 'المعسكر الصيفي',
      descriptionEn: 'Fun and intensive summer basketball camp for all skill levels. Perfect for improving skills during the off-season.',
      descriptionAr: 'معسكر كرة سلة صيفي ممتع ومكثف لجميع المستويات. مثالي لتحسين المهارات خلال فترة الراحة.',
      features: JSON.stringify([
        'Daily training sessions',
        'Skill competitions',
        'Team tournaments',
        'Fun activities',
        'Certificates of completion'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      order: 3
    },
    {
      titleEn: 'Private Coaching',
      titleAr: 'التدريب الخاص',
      descriptionEn: 'One-on-one personalized coaching sessions tailored to individual needs and goals. Maximum attention and customized training plans.',
      descriptionAr: 'جلسات تدريب شخصية فردية مصممة خصيصاً للاحتياجات والأهداف الفردية. أقصى قدر من الاهتمام وخطط التدريب المخصصة.',
      features: JSON.stringify([
        'Personalized training plans',
        'Individual attention',
        'Flexible scheduling',
        'Progress tracking',
        'Goal-oriented approach'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      order: 4
    }
  ]

  for (const program of programs) {
    await prisma.program.upsert({
      where: { id: `program-${program.order}` },
      update: {},
      create: {
        id: `program-${program.order}`,
        ...program
      }
    })
  }

  console.log('Programs created')

  // Create sample coaches
  const coaches = [
    {
      nameEn: 'Coach Ahmad',
      nameAr: 'المدرب أحمد',
      titleEn: 'Head Coach',
      titleAr: 'المدرب الرئيسي',
      bioEn: 'Former professional basketball player with 15 years of coaching experience. Specializes in youth development and team strategy.',
      bioAr: 'لاعب كرة سلة محترف سابق مع 15 عاماً من الخبرة في التدريب. متخصص في تطوير الشباب واستراتيجية الفريق.',
      experience: 15,
      specialties: JSON.stringify(['Youth Development', 'Team Strategy', 'Shooting', 'Defense']),
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
      order: 1
    },
    {
      nameEn: 'Coach Sarah',
      nameAr: 'المدربة سارة',
      titleEn: 'Assistant Coach',
      titleAr: 'المدربة المساعدة',
      bioEn: 'Certified basketball coach with expertise in skill development and player conditioning. Passionate about empowering young athletes.',
      bioAr: 'مدربة كرة سلة معتمدة مع خبرة في تطوير المهارات وتكييف اللاعبين. شغوفة بتمكين الرياضيين الشباب.',
      experience: 8,
      specialties: JSON.stringify(['Skill Development', 'Conditioning', 'Mental Training', 'Leadership']),
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500',
      order: 2
    },
    {
      nameEn: 'Coach Omar',
      nameAr: 'المدرب عمر',
      titleEn: 'Skills Coach',
      titleAr: 'مدرب المهارات',
      bioEn: 'Former college basketball player specializing in individual skill development and shooting techniques.',
      bioAr: 'لاعب كرة سلة جامعي سابق متخصص في تطوير المهارات الفردية وتقنيات التسديد.',
      experience: 6,
      specialties: JSON.stringify(['Shooting', 'Ball Handling', 'Footwork', 'Individual Skills']),
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500',
      order: 3
    }
  ]

  for (const coach of coaches) {
    await prisma.coach.upsert({
      where: { id: `coach-${coach.order}` },
      update: {},
      create: {
        id: `coach-${coach.order}`,
        ...coach
      }
    })
  }

  console.log('Coaches created')

  // Create sample testimonials
  const testimonials = [
    {
      nameEn: 'Mohammed Al-Rashid',
      nameAr: 'محمد الراشد',
      textEn: 'SD13 Academy transformed my son\'s basketball skills. The coaches are professional and the facilities are world-class.',
      textAr: 'أكاديمية SD13 حولت مهارات كرة السلة لابني. المدربون محترفون والمرافق عالمية المستوى.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      order: 1
    },
    {
      nameEn: 'Fatima Hassan',
      nameAr: 'فاطمة حسن',
      textEn: 'The best basketball academy in Jordan. My daughter has improved tremendously in just 6 months.',
      textAr: 'أفضل أكاديمية كرة سلة في الأردن. ابنتي تحسنت بشكل كبير في 6 أشهر فقط.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      order: 2
    },
    {
      nameEn: 'Khalid Al-Mahmoud',
      nameAr: 'خالد المحمود',
      textEn: 'Professional coaching and excellent facilities. Highly recommend SD13 Academy for serious basketball training.',
      textAr: 'تدريب احترافي ومرافق ممتازة. أنصح بشدة بأكاديمية SD13 للتدريب الجاد في كرة السلة.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      order: 3
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${testimonial.order}` },
      update: {},
      create: {
        id: `testimonial-${testimonial.order}`,
        ...testimonial
      }
    })
  }

  console.log('Testimonials created')

  // Create contact info
  const contactInfo = await prisma.contactInfo.upsert({
    where: { id: 'contact-1' },
    update: {},
    create: {
      id: 'contact-1',
      phone: '+962 6 123 4567',
      email: 'info@sd13academy.com',
      addressEn: 'Amman, Jordan - Business Park',
      addressAr: 'عمان، الأردن - المنطقة التجارية',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.344!2d35.8338515!3d31.9717977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca17ed1965e8d%3A0xd93a3913affa5945!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1640000000000!5m2!1sen!2sjo'
    }
  })

  console.log('Contact info created')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
