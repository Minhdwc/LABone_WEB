import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping and Delivery Policy | LABone',
  description:
    'LABone Shipping and Delivery Policy - Delivery methods, 3-5 day delivery time, shipping fees and geographical delivery regulations.',
  keywords: [
    'shipping policy',
    'delivery policy',
    'delivery methods',
    'delivery time',
    'shipping fees',
    'LABone shipping',
  ],
  openGraph: {
    title: 'Shipping and Delivery Policy | LABone',
    description: 'LABone Shipping and Delivery Policy - Delivery methods and delivery time.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/shipping-policy`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/shipping-policy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-van-chuyen`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/shipping-policy`,
    },
  },
}

export default function ShippingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
