'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaTimes, FaChevronRight } from 'react-icons/fa'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLanguageStore } from '@/store/language'
import WebMenuProductService from '@/services/web-menu-product.service'
import { IWebMenuProduct } from '@/types'
import notFoundImage from '@/public/assets/notFound/product-placeholder.jpg'

interface SearchSheetProps {
  children: React.ReactNode
}

export default function SearchSheet({ children }: SearchSheetProps) {
  const { language } = useLanguageStore()
  const currentLocale = language === 'VN' ? 'vi' : 'en'
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<IWebMenuProduct[]>([])
  const [loading, setLoading] = useState(false)

  // Xử lý debounce khi tìm kiếm
  useEffect(() => {
    // Chỉ tìm kiếm khi có từ khóa (ít nhất 2 ký tự)
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setProducts([])
      setLoading(false)
      return
    }

    const searchProducts = async () => {
      try {
        setLoading(true)
        const response = await WebMenuProductService.getWebMenuProducts({
          search: searchQuery.trim(),
          limit: 100,
        })
        setProducts(response.data || [])
      } catch {
        // Error searching products
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    // Tăng debounce time lên 500ms để giảm số request
    const timeoutId = setTimeout(searchProducts, 500)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
    setProducts([])
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side='right'
        className='w-full sm:max-w-lg bg-gradient-to-br from-white via-blue-50 to-violet-50 dark:from-[#20272e] dark:via-[#191e24] dark:to-[#191e21] rounded-l-xl border-l-2 border-sky-100/60 dark:border-sky-900 shadow-xl px-0 overflow-y-auto max-h-[100vh]'
      >
        <SheetHeader>
          <SheetTitle className='flex items-center gap-2 text-2xl font-bold text-sky-700 dark:text-sky-200 drop-shadow-[0_1px_5px_rgba(56,189,248,0.15)] tracking-tight'>
            <FaSearch className='text-sky-600 dark:text-sky-400' />
            {language === 'VN' ? 'Tìm kiếm sản phẩm' : 'Search Products'}
          </SheetTitle>
          <SheetDescription className='text-base text-gray-600 dark:text-gray-300 mt-1'>
            {language === 'VN'
              ? 'Tìm giải pháp chẩn đoán hoàn hảo cho nhu cầu của bạn'
              : 'Find the perfect diagnostic solution for your needs'}
          </SheetDescription>
        </SheetHeader>

        <div className='mt-8 space-y-7 px-5 pb-8'>
          {/* Search Input */}
          <div className='relative'>
            <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-400 dark:text-sky-600' />
            <Input
              placeholder={
                language === 'VN' ? 'Tìm kiếm theo từ khóa, tên sản phẩm...' : 'Search by keyword, product name...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-12 pr-12 h-12 rounded-full shadow focus:shadow-md border-2 border-sky-100 dark:border-sky-800 bg-white/90 dark:bg-gray-900/50 text-gray-800 dark:text-gray-100 transition-all'
            />
            {searchQuery && (
              <Button
                variant='ghost'
                size='sm'
                onClick={clearSearch}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-rose-400'
              >
                <FaTimes className='h-5 w-5' />
              </Button>
            )}
          </div>

          {/* Results Count */}
          {searchQuery.trim() && products.length > 0 && (
            <div className='text-sm text-gray-700 dark:text-gray-300 mb-2 pl-1'>
              <span className='font-semibold text-sky-700 dark:text-sky-300'>{products.length}</span>{' '}
              {language === 'VN'
                ? `sản phẩm${products.length !== 1 ? '' : ''} được tìm thấy`
                : `product${products.length !== 1 ? 's' : ''} found`}
            </div>
          )}

          {/* Products List */}
          <div className='space-y-5 max-h-[27rem] overflow-y-auto scroll-smooth pr-1'>
            {loading ? (
              <div className='text-center py-12 text-gray-400 dark:text-gray-500'>
                <FaSearch className='mx-auto h-16 w-16 text-sky-200 dark:text-sky-700 mb-4 animate-pulse' />
                <p className='text-base mb-3'>{language === 'VN' ? 'Đang tìm kiếm...' : 'Searching...'}</p>
              </div>
            ) : products.length === 0 && searchQuery.trim().length >= 2 ? (
              <div className='text-center py-12 text-gray-400 dark:text-gray-500'>
                <FaSearch className='mx-auto h-16 w-16 text-sky-200 dark:text-sky-700 mb-4 animate-bounce cursor-pointer' />
                <p className='text-base mb-3'>
                  {language === 'VN' ? 'Không tìm thấy sản phẩm nào phù hợp' : 'No products found matching your search'}
                </p>
                <Button
                  variant='outline'
                  onClick={clearSearch}
                  className='mt-2 px-8 py-2 rounded-full border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400 hover:shadow-lg cursor-pointer'
                >
                  {language === 'VN' ? 'Xóa bộ lọc' : 'Clear filters'}
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className='text-center py-12 text-gray-400 dark:text-gray-500'>
                <FaSearch className='mx-auto h-16 w-16 text-sky-200 dark:text-sky-700 mb-4' />
                <p className='text-base mb-3'>
                  {language === 'VN' ? 'Nhập từ khóa để tìm kiếm sản phẩm' : 'Enter keywords to search for products'}
                </p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.web_menu_product_id}
                  product={product}
                  language={language}
                  currentLocale={currentLocale}
                />
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface ProductCardProps {
  product: IWebMenuProduct
  language: 'VN' | 'EN'
  currentLocale: string
}

function ProductCard({ product, language }: ProductCardProps) {
  const productImage = product.product?.image_url || notFoundImage
  const productUrl = language === 'VN' ? `/vi/san-pham/${product.slug_vn}` : `/en/product/${product.slug_en}`

  return (
    <Link href={productUrl} className='block'>
      <div className='group border border-sky-200/60 dark:border-sky-800 rounded-2xl p-4 bg-white/60 dark:bg-gray-900/40 hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden cursor-pointer'>
        <div className='absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-tr from-sky-50 to-sky-200 opacity-30 pointer-events-none' />
        <div className='flex gap-5'>
          {/* Product Image */}
          <div className='shrink-0'>
            <div className='w-24 h-24 bg-gradient-to-br from-sky-100 to-emerald-50 dark:from-gray-800 dark:to-sky-950 rounded-xl overflow-hidden shadow-lg ring-2 ring-sky-100 dark:ring-sky-800'>
              <Image
                src={productImage}
                alt={
                  language === 'VN'
                    ? (product.product?.product_name ?? '')
                    : (product.product?.product_english_name ?? '')
                }
                width={96}
                height={96}
                className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform'
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder-product.png'
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className='flex-1 min-w-0 flex flex-col justify-between'>
            <div>
              <div className='flex items-start justify-between'>
                <h3 className='font-bold text-lg text-gray-900 dark:text-white drop-shadow-sm'>
                  {language === 'VN'
                    ? (product.product?.product_name ?? '')
                    : (product.product?.product_english_name ?? '')}
                </h3>
              </div>

              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                {language === 'VN' ? 'Mã:' : 'Code:'} {product.product_id}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                {language === 'VN' ? 'Danh mục sản phẩm:' : 'Product category:'}{' '}
                {language === 'VN' ? product.web_menu?.web_menu_name_vn : product.web_menu?.web_menu_name_en}
              </p>
            </div>

            <div className='flex items-center justify-between mt-2'>
              {product.product?.productGroup && (
                <Badge
                  variant='secondary'
                  className='text-xs font-semibold bg-sky-50 dark:bg-sky-900/60 border border-sky-100 dark:border-sky-700 text-sky-600 dark:text-sky-200 px-2 rounded-full'
                >
                  {product.product.productGroup.product_group_name}
                </Badge>
              )}
            </div>

            {/* Action Button */}
            <div className='mt-4 flex'>
              <div className='w-full text-sm font-semibold rounded-full transition-all shadow-sm group-hover:bg-sky-700 group-hover:text-white py-2 px-4 text-center bg-sky-600 text-white'>
                <>
                  {language === 'VN' ? 'Xem chi tiết' : 'View Details'}
                  <FaChevronRight className='ml-2 inline-block text-xs' />
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
