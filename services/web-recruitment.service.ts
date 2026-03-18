import { api } from './custom-api.service'
import { IRecruitment } from '@/types'

interface WebRecruitmentResponse {
  status: number
  message: string
  data: WebRecruitmentPage
}

interface WebRecruitmentPage {
  data: IRecruitment[]
  total: number
  pageCurrent: number
  totalPage: number
}

interface IWebRecruitmentResponse {
  status: number
  message: string
  data: IRecruitment
}

const WebRecruitmentService = {
  getWebRecruitments: async (params: {
    page?: number
    limit?: number
    search?: string
    type?: string
    is_active?: boolean
  }) => {
    const query = new URLSearchParams()
    if (params.page) query.append('page', params.page.toString())
    if (params.limit) query.append('limit', params.limit.toString())
    else query.append('limit', '50')
    if (params.search) query.append('search', params.search)
    if (params.type) query.append('type', params.type)
    query.append('is_active', 'true')
    const queryString = query.toString()
    const endpoint = queryString ? `/recruitment?${queryString}` : '/recruitment'
    const response = await api.get<WebRecruitmentResponse>(endpoint)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
  getWebRecruitmentBySlug: async (slug: string, locale: string) => {
    const response = await api.get<IWebRecruitmentResponse>(`/recruitment/${slug}/${locale}`)
    return response?.data || null
  },
}

export default WebRecruitmentService
