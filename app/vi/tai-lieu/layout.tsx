import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Tài Liệu | LABone - Tài Liệu Kỹ Thuật và Hướng Dẫn Sử Dụng',
  description:
    'Tổng hợp các tài liệu kỹ thuật, hướng dẫn sử dụng, catalog và tài liệu liên quan cho từng dòng sản phẩm và sản phẩm của LABone. Tải xuống tài liệu miễn phí.',
  keywords: [
    'tài liệu LABone',
    'hướng dẫn sử dụng',
    'catalog sản phẩm',
    'tài liệu kỹ thuật',
    'tài liệu thiết bị phòng thí nghiệm',
    'user manual',
    'technical documentation',
    'product catalog',
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
    title: 'Tài Liệu | LABone',
    description:
      'Tổng hợp các tài liệu kỹ thuật, hướng dẫn sử dụng, catalog và tài liệu liên quan cho từng dòng sản phẩm và sản phẩm của LABone.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tai-lieu`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Documents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tài Liệu | LABone',
    description:
      'Tổng hợp các tài liệu kỹ thuật, hướng dẫn sử dụng, catalog và tài liệu liên quan cho từng dòng sản phẩm và sản phẩm của LABone.',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tai-lieu`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tai-lieu`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/documents`,
    },
  },
}

export default function TaiLieuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Tài Liệu - LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tai-lieu`,
            description:
              'Tổng hợp các tài liệu kỹ thuật, hướng dẫn sử dụng, catalog và tài liệu liên quan cho từng dòng sản phẩm và sản phẩm của LABone.',
            isPartOf: {
              '@type': 'WebSite',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              name: companyInfo.name.vi,
            },
            about: {
              '@type': 'Thing',
              name: 'Product Documentation',
              description: 'Technical documents, user guides and catalogs for laboratory equipment and products',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
