import Image from 'next/image'
import type { IWebEvent } from '@/types'
import { formatDate } from '@/helpers/format'
import { Button } from '@/components/ui/button'

interface EventCardProps {
  event: IWebEvent
  language: 'VN' | 'EN'
}

export default function EventCard({ event, language }: EventCardProps) {
  const locale = language === 'VN' ? 'vi' : 'en'
  const topic = language === 'VN' ? event.topic_vn : event.topic_en
  const booth = language === 'VN' ? event.booth_number_vn : event.booth_number_en
  const address = language === 'VN' ? event.event_location_vn : event.event_location_en
  const year = new Date(event.time_start).getFullYear()

  return (
    <article className='flex flex-col border border-gray-200 bg-white text-center rounded-lg overflow-hidden'>
      {/* 1. Logo tổ chức */}
      <div className='relative w-full aspect-4/3 min-h-[120px] bg-gray-50 shrink-0'>
        <Image
          src={event.organization_logo_url || '/assets/news/news.jpg'}
          alt={language === 'VN' ? event.organization_name_vn : event.organization_name_en}
          fill
          className='object-contain p-4'
        />
      </div>

      <div className='flex flex-col flex-1 p-2'>
        {/* 2. start_date - end_date (chỉ ngày tháng) */}
        <p className='text-sm font-medium text-gray-800'>
          {formatDate(event.time_start, locale)} – {formatDate(event.time_end, locale)}
        </p>
        {/* 3. Năm */}
        <p className='text-sm text-gray-500 mt-0.5'>{year}</p>
        {/* 4. Topic */}
        <h3 className='font-bold text-gray-900 text-sm md:text-base mt-2 line-clamp-2'>{topic}</h3>
        {/* 5. Gian hàng (vn/en) */}
        {booth ? (
          <p className='text-sm text-gray-600 mt-2'>
            {language === 'VN' ? 'Gian hàng: ' : 'Booth: '}
            {booth}
          </p>
        ) : null}
        {/* 6. Địa chỉ (vn/en) */}
        <p className='text-sm text-gray-600 mt-1 line-clamp-3 flex-1 min-h-0'>{address || '–'}</p>
        {event.organization_website ? (
          <Button
            variant='outline'
            onClick={() => {
              window.open(event.organization_website, '_blank')
            }}
            className='inline-flex items-center justify-center mt-3 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 hover:border-blue-300 cursor-pointer'
          >
            {language === 'VN' ? 'Truy cập website' : 'Website'}
          </Button>
        ) : null}
      </div>
    </article>
  )
}
