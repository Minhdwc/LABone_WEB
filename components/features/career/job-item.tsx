import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { IRecruitment } from '@/types'
import { Calendar, Briefcase, Users, MapPin } from 'lucide-react'

interface JobItemProps {
  job: IRecruitment
  locale: 'vi' | 'en'
}

// Simple color palette
const colors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-red-500',
  'bg-cyan-500',
  'bg-amber-500',
]

// Generate consistent color based on title
const getColorForTitle = (title: string): string => {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Get first letter of title
const getFirstLetter = (title: string): string => {
  return title.trim().charAt(0).toUpperCase() || 'J'
}

export const JobItem = ({ job, locale }: JobItemProps) => {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (locale === 'vi') {
      return dateObj.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } else {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    }
  }
  const displayTitle = locale === 'vi' ? job.title : job.title_en
  const displayPosition = locale === 'vi' ? job.position : job.position_en
  const displayLocation = locale === 'vi' ? job.location : job.location_en
  const slugForLink = locale === 'vi' ? job.slug : job.slug_en

  const avatarColor = getColorForTitle(displayTitle || '')
  const firstLetter = getFirstLetter(displayTitle || '')

  return (
    <Link
      href={`${locale === 'vi' ? `/vi/viec-lam/${slugForLink}` : `/en/career/${slugForLink}`}`}
      className='block h-full'
    >
      <Card className='bg-white hover:border-blue-500 border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer group overflow-hidden transition-all duration-200'>
        <CardContent className='p-3 sm:p-4 md:p-5'>
          <div className='flex items-start sm:items-center gap-3 sm:gap-4 md:gap-5'>
            {/* Avatar with first letter */}
            <div className='shrink-0'>
              <div
                className={`${avatarColor} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm sm:shadow-md`}
              >
                <span className='text-white text-base sm:text-lg md:text-xl font-bold'>{firstLetter}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 min-w-0'>
              <h3 className='text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 line-clamp-2 sm:line-clamp-1'>
                {displayTitle}
              </h3>

              {/* Position */}
              {displayPosition && (
                <div className='flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2'>
                  <Briefcase className='w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-gray-400' />
                  <span className='text-xs sm:text-sm text-gray-600 line-clamp-1'>
                    {locale === 'vi' ? 'Vị trí' : 'Position'}: {displayPosition}
                  </span>
                </div>
              )}
              {displayLocation && (
                <div className='flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2'>
                  <MapPin className='w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-gray-400' />
                  <span className='text-xs sm:text-sm text-gray-600 line-clamp-1'>
                    {locale === 'vi' ? 'Địa điểm' : 'Location'}: {displayLocation}
                  </span>
                </div>
              )}

              <div className='flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-2.5'>
                {/* Quantity */}
                {job.quantity && (
                  <div className='flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-green-50'>
                    <Users className='w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-green-600' />
                    <span className='text-xs sm:text-sm font-semibold text-green-700 whitespace-nowrap'>
                      {job.quantity} {locale === 'vi' ? 'người' : 'people'}
                    </span>
                  </div>
                )}

                {/* Salary */}
                <div className='inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-blue-50'>
                  <span className='text-xs sm:text-sm font-semibold text-blue-700 whitespace-nowrap'>
                    {locale === 'vi' ? job.salary : job.salary_en}
                  </span>
                </div>

                {/* Posting Date */}
                <div className='flex items-center gap-1 sm:gap-1.5 text-xs text-gray-500'>
                  <Calendar className='w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-gray-400' />
                  <span className='whitespace-nowrap'>{formatDate(job.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
