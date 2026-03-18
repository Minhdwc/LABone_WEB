import type { Metadata } from 'next'
import WebMenuService from '@/services/web-menu.service'
import { IWebMenu } from '@/types'
import DOMPurify from 'isomorphic-dompurify'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    slug: string | string[]
  }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

async function getMenuBySlug(slug: string | string[]): Promise<IWebMenu | null> {
  try {
    const slugPath = Array.isArray(slug) ? slug : [slug]
    const currentSlug = slugPath[slugPath.length - 1]
    const response = await WebMenuService.getWebMenu({
      slug_vn: currentSlug,
    })
    if (!response.data || response.data.length === 0) {
      return null
    }

    // Fetch menu detail with children
    const detailResponse = await WebMenuService.getWebMenu({
      web_menu_id: response.data[0].web_menu_id,
      type: 'menu',
    })
    return detailResponse.menuSelectedData || response.data[0] || null
  } catch {
    return null
  }
}

// Hàm generate metadata động
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const menu = await getMenuBySlug(slug)

  if (!menu) {
    return {
      title: 'Danh mục không tìm thấy | LABone',
      description: 'Danh mục sản phẩm bạn đang tìm kiếm không tồn tại.',
    }
  }

  const title = menu.web_menu_name_vn || menu.web_menu_name_en || 'Danh mục sản phẩm | LABone'
  const descriptionText = menu.description_vn || menu.description_en || ''
  const descriptionHTML = DOMPurify.sanitize(descriptionText, {
    ALLOWED_TAGS: [],
  })
  const description =
    descriptionHTML.length > 0
      ? descriptionHTML.substring(0, 155) + '...'
      : `Khám phá ${title} tại LABone - All For Science. Thiết bị khoa học chuyên nghiệp, sản phẩm phòng thí nghiệm.`
  const imageUrl = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const canonicalUrl = `${siteUrl}/vi/danh-muc-san-pham/${menu.slug_vn}`

  // Tạo keywords từ thông tin danh mục
  const keywords = [
    menu.web_menu_name_vn || '',
    menu.web_menu_name_en || '',
    'LABone',
    'danh mục sản phẩm',
    'sản phẩm khoa học',
    'thiết bị phòng thí nghiệm',
    menu.parent?.web_parent_name_vn || menu.parent?.web_parent_name_en || '',
  ].filter(Boolean)

  return {
    title: `${title} | LABone`,
    description,
    keywords,
    authors: [{ name: 'LABone' }],
    creator: 'LABone',
    publisher: 'LABone',
    openGraph: {
      title: `${title} | LABone`,
      description,
      url: canonicalUrl,
      siteName: 'LABone',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | LABone`,
      description,
      images: [imageUrl],
      creator: '@labone',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi-VN': canonicalUrl,
        'en-US': `${siteUrl}/en/product-categories/${menu.slug_en}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ProductCategoryLayout({ children, params }: LayoutProps) {
  const { slug } = await params
  const menu = await getMenuBySlug(slug)

  if (!menu) {
    return <>{children}</>
  }

  const categoryUrl = `${siteUrl}/vi/danh-muc-san-pham/${menu.slug_vn}`
  const categoryImage = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const categoryName = menu.web_menu_name_vn || menu.web_menu_name_en || 'Danh mục sản phẩm'
  const categoryDescription = menu.description_vn || menu.description_en || ''

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: categoryName,
            description: categoryDescription,
            url: categoryUrl,
            image: categoryImage,
            mainEntity: {
              '@type': 'ItemList',
              name: categoryName,
              description: categoryDescription,
              numberOfItems: menu.webMenuProducts?.length || 0,
              itemListElement:
                menu.webMenuProducts?.map((product, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'Product',
                    name: product.product?.product_name || product.product?.product_english_name || '',
                    url: `${siteUrl}/vi/san-pham/${product.slug_vn}`,
                  },
                })) || [],
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Trang chủ',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Danh mục sản phẩm',
                  item: `${siteUrl}/vi/danh-muc-san-pham`,
                },
                ...(menu.parent
                  ? [
                      {
                        '@type': 'ListItem',
                        position: 3,
                        name: menu.parent.web_parent_name_vn || menu.parent.web_parent_name_en,
                        item: `${siteUrl}/vi/danh-muc-san-pham`,
                      },
                    ]
                  : []),
                {
                  '@type': 'ListItem',
                  position: menu.parent ? 4 : 3,
                  name: categoryName,
                  item: categoryUrl,
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  )
}
