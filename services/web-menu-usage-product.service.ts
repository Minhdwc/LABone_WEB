import { api } from './custom-api.service'
import { IWebMenuProductUsage } from '@/types'

interface WebMenuUsageProductResponse {
  status: number
  message: string
  data: {
    data: IWebMenuProductUsage[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

interface WebMenuUsageProductDetailResponse {
  status: number
  message: string
  data: IWebMenuProductUsage
}

const WebMenuUsageProductService = {
  getWebMenuUsageProducts: async (params: {
    web_menu_id?: string
    web_usage_product_id?: string
    page?: number
    limit?: number
    search?: string
    locale?: string
  }) => {
    const query = new URLSearchParams()
    if (params.web_menu_id) {
      query.append('web_menu_id', params.web_menu_id)
    }
    if (params.web_usage_product_id) {
      query.append('web_usage_product_id', params.web_usage_product_id)
    }
    if (params.page) {
      query.append('page', params.page.toString())
    }
    if (params.limit) {
      query.append('limit', params.limit.toString())
    }
    if (params.search) {
      query.append('search', params.search)
    }
    if (params.locale) {
      query.append('locale', params.locale)
    }
    const response = await api.get<WebMenuUsageProductResponse>(`/web-usage-product?${query.toString()}`)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
  getWebDetailWebMenuUsageProduct: async (web_menu_product_usage_id: string) => {
    const response = await api.get<WebMenuUsageProductDetailResponse>(`/web-usage-product/${web_menu_product_usage_id}`)
    return response?.data || null
  },
}

export default WebMenuUsageProductService
