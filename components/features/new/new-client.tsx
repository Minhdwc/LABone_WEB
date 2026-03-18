'use client'
import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/store/language'
import CustomPagination from '@/components/custom/pagination/custom-pagination'
import WebNewService, { WebNewPageData } from '@/services/web-new.service'
import CardNew from './card-new'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface NewClientProps {
  newsData: WebNewPageData
  basePath: string
}

export default function NewClient({ newsData, basePath }: NewClientProps) {
  const { language } = useLanguageStore()
  const [page, setPage] = useState(newsData.pageCurrent - 1)
  const [limit, setLimit] = useState(9)
  const [dataNews, setDataNews] = useState(newsData)
  const router = useRouter()

  useEffect(() => {
    const fetchNews = async () => {
      const response = await WebNewService.getAllWebNew({
        limit: limit,
        page: page,
      })
      setDataNews(response)
    }
    fetchNews()
  }, [page, limit])

  const hero = {
    EN: {
      title: 'NEWS',
      subtitle: 'Stay informed with the latest news from LABone',
      description:
        'Read the latest articles, updates, and insights from LABone about scientific equipment, laboratory solutions, and industry trends.',
    },
    VN: {
      title: 'TIN TỨC',
      subtitle: 'Cập nhật tin tức mới nhất từ LABone',
      description:
        'Đọc các bài viết, cập nhật và thông tin chi tiết mới nhất từ LABone về thiết bị khoa học, giải pháp phòng thí nghiệm và xu hướng ngành.',
    },
  }

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section */}
      <div className='relative w-full h-[300px] sm:h-[350px] bg-linear-to-br from-blue-600 via-blue-700 to-sky-600'>
        <div className='relative h-full flex items-center justify-center px-4'>
          <div className='text-center space-y-4 max-w-4xl'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>
              {language === 'VN' ? hero.VN.title : hero.EN.title}
            </h1>
            <p className='text-lg sm:text-xl text-white/90 font-medium'>
              {language === 'VN' ? hero.VN.subtitle : hero.EN.subtitle}
            </p>
            <p className='text-base sm:text-lg text-white/80 max-w-2xl mx-auto'>
              {language === 'VN' ? hero.VN.description : hero.EN.description}
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <div className='mb-6'>
          <Button
            variant='ghost'
            className='gap-2 -ml-2 text-gray-600 hover:text-gray-900 cursor-pointer'
            onClick={() => router.back()}
          >
            <ArrowLeft className='w-4 h-4' />
            {language === 'VN' ? 'Quay lại' : 'Back'}
          </Button>
        </div>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
          {/* Main Content - News Grid */}
          <div className='flex-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {dataNews.data && dataNews.data.length > 0 ? (
                dataNews.data.map((newItem) => <CardNew key={newItem.new_id} item={newItem} basePath={basePath} />)
              ) : (
                <div className='text-center text-gray-500'>Không có dữ liệu</div>
              )}
            </div>

            {/* Pagination */}
            {dataNews.totalPage > 0 && (
              <div className='mt-8'>
                <CustomPagination
                  page={page}
                  setPage={setPage}
                  pageCurrent={dataNews.pageCurrent}
                  totalPages={dataNews.totalPage}
                  limit={limit}
                  setLimit={setLimit}
                  language={language}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
