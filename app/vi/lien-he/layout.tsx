import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Liên Hệ | LABone - Thiết Bị Khoa Học',
  description: `Liên hệ với LABone để được tư vấn và hỗ trợ về thiết bị phòng thí nghiệm, nội thất phòng lab, bioreactor, môi trường vi sinh và các sản phẩm khoa học chuyên nghiệp. Hotline: ${companyInfo.phone.vi}, Email: ${companyInfo.email.vi}`,
  keywords: [
    'LABone',
    'liên hệ LABone',
    'tư vấn thiết bị phòng thí nghiệm',
    'hỗ trợ kỹ thuật',
    'báo giá thiết bị lab',
    'thiết bị khoa học',
    'phòng thí nghiệm',
    'thiết bị phòng thí nghiệm',
    'vật tư khoa học',
    'nghiên cứu',
    'liên hệ',
    'tư vấn',
    'hỗ trợ',
    'Củ Chi',
    'Thành phố Hồ Chí Minh',
    'Việt Nam',
    'hotline',
    'email',
    'website',
    'sản phẩm',
    'dịch vụ',
    'thương hiệu',
    'chính sách',
    'hỗ trợ khách hàng',
    'nhà cung cấp thiết bị khoa học',
    'thiết bị phòng thí nghiệm Việt Nam',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'nội thất phòng lab',
    'bioreactor',
    'môi trường vi sinh',
    companyInfo.address.vi.name,
  ],
  authors: [{ name: 'LABone' }],
  creator: 'LABone',
  publisher: 'LABone',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/lien-he`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/lien-he`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact`,
    },
  },
  openGraph: {
    title: 'Liên Hệ | LABone - Thiết Bị Khoa Học',
    description: `Liên hệ với LABone để được tư vấn và hỗ trợ về thiết bị phòng thí nghiệm chuyên nghiệp. Hotline: ${companyInfo.phone.vi}, Email: ${companyInfo.email.vi}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/lien-he`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Thiết Bị Khoa Học',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liên Hệ | LABone',
    description: `Liên hệ với LABone để được tư vấn và hỗ trợ về thiết bị phòng thí nghiệm chuyên nghiệp. Hotline: ${companyInfo.phone.vi}`,
    images: ['/Logo-LABone-png.png'],
    creator: '@labone',
  },
}
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Liên hệ LABone',
            description:
              'Trang liên hệ LABone - Công ty Thiết Bị Khoa Học chuyên sản xuất và cung cấp thiết bị phòng thí nghiệm',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/lien-he`,
            mainEntity: {
              '@type': 'Organization',
              name: companyInfo.name.vi,
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
              description:
                'LABone - Công ty Thiết Bị Khoa Học chuyên sản xuất và cung cấp thiết bị phòng thí nghiệm với 4 thương hiệu: HUYlab, KingLab, BacterLab và LabCollect',
              address: {
                '@type': 'PostalAddress',
                streetAddress: companyInfo.address.vi.name.split(',')[0],
                addressLocality: 'Xã Củ Chi',
                addressRegion: 'Thành phố Hồ Chí Minh',
                addressCountry: 'VN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+84-978-782-147',
                  contactType: 'Customer Service',
                  areaServed: 'VN',
                  availableLanguage: ['Vietnamese', 'English'],
                },
                {
                  '@type': 'ContactPoint',
                  email: companyInfo.email.vi,
                  contactType: 'Customer Service',
                  areaServed: 'VN',
                  availableLanguage: ['Vietnamese', 'English'],
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
