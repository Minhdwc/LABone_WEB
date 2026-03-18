'use client'

import { useMemo } from 'react'
import ProductItem from './product-item'
import { IWebMenuProduct, IWebMenuProductUsage } from '@/types'
import { Table, TableHeader, TableBody, TableHead, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductsListProps {
  products: IWebMenuProduct[] | IWebMenuProductUsage[]
  currentLanguage: 'VN' | 'EN'
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  viewMode: boolean
  menuType?: string
}

export default function ProductsList({
  products,
  currentLanguage,
  currentPage,
  setCurrentPage,
  totalPages,
  viewMode,
  menuType = 'menu',
}: ProductsListProps) {
  const paginatedProducts = useMemo(() => {
    // Với server-side pagination, products đã được paginated từ API
    // Chỉ cần extract WebMenuProduct nếu là usage type
    if (menuType === 'usage') {
      return products
        .map((item) => {
          // Backend trả về WebMenuProduct (PascalCase) hoặc web_menu_product (camelCase)
          const usageItem = item as unknown as {
            WebMenuProduct?: IWebMenuProduct
          }
          return usageItem.WebMenuProduct
        })
        .filter(Boolean) as IWebMenuProduct[]
    }

    return products as IWebMenuProduct[]
  }, [products, menuType])

  const handleSetPage = (page: number) => {
    setCurrentPage(page + 1) // CustomPagination uses 0-based, we use 1-based
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div>
      {!viewMode ? (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {paginatedProducts.map((product) => (
            <ProductItem
              key={product.web_menu_product_id}
              product={product}
              currentLanguage={currentLanguage}
              viewMode={viewMode}
              menuType={menuType}
            />
          ))}
        </div>
      ) : (
        <div className='border rounded-lg overflow-hidden shadow-sm'>
          <Table>
            <TableHeader>
              <TableRow className='bg-linear-to-r from-gray-50 to-blue-50'>
                <TableHead className='px-4 py-3 font-semibold text-gray-700 max-w-xs'>
                  <div className='flex flex-col'>
                    <span>{currentLanguage === 'VN' ? 'Tên sản phẩm' : 'Product name'}</span>
                    <span className='text-xs text-gray-500 font-normal'>Model/code</span>
                  </div>
                </TableHead>
                <TableHead className='px-4 py-3 font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Mã sản phẩm' : 'Product code'}
                </TableHead>
                <TableHead className='px-4 py-3 font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Hình ảnh' : 'Image'}
                </TableHead>
                <TableHead className='px-4 py-3 font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Qui cách đóng gói' : 'Packaging'}
                </TableHead>
                <TableHead className='px-4 py-3 text-center font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Đặt hàng' : 'Order'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <ProductItem
                  key={product.web_menu_product_id}
                  product={product}
                  currentLanguage={currentLanguage}
                  viewMode={viewMode}
                  menuType={menuType}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className='mt-6 sm:mt-8'>
          <Pagination>
            <PaginationContent className='list-none'>
              <PaginationItem className='list-none'>
                <Button variant='outline' onClick={() => handleSetPage(currentPage - 2)} disabled={currentPage === 1}>
                  <ChevronLeft className='h-4 w-4' />
                  <span className='sr-only'>Back</span>
                </Button>
              </PaginationItem>
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <PaginationItem className='list-none'>
                    <PaginationLink href='#' isActive={currentPage === 1} onClick={() => handleSetPage(0)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 4 && (
                    <PaginationItem className='list-none'>
                      <span className='px-2'>...</span>
                    </PaginationItem>
                  )}
                </>
              )}

              {/* Main page numbers */}
              {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                .filter((p) => p > 0 && p <= totalPages)
                .map((p) => (
                  <PaginationItem key={p} className='list-none'>
                    <PaginationLink
                      href='#'
                      isActive={p === currentPage}
                      onClick={() => handleSetPage(p - 1)}
                      className={p === currentPage ? 'bg-blue-600 text-white' : ''}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <PaginationItem className='list-none'>
                      <span className='px-2'>...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem className='list-none'>
                    <PaginationLink
                      href='#'
                      isActive={currentPage === totalPages}
                      onClick={() => handleSetPage(totalPages - 1)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem className='list-none'>
                <Button
                  variant='outline'
                  onClick={() => handleSetPage(currentPage)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className='h-4 w-4' />
                  <span className='sr-only'>Next</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
