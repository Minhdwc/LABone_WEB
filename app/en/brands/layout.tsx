import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Brands | LABone - Professional Scientific Equipment',
  description:
    "Discover LABone's 4 scientific equipment brands: HUYlab (Laboratory furniture), KingLab (Bioreactor & Fermentation), BacterLab (Microbiology media), and LabCollect (Sample collection). Complete solutions for modern laboratories.",
  keywords: [
    'LABone',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'laboratory equipment',
    'laboratory furniture',
    'biosafety cabinet',
    'bioreactor',
    'microbiology media',
    'vacuum blood collection tube',
    'cleanroom',
    'fermentation equipment',
    'sample collection',
    'scientific equipment',
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
    title: 'Our Brands | LABone - Professional Scientific Equipment',
    description:
      "Discover LABone's 4 scientific equipment brands: HUYlab (Laboratory furniture), KingLab (Bioreactor & Fermentation), BacterLab (Microbiology media), and LabCollect (Sample collection).",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/brands`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Professional Scientific Equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Brands | LABone',
    description:
      "Discover LABone's 4 scientific equipment brands: HUYlab, KingLab, BacterLab, and LabCollect - Complete solutions for modern laboratories.",
    images: ['/Logo-LABone-png.png'],
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/brands`,
    languages: {
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/brands`,
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/thuong-hieu`,
    },
  },
}

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
            description:
              'LABone - Scientific Equipment Company specializing in manufacturing and supplying laboratory equipment with 4 brands: HUYlab, KingLab, BacterLab, and LabCollect',
            brand: [
              {
                '@type': 'Brand',
                name: 'HUYlab',
                description: 'Specializing in laboratory equipment and furniture, cleanrooms, and biosafety cabinets',
              },
              {
                '@type': 'Brand',
                name: 'KingLab',
                description: 'Providing bioreactor equipment, fermentation systems, and professional cell culture',
              },
              {
                '@type': 'Brand',
                name: 'BacterLab',
                description: 'Manufacturer of high-quality microbiology media, petri dishes, and consumables',
              },
              {
                '@type': 'Brand',
                name: 'LabCollect',
                description:
                  'Specializing in vacuum blood collection tubes, sample transport media, and biological sample collection products',
              },
            ],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'VN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              availableLanguage: ['Vietnamese', 'English'],
            },
          }),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Our Brands',
            description: "Discover LABone's 4 professional scientific equipment brands",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/brands`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'Brand',
                    name: 'HUYlab',
                    description:
                      'Specializing in laboratory equipment and furniture, cleanrooms, and biosafety cabinets',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'Brand',
                    name: 'KingLab',
                    description: 'Providing bioreactor equipment, fermentation systems, and professional cell culture',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'Brand',
                    name: 'BacterLab',
                    description: 'Manufacturer of high-quality microbiology media, petri dishes, and consumables',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'Brand',
                    name: 'LabCollect',
                    description:
                      'Specializing in vacuum blood collection tubes, sample transport media, and biological sample collection products',
                  },
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  )
}
