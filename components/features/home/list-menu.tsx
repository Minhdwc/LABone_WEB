'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguageStore } from '@/store/language'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { IWebMenu } from '@/types'
import useEmblaCarousel from 'embla-carousel-react'

interface ListMenuProps {
  menus: IWebMenu[]
  locale?: 'VN' | 'EN'
}

export default function ListMenu({ menus, locale }: ListMenuProps) {
  const router = useRouter()
  const { language: languageFromStore } = useLanguageStore()
  const language = locale || languageFromStore
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  })
  const [isPaused, setIsPaused] = useState(false)

  // Get menu name based on language
  const getMenuName = (menu: IWebMenu) => {
    return language === 'VN' ? menu.web_menu_name_vn : menu.web_menu_name_en
  }

  // Get menu slug based on language
  const getMenuSlug = (menu: IWebMenu) => {
    return language === 'VN' ? menu.slug_vn : menu.slug_en
  }

  // Handle menu click
  const handleMenuClick = (menu: IWebMenu) => {
    const basePath = language === 'VN' ? '/vi' : '/en'
    const menuPrefix = language === 'VN' ? 'danh-muc-san-pham' : 'product-categories'
    router.push(`${basePath}/${menuPrefix}/${getMenuSlug(menu)}`)
  }

  // Autoplay logic with guard to avoid unnecessary scroll calls
  useEffect(() => {
    if (!emblaApi || isPaused) return

    const interval = setInterval(() => {
      if (!emblaApi) return
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [emblaApi, isPaused])

  const title = language === 'VN' ? 'DANH MỤC SẢN PHẨM' : 'PRODUCT CATEGORIES'

  if (menus.length === 0) {
    return (
      <section className='py-4 relative bg-blue-300'>
        <div className='max-w-7xl mx-auto container px-4'>
          <div className='text-center mb-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>{title}</h2>
            <div className='mx-auto mt-2 w-16 h-0.5 bg-blue-600 rounded-full' aria-hidden />
          </div>
          <div className='text-center py-8'>
            <p className='text-gray-700 text-base sm:text-lg font-semibold mb-2'>
              {language === 'VN' ? 'Không có danh mục' : 'No categories available'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-12 relative bg-gray-200/3'>
      <div className='max-w-7xl mx-auto container px-4'>
        {/* Title */}
        <div className='text-center mb-4'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>{title}</h2>
          <div className='mx-auto mt-2 w-16 h-0.5 bg-blue-600 rounded-full' aria-hidden />
        </div>

        {/* Carousel Container */}
        <div
          className='relative group/carousel'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className='absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100'
            aria-label='Previous categories'
          >
            <ChevronLeft className='w-5 h-5 text-gray-700' />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className='absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100'
            aria-label='Next categories'
          >
            <ChevronRight className='w-5 h-5 text-gray-700' />
          </button>

          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex py-4'>
              {menus.map((menu) => (
                <div
                  key={menu.web_menu_id}
                  className='flex-[0_0_50%] min-w-0 px-1.5 sm:flex-[0_0_33.33%] sm:px-2 md:flex-[0_0_25%]'
                >
                  <Card
                    onClick={() => handleMenuClick(menu)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleMenuClick(menu)
                      }
                    }}
                    tabIndex={0}
                    role='button'
                    aria-label={getMenuName(menu)}
                    className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer group border border-gray-200 hover:border-gray-300 h-full'
                  >
                    {/* Category Image/Icon */}
                    <div className='relative aspect-4/3 bg-gray-50 flex items-center justify-center overflow-hidden'>
                      {menu.image_url ? (
                        <Image src={menu.image_url} alt={getMenuName(menu)} fill className='object-contain p-2' />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                          <span className='text-gray-400 text-3xl sm:text-4xl font-bold'>
                            {getMenuName(menu).charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Category Name */}
                    <div className='p-3 sm:p-4 text-center bg-white flex-1 flex flex-col items-center justify-center'>
                      <h5 className='text-sm sm:text-base font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200'>
                        {getMenuName(menu)}
                      </h5>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
