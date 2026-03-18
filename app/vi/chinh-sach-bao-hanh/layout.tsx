import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách bảo hành | LABone',
  description:
    'Chính sách bảo hành của LABone - Quy định về bảo hành sản phẩm, điều kiện đổi trả và hoàn tiền. Cam kết dịch vụ bảo hành minh bạch và công bằng.',
  keywords: ['chính sách bảo hành', 'bảo hành LABone', 'đổi trả sản phẩm', 'hoàn tiền', 'phiếu bảo hành'],
  openGraph: {
    title: 'Chính sách bảo hành | LABone',
    description: 'Chính sách bảo hành của LABone - Quy định về bảo hành sản phẩm và điều kiện đổi trả.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-hanh`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-hanh`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-bao-hanh`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/warranty-policy`,
    },
  },
}

export default function WarrantyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
