'use client'

import { IWebMenuProduct } from '@/types'
import Image from 'next/image'
import { TableRow, TableCell } from '@/components/ui/table'
import DOMPurify from 'isomorphic-dompurify'
interface ProductItemProps {
  product: IWebMenuProduct
  currentLanguage: 'VN' | 'EN'
  viewMode: boolean
  menuType?: string
  filterType?: 'is_featured' | 'is_on_sale' | 'is_new'
  /** Card style for home section: grey border, left-aligned text, "Xem chi tiết" button */
  variant?: 'default' | 'home'
}

export default function ProductItem({
  product,
  currentLanguage,
  viewMode,
  menuType = 'menu',
  filterType,
  variant = 'default',
}: ProductItemProps) {
  const productData = product

  // Badge text based on filter type
  const getBadgeText = () => {
    if (!filterType) return null

    switch (filterType) {
      case 'is_featured':
        return currentLanguage === 'VN' ? 'Nổi bật' : 'Featured'
      case 'is_on_sale':
        return currentLanguage === 'VN' ? 'Khuyến mãi' : 'Sale'
      case 'is_new':
        return currentLanguage === 'VN' ? 'Mới' : 'New'
      default:
        return null
    }
  }

  const getBadgeColor = () => {
    switch (filterType) {
      case 'is_featured':
        return 'bg-blue-600'
      case 'is_on_sale':
        return 'bg-red-600'
      case 'is_new':
        return 'bg-green-600'
      default:
        return 'bg-gray-600'
    }
  }

  const badgeText = getBadgeText()
  const badgeColor = getBadgeColor()
  const saleTag = productData.sale_tag || ''
  const shouldTruncateSaleTag = saleTag.length >= 10
  const productName =
    currentLanguage === 'VN' ? productData.product?.product_name : productData.product?.product_english_name

  const productPath =
    currentLanguage === 'VN' ? `/vi/san-pham/${productData.slug_vn}` : `/en/product/${productData.slug_en}`
  const productId = productData.product?.product_id
  const model = productData.product?.code
  const santizePackaging = DOMPurify.sanitize(productData.product?.packaging_specification || '---')

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('productMenuType', menuType)
    }
    window.location.href = productPath
  }

  const viewDetailsText = currentLanguage === 'VN' ? 'Xem chi tiết' : 'View details'

  const isHomeVariant = variant === 'home'

  // ========== DẠNG CARD (Grid View) ==========
  return !viewMode ? (
    <a href={productPath} onClick={handleProductClick} className='block cursor-pointer h-full'>
      <div
        className={`group flex flex-col h-full bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 ${
          isHomeVariant ? 'p-0 overflow-hidden' : 'p-3 sm:p-4 md:p-5 items-center'
        }`}
      >
        <div className='relative w-full aspect-square rounded-t-lg bg-gray-50 overflow-hidden'>
          {productData.product?.image_url ? (
            <Image
              src={productData.product?.image_url}
              alt={productName || ''}
              fill
              sizes='(max-width: 640px) 75vw, (max-width: 768px) 50vw, 33vw'
              className='object-contain p-2 sm:p-3'
              loading='lazy'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100'>
              <span className='text-xl sm:text-2xl font-bold text-gray-400'>{productName?.charAt(0) || ''}</span>
            </div>
          )}

          <div className='absolute top-2 left-2 z-10 flex flex-col gap-1'>
            {isHomeVariant && filterType === 'is_on_sale' && saleTag ? (
              <span className='bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow'>
                {currentLanguage === 'VN' ? 'Khuyến mãi' : 'Promotion'} {saleTag}
              </span>
            ) : isHomeVariant && badgeText ? (
              <span className={`${badgeColor} text-white text-xs font-bold px-2 py-1 rounded-md shadow`}>
                {badgeText}
              </span>
            ) : !isHomeVariant && badgeText ? (
              <span className={`${badgeColor} text-white text-xs font-bold px-2 py-1 rounded-md shadow-md uppercase`}>
                {badgeText}
              </span>
            ) : null}
            {!isHomeVariant && filterType === 'is_on_sale' && saleTag && (
              <div
                className={`bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md ${
                  shouldTruncateSaleTag
                    ? 'max-w-[100px] truncate group-hover:max-w-[300px] group-hover:whitespace-normal'
                    : ''
                }`}
              >
                {saleTag}
              </div>
            )}
          </div>
        </div>

        <div className={isHomeVariant ? 'flex flex-col flex-1 p-4 text-left' : 'w-full space-y-1 text-center'}>
          <h3
            className={
              isHomeVariant
                ? 'text-sm font-semibold text-gray-900 line-clamp-2 mb-2'
                : 'text-xs sm:text-sm font-medium text-blue-600 text-center line-clamp-2 mb-2 px-1'
            }
          >
            {productName}
          </h3>
          <div className='space-y-0.5'>
            {productId && (
              <p className='text-xs text-gray-600'>
                <span className='font-medium'>{currentLanguage === 'VN' ? 'Mã:' : 'Code:'}</span> {productId || '---'}
              </p>
            )}
            {model && (
              <p className='text-xs text-gray-600'>
                <span className='font-medium'>{currentLanguage === 'VN' ? 'Model:' : 'Model:'}</span> {model || '---'}
              </p>
            )}
          </div>
          {isHomeVariant && (
            <span className='mt-3 block w-full py-2 px-3 text-center text-sm font-medium text-gray-800 border border-gray-200 rounded-lg bg-white'>
              {viewDetailsText}
            </span>
          )}
        </div>
      </div>
    </a>
  ) : (
    // ========== DẠNG LIST (List View) - Hiển thị dạng danh sách ngang ==========
    // <div>
    //   <a href={productURL} className='cursor-pointer'>
    //     <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 transition-colors border-b border-gray-100'>
    //       <div className='shrink-0 mx-auto sm:mx-0'>
    //         <div className='relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-sm border border-gray-200 bg-gray-100'>
    //           {productData.product?.image_url ? (
    //             <a href={productURL}>
    //               <Image
    //                 src={productData.product?.image_url}
    //                 alt={productName || ''}
    //                 fill
    //                 className='object-cover'
    //               />
    //             </a>
    //           ) : (
    //             <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200'>
    //               <span className='text-base sm:text-lg font-bold text-gray-500'>
    //                 {productName?.charAt(0) || ''}
    //               </span>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Product Details */}
    //       <div className='flex-1 min-w-0'>
    //         <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors'>
    //           {productName}
    //         </h3>
    //         <div className='space-y-1 text-xs sm:text-sm text-gray-700'>
    //           {productId && (
    //             <p>
    //               <span className='font-medium'>
    //                 {currentLanguage === 'VN' ? 'Code:' : 'Code:'}
    //               </span>{' '}
    //               <span className='text-gray-900'>{productId || '---'}</span>
    //             </p>
    //           )}
    //           {model && (
    //             <p>
    //               <span className='font-medium'>
    //                 {currentLanguage === 'VN' ? 'Model:' : 'Model:'}
    //               </span>{' '}
    //               <span className='text-gray-900'>{model || '---'}</span>
    //             </p>
    //           )}
    //           {productData.product?.unit && (
    //             <p>
    //               <span className='font-medium'>
    //                 {currentLanguage === 'VN' ? 'Đơn vị:' : 'Unit:'}{' '}
    //               </span>
    //               <span className='text-gray-700'>
    //                 {currentLanguage === 'VN'
    //                   ? productData.product?.unit || '---'
    //                   : productData.product?.unit_english || '---'}
    //               </span>
    //             </p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </a>
    // </div>

    // ========== DẠNG TABLE (Table View) - Hiển thị dạng bảng ==========
    <TableRow className='hover:bg-blue-50/50 transition-colors duration-200 border-b border-gray-100'>
      {/* Tên sản phẩm và Model/code */}
      <TableCell className='px-4 py-4 max-w-xs'>
        <a href={productPath} onClick={handleProductClick} className='block hover:text-blue-600 transition-colors'>
          <h3 className='text-sm sm:text-base font-semibold text-gray-900 mb-1 whitespace-normal wrap-break-word'>
            {productName || '---'}
          </h3>
          <p className='text-xs text-gray-500 whitespace-normal wrap-break-word'>
            {currentLanguage === 'VN' ? 'Model/code:' : 'Model/code:'} {model || productId || '---'}
          </p>
        </a>
      </TableCell>

      {/* Mã sản phẩm */}
      <TableCell className='px-4 py-4'>
        <span className='text-sm font-medium text-gray-700'>{productId || '---'}</span>
      </TableCell>

      {/* Hình ảnh */}
      <TableCell className='px-4 py-4'>
        <div className='relative w-16 h-16 sm:w-20 sm:h-20 mx-auto'>
          {productData.product?.image_url ? (
            <Image
              src={productData.product?.image_url}
              alt={productName || ''}
              fill
              className='object-contain rounded border border-gray-200'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 rounded border border-gray-200'>
              <span className='text-base sm:text-lg font-bold text-gray-400'>{productName?.charAt(0) || ''}</span>
            </div>
          )}
        </div>
      </TableCell>

      {/* Qui cách đóng gói */}
      <TableCell className='px-4 py-4'>
        <div
          className='text-sm text-gray-700 [&>p]:m-0 [&>ul]:ml-4 [&>ul]:list-disc'
          dangerouslySetInnerHTML={{ __html: santizePackaging }}
        />
      </TableCell>

      {/* Đặt hàng */}
      <TableCell className='px-4 py-4 text-center'>
        <a
          href={productPath}
          onClick={handleProductClick}
          className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm'
        >
          {currentLanguage === 'VN' ? 'Đặt hàng' : 'Order'}
        </a>
      </TableCell>
    </TableRow>
  )
}
