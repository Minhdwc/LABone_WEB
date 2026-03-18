'use client'

import { useRouter } from 'next/navigation'
import { useLanguageStore } from '@/store/language'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import Preview from './preview'

interface PreviewPageClientProps {
  fileUrl: string
  fileExtension: string
}

export default function PreviewPageClient({ fileUrl, fileExtension }: PreviewPageClientProps) {
  const router = useRouter()
  const { language } = useLanguageStore()
  const isPDF = fileExtension === 'pdf'

  return (
    <div className='h-screen max-w-7xl mx-auto flex flex-col bg-muted/30'>
      <header className='shrink-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-14 items-center justify-between gap-4 px-4'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-2 cursor-pointer'
            onClick={() => router.push(language === 'VN' ? '/vi/tai-lieu' : '/en/documents')}
          >
            <ArrowLeft className='h-4 w-4' />
            Quay lại
          </Button>
          {!isPDF && (
            <Button asChild size='sm' className='gap-2 cursor-pointer'>
              <a href={fileUrl} download target='_blank' rel='noopener noreferrer'>
                <Download className='h-4 w-4' />
                Tải xuống
              </a>
            </Button>
          )}
        </div>
      </header>

      <main className='flex-1 flex flex-col min-h-0 p-4'>
        <div className='flex-1 min-h-0 rounded-lg border bg-background overflow-hidden shadow-sm flex flex-col'>
          <Preview fileUrl={fileUrl} className='w-full h-full' />
        </div>
      </main>
    </div>
  )
}
