import { getServerSideSitemap } from 'next-sitemap'
import WebNewService from '@/services/web-new.service'
import type { ISitemapField } from 'next-sitemap'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn/'

export async function GET() {
  try {
    const fields: Array<ISitemapField> = []

    // Add Vietnamese news listing page
    fields.push({
      loc: `${siteUrl}/vi/tin-tuc`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    })

    // Add English news listing page
    fields.push({
      loc: `${siteUrl}/en/new`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    })

    // Get all news from API
    // Use a high limit to include most items in sitemap
    const news = await WebNewService.getAllWebNew({ limit: 1000 })

    // Add Vietnamese news detail pages
    news.data.forEach((item) => {
      if (item.slug_vn) {
        fields.push({
          loc: `${siteUrl}/vi/tin-tuc/${item.slug_vn}`,
          lastmod: item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        })
      }
    })

    // Add English news detail pages
    news.data.forEach((item) => {
      if (item.slug_en) {
        fields.push({
          loc: `${siteUrl}/en/new/${item.slug_en}`,
          lastmod: item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        })
      }
    })

    return getServerSideSitemap(fields)
  } catch {
    return getServerSideSitemap([])
  }
}
