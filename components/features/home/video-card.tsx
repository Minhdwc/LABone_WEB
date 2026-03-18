'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Video {
  id: string
  title: string
  description: string
  videoUrl: string
}

interface VideoCardProps {
  video: Video
  className?: string
  variant?: 'default' | 'compact'
}

function getEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    const match = url.match(youtubeRegex)
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const vimeoRegex = /vimeo\.com\/(\d+)/
    const match = url.match(vimeoRegex)
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`
    }
  }

  // Nếu đã là embed URL hoặc không phải YouTube/Vimeo, trả về nguyên URL
  return url
}

function getYoutubeThumbnail(url: string): string | null {
  if (!url.includes('youtube.com/watch') && !url.includes('youtu.be/')) return null

  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(youtubeRegex)
  if (match && match[1]) {
    // Sử dụng thumbnail chất lượng cao mặc định của YouTube
    return `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`
  }
  return null
}

export function VideoCard({ video, className, variant = 'default' }: VideoCardProps) {
  const embedUrl = React.useMemo(() => getEmbedUrl(video.videoUrl), [video.videoUrl])
  const thumbnailUrl = React.useMemo(() => getYoutubeThumbnail(video.videoUrl), [video.videoUrl])
  const [iframeSrc, setIframeSrc] = React.useState<string | null>(null)

  const isCompact = variant === 'compact'

  const handlePlayClick = () => {
    const urlWithAutoplay = embedUrl.includes('?') ? `${embedUrl}&autoplay=1` : `${embedUrl}?autoplay=1`
    setIframeSrc(urlWithAutoplay)
  }

  return (
    <Card
      className={cn(
        'group relative overflow-hidden bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300',
        className,
      )}
    >
      <div
        className={cn('relative overflow-hidden bg-black rounded-t-lg', isCompact ? 'aspect-[4/3]' : 'aspect-video')}
      >
        {/* Thumbnail hiển thị trước khi load iframe để giữ trải nghiệm trực quan */}
        {!iframeSrc && thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            sizes={isCompact ? '(max-width: 768px) 100vw, 400px' : '(max-width: 768px) 100vw, 640px'}
            className='object-cover'
            loading='lazy'
          />
        )}

        {!iframeSrc && (
          <button
            type='button'
            className='absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 text-white text-sm font-medium z-10'
            onClick={handlePlayClick}
          >
            ▶ Xem video
          </button>
        )}
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            title={video.title}
            className='absolute inset-0 w-full h-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            loading='lazy'
          />
        )}
      </div>

      {/* Video Description */}
      <div
        className={cn('bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-b-lg h-full', isCompact ? 'p-3' : 'p-4')}
      >
        <h3
          className={cn(
            'font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2',
            isCompact ? 'text-xs' : 'text-sm',
          )}
        >
          {video.title}
        </h3>
        <p className={cn('text-gray-600 dark:text-gray-300 line-clamp-2', isCompact ? 'text-[10px]' : 'text-xs')}>
          {video.description}
        </p>
      </div>
    </Card>
  )
}
