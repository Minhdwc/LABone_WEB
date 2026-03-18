import type { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify'

import WebNewService from '@/services/web-new.service'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string[] }>
}

async function getNewBySlug(slug: string) {
  try {
    const article = await WebNewService.getWebNewBySlug(slug, 'en')
    return article
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')

  const article = await getNewBySlug(slug)

  if (!article) {
    return {
      title: 'News | LABone',
      description: 'News details from LABone - Get the latest information about company activities.',
      robots: {
        index: false,
        follow: true,
      },
    }
  }

  const title = article.title_en || article.title_vn || 'News | LABone'
  const descriptionHTML = DOMPurify.sanitize(article.short_content_en || article.content_en || '', {
    ALLOWED_TAGS: [],
  })
  const description = descriptionHTML.substring(0, 155) + (descriptionHTML.length > 155 ? '...' : '')

  const canonicalUrl = `${siteUrl}/en/new/${article.slug_en || slug}`
  const imageUrl = article.main_image_url || `${siteUrl}/assets/company/companyLabone.jpg`

  const keywords = [title, 'LABone', 'LABone news', 'company news', 'lab equipment news'].filter(Boolean)

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
      type: 'article',
      publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : undefined,
      modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
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
        'vi-VN': `${siteUrl}/vi/tin-tuc/${article.slug_vn}`,
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

export default function NewsDetailLayout({ children }: LayoutProps) {
  return <>{children}</>
}
