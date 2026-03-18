import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'COA / CQ | LABone - Giấy Chứng Nhận Phân Tích & Chứng Nhận Chất Lượng',
  description:
    'Tài liệu COA (Certificate of Analysis) và CQ (Certificate Quality) cho các sản phẩm y tế, thiết bị khoa học và vật tư phòng thí nghiệm. Tải xuống các chứng chỉ chất lượng từ LABone.',
  keywords: [
    'COA LABone',
    'CQ LABone',
    'Certificate of Analysis',
    'Certificate Quality',
    'chứng nhận phân tích',
    'chứng nhận chất lượng',
    'tài liệu y tế',
    'thiết bị phòng thí nghiệm',
    'ISO 9001',
    'ISO 13485',
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
      'Tài liệu COA (Certificate of Analysis) và CQ (Certificate Quality) cho các sản phẩm y tế, thiết bị khoa học và vật tư phòng thí nghiệm.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/coa-cq`,
    siteName: 'LABone',
    locale: 'vi_VN',
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
      'Tài liệu COA (Certificate of Analysis) và CQ (Certificate Quality) cho các sản phẩm y tế, thiết bị khoa học và vật tư phòng thí nghiệm.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/coa-cq`,
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
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/coa-cq`,
            description:
              'Tài liệu COA (Certificate of Analysis) và CQ (Certificate Quality) cho các sản phẩm y tế, thiết bị khoa học và vật tư phòng thí nghiệm.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.vi,
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
