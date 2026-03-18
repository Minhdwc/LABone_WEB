import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách vận chuyển và giao nhận | LABone',
  description:
    'Chính sách vận chuyển và giao nhận của LABone - Phương thức giao hàng, thời gian giao hàng 3-5 ngày, phí vận chuyển và các quy định về địa lý giao hàng.',
  keywords: [
    'chính sách vận chuyển',
    'chính sách giao nhận',
    'phương thức giao hàng',
    'thời gian giao hàng',
    'phí vận chuyển',
    'giao hàng LABone',
  ],
  openGraph: {
    title: 'Chính sách vận chuyển và giao nhận | LABone',
    description: 'Chính sách vận chuyển và giao nhận của LABone - Phương thức giao hàng và thời gian giao hàng.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-van-chuyen`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-van-chuyen`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-van-chuyen`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/shipping-policy`,
    },
  },
}

export default function ShippingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
