import { api } from './custom-api.service'
import { IWebMenuFile } from '@/types'

interface WebMenuFileResponse {
  status: number
  message: string
  data: {
    data: IWebMenuFile[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

export interface WebMenuFileDetailData {
  web_menu_file_id: string
  folder_file_product_id: string
  web_menu_id: string
  type: string
  locale: string
  slug: string
  createdAt: string
  updatedAt: string
  folderFileProduct: {
    folder_file_product_name: string
    file_url: string
    description?: string | null
    is_public?: boolean
  }
}

interface WebMenuFileDetailResponse {
  status: number
  message: string
  data: WebMenuFileDetailData
}

const WebMenuFileService = {
  getAllWebMenuFileWeb: async (web_menu_id: string, type: string, limit?: number, page?: number) => {
    const queryParams = new URLSearchParams()
    if (limit) {
      queryParams.append('limit', limit.toString())
    }
    if (page) {
      queryParams.append('page', page.toString())
    }
    const response = await api.get<WebMenuFileResponse>(
      `/web-menu-file/${web_menu_id}/${type}?${queryParams.toString()}`,
    )
    return {
      data: response?.data?.data || [],
      total: response?.data?.total || 0,
      pageCurrent: response?.data?.pageCurrent || 1,
      totalPage: response?.data?.totalPage || 0,
    }
  },
  getDetailWebMenuFileWeb: async (slug: string): Promise<WebMenuFileDetailData | null> => {
    const response = await api.get<WebMenuFileDetailResponse>(`/web-menu-file/${slug}`)
    return response?.data ?? null
  },
}

export default WebMenuFileService
