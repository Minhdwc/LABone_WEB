import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warranty Policy | LABone',
  description:
    'LABone Warranty Policy - Product warranty regulations, exchange and refund conditions. Commitment to transparent and fair warranty services.',
  keywords: ['warranty policy', 'LABone warranty', 'product exchange', 'refund', 'warranty card'],
  openGraph: {
    title: 'Warranty Policy | LABone',
    description: 'LABone Warranty Policy - Product warranty regulations and exchange conditions.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/warranty-policy`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/warranty-policy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-hanh`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/warranty-policy`,
    },
  },
}

export default function WarrantyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
