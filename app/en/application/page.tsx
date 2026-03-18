import ProductMenuClient from '@/components/features/product-categories/product-menu-client'
import WebMenuService from '@/services/web-menu.service'

async function getMenuData() {
  try {
    const response = await WebMenuService.getWebMenu({
      level: 0,
      type: 'usage',
    })
    return response.data
  } catch {
    return []
  }
}

export default async function Page() {
  const menuData = await getMenuData()

  return <ProductMenuClient menuData={menuData} menuType='usage' />
}
