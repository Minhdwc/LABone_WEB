'use client'

import { useState } from 'react'
import { IWebLabAcademyPost } from '@/types'
import DOMPurify from 'isomorphic-dompurify'
import { Calendar, ArrowLeft, ExternalLink, MapPin, User, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguageStore } from '@/store/language'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LabAcademyPostRegisterForm from './form-register'
import DetailOffline from './detail-offline'
import DetailOnline from './detail-online'
import DetailWebinar from './detail-webinar'
import { DetailPlanPost } from './detail-plan-post'

interface LabAcademyPostDetailProps {
  post: IWebLabAcademyPost
}

export default function LabAcademyPostDetail({ post }: LabAcademyPostDetailProps) {
  const { language } = useLanguageStore()
  const router = useRouter()
  const isVN = language === 'VN'
  const isTraining = post.type === 'training'
  const isWebinar = post.type === 'webinars'
  const isPostType = post.type === 'post'
  const trainingOffline = post.webTrainingOffline
  const trainingOnline = post.webTrainingOnline
  const webinar = post.webWebinar
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return ''
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isVN) {
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
    return isVN ? post.title_vn : post.title_en
  }

  const getEventStartDate = () => {
    if (trainingOffline?.start_date) return trainingOffline.start_date
    if (trainingOnline?.start_date) return trainingOnline.start_date
    return undefined
  }

  const getEventEndDate = () => {
    if (trainingOffline?.end_date) return trainingOffline.end_date
    if (trainingOnline?.end_date) return trainingOnline.end_date
    return undefined
  }

  const getContent = () => {
    const content = isVN ? post.content_vn : post.content_en
    // Sanitize HTML và giữ lại các tags cần thiết
    return DOMPurify.sanitize(content || '', {
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
  const source = post.webTrainingOnline || post.webTrainingOffline
  const now = new Date()
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const startRegister = source?.start_date_register ? new Date(source.start_date_register) : null
  const endRegister = source?.end_date_register ? new Date(source.end_date_register) : null
  const canRegister =
    source?.status === 'open' &&
    startRegister != null &&
    endRegister != null &&
    startRegister <= now &&
    endRegister >= now
  const linkUrl = post.webWebinar?.link_url || post.webTrainingOnline?.link_url
  const hasSpeakers = post.webAcademyPostSpeakers && post.webAcademyPostSpeakers.length > 0
  const hasFile = post.webAcademyFiles && post.webAcademyFiles.length > 0

  const heroSubtitleParts: string[] = []
  if (isTraining && trainingOffline?.address) heroSubtitleParts.push(trainingOffline.address)
  if (getEventStartDate()) {
    const range = getEventEndDate()
      ? `${formatDate(getEventStartDate())} – ${formatDate(getEventEndDate())}`
      : formatDate(getEventStartDate())
    heroSubtitleParts.push(range)
  }
  const heroSubtitle = heroSubtitleParts.join(' | ')

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero: full-width image + overlay (title, address | dates) */}
      <section className='relative w-full aspect-[21/9] min-h-[240px] max-h-[420px] bg-gray-200'>
        {post.image_url ? (
          <>
            <Image src={post.image_url} alt={getTitle()} fill className='object-cover' sizes='100vw' priority />
            <div className='absolute inset-0 bg-black/50' />
          </>
        ) : (
          <div className='absolute inset-0 bg-gray-300' />
        )}
        <div className='absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          <div className='max-w-7xl w-full'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg'>
              {getTitle()}
            </h1>
            {heroSubtitle && <p className='mt-2 text-sm sm:text-base text-white/95 drop-shadow'>{heroSubtitle}</p>}
          </div>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10'>
        {/* Back button */}
        <div className='mb-6'>
          <Button
            variant='ghost'
            className='gap-2 -ml-2 text-gray-600 hover:text-gray-900 cursor-pointer'
            onClick={() => router.back()}
          >
            <ArrowLeft className='w-4 h-4' />
            {isVN ? 'Quay lại' : 'Back'}
          </Button>
        </div>

        {/* Two column layout: left = content, right = sticky Overview card */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left column - Main content (no duplicate title) */}
          <div className={hasSpeakers || canRegister || linkUrl || !isPostType ? 'lg:flex-1 lg:min-w-0' : 'w-full'}>
            {/* Type badge */}
            {!isPostType && (
              <div className='inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 mb-4'>
                {isTraining && trainingOffline && <span>{isVN ? 'Đào tạo trực tiếp' : 'Offline training'}</span>}
                {isTraining && trainingOnline && !trainingOffline && (
                  <span>{isVN ? 'Đào tạo trực tuyến' : 'Online training'}</span>
                )}
                {isWebinar && <span>{isVN ? 'Webinar' : 'Webinar'}</span>}
              </div>
            )}
            <article>
              {isTraining && trainingOffline && <DetailOffline training={trainingOffline} isVN={isVN} />}
              {isTraining && trainingOnline && !trainingOffline && (
                <DetailOnline post={post} training={trainingOnline} isVN={isVN} getContent={getContent} />
              )}
              {isWebinar && webinar && (
                <DetailWebinar post={post} webinar={webinar} isVN={isVN} getContent={getContent} />
              )}
              {isPostType && (
                <div className='prose prose-lg max-w-none mb-12' dangerouslySetInnerHTML={{ __html: getContent() }} />
              )}
            </article>
          </div>

          {/* Right column - Sticky Overview card + Đăng ký (opens dialog) - only when relevant */}
          {(hasSpeakers || canRegister || linkUrl || !isPostType) && (
            <div className='w-full lg:max-w-[270px] xl:max-w-[300px] lg:ml-auto lg:top-8 space-y-6 shrink-0'>
              {!webinar && (
                <Card className='border-2 border-green-200 bg-green-50/30'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>{isVN ? 'Tổng quan' : 'Overview'}</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3 text-sm'>
                    {getEventStartDate() && (
                      <div className='flex items-start gap-2'>
                        <Calendar className='w-4 h-4 text-gray-500 shrink-0 mt-0.5' />
                        <div className='min-w-0'>
                          <span className='font-medium text-gray-500'>{isVN ? 'Ngày' : 'Day'}</span>
                          <p className='text-gray-900 wrap-break-word max-w-full'>
                            {formatDate(getEventStartDate())}
                            {getEventEndDate() && ` – ${formatDate(getEventEndDate())}`}
                          </p>
                        </div>
                      </div>
                    )}
                    {(isTraining && trainingOffline?.address) || isTraining || isWebinar ? (
                      <div className='flex items-start gap-2'>
                        <MapPin className='w-4 h-4 text-gray-500 shrink-0 mt-0.5' />
                        <div className='min-w-0'>
                          <span className='font-medium text-gray-500'>{isVN ? 'Địa điểm' : 'Place'}</span>
                          <p className='text-gray-900 wrap-break-word max-w-full'>
                            {isTraining && trainingOffline?.address}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {hasSpeakers && (
                      <div className='flex items-start gap-2'>
                        <User className='w-4 h-4 text-gray-500 shrink-0 mt-0.5' />
                        <div className='min-w-0'>
                          <span className='font-medium text-gray-500'>{isVN ? 'Diễn giả' : 'Experts'}</span>
                          <p className='text-gray-900 wrap-break-word max-w-full'>
                            {post.webAcademyPostSpeakers?.map(({ web_speaker: s }) => s.name_speaker).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <div className='px-6 pb-6 pt-2 flex flex-col gap-2'>
                    {canRegister && !post.is_full && (
                      <Button
                        className='w-full bg-green-600 hover:bg-green-700 text-white'
                        onClick={() => {
                          if (isWebinar && linkUrl) {
                            window.open(linkUrl, '_blank', 'noopener,noreferrer')
                          } else {
                            setRegisterDialogOpen(true)
                          }
                        }}
                      >
                        {isVN ? 'Đăng ký' : 'Enroll Now'}
                      </Button>
                    )}
                    {canRegister && post.is_full && (
                      <p className='text-sm text-amber-700 text-center py-2'>
                        {isVN ? 'Đã đủ số lượng đăng ký' : 'Registration full'}
                      </p>
                    )}
                    {!canRegister && !isPostType && (
                      <p className='text-sm text-red-500 font-bold text-center py-2'>
                        {source?.status !== 'open'
                          ? isVN
                            ? 'Đã đóng đăng ký'
                            : 'Registration closed'
                          : isVN
                            ? 'Chưa mở đăng ký'
                            : 'Registration not yet open'}
                      </p>
                    )}
                  </div>
                </Card>
              )}
              {linkUrl && (
                <a
                  href={linkUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0'>
                    <ExternalLink className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-sm font-semibold text-gray-900'>{isVN ? 'Đường dẫn liên kết' : 'Link URL'}</h3>
                    <span className='text-sm text-blue-600 hover:text-blue-700'>
                      {isVN ? 'Truy cập liên kết' : 'Visit Link'}
                    </span>
                  </div>
                </a>
              )}
            </div>
          )}
        </div>

        <div className='mt-12 sm:mt-16'>
          {hasSpeakers && (
            <section className='w-full bg-gray-50 rounded-2xl px-4 sm:px-8 py-8 sm:py-10'>
              <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-8'>
                {isVN ? 'Gặp gỡ những diễn giả' : 'Meet the Experts'}
              </h2>
              <div className='space-y-0 divide-y divide-gray-200'>
                {post.webAcademyPostSpeakers?.map(({ web_speaker: speaker }) => (
                  <div
                    key={speaker.web_speaker_id}
                    className='grid grid-cols-1 md:grid-cols-5 gap-6 py-6 first:pt-0 last:pb-0'
                  >
                    <div className='md:col-span-3 flex flex-col justify-center'>
                      <h1 className='font-bold text-gray-900 text-3xl '>{speaker.name_speaker}</h1>
                      {speaker.degree_speaker && (
                        <p className='text-sm text-gray-600 italic mt-1'>{speaker.degree_speaker}</p>
                      )}
                      <span className='text-sm text-gray-500 mt-1'>
                        {isVN ? speaker.description_vn : speaker.description_en}
                      </span>
                    </div>
                    <div className='md:col-span-2 flex items-center justify-start md:justify-end'>
                      {speaker.image_url ? (
                        <div className='relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-gray-200 shrink-0'>
                          <Image
                            src={speaker.image_url}
                            alt={speaker.name_speaker}
                            fill
                            className='object-cover'
                            sizes='160px'
                          />
                        </div>
                      ) : (
                        <div className='w-32 h-32 sm:w-40 sm:h-40 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm'>
                          {isVN ? 'Chưa có ảnh' : 'No image'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className='mt-12 sm:mt-16'>
          {trainingOffline && trainingOffline.webTrainingPlans && trainingOffline.webTrainingPlans.length > 0 && (
            <DetailPlanPost webTrainingPlans={trainingOffline.webTrainingPlans} isVN={isVN} />
          )}
        </div>
        <div className='mt-12 sm:mt-16'>
          {hasFile && (
            <div className='mt-12'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>{isVN ? 'Tài liệu đính kèm' : 'Attached files'}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isVN ? 'Tên tài liệu' : 'Document name'}</TableHead>
                    <TableHead>{isVN ? 'Tải xuống' : 'Download'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {post.webAcademyFiles?.map((file) => (
                    <TableRow key={file.web_academy_file_id}>
                      <TableCell>{file.file_name}</TableCell>
                      <TableCell>
                        <Button
                          variant='outline'
                          size='icon'
                          onClick={() => window.open(file.file_url, '_blank')}
                          className='p-2 hover:bg-gray-200 text-gray-700 cursor-pointer'
                        >
                          <Download className='w-4 h-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
          <DialogContent className='max-w-md max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>{isVN ? 'Đăng ký tham gia' : 'Register for this course'}</DialogTitle>
            </DialogHeader>
            <LabAcademyPostRegisterForm
              webAcademyId={post.web_academy_id}
              isFull={post.is_full || false}
              onSuccess={() => setRegisterDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
