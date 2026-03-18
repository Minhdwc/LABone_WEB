import { IWebMenu } from '@/types'
import NotFound from '@/app/[...notFound]/page'
import ProductMenuDetailClient from '@/components/features/product-categories/product-menu-detail-client'
import WebMenuService from '@/services/web-menu.service'

interface PageProps {
  params: Promise<{ slug: string | string[] }>
}

async function getMenuBySlug(slug: string | string[]): Promise<IWebMenu | null> {
  try {
    const slugPath = Array.isArray(slug) ? slug : [slug]
    const currentSlug = slugPath[slugPath.length - 1]
    const response = await WebMenuService.getDetailBySlug(currentSlug, 'vi')
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

  const menuData = await getMenuBySlug(slug)

  if (!menuData) {
    return <NotFound />
  }

  return <ProductMenuDetailClient menu={menuData} menuType='usage' />
}
