import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Lab Academy | LABone - In-Depth Training Programs',
  description:
    'LABone Lab Academy provides in-depth training programs on scientific equipment, laboratory techniques, training sessions and webinars. Enhance your knowledge and professional skills in scientific research.',
  keywords: [
    'LABone Lab Academy',
    'science and training',
    'laboratory equipment training',
    'cleanroom techniques courses',
    'scientific webinars',
    'quality analysis training',
    'LABone training programs',
    'lab academy',
    'scientific training',
    'laboratory education',
  ],
  authors: [{ name: 'LABone' }],
  creator: 'LABone',
  publisher: 'LABone',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Lab Academy | LABone',
    description:
      'LABone Lab Academy provides in-depth training programs on scientific equipment, laboratory techniques, training sessions and webinars.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/lab-academy`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Lab Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lab Academy | LABone',
    description:
      'LABone Lab Academy provides in-depth training programs on scientific equipment, laboratory techniques, training sessions and webinars.',
    images: ['/assets/company/companyLabone.jpg'],
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/lab-academy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/khoa-hoc-va-dao-tao`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/lab-academy`,
    },
  },
}

export default function LabAcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'LABone Lab Academy',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/lab-academy`,
            description:
              'LABone Lab Academy provides in-depth training programs on scientific equipment, laboratory techniques, training sessions and webinars.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '228/13/3 Nguyen Thi Lang, Tan Phu Trung Commune',
              addressLocality: 'Cu Chi',
              addressRegion: 'Ho Chi Minh City',
              addressCountry: 'VN',
            },
            telephone: '0978 782 147',
            email: 'training@labone.vn',
            parentOrganization: {
              '@type': 'Organization',
              name: companyInfo.name.en,
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            },
          }),
        }}
      />
      {children}
    </>
  )
}
