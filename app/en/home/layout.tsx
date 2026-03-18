import type { Metadata } from 'next'
import { companyInfo } from '@/lib/company-contants'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: `LABone® - ${companyInfo.name.en}`,
  description: `${companyInfo.name.en} was established in 2012 with headquarters in Ho Chi Minh City, Vietnam. Currently, we are a manufacturer of Scientific Equipment; Reagents and Molecular Biology Kits;`,
  keywords: [
    'LABone',
    companyInfo.name.en,
    'Scientific Equipment',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'laboratory equipment',
    'laboratory furniture',
    'biosafety cabinet',
    'microbiological media',
    'vacuum blood collection tubes',
    'cleanroom',
    'blood collection tubes',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
    },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
