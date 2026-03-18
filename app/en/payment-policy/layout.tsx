import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Policy | LABone',
  description:
    'LABone Payment Policy - 3 payment methods: Cash at office, COD, Bank transfer. Bank account information and important notes.',
  keywords: ['payment policy', 'LABone payment', 'payment methods'],
  openGraph: {
    title: 'Payment Policy | LABone',
    description: 'LABone Payment Policy - 3 convenient payment methods for customers.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/payment-policy`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/payment-policy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-thanh-toan`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/payment-policy`,
    },
  },
}

export default function PaymentPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
