import { documentsVN } from '@/lib/containts'
import FileProductService from '@/services/file-product.service'
import DocumentClient from '@/components/features/document/document-client'
import { IProductFile } from '@/types'

export default async function TaiLieuPage() {
  // Fetch data server-side
  let files: IProductFile[] = []
  try {
    const response = await FileProductService.getAllFileProductWeb({
      limit: 10,
      page: 0,
    })
    files = response.data || []
  } catch {
    // Continue with empty array if fetch fails
  }

  return <DocumentClient locale='vi' hero={documentsVN.hero} note={documentsVN.note} files={files} />
}
