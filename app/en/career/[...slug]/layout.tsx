import type { Metadata } from 'next'

import WebRecruitmentService from '@/services/web-recruitment.service'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')

  try {
    const recruitment = await WebRecruitmentService.getWebRecruitmentBySlug(slug, 'en')

    if (!recruitment) {
      return {
        title: 'Job Details | LABone - Careers',
        description:
          'View job details at LABone. Information about job positions, job description, requirements and how to apply.',
        robots: {
          index: false,
          follow: true,
        },
      }
    }

    const title = recruitment.title_en || recruitment.title || 'Job Details | LABone'

    const description =
      recruitment.description_en?.slice(0, 160) ||
      recruitment.description?.slice(0, 160) ||
      'View detailed job information, description, requirements and how to apply for this position at LABone.'

    const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://labone.com.vn'}/en/career/${slug}`

    return {
      title: `${title} | LABone Careers`,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: `${title} | LABone Careers`,
        description,
        url,
        type: 'article',
      },
      robots: {
        index: recruitment.is_active ?? true,
        follow: true,
      },
      keywords: [
        'LABone',
        'jobs',
        'careers',
        'job details',
        recruitment.position_en || recruitment.position || '',
        recruitment.location_en || recruitment.location || '',
      ].filter(Boolean),
    }
  } catch {
    return {
      title: 'Job Details | LABone - Careers',
      description:
        'View job details at LABone. Information about job positions, job description, requirements and how to apply.',
      robots: {
        index: false,
        follow: true,
      },
    }
  }
}

export default function JobDetailLayout({ children }: LayoutProps) {
  return <>{children}</>
}
