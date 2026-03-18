import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Sự Kiện | LABone - Cập Nhật Sự Kiện Mới Nhất',
  description:
    'Theo dõi các sự kiện, triển lãm và hoạt động của LABone trong ngành thiết bị khoa học và phòng thí nghiệm. Cập nhật thông tin mới nhất về sản phẩm và dịch vụ.',
  keywords: [
    'sự kiện LABone',
    'triển lãm Analytica',
    'thiết bị phòng thí nghiệm',
    'sự kiện công nghệ',
    'sự kiện khoa học',
    'events LABone',
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
    title: 'Sự Kiện | LABone',
    description:
      'Theo dõi các sự kiện, triển lãm và hoạt động của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/su-kien`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sự Kiện | LABone',
    description:
      'Theo dõi các sự kiện, triển lãm và hoạt động của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/su-kien`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/su-kien`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/event`,
    },
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Sự Kiện - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/su-kien`,
            description: 'Theo dõi các sự kiện của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.vi,
            },
            about: {
              '@type': 'Thing',
              name: 'Sự Kiện',
              description: 'Các sự kiện mới nhất từ LABone',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
