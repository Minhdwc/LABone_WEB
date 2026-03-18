'use client'

import type { IWebLabAcademyPost, IWebWebinar } from '@/types'

interface DetailWebinarProps {
  post: IWebLabAcademyPost
  webinar: IWebWebinar
  isVN: boolean
  getContent: () => string
}

export default function DetailWebinar({ getContent }: DetailWebinarProps) {
  return (
    <div className='space-y-10'>
      <section>
        <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: getContent() }} />
      </section>
    </div>
  )
}
