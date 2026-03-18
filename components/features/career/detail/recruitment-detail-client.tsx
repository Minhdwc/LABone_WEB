'use client'
import { IRecruitment } from '@/types'
import {
  MapPin,
  ArrowLeft,
  Gift,
  Calendar,
  Briefcase,
  DollarSign,
  GraduationCap,
  Users,
  Clock,
  FileText,
  CheckCircle,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DOMPurify from 'isomorphic-dompurify'
import { RecruitmentApplyForm } from './recruitment-apply-form'
import { Badge } from '@/components/ui/badge'

interface RecruitmentDetailClientProps {
  recruitment: IRecruitment
  locale: 'vi' | 'en'
}

export default function RecruitmentDetailClient({ recruitment, locale }: RecruitmentDetailClientProps) {

  const descriptionHTML = DOMPurify.sanitize(
    locale === 'vi' ? recruitment.description : recruitment.description_en || '',
  )
  const requirementHTML = DOMPurify.sanitize(
    locale === 'vi' ? recruitment.requirement : recruitment.requirement_en || '',
  )
  const benefitHTML = DOMPurify.sanitize(locale === 'vi' ? recruitment.benefit : recruitment.benefit_en || '')

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

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Back button */}
        <div className='mb-4'>
          <Button
            variant='ghost'
            className='gap-2 -ml-2 text-gray-600 hover:text-gray-900 cursor-pointer'
            onClick={() => window.history.back()}
          >
            <ArrowLeft className='w-4 h-4' />
            {locale === 'vi' ? 'Quay lại' : 'Back'}
          </Button>
        </div>

        {/* Header Section */}
        <div className='mb-8'>
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 mb-6 border border-blue-100'>
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-3'>
                  <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                    {locale === 'vi' ? recruitment.title : recruitment.title_en}
                  </h1>
                  {recruitment.type === 'hot' && (
                    <Badge variant='destructive' className='px-3 py-1 text-sm font-semibold'>
                      {locale === 'vi' ? 'Gấp' : 'Urgent'}
                    </Badge>
                  )}
                </div>

                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm'>
                    <div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center'>
                      <MapPin className='w-4 h-4 text-blue-600' />
                    </div>
                    <span className='font-medium'>
                      {locale === 'vi' ? recruitment.location : recruitment.location_en}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm'>
                    <div className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center'>
                      <Calendar className='w-4 h-4 text-purple-600' />
                    </div>
                    <span className='font-medium'>{formatDate(recruitment.createdAt)}</span>
                  </div>
                  <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm'>
                    <div className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center'>
                      <DollarSign className='w-5 h-5 text-green-600' />
                    </div>
                    <span className='font-medium'>{locale === 'vi' ? recruitment.salary : recruitment.salary_en}</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row gap-2'>
                <RecruitmentApplyForm recruitmentId={recruitment.recruitment_id} locale={locale} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Column */}
        <div className='space-y-6'>
          {/* Job Information - Top */}
          <Card className='border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 border-b'>
              <CardTitle className='text-xl font-bold flex items-center gap-2 text-gray-900'>
                <div className='w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center'>
                  <Info className='w-5 h-5 text-white' />
                </div>
                {locale === 'vi' ? 'Thông tin việc làm' : 'Job Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {recruitment.level?.level_name && (
                  <div className='flex items-start gap-3 p-4'>
                    <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                      <Users className='w-5 h-5 ' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                        {locale === 'vi' ? 'CẤP BẬC' : 'LEVEL'}
                      </p>
                      <p className='text-sm font-semibold text-gray-900'>{recruitment.level.level_name}</p>
                    </div>
                  </div>
                )}
                <div className='flex items-start gap-3 p-4'>
                  <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                    <Briefcase className='w-5 h-5' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                      {locale === 'vi' ? 'VỊ TRÍ' : 'POSITION'}
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {locale === 'vi' ? recruitment.position : recruitment.position_en}
                    </p>
                  </div>
                </div>
                {recruitment.education_en && (
                  <div className='flex items-start gap-3 p-4'>
                    <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                      <GraduationCap className='w-5 h-5' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                        {locale === 'vi' ? 'BẰNG CẤP' : 'EDUCATION'}
                      </p>
                      <p className='text-sm font-semibold text-gray-900'>
                        {locale === 'vi' ? recruitment.education : recruitment.education_en}
                      </p>
                    </div>
                  </div>
                )}
                <div className='flex items-start gap-3 p-4'>
                  <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                    <Clock className='w-5 h-5' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                      {locale === 'vi' ? 'HÌNH THỨC' : 'JOB TYPE'}
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {locale === 'vi' ? recruitment.job_type : recruitment.job_type_en}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-4'>
                  <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                    <Users className='w-5 h-5' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                      {locale === 'vi' ? 'SỐ LƯỢNG' : 'QUANTITY'}
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {recruitment.quantity} {locale === 'vi' ? 'người' : 'people'}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-4'>
                  <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                    <MapPin className='w-5 h-5' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                      {locale === 'vi' ? 'ĐỊA ĐIỂM LÀM VIỆC' : 'WORK LOCATION'}
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {locale === 'vi' ? recruitment.location : recruitment.location_en}
                    </p>
                  </div>
                </div>
                {recruitment.salary_en && (
                  <div className='flex items-start gap-3 p-4'>
                    <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
                      <DollarSign className='w-5 h-5' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                        {locale === 'vi' ? 'LƯƠNG' : 'SALARY'}
                      </p>
                      <p className='text-sm font-semibold text-gray-900'>
                        {locale === 'vi' ? recruitment.salary : recruitment.salary_en || recruitment.salary}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          {(recruitment.description || recruitment.description_en) && (
            <Card className='border-2 border-gray-100 shadow-md hover:shadow-lg transition-shadow'>
              <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 border-b'>
                <CardTitle className='text-xl font-bold flex items-center gap-3 text-gray-900'>
                  <div className='w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center'>
                    <FileText className='w-5 h-5 text-white' />
                  </div>
                  {locale === 'vi' ? 'Mô tả công việc' : 'Job Description'}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div
                  className='prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700'
                  dangerouslySetInnerHTML={{
                    __html: descriptionHTML,
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Requirements */}
          {(recruitment.requirement || recruitment.requirement_en) && (
            <Card className='border-2 border-gray-100 shadow-md hover:shadow-lg transition-shadow'>
              <CardHeader className='bg-gradient-to-r from-orange-50 to-amber-50 border-b'>
                <CardTitle className='text-xl font-bold flex items-center gap-3 text-gray-900'>
                  <div className='w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center'>
                    <CheckCircle className='w-5 h-5 text-white' />
                  </div>
                  {locale === 'vi' ? 'Yêu cầu công việc' : 'Job Requirements'}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div
                  className='prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700'
                  dangerouslySetInnerHTML={{
                    __html: requirementHTML,
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {(recruitment.benefit || recruitment.benefit_en) && (
            <Card className='border-2 border-gray-100 shadow-md hover:shadow-lg transition-shadow'>
              <CardHeader className='bg-gradient-to-r from-green-50 to-emerald-50 border-b'>
                <CardTitle className='text-xl font-bold flex items-center gap-3 text-gray-900'>
                  <div className='w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center'>
                    <Gift className='w-5 h-5 text-white' />
                  </div>
                  {locale === 'vi' ? 'Các phúc lợi dành cho bạn' : 'Benefits for you'}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div
                  className='prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(benefitHTML),
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
