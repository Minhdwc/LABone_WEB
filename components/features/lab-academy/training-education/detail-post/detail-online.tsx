'use client'

import DOMPurify from 'isomorphic-dompurify'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { IWebLabAcademyPost, IWebTrainingOnline } from '@/types'

interface DetailOnlineProps {
  post: IWebLabAcademyPost
  training: IWebTrainingOnline
  isVN: boolean
  getContent: () => string
}

const sanitize = (html: string) =>
  DOMPurify.sanitize(html || '', {
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

function Section({ title, content, className }: { title: string; content: string; className?: string }) {
  if (!content?.trim()) return null
  return (
    <section className={className}>
      <h2 className='text-2xl font-bold text-gray-900 mb-3'>{title}</h2>
      <div
        className='prose prose-lg max-w-none text-gray-700'
        dangerouslySetInnerHTML={{ __html: sanitize(content) }}
      />
      <Separator className='mt-6' />
    </section>
  )
}

export default function DetailOnline({ post, training, isVN, getContent }: DetailOnlineProps) {
  const typeLabel = training.type_training?.trim()

  return (
    <div className='space-y-10'>
      {/* Hero subtitle - NEMIS style: e.g. "CPD Accredited | Live online" */}
      {typeLabel && (
        <>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant='secondary' className='text-sm font-medium'>
              {typeLabel}
            </Badge>
            <span className='text-sm text-gray-500'>{isVN ? 'Đào tạo trực tuyến' : 'Live online'}</span>
          </div>
          <Separator className='mt-6' />
        </>
      )}

      {/* Learning Objectives - NEMIS puts this first */}
      <Section
        title={isVN ? 'Mục tiêu học tập' : 'Learning objectives'}
        content={(isVN ? training.key_learning_object_vn : training.key_learning_object_en) || ''}
      />

      {/* About This Course */}
      <Section
        title={isVN ? 'Giới thiệu khóa học' : 'About this course'}
        content={(isVN ? training.summary_vn : training.summary_en) || ''}
      />

      {/* Who Should Attend */}
      <Section
        title={isVN ? 'Đối tượng tham dự' : 'Who should attend'}
        content={(isVN ? training.who_should_attend_vn : training.who_should_attend_en) || ''}
      />

      {/* Pre-requirements */}
      <Section
        title={isVN ? 'Yêu cầu đầu vào' : 'Pre-requirements'}
        content={(isVN ? training.pre_requirement_vn : training.pre_requirement_en) || ''}
      />

      {/* Program Outline - NEMIS style (Day 1, Day 2...) */}
      <Section
        title={isVN ? 'Chương trình chi tiết' : 'Program outline'}
        content={(isVN ? training.program_outline_vn : training.program_outline_en) || ''}
      />

      {/* Accreditation & Recognition */}
      <Section
        title={isVN ? 'Chứng nhận & ghi nhận' : 'Accreditation & recognition'}
        content={(isVN ? training.accreditation_recognition_vn : training.accreditation_recognition_en) || ''}
      />

      {/* Main post content */}
      <section>
        <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: getContent() }} />
        <Separator className='mt-6' />
      </section>
    </div>
  )
}
