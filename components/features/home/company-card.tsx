'use client'

import Image from 'next/image'
import { useLanguageStore } from '@/store/language'
import { companyHeroVN, companyHeroEN } from '@/lib/company-contants'
import { GlobeIcon } from 'lucide-react'

export default function CompanyCard() {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? companyHeroVN : companyHeroEN

  return (
    <section className='relative w-full h-auto min-h-[360px] sm:min-h-[460px] md:h-[540px] overflow-hidden'>
      <Image
        src='/assets/company/companyLabone.jpg'
        alt='LABone Company'
        fetchPriority='high'
        fill
        priority
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1440px'
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQEBIQFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAK8BIAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAABAgMABAb/xAApEAACAQQBAwMDBQAAAAAAAAABAgMABBEhEjFBBSJRYYEycaGx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQIAEf/aAAwDAQACEQMRAD8A9xREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH//2Q=='
      />

      {/* Dark gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/20' aria-hidden />

      {/* Content */}
      <div className='relative z-10 h-full'>
        <div className='container mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center py-10 sm:py-12 md:py-0'>
          <div className='grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8 items-center w-full'>
            {/* Left: Text */}
            <div className='space-y-4 sm:space-y-5 text-white max-w-xl md:max-w-2xl'>
              <p className='text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] text-blue-300 uppercase'>
                {content.label}
              </p>

              <div className='space-y-1 sm:space-y-2'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold leading-tight tracking-tight'>
                  <span className='block text-blue-400'>{content.title.line2}</span>
                </h1>
              </div>

              <p className='text-sm sm:text-base lg:text-lg text-gray-100 max-w-xl md:max-w-2xl'>
                {content.description}
              </p>

              <div className='mt-5 sm:mt-6 space-y-3 max-w-md'>
                {/* Stats row */}
                <div className='grid grid-cols-3 gap-4'>
                  {content.stats.map((item) => (
                    <div key={item.label} className='space-y-1'>
                      <p className='text-xl sm:text-2xl lg:text-3xl font-extrabold text-white'>{item.value}</p>
                      <p className='text-[10px] sm:text-[11px] md:text-xs font-medium text-gray-300 uppercase tracking-[0.2em]'>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Global distribution pill */}
                {content.labelGlobal && (
                  <div className='inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/20 px-3 py-1.5'>
                    <span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20'>
                      <GlobeIcon className='h-3.5 w-3.5 text-blue-300' />
                    </span>
                    <p className='text-[11px] md:text-xs font-medium text-gray-100 uppercase tracking-[0.2em]'>
                      {content.labelGlobal}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: keep empty area to reveal more of background image on desktop */}
            <div className='hidden md:block' aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
