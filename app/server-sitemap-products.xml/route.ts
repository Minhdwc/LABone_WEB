import { getServerSideSitemap } from 'next-sitemap'
import WebMenuProductService from '@/services/web-menu-product.service'
import type { ISitemapField } from 'next-sitemap'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn/'

export async function GET() {
  try {
    const fields: Array<ISitemapField> = []

    // Fetch tất cả products với pagination
    let page = 1
    let hasMore = true
    const limit = 100 // Fetch 100 items mỗi lần

    while (hasMore) {
      try {
        const response = await WebMenuProductService.getWebMenuProducts({
          page,
          limit,
        })

        if (response?.data && response.data.length > 0) {
          response.data.forEach((product) => {
            // Vietnamese product URL
            if (product.slug_vn) {
              fields.push({
                loc: `${siteUrl}/vi/san-pham/${product.slug_vn}`,
                lastmod: product.product?.updatedAt?.toString() || new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.9,
              })
            }

            // English product URL
            if (product.slug_en) {
              fields.push({
                loc: `${siteUrl}/en/product/${product.slug_en}`,
                lastmod: product.product?.updatedAt?.toString() || new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.9,
              })
            }
          })

          // Kiểm tra còn data không
          const totalPages = response.totalPage || 0
          hasMore = page < totalPages
          page++
        } else {
          hasMore = false
        }
      } catch (error) {
        console.log('Error fetching products for sitemap:', error)
        hasMore = false
      }
    }

    return getServerSideSitemap(fields)
  } catch (error) {
    console.log('Error generating products sitemap:', error)
    return getServerSideSitemap([])
  }
}
