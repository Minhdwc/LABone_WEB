import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Khoa Học và Đào Tạo | LABone - Chương Trình Đào Tạo Chuyên Sâu',
  description:
    'LABone Lab Academy cung cấp các chương trình đào tạo chuyên sâu về thiết bị khoa học, kỹ thuật phòng thí nghiệm, đào tạo và hội thảo trực tuyến. Nâng cao kiến thức và kỹ năng chuyên môn trong lĩnh vực nghiên cứu khoa học.',
  keywords: [
    'LABone Lab Academy',
    'khoa học và đào tạo',
    'đào tạo thiết bị phòng thí nghiệm',
    'khóa học kỹ thuật phòng sạch',
    'hội thảo trực tuyến khoa học',
    'đào tạo phân tích chất lượng',
    'chương trình đào tạo LABone',
    'lab academy',
    'scientific training',
    'laboratory education',
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
    title: 'Khoa Học và Đào Tạo | LABone',
    description:
      'LABone Lab Academy cung cấp các chương trình đào tạo chuyên sâu về thiết bị khoa học, kỹ thuật phòng thí nghiệm, đào tạo và hội thảo trực tuyến.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/khoa-hoc-va-dao-tao`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Khoa học và Đào tạo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khoa Học và Đào Tạo | LABone',
    description:
      'LABone Lab Academy cung cấp các chương trình đào tạo chuyên sâu về thiết bị khoa học, kỹ thuật phòng thí nghiệm, đào tạo và hội thảo trực tuyến.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/khoa-hoc-va-dao-tao`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/khoa-hoc-va-dao-tao`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/lab-academy`,
    },
  },
}

export default function LabAcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'LABone Lab Academy',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/khoa-hoc-va-dao-tao`,
            description:
              'LABone Lab Academy cung cấp các chương trình đào tạo chuyên sâu về thiết bị khoa học, kỹ thuật phòng thí nghiệm, đào tạo và hội thảo trực tuyến.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '228/13/3 Nguyễn Thị Lắng',
              addressLocality: 'Củ Chi',
              addressRegion: 'TP.HCM',
              addressCountry: 'VN',
            },
            telephone: '0978 782 147',
            email: 'training@labone.vn',
            parentOrganization: {
              '@type': 'Organization',
              name: companyInfo.name.vi,
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            },
          }),
        }}
      />
      {children}
    </>
  )
}
