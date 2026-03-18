import Link from 'next/link'
import NotFound from '@/app/[...notFound]/page'
import FilePreviewService from '@/services/file-preview.service'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PreviewPageClient from '@/components/features/document/preview/preview-page-client'
import CoaCqPreviewPageClient from '@/components/features/coa-cq/preview/preview-page-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params

  if (!slug) {
    return <NotFound />
  }

  const file = await FilePreviewService.getFileBySlug(slug)

  if (file?.type === 'coa-cq') {
    return <CoaCqPreviewPageClient fileUrl={file.fileUrl} fileExtension={file.fileExtension} />
  }

  if (file?.type === 'document') {
    return <PreviewPageClient fileUrl={file.fileUrl} fileExtension={file.fileExtension} />
  }

  if (file?.type === 'web-menu-file') {
    return <PreviewPageClient fileUrl={file.fileUrl} fileExtension={file.fileExtension} />
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-muted/30'>
      <p className='text-destructive font-medium'>Không tìm thấy file hoặc file chưa được công khai.</p>
      <Button asChild variant='outline'>
        <Link href='/'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại
        </Link>
      </Button>
    </div>
  )
}
