'use client'
import { IWebNew } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useLanguageStore } from '@/store/language'

interface CardNewProps {
  item: IWebNew
  basePath: string
}

export default function CardNew({ item, basePath }: CardNewProps) {
  const { language } = useLanguageStore()

  const formatDateBadge = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const day = dateObj.getDate()
    if (language === 'EN') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[dateObj.getMonth()]
      return { day, month }
    } else {
      const month = dateObj.getMonth() + 1
      return { day, month: `Th${month}` }
    }
  }

  const getTitle = () => {
    return language === 'VN' ? item.title_vn : item.title_en
  }

  const getSlug = () => {
    return language === 'VN' ? item.slug_vn : item.slug_en
  }

  const getContent = () => {
    const content = language === 'VN' ? item.content_vn : item.content_en
    if (!content) return ''
    const match = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
    if (!match) return ''

    let textContent = match[1]
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .trim()

    textContent = textContent
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()

    if (!textContent) return ''
    const shortText = textContent.substring(0, 150)
    return textContent.length > 150 ? shortText + '...' : shortText
  }

  const { day, month } = formatDateBadge(item.createdAt)
  const content = getContent()

  return (
    <Card
      onClick={() => {
        window.location.href = `${basePath}/${getSlug()}`
      }}
      className='hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group h-full'
    >
      <div className='relative w-full h-48 overflow-hidden bg-gray-200'>
        <Image
          src={item.main_image_url || '/assets/news/news.jpg'}
          alt={getTitle()}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
        <div className='absolute  bg-gray-600 text-white  px-3 py-2 shadow-lg'>
          <div className='text-sm font-bold leading-none'>{day}</div>
          <div className='text-xs font-medium mt-0.5'>{month}</div>
        </div>
      </div>
      <CardContent className='p-4'>
        <h3 className='font-semibold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {getTitle()}
        </h3>
        {content && <p className='text-sm text-gray-600 line-clamp-3 mt-2'>{content}</p>}
      </CardContent>
    </Card>
  )
}
