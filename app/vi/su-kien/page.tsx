import EventsClient from '@/components/features/event/events-client'
import type { WebEventPageData } from '@/services/web-event.service'
import WebEventService from '@/services/web-event.service'

async function getEventsData(): Promise<WebEventPageData> {
  try {
    const result = await WebEventService.getAllWebEvent({
      limit: 100,
      mode: 'page',
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

export default async function EventsPage() {
  const events = await getEventsData()

  return <EventsClient events={events} />
}
