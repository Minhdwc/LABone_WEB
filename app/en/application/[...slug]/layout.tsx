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
    const response = await WebMenuService.getDetailBySlug(currentSlug, 'en')
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
      title: 'Application page not found | LABone',
      description: 'The application category you are looking for does not exist.',
    }
  }

  const title = menu.web_menu_name_en || 'Application | LABone'
  const descriptionText = menu.description_en || ''
  const descriptionHTML = DOMPurify.sanitize(descriptionText, {
    ALLOWED_TAGS: [],
  })
  const description =
    descriptionHTML.length > 0
      ? descriptionHTML.substring(0, 155) + '...'
      : `Discover ${title} at LABone - All For Science. Specialized usage solutions for laboratories.`
  const imageUrl = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const canonicalUrl = `${siteUrl}/en/application/${menu.slug_en}`

  return {
    title: `${title} | LABone`,
    description,
    keywords: [menu.web_menu_name_en || '', 'LABone', 'application', 'laboratory application'].filter(Boolean),
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'vi-VN': `${siteUrl}/vi/ung-dung/${menu.slug_vn}`,
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

  const applicationUrl = `${siteUrl}/en/application/${menu.slug_en}`
  const applicationImage = menu.image_url || `${siteUrl}/Logo-LABone-png.png`
  const applicationName = menu.web_menu_name_en || 'Application'
  const applicationDescription = menu.description_en || ''

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
