// Mock data for preview deployment without database

export const mockHeroContent = {
  id: '1',
  titleEn: 'SD13 SPORTS ACADEMY',
  titleAr: 'أكاديمية SD13 الرياضية',
  subtitleEn: 'Where Champions Are Made',
  subtitleAr: 'حيث يتم صنع الأبطال',
  descriptionEn: 'Elite basketball training and development for athletes of all levels. Join Jordan\'s premier sports academy and take your game to the next level.',
  descriptionAr: 'تدريب وتطوير كرة السلة النخبة للرياضيين من جميع المستويات. انضم إلى أكاديمية الرياضة الرائدة في الأردن وارفع مستوى لعبتك.',
  videoUrl: '/videos/hero-video.mp4'
}

export const mockPrograms = [
  {
    id: '1',
    title_en: 'Youth Basketball Academy',
    title_ar: 'أكاديمية كرة السلة للشباب',
    description_en: 'Comprehensive training program for young athletes aged 8-16. Focus on fundamentals, skill development, and character building.',
    description_ar: 'برنامج تدريبي شامل للرياضيين الشباب من سن 8-16. التركيز على الأساسيات وتطوير المهارات وبناء الشخصية.',
    features: JSON.stringify(['Professional Coaching', 'Skill Development', 'Team Building', 'Physical Conditioning']),
    image_url: '/photos/programs/IMG_7968.jpeg',
    is_active: true,
    order: 1
  },
  {
    id: '2',
    title_en: 'Elite Training Program',
    title_ar: 'برنامج التدريب النخبة',
    description_en: 'Advanced training for competitive players. Intensive sessions focusing on game strategy, advanced techniques, and performance optimization.',
    description_ar: 'تدريب متقدم للاعبين التنافسيين. جلسات مكثفة تركز على استراتيجية اللعبة والتقنيات المتقدمة وتحسين الأداء.',
    features: JSON.stringify(['Advanced Techniques', 'Game Strategy', 'Performance Analysis', 'Competition Prep']),
    image_url: '/photos/programs/IMG_7969.jpeg',
    is_active: true,
    order: 2
  },
  {
    id: '3',
    title_en: 'Summer Basketball Camp',
    title_ar: 'معسكر كرة السلة الصيفي',
    description_en: 'Intensive summer program combining training, competition, and fun. Perfect for athletes looking to improve during the off-season.',
    description_ar: 'برنامج صيفي مكثف يجمع بين التدريب والمنافسة والمرح. مثالي للرياضيين الذين يتطلعون إلى التحسين خلال موسم الراحة.',
    features: JSON.stringify(['Daily Training', 'Scrimmages', 'Skill Workshops', 'Team Activities']),
    image_url: '/photos/programs/IMG_7970.jpeg',
    is_active: true,
    order: 3
  }
]

export const mockCoaches = [
  {
    id: '1',
    name_en: 'Coach Ahmad Al-Mansour',
    name_ar: 'المدرب أحمد المنصور',
    title_en: 'Head Coach',
    title_ar: 'المدرب الرئيسي',
    bio_en: 'With over 15 years of coaching experience, Coach Ahmad has trained numerous professional players and led teams to multiple championships.',
    bio_ar: 'مع أكثر من 15 عامًا من الخبرة في التدريب، درب المدرب أحمد العديد من اللاعبين المحترفين وقاد الفرق إلى بطولات متعددة.',
    experience: 15,
    specialties: 'Game Strategy, Player Development, Team Leadership',
    image_url: '/photos/gallery/DSC06058-2.jpg',
    is_active: true,
    order: 1
  },
  {
    id: '2',
    name_en: 'Coach Sarah Johnson',
    name_ar: 'المدربة سارة جونسون',
    title_en: 'Skills Development Coach',
    title_ar: 'مدربة تطوير المهارات',
    bio_en: 'Specialized in youth development and fundamental skills training. Known for her patient approach and ability to bring out the best in young athletes.',
    bio_ar: 'متخصصة في تطوير الشباب وتدريب المهارات الأساسية. معروفة بمنهجها الصبور وقدرتها على إظهار أفضل ما لدى الرياضيين الشباب.',
    experience: 10,
    specialties: 'Youth Development, Fundamentals, Shooting Techniques',
    image_url: '/photos/gallery/DSC06065-2.jpg',
    is_active: true,
    order: 2
  },
  {
    id: '3',
    name_en: 'Coach Michael Thompson',
    name_ar: 'المدرب مايكل طومسون',
    title_en: 'Performance Coach',
    title_ar: 'مدرب الأداء',
    bio_en: 'Former professional player with expertise in physical conditioning and performance optimization. Helps athletes reach their peak potential.',
    bio_ar: 'لاعب محترف سابق يتمتع بخبرة في التكييف البدني وتحسين الأداء. يساعد الرياضيين على الوصول إلى إمكاناتهم القصوى.',
    experience: 12,
    specialties: 'Physical Conditioning, Performance Analysis, Injury Prevention',
    image_url: '/photos/gallery/DSC06080-2.jpg',
    is_active: true,
    order: 3
  }
]

export const mockTestimonials = [
  {
    id: '1',
    name_en: 'Omar Hassan',
    name_ar: 'عمر حسن',
    text_en: 'SD13 Academy transformed my game completely. The coaches are professional and the training is world-class. I\'ve improved so much in just one year!',
    text_ar: 'غيرت أكاديمية SD13 لعبتي تمامًا. المدربون محترفون والتدريب عالمي المستوى. لقد تحسنت كثيرًا في عام واحد فقط!',
    rating: 5,
    image_url: '/photos/testimonials/IMG_8005.jpeg',
    is_active: true,
    order: 1
  },
  {
    id: '2',
    name_en: 'Layla Al-Zahra',
    name_ar: 'ليلى الزهراء',
    text_en: 'My daughter has been training here for 6 months and we\'ve seen incredible progress. The environment is supportive and the coaches truly care about each athlete.',
    text_ar: 'ابنتي تتدرب هنا منذ 6 أشهر ولاحظنا تقدمًا لا يصدق. البيئة داعمة والمدربون يهتمون حقًا بكل رياضي.',
    rating: 5,
    image_url: '/photos/testimonials/IMG_8006.jpeg',
    is_active: true,
    order: 2
  },
  {
    id: '3',
    name_en: 'Khalid Mahmoud',
    name_ar: 'خالد محمود',
    text_en: 'Best basketball academy in Jordan! The facilities are excellent and the training programs are well-structured. Highly recommended!',
    text_ar: 'أفضل أكاديمية كرة سلة في الأردن! المرافق ممتازة وبرامج التدريب منظمة بشكل جيد. أنصح بها بشدة!',
    rating: 5,
    image_url: '/photos/testimonials/IMG_8007.jpeg',
    is_active: true,
    order: 3
  }
]

export const mockGalleryImages = [
  {
    id: '1',
    title_en: 'Training Session',
    title_ar: 'جلسة تدريبية',
    description_en: 'Athletes working on their skills',
    description_ar: 'الرياضيون يعملون على مهاراتهم',
    image_url: '/photos/gallery/DSC06058-2.jpg',
    is_active: true,
    order: 1
  },
  {
    id: '2',
    title_en: 'Team Practice',
    title_ar: 'تدريب الفريق',
    description_en: 'Team building and coordination',
    description_ar: 'بناء الفريق والتنسيق',
    image_url: '/photos/gallery/DSC06065-2.jpg',
    is_active: true,
    order: 2
  },
  {
    id: '3',
    title_en: 'Skills Development',
    title_ar: 'تطوير المهارات',
    description_en: 'Focus on individual improvement',
    description_ar: 'التركيز على التحسين الفردي',
    image_url: '/photos/gallery/DSC06080-2.jpg',
    is_active: true,
    order: 3
  },
  {
    id: '4',
    title_en: 'Game Action',
    title_ar: 'أحداث المباراة',
    description_en: 'Competitive play',
    description_ar: 'لعب تنافسي',
    image_url: '/photos/gallery/DSC06176.jpg',
    is_active: true,
    order: 4
  },
  {
    id: '5',
    title_en: 'Championship Moment',
    title_ar: 'لحظة البطولة',
    description_en: 'Celebrating victory',
    description_ar: 'الاحتفال بالنصر',
    image_url: '/photos/gallery/DSC06261.jpg',
    is_active: true,
    order: 5
  },
  {
    id: '6',
    title_en: 'Youth Training',
    title_ar: 'تدريب الشباب',
    description_en: 'Young athletes learning',
    description_ar: 'الرياضيون الشباب يتعلمون',
    image_url: '/photos/gallery/DSC06290.jpg',
    is_active: true,
    order: 6
  },
  {
    id: '7',
    title_en: 'Elite Session',
    title_ar: 'جلسة النخبة',
    description_en: 'Advanced training',
    description_ar: 'تدريب متقدم',
    image_url: '/photos/gallery/DSC06298.jpg',
    is_active: true,
    order: 7
  },
  {
    id: '8',
    title_en: 'Team Huddle',
    title_ar: 'تجمع الفريق',
    description_en: 'Strategy discussion',
    description_ar: 'مناقشة الاستراتيجية',
    image_url: '/photos/gallery/DSC06312.jpg',
    is_active: true,
    order: 8
  }
]

export const mockEvents = [
  {
    id: '1',
    title_en: 'Summer Basketball Tournament',
    title_ar: 'بطولة كرة السلة الصيفية',
    description_en: 'Join us for our annual summer tournament featuring teams from across the region. Great competition and prizes!',
    description_ar: 'انضم إلينا في بطولتنا الصيفية السنوية التي تضم فرقًا من جميع أنحاء المنطقة. منافسة رائعة وجوائز!',
    event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    location_en: 'SD13 Sports Academy, Amman',
    location_ar: 'أكاديمية SD13 الرياضية، عمان',
    event_type: 'tournament',
    registration_url: '#',
    image_url: '/photos/gallery/IMG_7961.jpeg',
    is_featured: true,
    max_participants: 100,
    current_participants: 45,
    registration_deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title_en: 'Skills Workshop',
    title_ar: 'ورشة المهارات',
    description_en: 'Intensive one-day workshop focusing on shooting, dribbling, and defensive techniques.',
    description_ar: 'ورشة عمل مكثفة ليوم واحد تركز على التصويب والمراوغة وتقنيات الدفاع.',
    event_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    location_en: 'SD13 Sports Academy, Amman',
    location_ar: 'أكاديمية SD13 الرياضية، عمان',
    event_type: 'workshop',
    registration_url: '#',
    image_url: '/photos/gallery/IMG_7964.jpeg',
    is_featured: false,
    max_participants: 30,
    current_participants: 18
  }
]

