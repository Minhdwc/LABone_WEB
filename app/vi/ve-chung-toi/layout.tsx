import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Về Chúng Tôi | LABone - Công Ty Thiết Bị Khoa Học Hàng Đầu',
  description: `${companyInfo.name.vi} được thành lập 2012 tại TP.HCM, Việt Nam với văn phòng  tại Hoa Kỳ. Nhà sản xuất thiết bị khoa học, phòng sạch, ống lấy máu và môi trường vi sinh. Sở hữu 4 thương hiệu: HUYlab, KingLab, BacterLab, LabCollect. Liên hệ: ${companyInfo.phone.vi} (VN) / ${companyInfo.phone.en} (US).`,
  keywords: [
    'LABone',
    'về LABone',
    'công ty thiết bị khoa học',
    'nhà sản xuất thiết bị phòng thí nghiệm',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'thiết bị phòng sạch',
    'ống lấy máu',
    'môi trường vi sinh',
    'laboratory equipment Vietnam',
    'scientific equipment manufacturer',
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
    title: 'Về Chúng Tôi | LABone',
    description: `${companyInfo.name.vi} - Nhà sản xuất thiết bị khoa học, phòng sạch và môi trường vi sinh hàng đầu. Văn phòng tại Việt Nam và Hoa Kỳ. Hotline: ${companyInfo.phone.vi} (VN) / ${companyInfo.phone.en} (US).`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/ve-chung-toi`,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Công ty thiết bị khoa học',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Về Chúng Tôi | LABone',
    description: `${companyInfo.name.vi} - Nhà sản xuất thiết bị khoa học hàng đầu với văn phòng tại Việt Nam và Hoa Kỳ.`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/ve-chung-toi`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/ve-chung-toi`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/about-us`,
    },
  },
}

export default function VeChungToiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: companyInfo.name.vi,
            alternateName: 'LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
            foundingDate: '2012',
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: companyInfo.address.vi.name,
                addressLocality: 'Củ Chi',
                addressRegion: 'Thành phố Hồ Chí Minh',
                addressCountry: 'VN',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: companyInfo.address.en.name,
                addressLocality: 'Pittsfield',
                addressRegion: 'MA',
                postalCode: '01201',
                addressCountry: 'US',
              },
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: companyInfo.phone.vi,
                contactType: 'customer service',
                email: companyInfo.email.vi,
                areaServed: 'VN',
                availableLanguage: ['Vietnamese', 'English'],
              },
              {
                '@type': 'ContactPoint',
                telephone: companyInfo.phone.en,
                contactType: 'customer service',
                email: companyInfo.email.en,
                areaServed: 'US',
                availableLanguage: ['English'],
              },
            ],
            sameAs: ['https://www.labone.vn'],
          }),
        }}
      />
      {children}
    </>
  )
}
