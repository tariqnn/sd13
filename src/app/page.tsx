'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Programs from '@/components/Programs'
import Coaches from '@/components/Coaches'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Events from '@/components/Events'
import AboutUs from '@/components/AboutUs'
import Partners from '@/components/Partners'
import NewsBlog from '@/components/NewsBlog'
import Newsletter from '@/components/Newsletter'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/components/LanguageContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <Programs />
            <Coaches />
            <Testimonials />
            <Gallery />
            <Events />
            <AboutUs />
            <Partners />
            <NewsBlog />
            <Newsletter />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
