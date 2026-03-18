'use client'

import { useState } from 'react'
import OrderTable from './order-table'
import ProductTable from './product-table'
import CustomerInfo, { CustomerInfoFormData } from './customer-info'
import { ICartAccessoryItem, ICartItem, IWebMenuProduct, IWebMenuProductAccessory } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { useLanguageStore } from '@/store/language'
import WebCartService, { CreateWebCartPayload } from '@/services/web-cart.service'
import { toast } from 'sonner'

interface QuotationItem extends ICartItem {
  category?: {
    vn: string
    en: string
  }
  webMenuId?: string | null
}

export default function FasterQuotation({ products }: { products: IWebMenuProduct[] }) {
  const { language } = useLanguageStore()
  const [orderItems, setOrderItems] = useState<QuotationItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoFormData>({
    company_tax_code: '',
    company_name: '',
    company_phone: '',
    company_email: '',
    company_address: '',
    legal_representative: '',
    contact_person: '',
    note: '',
  })

  const handleAddOrderItem = (productItem: IWebMenuProduct, selectedAccessories: IWebMenuProductAccessory[]) => {
    const baseProduct = productItem.product
    if (!baseProduct) return

    const accessoryItems: ICartAccessoryItem[] = selectedAccessories
      .map((accessory) => accessory.accessory_product)
      .filter((accessory): accessory is NonNullable<typeof accessory> => Boolean(accessory))
      .map((accessory) => ({
        accessory,
        quantity: 1,
      }))
    const category = {
      vn: productItem.web_menu?.web_menu_name_vn || '',
      en: productItem.web_menu?.web_menu_name_en || '',
    }
    const webMenuId = productItem.web_menu?.web_menu_id || productItem.web_menu_id || null

    setOrderItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.product_id === baseProduct.product_id && item.webMenuId === webMenuId,
      )

      if (existingIndex >= 0) {
        const updated = [...prevItems]
        const existingItem = updated[existingIndex]

        updated[existingIndex] = {
          ...existingItem,
          product: baseProduct,
          items: accessoryItems,
          category,
          webMenuId,
        }

        return updated
      }

      return [
        ...prevItems,
        {
          product: baseProduct,
          quantity: baseProduct.min_quantity || 1,
          items: accessoryItems,
          category,
          webMenuId,
        },
      ]
    })
  }

  const handleUpdateProductQuantity = (productId: string, quantity: number, webMenuId?: string | null) => {
    if (quantity < 1) return
    setOrderItems((prev) =>
      prev.map((item) =>
        item.product.product_id === productId && item.webMenuId === webMenuId ? { ...item, quantity } : item,
      ),
    )
  }

  const handleUpdateAccessoryQuantity = (
    productId: string,
    accessoryId: string,
    quantity: number,
    webMenuId?: string | null,
  ) => {
    if (quantity < 1) return

    setOrderItems((prev) =>
      prev.map((item) => {
        if (item.product.product_id !== productId || !item.items || item.webMenuId !== webMenuId) return item
        const updatedAccessories = item.items.map((accessoryItem) =>
          accessoryItem.accessory.product_id === accessoryId ? { ...accessoryItem, quantity } : accessoryItem,
        )

        return {
          ...item,
          items: updatedAccessories,
        }
      }),
    )
  }

  const handleRemoveProduct = (productId: string, webMenuId: string | null = null) => {
    setOrderItems((prev) =>
      prev.filter((item) => !(item.product.product_id === productId && item.webMenuId === webMenuId)),
    )
  }

  const handleRemoveAccessory = (productId: string, accessoryId: string) => {
    setOrderItems((prev) =>
      prev.map((item) => {
        if (item.product.product_id !== productId || !item.items) {
          return item
        }

        return {
          ...item,
          items: item.items.filter((acc) => acc.accessory.product_id !== accessoryId),
        }
      }),
    )
  }

  const validateRequest = () => {
    if (!orderItems.length) {
      toast.error(
        language === 'VN'
          ? 'Vui lòng thêm ít nhất một sản phẩm trước khi gửi yêu cầu.'
          : 'Please add at least one product before requesting a quote.',
      )
      return false
    }

    const fieldsToCheck: Array<{
      key: keyof CustomerInfoFormData
      message: string
    }> = [
      {
        key: 'company_name',
        message: language === 'VN' ? 'Vui lòng nhập tên công ty.' : 'Please enter your company name.',
      },
      {
        key: 'company_phone',
        message: language === 'VN' ? 'Vui lòng nhập số điện thoại.' : 'Please enter your phone number.',
      },
      {
        key: 'company_email',
        message: language === 'VN' ? 'Vui lòng nhập email.' : 'Please enter your email address.',
      },
      {
        key: 'contact_person',
        message: language === 'VN' ? 'Vui lòng nhập người liên hệ.' : 'Please enter the contact person.',
      },
    ]

    for (const field of fieldsToCheck) {
      if (!customerInfo[field.key]?.trim()) {
        toast.error(field.message)
        return false
      }
    }

    if (!customerInfo.company_email.trim()) {
      toast.error(language === 'VN' ? 'Email không hợp lệ.' : 'Please enter a valid email address.')
      return false
    }

    return true
  }

  const handleGetQuote = async () => {
    if (!validateRequest()) return

    const payload: CreateWebCartPayload = {
      customer_name: customerInfo.company_name,
      customer_tax_code: customerInfo.company_tax_code,
      customer_address: customerInfo.company_address,
      customer_phone: customerInfo.company_phone,
      customer_email: customerInfo.company_email,
      note: customerInfo.note,
      legal_representative: customerInfo.legal_representative,
      contact_person: customerInfo.contact_person,
      items: orderItems.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
        items: item.items?.map((item) => ({
          product_id: item.accessory.product_id,
          quantity: item.quantity,
        })),
      })),
    }
    const res = await WebCartService.createWebCart(payload)
    if (!res) {
      toast.error(language === 'VN' ? 'Nhận báo giá thất bại!' : 'Get quote failed!')
      return
    }
    if (res.status === 201) {
      toast.success(language === 'VN' ? 'Nhận báo giá thành công!' : 'Get quote success!', {
        duration: 4000,
        description:
          language === 'VN' ? 'Yêu cầu báo giá đã được gửi thành công' : 'Request quotation has been sent successfully',
        position: 'top-right',
        className: '!bg-green-500 !text-white !border-0',
        style: {
          backgroundColor: '#10b981',
          color: '#ffffff',
        },
      })
      setOrderItems([])
      setCustomerInfo({
        company_tax_code: '',
        company_name: '',
        company_phone: '',
        company_email: '',
        company_address: '',
        legal_representative: '',
        contact_person: '',
        note: '',
      })
    } else {
      toast.error(language === 'VN' ? 'Nhận báo giá thất bại!' : 'Get quote failed!', {
        duration: 2000,
        position: 'top-right',
        className: '!bg-red-500 !text-white !border-0',
        style: {
          backgroundColor: '#ef4444',
          color: '#ffffff',
        },
      })
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          {/* Left Column - Order Table and Product Table */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Order Table - Top */}
            <OrderTable
              items={orderItems}
              onUpdateProductQuantity={handleUpdateProductQuantity}
              onUpdateAccessoryQuantity={handleUpdateAccessoryQuantity}
              onRemoveProduct={handleRemoveProduct}
              onRemoveAccessory={handleRemoveAccessory}
            />

            {/* Product Table - Bottom */}
            <ProductTable products={products} onAddOrderItem={handleAddOrderItem} />
          </div>

          {/* Right Column - Customer Info */}
          <div className='lg:col-span-1 space-y-4 relative'>
            <CustomerInfo value={customerInfo} onChange={setCustomerInfo} />
            <Card className='border border-blue-100/70 bg-linear-to-br from-blue-50/60 to-white p-5 dark:border-blue-900/40 dark:from-gray-900/40 dark:to-gray-900'>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                {language === 'VN'
                  ? 'Hoàn tất thông tin và gửi yêu cầu để nhận báo giá chi tiết từ đội ngũ LABone.'
                  : 'Complete your information and submit to receive a detailed quotation from LABone.'}
              </p>
              <Button
                className='w-full gap-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer'
                onClick={handleGetQuote}
              >
                <Check className='h-4 w-4' />
                {language === 'VN' ? 'Nhận báo giá' : 'Get Quote'}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
