import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Return and Refund Policy | LABone',
  description:
    'LABone Return and Refund Policy - Regulations on return conditions, notification time and sending returned products. Commitment to transparent and fair customer service.',
  keywords: [
    'return policy',
    'refund policy',
    'product return',
    'LABone refund',
    'return regulations',
    'return conditions',
  ],
  openGraph: {
    title: 'Return and Refund Policy | LABone',
    description: 'LABone Return and Refund Policy - Regulations on return conditions and notification time.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/return-refund-policy`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/return-refund-policy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-doi-tra-va-hoan-tien`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/return-refund-policy`,
    },
  },
}

export default function ReturnRefundPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
