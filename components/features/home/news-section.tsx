'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { useLanguageStore } from '@/store/language'
import { IWebNew, IWebEvent } from '@/types'
import Image from 'next/image'
import { Newspaper, Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/helpers/format'
import DOMPurify from 'isomorphic-dompurify'
interface NewsSectionProps {
  news?: IWebNew[]
  events?: IWebEvent[]
}

export default function NewsSection({ news = [], events = [] }: NewsSectionProps) {
  const { language } = useLanguageStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'news' | 'event'>('news')
  const displayedNews = news
  const displayedEvents = events
  const getTitle = (news: IWebNew) => {
    return language === 'VN' ? news.title_vn : news.title_en
  }

  const getSlug = (news: IWebNew) => {
    return language === 'VN' ? news.slug_vn : news.slug_en
  }

  const getContent = (news: IWebNew) => {
    const rawContent = language === 'VN' ? news.content_vn : news.content_en
    const plainText = DOMPurify.sanitize(rawContent, { ALLOWED_TAGS: [] })
    return plainText
  }
  const handleNewsClick = (news: IWebNew) => {
    const basePath = language === 'VN' ? '/vi/tin-tuc' : '/en/new'
    router.push(`${basePath}/${getSlug(news)}`)
  }

  const handleSeeAllNewsClick = () => {
    router.push(language === 'VN' ? '/vi/tin-tuc' : '/en/new')
  }

  const handleSeeAllEventsClick = () => {
    router.push(language === 'VN' ? '/vi/su-kien' : '/en/event')
  }
  const labelYear = (event: IWebEvent) => {
    const startYear = new Date(event.time_start).getFullYear()
    const endYear = new Date(event.time_end).getFullYear()
    if (startYear === endYear) {
      return startYear
    }
    return `${startYear} - ${endYear}`
  }
  const newsTabLabel = language === 'VN' ? 'Tin tức' : 'News'
  const eventTabLabel = language === 'VN' ? 'Sự kiện' : 'Events'

  return (
    <section className='py-8 bg-gray-200'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 uppercase mb-4'>
            {language === 'VN' ? 'TIN TỨC & SỰ KIỆN' : 'NEWS & EVENTS'}
          </h2>
          <div className='mx-auto mb-4 w-16 h-0.5 bg-blue-600 rounded-full' aria-hidden />
          <p className='text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed'>
            {activeTab === 'news'
              ? language === 'VN'
                ? 'Đọc các bài viết, cập nhật và thông tin chi tiết mới nhất từ LABone về thiết bị khoa học, giải pháp phòng thí nghiệm và xu hướng ngành.'
                : 'Read the latest articles, updates, and insights from LABone about scientific equipment, laboratory solutions, and industry trends.'
              : language === 'VN'
                ? 'Khám phá các triển lãm, hội nghị và hoạt động sắp tới của LABone trong ngành thiết bị khoa học và phòng thí nghiệm.'
                : 'Discover upcoming exhibitions, conferences, and activities from LABone in the scientific equipment and laboratory industry.'}
          </p>
        </div>

        {/* White Card Container */}
        <div className='bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-6xl mx-auto border border-gray-100'>
          {/* Tabs */}
          <div className='flex gap-3 mb-8 border-b-2 border-gray-200 justify-center'>
            <button
              type='button'
              onClick={() => setActiveTab('news')}
              aria-label={newsTabLabel}
              className={`relative px-6 py-3 font-semibold text-sm md:text-base transition-all duration-300 rounded-t-lg ${
                activeTab === 'news'
                  ? 'text-blue-600 bg-blue-50 cursor-pointer'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className='flex items-center gap-2'>
                <Newspaper className='w-4 h-4' />
                <span>{newsTabLabel}</span>
              </div>
              {activeTab === 'news' && (
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full' />
              )}
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('event')}
              aria-label={eventTabLabel}
              className={`relative px-6 py-3 font-semibold text-sm md:text-base transition-all duration-300 rounded-t-lg ${
                activeTab === 'event'
                  ? 'text-blue-600 bg-blue-50 cursor-pointer'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <span>{eventTabLabel}</span>
              </div>
              {activeTab === 'event' && (
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full' />
              )}
            </button>
          </div>

          {/* Tab content: News */}
          {activeTab === 'news' && (
            <>
              {displayedNews.length === 0 ? (
                <div className='text-center py-16 md:py-20'>
                  <div className='inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 mb-4'>
                    <Newspaper className='w-8 h-8 md:w-10 md:h-10 text-gray-400' />
                  </div>
                  <p className='text-gray-500 text-base md:text-lg font-medium'>
                    {language === 'VN' ? 'Không có dữ liệu' : 'No data available'}
                  </p>
                  <p className='text-gray-400 text-sm mt-2'>
                    {language === 'VN' ? 'Vui lòng quay lại sau' : 'Please check back later'}
                  </p>
                </div>
              ) : (
                <div className='relative'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                    {displayedNews.slice(0, 4).map((news) => (
                      <Card
                        key={news.new_id}
                        onClick={() => handleNewsClick(news)}
                        tabIndex={0}
                        role='button'
                        aria-label={`${getTitle(news)} - ${language === 'VN' ? 'Xem thêm' : 'Read more'}`}
                        className='group overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 cursor-pointer'
                      >
                        <div className='flex flex-col sm:flex-row gap-4 p-4 md:p-5'>
                          {/* Image Container - Left */}
                          <div className='relative w-full sm:w-36 h-36 md:h-40 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-200'>
                            <Image
                              src={news.main_image_url || '/assets/news/news.jpg'}
                              alt={getTitle(news)}
                              fill
                              className='object-cover'
                              sizes='(max-width: 640px) 100vw, 144px'
                            />
                          </div>

                          {/* Content - Right */}
                          <div className='flex-1 flex flex-col justify-between min-w-0'>
                            <div>
                              <h3 className='font-bold text-blue-600 text-base md:text-lg mb-2 line-clamp-2 leading-tight'>
                                {getTitle(news)}
                              </h3>
                              <p className='text-gray-600 text-sm md:text-base mb-3 line-clamp-2 leading-relaxed'>
                                {getContent(news)}
                              </p>
                              {news.createdAt && (
                                <p className='text-gray-400 text-xs mb-3'>
                                  {new Date(news.createdAt).toLocaleDateString(language === 'VN' ? 'vi-VN' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                              )}
                            </div>
                            <div className='flex items-center justify-end mt-auto pt-2'>
                              <span className='text-orange-500 text-sm md:text-base font-semibold flex items-center gap-1.5'>
                                <span>{language === 'VN' ? 'Xem thêm' : 'Read more'}</span>
                                <ArrowRight className='w-4 h-4' />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* See All Button */}
                  <div className='flex justify-end mt-4'>
                    <button
                      onClick={handleSeeAllNewsClick}
                      className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                      aria-label={language === 'VN' ? 'Xem tất cả' : 'See all'}
                    >
                      <span>{language === 'VN' ? 'Xem tất cả' : 'See all'}</span>
                      <ArrowRight className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Tab content: Event - grid thẻ dọc: logo → ngày (dd/tháng) → năm → topic → địa điểm → nút Truy cập website */}
          {activeTab === 'event' && (
            <>
              {displayedEvents.length === 0 ? (
                <div className='text-center py-16 md:py-20'>
                  <div className='inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 mb-4'>
                    <Calendar className='w-8 h-8 md:w-10 md:h-10 text-gray-400' />
                  </div>
                  <p className='text-gray-500 text-base md:text-lg font-medium'>
                    {language === 'VN' ? 'Không có dữ liệu' : 'No data available'}
                  </p>
                  <p className='text-gray-400 text-sm mt-2'>
                    {language === 'VN' ? 'Vui lòng quay lại sau' : 'Please check back later'}
                  </p>
                </div>
              ) : (
                <div className='relative'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {displayedEvents.slice(0, 6).map((event) => (
                      <div
                        key={event.event_id}
                        className='flex flex-col items-center text-center p-5 rounded-xl border border-gray-200 bg-white min-h-[320px]'
                      >
                        {/* 1. Logo */}
                        <div className='relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100 mb-4'>
                          <Image
                            src={event.organization_logo_url || '/assets/news/news.jpg'}
                            alt={event.organization_name_vn || event.organization_name_en}
                            fill
                            className='object-contain p-1'
                            sizes='80px'
                          />
                        </div>
                        {/* 2. Ngày bắt đầu - Ngày kết thúc (chỉ ngày tháng) */}
                        <p className='text-base font-bold text-gray-900 mb-0.5'>
                          {formatDate(event.time_start, language === 'VN' ? 'vi' : 'en')} –{' '}
                          {formatDate(event.time_end, language === 'VN' ? 'vi' : 'en')}
                        </p>
                        {/* 3. Năm */}
                        <p className='text-sm text-gray-500 mb-3'>{labelYear(event)}</p>
                        {/* 4. Topic theo locale */}
                        <h3 className='font-bold text-gray-900 text-sm md:text-base mb-2 line-clamp-2'>
                          {language === 'VN' ? event.topic_vn : event.topic_en}
                        </h3>
                        {/* 5. Địa điểm */}
                        <p className='text-sm text-gray-600 mb-4 line-clamp-3 flex-1 min-h-0'>
                          {language === 'VN' ? event.event_location_vn : event.event_location_en}
                        </p>
                        {/* 6. Nút Truy cập website */}
                        {event.organization_website ? (
                          <a
                            href={event.organization_website}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center justify-center gap-2 w-full max-w-[200px] py-2.5 px-4 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                          >
                            {language === 'VN' ? 'Truy cập website' : 'WEBSITE'}
                            <ArrowRight className='w-4 h-4 shrink-0' />
                          </a>
                        ) : (
                          <span className='inline-flex items-center justify-center gap-2 w-full max-w-[200px] py-2.5 px-4 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed'>
                            {language === 'VN' ? 'Truy cập website' : 'WEBSITE'}
                            <ArrowRight className='w-4 h-4 shrink-0' />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-end mt-4'>
                    <button
                      onClick={handleSeeAllEventsClick}
                      className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                      aria-label={language === 'VN' ? 'Xem tất cả' : 'See all'}
                    >
                      <span>{language === 'VN' ? 'Xem tất cả' : 'See all'}</span>
                      <ArrowRight className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
