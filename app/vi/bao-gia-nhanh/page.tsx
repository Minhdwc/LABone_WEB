import FasterQuotationClient from '@/components/features/faster-quotation'
import WebMenuProductService from '@/services/web-menu-product.service'

async function getMenuData() {
  try {
    const response = await WebMenuProductService.getWebMenuProducts({
      limit: 9,
      locale: 'vi',
    })
    return response
  } catch {
    return {
      data: [],
      total: 0,
      pageCurrent: 0,
      totalPage: 0,
    }
  }
}

export default async function Page() {
  const products = await getMenuData()
  return <FasterQuotationClient products={products.data} />
}
