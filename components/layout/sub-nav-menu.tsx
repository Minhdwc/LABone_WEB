'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguageStore } from '@/store/language'

export interface SubMenuItem {
  name_vn: string
  name_en: string
  slug_vn: string
  slug_en: string
}

// Interface cho menu item (có thể có hoặc không có sub-menu)
export interface NavMenuItem {
  name_vn: string
  name_en: string
  href: {
    vn: string
    en: string
  }
  subMenus?: SubMenuItem[]
}

// Interface cho cấu hình của một SubNavMenu (được identify bởi key)
export interface SubNavMenuConfig {
  key: string
  items: NavMenuItem[]
}

// Cấu hình tất cả sub-nav menus
export const subNavMenus: SubNavMenuConfig[] = [
  {
    key: 'lab-academy',
    items: [
      {
        name_vn: 'LAB ACADEMY',
        name_en: 'LAB ACADEMY',
        href: {
          vn: '/vi/khoa-hoc-va-dao-tao',
          en: '/en/lab-academy',
        },
      },
      {
        name_vn: 'Đào tạo và Giáo dục',
        name_en: 'Education and Training',
        href: {
          vn: '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc',
          en: '/en/lab-academy/education-and-training',
        },
        subMenus: [
          {
            name_vn: 'Đào tạo',
            name_en: 'Training',
            slug_vn: 'dao-tao',
            slug_en: 'training',
          },
          {
            name_vn: 'Thảo luận trực tuyến',
            name_en: 'Webinars',
            slug_vn: 'thao-luan-truc-tuyen',
            slug_en: 'webinars',
          },
          {
            name_vn: 'Bài viết khoa học',
            name_en: 'Scientific Articles',
            slug_vn: 'bai-viet-khoa-hoc',
            slug_en: 'post',
          },
        ],
      },
    ],
  },
]

interface SubNavMenuProps {
  isOpen: boolean
  onClose: () => void
  menuKey: string
}

const SubNavMenuComponent = ({ isOpen, onClose, menuKey }: SubNavMenuProps) => {
  const { language } = useLanguageStore()
  // State để track item nào đang mở sub-menu (dùng index)
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null)

  if (!isOpen) return null

  // Tìm menu config theo key
  const menuConfig = subNavMenus.find((menu) => menu.key === menuKey)

  if (!menuConfig) return null

  // Helper functions
  const getMenuName = (item: NavMenuItem): string => {
    return language === 'VN' ? item.name_vn : item.name_en
  }

  const getMenuHref = (item: NavMenuItem): string => {
    return language === 'VN' ? item.href.vn : item.href.en
  }

  const getSubMenuUrl = (parentItem: NavMenuItem, subMenu: SubMenuItem): string => {
    const slug = language === 'VN' ? subMenu.slug_vn : subMenu.slug_en
    // Lấy base path từ parent href
    const parentPath = language === 'VN' ? parentItem.href.vn : parentItem.href.en
    return `${parentPath}/${slug}`
  }

  const getSubMenuName = (subMenu: SubMenuItem): string => {
    return language === 'VN' ? subMenu.name_vn : subMenu.name_en
  }

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index)
  }

  return (
    <div
      className='min-w-[250px] max-w-[500px] w-auto bg-white shadow-lg border border-gray-200 rounded-lg'
      onMouseLeave={onClose}
    >
      <div>
        {menuConfig.items.map((item, index) => {
          const hasSubMenus = item.subMenus && item.subMenus.length > 0
          const isSubMenuOpen = openSubMenuIndex === index
          const href = getMenuHref(item)
          const name = getMenuName(item)

          return (
            <div key={index}>
              {/* Main menu item */}
              <div
                className={`${
                  index !== menuConfig.items.length - 1 && !isSubMenuOpen ? 'border-b border-gray-100' : ''
                }`}
              >
                {hasSubMenus ? (
                  <div className='flex items-center justify-between my-3 mx-4 text-sm text-gray-700 hover:text-blue-600 transition-colors'>
                    <Link href={href} onClick={onClose}>
                      <span className='font-medium'>{name}</span>
                    </Link>
                    {isSubMenuOpen ? (
                      <ChevronUp className='h-8 w-8 cursor-pointer' onClick={() => toggleSubMenu(index)} />
                    ) : (
                      <ChevronDown className='h-8 w-8 cursor-pointer' onClick={() => toggleSubMenu(index)} />
                    )}
                  </div>
                ) : (
                  <Link
                    href={href}
                    onClick={onClose}
                    className='block my-3 mx-4 text-sm text-gray-700 hover:text-blue-600 transition-colors'
                  >
                    <span className='font-medium'>{name}</span>
                  </Link>
                )}
              </div>

              {/* Sub menus */}
              {hasSubMenus && isSubMenuOpen && (
                <div className={`${index !== menuConfig.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <ul className='space-y-0'>
                    {item.subMenus!.map((subMenu, subIndex) => {
                      const url = getSubMenuUrl(item, subMenu)
                      const subName = getSubMenuName(subMenu)

                      return (
                        <li key={subIndex} className='list-none'>
                          <Link
                            href={url}
                            onClick={onClose}
                            className='flex items-center py-3 mx-2 text-sm text-gray-600 hover:text-blue-600 transition-colors'
                          >
                            <span>{subName}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SubNavMenuComponent
