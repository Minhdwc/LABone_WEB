'use client'

import DOMPurify from 'isomorphic-dompurify'
import { Separator } from '@/components/ui/separator'
import type { IWebTrainingOffline } from '@/types'

interface DetailOfflineProps {
  training: IWebTrainingOffline
  isVN: boolean
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

function Section({ title, content }: { title: string; content: string }) {
  if (!content?.trim()) return null
  return (
    <section>
      <h2 className='text-2xl font-bold text-gray-900 mb-3'>{title}</h2>
      <div
        className='prose prose-lg max-w-none text-gray-700'
        dangerouslySetInnerHTML={{ __html: sanitize(content) }}
      />
      <Separator className='mt-6' />
    </section>
  )
}

export default function DetailOffline({ training, isVN }: DetailOfflineProps) {
  return (
    <div className='space-y-10'>
      <Section
        title={isVN ? 'Tổng quan khóa học' : 'Course overview'}
        content={(isVN ? training.summary_vn : training.summary_en) || ''}
      />
      <Section
        title={isVN ? 'Mục tiêu học tập' : 'Learning objectives'}
        content={(isVN ? training.key_learning_object_vn : training.key_learning_object_en) || ''}
      />
      <Section
        title={isVN ? 'Đối tượng tham dự' : 'Who should attend'}
        content={(isVN ? training.who_should_attend_vn : training.who_should_attend_en) || ''}
      />
      <Section
        title={isVN ? 'Yêu cầu đầu vào' : 'Pre-requirements'}
        content={(isVN ? training.pre_requirement_vn : training.pre_requirement_en) || ''}
      />
      <Section
        title={isVN ? 'Chương trình chi tiết' : 'Program outline'}
        content={(isVN ? training.program_outline_vn : training.program_outline_en) || ''}
      />
      <Section
        title={isVN ? 'Chứng nhận' : 'Accreditation'}
        content={(isVN ? training.accreditation_recognition_vn : training.accreditation_recognition_en) || ''}
      />
    </div>
  )
}
