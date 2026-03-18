import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tin Tức | LABone',
  description:
    'Chi tiết tin tức từ LABone - Cập nhật thông tin mới nhất về các hoạt động, triển lãm và sự kiện của công ty.',
  keywords: [
    'tin tức LABone',
    'chi tiết tin tức',
    'triển lãm Analytica',
    'thiết bị phòng thí nghiệm',
    'tin tức công nghệ',
    'tin tức khoa học',
  ],
  authors: [{ name: 'LABone' }],
  creator: 'LABone',
  publisher: 'LABone',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/tin-tuc`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/new`,
    },
  },
}

export default function NewsDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
