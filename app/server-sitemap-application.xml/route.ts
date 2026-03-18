import { getServerSideSitemap } from 'next-sitemap'
import WebMenuService from '@/services/web-menu.service'
import type { ISitemapField } from 'next-sitemap'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn/'

export async function GET() {
  try {
    const fields: Array<ISitemapField> = []

    // Fetch tất cả categories với pagination
    let page = 1
    let hasMore = true
    const limit = 100

    while (hasMore) {
      try {
        const response = await WebMenuService.getWebMenu({
          page,
          limit,
          type: 'usage',
        })

        if (response?.data && response.data.length > 0) {
          response.data.forEach((menu) => {
            // Vietnamese category URL
            if (menu.slug_vn) {
              fields.push({
                loc: `${siteUrl}/vi/ung-dung/${menu.slug_vn}`,
                lastmod: menu.updatedAt?.toString() || new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8,
              })
            }

            // English category URL
            if (menu.slug_en) {
              fields.push({
                loc: `${siteUrl}/en/application/${menu.slug_en}`,
                lastmod: menu.updatedAt?.toString() || new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8,
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
        console.log('Error fetching categories for sitemap:', error)
        hasMore = false
      }
    }

    return getServerSideSitemap(fields)
  } catch (error) {
    console.log('Error generating categories sitemap:', error)
    return getServerSideSitemap([])
  }
}
