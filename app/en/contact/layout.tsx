import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'

export const metadata: Metadata = {
  title: 'Contact Us | LABone - Professional Scientific Equipment',
  description: `Contact LABone for consultation and support on laboratory equipment, lab furniture, bioreactors, microbiology media, and professional scientific products. Hotline: ${companyInfo.phone.en}, Email: ${companyInfo.email.en}`,
  keywords: [
    'LABone',
    'contact LABone',
    'laboratory equipment consultation',
    'technical support',
    'lab equipment quote',
    'scientific equipment',
    'laboratory',
    'laboratory equipment',
    'scientific materials',
    'research',
    'contact',
    'consultation',
    'support',
    'Cu Chi',
    'Ho Chi Minh City',
    'Vietnam',
    'hotline',
    'email',
    'website',
    'products',
    'services',
    'brands',
    'policies',
    'customer support',
    'scientific equipment supplier',
    'Vietnam laboratory equipment',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'laboratory furniture',
    'bioreactor',
    'microbiology media',
    companyInfo.address.en.name,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact`,
    languages: {
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact`,
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/lien-he`,
    },
  },
  openGraph: {
    title: `Contact | ${companyInfo.name.en}`,
    description: `Contact LABone to get consultation and support on scientific equipment, laboratory furniture, bioreactor, microbiology media, and scientific products. Hotline: ${companyInfo.phone.en}, Email: ${companyInfo.email.en}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact`,
    siteName: 'LABone',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Logo-LABone-png.png',
        width: 1200,
        height: 630,
        alt: 'LABone - Scientific Equipment Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | LABone',
    description: `Contact LABone to get consultation and support on scientific equipment, laboratory furniture, bioreactor, microbiology media, and scientific products. Hotline: ${companyInfo.phone.en}, Email: ${companyInfo.email.en}`,
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
            name: 'Contact LABone',
            description:
              'LABone contact page - Scientific Equipment Company specializing in manufacturing and supplying laboratory equipment',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact`,
            mainEntity: {
              '@type': 'Organization',
              name: companyInfo.name.en,
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/Logo-LABone-png.png`,
              description:
                'LABone - Scientific Equipment Company specializing in manufacturing and supplying laboratory equipment with 4 brands: HUYlab, KingLab, BacterLab, and LabCollect',
              address: {
                '@type': 'PostalAddress',
                streetAddress: companyInfo.address.en.name.split(',')[0],
                addressLocality: 'Cu Chi Commune',
                addressRegion: 'Ho Chi Minh City',
                addressCountry: 'VN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: companyInfo.phone.en,
                  contactType: 'Customer Service',
                  areaServed: 'VN',
                  availableLanguage: ['Vietnamese', 'English'],
                },
                {
                  '@type': 'ContactPoint',
                  email: companyInfo.email.en,
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
