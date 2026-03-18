import FileProductService from '@/services/file-product.service'
import WebCoaProductFileService from '@/services/web-coa-product-file.service'
import WebMenuFileService from './web-menu-file.service'

export interface FilePreviewResult {
  type: 'coa-cq' | 'document' | 'web-menu-file'
  fileUrl: string
  fileExtension: string
  displayName?: string
}
const FilePreviewService = {
  getFileBySlug: async (slug: string): Promise<FilePreviewResult | null> => {
    // COA/CQ: param là coa_product_file_id
    const coaDetail = await WebCoaProductFileService.getWebCoaProductFileById(slug)
    if (coaDetail?.data?.file_url) {
      const fileUrl = coaDetail.data.file_url
      const fileExtension = fileUrl.split('.').pop()?.toLowerCase() ?? ''
      return {
        type: 'coa-cq',
        fileUrl,
        fileExtension,
        displayName: coaDetail.data.file_name,
      }
    }

    // Document: param là slug
    const detail = await FileProductService.getDetailFileProductWeb(slug)
    if (detail?.folderFileProduct?.file_url) {
      const fileUrl = detail.folderFileProduct.file_url
      const fileExtension = fileUrl.split('.').pop()?.toLowerCase() ?? ''
      return {
        type: 'document',
        fileUrl,
        fileExtension,
        displayName: detail.folderFileProduct.folder_file_product_name,
      }
    }

    const webMenuFileDetail = await WebMenuFileService.getDetailWebMenuFileWeb(slug)
    if (webMenuFileDetail?.folderFileProduct?.file_url) {
      const fileUrl = webMenuFileDetail.folderFileProduct.file_url
      const fileExtension = fileUrl.split('.').pop()?.toLowerCase() ?? ''
      return {
        type: 'web-menu-file',
        fileUrl,
        fileExtension,
        displayName: webMenuFileDetail.folderFileProduct.folder_file_product_name,
      }
    }
    return null
  },
}

export default FilePreviewService
