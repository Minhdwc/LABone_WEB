import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISO Certifications | LABone - ISO 9001, ISO 13485, ISO 17025',
  description:
    'LABone is certified with ISO 9001:2015, ISO 13485:2016 and ISO/IEC 17025:2017. Factory with more than 3,500m² area equipped with synchronous production equipment and modern R&D laboratory.',
  keywords: [
    'ISO certification',
    'ISO 9001',
    'ISO 13485',
    'ISO 17025',
    'quality certification',
    'LABone ISO',
    'quality management system',
    'certified laboratory',
    'ISO 9001:2015',
    'ISO 13485:2016',
    'ISO 17025:2017',
    'laboratory accreditation',
    'quality standards',
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
    title: 'ISO Certifications | LABone',
    description: 'LABone is certified with ISO 9001:2015, ISO 13485:2016 and ISO/IEC 17025:2017.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/certificate`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - ISO Certifications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISO Certifications | LABone',
    description: 'LABone is certified with ISO 9001:2015, ISO 13485:2016 and ISO/IEC 17025:2017.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/certificate`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/iso`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/certificate`,
    },
  },
}

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
            certifications: [
              {
                '@type': 'Certification',
                name: 'ISO 9001:2015',
                description: 'Quality Management System',
              },
              {
                '@type': 'Certification',
                name: 'ISO 13485:2016',
                description: 'Medical Devices Quality Management System',
              },
              {
                '@type': 'Certification',
                name: 'ISO/IEC 17025:2017',
                description: 'Laboratory Testing and Calibration',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
