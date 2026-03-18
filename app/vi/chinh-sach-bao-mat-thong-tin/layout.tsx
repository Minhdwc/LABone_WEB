import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật thông tin | LABone',
  description:
    'Chính sách bảo mật thông tin của LABone - Quy định về thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng. Cam kết bảo mật và bảo vệ quyền riêng tư.',
  keywords: [
    'chính sách bảo mật',
    'bảo mật thông tin',
    'quyền riêng tư',
    'bảo vệ dữ liệu',
    'thông tin cá nhân',
    'LABone privacy',
  ],
  openGraph: {
    title: 'Chính sách bảo mật thông tin | LABone',
    description: 'Chính sách bảo mật thông tin của LABone - Quy định về thu thập và sử dụng thông tin cá nhân.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-mat-thong-tin`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-mat-thong-tin`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-mat-thong-tin`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/privacy-policy`,
    },
  },
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
