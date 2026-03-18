'use client'
import { IWebNew } from '@/types'
import { Calendar, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DOMPurify from 'isomorphic-dompurify'

interface NewDetailClientProps {
  newItem: IWebNew
  locale: string
}

export default function NewDetailClient({ newItem, locale }: NewDetailClientProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (locale === 'vi') {
      return dateObj.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } else {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  }

  const getTitle = () => {
    return locale === 'vi' ? newItem.title_vn : newItem.title_en
  }

  const getContent = () => {
    const content = locale === 'vi' ? newItem.content_vn : newItem.content_en
    // Sanitize HTML và giữ lại các tags cần thiết cho SEO
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'u',
        's',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'ul',
        'ol',
        'li',
        'blockquote',
        'code',
        'pre',
        'a',
        'img',
        'div',
        'span',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style'],
    })
  }

  // Xác định backUrl và text dựa trên type
  const backUrl = locale === 'vi' ? '/vi/tin-tuc' : '/en/new'
  const backText = locale === 'vi' ? 'Quay lại tin tức' : 'Back to news'

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <article className='max-w-4xl mx-auto'>
          {/* Back button */}
          <div className='mb-6'>
            <Button
              variant='ghost'
              className='gap-2 -ml-2 text-gray-600 hover:text-gray-900 cursor-pointer'
              onClick={() => (window.location.href = backUrl)}
            >
              <ArrowLeft className='w-4 h-4' />
              {backText}
            </Button>
          </div>

          {/* Date */}
          <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
            <Calendar className='w-4 h-4' />
            <span>{formatDate(newItem?.createdAt || '')}</span>
          </div>

          {/* Title */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6'>{getTitle() || ''}</h1>
          {/* Content */}
          <div className='prose prose-lg max-w-none mb-12' dangerouslySetInnerHTML={{ __html: getContent() }} />
        </article>
      </div>
    </div>
  )
}
