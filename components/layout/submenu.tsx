'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { IWebMenu, IWebMenuProduct, IWebMenuProductUsage } from '@/types'
import WebMenuService from '@/services/web-menu.service'
import { ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubmenuProps {
  isOpen: boolean
  language: 'VN' | 'EN'
  menuData?: IWebMenu[] | null
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
}

export default function Submenu({
  isOpen,
  language,
  menuData = [],
  hasMore = false,
  isLoading = false,
  onLoadMore,
}: SubmenuProps) {
  const [activeMenuId, setActiveMenuId] = useState<string>('')
  const [menuDetail, setMenuDetail] = useState<IWebMenu | IWebMenuProductUsage | IWebMenuProduct | null>(null)
  //kiểm tra menuData có dữ liệu không
  const hasData = menuData && menuData.length > 0
  // Reset và chọn menu đầu tiên khi menuData thay đổi hoặc mở submenu
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveMenuId('')
        setMenuDetail(null)
      }, 0)
      return
    }

    if (!hasData || !menuData[0]) return

    // Kiểm tra nếu activeMenuId không tồn tại trong menuData mới
    const activeMenuExists = activeMenuId ? menuData.some((m) => m.web_menu_id === activeMenuId) : false

    // Reset và chọn menu đầu tiên nếu chưa có activeMenuId hoặc activeMenuId không hợp lệ
    if (!activeMenuId || !activeMenuExists) {
      setTimeout(() => {
        setMenuDetail(null)
        setActiveMenuId(menuData[0].web_menu_id)
      }, 0)
    }
  }, [isOpen, hasData, menuData, activeMenuId])

  // Fetch chi tiết menu khi activeMenuId thay đổi
  useEffect(() => {
    if (!activeMenuId || !menuData) {
      setTimeout(() => setMenuDetail(null), 0)
      return
    }

    const selected = menuData.find((m) => m.web_menu_id === activeMenuId)
    if (!selected) {
      setTimeout(() => setMenuDetail(null), 0)
      return
    }

    const fetchMenuDetail = async () => {
      try {
        const res = await WebMenuService.getWebMenu({
          web_menu_id: selected.web_menu_id,
        })
        setMenuDetail(res.menuSelectedData || null)
      } catch {
        setMenuDetail(null)
      }
    }

    fetchMenuDetail()
  }, [activeMenuId, menuData])

  // Helper functions
  const isProduct = (item: IWebMenu | IWebMenuProductUsage | IWebMenuProduct): item is IWebMenuProduct =>
    'web_menu_product_id' in item

  const isUsage = (item: IWebMenu | IWebMenuProductUsage | IWebMenuProduct): item is IWebMenuProductUsage =>
    'web_menu_product_usage_id' in item

  const getName = (item: IWebMenu | IWebMenuProductUsage | IWebMenuProduct) => {
    if (isProduct(item)) {
      const productName = item.product
        ? language === 'VN'
          ? item.product.product_name
          : item.product.product_english_name
        : language === 'VN'
          ? item.slug_vn
          : item.slug_en

      // Hiển thị format: code | productName nếu có code
      const code = item.product?.code
      return code ? `${code} | ${productName}` : productName
    }
    if (isUsage(item)) {
      // Với IWebMenuProductUsage, lấy từ web_menu hoặc fallback về web_menu_product
      const menuName = language === 'VN' ? item.web_menu?.web_menu_name_vn : item.web_menu?.web_menu_name_en

      if (menuName) return menuName

      // Fallback: lấy từ product nếu web_menu không có
      const productName = item.WebMenuProduct?.product
        ? language === 'VN'
          ? item.WebMenuProduct.product.product_name
          : item.WebMenuProduct.product.product_english_name
        : null

      return productName || ''
    }
    // Nếu là IWebMenu, lấy trực tiếp từ web_menu_name
    return language === 'VN' ? item.web_menu_name_vn : item.web_menu_name_en
  }

  const getImage = (item: IWebMenu | IWebMenuProductUsage | IWebMenuProduct) =>
    isProduct(item) ? item.product?.image_url : isUsage(item) ? item.WebMenuProduct?.product?.image_url : item.image_url

  const getUrl = (item: IWebMenu | IWebMenuProductUsage | IWebMenuProduct) => {
    // Lấy slug theo language với fallback
    const slug = isProduct(item)
      ? language === 'VN'
        ? item.slug_vn || item.slug_en
        : item.slug_en || item.slug_vn
      : isUsage(item)
        ? language === 'VN'
          ? item.web_menu?.slug_vn || item.web_menu?.slug_en
          : item.web_menu?.slug_en || item.web_menu?.slug_vn
        : language === 'VN'
          ? item.slug_vn || item.slug_en
          : item.slug_en || item.slug_vn

    const prefix = `/${language === 'VN' ? 'vi' : 'en'}`

    if (isProduct(item)) {
      const path = language === 'VN' ? 'san-pham' : 'product'
      return `${prefix}/${path}/${slug}`
    }
    if (isUsage(item)) {
      const path = language === 'VN' ? 'ung-dung' : 'application'
      return `${prefix}/${path}/${slug}`
    }

    const path =
      item.type === 'usage'
        ? language === 'VN'
          ? 'ung-dung'
          : 'application'
        : language === 'VN'
          ? 'danh-muc-san-pham'
          : 'product-categories'
    return `${prefix}/${path}/${slug}`
  }

  // Xác định menu đã chọn và children
  const selectedMenu = useMemo(
    () => menuDetail || menuData?.find((m) => m.web_menu_id === activeMenuId) || menuData?.[0] || null,
    [menuDetail, menuData, activeMenuId],
  )

  const currentChildren = useMemo(() => {
    if (!selectedMenu) return []

    // Kiểm tra nếu selectedMenu là IWebMenu
    if (
      'web_menu_id' in selectedMenu &&
      !('web_menu_product_id' in selectedMenu) &&
      !('web_menu_product_usage_id' in selectedMenu)
    ) {
      const menu = selectedMenu as IWebMenu
      return menu.children?.length ? menu.children : menu.webMenuProducts || []
    }

    return []
  }, [selectedMenu])

  if (!isOpen) return null

  // Component render item (product hoặc menu)
  const renderItem = (item: IWebMenu | IWebMenuProductUsage | IWebMenuProduct, index: number) => {
    const itemImage = getImage(item)
    const itemName = getName(item) || ''
    const itemUrl = getUrl(item)
    const isEven = index % 2 === 0
    const isLastRow = Math.floor(index / 2) >= Math.floor((currentChildren.length - 1) / 2)

    const itemContent = (
      <>
        {itemImage ? (
          <div className='relative w-[120px] h-[72px] rounded-sm overflow-hidden bg-gray-100 shrink-0'>
            <Image src={itemImage} alt={itemName || 'Item image'} fill className='object-cover' />
          </div>
        ) : (
          <div className='w-[120px] h-[72px] rounded-sm bg-gray-200 flex items-center justify-center shrink-0'>
            <span className='text-xs text-gray-400'>{itemName ? itemName.charAt(0).toUpperCase() : 'N'}</span>
          </div>
        )}
        <span className='text-base font-bold text-gray-900 hover:text-blue-600'>{itemName || 'Unnamed'}</span>
      </>
    )

    return (
      <div
        key={isProduct(item) ? item.web_menu_product_id : item.web_menu_id}
        className={`${
          isEven && index < currentChildren.length - 1
            ? 'sm:border-r sm:border-gray-200 sm:pr-4'
            : !isEven
              ? 'sm:pl-4'
              : ''
        } ${!isLastRow ? 'border-b border-gray-200' : ''}`}
      >
        {isProduct(item) ? (
          <div
            onClick={() => {
              window.location.href = itemUrl
            }}
            className='flex items-center gap-3 py-2 hover:bg-gray-50 transition cursor-pointer'
          >
            {itemContent}
          </div>
        ) : (
          <div
            onClick={() => {
              window.location.href = itemUrl
            }}
            className='flex items-center gap-3 py-2 hover:bg-gray-50 transition cursor-pointer'
          >
            {itemContent}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={
        'pt-1 w-full sm:w-[700px] md:w-[900px] lg:w-[950px] xl:w-[1200px] bg-white shadow-lg border border-gray-200 rounded-lg max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-4rem)]'
      }
    >
      <div className='p-2 bg-white rounded-lg' onMouseLeave={() => setActiveMenuId('')}>
        <div className='flex flex-col lg:flex-row min-h-[300px]'>
          {/* --- Menu cha (bên trái) --- */}
          <div className='w-full lg:w-1/4 lg:pr-6 mb-4 lg:mb-0'>
            <div className='overflow-y-auto'>
              <ul className='space-y-0'>
                {/* Hiển thị loading khi đang tải dữ liệu ban đầu */}
                {isLoading && !hasData && (
                  <li className='py-4 flex justify-center'>
                    <Loader2 className='h-5 w-5 animate-spin text-gray-400' />
                  </li>
                )}

                {/* Render danh sách menu cha */}
                {hasData &&
                  menuData &&
                  menuData.map((menu) => (
                    <li key={menu.web_menu_id} className='list-none border-b border-gray-200'>
                      <div
                        onClick={() => {
                          setActiveMenuId(menu.web_menu_id)
                        }}
                        className={`block px-4 py-3 cursor-pointer text-lg font-medium border-l-4 transition-colors ${
                          activeMenuId === menu.web_menu_id
                            ? 'text-blue-600 bg-blue-50 border-blue-600'
                            : ' hover:text-gray-900 border-transparent hover:bg-gray-50'
                        }`}
                      >
                        {language === 'VN' ? menu.web_menu_name_vn : menu.web_menu_name_en}
                      </div>
                    </li>
                  ))}

                {/* Nút "Tải thêm" khi còn dữ liệu */}
                {hasMore && hasData && (
                  <li className='py-2 px-4'>
                    {isLoading ? (
                      <div className='flex justify-center py-2'>
                        <Loader2 className='h-5 w-5 animate-spin text-gray-400' />
                      </div>
                    ) : (
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={onLoadMore}
                        className='w-full text-base font-bold cursor-pointer'
                      >
                        {language === 'VN' ? 'Tải thêm' : 'Load more'}
                      </Button>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* --- Menu con (bên phải) --- */}
          <div className='flex-1 lg:pl-6 min-h-[300px]'>
            {currentChildren.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-0'>
                {currentChildren.slice(0, 10).map(renderItem)}
                {currentChildren.length > 10 && selectedMenu && (
                  <div className='col-span-1 sm:col-span-2 flex items-end justify-end py-4 text-gray-500 text-base font-medium border-gray-200 mt-2 cursor-pointer'>
                    <div
                      onClick={() => {
                        window.location.href = getUrl(selectedMenu as IWebMenu)
                      }}
                      className='flex items-end rounded-md border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer'
                    >
                      <span className='flex items-center gap-2 text-blue-600 font-semibold'>
                        {language === 'VN' ? 'Xem tất cả' : 'View all'}
                        <ChevronRight className='w-4 h-4' />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='text-gray-500 text-base py-8 text-center'>
                {language === 'VN'
                  ? 'Vui lòng chọn danh mục để xem chi tiết'
                  : 'Please select a category to view details'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
