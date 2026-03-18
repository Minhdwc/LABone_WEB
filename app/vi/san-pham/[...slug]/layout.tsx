import type { Metadata } from 'next'
import WebMenuProductService from '@/services/web-menu-product.service'
import { IWebMenuProduct } from '@/types'
import DOMPurify from 'isomorphic-dompurify'
import { companyInfo } from '@/lib/company-contants'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    slug: string | string[]
  }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

async function getProductBySlug(slug: string | string[]): Promise<IWebMenuProduct | null> {
  try {
    const slugPath = Array.isArray(slug) ? slug : [slug]
    const currentSlug = slugPath[slugPath.length - 1]
    const response = await WebMenuProductService.getWebMenuProducts({
      slug_vn: currentSlug,
    })
    return response?.data?.[0] || null
  } catch {
    return null
  }
}

// Hàm generate metadata động
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product || !product.product) {
    return {
      title: 'Sản phẩm không tìm thấy | LABone',
      description: 'Sản phẩm bạn đang tìm kiếm không tồn tại.',
    }
  }

  const productData = product.product
  const title = productData.product_name || 'Sản phẩm | LABone'
  const descriptionHTML = DOMPurify.sanitize(productData.description, {
    ALLOWED_TAGS: [],
  })
  const description = descriptionHTML.substring(0, 155) + '...'
  const imageUrl = productData.image_url || `${siteUrl}/Logo-LABone-png.png`
  const canonicalUrl = `${siteUrl}/vi/san-pham/${product.slug_vn}`
  const packagingSpecificationHTML = DOMPurify.sanitize(productData.packaging_specification || '', {
    ALLOWED_TAGS: [],
  })
  const packagingSpecification = packagingSpecificationHTML.substring(0, 155) + '...'
  const supplyStandardHTML = DOMPurify.sanitize(productData.supply_standard || '', {
    ALLOWED_TAGS: [],
  })
  const supplyStandard = supplyStandardHTML.substring(0, 155) + '...'
  // Tạo keywords từ thông tin sản phẩm
  const keywords = [
    productData.product_name,
    productData.code,
    'LABone',
    'sản phẩm khoa học',
    'thiết bị phòng thí nghiệm',
    productData.productGroup?.product_group_name || '',
    productData.unit || '',
    packagingSpecification || '',
    supplyStandard || '',
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
          alt: productData.product_name,
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
        'en-US': `${siteUrl}/en/product/${product.slug_en || product.slug_vn}`,
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

export default async function ProductLayout({ children, params }: LayoutProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product || !product.product) {
    return <>{children}</>
  }

  const productData = product.product
  const productUrl = `${siteUrl}/vi/san-pham/${product.slug_vn}`
  const productImage = productData?.image_url || `${siteUrl}/Logo-LABone-png.png`

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: productData.product_name,
            description: productData.description || '',
            image: productImage,
            url: productUrl,
            sku: productData.code || productData.product_id,
            brand: {
              '@type': 'Brand',
              name: 'LABone',
            },
            manufacturer: {
              '@type': 'Organization',
              name: companyInfo.name.vi,
              url: siteUrl,
            },
            offers: {
              '@type': 'Offer',
              url: productUrl,
              availability: productData.is_active ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              itemCondition: 'https://schema.org/NewCondition',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '1',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
