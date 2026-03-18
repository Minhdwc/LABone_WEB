import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Events | LABone - Latest Events',
  description:
    'Stay updated with events, exhibitions and activities from LABone in the scientific equipment and laboratory industry. Get the latest information about products and services.',
  keywords: [
    'LABone events',
    'Analytica exhibition',
    'laboratory equipment',
    'technology events',
    'scientific exhibitions',
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
    title: 'Events | LABone',
    description: 'Stay updated with events from LABone in the scientific equipment and laboratory industry.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/event`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | LABone',
    description: 'Stay updated with events from LABone in the scientific equipment and laboratory industry.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/event`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/su-kien`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/event`,
    },
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Events - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/event`,
            description: 'Stay updated with events from LABone in the scientific equipment and laboratory industry.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.en,
            },
            about: {
              '@type': 'Thing',
              name: 'Events',
              description: 'Latest events from LABone',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
