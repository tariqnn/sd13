import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = Cairo({ 
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SD13 Sports Academy - Premier Basketball Training in Amman, Jordan',
  description: 'Join SD13 Sports Academy for professional basketball training, elite coaching, and world-class facilities in Amman, Jordan. Programs for all ages and skill levels.',
  keywords: 'basketball training, sports academy, Amman Jordan, basketball coaching, youth sports, elite training',
  other: {
    'video-quality': 'high',
    'video-resolution': 'maximum',
  },
  authors: [{ name: 'SD13 Sports Academy' }],
  creator: 'SD13 Sports Academy',
  publisher: 'SD13 Sports Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sd13academy.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ar-JO': '/ar',
    },
  },
  openGraph: {
    title: 'SD13 Sports Academy - Premier Basketball Training',
    description: 'Professional basketball training and coaching in Amman, Jordan',
    url: 'https://sd13academy.com',
    siteName: 'SD13 Sports Academy',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SD13 Sports Academy Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SD13 Sports Academy - Premier Basketball Training',
    description: 'Professional basketball training and coaching in Amman, Jordan',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
