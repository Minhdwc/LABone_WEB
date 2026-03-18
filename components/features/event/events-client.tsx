'use client'

import { useLanguageStore } from '@/store/language'
import type { WebEventPageData } from '@/services/web-event.service'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import EventCard from './event-card'

interface EventsClientProps {
  events: WebEventPageData
}

export default function EventsClient({ events }: EventsClientProps) {
  const { language } = useLanguageStore()
  const router = useRouter()

  const hero = {
    EN: {
      title: 'Events',
      description:
        'Find us at events, conferences and trade shows. Come and meet our team. We are looking forward to seeing you there! We are looking forward to seeing you at events, conferences and trade shows. We are looking forward to seeing you at events, conferences and trade shows.',
    },
    VN: {
      title: 'Sự kiện',
      description:
        'Gặp gỡ, hợp tác, trao đổi, khám phá và tham gia các sự kiện, hội nghị và triển lãm của LABone sắp diễn ra trong năm. Chúng tôi rất hân hạnh được gặp bạn tại các sự kiện, hội nghị và triển lãm của chúng tôi. Chúng tôi rất hân hạnh được gặp bạn tại các sự kiện, hội nghị và triển lãm của chúng tôi.',
    },
  }

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section - Interscience style */}
      <div className='relative h-[280px] sm:h-[320px] bg-linear-to-br from-slate-800 via-slate-700 to-slate-900'>
        <div className='relative h-full flex items-center justify-center px-4'>
          <div className='text-center space-y-3 max-w-4xl'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight'>
              {language === 'VN' ? hero.VN.title : hero.EN.title}
            </h1>
            <p className='text-base sm:text-lg text-white/80 max-w-2xl mx-auto'>
              {language === 'VN' ? hero.VN.description : hero.EN.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <div className='mb-6'>
          <Button
            variant='ghost'
            className='gap-2 -ml-2 text-gray-600 hover:text-gray-900 cursor-pointer'
            onClick={() => router.back()}
          >
            <ArrowLeft className='w-4 h-4' />
            {language === 'VN' ? 'Quay lại' : 'Back'}
          </Button>
        </div>

        {/* Grid: 6 items per row from lg (Interscience style) */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {events.data && events.data.length > 0 ? (
            events.data.map((event) => <EventCard key={event.event_id} event={event} language={language} />)
          ) : (
            <div className='col-span-full text-center py-16 text-gray-500'>
              {language === 'VN' ? 'Không có sự kiện nào.' : 'No exhibitions available.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
