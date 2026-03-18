'use client'

import { useEffect, useState } from 'react'
import { IWebMenu } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLanguageStore } from '@/store/language'
import CustomPagination from '@/components/custom/pagination/custom-pagination'
import WebMenuService from '@/services/web-menu.service'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface ProductMenuClientProps {
  menuData: IWebMenu[]
  menuType?: string
}

const getBasePath = (menuType: string, locale: 'vi' | 'en') => {
  if (menuType === 'usage') {
    return locale === 'vi' ? 'ung-dung' : 'application'
  }
  return locale === 'vi' ? 'danh-muc-san-pham' : 'product-categories'
}

const getHeroContent = (menuType: string, language: 'VN' | 'EN') => {
  if (menuType === 'usage') {
    return {
      title: language === 'VN' ? 'ỨNG DỤNG' : 'USAGE',
      description:
        language === 'VN'
          ? 'Khám phá các giải pháp ứng dụng chuyên sâu của LABone dành cho những lĩnh vực phòng thí nghiệm và sản xuất khác nhau.'
          : 'Discover LABone’s specialized usage solutions for diverse laboratory and production applications.',
    }
  }

  return {
    title: language === 'VN' ? 'DANH MỤC SẢN PHẨM' : 'PRODUCT CATEGORIES',
    description:
      language === 'VN'
        ? 'Chúng tôi cung cấp giải pháp toàn diện cho các lĩnh vực vi sinh, phân tích, kiểm nghiệm, ống lấy máu và thiết bị cho phòng thí nghiệm.'
        : 'We provide comprehensive solutions for microbiology, analysis, testing, blood collection tubes, and laboratory equipment.',
  }
}

export default function ProductMenuClient({ menuData, menuType = 'menu' }: ProductMenuClientProps) {
  const router = useRouter()
  const [data, setData] = useState<IWebMenu[]>(menuData)
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(9)
  const [totalPages, setTotalPages] = useState<number>(1)
  const { language } = useLanguageStore()
  const currentLocale = language === 'VN' ? 'vi' : 'en'
  const basePath = getBasePath(menuType, currentLocale)
  const heroContent = getHeroContent(menuType, language)

  useEffect(() => {
    const fetchData = async () => {
      const response = await WebMenuService.getWebMenu({
        level: 0,
        page,
        limit,
        type: menuType,
      })
      setData(response.data)
      setTotalPages(response.totalPage)
    }
    fetchData()
  }, [page, limit, menuType])
  const pageCurrent = page + 1
  return (
    <div className='w-full'>
      {/* Hero Banner Section */}
      <div className='relative w-full h-[250px] sm:h-[300px] md:h-[400px] bg-gray-800 overflow-hidden'>
        {/* Background Image Overlay */}
        <div className='absolute inset-0 bg-linear-to-r from-gray-900/80 to-gray-700/60 z-10' />

        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/laboratory-bg.jpg'
            alt='Laboratory background'
            fill
            className='object-cover object-center'
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className='relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6'>
            {heroContent.title}
          </h1>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl px-2'>
            {heroContent.description}
          </p>
        </div>
      </div>
      <div className='container mx-auto px-4 sm:px-6 py-3 sm:py-4 max-w-7xl'>
        <Button
          variant='ghost'
          className='flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer text-sm sm:text-base'
          onClick={() => router.back()}
        >
          <ChevronLeft className='w-4 h-4' />
          <span>{language === 'VN' ? 'Quay lại' : 'Back'}</span>
        </Button>
      </div>
      {/* Product Categories Section */}
      <div className='container mx-auto px-4 sm:px-6 py-3 sm:py-4 max-w-7xl'>
        {data && data.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
            {data.map((menu) => {
              const menuName = language === 'VN' ? menu.web_menu_name_vn : menu.web_menu_name_en
              const menuSlug = currentLocale === 'vi' ? menu.slug_vn : menu.slug_en
              const menuHref = `/${currentLocale}/${basePath}/${menuSlug}`

              return (
                <div
                  key={menu.web_menu_id}
                  onClick={() => (window.location.href = menuHref)}
                  className='group block cursor-pointer '
                >
                  <div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full'>
                    {/* Category Image */}
                    <div className='relative w-full h-40 sm:h-48 md:h-56 bg-gray-100 overflow-hidden'>
                      {menu.image_url ? (
                        <Image
                          src={menu.image_url}
                          alt={menuName}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200'>
                          <span className='text-2xl sm:text-3xl md:text-4xl text-gray-400'>{menuName.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    {/* Category Title and Description */}
                    <div className='p-3 sm:p-4'>
                      <h2 className='text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors line-clamp-2 mb-2'>
                        {menuName}
                      </h2>
                      {(language === 'VN' ? menu.description_vn : menu.description_en) && (
                        <p className='text-xs sm:text-sm text-gray-600 text-center line-clamp-2'>
                          {language === 'VN' ? menu.description_vn : menu.description_en}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='text-center py-12 sm:py-16'>
            <p className='text-gray-500 text-base sm:text-lg'>
              {language === 'VN' ? 'Đang tải danh mục sản phẩm...' : 'Loading product categories...'}
            </p>
          </div>
        )}
        <div className='mt-6 sm:mt-8 md:mt-10 flex justify-center'>
          <CustomPagination
            page={page}
            setPage={setPage}
            pageCurrent={pageCurrent}
            totalPages={totalPages}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </div>
    </div>
  )
}
