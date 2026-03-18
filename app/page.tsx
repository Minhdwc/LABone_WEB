import CompanyCard from '@/components/features/home/company-card'
import { VideoSection } from '@/components/features/home/video-section'
import NewsSection from '@/components/features/home/news-section'
import WebMenuService from '@/services/web-menu.service'
import ListMenu from '@/components/features/home/list-menu'
import ListBrand from '@/components/features/home/list-brand'
import { HomeProductTabs } from '@/components/features/home/list-product'
import WebMenuProductService from '@/services/web-menu-product.service'
import ListLabAcademy from '@/components/features/home/list-lab-academy'
import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google'
import WebNewService, { type WebNewPageData } from '@/services/web-new.service'
import WebEventService, { type WebEventPageData } from '@/services/web-event.service'

async function getNewsData(): Promise<WebNewPageData> {
  try {
    const result = await WebNewService.getAllWebNew({
      limit: 6,
    })
    return result
  } catch {
    return { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  }
}

async function getEventsData(): Promise<WebEventPageData> {
  try {
    const result = await WebEventService.getAllWebEvent({
      limit: 3,
      mode: 'banner',
    })
    return result
  } catch {
    return { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  }
}
async function getWebMenus() {
  try {
    const result = await WebMenuService.getWebMenu({
      level: 0,
      type: 'menu',
    })
    return result.data || []
  } catch {
    return []
  }
}

async function getProducts(type: 'is_featured' | 'is_on_sale' | 'is_new') {
  try {
    const result = await WebMenuProductService.getWebMenuProducts({
      limit: 8,
      [type]: true,
    })
    return result || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  } catch {
    return { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  }
}

async function getLabAcademyPosts() {
  try {
    const result = await WebLabAcademyPostService.getAllWebLabAcademyPosts({
      limit: 4,
    })
    return result.data || []
  } catch {
    return []
  }
}

// Giảm số weight để giảm số request font (tối ưu 3G/slow 4G)
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-home-main-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-home-main-display',
  display: 'swap',
})

export default async function Home() {
  const newsData = await getNewsData()
  const menus = await getWebMenus()
  const eventsData = await getEventsData()
  const featuredProducts = await getProducts('is_featured')
  const onSaleProducts = await getProducts('is_on_sale')
  const newProducts = await getProducts('is_new')
  const labAcademyPosts = await getLabAcademyPosts()

  return (
    <div
      className={`${beVietnamPro.variable} ${playfair.variable} min-h-screen bg-zinc-50 dark:bg-black`}
      style={{ fontFamily: 'var(--font-home-main-body), sans-serif' }}
    >
      <main className='flex flex-col'>
        <section
          className='container mx-auto '
        >
          <CompanyCard />
        </section>
        <ListMenu menus={menus} />

        <section className='bg-gray-200 py-6'>
          <HomeProductTabs
            onSaleProducts={onSaleProducts}
            newProducts={newProducts}
            featuredProducts={featuredProducts}
          />
        </section>

        <section className='bg-white dark:bg-zinc-900'>
          <div className='container mx-auto '>
            <ListLabAcademy listLabAcademy={labAcademyPosts} />
          </div>
        </section>

        <section className='bg-linear-to-b from-zinc-50 to-blue-50 dark:from-black dark:to-zinc-900'>
          <div className='container mx-auto '>
            <NewsSection news={newsData.data} events={eventsData.data} />
          </div>
        </section>

        <section className='container mx-auto '>
          <VideoSection />
        </section>

        <section className='bg-white dark:bg-zinc-900'>
          <div className='container mx-auto '>
            <ListBrand />
          </div>
        </section>

        {/* <ContactForm /> */}
      </main>
    </div>
  )
}
