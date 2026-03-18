import { getServerSideSitemap } from 'next-sitemap'
import type { ISitemapField } from 'next-sitemap'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn/'

export async function GET() {
  try {
    const fields: Array<ISitemapField> = []

    // Add Vietnamese events listing page
    fields.push({
      loc: `${siteUrl}/vi/su-kien`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    })

    // Add English events listing page
    fields.push({
      loc: `${siteUrl}/en/event`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    })

    // Note: Event detail pages currently do not use slugs on the web API,
    // so we only include the listing pages in this sitemap.
    return getServerSideSitemap(fields)
  } catch {
    return getServerSideSitemap([])
  }
}
