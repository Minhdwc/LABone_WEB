'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IWebMenu } from '@/types'
import Image from 'next/image'
import { useLanguageStore } from '@/store/language'
import ProductsContainer from './product-list/products-container'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { companyInfo } from '@/lib/company-contants'
import CustomPagination from '@/components/custom/pagination/custom-pagination'
import WebMenuService from '@/services/web-menu.service'
import DialogListWebMenuFile from './dialog-list-web-menu-file'
interface ProductMenuClientProps {
  menu: IWebMenu
  // menuChildren: IWebMenu[]
  menuType?: string
}
const getBasePath = (menuType: string, language: 'VN' | 'EN') => {
  if (menuType === 'usage') {
    return language === 'VN' ? 'ung-dung' : 'application'
  }
  return language === 'VN' ? 'danh-muc-san-pham' : 'product-categories'
}

export default function ProductMenuDetailClient({
  menu,
  menuType = 'menu',
}: ProductMenuClientProps) {
  const { language } = useLanguageStore()
  const [limit, setLimit] = useState<number>(menu.childrenPagination?.limitChildren || 9)
  const [page, setPage] = useState<number>(menu.childrenPagination?.pageCurrent || 0)
  const [totalPages, setTotalPages] = useState<number>(menu.childrenPagination?.totalPage || 1)
  const isInitialMount = useRef(true)
  const router = useRouter()
  const menuName = language === 'VN' ? menu.web_menu_name_vn : menu.web_menu_name_en
  const menuDescription = language === 'VN' ? menu.description_vn : menu.description_en
  const menuSlug = language === 'VN' ? menu.slug_vn : menu.slug_en
  const prefixPath = language === 'VN' ? 'vi' : 'en'
  const basePath = getBasePath(menuType, language)
  const [menuChildren, setMenuChildren] = useState<IWebMenu[]>(menu.children || [])
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const fetchChildren = async () => {
      const response = await WebMenuService.getDetailBySlug(menuSlug, prefixPath, page, limit)
      if (response) {
        setMenuChildren(response.children || [])
      }
    }
    fetchChildren()
  }, [limit, page])

  const pageCurrent = page + 1
  return (
    <div className='w-full'>
      {
        <>
          {menu.banner_url ? (
            <div className='relative w-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] overflow-hidden'>
              <Image src={menu.banner_url} alt={menuName} fill className='object-cover' priority />
              <div className='absolute inset-0 bg-linear-to-r from-white/80 via-white/60 to-transparent' aria-hidden />
              <div className='relative z-10'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14'>
                  <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-10'>
                    <div className='w-full md:w-3/5 lg:w-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10'>
                      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6'>
                        {menuName.toUpperCase()}
                      </h1>
                      {menuDescription && (
                        <p className='text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed'>
                          {menuDescription}
                        </p>
                      )}
                    </div>
                    <div className='hidden md:block md:flex-1' aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full bg-gray-100'>
              <div className='container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14'>
                <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-10'>
                  <div className='w-full md:w-3/5 lg:w-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6'>
                      {menuName.toUpperCase()}
                    </h1>
                    {menuDescription && (
                      <p className='text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed'>{menuDescription}</p>
                    )}
                  </div>
                  <div className='hidden md:block md:flex-1' aria-hidden />
                </div>
              </div>
            </div>
          )}
        </>
      }
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
      {/* Content Section */}
      <div className='container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16 max-w-7xl'>
        {/*Menu children */}
        {!menu.is_leaf ? (
          menuChildren && menuChildren.length > 0 ? (
            <div>
              <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
                {menuChildren?.map((child) => (
                  <div
                    key={child.web_menu_id}
                    onClick={() =>
                    (window.location.href = `/${language === 'VN' ? 'vi' : 'en'}/${basePath}/${language === 'VN' ? child.slug_vn : child.slug_en
                      }`)
                    }
                    className='group block cursor-pointer'
                  >
                    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full'>
                      {/* Category Image */}
                      <div className='relative w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100 overflow-hidden'>
                        {child.image_url ? (
                          <Image
                            src={child.image_url}
                            alt={
                              language === 'VN'
                                ? child.web_menu_name_vn || child.web_menu_name_en
                                : child.web_menu_name_en || child.web_menu_name_vn
                            }
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200'>
                            <span className='text-2xl sm:text-3xl md:text-4xl text-gray-400'>
                              {(language === 'VN'
                                ? child.web_menu_name_vn || child.web_menu_name_en
                                : child.web_menu_name_en || child.web_menu_name_vn
                              ).charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className='p-3 sm:p-4 md:p-6'>
                        <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-center line-clamp-2'>
                          {language === 'VN'
                            ? child.web_menu_name_vn || child.web_menu_name_en
                            : child.web_menu_name_en || child.web_menu_name_vn}
                        </h3>
                        {(language === 'VN' ? child.description_vn : child.description_en) && (
                          <p className='text-xs sm:text-sm text-gray-600 text-center line-clamp-2 mt-2'>
                            {language === 'VN' ? child.description_vn : child.description_en}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          ) : (
            <div className='text-center py-8 sm:py-12'>
              <p className='text-gray-500 text-base sm:text-lg'>
                {language === 'VN' ? 'Không có dữ liệu' : 'No data available'}
              </p>
            </div>
          )
        ) : menu.is_leaf ? (
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 items-start'>
            {/* Left Sidebar - 1 column */}
            <div className='lg:col-span-1 lg:h-full'>
              <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-6 lg:h-full lg:sticky lg:top-4'>
                {/* Contact Us Section */}
                <div>
                  <h3 className='text-xs sm:text-sm font-semibold text-white mb-3 bg-gray-500 dark:bg-gray-600 px-3 py-2 rounded uppercase tracking-wide'>
                    {language === 'VN' ? 'LIÊN HỆ VỚI CHÚNG TÔI' : 'CONTACT US'}
                  </h3>
                  <div className='space-y-2.5'>
                    <a
                      href='tel:0978782147'
                      className='block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                    >
                      {language === 'VN' ? `Điện thoại: ${companyInfo.phone.vi}` : `Phone: ${companyInfo.phone.vi}`}
                    </a>
                    <a
                      href={`mailto:${companyInfo.email.vi}`}
                      className='block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                    >
                      Email: {companyInfo.email.vi}
                    </a>
                  </div>
                </div>

                {/* Shared Documents Section */}
                <div>
                  <h3 className='text-xs sm:text-sm font-semibold text-white mb-3 bg-gray-500 dark:bg-gray-600 px-3 py-2 rounded uppercase tracking-wide'>
                    {language === 'VN' ? 'TÀI LIỆU CHIA SẺ' : 'SHARED DOCUMENTS'}
                  </h3>
                  <div className='space-y-2.5'>
                    <DialogListWebMenuFile webMenuFile={menu} type='catalogue' />
                    <DialogListWebMenuFile webMenuFile={menu} type='brochure' />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Products Container - 3 columns */}
            <div className='lg:col-span-3'>
              <ProductsContainer
                web_menu_id={menu.web_menu_id}
                initialLanguage={language}
                limit={limit}
                setLimit={setLimit}
                menuType={menuType}
              />
            </div>
          </div>
        ) : (
          <div className='text-center py-8 sm:py-12'>
            <p className='text-gray-500 text-base sm:text-lg'>
              {language === 'VN' ? 'Không có dữ liệu' : 'No data available'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
