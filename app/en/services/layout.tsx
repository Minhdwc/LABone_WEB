import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calibration & Maintenance Services | LABone - Scientific Equipment',
  description:
    'Professional calibration & testing services for cabinets, maintenance & servicing of laboratory equipment. Ensuring biosafety and stable operation for your lab.',
  keywords: [
    'equipment calibration service',
    'biosafety cabinet calibration',
    'safety cabinet testing',
    'laboratory equipment maintenance',
    'lab maintenance',
    'LABone',
    'professional lab services',
    'laboratory maintenance',
    'laboratory calibration',
    'biosafety cabinet testing',
    'equipment servicing',
    'lab equipment repair',
    'scientific equipment maintenance',
    'calibration services Vietnam',
    'laboratory equipment support',
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
    title: 'Calibration & Maintenance Services | LABone',
    description:
      'Professional calibration & testing services for cabinets, maintenance & servicing of laboratory equipment at LABone.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Scientific Equipment Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scientific Equipment Services | LABone',
    description:
      'Professional calibration & testing services for cabinets, maintenance & servicing of laboratory equipment at LABone.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/dich-vu`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/services`,
    },
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            provider: {
              '@type': 'Organization',
              name: 'LABone',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
            },
            serviceType: 'Laboratory Equipment Services',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'LABone Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Calibration & Cabinet Testing',
                    description:
                      'Calibration, certification & testing of biosafety cabinets according to international standards.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Equipment Maintenance & Servicing',
                    description: 'Regular maintenance, repair and safety inspection of laboratory equipment.',
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
