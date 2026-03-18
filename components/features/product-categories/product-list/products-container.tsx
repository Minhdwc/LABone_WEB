'use client'

import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/store/language'
import WebMenuProductService from '@/services/web-menu-product.service'
import ProductsList from './products-list'
import { IWebMenuProduct, IWebMenuProductUsage } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutGridIcon, ListIcon, ChevronDownIcon } from 'lucide-react'
import WebMenuUsageProductService from '@/services/web-menu-usage-product.service'

interface ProductsContainerProps {
  web_menu_id: string
  initialLanguage: 'VN' | 'EN'
  limit: number
  setLimit: (value: number) => void
  menuType?: string
}

export default function ProductsContainer({
  web_menu_id,
  initialLanguage,
  limit,
  setLimit,
  menuType = 'menu',
}: ProductsContainerProps) {
  const { language } = useLanguageStore()
  const currentLanguage = language || initialLanguage
  const [viewMode, setViewMode] = useState<boolean>(false)

  const [products, setProducts] = useState<IWebMenuProduct[] | IWebMenuProductUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  // Reset loading state when web_menu_id or menuType changes
  useEffect(() => {
    if (web_menu_id) {
      setLoading(true)
      setProducts([])
      setTotalPages(1)
    }
  }, [web_menu_id, menuType])

  // Fetch products
  useEffect(() => {
    if (!web_menu_id) {
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      setLoading(true)
      try {
        if (menuType === 'menu') {
          const response = await WebMenuProductService.getWebMenuProducts({
            web_menu_id,
            page: currentPage - 1,
            limit,
            search: debouncedSearch,
            locale: currentLanguage === 'VN' ? 'vi' : 'en',
          })
          setProducts(response.data || [])
          setTotalPages(response.totalPage || 1)
        } else if (menuType === 'usage') {
          const response = await WebMenuUsageProductService.getWebMenuUsageProducts({
            web_menu_id,
            page: currentPage - 1,
            limit,
            search: debouncedSearch,
            locale: currentLanguage === 'VN' ? 'vi' : 'en',
          })
          setProducts(response.data || [])
          setTotalPages(response.totalPage || 1)
        }
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [web_menu_id, currentLanguage, limit, currentPage, debouncedSearch, menuType])
  // Initial loading
  if (loading && products.length === 0) {
    return (
      <div className='text-center py-8 sm:py-12'>
        <p className='text-gray-500 text-base sm:text-lg'>
          {currentLanguage === 'VN' ? 'Đang tải danh sách sản phẩm...' : 'Loading products...'}
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      {/* Search and Controls Section */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-4'>
        {/* Search Section */}
        <div className='flex-1 w-full'>
          <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4'>
            {currentLanguage === 'VN' ? 'Tìm kiếm sản phẩm' : 'Search product'}
          </h2>
          <div className='relative'>
            <input
              type='text'
              placeholder={currentLanguage === 'VN' ? 'Tìm kiếm sản phẩm' : 'Search product'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            {loading && (
              <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <div className='animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-400'></div>
              </div>
            )}
          </div>
        </div>

        {/* View Mode and Limit Controls */}
        <div className='flex flex-row items-center justify-between sm:justify-end gap-2 sm:gap-2 w-full sm:w-auto'>
          {/* View Mode Buttons */}
          <div className='flex gap-2 shrink-0'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setViewMode(true)}
              aria-label='List view'
              className={`cursor-pointer h-9 w-9 sm:h-10 sm:w-10 shrink-0 border-gray-300 dark:border-gray-600 ${
                viewMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 dark:border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <ListIcon className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setViewMode(false)}
              aria-label='Grid view'
              className={`cursor-pointer h-9 w-9 sm:h-10 sm:w-10 shrink-0 border-gray-300 dark:border-gray-600 ${
                viewMode
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 dark:border-blue-500'
              }`}
            >
              <LayoutGridIcon className='w-4 h-4' />
            </Button>
          </div>

          {/* Limit Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='cursor-pointer text-xs sm:text-sm h-9 sm:h-10 min-w-[80px] sm:min-w-fit shrink-0 justify-between border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
              >
                <span className='hidden sm:inline whitespace-nowrap'>
                  {currentLanguage === 'VN' ? 'Hiển thị:' : 'Show:'}{' '}
                </span>
                <span className='sm:hidden whitespace-nowrap'>{currentLanguage === 'VN' ? 'Hiển thị' : 'Show'}</span>
                <span className='whitespace-nowrap font-medium'>{limit}</span>
                <ChevronDownIcon className='ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-32'>
              <DropdownMenuRadioGroup value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <DropdownMenuRadioItem value='12'>12</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='24'>24</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='48'>48</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Products List Section */}
      <div className='relative'>
        {loading && products.length > 0 && (
          <div className='absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-md'>
            <div className='flex items-center gap-2 text-gray-600'>
              <div className='animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600'></div>
              <span className='text-sm'>{currentLanguage === 'VN' ? 'Đang tìm kiếm...' : 'Searching...'}</span>
            </div>
          </div>
        )}
        {products.length === 0 ? (
          <div className='text-center py-8 sm:py-12'>
            <p className='text-gray-500 text-base sm:text-lg'>
              {currentLanguage === 'VN' ? 'Không có sản phẩm' : 'No products available'}
            </p>
          </div>
        ) : (
          <ProductsList
            products={products}
            currentLanguage={currentLanguage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            viewMode={viewMode}
            menuType={menuType}
          />
        )}
      </div>
    </div>
  )
}
