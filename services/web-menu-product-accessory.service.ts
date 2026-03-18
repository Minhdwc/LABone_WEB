import { api } from './custom-api.service'
import { IWebMenuProductAccessory } from '@/types'

export interface WebMenuProductAccessoryResponse {
  status: number
  message: string
  data: {
    data: IWebMenuProductAccessory[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

const WebMenuProductAccessoryService = {
  getWebMenuProductAccessory: async (params?: {
    limit?: number
    page?: number
    search?: string
    web_menu_product_id?: string
    product_id?: string
  }) => {
    const query = new URLSearchParams()
    if (params?.limit) query.append('limit', params.limit.toString())
    if (params?.page) query.append('page', params.page.toString())
    if (params?.search) query.append('search', params.search)
    if (params?.web_menu_product_id) query.append('web_menu_product_id', params.web_menu_product_id)
    if (params?.product_id) query.append('product_id', params.product_id)
    const response = await api.get<WebMenuProductAccessoryResponse>(`/web-menu-product-accessory?${query.toString()}`)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
}

export default WebMenuProductAccessoryService
