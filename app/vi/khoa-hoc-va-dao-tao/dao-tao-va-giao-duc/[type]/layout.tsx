import type { Metadata } from 'next'
import { trainingEducationCards } from '@/lib/training-data'
import DOMPurify from 'isomorphic-dompurify'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ type: string }>
}

// Map Vietnamese type slug to type name
function getTypeInfo(typeSlug: string) {
  const normalizedSlug = typeSlug?.toLowerCase() || ''
  if (normalizedSlug === 'dao-tao') {
    return {
      type: 'training',
      card: trainingEducationCards.find((c) => c.id === 1),
    }
  }
  if (normalizedSlug === 'thao-luan-truc-tuyen') {
    return {
      type: 'webinars',
      card: trainingEducationCards.find((c) => c.id === 2),
    }
  }
  if (normalizedSlug === 'bai-viet-khoa-hoc') {
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
      title: 'Khóa Học và Đào Tạo | LABone',
      description: 'Chương trình đào tạo và giáo dục của LABone Lab Academy.',
    }
  }

  const card = typeInfo.card
  const title = card.title_vn || 'Khóa Học và Đào Tạo | LABone'
  const descriptionHTML = DOMPurify.sanitize(card.description_vn || '', {
    ALLOWED_TAGS: [],
  })
  const description = descriptionHTML.substring(0, 155) + (descriptionHTML.length > 155 ? '...' : '')
  const canonicalUrl = `${siteUrl}${card.href_vn}`
  const imageUrl = card.image || `${siteUrl}/assets/company/companyLabone.jpg`

  const keywords = [
    card.title_vn,
    'LABone',
    'Lab Academy',
    'đào tạo LABone',
    'khóa học phòng thí nghiệm',
    'đào tạo',
    'thảo luận trực tuyến',
    'bài viết khoa học',
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
        'en-US': `${siteUrl}${card.href_en}`,
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
              name: typeInfo.card.title_vn,
              description: typeInfo.card.description_vn,
              provider: {
                '@type': 'Organization',
                name: 'LABone',
                url: siteUrl,
              },
              url: `${siteUrl}${typeInfo.card.href_vn}`,
            }),
          }}
        />
      )}
      {children}
    </>
  )
}
