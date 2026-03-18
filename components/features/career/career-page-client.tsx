'use client'
import { IRecruitment } from '@/types'
import { useEffect, useState } from 'react'
import WebRecruitmentService from '@/services/web-recruitment.service'
import { careerContentEN, careerContentVN } from '@/lib/containts'
import { JobList } from './job-list'
import Image from 'next/image'

interface IRecruitmentResponse {
  data: IRecruitment[]
  total: number
  pageCurrent: number
  totalPage: number
}

interface CareerPageClientProps {
  locale: 'vi' | 'en'
  normalRecruitments: IRecruitmentResponse
  hotRecruitments: IRecruitmentResponse
  internshipRecruitments: IRecruitmentResponse
}

export default function CareerPageClient({
  locale,
  normalRecruitments,
  hotRecruitments,
  internshipRecruitments,
}: CareerPageClientProps) {
  // Hot jobs state
  const [hotData, setHotData] = useState<IRecruitmentResponse>(hotRecruitments)
  const [hotPage, setHotPage] = useState(0)
  const [hotLimit, setHotLimit] = useState(10)
  // Normal jobs state
  const [normalData, setNormalData] = useState<IRecruitmentResponse>(normalRecruitments)
  const [normalPage, setNormalPage] = useState(0)
  const [normalLimit, setNormalLimit] = useState(10)

  // Internship jobs state
  const [internData, setInternData] = useState<IRecruitmentResponse>(internshipRecruitments)
  const [internPage, setInternPage] = useState(0)
  const [internLimit, setInternLimit] = useState(10)

  // Fetch hot jobs
  useEffect(() => {
    const fetchData = async () => {
      const response = await WebRecruitmentService.getWebRecruitments({
        type: 'hot',
        page: hotPage,
        limit: hotLimit,
      })
      setHotData(response)
    }
    fetchData()
  }, [hotPage, hotLimit])

  // Fetch normal jobs
  useEffect(() => {
    const fetchData = async () => {
      const response = await WebRecruitmentService.getWebRecruitments({
        type: 'normal',
        page: normalPage,
        limit: normalLimit,
      })
      setNormalData(response)
    }
    fetchData()
  }, [normalPage, normalLimit])

  // Fetch internship jobs
  useEffect(() => {
    const fetchData = async () => {
      const response = await WebRecruitmentService.getWebRecruitments({
        type: 'intern',
        page: internPage,
        limit: internLimit,
      })
      setInternData(response)
    }
    fetchData()
  }, [internPage, internLimit])

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='relative w-full py-16 sm:py-20 md:py-24 overflow-hidden'>
        {/* Background Image - Optimized with Next.js Image */}
        <Image
          src='/assets/company/companyLabone.jpg'
          alt='Công ty LABone'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
          quality={85}
        />
        <div className='absolute inset-0 bg-black/50 z-10'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20'>
          <div className='bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 md:p-10 max-w-4xl'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6'>
              {locale === 'vi' ? careerContentVN.intro.title : careerContentEN.intro.title}
            </h2>
            <p className='text-base sm:text-lg text-gray-200 leading-relaxed'>
              {locale === 'vi' ? careerContentVN.intro.description : careerContentEN.intro.description}
            </p>
          </div>
        </div>
      </div>

      {/* Hot Jobs Section */}
      {hotData.data.length > 0 && (
        <JobList
          jobs={hotData.data}
          locale={locale}
          title={locale === 'vi' ? 'Tuyển dụng Gấp' : 'Urgent Recruitment'}
          page={hotPage}
          setPage={setHotPage}
          limit={hotLimit}
          setLimit={setHotLimit}
          totalPages={hotData.totalPage}
        />
      )}

      {/* Normal Jobs Section */}
      {normalData.data.length > 0 && (
        <JobList
          jobs={normalData.data}
          locale={locale}
          title={locale === 'vi' ? 'Tuyển dụng thường xuyên' : 'Regular Recruitment'}
          page={normalPage}
          setPage={setNormalPage}
          limit={normalLimit}
          setLimit={setNormalLimit}
          totalPages={normalData.totalPage}
        />
      )}

      {/* Internship Jobs Section */}
      {internData.data.length > 0 && (
        <JobList
          jobs={internData.data}
          locale={locale}
          title={locale === 'vi' ? 'Tuyển dụng thực tập sinh' : 'Internship Jobs'}
          page={internPage}
          setPage={setInternPage}
          limit={internLimit}
          setLimit={setInternLimit}
          totalPages={internData.totalPage}
        />
      )}
    </div>
  )
}
