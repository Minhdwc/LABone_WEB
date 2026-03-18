import type { Metadata } from 'next'

import FilePreviewService from '@/services/file-preview.service'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params

  if (!slug) {
    return {
      title: 'Không tìm thấy file | LABone',
      description: 'File không tồn tại hoặc chưa được công khai trên LABone.',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn'
  const url = `${baseUrl}/file/${slug}`

  const file = await FilePreviewService.getFileBySlug(slug)

  const title = file?.displayName
    ? `${file.displayName} | LABone`
    : file?.type === 'coa-cq'
      ? 'Xem file tài liệu COA/CQ | LABone'
      : 'Xem file tài liệu | LABone'

  return {
    title,
    alternates: { canonical: url },
    openGraph: { title, url, type: 'article' },
    robots: {
      index: !!file,
      follow: true,
    },
  }
}

export default function FileLayout({ children }: LayoutProps) {
  return <>{children}</>
}
