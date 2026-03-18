import type { Metadata } from 'next'
import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'
import DOMPurify from 'isomorphic-dompurify'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ type: string; slug: string | string[] }>
}

// Extract slug from URL path array (get last element)
function getSlug(slugArray: string | string[]): string {
  if (Array.isArray(slugArray)) {
    return slugArray[slugArray.length - 1] || ''
  }
  return slugArray || ''
}

async function getLabAcademyPostBySlug(slug: string) {
  try {
    const result = await WebLabAcademyPostService.getWebLabAcademyPostBySlug(slug, 'en')
    return result || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const extractedSlug = getSlug(slug)
  const post = await getLabAcademyPostBySlug(extractedSlug)

  if (!post) {
    return {
      title: 'Post Not Found | LABone',
      description: 'The post you are looking for does not exist.',
    }
  }

  const title = post.title_en || 'Education and Training | LABone'
  const descriptionHTML = DOMPurify.sanitize(post.content_en || post.short_title || '', {
    ALLOWED_TAGS: [],
  })
  const description = descriptionHTML.substring(0, 155) + (descriptionHTML.length > 155 ? '...' : '')
  const imageUrl = post.image_url || `${siteUrl}/assets/company/companyLabone.jpg`
  const canonicalUrl = `${siteUrl}/en/lab-academy/education-and-training/${post.type}/${post.slug_en || extractedSlug}`

  const keywords = [
    post.title_en,
    post.short_title,
    'LABone',
    'Lab Academy',
    post.type === 'training' ? 'training' : post.type === 'webinars' ? 'webinars' : 'scientific articles',
    'laboratory training courses',
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
      type: 'article',
      publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
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
        'vi-VN': canonicalUrl,
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

export default async function LabAcademyPostSlugLayout({ children, params }: LayoutProps) {
  const { slug } = await params
  const extractedSlug = getSlug(slug)
  const post = await getLabAcademyPostBySlug(extractedSlug)

  return (
    <>
      {post && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': post.type === 'training' ? 'Course' : post.type === 'webinars' ? 'Event' : 'Article',
              name: post.title_en,
              description: DOMPurify.sanitize(post.content_en || post.short_title || '', {
                ALLOWED_TAGS: [],
              }),
              image: post.image_url,
              provider: {
                '@type': 'Organization',
                name: 'LABone',
                url: siteUrl,
              },
            }),
          }}
        />
      )}
      {children}
    </>
  )
}
