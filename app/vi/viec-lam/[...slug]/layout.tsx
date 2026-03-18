import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Tiết Việc Làm | LABone - Tuyển Dụng',
  description:
    'Xem chi tiết công việc tại LABone. Thông tin về vị trí tuyển dụng, mô tả công việc, yêu cầu và cách nộp đơn.',
  keywords: ['LABone', 'việc làm', 'tuyển dụng', 'chi tiết công việc', 'nộp đơn', 'careers'],
  robots: {
    index: true,
    follow: true,
  },
}

export default function JobDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
