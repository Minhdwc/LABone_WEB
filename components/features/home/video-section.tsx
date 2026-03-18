import * as React from 'react'
import { VideoCard } from '@/components/features/home/video-card'
import { mockVideoData } from '@/lib/mock-data'

interface VideoSectionProps {
  variant?: 'default' | 'compact'
}

export function VideoSection({ variant = 'default' }: VideoSectionProps) {
  const isCompact = variant === 'compact'

  if (isCompact) {
    return (
      <div className='h-full flex flex-col'>
        {/* Section Title */}
        <div className='mb-6'>
          <h2 className='text-2xl lg:text-3xl font-bold text-blue-600 mb-2 tracking-tight'>VIDEO</h2>
        </div>

        {/* Video Grid - Single column for compact, limit to 2 items */}
        <div className='space-y-5 flex-1'>
          {mockVideoData.slice(0, 2).map((video) => (
            <VideoCard key={video.id} video={video} variant='compact' />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className='py-8 bg-white dark:bg-black border-y border-gray-100'>
      <div className='container mx-auto px-4'>
        {/* Section Title */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4'>VIDEO</h2>
          <div className='mx-auto w-16 h-0.5 bg-blue-600 rounded-full' aria-hidden />
        </div>

        {/* Video Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {mockVideoData.map((video) => (
            <VideoCard key={video.id} video={video} className='h-full' />
          ))}
        </div>
      </div>
    </section>
  )
}
