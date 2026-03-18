import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Documents | LABone - Technical Documents and User Guides',
  description:
    'Complete collection of technical documents, user guides, catalogs and related materials for each product line and product from LABone. Download documents for free.',
  keywords: [
    'LABone documents',
    'user guide',
    'product catalog',
    'technical documentation',
    'laboratory equipment documents',
    'user manual',
    'product documentation',
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
    title: 'Documents | LABone',
    description:
      'Complete collection of technical documents, user guides, catalogs and related materials for each product line and product from LABone.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/documents`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Documents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documents | LABone',
    description:
      'Complete collection of technical documents, user guides, catalogs and related materials for each product line and product from LABone.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/documents`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tai-lieu`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/documents`,
    },
  },
}

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Documents - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/documents`,
            description:
              'Complete collection of technical documents, user guides, catalogs and related materials for each product line and product from LABone.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.en,
            },
            about: {
              '@type': 'Thing',
              name: 'Product Documentation',
              description: 'Technical documents, user guides and catalogs for laboratory equipment and products',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
