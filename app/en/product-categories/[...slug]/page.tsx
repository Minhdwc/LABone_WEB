import { IWebMenu } from '@/types'
import NotFound from '@/app/[...notFound]/page'
import ProductMenuDetailClient from '@/components/features/product-categories/product-menu-detail-client'
import WebMenuService from '@/services/web-menu.service'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

async function getMenuBySlug(slug: string | string[], locale: string): Promise<IWebMenu | null> {
  try {
    // Tách url để lấy slug cuối cùng
    const slugPath = Array.isArray(slug) ? slug : [slug]
    const currentSlug = slugPath[slugPath.length - 1]
    //Get data theo slug tương ứng
    // Không truyền pagination params vì children sẽ được fetch riêng trong component
    const response = await WebMenuService.getDetailBySlug(currentSlug, locale)
    if (!response) {
      return null
    }
    return response
  } catch {
    return null
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const menuData = await getMenuBySlug(slug, 'en')

  if (!menuData) {
    return <NotFound />
  }

  return <ProductMenuDetailClient menu={menuData} menuType='menu' />
}
