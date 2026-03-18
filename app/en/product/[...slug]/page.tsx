import ProductDetail from '@/components/features/product/product-detail'
import WebMenuProductService from '@/services/web-menu-product.service'
import { IWebMenuProduct } from '@/types'
import NotFound from '@/app/[...notFound]/page'

interface PageProps {
  params: Promise<{ slug: string | string[] }>
}

async function getProductBySlug(slug: string | string[], locale: 'vi' | 'en'): Promise<IWebMenuProduct | null> {
  try {
    const slugPath = Array.isArray(slug) ? slug : [slug]
    const currentSlug = slugPath[slugPath.length - 1]
    const response = await WebMenuProductService.getWebDetailWebMenuProductWeb(currentSlug, locale)
    return response ?? null
  } catch {
    return null
  }
}

// Build breadcrumb paths from web_menu array (one path per menu item)
function buildBreadcrumbPathsFromProduct(product: IWebMenuProduct): Array<
  Array<{
    web_menu_name_vn: string
    web_menu_name_en: string
    slug_vn: string
    slug_en: string
    type?: string
    level?: number
  }>
> {
  const webMenus = product.web_menu
  if (!Array.isArray(webMenus)) return []

  return webMenus
    .map((item) => item?.web_menu)
    .filter(Boolean)
    .map((menu) => [menu])
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug, 'en')

  if (!product) return <NotFound />

  const breadcrumbPaths = buildBreadcrumbPathsFromProduct(product)

  return <ProductDetail product={product} webMenuProduct={product} breadcrumbPaths={breadcrumbPaths} />
}
