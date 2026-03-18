import { api } from './custom-api.service'
import { IWebMenuProduct, IProduct } from '@/types'

interface WebMenuProductWithProduct extends IWebMenuProduct {
  product: IProduct
}

interface WebMenuProductResponse {
  status: number
  message: string
  data: {
    data: WebMenuProductWithProduct[]
    total: number
    pageCurrent: number
    totalPage: number
  }
}

interface WebMenuProductDetailResponse {
  status: number
  message: string
  data: WebMenuProductWithProduct
}

const WebMenuProductService = {
  getWebMenuProducts: async (params: {
    web_menu_id?: string
    page?: number
    limit?: number
    search?: string
    slug_vn?: string
    slug_en?: string
    product_id?: string
    locale?: string
    is_featured?: boolean
    is_on_sale?: boolean
    is_new?: boolean
  }) => {
    const query = new URLSearchParams()
    if (params.web_menu_id) {
      query.append('web_menu_id', params.web_menu_id)
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
    if (params.slug_vn) {
      query.append('slug_vn', params.slug_vn)
    }
    if (params.slug_en) {
      query.append('slug_en', params.slug_en)
    }
    if (params.product_id) {
      query.append('product_id', params.product_id)
    }
    if (params.locale) {
      query.append('locale', params.locale)
    }
    if (params.is_featured) {
      query.append('is_featured', params.is_featured.toString())
    }
    if (params.is_on_sale) {
      query.append('is_on_sale', params.is_on_sale.toString())
    }
    if (params.is_new) {
      query.append('is_new', params.is_new.toString())
    }
    const response = await api.get<WebMenuProductResponse>(`/web-menu-product?${query.toString()}`)
    return response?.data || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  },
  getWebDetailWebMenuProductWeb: async (slug: string, locale: string) => {
    const response = await api.get<WebMenuProductDetailResponse>(`/web-menu-product/${slug}/${locale}`)
    return response?.data || null
  },
}

export default WebMenuProductService
