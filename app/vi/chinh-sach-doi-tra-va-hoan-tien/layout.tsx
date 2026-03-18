import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách đổi trả và hoàn tiền | LABone',
  description:
    'Chính sách đổi trả và hoàn tiền của LABone - Quy định về điều kiện đổi trả, thời gian thông báo và gửi sản phẩm đổi trả. Cam kết dịch vụ khách hàng minh bạch và công bằng.',
  keywords: [
    'chính sách đổi trả',
    'chính sách hoàn tiền',
    'đổi trả hàng hóa',
    'hoàn tiền LABone',
    'quy định đổi trả',
    'điều kiện đổi trả',
  ],
  openGraph: {
    title: 'Chính sách đổi trả và hoàn tiền | LABone',
    description: 'Chính sách đổi trả và hoàn tiền của LABone - Quy định về điều kiện đổi trả và thời gian thông báo.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-doi-tra-va-hoan-tien`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-doi-tra-va-hoan-tien`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-doi-tra-va-hoan-tien`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/return-refund-policy`,
    },
  },
}

export default function ReturnRefundPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
