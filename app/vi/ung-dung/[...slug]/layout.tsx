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
    const response = await WebMenuService.getDetailBySlug(currentSlug, 'vi')
    return response || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const menu = await getMenuBySlug(slug)

  if (!menu) {
    return {
      title: 'Ứng dụng không tìm thấy | LABone',
      description: 'Danh mục ứng dụng bạn đang tìm kiếm không tồn tại.',
    }
  }

  const title = menu.web_menu_name_vn || menu.web_menu_name_en || 'Ứng dụng | LABone'
  const descriptionText = menu.description_vn || menu.description_en || ''
  const descriptionHTML = DOMPurify.sanitize(descriptionText, {
    ALLOWED_TAGS: [],
  })
  const description =
    descriptionHTML.length > 0
      ? descriptionHTML.substring(0, 155) + '...'
      : `Khám phá ${title} tại LABone - All For Science. Giải pháp ứng dụng chuyên sâu cho phòng thí nghiệm.`
  const imageUrl = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const canonicalUrl = `${siteUrl}/vi/ung-dung/${menu.slug_vn}`

  return {
    title: `${title} | LABone`,
    description,
    keywords: [
      menu.web_menu_name_vn || '',
      menu.web_menu_name_en || '',
      'LABone',
      'ứng dụng',
      'giải pháp ứng dụng',
      'phòng thí nghiệm',
    ].filter(Boolean),
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi-VN': canonicalUrl,
        'en-US': `${siteUrl}/en/application/${menu.slug_en}`,
      },
    },
  }
}

export default async function ApplicationLayout({ children, params }: LayoutProps) {
  const { slug } = await params
  const menu = await getMenuBySlug(slug)

  if (!menu) {
    return <>{children}</>
  }

  const applicationUrl = `${siteUrl}/vi/ung-dung/${menu.slug_vn}`
  const applicationImage = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const applicationName = menu.web_menu_name_vn || 'Ứng dụng | LABone'
  const applicationDescription = menu.description_vn || 'Danh mục ứng dụng bạn đang tìm kiếm không tồn tại.'

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: applicationName,
            description: applicationDescription,
            url: applicationUrl,
            image: applicationImage,
          }),
        }}
      />
      {children}
    </>
  )
}
