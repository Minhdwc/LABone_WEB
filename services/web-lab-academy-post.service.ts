import { api } from './custom-api.service'
import { IWebLabAcademyPost } from '@/types'

interface WebLabAcademyPostResponse {
  status: number
  message: string
  data: IWebLabAcademyPost
}

interface WebLabAcademyPostPageResponse {
  status: number
  message: string
  data: {
    data: IWebLabAcademyPost[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

const WebLabAcademyPostService = {
  getWebLabAcademyPostById: async (web_academy_id: string) => {
    const response = await api.get<WebLabAcademyPostResponse>(`/web-academy/${web_academy_id}`)
    return response?.data || null
  },
  getWebLabAcademyPostBySlug: async (slug: string, locale: string) => {
    const response = await api.get<WebLabAcademyPostResponse>(`/web-academy/${slug}/${locale}`)
    return response?.data ?? null
  },
  getAllWebLabAcademyPosts: async (params?: {
    page?: number
    limit?: number
    search?: string
    website_lab_academy_id?: string
    type?: string
    tags?: string[]
  }) => {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    else query.append('limit', '9')
    if (params?.search) query.append('search', params.search)
    if (params?.website_lab_academy_id) query.append('website_lab_academy_id', params.website_lab_academy_id)
    if (params?.type) query.append('type', params.type)
    if (params?.tags) query.append('tags', params.tags.join(','))

    const queryString = query.toString()
    const endpoint = queryString ? `/web-academy/?${queryString}` : '/web-academy/'
    const response = await api.get<WebLabAcademyPostPageResponse>(endpoint)
    return (
      response?.data || {
        data: [],
        total: 0,
        pageCurrent: 1,
        totalPage: 0,
      }
    )
  },
}

export default WebLabAcademyPostService
