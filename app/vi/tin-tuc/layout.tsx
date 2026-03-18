import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Tin Tức | LABone - Cập Nhật Tin Tức Mới Nhất',
  description:
    'Theo dõi các tin tức, triển lãm và hoạt động của LABone trong ngành thiết bị khoa học và phòng thí nghiệm. Cập nhật thông tin mới nhất về sản phẩm và dịch vụ.',
  keywords: [
    'tin tức LABone',
    'triển lãm Analytica',
    'thiết bị phòng thí nghiệm',
    'tin tức công nghệ',
    'tin tức khoa học',
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
    title: 'Tin Tức | LABone',
    description:
      'Theo dõi các tin tức, triển lãm và hoạt động của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tin Tức | LABone',
    description:
      'Theo dõi các tin tức, triển lãm và hoạt động của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/new`,
    },
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Tin Tức - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
            description: 'Theo dõi các tin tức của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.vi,
            },
            about: {
              '@type': 'Thing',
              name: 'Tin Tức',
              description: 'Các tin tức mới nhất từ LABone',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
