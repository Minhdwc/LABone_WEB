import NewClient from '@/components/features/new/new-client'
import WebNewService from '@/services/web-new.service'
import type { WebNewPageData } from '@/services/web-new.service'

async function getNewsData(): Promise<WebNewPageData> {
  try {
    const result = await WebNewService.getAllWebNew({
      limit: 9,
    })
    return result
  } catch {
    return {
      data: [],
      total: 0,
      pageCurrent: 1,
      totalPage: 0,
    }
  }
}

export default async function NewPage() {
  const newsData = await getNewsData()

  return <NewClient newsData={newsData} basePath='/en/new' />
}
