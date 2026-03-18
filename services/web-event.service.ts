import { IWebEvent } from '@/types'
import { api } from './custom-api.service'

interface WebEventResponse {
  status: number
  message: string
  data: IWebEvent
}

interface WebEventPageResponse {
  status: number
  message: string
  data: {
    data: IWebEvent[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

export interface WebEventPageData {
  data: IWebEvent[]
  total: number
  pageCurrent: number
  totalPage: number
}

const WebEventService = {
  getAllWebEvent: async (params?: { page?: number; limit?: number; mode?: string }) => {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    else query.append('limit', '9')
    if (params?.mode) query.append('mode', params.mode)
    const queryString = query.toString()
    const endpoint = queryString ? `/event/web?${queryString}` : '/event/web'
    const response = await api.get<WebEventPageResponse>(endpoint)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
}

export default WebEventService
