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
      slug_en: currentSlug,
      locale: 'en',
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
      title: 'Product Not Found | LABone',
      description: 'The product you are looking for does not exist.',
    }
  }

  const productData = product.product
  const title = productData.product_english_name || productData.product_name || 'Product | LABone'
  const descriptionText = productData.english_description || productData.description || ''
  const descriptionHTML = DOMPurify.sanitize(descriptionText, {
    ALLOWED_TAGS: [],
  })
  const description =
    descriptionHTML.length > 0
      ? descriptionHTML.substring(0, 155) + '...'
      : `Discover ${title} at LABone - All For Science. Professional scientific equipment, high quality.`
  const imageUrl = productData.image_url || `${siteUrl}/Logo-LABone-png.png`
  const canonicalUrl = `${siteUrl}/en/product/${product.slug_en}`
  const packagingSpecificationHTML = DOMPurify.sanitize(
    productData.packaging_specification_english || productData.packaging_specification || '',
    {
      ALLOWED_TAGS: [],
    },
  )
  const packagingSpecification =
    packagingSpecificationHTML.length > 0 ? packagingSpecificationHTML.substring(0, 155) + '...' : ''
  const supplyStandardHTML = DOMPurify.sanitize(
    productData.supply_standard_english || productData.supply_standard || '',
    {
      ALLOWED_TAGS: [],
    },
  )
  const supplyStandard = supplyStandardHTML.length > 0 ? supplyStandardHTML.substring(0, 155) + '...' : ''
  // Tạo keywords từ thông tin sản phẩm
  const keywords = [
    productData.product_english_name || productData.product_name,
    productData.code,
    'LABone',
    'scientific products',
    'laboratory equipment',
    productData.productGroup?.product_group_name || '',
    productData.unit_english || productData.unit || '',
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
        'vi-VN': `${siteUrl}/vi/san-pham/${product.slug_vn || product.slug_en}`,
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
  const productUrl = `${siteUrl}/en/product/${product.slug_en}`
  const productImage = productData?.image_url || `${siteUrl}/Logo-LABone-png.png`
  const productName = productData.product_english_name || productData.product_name
  const productDescription = productData.english_description || productData.description || ''

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: productName,
            description: productDescription,
            image: productImage,
            url: productUrl,
            sku: productData.code || productData.product_id,
            brand: {
              '@type': 'Brand',
              name: 'LABone',
            },
            manufacturer: {
              '@type': 'Organization',
              name: companyInfo.name.en,
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
