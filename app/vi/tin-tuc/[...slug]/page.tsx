import WebNewService from '@/services/web-new.service'
import NotFound from '@/app/[...notFound]/page'
import NewDetailClient from '@/components/features/new/new-detail/new-detail-client'
import { IWebNew } from '@/types'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

async function getNewBySlug(slug: string, locale: string): Promise<IWebNew | null> {
  try {
    const response = await WebNewService.getWebNewBySlug(slug, locale)
    return response
  } catch {
    return null
  }
}

export default async function NewDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')

  const newItem = await getNewBySlug(slug, 'vi')

  if (!newItem) {
    return <NotFound />
  }

  return <NewDetailClient newItem={newItem} locale='vi' />
}
