import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách thanh toán | LABone',
  description:
    'Chính sách thanh toán của LABone - 3 hình thức thanh toán: Tiền mặt trực tiếp, COD, Chuyển khoản. Thông tin tài khoản ngân hàng và các lưu ý quan trọng.',
  keywords: ['chính sách thanh toán', 'thanh toán LABone', 'phương thức thanh toán'],
  openGraph: {
    title: 'Chính sách thanh toán | LABone',
    description: 'Chính sách thanh toán của LABone - 3 hình thức thanh toán thuận tiện cho khách hàng.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-thanh-toan`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-thanh-toan`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-thanh-toan`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/payment-policy`,
    },
  },
}

export default function PaymentPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
