import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'News | LABone - Latest News',
  description:
    'Stay updated with news from LABone in the scientific equipment and laboratory industry. Get the latest information about products and services.',
  keywords: ['LABone news'],
  authors: [{ name: 'LABone' }],
  creator: 'LABone',
  publisher: 'LABone',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'News | LABone',
    description:
      'Stay updated with news, events, exhibitions and activities from LABone in the scientific equipment and laboratory industry.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/new`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News | LABone',
    description: 'Stay updated with news from LABone in the scientific equipment and laboratory industry.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/new`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/new`,
    },
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'News - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/new`,
            description: 'Stay updated with news from LABone in the scientific equipment and laboratory industry.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.en,
            },
            about: {
              '@type': 'Thing',
              name: 'News',
              description: 'Latest news from LABone',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
