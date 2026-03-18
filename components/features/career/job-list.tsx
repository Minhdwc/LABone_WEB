import React from 'react'
import { JobItem } from './job-item'
import { IRecruitment } from '@/types'
import CustomPagination from '@/components/custom/pagination/custom-pagination'

interface JobListProps {
  jobs: IRecruitment[]
  locale: 'vi' | 'en'
  title?: string
  page: number
  setPage: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  totalPages: number
}

export const JobList = ({ jobs, locale, title, page, setPage, limit, setLimit, totalPages }: JobListProps) => {
  if (jobs.length === 0) {
    return null
  }
  return (
    <div className='max-w-7xl mx-auto my-8 bg-white border border-blue-400 rounded-lg'>
      <div className='bg-blue-100 rounded-t-lg p-4 mb-4'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-6 px-4'>{title}</h2>
      </div>
      <div className='p-4 sm:p-6 grid grid-cols-2 gap-4'>
        {jobs.map((job) => (
          <div key={job.recruitment_id} className='cursor-pointer'>
            <JobItem job={job} locale={locale} />
          </div>
        ))}
      </div>
      {totalPages > 0 && (
        <div className='mt-6 pb-4 px-4 flex justify-center'>
          <CustomPagination
            pageViewOptions='even'
            page={page}
            setPage={setPage}
            pageCurrent={page + 1}
            totalPages={totalPages}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      )}
    </div>
  )
}
