import { IWebNew } from '@/types'
import { api } from './custom-api.service'

interface WebNewResponse {
  status: number
  message: string
  data: IWebNew
}

interface WebNewPageResponse {
  status: number
  message: string
  data: {
    data: IWebNew[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

export interface WebNewPageData {
  data: IWebNew[]
  total: number
  pageCurrent: number
  totalPage: number
}

const WebNewService = {
  getAllWebNew: async (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    else query.append('limit', '9')
    const queryString = query.toString()
    const endpoint = queryString ? `/new/web?${queryString}` : '/new/web'
    const response = await api.get<WebNewPageResponse>(endpoint)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
  getWebNewBySlug: async (slug: string, locale: string) => {
    const response = await api.get<WebNewResponse>(`/new/${slug}/${locale}`)
    return response?.data || null
  },
}

export default WebNewService
