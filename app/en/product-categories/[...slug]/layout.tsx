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
      slug_en: currentSlug,
      type: 'menu',
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
      title: 'Category Not Found | LABone',
      description: 'The product category you are looking for does not exist.',
    }
  }

  const title = (menu.web_menu_name_en || menu.web_menu_name_vn || 'Product Category') + ' | LABone'
  const descriptionText = menu.description_en || menu.description_vn || ''
  const descriptionHTML = DOMPurify.sanitize(descriptionText, {
    ALLOWED_TAGS: [],
  })
  const description =
    descriptionHTML.length > 0
      ? descriptionHTML.substring(0, 155) + '...'
      : `Explore ${title} at LABone - All For Science. Professional scientific equipment and laboratory products.`
  const imageUrl = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const canonicalUrl = `${siteUrl}/en/product-categories/${menu.slug_en}`

  // Tạo keywords từ thông tin danh mục
  const keywords = [
    menu.web_menu_name_en || '',
    menu.web_menu_name_vn || '',
    'LABone',
    'product category',
    'scientific products',
    'laboratory equipment',
    menu.parent?.web_parent_name_en || menu.parent?.web_parent_name_vn || '',
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
      locale: 'en_US',
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
        'en-US': canonicalUrl,
        'vi-VN': `${siteUrl}/vi/danh-muc-san-pham/${menu.slug_vn}`,
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

  const categoryUrl = `${siteUrl}/en/product-categories/${menu.slug_en}`
  const categoryImage = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const categoryName = menu.web_menu_name_en || menu.web_menu_name_vn || 'Product Category'
  const categoryDescription = menu.description_en || menu.description_vn || ''

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
                    name: product.product?.product_english_name || product.product?.product_name || '',
                    url: `${siteUrl}/en/product/${product.slug_en}`,
                  },
                })) || [],
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Product Categories',
                  item: `${siteUrl}/en/product-categories`,
                },
                ...(menu.parent
                  ? [
                      {
                        '@type': 'ListItem',
                        position: 3,
                        name: menu.parent.web_parent_name_en || menu.parent.web_parent_name_vn,
                        item: `${siteUrl}/en/product-categories`,
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
