import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'About Us | LABone - Leading Scientific Equipment Company',
  description: `${companyInfo.name.en} was established in 2012 in Ho Chi Minh City, Vietnam with an office in the United States. Manufacturer of scientific equipment, cleanrooms, blood collection tubes and microbiological media. Owns 4 brands: HUYlab, KingLab, BacterLab, LabCollect. Contact: ${companyInfo.phone.en} (US) or ${companyInfo.phone.vi} (VN).`,
  keywords: [
    'LABone',
    'about LABone',
    'scientific equipment company',
    'laboratory equipment manufacturer',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'cleanroom equipment',
    'blood collection tubes',
    'microbiological media',
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
    title: 'About Us | LABone',
    description: `${companyInfo.name.en} - Leading manufacturer of scientific equipment, cleanrooms and microbiological media. Offices in Vietnam and United States. Phone: ${companyInfo.phone.en} (US) / ${companyInfo.phone.vi} (VN).`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/about-us`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/company/companyLabone.jpg',
        width: 1200,
        height: 630,
        alt: 'LABone - Scientific Equipment Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | LABone',
    description: `${companyInfo.name.en} - Leading manufacturer of scientific equipment with offices in Vietnam and United States.`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/about-us`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/ve-chung-toi`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/about-us`,
    },
  },
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: companyInfo.name.en,
            alternateName: 'LABone',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
            foundingDate: '2012',
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: companyInfo.address.vi.name,
                addressLocality: 'Cu Chi',
                addressRegion: 'Ho Chi Minh City',
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
