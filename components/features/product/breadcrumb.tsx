'use client'

import Link from 'next/link'
import { useLanguageStore } from '@/store/language'
import { ChevronRight, Home } from 'lucide-react'
import { useMemo } from 'react'

interface BreadcrumbItem {
  web_menu_name_vn: string
  web_menu_name_en: string
  slug_vn: string
  slug_en: string
  type?: string
  level?: number
}

interface BreadcrumbProps {
  breadcrumbPaths: Array<Array<BreadcrumbItem>>
  productName: string
}

export default function Breadcrumb({ breadcrumbPaths, productName }: BreadcrumbProps) {
  const { language } = useLanguageStore()
  const isVN = language === 'VN'
  const basePath = isVN ? '/vi' : '/en'

  const categoryPath = isVN ? '/danh-muc-san-pham' : '/product-categories'
  const categoryLabel = isVN ? 'Danh mục sản phẩm' : 'Product Categories'

  if (breadcrumbPaths.length === 0) return null

  return (
    <div className='mb-6 space-y-3'>
      {breadcrumbPaths.map((items, pathIndex) => {
        // items là mảng 1 phần tử (theo cách build hiện tại)
        const lastItem = items[items.length - 1]
        const name = isVN ? lastItem.web_menu_name_vn : lastItem.web_menu_name_en
        const slug = isVN ? lastItem.slug_vn : lastItem.slug_en
        const showEllipsis = (lastItem.level ?? 0) > 1

        return (
          <nav
            key={pathIndex}
            className='flex flex-wrap items-center gap-1.5 text-sm bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200'
            aria-label='Breadcrumb'
          >
            <Link
              href={isVN ? '/vi' : '/en/home'}
              className='flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium'
            >
              <Home className='w-3.5 h-3.5' />
              <span>{isVN ? 'Trang chủ' : 'Home'}</span>
            </Link>

            <ChevronRight className='w-3.5 h-3.5 text-gray-400 shrink-0' />
            <Link
              href={`${basePath}${categoryPath}`}
              className='text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium'
            >
              {categoryLabel}
            </Link>

            {showEllipsis && (
              <>
                <ChevronRight className='w-3.5 h-3.5 text-gray-400 shrink-0' />
                <span className='text-gray-500'>...</span>
              </>
            )}

            <ChevronRight className='w-3.5 h-3.5 text-gray-400 shrink-0' />
            <Link
              href={`${basePath}${categoryPath}/${slug}`}
              className='text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium'
            >
              {name}
            </Link>

            <ChevronRight className='w-3.5 h-3.5 text-gray-400 shrink-0' />
            <span className='text-gray-900 font-semibold truncate max-w-[200px] md:max-w-none'>{productName}</span>
          </nav>
        )
      })}
    </div>
  )
}
