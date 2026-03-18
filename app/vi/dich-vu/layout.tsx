import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dịch Vụ Hiệu Chuẩn & Bảo Trì Thiết Bị | LABone - Thiết Bị Khoa Học',
  description:
    'Cung cấp dịch vụ hiệu chuẩn & thử nghiệm tủ, bảo trì & bảo dưỡng thiết bị phòng thí nghiệm chuyên nghiệp. Đảm bảo an toàn sinh học và hoạt động ổn định cho phòng lab.',
  keywords: [
    'dịch vụ hiệu chuẩn thiết bị',
    'hiệu chuẩn tủ an toàn sinh học',
    'thử nghiệm tủ an toàn',
    'bảo trì thiết bị phòng thí nghiệm',
    'bảo dưỡng phòng lab',
    'LABone',
    'dịch vụ lab chuyên nghiệp',
    'laboratory maintenance',
    'laboratory calibration',
    'biosafety cabinet testing',
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
    title: 'Dịch Vụ Hiệu Chuẩn & Bảo Trì Thiết Bị | LABone',
    description:
      'Dịch vụ hiệu chuẩn & thử nghiệm tủ, bảo trì & bảo dưỡng thiết bị phòng thí nghiệm chuyên nghiệp tại LABone.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/dich-vu`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Dịch vụ thiết bị khoa học',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dịch Vụ Thiết Bị Khoa Học | LABone',
    description: 'Hiệu chuẩn & thử nghiệm tủ, bảo trì & bảo dưỡng thiết bị phòng lab chuyên nghiệp tại LABone.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/dich-vu`,
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
            serviceType: 'Dịch vụ thiết bị phòng thí nghiệm',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Dịch vụ của LABone',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Hiệu chuẩn & Thử nghiệm tủ',
                    description: 'Hiệu chuẩn, kiểm định & thử nghiệm tủ an toàn sinh học theo tiêu chuẩn quốc tế.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Bảo trì & Bảo dưỡng thiết bị',
                    description: 'Bảo trì định kỳ, sửa chữa và kiểm tra an toàn thiết bị phòng thí nghiệm.',
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
