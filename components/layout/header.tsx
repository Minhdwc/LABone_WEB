'use client'
import { navAboveHeaderEN, navAboveHeaderVN, navHeaderEN, navHeaderVN } from '../../lib/containts'
import Link from 'next/link'
import Image from 'next/image'
import SwitchLanguage from '../elements/switch-language'
import LogoWEBP from '@/public/Logo-LABone-png.webp'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { FaSearch, FaChevronDown, FaChevronUp, FaShoppingCart } from 'react-icons/fa'
import { Menu, ChevronDown, ChevronUp } from 'lucide-react'
import SearchSheet from '@/components/custom/search/search-sheet'
import CartSheet from '@/components/custom/cart/cart-sheet'
import Submenu from './submenu'
import SubNavMenu from './sub-nav-menu'
import { subNavMenus } from './sub-nav-menu'
import WebMenuService from '@/services/web-menu.service'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/cart-provider'
import { Badge } from '@/components/ui/badge'
import { IWebMenu } from '@/types'
import { useLanguageStore } from '@/store/language'
import { usePathname, useRouter } from 'next/navigation'
import { translateUrl } from '@/lib/utils/mapping-routes'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default function Header() {
  const { language, setLanguage } = useLanguageStore()
  const pathname = usePathname()
  const router = useRouter()
  // Tách state riêng cho từng menuType để tránh data bị ghi đè
  const [page, setPage] = useState<{ menu?: number; usage?: number }>({})
  const [menuData, setMenuData] = useState<{
    menu?: IWebMenu[]
    usage?: IWebMenu[]
  }>({})
  const [hasMore, setHasMore] = useState<{
    menu?: boolean
    usage?: boolean
  }>({})
  const [isLoading, setIsLoading] = useState<{
    menu?: boolean
    usage?: boolean
  }>({})
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredAboveNavItem, setHoveredAboveNavItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductCategoriesOpen, setMobileProductCategoriesOpen] = useState(false)
  const [mobileUsageOpen, setMobileUsageOpen] = useState(false)
  const [mobileLabAcademyOpen, setMobileLabAcademyOpen] = useState(false)
  const [mobileLabAcademySubMenuIndex, setMobileLabAcademySubMenuIndex] = useState<number | null>(null)
  const { cart } = useCart()
  const countItems = cart.reduce((total, cartItem) => {
    const productCount = 1
    const accessoriesCount = cartItem.items?.length || 0
    return total + productCount + accessoriesCount
  }, 0)
  const aboveNav = language === 'VN' ? navAboveHeaderVN : navAboveHeaderEN
  const mainNav = language === 'VN' ? navHeaderVN : navHeaderEN

  // Helper function để xác định menuType dựa trên item title
  const getMenuType = (itemTitle: string): 'menu' | 'usage' | null => {
    if (itemTitle === 'PRODUCT CATEGORIES' || itemTitle === 'DANH MỤC SẢN PHẨM') {
      return 'menu'
    }
    if (itemTitle === 'APPLICATION' || itemTitle === 'ỨNG DỤNG') {
      return 'usage'
    }
    return null
  }

  // Helper function để check nếu là lab academy menu
  const isLabAcademyMenu = (itemTitle: string): boolean => {
    return itemTitle === 'LAB ACADEMY'
  }

  // Helper function để lấy base path dựa trên menuType
  const getBasePath = (menuType: 'menu' | 'usage') => {
    if (menuType === 'usage') {
      return language === 'VN' ? 'ung-dung' : 'application'
    }
    return language === 'VN' ? 'danh-muc-san-pham' : 'product-categories'
  }

  // Helper function chung để fetch menu data
  const fetchMenuData = async (menuType: 'menu' | 'usage', pageNum: number = 0, append: boolean = false) => {
    setIsLoading((prev) => ({ ...prev, [menuType]: true }))
    try {
      const response = await WebMenuService.getWebMenu({
        level: 0,
        limit: 10,
        page: pageNum,
        type: menuType,
      })
      const menuItems = response?.data && response.data.length > 0 ? response.data : []
      const pageCurrent = response?.pageCurrent || 0
      const totalPage = response?.totalPage || 0

      if (menuItems.length > 0) {
        setMenuData((prev) => ({
          ...prev,
          [menuType]: append ? [...(prev[menuType] || []), ...menuItems] : menuItems,
        }))
        setHasMore((prev) => ({
          ...prev,
          [menuType]: pageCurrent < totalPage,
        }))
        setPage((prev) => ({ ...prev, [menuType]: pageNum }))
      } else {
        if (!append) {
          setMenuData((prev) => ({ ...prev, [menuType]: [] }))
        }
        setHasMore((prev) => ({ ...prev, [menuType]: false }))
      }
    } catch {
      if (!append) {
        setMenuData((prev) => ({ ...prev, [menuType]: [] }))
      }
      setHasMore((prev) => ({ ...prev, [menuType]: false }))
    } finally {
      setIsLoading((prev) => ({ ...prev, [menuType]: false }))
    }
  }

  useEffect(() => {
    if (hoveredItem) {
      const currentItem = mainNav.find((item) => item.id === hoveredItem)
      if (currentItem) {
        const menuType = getMenuType(currentItem.title)
        if (menuType) {
          // Fetch data nếu chưa có
          const currentData = menuData[menuType]
          if (!currentData || currentData.length === 0) {
            fetchMenuData(menuType, 0, false)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredItem, mainNav, language])

  // Reset hoveredItem khi route thay đổi
  useEffect(() => {
    setHoveredItem(null)
  }, [pathname])

  // Function để load more menu data (cho desktop)
  const loadMoreMenuData = async () => {
    if (hoveredItem) {
      const currentItem = mainNav.find((item) => item.id === hoveredItem)
      if (currentItem) {
        const menuType = getMenuType(currentItem.title)
        if (menuType && !isLoading[menuType] && hasMore[menuType]) {
          const nextPage = (page[menuType] || 0) + 1
          await fetchMenuData(menuType, nextPage, true)
        }
      }
    }
  }

  // Function để load more menu data (cho mobile)
  const loadMoreMenuDataMobile = async (menuType: 'menu' | 'usage') => {
    if (!isLoading[menuType] && hasMore[menuType]) {
      const nextPage = (page[menuType] || 0) + 1
      await fetchMenuData(menuType, nextPage, true)
    }
  }

  const handleSwitchLanguage = async () => {
    const targetLanguage = language === 'VN' ? 'EN' : 'VN'

    // Prevent multiple clicks
    if (!isSwitchingLanguage) {
      setIsSwitchingLanguage(true)

      try {
        // Translate current URL to target language
        const targetUrl = await translateUrl(pathname, targetLanguage)

        // Update language store
        setLanguage(targetLanguage)

        // Redirect to translated URL
        router.push(targetUrl)

        // Show success toast
        if (targetLanguage === 'EN') {
          toast.success('Switch to English')
        } else {
          toast.success('Đã chuyển sang Tiếng Việt')
        }
      } catch {
        setLanguage(targetLanguage)
        const fallbackUrl = targetLanguage === 'VN' ? '/' : '/en/home'
        router.push(fallbackUrl)
        toast.error('Có lỗi xảy ra khi chuyển ngôn ngữ')
      } finally {
        setIsSwitchingLanguage(false)
      }
    }
  }

  // Tính toán submenu content trước khi render
  const currentItem = mainNav.find((item) => item.id === hoveredItem)
  const menuTypeForSubmenu = currentItem ? getMenuType(currentItem.title) : null
  const hasSubmenuForCurrent = menuTypeForSubmenu !== null
  const shouldRenderSubmenu = currentItem && hasSubmenuForCurrent && menuTypeForSubmenu
  const currentMenuData = shouldRenderSubmenu ? menuData[menuTypeForSubmenu] || [] : []
  const currentHasMore = shouldRenderSubmenu ? hasMore[menuTypeForSubmenu] || false : false
  const currentIsLoading = shouldRenderSubmenu ? isLoading[menuTypeForSubmenu] || false : false

  return (
    <header className='w-full' suppressHydrationWarning>
      {/* Top Navigation Bar */}
      <div className='w-full bg-sky-500 text-white'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm font-medium'>
          <nav className='hidden md:flex flex-wrap items-center gap-1 relative' suppressHydrationWarning>
            {aboveNav.map((item, index) => {
              const hasLabAcademySubmenu = isLabAcademyMenu(item.title)
              const isOpen = hoveredAboveNavItem === item.id

              return (
                <div
                  key={index}
                  data-lab-academy-menu={hasLabAcademySubmenu ? 'true' : undefined}
                  className={`flex items-center relative ${index !== aboveNav.length - 1 ? 'border-r border-white/30 pr-3 mr-3' : ''
                    }`}
                >
                  <Link
                    prefetch={false}
                    key={item.id}
                    href={item.href}
                    className='hover:text-sky-200 transition-colors duration-200'
                    suppressHydrationWarning
                    onClick={(e) => {
                      if (hasLabAcademySubmenu) {
                        e.preventDefault()
                        setHoveredAboveNavItem(isOpen ? null : item.id)
                      }
                    }}
                  >
                    {item.title}
                  </Link>

                  {/* SubNavMenu cho Lab Academy trong top nav */}
                  {hasLabAcademySubmenu && isOpen && (
                    <div className='absolute top-full left-0 mt-1 z-50' data-lab-academy-menu='true'>
                      <SubNavMenu isOpen={true} onClose={() => setHoveredAboveNavItem(null)} menuKey='lab-academy' />
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <div className='flex items-center gap-4'>
            <SwitchLanguage language={language} onClickAction={handleSwitchLanguage} />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className='w-full bg-white shadow-sm relative'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 relative'>
          <div className='flex items-center gap-3'>
            {/* Mobile Menu Button */}
            <Sheet
              open={mobileMenuOpen}
              onOpenChange={(open) => {
                setMobileMenuOpen(open)
                if (!open) {
                  // Reset all mobile submenu states when closing main menu
                  setMobileProductCategoriesOpen(false)
                  setMobileUsageOpen(false)
                  setMobileLabAcademyOpen(false)
                  setMobileLabAcademySubMenuIndex(null)
                }
              }}
            >
              <SheetTrigger asChild className='lg:hidden'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='lg:hidden'
                  aria-label={language === 'VN' ? 'Mở menu' : 'Open menu'}
                >
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] sm:w-[400px] p-0 flex flex-col'>
                <SheetHeader className='p-4 border-b shrink-0'>
                  <SheetTitle className='text-left'>{language === 'VN' ? 'Menu' : 'Menu'}</SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col p-4 space-y-2 overflow-y-auto flex-1'>
                  {mainNav.map((item) => {
                    const menuType = getMenuType(item.title)
                    const hasSubmenu = menuType !== null
                    const isProductCategories = menuType === 'menu'
                    const isUsage = menuType === 'usage'
                    const isMobileOpen = isProductCategories
                      ? mobileProductCategoriesOpen
                      : isUsage
                        ? mobileUsageOpen
                        : false

                    // Lấy data riêng cho từng menuType
                    const currentMenuData = menuType ? menuData[menuType] || [] : []
                    const currentIsLoading = menuType ? isLoading[menuType] || false : false
                    const currentHasMore = menuType ? hasMore[menuType] || false : false

                    return (
                      <div key={item.id} className='space-y-2'>
                        {hasSubmenu ? (
                          <div className='space-y-1'>
                            <button
                              onClick={() => {
                                if (isProductCategories) {
                                  setMobileProductCategoriesOpen(!mobileProductCategoriesOpen)
                                } else if (isUsage) {
                                  setMobileUsageOpen(!mobileUsageOpen)
                                }

                                // Fetch menu data khi mở lần đầu và chưa có data
                                const isOpening =
                                  (isProductCategories && !mobileProductCategoriesOpen) || (isUsage && !mobileUsageOpen)

                                if (
                                  isOpening &&
                                  menuType &&
                                  (!menuData[menuType] || menuData[menuType]!.length === 0)
                                ) {
                                  fetchMenuData(menuType, 0, false)
                                }
                              }}
                              className='w-full flex items-center justify-between py-2 text-lg font-medium text-gray-900 hover:text-blue-600'
                            >
                              <span>{item.title}</span>
                              {isMobileOpen ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
                            </button>
                            {isMobileOpen && menuType && (
                              <div className='pl-4 space-y-1'>
                                {currentIsLoading && currentMenuData.length === 0 ? (
                                  <div className='py-4 flex justify-center'>
                                    <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600' />
                                  </div>
                                ) : (
                                  <>
                                    {currentMenuData.length > 0 ? (
                                      <>
                                        {currentMenuData.map((menu) => {
                                          const href = `/${language === 'VN' ? 'vi' : 'en'}/${getBasePath(menuType)}/${language === 'VN' ? menu.slug_vn : menu.slug_en
                                            }`
                                          return (
                                            <Link
                                              href={href}
                                              prefetch={false}
                                              onClick={() => {
                                                setMobileMenuOpen(false)
                                              }}
                                              key={menu.web_menu_id}
                                              className='block py-2 text-base text-gray-600 hover:text-blue-600 cursor-pointer'
                                            >
                                              {language === 'VN' ? menu.web_menu_name_vn : menu.web_menu_name_en}
                                            </Link>
                                          )
                                        })}
                                        {currentHasMore && (
                                          <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => loadMoreMenuDataMobile(menuType)}
                                            disabled={currentIsLoading}
                                            className='w-full justify-start text-sm'
                                          >
                                            {currentIsLoading
                                              ? language === 'VN'
                                                ? 'Đang tải...'
                                                : 'Loading...'
                                              : language === 'VN'
                                                ? 'Tải thêm danh mục'
                                                : 'Load more categories'}
                                          </Button>
                                        )}
                                      </>
                                    ) : (
                                      <div className='py-2 text-sm text-gray-500'>
                                        {language === 'VN' ? 'Không có dữ liệu' : 'No data available'}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className='block py-2 text-lg font-medium text-gray-700 hover:text-blue-600'
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        )}
                      </div>
                    )
                  })}

                  {/* Divider before aboveNav items */}
                  {aboveNav.length > 0 && (
                    <div className='border-t border-gray-200 my-2 pt-2'>
                      {aboveNav.map((item, index) => {
                        const isLabAcademy = isLabAcademyMenu(item.title)
                        const isLabAcademyOpen = mobileLabAcademyOpen

                        return (
                          <div key={item.id || index} className='space-y-1'>
                            {isLabAcademy ? (
                              <>
                                <button
                                  onClick={() => {
                                    const newState = !mobileLabAcademyOpen
                                    setMobileLabAcademyOpen(newState)
                                    if (!newState) {
                                      setMobileLabAcademySubMenuIndex(null)
                                    }
                                  }}
                                  className='w-full flex items-center justify-between py-2 text-base font-medium text-gray-700 hover:text-blue-600'
                                >
                                  <span>{item.title}</span>
                                  {isLabAcademyOpen ? (
                                    <ChevronUp className='h-4 w-4' />
                                  ) : (
                                    <ChevronDown className='h-4 w-4' />
                                  )}
                                </button>
                                {isLabAcademyOpen && (
                                  <div className='pl-4 space-y-1'>
                                    {(() => {
                                      const menuConfig = subNavMenus.find((menu) => menu.key === 'lab-academy')
                                      if (!menuConfig) return null

                                      return menuConfig.items.map((menuItem, menuIndex) => {
                                        const hasSubMenus = menuItem.subMenus && menuItem.subMenus.length > 0
                                        const isSubMenuOpen = mobileLabAcademySubMenuIndex === menuIndex
                                        const menuName = language === 'VN' ? menuItem.name_vn : menuItem.name_en
                                        const menuHref = language === 'VN' ? menuItem.href.vn : menuItem.href.en

                                        return (
                                          <div key={menuIndex}>
                                            {hasSubMenus ? (
                                              <>
                                                <div className='w-full flex items-center justify-between py-2'>
                                                  <Link
                                                    href={menuHref}
                                                    prefetch={false}
                                                    onClick={() => {
                                                      setMobileLabAcademyOpen(false)
                                                      setMobileMenuOpen(false)
                                                    }}
                                                    className='text-base text-gray-600 hover:text-blue-600'
                                                  >
                                                    <span>{menuName}</span>
                                                  </Link>
                                                  <button
                                                    onClick={() => {
                                                      setMobileLabAcademySubMenuIndex(isSubMenuOpen ? null : menuIndex)
                                                    }}
                                                    className='ml-2 text-gray-600 hover:text-blue-600'
                                                  >
                                                    {isSubMenuOpen ? (
                                                      <ChevronUp className='h-4 w-4' />
                                                    ) : (
                                                      <ChevronDown className='h-4 w-4' />
                                                    )}
                                                  </button>
                                                </div>
                                                {isSubMenuOpen && menuItem.subMenus && (
                                                  <div className='pl-4 space-y-1'>
                                                    {menuItem.subMenus.map((subMenu, subIndex) => {
                                                      const subSlug =
                                                        language === 'VN' ? subMenu.slug_vn : subMenu.slug_en
                                                      const subName =
                                                        language === 'VN' ? subMenu.name_vn : subMenu.name_en
                                                      const subHref = `${menuHref}/${subSlug}`

                                                      return (
                                                        <Link
                                                          key={subIndex}
                                                          href={subHref}
                                                          prefetch={false}
                                                          onClick={() => {
                                                            setMobileLabAcademyOpen(false)
                                                            setMobileMenuOpen(false)
                                                          }}
                                                          className='block py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer'
                                                        >
                                                          {subName}
                                                        </Link>
                                                      )
                                                    })}
                                                  </div>
                                                )}
                                              </>
                                            ) : (
                                              <Link
                                                href={menuHref}
                                                prefetch={false}
                                                onClick={() => {
                                                  setMobileLabAcademyOpen(false)
                                                  setMobileMenuOpen(false)
                                                }}
                                                className='block py-2 text-base text-gray-600 hover:text-blue-600 cursor-pointer'
                                              >
                                                {menuName}
                                              </Link>
                                            )}
                                          </div>
                                        )
                                      })
                                    })()}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={item.href}
                                prefetch={false}
                                className='block py-2 text-base font-medium text-gray-700 hover:text-blue-600'
                                onClick={() => setMobileMenuOpen(false)}
                                suppressHydrationWarning
                              >
                                {item.title}
                              </Link>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={`/${language === 'VN' ? '/' : 'en/home'}`} className='flex items-center gap-2'>
              <Image src={LogoWEBP} alt='Logo' className='h-16 w-auto' />
            </Link>
          </div>

          <nav className='hidden items-center gap-8 lg:flex'>
            {mainNav.map((item) => {
              const menuType = getMenuType(item.title)
              const hasSubmenu = menuType !== null
              const isHovered = hoveredItem === item.id
              return (
                <div
                  key={item.id}
                  className='relative overflow-visible'
                  onMouseEnter={() => {
                    if (hasSubmenu) {
                      setHoveredItem(item.id)
                    } else {
                      setHoveredItem(null)
                    }
                  }}
                >
                  <Link
                    prefetch={false}
                    href={item.href}
                    onClick={() => setHoveredItem(null)}
                    className={`font-medium transition-colors duration-300 flex items-center ${isHovered ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                  >
                    {item.title}
                    {hasSubmenu &&
                      (isHovered ? (
                        <FaChevronUp className='inline-block ml-1 text-xs' />
                      ) : (
                        <FaChevronDown className='inline-block ml-1 text-xs' />
                      ))}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Submenu - Render ở level container chính để luôn căn chỉnh đúng */}
          {shouldRenderSubmenu && currentItem && (
            <div
              className='absolute left-4 right-4 top-full z-50 pt-1'
              onMouseEnter={() => setHoveredItem(currentItem.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Submenu
                isOpen={true}
                language={language}
                menuData={currentMenuData}
                hasMore={currentHasMore}
                isLoading={currentIsLoading}
                onLoadMore={loadMoreMenuData}
              />
            </div>
          )}

          <div className='flex items-center gap-2 sm:gap-3'>
            <SearchSheet>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-sky-600 border-gray-300 hover:border-sky-500 cursor-pointer'
                aria-label={language === 'VN' ? 'Tìm kiếm' : 'Search'}
              >
                <FaSearch className='text-xs sm:text-sm' />
                <span className='hidden sm:inline'>{language === 'VN' ? 'Tìm kiếm' : 'Search'}</span>
              </Button>
            </SearchSheet>
            <CartSheet>
              <Button
                variant='outline'
                size='sm'
                className='relative flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-sky-600 border-gray-300 hover:border-sky-500 cursor-pointer'
                aria-label={
                  language === 'VN' ? `Giỏ hàng, ${countItems} sản phẩm` : `Shopping cart, ${countItems} items`
                }
              >
                <FaShoppingCart className='text-xs sm:text-sm' />
                {countItems > 0 && (
                  <Badge
                    variant='destructive'
                    className='absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs font-bold rounded-full'
                  >
                    {countItems > 99 ? '99+' : countItems}
                  </Badge>
                )}
              </Button>
            </CartSheet>
          </div>
        </div>
      </div>
    </header>
  )
}
