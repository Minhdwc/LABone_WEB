import { getServerSideSitemap } from 'next-sitemap'
import WebRecruitmentService from '@/services/web-recruitment.service'
import type { ISitemapField } from 'next-sitemap'
import { IRecruitment } from '@/types'

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
        const response = await WebRecruitmentService.getWebRecruitments({
          page,
          limit,
        })

        if (response?.data && response.data.length > 0) {
          response.data.forEach((recruitment: IRecruitment) => {
            const slugVi = recruitment.slug || ''
            const slugEn = recruitment.slug_en || ''
            // Vietnamese recruitment URL
            if (slugVi) {
              fields.push({
                loc: `${siteUrl}/vi/viec-lam/${slugVi}`,
                lastmod: recruitment.createdAt?.toString() || new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8,
              })
            }
            // English recruitment URL (dùng slug_en nếu có, tránh trùng với VI nếu khác slug)
            if (slugEn) {
              fields.push({
                loc: `${siteUrl}/en/career/${slugEn}`,
                lastmod: recruitment.createdAt?.toString() || new Date().toISOString(),
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
      } catch {
        hasMore = false
      }
    }

    return getServerSideSitemap(fields)
  } catch {
    return getServerSideSitemap([])
  }
}
