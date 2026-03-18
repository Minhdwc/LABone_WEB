import { api } from './custom-api.service'
import { IProductFile } from '@/types'

interface FileProductResponse {
  status: number
  message: string
  data: {
    data: IProductFile[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

export interface FileProductDetailResponse {
  status: number
  message: string
  data: FileProductDetailData
}

export interface FileProductDetailData {
  product_file_id: string
  folder_file_product_id: string
  product_id: string
  locale: string
  type: string
  slug: string
  createdAt: string
  updatedAt: string
  folderFileProduct: {
    is_public: boolean
    file_url: string
    folder_file_product_name: string
  }
}

const FileProductService = {
  getAllFileProductWeb: async (params?: {
    search?: string
    limit?: number
    page?: number
    type?: string
    locale?: string
  }) => {
    const queryParams = new URLSearchParams()
    if (params?.search) {
      queryParams.append('search', params.search)
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString())
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString())
    }
    if (params?.type) {
      queryParams.append('type', params.type)
    }
    if (params?.locale) {
      queryParams.append('locale', params.locale)
    }
    const queryString = queryParams.toString()
    const endpoint = queryString ? `/product-file?${queryString}` : '/product-file'
    const response = await api.get<FileProductResponse>(endpoint)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
  getDetailFileProductWeb: async (slug: string): Promise<FileProductDetailData | null> => {
    const response = await api.get<FileProductDetailResponse>(`/product-file/${slug}`)
    return response?.data ?? null
  },
}

export default FileProductService
