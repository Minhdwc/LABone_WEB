'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { FaArrowLeft } from 'react-icons/fa'

interface PreviewProps {
  url: string
  title?: string
  height?: string
}

const Preview: React.FC<PreviewProps> = ({ url, title = 'Xem trước', height = '800px' }) => {
  const router = useRouter()
  const fileExtension = url.split('.').pop()?.toLowerCase()

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleBack = () => {
    router.back()
  }

  const renderPreview = () => {
    switch (fileExtension) {
      case 'pdf':
        return (
          <iframe
            src={`${url}`}
            width='100%'
            height={height}
            style={{ border: 'none', borderRadius: '0.5rem' }}
            className='w-full'
            onContextMenu={handleContextMenu}
          >
            <p>
              Không thể hiển thị PDF. <a href={url}>Tải xuống</a> để xem.
            </p>
          </iframe>
        )
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return (
          <div
            className='relative w-full flex items-center justify-center'
            style={{ maxHeight: height, minHeight: '400px' }}
          >
            <Image
              src={url}
              alt={title}
              width={1200}
              height={800}
              className='w-full h-auto object-contain rounded-lg'
              style={{
                maxHeight: height,
                userSelect: 'none',
              }}
              onContextMenu={handleContextMenu}
              draggable={false}
              unoptimized
            />
          </div>
        )
      case 'mp4':
      case 'webm':
      case 'ogg':
        return (
          <video
            controls
            width='100%'
            height={height}
            style={{ maxHeight: height, borderRadius: '0.5rem' }}
            className='w-full'
            onContextMenu={handleContextMenu}
          >
            <source src={url} type={`video/${fileExtension}`} />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        )
      case 'xlsx':
      case 'xls':
      case 'csv':
      case 'doc':
      case 'docx':
        return (
          <div style={{ position: 'relative', width: '100%', height }} className='w-full'>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
              width='100%'
              height={height}
              style={{ border: 'none', borderRadius: '0.5rem' }}
              className='w-full'
              onContextMenu={handleContextMenu}
            >
              <p>
                Không thể hiển thị file Office. <a href={url}>Tải xuống</a> để xem.
              </p>
            </iframe>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '50px',
                zIndex: 2,
                background: 'transparent',
                cursor: 'not-allowed',
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )
      default:
        return (
          <div className='flex items-center justify-center' style={{ height }}>
            <p className='text-muted-foreground'>Không thể xem trước file này.</p>
          </div>
        )
    }
  }

  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      <Card className='shadow-lg'>
        <CardHeader className='pb-4 border-b'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='sm' onClick={handleBack} className='shrink-0 cursor-pointer'>
              <FaArrowLeft className='h-4 w-4 mr-2' />
              Quay lại
            </Button>
            <h2 className='text-2xl font-semibold tracking-tight flex-1'>{title}</h2>
          </div>
        </CardHeader>
        <CardContent className='p-6' style={{ position: 'relative' }}>
          <style>{`
            .no-drag-select {
              -webkit-user-drag: none;
              user-select: none;
            }
            .preview-container {
              position: relative;
              overflow: hidden;
              width: 100%;
              min-height: 400px;
              background: #f5f5f5;
              border-radius: 0.5rem;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              width: 80%;
              max-width: 600px;
              height: 200px;
              z-index: 10;
              background: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(2px);
              border-radius: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              pointer-events: none;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
          `}</style>
          <div className='preview-container'>{renderPreview()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Preview
