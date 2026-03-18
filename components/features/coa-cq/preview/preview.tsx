'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface PreviewProps {
  fileUrl: string
  title?: string
  className?: string
}

export default function Preview({ fileUrl, title = 'Xem trước', className = '' }: PreviewProps) {
  const fileExtension = fileUrl.split('.').pop()?.toLowerCase() ?? ''

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleForceDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    const fileName = fileUrl.split('/').pop() || 'download'
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(fileUrl, '_blank')
    }
  }

  switch (fileExtension) {
    case 'pdf':
      return (
        <iframe
          src={fileUrl}
          title={title}
          className={`w-full h-full border-none ${className}`}
          onContextMenu={handleContextMenu}
        />
      )
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return (
        <img
          src={fileUrl}
          alt={title}
          className={`max-w-full h-full w-auto object-contain select-none ${className}`}
          style={{ userSelect: 'none' }}
          onContextMenu={handleContextMenu}
          draggable={false}
        />
      )
    case 'mp4':
    case 'webm':
      return (
        <video
          controls
          className={`w-full h-full max-h-full object-contain ${className}`}
          onContextMenu={handleContextMenu}
        >
          <source src={fileUrl} type={`video/${fileExtension}`} />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      )
    case 'xlsx':
    case 'xls':
    case 'doc':
    case 'docx':
      return (
        <div className={`relative w-full h-full ${className}`}>
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            title={`${title} Office`}
            className='w-full h-full border-none'
            onContextMenu={handleContextMenu}
          />
          <div
            className='absolute left-0 bottom-0 w-full h-12 z-[2] cursor-not-allowed'
            style={{ background: 'transparent' }}
            onContextMenu={(e) => e.preventDefault()}
            aria-hidden
          />
        </div>
      )
    default:
      return (
        <div className={`h-full flex flex-col items-center justify-center gap-4 p-8 ${className}`}>
          <p className='text-muted-foreground text-sm text-center'>
            Không thể xem trước file này.{' '}
            <button type='button' onClick={handleForceDownload} className='text-primary underline hover:no-underline'>
              Tải xuống
            </button>{' '}
            để xem.
          </p>
          <Button asChild>
            <a href={fileUrl} download target='_blank' rel='noopener noreferrer'>
              <Download className='mr-2 h-4 w-4' />
              Tải xuống
            </a>
          </Button>
        </div>
      )
  }
}
