'use client'

import { useState } from 'react'
import { IWebLabAcademyPost } from '@/types'
import { useLanguageStore } from '@/store/language'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import { Separator } from '@/components/ui/separator'

interface ListLabAcademyProps {
  listLabAcademy: IWebLabAcademyPost[]
}

export default function ListLabAcademy({ listLabAcademy }: ListLabAcademyProps) {
  const { language } = useLanguageStore()
  const currentLanguage = language as 'VN' | 'EN'

  const getTitle = (post: IWebLabAcademyPost) => {
    return currentLanguage === 'VN' ? post.title_vn : post.title_en
  }

  const getContent = (post: IWebLabAcademyPost) => {
    const content = currentLanguage === 'VN' ? post.content_vn : post.content_en
    const plainText = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
  }

  const formatDate = (value?: Date | string) => {
    if (!value) return null
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) return null
    return new Intl.DateTimeFormat(currentLanguage === 'VN' ? 'vi-VN' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const getSlug = (post: IWebLabAcademyPost) => {
    const slug = currentLanguage === 'VN' ? post.slug_vn : post.slug_en
    const typeSlug = currentLanguage === 'VN' && post.type === 'webinars' ? 'thao-luan-truc-tuyen' : 'dao-tao'
    const typeSlug_EN = currentLanguage === 'EN' && post.type === 'webinars' ? 'webinars' : 'training'
    const basePath =
      currentLanguage === 'VN'
        ? '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc'
        : '/en/lab-academy/education-and-training'
    return `${basePath}/${currentLanguage === 'VN' ? typeSlug : typeSlug_EN}/${slug}`
  }

  const viewAllText = currentLanguage === 'VN' ? 'Xem tất cả' : 'View all'
  const title = currentLanguage === 'VN' ? 'KHOA HỌC VÀ HỌC THUẬT' : 'LAB ACADEMY'
  const viewAllLink = currentLanguage === 'VN' ? '/vi/khoa-hoc-va-dao-tao' : '/en/lab-academy'
  const featuredPost = listLabAcademy[0]
  const secondaryPosts = listLabAcademy.slice(1, 4)

  return (
    <section className='bg-white py-8 sm:py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold uppercase sm:text-2xl md:text-3xl text-gray-900'>{title}</h2>
            <div className='mt-2 w-24 h-0.5 bg-blue-600 rounded-full' aria-hidden />
          </div>

          <Link href={viewAllLink}>
            <Button variant='outline' className='border-blue-600 text-blue-600 hover:bg-blue-50'>
              {viewAllText}
            </Button>
          </Link>
        </div>

        <div className='grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch'>
          {featuredPost ? (
            <Link href={getSlug(featuredPost)} className='group block'>
              <div className='relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl'>
                <div className='relative h-64 sm:h-72 md:h-80 lg:h-[60%]'>
                  {featuredPost.image_url ? (
                    <Image
                      src={featuredPost.image_url || ''}
                      alt={getTitle(featuredPost)}
                      fill
                      className='object-cover transition-transform duration-500'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200'>
                      <span className='text-5xl font-bold text-blue-400'>
                        {getTitle(featuredPost).charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />
                  {(featuredPost.type === 'webinars' || featuredPost.type === 'training') && (
                    <div className='absolute top-5 left-5 uppercase'>
                      <span className='px-3 py-1.5 bg-white/95 backdrop-blur-sm font-bold text-blue-700 rounded-full shadow-sm'>
                        {featuredPost.type}
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className='p-6 lg:h-[40%] flex flex-col justify-center'>
                  <div className='flex items-center justify-between gap-3 text-xs uppercase tracking-[0.15em] text-gray-500'></div>
                  <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2'>
                    {getTitle(featuredPost)}
                  </h3>
                  <p className='text-sm text-gray-600 line-clamp-3'>{getContent(featuredPost)}</p>
                  <div className='flex items-center justify-between gap-2'>
                    {formatDate(featuredPost.createdAt) && (
                      <span className='text-xs uppercase tracking-[0.15em] text-gray-400'>
                        {formatDate(featuredPost.createdAt)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>
            </Link>
          ) : null}

          <div className='grid gap-4 lg:grid-rows-3'>
            {secondaryPosts.map((post, index) => (
              <Link key={post.web_academy_id || `post-${index}`} href={getSlug(post)} className='group block'>
                <Card className='h-full flex gap-4 border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow'>
                  <div className='relative w-28 sm:w-32 md:w-36 shrink-0'>
                    {post.image_url ? (
                      <Image src={post.image_url || ''} alt={getTitle(post)} fill className='object-cover' />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200'>
                        <span className='text-2xl font-bold text-blue-400'>
                          {getTitle(post).charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className='p-4 flex-1 flex flex-col justify-center'>
                    <div className='flex flex-wrap items-center gap-2 mb-2 text-xs text-gray-500'>
                      {(post.type === 'webinars' || post.type === 'training') && (
                        <span className='px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full'>
                          {post.type}
                        </span>
                      )}
                      {formatDate(post.createdAt) && (
                        <span className='text-xs uppercase tracking-[0.15em] text-gray-400'>
                          {formatDate(post.createdAt)}
                        </span>
                      )}
                    </div>
                    <h3 className='text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2'>
                      {getTitle(post)}
                    </h3>
                    <Separator className='my-2' />
                    <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{getContent(post)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
