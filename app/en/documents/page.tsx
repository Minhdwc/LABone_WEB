import { documentsEN } from '@/lib/containts'
import FileProductService from '@/services/file-product.service'
import DocumentClient from '@/components/features/document/document-client'
import { IProductFile } from '@/types'

export default async function DocumentsPage() {
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

  return <DocumentClient locale='en' hero={documentsEN.hero} note={documentsEN.note} files={files} />
}
