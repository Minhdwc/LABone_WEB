import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách xử lý khiếu nại | LABone',
  description:
    'Chính sách xử lý khiếu nại của LABone - Quy trình tiếp nhận và giải quyết khiếu nại của khách hàng. Cam kết xử lý nhanh chóng và minh bạch trong vòng 03 ngày làm việc.',
  keywords: [
    'chính sách xử lý khiếu nại',
    'khiếu nại khách hàng',
    'giải quyết khiếu nại',
    'xử lý khiếu nại LABone',
    'thủ tục bảo hành',
    'dịch vụ khách hàng',
  ],
  openGraph: {
    title: 'Chính sách xử lý khiếu nại | LABone',
    description: 'Chính sách xử lý khiếu nại của LABone - Quy trình tiếp nhận và giải quyết khiếu nại của khách hàng.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-xu-ly-kieu-nai`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-xu-ly-kieu-nai`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-xu-ly-kieu-nai`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/complaint-handling-policy`,
    },
  },
}

export default function ComplaintHandlingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
