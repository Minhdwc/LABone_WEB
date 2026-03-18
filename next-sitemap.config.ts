import type { IConfig, ISitemapField } from 'next-sitemap'
//Khai báo URL của website
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

const config: IConfig = {
  siteUrl,
  //Generate file robots.txt để hỗ trợ search engines crawl website trên google
  generateRobotsTxt: true,
  //Phân chia sitemap (tương tự phân trang) => mục đích: tối ưu hóa tốc độ tải trang và tối ưu hóa tốc độ crawl của search engines
  sitemapSize: 7000,
  //Tự động tạo sitemap index để lưu trữ các file sitemap
  generateIndexSitemap: true,
  //Các file sitemap, robots.txt sẽ được lưu trữ trong thư mục public
  outDir: 'public',
  //Danh sách đường dẫn không được thêm vào trong sitemap
  exclude: ['/[...notFound]', '/server-sitemap-index.xml'],
  //Cấu hình cho robots.txt
  robotsTxtOptions: {
    policies: [
      {
        //Cho phép truy cập tất cả
        userAgent: '*',
        //Cho phép truy cập trang chủ
        allow: '/',
        // Chặn truy cập các routes admin/dashboard/API bởi vì không phải là public routes
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
    ],
    //Danh sách sitemap động được tạo từ các routes [...slug]
    additionalSitemaps: [
      `${siteUrl}/server-sitemap-products.xml`,
      `${siteUrl}/server-sitemap-categories.xml`,
      `${siteUrl}/server-sitemap-application.xml`,
      `${siteUrl}/server-sitemap-event.xml`,
      `${siteUrl}/server-sitemap-new.xml`,
      `${siteUrl}/server-sitemap-career.xml`,
    ],
  },

  //Function cấu hình cho từng route
  transform: async (_config, path): Promise<ISitemapField | undefined> => {
    //Base configuration cho tất cả routes
    const base: ISitemapField = {
      loc: path, //url của route
      changefreq: 'daily', //tần suất thay đổi
      priority: 0.7, //độ ưu tiên
      lastmod: new Date().toISOString(), //ngày cập nhật cuối cùng
    }

    if (path === '/') return { ...base, priority: 1.0, changefreq: 'daily' } //Homepage - Priority cao nhất (1.0)
    if (path.startsWith('/vi/')) {
      // Product pages: Priority cao nhất trong Vietnamese routes
      if (path.includes('/san-pham/')) return { ...base, priority: 0.9, changefreq: 'weekly' } //Product pages: Priority cao nhất trong Vietnamese routes

      // Category pages: Priority cao nhưng thấp hơn products
      if (path.includes('/danh-muc-san-pham/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      if (path.includes('/ung-dung/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      if (path.includes('/su-kien/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      if (path.includes('/tin-tuc/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      // Các Vietnamese pages khác
      return { ...base, priority: 0.8 }
    }

    /**
     * English Routes (/en/*)
     *
     * Routes tiếng Anh có cấu trúc tương tự Vietnamese routes
     * Product pages có priority cao hơn category pages
     */
    if (path.startsWith('/en/')) {
      // Product pages: Priority cao nhất trong English routes
      if (path.includes('/product/')) return { ...base, priority: 0.9, changefreq: 'weekly' }

      // Category pages: Priority cao nhưng thấp hơn products
      if (path.includes('/product-categories/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      if (path.includes('/application/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      if (path.includes('/event/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      if (path.includes('/new/')) return { ...base, priority: 0.8, changefreq: 'weekly' }

      // Các English pages khác
      return { ...base, priority: 0.8 }
    }

    /**
     * Default: Trả về base config cho các routes khác
     * (ví dụ: /api/*, /admin/* - nhưng những routes này đã bị exclude)
     */
    return base
  },

  /**
   * Additional Paths
   *
   * Function này cho phép thêm các paths không được Next.js tự động detect
   * Ví dụ: External URLs, custom routes, etc.
   *
   * Hiện tại không cần thêm paths nào, nên return empty array
   */
  additionalPaths: async () => [],
}

/**
 * Export Configuration
 *
 * ⚠️ QUAN TRỌNG: Phải dùng module.exports thay vì export default
 *
 * Lý do:
 * - next-sitemap chỉ hỗ trợ CommonJS (require/module.exports)
 * - Không hỗ trợ ES Modules (import/export default)
 * - Nếu dùng export default, next-sitemap sẽ không đọc được config
 *
 * File này được compile từ TypeScript sang JavaScript trước khi chạy next-sitemap
 * (thông qua script "prebuild:sitemap" trong package.json)
 */
module.exports = config
