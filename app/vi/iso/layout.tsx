import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chứng Nhận ISO | LABone - ISO 9001, ISO 13485, ISO 17025',
  description:
    'LABone được chứng nhận ISO 9001:2015, ISO 13485:2016 và ISO/IEC 17025:2017. Nhà máy với diện tích hơn 3,500m² được trang bị đồng bộ thiết bị sản xuất và phòng thí nghiệm R&D hiện đại.',
  keywords: [
    'chứng nhận ISO',
    'ISO 9001',
    'ISO 13485',
    'ISO 17025',
    'chứng nhận chất lượng',
    'LABone ISO',
    'quản lý chất lượng',
    'phòng thí nghiệm được chứng nhận',
    'ISO certification',
    'quality management system',
    'certified laboratory',
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
    title: 'Chứng Nhận ISO | LABone',
    description: 'LABone được chứng nhận ISO 9001:2015, ISO 13485:2016 và ISO/IEC 17025:2017.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/iso`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Chứng nhận ISO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chứng Nhận ISO | LABone',
    description: 'LABone được chứng nhận ISO 9001:2015, ISO 13485:2016 và ISO/IEC 17025:2017.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/iso`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/iso`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/certificate`,
    },
  },
}

export default function ISOLayout({ children }: { children: React.ReactNode }) {
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
