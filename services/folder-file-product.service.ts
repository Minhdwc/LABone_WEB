import { api } from './custom-api.service'
import { IFolderFileProduct } from '@/types'

interface FolderFileProductResponse {
  status: number
  message: string
  data: IFolderFileProduct
}

const FolderFileProductService = {
  getFileProductById: async (folder_file_product_id: string) => {
    const response = await api.get<FolderFileProductResponse>(`/folder-file-product/${folder_file_product_id}`)
    return response?.data || null
  },
}

export default FolderFileProductService
