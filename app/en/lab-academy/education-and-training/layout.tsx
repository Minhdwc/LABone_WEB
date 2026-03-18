import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const basePath = '/en/lab-academy/education-and-training'
const canonicalUrl = `${siteUrl}${basePath}`
const defaultImage = '/assets/company/companyLabone.jpg'

export const metadata: Metadata = {
  title: 'Education and Training Programs | LABone Lab Academy',
  description:
    'Explore LABone Lab Academy education and training programs including laboratory courses, webinars and hands-on training to enhance your scientific skills.',
  keywords: [
    'LABone Lab Academy',
    'education and training',
    'laboratory courses',
    'scientific webinars',
    'hands-on lab training',
    'lab academy programs',
    'lab training',
    'scientific education',
  ],
  authors: [{ name: 'LABone' }],
  creator: 'LABone',
  publisher: 'LABone',
  openGraph: {
    title: 'Education and Training Programs | LABone Lab Academy',
    description:
      'Explore LABone Lab Academy education and training programs including laboratory courses, webinars and hands-on training to enhance your scientific skills.',
    url: canonicalUrl,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'LABone Lab Academy - Education and Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education and Training Programs | LABone Lab Academy',
    description:
      'Explore LABone Lab Academy education and training programs including laboratory courses, webinars and hands-on training to enhance your scientific skills.',
    images: [defaultImage],
    creator: '@labone',
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
  alternates: {
    canonical: canonicalUrl,
    languages: {
      'en-US': canonicalUrl,
      'vi-VN': `${siteUrl}/vi/khoa-hoc-va-dao-tao`,
    },
  },
}

export default function EducationTrainingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
