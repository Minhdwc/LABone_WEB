import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'COA / CQ | LABone - Certificate of Analysis & Certificate Quality',
  description:
    'COA (Certificate of Analysis) and CQ (Certificate Quality) documents for medical products, scientific equipment and laboratory supplies. Download quality certificates from LABone.',
  keywords: [
    'COA LABone',
    'CQ LABone',
    'Certificate of Analysis',
    'Certificate Quality',
    'medical product certificates',
    'laboratory equipment certificates',
    'ISO 9001',
    'ISO 13485',
    'quality control documents',
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
    title: 'COA / CQ | LABone',
    description:
      'COA (Certificate of Analysis) and CQ (Certificate Quality) documents for medical products, scientific equipment and laboratory supplies.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/coa-cqc`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - COA/CQ Documents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COA / CQ | LABone',
    description:
      'COA (Certificate of Analysis) and CQ (Certificate Quality) documents for medical products, scientific equipment and laboratory supplies.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/coa-cq`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/coa-cq`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/coa-cq`,
    },
  },
}

export default function CoaCqcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'COA / CQ - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/coa-cq`,
            description:
              'COA (Certificate of Analysis) and CQ (Certificate Quality) documents for medical products, scientific equipment and laboratory supplies.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.en,
            },
            about: {
              '@type': 'Thing',
              name: 'Certificate of Analysis',
              description: 'COA documents for medical products and scientific equipment',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
