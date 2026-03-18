import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Việc Làm | LABone - Tuyển Dụng Nhân Viên',
  description:
    'Tuyển dụng nhân viên tại LABone. Chúng tôi đang tìm kiếm những ứng viên tài năng và đam mê để gia nhập vào đội ngũ của chúng tôi. Các vị trí tuyển dụng hấp dẫn: Kỹ sư R&D, Chuyên viên Kinh doanh, IT, Marketing, và nhiều vị trí khác.',
  keywords: [
    'LABone',
    'việc làm LABone',
    'tuyển dụng LABone',
    'cơ hội việc làm',
    'tuyển dụng nhân viên',
    'việc làm khoa học',
    'tuyển dụng kỹ sư',
    'việc làm tại Củ Chi',
    'việc làm tại TPHCM',
    'careers at LABone',
    'job opportunities',
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
    title: 'Việc Làm | LABone',
    description:
      'Tuyển dụng nhân viên tại LABone - Cơ hội việc làm hấp dẫn trong lĩnh vực thiết bị khoa học và phòng thí nghiệm.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/viec-lam`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Tuyển dụng',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Việc Làm | LABone',
    description: 'Tuyển dụng nhân viên tại LABone - Cơ hội việc làm hấp dẫn trong lĩnh vực thiết bị khoa học.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/viec-lam`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/viec-lam`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/career`,
    },
  },
}

export default function ViecLamLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name.vi,
    url: siteUrl,
    logo: `${siteUrl}/Logo-LABone-png.png`,
    description: 'LABone - Nhà cung cấp thiết bị khoa học và phòng thí nghiệm hàng đầu Việt Nam',
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address.vi.name.split(',')[0],
      addressLocality: 'Củ Chi',
      addressRegion: 'Hồ Chí Minh',
      postalCode: '700000',
      addressCountry: 'VN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-978-782-147',
      contactType: 'Customer Service',
      email: companyInfo.email.vi,
      areaServed: 'VN',
      availableLanguage: ['Vietnamese', 'English'],
    },
    sameAs: [siteUrl, `${siteUrl}/vi/viec-lam`, `${siteUrl}/en/career`],
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Việc Làm tại LABone',
    description:
      'Trang tuyển dụng của LABone - Tìm kiếm cơ hội việc làm trong lĩnh vực thiết bị khoa học và phòng thí nghiệm',
    url: `${siteUrl}/vi/viec-lam`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Danh sách việc làm tại LABone',
      description: 'Các vị trí tuyển dụng đang mở tại LABone',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Việc làm',
        item: `${siteUrl}/vi/viec-lam`,
      },
    ],
  }

  return (
    <>
      {/* Organization Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* CollectionPage Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  )
}
