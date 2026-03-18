'use client'

import React from 'react'
import { useLanguageStore } from '@/store/language'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { trainingEducationCards, trainingEducationContent } from '@/lib/training-data'
import DOMPurify from 'isomorphic-dompurify'

export default function TrainingEducationPage() {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? trainingEducationContent.vn : trainingEducationContent.en
  const sanitizedDescription = DOMPurify.sanitize(content.description || '')
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-bold text-center mb-6'>{content.title.toUpperCase()}</h1>
        <div
          className='prose prose-lg max-w-none text-gray-600'
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>

      {/* Cards Section */}
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {trainingEducationCards.map((card) => {
            const title = language === 'VN' ? card.title_vn : card.title_en
            const description = language === 'VN' ? card.description_vn : card.description_en
            const href = language === 'VN' ? card.href_vn : card.href_en
            return (
              <Link key={card.id} href={href}>
                <Card className='group h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'>
                  <CardContent className='p-0'>
                    {/* Image Container */}
                    <div className='relative h-48 w-full overflow-hidden bg-gray-200'>
                      <Image
                        src={card.image}
                        alt={title}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-110'
                      />
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                      <h3 className='mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600'>
                        {title}
                      </h3>
                      <p className='text-base leading-relaxed text-gray-600'>{description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
