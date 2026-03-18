import type { Metadata } from 'next'
import LayoutWithOptionalHeaderFooter from '@/components/layout/layout-with-optional-header-footer'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/context/cart-provider'
import LanguageSync from '../components/layout/language-sync'
import { companyInfo } from '@/lib/company-contants'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: `LABone® - ${companyInfo.name.vi}`,
  description: `${companyInfo.name.vi} được thành lập 2012 có trụ sở chính tại Thành phố Hồ Chí Minh, Việt Nam. Hiện nay, Chúng tôi là nhà sản xuất Thiết bị khoa học; Thuốc thử và Kít sinh học phân tử;`,
  keywords: [
    'LABone',
    companyInfo.name.vi,
    'Thiết Bị Khoa Học',
    'HUYlab',
    'KingLab',
    'BacterLab',
    'LabCollect',
    'thiết bị phòng thí nghiệm',
    'nội thất phòng lab',
    'tủ an toàn sinh học',
    'môi trường vi sinh',
    'ống lấy máu chân không',
    'phòng sạch',
    'laboratory equipment',
    'cleanroom',
    'biosafety cabinet',
    'laboratory furniture',
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
  return (
    <html lang='vi'>
      <body className={'font-sans antialiased'}>
        <CartProvider>
          <LanguageSync />
          <Toaster />
          <LayoutWithOptionalHeaderFooter>{children}</LayoutWithOptionalHeaderFooter>
        </CartProvider>
      </body>
    </html>
  )
}
