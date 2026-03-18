import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const basePath = '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc'
const canonicalUrl = `${siteUrl}${basePath}`
const defaultImage = '/assets/company/companyLabone.jpg'

export const metadata: Metadata = {
  title: 'Khóa Học và Đào Tạo | LABone Lab Academy',
  description:
    'Khám phá các chương trình khóa học và đào tạo của LABone Lab Academy bao gồm khóa học phòng thí nghiệm, hội thảo trực tuyến và đào tạo thực hành.',
  keywords: [
    'LABone Lab Academy',
    'khóa học và đào tạo',
    'khóa học phòng thí nghiệm',
    'webinar khoa học',
    'đào tạo thực hành',
    'chương trình Lab Academy',
    'đào tạo LABone',
    'giáo dục khoa học',
  ],
  authors: [{ name: 'LABone' }],
  creator: 'LABone',
  publisher: 'LABone',
  openGraph: {
    title: 'Khóa Học và Đào Tạo | LABone Lab Academy',
    description:
      'Khám phá các chương trình khóa học và đào tạo của LABone Lab Academy bao gồm khóa học phòng thí nghiệm, hội thảo trực tuyến và đào tạo thực hành.',
    url: canonicalUrl,
    siteName: 'LABone',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'LABone Lab Academy - Khóa Học và Đào Tạo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khóa Học và Đào Tạo | LABone Lab Academy',
    description:
      'Khám phá các chương trình khóa học và đào tạo của LABone Lab Academy bao gồm khóa học phòng thí nghiệm, hội thảo trực tuyến và đào tạo thực hành.',
    images: [defaultImage],
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
    canonical: canonicalUrl,
    languages: {
      'vi-VN': canonicalUrl,
      'en-US': `${siteUrl}/en/lab-academy/education-and-training`,
    },
  },
}

export default function EducationTrainingLayoutVI({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
