import type { Metadata } from 'next'
import { trainingEducationCards } from '@/lib/training-data'
import DOMPurify from 'isomorphic-dompurify'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ type: string }>
}

// Map English type slug to type name
function getTypeInfo(typeSlug: string) {
  const normalizedSlug = typeSlug?.toLowerCase() || ''
  if (normalizedSlug === 'training') {
    return {
      type: 'training',
      card: trainingEducationCards.find((c) => c.id === 1),
    }
  }
  if (normalizedSlug === 'webinars') {
    return {
      type: 'webinars',
      card: trainingEducationCards.find((c) => c.id === 2),
    }
  }
  if (normalizedSlug === 'post') {
    return {
      type: 'post',
      card: trainingEducationCards.find((c) => c.id === 3),
    }
  }
  return null
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { type: typeSlug } = await params
  const typeInfo = getTypeInfo(typeSlug)

  if (!typeInfo || !typeInfo.card) {
    return {
      title: 'Education and Training | LABone',
      description: 'Training and education programs from LABone Lab Academy.',
    }
  }

  const card = typeInfo.card
  const title = card.title_en || 'Education and Training | LABone'
  const descriptionHTML = DOMPurify.sanitize(card.description_en || '', {
    ALLOWED_TAGS: [],
  })
  const description = descriptionHTML.substring(0, 155) + (descriptionHTML.length > 155 ? '...' : '')
  const canonicalUrl = `${siteUrl}${card.href_en}`
  const imageUrl = card.image || `${siteUrl}/assets/company/companyLabone.jpg`

  const keywords = [
    card.title_en,
    'LABone',
    'Lab Academy',
    'LABone training',
    'laboratory training courses',
    'training',
    'webinars',
    'scientific articles',
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
        'vi-VN': `${siteUrl}${card.href_vn}`,
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

export default async function TrainingEducationTypeLayout({ children, params }: LayoutProps) {
  const { type: typeSlug } = await params
  const typeInfo = getTypeInfo(typeSlug)

  return (
    <>
      {typeInfo?.card && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: typeInfo.card.title_en,
              description: typeInfo.card.description_en,
              provider: {
                '@type': 'Organization',
                name: 'LABone',
                url: siteUrl,
              },
              url: `${siteUrl}${typeInfo.card.href_en}`,
            }),
          }}
        />
      )}
      {children}
    </>
  )
}
