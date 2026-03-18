import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Thương Hiệu Của Chúng Tôi | LABone - Thiết Bị Khoa Học Chuyên Nghiệp',
  description:
    'Khám phá 4 thương hiệu thiết bị khoa học của LABone: HUYlab (Nội thất phòng lab), KingLab (Bioreactor & Lên men), BacterLab (Môi trường vi sinh), và LabCollect (Thu thập mẫu). Giải pháp tổng thể cho phòng thí nghiệm hiện đại.',
  keywords: [
    'LABone',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'thiết bị phòng thí nghiệm',
    'nội thất phòng lab',
    'tủ an toàn sinh học',
    'bioreactor',
    'môi trường vi sinh',
    'ống lấy máu chân không',
    'phòng sạch',
    'thiết bị lên men',
    'laboratory equipment',
    'cleanroom',
    'biosafety cabinet',
    'laboratory furniture',
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
    title: 'Thương Hiệu Của Chúng Tôi | LABone - Thiết Bị Khoa Học Chuyên Nghiệp',
    description:
      'Khám phá 4 thương hiệu thiết bị khoa học của LABone: HUYlab (Nội thất phòng lab), KingLab (Bioreactor & Lên men), BacterLab (Môi trường vi sinh), và LabCollect (Thu thập mẫu).',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/thuong-hieu`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Thiết Bị Khoa Học Chuyên Nghiệp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thương Hiệu Của Chúng Tôi | LABone',
    description:
      'Khám phá 4 thương hiệu thiết bị khoa học của LABone: HUYlab, KingLab, BacterLab, và LabCollect - Giải pháp tổng thể cho phòng thí nghiệm hiện đại.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/thuong-hieu`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/thuong-hieu`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/brands`,
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
            description: `LABone - ${companyInfo.name.vi} chuyên sản xuất và cung cấp thiết bị phòng thí nghiệm với 4 thương hiệu: HUYlab, KingLab, BacterLab, và LabCollect`,
            brand: [
              {
                '@type': 'Brand',
                name: 'HUYlab',
                description: 'Chuyên cung cấp thiết bị và nội thất phòng thí nghiệm, phòng sạch, tủ an toàn sinh học',
              },
              {
                '@type': 'Brand',
                name: 'KingLab',
                description: 'Cung cấp các thiết bị bioreactor, hệ thống lên men và nuôi cấy tế bào chuyên nghiệp',
              },
              {
                '@type': 'Brand',
                name: 'BacterLab',
                description: 'Nhà sản xuất môi trường vi sinh chất lượng cao, đĩa petri, và vật tư tiêu hao',
              },
              {
                '@type': 'Brand',
                name: 'LabCollect',
                description:
                  'Chuyên sản xuất ống lấy máu chân không, môi trường vận chuyển mẫu và các sản phẩm thu thập mẫu sinh học',
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
            name: 'Thương Hiệu Của Chúng Tôi',
            description: 'Khám phá 4 thương hiệu thiết bị khoa học chuyên nghiệp của LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/thuong-hieu`,
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
                      'Chuyên cung cấp thiết bị và nội thất phòng thí nghiệm, phòng sạch, tủ an toàn sinh học',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'Brand',
                    name: 'KingLab',
                    description: 'Cung cấp các thiết bị bioreactor, hệ thống lên men và nuôi cấy tế bào chuyên nghiệp',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'Brand',
                    name: 'BacterLab',
                    description: 'Nhà sản xuất môi trường vi sinh chất lượng cao, đĩa petri, và vật tư tiêu hao',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'Brand',
                    name: 'LabCollect',
                    description:
                      'Chuyên sản xuất ống lấy máu chân không, môi trường vận chuyển mẫu và các sản phẩm thu thập mẫu sinh học',
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
