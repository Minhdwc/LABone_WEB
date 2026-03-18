'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { IWebLabAcademyPost } from '@/types'
import { useLanguageStore } from '@/store/language'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'
import { User, Calendar, Clock, ArrowRight } from 'lucide-react'
import { trainingEducationDetailContent, webinarsDetailContent, postDetailContent } from '@/lib/training-data'
import CustomPagination from '@/components/custom/pagination/custom-pagination'

interface LabAcademyDetailProps {
  labAcademy: {
    data: IWebLabAcademyPost[]
    total: number
    pageCurrent: number
    totalPage: number
  }
  type?: 'training' | 'webinars' | 'post'
}

const LabAcademyDetail = ({ labAcademy, type }: LabAcademyDetailProps) => {
  const { language } = useLanguageStore()
  const isVN = language === 'VN'
  const [currentType, setCurrentType] = useState<'training' | 'webinars' | 'post' | null>(type || null)
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(9)
  const [totalPages, setTotalPages] = useState<number>(labAcademy.totalPage || 1)
  const [total, setTotal] = useState<number>(labAcademy.total || 0)
  const heroContent = useMemo(() => {
    if (currentType === 'training') {
      return isVN ? trainingEducationDetailContent.vn : trainingEducationDetailContent.en
    }
    if (currentType === 'webinars') {
      return isVN ? webinarsDetailContent.vn : webinarsDetailContent.en
    }
    if (currentType === 'post') {
      return isVN ? postDetailContent.vn : postDetailContent.en
    }
    // Default content if type is not determined
    return {
      title: isVN
        ? 'Lab Academy - Cải thiện công việc phòng thí nghiệm hàng ngày của bạn'
        : 'Lab Academy - Improve Your Daily Lab Work',
      description: isVN
        ? 'Tìm hiểu các thách thức điển hình trong công việc hàng ngày của bạn và học cách cải thiện kết quả bằng cách xem xét các mẹo và thủ thuật đơn giản.'
        : 'Find yourself describing typical challenges in your daily routine and learn how to improve your results by considering simple tips and tricks.',
      image: null,
    }
  }, [currentType, isVN])

  const [data, setData] = useState<IWebLabAcademyPost[]>(labAcademy.data)

  useEffect(() => {
    const fetchLabData = async () => {
      const response = await WebLabAcademyPostService.getAllWebLabAcademyPosts({
        page: page,
        limit: limit,
        type: currentType || undefined,
      })
      setData(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPage)
    }
    fetchLabData()
  }, [page, limit, currentType])

  const pageCurrent = page + 1

  const getTitle = (post: IWebLabAcademyPost) => {
    return isVN ? post.title_vn : post.title_en
  }

  const getSlug = (post: IWebLabAcademyPost) => {
    const slug = isVN ? post.slug_vn : post.slug_en
    const typeSlug = language === 'VN' && post.type === 'webinars' ? 'thao-luan-truc-tuyen' : 'dao-tao'
    const typeSlug_EN = language === 'EN' && post.type === 'webinars' ? 'webinars' : 'training'
    const basePath = isVN ? '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc' : '/en/lab-academy/education-and-training'
    return `${basePath}/${isVN ? typeSlug : typeSlug_EN}/${slug}`
  }

  /** 0 speaker → null (ẩn); 1 → tên; >1 → "Nhiều diễn giả" / "Experts" */
  const getSpeakerDisplay = (post: IWebLabAcademyPost): string | null => {
    const list = post.webAcademyPostSpeakers ?? []
    if (list.length === 0) return null
    if (list.length === 1) return list[0]?.web_speaker?.name_speaker ?? null
    return isVN ? 'Nhiều diễn giả' : 'Experts'
  }

  const getStartDate = (post: IWebLabAcademyPost): Date | null => {
    const raw = post.webTrainingOnline?.start_date ?? post.webTrainingOffline?.start_date
    if (!raw) return null
    const d = typeof raw === 'string' ? new Date(raw) : raw
    return isNaN(d.getTime()) ? null : d
  }

  const getEndDate = (post: IWebLabAcademyPost): Date | null => {
    const raw = post.webTrainingOnline?.end_date ?? post.webTrainingOffline?.end_date
    if (!raw) return null
    const d = typeof raw === 'string' ? new Date(raw) : raw
    return isNaN(d.getTime()) ? null : d
  }

  const formatDate = (date: Date) =>
    date.toLocaleDateString(isVN ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const getDuration = (post: IWebLabAcademyPost): string => {
    if (post.type === 'training') {
      const start = getStartDate(post)
      const end = getEndDate(post)
      if (!start || !end) return ''
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      if (days <= 0) return ''
      return days === 1 ? (isVN ? '1 ngày' : '1 day') : isVN ? `${days} ngày` : `${days} days`
    }
    if (post.type === 'webinars') {
      return post.webWebinar?.duration || ''
    }
    return ''
  }

  const getTypeBadgeLabel = (post: IWebLabAcademyPost) => {
    if (post.type === 'post') return isVN ? 'Bài viết khoa học' : 'Science article'
    if (post.type === 'webinars') return isVN ? 'Webinar' : 'Webinar'
    if (post.type === 'training' && post.webTrainingOffline) return isVN ? 'Đào tạo trực tiếp' : 'Training offline'
    if (post.type === 'training' && post.webTrainingOnline) return isVN ? 'Đào tạo trực tuyến' : 'Training online'
    return post.type || ''
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-blue-600 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8'>
          {/* TEXT - LEFT */}
          <div className='flex-1 max-w-3xl'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>{heroContent.title.toUpperCase()}</h1>

            <div
              className='text-lg md:text-xl text-blue-100 leading-relaxed prose prose-invert max-w-none'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(heroContent.description, {
                  ALLOWED_TAGS: ['p', 'strong'],
                }),
              }}
            />
          </div>

          {/* IMAGE - RIGHT */}
          {heroContent.image && (
            <div className='shrink-0'>
              <Image
                src={heroContent.image}
                alt={heroContent.title}
                width={300}
                height={300}
                className='w-auto h-auto max-w-xs md:max-w-sm p-1 bg-emerald-100/30 rounded-sm object-contain'
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-gray-600'>
            <span className='font-semibold text-gray-900'>{total}</span> {isVN ? 'Kết quả' : 'Results'}
          </p>
        </div>

        {/* Posts Grid */}
        {data.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {data.map((post: IWebLabAcademyPost, index: number) => {
                const speakerLabel = getSpeakerDisplay(post)
                return (
                  <Link key={post.web_academy_id || `post-${index}`} href={getSlug(post)}>
                    <Card className='h-full flex flex-col hover:shadow-lg mt-2 transition-shadow cursor-pointer group overflow-hidden'>
                      {/* Header: hình ảnh + badge overlay */}
                      <div className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                        {post.image_url ? (
                          <Image
                            src={post.image_url}
                            alt={getTitle(post)}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200'>
                            <span className='text-4xl font-bold text-blue-400'>
                              {getTitle(post).charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className='absolute top-3 left-3'>
                          <span className='px-3 py-1.5 bg-gray-800/80 text-xs font-semibold text-white rounded-md'>
                            {getTypeBadgeLabel(post)}
                          </span>
                        </div>
                      </div>
                      <CardContent className='p-5 flex flex-col flex-1'>
                        <h3 className='font-bold text-lg text-gray-900 mb-4 group-hover:text-blue-600 transition-colors'>
                          {getTitle(post)}
                        </h3>
                        {/* Thứ tự: speaker (ẩn nếu 0) | start_date | end_date - start_date */}
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          {speakerLabel != null && (
                            <div className='flex items-center gap-1.5 border-r-3 pr-2'>
                              <User className='h-4 w-4 shrink-0 text-gray-500' />
                              <span>{speakerLabel}</span>
                            </div>
                          )}
                          {getStartDate(post) && (
                            <div className='flex items-center gap-1.5 border-r-3 pr-2'>
                              <Calendar className='h-4 w-4 shrink-0 text-gray-500' />
                              <span>{formatDate(getStartDate(post)!)}</span>
                            </div>
                          )}
                          {getDuration(post) ? (
                            <div className='flex items-center gap-1.5'>
                              <Clock className='h-4 w-4 shrink-0 text-gray-500' />
                              <span>{getDuration(post)}</span>
                            </div>
                          ) : null}
                        </div>
                        <div className='mt-4 mt-auto w-full rounded-lg bg-emerald-600 py-2.5 px-4 text-center text-white font-medium group-hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2'>
                          {isVN ? 'Xem chi tiết' : 'View details'}
                          <ArrowRight className='h-4 w-4' />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
            {/* Pagination */}
            <div className='mt-8'>
              <CustomPagination
                page={page}
                setPage={setPage}
                pageCurrent={pageCurrent}
                totalPages={totalPages}
                limit={limit}
                setLimit={setLimit}
              />
            </div>
          </>
        ) : (
          <div className='text-center py-8'>
            <p className='text-gray-500 text-lg'>{isVN ? 'Không tìm thấy kết quả nào' : 'No results found'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LabAcademyDetail
