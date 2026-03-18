import { ICoaProductFile } from '@/types'
import { api } from './custom-api.service'

interface WebCoaProductFileResponse {
  status: number
  message: string
  data: ICoaProductFile
}

interface WebCoaProductFilePageResponse {
  status: number
  message: string
  data: {
    data: ICoaProductFile[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

const WebCoaProductFileService = {
  getWebCoaProductFile: async (query: {
    limit?: number
    page?: number
    search?: string
    product_version_id?: string
    production_batch_id?: string
  }) => {
    const queryParams = new URLSearchParams()
    if (query.limit) {
      queryParams.append('limit', query.limit.toString())
    }
    if (query.page !== undefined) {
      queryParams.append('page', query.page.toString())
    }
    if (query.search) {
      queryParams.append('search', query.search)
    }
    if (query.product_version_id) {
      queryParams.append('product_version_id', query.product_version_id)
    }
    if (query.production_batch_id) {
      queryParams.append('production_batch_id', query.production_batch_id)
    }
    const queryString = queryParams.toString()
    const endpoint = queryString ? `/coa-product-file?${queryString}` : '/coa-product-file'
    const response = await api.get<WebCoaProductFilePageResponse>(endpoint)
    return response || null
  },
  getWebCoaProductFileById: async (coa_product_file_id: string) => {
    const response = await api.get<WebCoaProductFileResponse>(`/coa-product-file/${coa_product_file_id}`)
    return response || null
  },
}

export default WebCoaProductFileService
