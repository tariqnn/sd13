'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './LanguageContext'

const aboutContent = {
  en: {
    title: "OUR JOURNEY FOR GREATNESS.",
    description: "We empower athletes to reach their potential through world-class training in an inclusive environment where they can thrive, grow, and achieve their goals on and off the field.",
    button: "About Us",
    timeline: [
      {
        year: "2015",
        title: "FOUNDED IN 2015",
        description: "SD13 Sports Academy was established with the mission of providing a comprehensive training environment for athletes of all levels. Offering a blend of sports performance training, physical therapy, and academic support, the facility quickly became a premier destination for athletic development."
      },
      {
        year: "2017",
        title: "PRO DEVELOPMENT 2017",
        description: "Introduced the Pro Development Program, designed to help athletes prepare for professional drafts and elevate current pros' performance. With personalized coaching, advanced analytics, and a focus on skill refinement, the program supports athletes at the highest level to achieve their professional goals."
      },
      {
        year: "2020-2024",
        title: "PARTNERSHIPS 2020-2024",
        description: "Forged partnerships with major sports organizations and expanded into manual therapy and rehabilitation. Launched exclusive SD13-branded apparel and established ourselves as a leading sports academy in the region."
      }
    ]
  },
  ar: {
    title: "رحلتنا نحو العظمة.",
    description: "نمكن الرياضيين من الوصول إلى إمكاناتهم من خلال التدريب عالمي المستوى في بيئة شاملة حيث يمكنهم الازدهار والنمو وتحقيق أهدافهم داخل وخارج الملعب.",
    button: "من نحن",
    timeline: [
      {
        year: "2015",
        title: "تأسست في 2015",
        description: "تأسست أكاديمية SD13 الرياضية بهدف توفير بيئة تدريب شاملة للرياضيين من جميع المستويات. تقدم مزيجاً من تدريب الأداء الرياضي والعلاج الطبيعي والدعم الأكاديمي، وأصبحت المنشأة بسرعة وجهة رائدة لتطوير الرياضيين."
      },
      {
        year: "2017",
        title: "التطوير المهني 2017",
        description: "أطلقنا برنامج التطوير المهني، المصمم لمساعدة الرياضيين على الاستعداد للانتخابات المهنية ورفع أداء المحترفين الحاليين. مع التدريب الشخصي والتحليلات المتقدمة والتركيز على تحسين المهارات، يدعم البرنامج الرياضيين على أعلى مستوى لتحقيق أهدافهم المهنية."
      },
      {
        year: "2020-2024",
        title: "الشراكات 2020-2024",
        description: "أقمنا شراكات مع منظمات رياضية كبرى وتوسعنا في العلاج اليدوي وإعادة التأهيل. أطلقنا ملابس حصرية تحمل علامة SD13 التجارية وأسسنا أنفسنا كأكاديمية رياضية رائدة في المنطقة."
      }
    ]
  }
}

export default function AboutUs() {
  const { language } = useLanguage()
  const content = aboutContent[language]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[800px]">
          {/* Left Sidebar - Dark */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] p-12 flex flex-col justify-center"
          >
            <div className="space-y-8">
              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
                {content.title}
              </h2>

              {/* Description */}
              <p className="text-white text-lg leading-relaxed">
                {content.description}
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 10px 25px rgba(184, 161, 111, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#B8A16F] hover:bg-[#A6915F] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                {content.button}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content - Timeline */}
          <div className="lg:col-span-2 flex flex-col">
            {content.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex-1 p-12 flex flex-col justify-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#e0e0e0]'
                }`}
              >
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  {/* Year */}
                  <div className="text-sm font-semibold text-[#666666] uppercase tracking-wider">
                    {item.year}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] uppercase leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#1a1a1a] text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

