import WebMenuService from '@/services/web-menu.service'
import WebMenuProductService from '@/services/web-menu-product.service'
import WebNewService from '@/services/web-new.service'
import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'
import WebRecruitmentService from '@/services/web-recruitment.service'

const mappingStaticPageVN: Record<string, string> = {
  home: '/',
  'dich-vu': '/vi/dich-vu',
  'thuong-hieu': '/vi/thuong-hieu',
  'lien-he': '/vi/lien-he',
  'san-pham': '/vi/san-pham',
  'danh-muc-san-pham': '/vi/danh-muc-san-pham',
  'dat-hang': '/vi/dat-hang',
  'bao-gia-nhanh': '/vi/bao-gia-nhanh',
  'ung-dung': '/vi/ung-dung',
  iso: '/vi/iso',
  've-chung-toi': '/vi/ve-chung-toi',
  'viec-lam': '/vi/viec-lam',
  'coa-cq': '/vi/coa-cq',
  'su-kien': '/vi/su-kien',
  'tin-tuc': '/vi/tin-tuc',
  'tai-lieu': '/vi/tai-lieu',
  'chinh-sach-thanh-toan': '/vi/chinh-sach-thanh-toan',
  'chinh-sach-bao-hanh': '/vi/chinh-sach-bao-hanh',
  'chinh-sach-doi-tra-va-hoan-tien': '/vi/chinh-sach-doi-tra-va-hoan-tien',
  'chinh-sach-xu-ly-kieu-nai': '/vi/chinh-sach-xu-ly-kieu-nai',
  'chinh-sach-van-chuyen': '/vi/chinh-sach-van-chuyen',
  'chinh-sach-bao-mat-thong-tin': '/vi/chinh-sach-bao-mat-thong-tin',
  'khoa-hoc-va-dao-tao': '/vi/khoa-hoc-va-dao-tao',
  'dao-tao-va-giao-duc': '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc',
}

const mappingStaticPageEN: Record<string, string> = {
  home: '/en/home',
  'dich-vu': '/en/services',
  'thuong-hieu': '/en/brands',
  'lien-he': '/en/contact',
  'san-pham': '/en/product',
  'danh-muc-san-pham': '/en/product-categories',
  'dat-hang': '/en/order',
  'bao-gia-nhanh': '/en/faster-quotation',
  'ung-dung': '/en/application',
  iso: '/en/certificate',
  've-chung-toi': '/en/about-us',
  'viec-lam': '/en/career',
  'coa-cq': '/en/coa-cq',
  'su-kien': '/en/event',
  'tin-tuc': '/en/new',
  'tai-lieu': '/en/documents',
  'chinh-sach-thanh-toan': '/en/payment-policy',
  'chinh-sach-bao-hanh': '/en/warranty-policy',
  'chinh-sach-doi-tra-va-hoan-tien': '/en/return-refund-policy',
  'chinh-sach-xu-ly-kieu-nai': '/en/complaint-handling-policy',
  'chinh-sach-van-chuyen': '/en/shipping-policy',
  'chinh-sach-bao-mat-thong-tin': '/en/privacy-policy',
  'khoa-hoc-va-dao-tao': '/en/lab-academy',
  'dao-tao-va-giao-duc': '/en/lab-academy/education-and-training',
}

// Lab Academy type mapping: direction-aware to avoid mixing languages
const labAcademyTypeMappingViToEn: Record<string, string> = {
  'dao-tao': 'training',
  'thao-luan-truc-tuyen': 'webinars',
  'bai-viet-khoa-hoc': 'post',
}

const labAcademyTypeMappingEnToVi: Record<string, string> = {
  training: 'dao-tao',
  webinars: 'thao-luan-truc-tuyen',
  post: 'bai-viet-khoa-hoc',
}

const ENtoVNPageKey: Record<string, string> = {
  home: 'home',
  services: 'dich-vu',
  brands: 'thuong-hieu',
  contact: 'lien-he',
  product: 'san-pham',
  'product-categories': 'danh-muc-san-pham',
  order: 'dat-hang',
  'faster-quotation': 'bao-gia-nhanh',
  application: 'ung-dung',
  certificate: 'iso',
  'about-us': 've-chung-toi',
  career: 'viec-lam',
  'coa-cq': 'coa-cq',
  event: 'su-kien',
  new: 'tin-tuc',
  documents: 'tai-lieu',
  'payment-policy': 'chinh-sach-thanh-toan',
  'warranty-policy': 'chinh-sach-bao-hanh',
  'return-refund-policy': 'chinh-sach-doi-tra-va-hoan-tien',
  'complaint-handling-policy': 'chinh-sach-xu-ly-kieu-nai',
  'shipping-policy': 'chinh-sach-van-chuyen',
  'privacy-policy': 'chinh-sach-bao-mat-thong-tin',
  'lab-academy': 'khoa-hoc-va-dao-tao',
  'education-and-training': 'dao-tao-va-giao-duc',
  post: 'bai-viet-khoa-hoc',
}

function getStaticUrl(page: string, locale: 'vi' | 'en') {
  const key = locale === 'en' ? ENtoVNPageKey[page] || page : page
  const map = locale === 'vi' ? mappingStaticPageVN : mappingStaticPageEN
  return map[key] || (locale === 'vi' ? '/' : '/en/home')
}

async function getTranslatedSlug(pageKey: string, slug: string, from: 'vi' | 'en', to: 'vi' | 'en') {
  try {
    const menuTypeParam = pageKey === 'danh-muc-san-pham' ? 'menu' : pageKey === 'ung-dung' ? 'usage' : undefined
    const res = await WebMenuService.getWebMenu({
      [from === 'vi' ? 'slug_vn' : 'slug_en']: slug,
      ...(menuTypeParam ? { type: menuTypeParam } : {}),
    })

    if (pageKey === 'san-pham') {
      const res = await WebMenuProductService.getWebDetailWebMenuProductWeb(slug, from)
      return res ? (to === 'vi' ? res.slug_vn : res.slug_en) : null
    }
    if (pageKey === 'viec-lam') {
      const res = await WebRecruitmentService.getWebRecruitmentBySlug(slug, from)
      return res ? (to === 'vi' ? res.slug : res.slug_en) : null
    }
    // Chuyển trang của tin tức (news)
    // Sự kiện hiện tại không có slug đa ngôn ngữ nên chỉ hỗ trợ dịch slug cho tin tức
    if (pageKey === 'tin-tuc') {
      const res = await WebNewService.getWebNewBySlug(slug, from)
      return res ? (to === 'vi' ? res.slug_vn : res.slug_en) : null
    }

    if (pageKey === 'khoa-hoc-va-dao-tao' || pageKey === 'dao-tao-va-giao-duc' || pageKey === 'bai-viet-khoa-hoc') {
      const res = await WebLabAcademyPostService.getWebLabAcademyPostBySlug(slug, from)
      return res ? (to === 'vi' ? res.slug_vn : res.slug_en) : null
    }

    if (!res?.data?.length) return null
    const item = res.data[0]
    return to === 'vi' ? item.slug_vn : item.slug_en
  } catch {
    return null
  }
}

export async function translateUrl(pathname: string, target: 'VN' | 'EN') {
  const toLocale: 'vi' | 'en' = target === 'VN' ? 'vi' : 'en'

  if (pathname === '/') {
    return toLocale === 'vi' ? '/' : '/en/home'
  }

  // File preview page is non-localized (/file/[slug]) – keep as is
  if (pathname.startsWith('/file/')) {
    return pathname
  }

  const parts = pathname.replace(/^\/+/, '').split('/')
  const fromLocale = parts[0] as 'vi' | 'en'
  let page = parts[1] || 'home'
  let subPage = parts[2]
  const typeOrSlug = parts[3]
  const detailSlug = parts[4]

  // Decide Lab Academy type mapping direction based on from/to locales
  const labAcademyTypeMapping =
    fromLocale === 'vi' && toLocale === 'en'
      ? labAcademyTypeMappingViToEn
      : fromLocale === 'en' && toLocale === 'vi'
        ? labAcademyTypeMappingEnToVi
        : undefined

  if (fromLocale === 'en') {
    page = ENtoVNPageKey[page] || page
    if (subPage) {
      subPage = ENtoVNPageKey[subPage] || subPage
    }
  }

  // Lab Academy
  if (page === 'khoa-hoc-va-dao-tao' && subPage === 'dao-tao-va-giao-duc' && !typeOrSlug) {
    return getStaticUrl('dao-tao-va-giao-duc', toLocale)
  }

  if (page === 'khoa-hoc-va-dao-tao' && subPage === 'dao-tao-va-giao-duc' && typeOrSlug && detailSlug) {
    const translatedType = (labAcademyTypeMapping && labAcademyTypeMapping[typeOrSlug]) || typeOrSlug
    const translatedSlug = await getTranslatedSlug('dao-tao-va-giao-duc', detailSlug, fromLocale, toLocale)

    const baseUrl = getStaticUrl('dao-tao-va-giao-duc', toLocale)
    return translatedSlug ? `${baseUrl}/${translatedType}/${translatedSlug}` : `${baseUrl}/${translatedType}`
  }

  if (page === 'khoa-hoc-va-dao-tao' && subPage === 'dao-tao-va-giao-duc' && typeOrSlug && !detailSlug) {
    const translatedType = (labAcademyTypeMapping && labAcademyTypeMapping[typeOrSlug]) || typeOrSlug
    const baseUrl = getStaticUrl('dao-tao-va-giao-duc', toLocale)
    return `${baseUrl}/${translatedType}`
  }

  if (!subPage) {
    return getStaticUrl(page, toLocale)
  }

  const translatedSlug = await getTranslatedSlug(page, subPage, fromLocale, toLocale)

  const baseUrl = getStaticUrl(page, toLocale)
  return translatedSlug ? `${baseUrl}/${translatedSlug}` : baseUrl
}
