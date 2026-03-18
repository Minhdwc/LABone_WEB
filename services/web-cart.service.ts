import { api } from './custom-api.service'

export interface WebCartAccessoryPayload {
  product_id: string
  quantity: number
}

export interface WebCartItemPayload {
  product_id: string
  quantity: number
  items?: WebCartAccessoryPayload[]
}

export interface CreateWebCartPayload {
  customer_name?: string
  customer_tax_code?: string
  customer_address?: string
  customer_phone?: string
  customer_email?: string
  legal_representative?: string
  contact_person?: string
  items: WebCartItemPayload[]
  note?: string
}

export interface CreateWebCartResponse {
  status: number
  message: string
  data?: unknown
}

const WebCartService = {
  createWebCart: (payload: CreateWebCartPayload) => api.post<CreateWebCartResponse>('/web-cart', payload),
}

export default WebCartService
