import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Careers | LABone - Jobs',
  description:
    'Join LABone team. We are looking for talented and passionate candidates to join our team. Attractive job positions: R&D Engineers, Sales Specialists, IT, Marketing, and many other positions.',
  keywords: [
    'LABone',
    'LABone careers',
    'LABone jobs',
    'job opportunities',
    'careers at LABone',
    'scientific jobs',
    'engineering jobs',
    'jobs in Cu Chi',
    'jobs in Ho Chi Minh City',
    'việc làm LABone',
    'tuyển dụng',
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
    title: 'Careers | LABone',
    description: 'Join LABone team - Attractive job opportunities in scientific equipment and laboratory field.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/career`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Careers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | LABone',
    description: 'Join LABone team - Attractive job opportunities in scientific equipment field.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/career`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/viec-lam`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/career`,
    },
  },
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name.en,
    url: siteUrl,
    logo: `${siteUrl}/Logo-LABone-png.png`,
    description: 'LABone - Leading provider of scientific equipment and laboratory supplies in Vietnam',
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address.en.name.split(',')[0],
      addressLocality: 'Cu Chi',
      addressRegion: 'Ho Chi Minh City',
      postalCode: '700000',
      addressCountry: 'VN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-978-782-147',
      contactType: 'Customer Service',
      email: companyInfo.email.en,
      areaServed: 'VN',
      availableLanguage: ['Vietnamese', 'English'],
    },
    sameAs: [siteUrl, `${siteUrl}/vi/viec-lam`, `${siteUrl}/en/career`],
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Careers at LABone',
    description: 'LABone Careers Page - Find job opportunities in scientific equipment and laboratory field',
    url: `${siteUrl}/en/career`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Jobs at LABone',
      description: 'Current job openings at LABone',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Careers',
        item: `${siteUrl}/en/career`,
      },
    ],
  }

  return (
    <>
      {/* Organization Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* CollectionPage Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  )
}
