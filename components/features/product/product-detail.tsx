'use client'

import { IWebMenuProduct } from '@/types'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify'
import { useLanguageStore } from '@/store/language'
import { useState, useMemo } from 'react'
import Breadcrumb from './breadcrumb'
import AccessoryOrderingInfo from './accessory-ordering-info'
import QRCode from 'react-qr-code'
interface BreadcrumbItem {
  web_menu_name_vn: string
  web_menu_name_en: string
  slug_vn: string
  slug_en: string
  type?: string
  level?: number
}

interface ProductDetailProps {
  product: IWebMenuProduct
  webMenuProduct: IWebMenuProduct
  breadcrumbPaths?: Array<Array<BreadcrumbItem>>
}

type TabType = 'description' | 'technical' | 'standards' | 'documents' | 'qrcode'

const TABS = [
  { id: 'description' as TabType, labelVN: 'Mô tả', labelEN: 'Description' },
  {
    id: 'technical' as TabType,
    labelVN: 'Thông số kỹ thuật',
    labelEN: 'Technical Specifications',
  },
  {
    id: 'standards' as TabType,
    labelVN: 'Cung cấp Tiêu chuẩn',
    labelEN: 'Provide Standards',
  },
  { id: 'documents' as TabType, labelVN: 'Tài liệu', labelEN: 'Documents' },
  { id: 'qrcode' as TabType, labelVN: 'Mã QR', labelEN: 'QR Code' },
]

export default function ProductDetail({ product, breadcrumbPaths = [] }: ProductDetailProps) {
  const { language } = useLanguageStore()
  const currentLanguage = language === 'VN' ? 'VN' : 'EN'
  const [activeTab, setActiveTab] = useState<TabType>('description')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const productData = product.product
  // Hooks phải gọi trước mọi return có điều kiện
  const { productName, description, packagingSpec, specification, supplyStandard } = useMemo(() => {
    if (!productData) {
      return {
        productName: '',
        description: '',
        packagingSpec: '',
        specification: '',
        supplyStandard: '',
      }
    }
    const isVN = currentLanguage === 'VN'
    return {
      productName: isVN ? productData.product_name : productData.product_english_name,
      description: isVN ? productData.description : productData.english_description,
      packagingSpec: isVN ? productData.packaging_specification : productData.packaging_specification_english,
      specification: isVN ? productData.specification : productData.specification_english,
      supplyStandard: isVN ? productData.supply_standard : productData.supply_standard_english,
    }
  }, [currentLanguage, productData])

  const sanitized = useMemo(
    () => ({
      description: DOMPurify.sanitize(description || ''),
      packaging: DOMPurify.sanitize(packagingSpec || ''),
      specification: DOMPurify.sanitize(specification || ''),
      supplyStandard: DOMPurify.sanitize(supplyStandard || ''),
    }),
    [description, packagingSpec, specification, supplyStandard],
  )
  const genQrCodeUrl = (item: IWebMenuProduct) => {
    const prefixPath = process.env.NEXT_PUBLIC_SITE_URL
    if (language === 'VN') return `${prefixPath}/vi/san-pham/${item.slug_vn}`
    return `${prefixPath}/en/product/${item.slug_en}`
  }

  const productImages = productData?.image_url ? [productData.image_url] : []

  if (!productData) return <div>Product not found</div>

  const getTypeLabel = (type: string, locale: string) => {
    const map: Record<string, string> = {
      brochure: 'Brochure',
      catalogue: 'Catalogue',
      userManual: 'User Manual',
      flyer: 'Flyer',
      'ms-ds': 'MSDS',
    }
    return map[type] ?? (locale === 'vi' ? 'Khác' : 'Other')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return sanitized.description ? (
          <div
            className='prose prose-sm max-w-none text-gray-700'
            dangerouslySetInnerHTML={{ __html: sanitized.description }}
          />
        ) : (
          <p className='text-gray-500 italic'>
            {currentLanguage === 'VN' ? 'Chưa có thông tin mô tả sản phẩm' : 'No product description available'}
          </p>
        )

      case 'technical':
        return sanitized.specification ? (
          <div
            className='prose prose-sm max-w-none text-gray-700'
            dangerouslySetInnerHTML={{ __html: sanitized.specification }}
          />
        ) : (
          <p className='text-gray-500 italic'>
            {currentLanguage === 'VN' ? 'Chưa có thông số kỹ thuật' : 'No technical specifications available'}
          </p>
        )

      case 'standards':
        return sanitized.supplyStandard ? (
          <div
            className='prose prose-sm max-w-none text-gray-700'
            dangerouslySetInnerHTML={{ __html: sanitized.supplyStandard }}
          />
        ) : (
          <p className='text-gray-500 italic'>
            {currentLanguage === 'VN' ? 'Chưa có tiêu chuẩn cung cấp' : 'No supply standards available'}
          </p>
        )

      case 'documents': {
        const targetLocale = currentLanguage === 'VN' ? 'vi' : 'en'
        const files = productData.productFiles?.filter((f) => f.locale === targetLocale) ?? []

        if (files.length === 0) {
          return (
            <p className='text-gray-500 italic'>
              {currentLanguage === 'VN' ? 'Chưa có tài liệu' : 'No documents available'}
            </p>
          )
        }

        return (
          <div className='space-y-2'>
            {files.map((file) => (
              <a
                key={file.product_file_id}
                href={`/file/${file.slug}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-between gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors'
              >
                <div className='flex items-center gap-2 flex-1'>
                  <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <span className='text-gray-700'>{file.folderFileProduct?.folder_file_product_name}</span>
                </div>
                {file.type && <span className='text-sm text-gray-500'>{getTypeLabel(file.type, targetLocale)}</span>}
              </a>
            ))}
          </div>
        )
      }

      case 'qrcode':
        return (
          <div className='flex justify-center items-center'>
            <QRCode value={genQrCodeUrl(product)} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      {breadcrumbPaths.length > 0 && (
        <div className='mb-6'>
          <Breadcrumb breadcrumbPaths={breadcrumbPaths} productName={productName} />
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* Hình ảnh */}
        <div className='space-y-4'>
          <div className='relative w-full aspect-square rounded-lg bg-white overflow-hidden border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-white'>
            {productImages.length > 0 ? (
              <Image
                src={productImages[selectedImageIndex]}
                alt={productName}
                fill
                className='object-contain p-6'
                priority
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <span className='text-6xl font-bold text-gray-400'>{productName?.charAt(0) || ''}</span>
              </div>
            )}
          </div>

          {productImages.length > 1 && (
            <div className='flex gap-3'>
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`${productName} ${index + 1}`} fill className='object-cover' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className='space-y-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>{productName}</h1>

          <div className='bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200'>
            {productData.product_id && (
              <div className='text-sm text-gray-700'>
                <span className='font-medium'>
                  {currentLanguage === 'VN' ? 'Mã đặt hàng/sản phẩm:' : 'Order Code/Product Code:'}
                </span>{' '}
                <span className='text-gray-900'>{productData.product_id}</span>
              </div>
            )}
            {productData.code && (
              <div className='text-sm text-gray-700'>
                <span className='font-medium text-red-600'>Model/Code:</span>{' '}
                <span className='text-gray-900'>{productData.code}</span>
              </div>
            )}
            {sanitized.packaging && (
              <div className='text-sm text-gray-700'>
                <span className='font-medium'>{currentLanguage === 'VN' ? 'Qui cách đóng gói:' : 'Packaging:'}</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: sanitized.packaging }} />
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className='border-b border-gray-200'>
            <div className='flex flex-wrap gap-2 overflow-x-auto'>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {currentLanguage === 'VN' ? tab.labelVN : tab.labelEN}
                </button>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-lg p-6 border border-gray-200 min-h-[200px]'>{renderTabContent()}</div>
        </div>
      </div>

      <AccessoryOrderingInfo
        webMenuProductId={product.web_menu_product_id}
        product={productData}
        accessories={product.webMenuProductAccesories ?? null}
        currentLanguage={currentLanguage}
      />
    </div>
  )
}
