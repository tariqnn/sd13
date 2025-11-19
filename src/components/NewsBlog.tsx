'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import ImagePlaceholder from './ImagePlaceholder'

const newsContent = {
  en: {
    title: "Latest News & Updates",
    articles: [
      {
        id: 1,
        date: "APRIL 16, 2025",
        title: "SD13 SPORTS ACADEMY LAUNCHES PERFORMANCE TRAINING AT PGA FRISCO",
        description: "Frisco, TX — SD13 Sports Academy is proud to announce the opening of its newest and most advanced location to date: Sports Academy PGA Frisco. This state-of-the-art facility represents our commitment to providing world-class training environments for athletes of all levels.",
        image: "/photos/gallery/DSC06058-2.jpg",
        isImageFirst: false
      },
      {
        id: 2,
        date: "AUGUST 31, 2024",
        title: "LAKERS' ANTHONY DAVIS SHARES WISDOM AT SD13 SPORTS ACADEMY CAMP",
        description: "Thousand Oaks, Calif., June 26, 2024 - Los Angeles Lakers standout Anthony Davis held a Q&A with campers at SD13 Sports Academy, sharing insights about professional basketball, training routines, and the importance of mental toughness in sports.",
        image: "/photos/gallery/DSC06065-2.jpg",
        isImageFirst: true
      }
    ]
  },
  ar: {
    title: "أحدث الأخبار والتحديثات",
    articles: [
      {
        id: 1,
        date: "16 أبريل 2025",
        title: "أكاديمية SD13 الرياضية تطلق تدريب الأداء في PGA فريسكو",
        description: "فريسكو، تكساس — تفخر أكاديمية SD13 الرياضية بالإعلان عن افتتاح أحدث وأكثر مواقعها تطوراً حتى الآن: أكاديمية الرياضة PGA فريسكو. تمثل هذه المنشأة المتطورة التزامنا بتوفير بيئات تدريب عالمية المستوى للرياضيين من جميع المستويات.",
        image: "/photos/gallery/DSC06058-2.jpg",
        isImageFirst: false
      },
      {
        id: 2,
        date: "31 أغسطس 2024",
        title: "أنتوني ديفيس من ليكرز يشارك الحكمة في معسكر أكاديمية SD13 الرياضية",
        description: "ثاوزند أوكس، كاليفورنيا، 26 يونيو 2024 - أجرى نجم لوس أنجلوس ليكرز أنتوني ديفيس جلسة أسئلة وأجوبة مع المشاركين في معسكر أكاديمية SD13 الرياضية، شارك خلالها رؤى حول كرة السلة المهنية وروتين التدريب وأهمية القوة العقلية في الرياضة.",
        image: "/photos/gallery/DSC06065-2.jpg",
        isImageFirst: true
      }
    ]
  }
}

export default function NewsBlog() {
  const { language } = useLanguage()
  const content = newsContent[language]

  return (
    <section className="py-20 bg-[#F8F7F2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-[#1a1a1a] text-center uppercase tracking-tight"
          >
            {content.title}
          </motion.h2>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {content.articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]"
              >
                {/* Text Block */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`p-12 flex flex-col justify-center ${
                    article.isImageFirst ? 'bg-[#e0e0e0]' : 'bg-[#1a1a1a]'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Date */}
                    <div className="flex items-center space-x-2">
                      <Calendar className={`w-4 h-4 ${
                        article.isImageFirst ? 'text-[#666666]' : 'text-white/60'
                      }`} />
                      <span className={`text-sm font-semibold uppercase tracking-wider ${
                        article.isImageFirst ? 'text-[#666666]' : 'text-white/60'
                      }`}>
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl sm:text-3xl font-black uppercase leading-tight ${
                      article.isImageFirst ? 'text-[#1a1a1a]' : 'text-white'
                    }`}>
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-lg leading-relaxed ${
                      article.isImageFirst ? 'text-[#1a1a1a]' : 'text-white'
                    }`}>
                      {article.description}
                    </p>

                    {/* Read More Link */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`flex items-center space-x-2 font-semibold transition-all duration-300 ${
                        article.isImageFirst 
                          ? 'text-[#1a1a1a] hover:text-[#B8A16F]' 
                          : 'text-white hover:text-[#B8A16F]'
                      }`}
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Image Block */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <ImagePlaceholder
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-all duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}










