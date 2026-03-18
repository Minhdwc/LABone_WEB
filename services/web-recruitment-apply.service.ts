import { api } from './custom-api.service'
import { IRecruitmentApply } from '@/types'

const WebRecruitmentApplyService = {
  createRecruitmentApply: async (data: IRecruitmentApply) => {
    const response = await api.post<IRecruitmentApply>('/recruitment-apply', data)
    return response || null
  },
}

export default WebRecruitmentApplyService
