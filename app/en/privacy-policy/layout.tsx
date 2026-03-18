import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | LABone',
  description:
    'LABone Privacy Policy - Regulations on collection, use and protection of customer personal information. Commitment to confidentiality and privacy protection.',
  keywords: ['privacy policy', 'data protection', 'privacy', 'data security', 'personal information', 'LABone privacy'],
  openGraph: {
    title: 'Privacy Policy | LABone',
    description: 'LABone Privacy Policy - Regulations on collection and use of personal information.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/privacy-policy`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/privacy-policy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-mat-thong-tin`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/privacy-policy`,
    },
  },
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
