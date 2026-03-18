import { api } from './custom-api.service'
import { IWebLabAcademyPostApply } from '@/types'

interface WebLabAcademyPostApplyResponse {
  status: number
  message: string
  data: IWebLabAcademyPostApply
}

interface CreateWebLabAcademyPostApplyData {
  web_academy_id: string
  full_name: string
  email: string
  phone: string
  year_of_birth: number
}

const WebLabAcademyPostApplyService = {
  createWebLabAcademyPostApply: async (data: CreateWebLabAcademyPostApplyData) => {
    const response = await api.post<WebLabAcademyPostApplyResponse>('/web-academy-apply', data)
    return response?.data || null
  },
}

export default WebLabAcademyPostApplyService
