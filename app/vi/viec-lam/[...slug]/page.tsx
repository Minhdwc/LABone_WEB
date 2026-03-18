import RecruitmentDetailClient from '@/components/features/career/detail/recruitment-detail-client'
import WebRecruitmentService from '@/services/web-recruitment.service'
import NotFound from '@/app/[...notFound]/page'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

async function getRecruitmentBySlug(slug: string) {
  try {
    const result = await WebRecruitmentService.getWebRecruitmentBySlug(slug, 'vi')
    return result || null
  } catch {
    return null
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')

  const recruitment = await getRecruitmentBySlug(slug)

  if (!recruitment) {
    return <NotFound />
  }

  return <RecruitmentDetailClient recruitment={recruitment} locale='vi' />
}
