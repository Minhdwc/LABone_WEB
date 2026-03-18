import { api } from './custom-api.service'
import { IWebMenu } from '@/types'

interface WebMenuResponse {
  status: number
  message: string
  data: {
    data: IWebMenu[]
    total: number
    pageCurrent: number
    totalPage: number
    menuSelectedData?: IWebMenu
  }
}

interface WebMenuDetailResponse {
  status: number
  message: string
  data: IWebMenu
}

const WebMenuService = {
  getWebMenu: async (params?: {
    is_leaf?: boolean
    page?: number
    limit?: number
    web_menu_id?: string
    web_parent_id?: string | null
    search?: string
    level?: number
    slug_vn?: string
    slug_en?: string
    sortBy?: string
    type?: string
  }) => {
    const query = new URLSearchParams()
    if (params?.is_leaf) query.append('is_leaf', params.is_leaf.toString())
    if (params?.page !== undefined) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    if (params?.web_menu_id) query.append('web_menu_id', params.web_menu_id)
    if (params?.web_parent_id) query.append('web_parent_id', params.web_parent_id)
    if (params?.search) query.append('search', params.search)
    if (params?.level !== undefined) query.append('level', params.level.toString())
    if (params?.slug_vn) query.append('slug_vn', params.slug_vn)
    if (params?.slug_en) query.append('slug_en', params.slug_en)
    if (params?.sortBy) query.append('sortBy', params.sortBy)
    if (params?.type) query.append('type', params.type)
    const queryString = query.toString()
    const endpoint = queryString ? `/web-menu?${queryString}` : '/web-menu'
    const response = await api.get<WebMenuResponse>(endpoint)
    return (
      response?.data || {
        data: [],
        total: 0,
        pageCurrent: 1,
        totalPage: 0,
      }
    )
  },
  getDetailBySlug: async (
    slug: string,
    locale: string,
    pageChildren?: number,
    limitChildren?: number,
    pageProducts?: number,
    limitProducts?: number,
  ) => {
    const query = new URLSearchParams()
    if (pageChildren !== undefined) query.append('pageChildren', pageChildren.toString())
    if (limitChildren !== undefined) query.append('limitChildren', limitChildren.toString())
    if (pageProducts !== undefined) query.append('pageProducts', pageProducts.toString())
    if (limitProducts !== undefined) query.append('limitProducts', limitProducts.toString())
    const queryString = query.toString()
    const endpoint = queryString ? `/web-menu/${slug}/${locale}?${queryString}` : `/web-menu/${slug}/${locale}`
    const response = await api.get<WebMenuDetailResponse>(endpoint)
    return response?.data || null
  },
}

export default WebMenuService
