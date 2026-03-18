import { getServerSideSitemapIndex } from 'next-sitemap'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labone.com.vn/'

export async function GET() {
  const sitemaps = [
    `${siteUrl}/server-sitemap-products.xml`,
    `${siteUrl}/server-sitemap-categories.xml`,
    `${siteUrl}/server-sitemap-application.xml`,
    `${siteUrl}/server-sitemap-event.xml`,
    `${siteUrl}/server-sitemap-new.xml`,
  ]

  return getServerSideSitemapIndex(sitemaps)
}
