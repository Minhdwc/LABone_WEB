'use client'

import { useState, useEffect } from 'react'
import { IWebMenuProduct } from '@/types'
import { useLanguageStore } from '@/store/language'
import ProductItem from '@/components/features/product-categories/product-list/product-item'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import WebMenuProductService from '@/services/web-menu-product.service'
import CustomPagination from '@/components/custom/pagination/custom-pagination'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

type FilterType = 'is_featured' | 'is_on_sale' | 'is_new'

interface ProductPage {
  data: IWebMenuProduct[]
  total: number
  pageCurrent: number
  totalPage: number
}

interface ListProductProps {
  listProduct: ProductPage
  title?: string
  filterType?: FilterType
  /** Card style for ProductItem: 'home' = grey border, Xem chi tiết button */
  productItemVariant?: 'default' | 'home'
}

export default function ListProduct({
  listProduct,
  title,
  filterType,
  productItemVariant = 'default',
}: ListProductProps) {
  const { language } = useLanguageStore()
  const currentLanguage = language as 'VN' | 'EN'
  const [page, setPage] = useState(0)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [productsData, setProductsData] = useState<{
    data: IWebMenuProduct[]
    total: number
    pageCurrent: number
    totalPage: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(9)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  })
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isSheetOpen || !filterType) return

    let cancelled = false

    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const result = await WebMenuProductService.getWebMenuProducts({
          page: page,
          limit: 8,
          [filterType]: true,
        })
        if (!cancelled) {
          setProductsData(result)
          setIsLoading(false)
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      cancelled = true
    }
  }, [page, isSheetOpen, filterType])

  // Handle sheet open/close and reset pagination
  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open)
    if (open) {
      setPage(0)
      setProductsData(null)
    }
  }

  // Use fetched data if available, otherwise use initial data
  const displayData = productsData || listProduct
  const totalPages = displayData.totalPage || Math.ceil(displayData.total / itemsPerPage) || 1
  const pageCurrent = page + 1
  const paginatedProducts = displayData.data
  const useCarousel = listProduct.data.length >= 5

  // Autoplay carousel: scroll next every 3s, guard to avoid unnecessary work when cannot scroll
  useEffect(() => {
    if (!emblaApi || isPaused || !useCarousel) return

    const interval = setInterval(() => {
      if (!emblaApi) return
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [emblaApi, isPaused, useCarousel])

  const viewAllText = currentLanguage === 'VN' ? 'Xem tất cả sản phẩm' : 'View all products'
  const productsTitle = title || (currentLanguage === 'VN' ? 'Sản phẩm nổi bật' : 'Featured Products')

  return (
    <div className='bg-white py-6 sm:py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-4 flex items-center justify-end sm:mb-6'>
          <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger asChild>
              <button
                type='button'
                className='inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors cursor-pointer'
              >
                {viewAllText}
                <ArrowRight className='w-4 h-4' />
              </button>
            </SheetTrigger>
            <SheetContent side='right' className='flex w-full flex-col sm:max-w-2xl'>
              <SheetHeader className='border-b pb-4'>
                <SheetTitle className='text-xl font-bold uppercase'>{productsTitle}</SheetTitle>
              </SheetHeader>

              <div className='flex-1 overflow-y-auto py-6'>
                {isLoading ? (
                  <div className='text-center text-gray-500 py-8'>
                    {currentLanguage === 'VN' ? 'Đang tải...' : 'Loading...'}
                  </div>
                ) : paginatedProducts.length > 0 ? (
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 p-4'>
                    {paginatedProducts.map((product) => (
                      <ProductItem
                        key={product.web_menu_product_id}
                        product={product}
                        currentLanguage={currentLanguage}
                        viewMode={false}
                        filterType={filterType}
                        variant={productItemVariant}
                      />
                    ))}
                  </div>
                ) : (
                  <div className='text-center text-gray-500 py-8'>
                    {currentLanguage === 'VN' ? 'Không có sản phẩm' : 'No products'}
                  </div>
                )}
              </div>

              {totalPages && (
                <div className='mt-auto border-t pt-4'>
                  <CustomPagination
                    page={page}
                    setPage={setPage}
                    pageCurrent={pageCurrent}
                    totalPages={totalPages}
                    limit={itemsPerPage}
                    setLimit={setItemsPerPage}
                    limitOptions={false}
                  />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {useCarousel ? (
          <div
            className='relative group/carousel mt-2'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Arrows */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className='absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100'
              aria-label='Previous products'
            >
              <ChevronLeft className='w-5 h-5 text-gray-700' />
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className='absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100'
              aria-label='Next products'
            >
              <ChevronRight className='w-5 h-5 text-gray-700' />
            </button>

            <div className='overflow-hidden' ref={emblaRef}>
              <div className='flex py-2'>
                {listProduct.data.map((product) => (
                  <div
                    key={product.web_menu_product_id}
                    className='flex-[0_0_75%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 px-1.5'
                  >
                    <ProductItem
                      product={product}
                      currentLanguage={currentLanguage}
                      viewMode={false}
                      filterType={filterType}
                      variant={productItemVariant}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 mt-2'>
            {listProduct.data.slice(0, 4).map((product) => (
              <ProductItem
                key={product.web_menu_product_id}
                product={product}
                currentLanguage={currentLanguage}
                viewMode={false}
                filterType={filterType}
                variant={productItemVariant}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface HomeProductTabsProps {
  onSaleProducts: ProductPage
  newProducts: ProductPage
  featuredProducts: ProductPage
}

export function HomeProductTabs({ onSaleProducts, newProducts, featuredProducts }: HomeProductTabsProps) {
  const { language } = useLanguageStore()
  const currentLanguage = language as 'VN' | 'EN'
  const [activeTab, setActiveTab] = useState<FilterType>('is_on_sale')
  const bannerSubtitle =
    currentLanguage === 'VN'
      ? 'Chúng tôi cung cấp trọn gói từ thiết kế, lắp đặt đến bảo trì các giải pháp phòng thí nghiệm hiện đại nhất hiện nay.'
      : 'We provide a complete package from design, installation to maintenance of the most modern laboratory solutions today.'

  const tabs: {
    key: FilterType
    label: string
    title: string
    products: ProductPage
  }[] = [
    {
      key: 'is_on_sale',
      label: currentLanguage === 'VN' ? 'KHUYẾN MÃI' : 'PROMOTION',
      title: currentLanguage === 'VN' ? 'Sản phẩm khuyến mãi' : 'Promotion Products',
      products: onSaleProducts,
    },
    {
      key: 'is_new',
      label: currentLanguage === 'VN' ? 'MỚI' : 'NEW',
      title: currentLanguage === 'VN' ? 'Sản phẩm mới' : 'New Products',
      products: newProducts,
    },
    {
      key: 'is_featured',
      label: currentLanguage === 'VN' ? 'NỔI BẬT' : 'FEATURED',
      title: currentLanguage === 'VN' ? 'Sản phẩm nổi bật' : 'Featured Products',
      products: featuredProducts,
    },
  ]

  const activeConfig = tabs.find((tab) => tab.key === activeTab) || tabs[0]

  return (
    <div className='w-full'>
      <div className='mx-auto max-w-7xl bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden'>
        {/* Dark blue header: title + description left, segmented tabs right */}
        <div className='bg-blue-800 rounded-t-2xl px-6 sm:px-8 lg:px-10 py-5 sm:py-6'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6'>
            <div className='min-w-0 flex-1'>
              <h2 className='text-xl sm:text-2xl font-bold text-white mb-2'>
                {tabs.find((tab) => tab.key === activeTab)?.title}
              </h2>
              <p className='text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed'>{bannerSubtitle}</p>
            </div>
            <div className='flex shrink-0 rounded-lg overflow-hidden border border-blue-700 bg-blue-800'>
              {tabs.map((tab, index) => {
                const isActive = tab.key === activeTab
                return (
                  <button
                    key={tab.key}
                    type='button'
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 sm:px-5 py-2.5 text-sm font-semibold transition-colors ${
                      index > 0 ? 'border-l border-blue-700' : ''
                    } ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-transparent text-white hover:bg-blue-700/50'}`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* White content area */}
        <ListProduct
          listProduct={activeConfig.products}
          title={activeConfig.title}
          filterType={activeConfig.key}
          productItemVariant='home'
        />
      </div>
    </div>
  )
}
