'use client'

import { useLanguageStore } from '@/store/language'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart-provider'
import { OrderInfoFormData } from './order-info-form'
import WebCartService, { CreateWebCartPayload } from '@/services/web-cart.service'
import { toast } from 'sonner'
interface OrderSummaryCardProps {
  totalProducts: number
  totalItems: number
  customerInfo: OrderInfoFormData
}
export function OrderSummaryCard({ totalProducts, totalItems, customerInfo }: OrderSummaryCardProps) {
  const { language } = useLanguageStore()
  const { cart, clearCart } = useCart()
  const handleBuy = async () => {
    const payload: CreateWebCartPayload = {
      customer_name: customerInfo.company_name,
      customer_tax_code: customerInfo.tax_code,
      customer_address: customerInfo.company_address,
      customer_phone: customerInfo.company_phone,
      customer_email: customerInfo.company_email,
      note: customerInfo.note,
      legal_representative: customerInfo.legal_representative,
      contact_person: customerInfo.contact_person,
      items: cart.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
        items:
          item.items?.map((item) => ({
            product_id: item.accessory.product_id,
            quantity: item.quantity,
          })) || [],
      })),
    }
    const res = await WebCartService.createWebCart(payload)
    if (!res) {
      toast.error(language === 'VN' ? 'Đặt hàng thất bại!' : 'Order failed!')
      return
    }
    if (res.status === 201) {
      toast.success(language === 'VN' ? 'Đặt hàng thành công!' : 'Order success!', {
        duration: 4000,
        position: 'top-right',
        className: '!bg-green-500 !text-white !border-0',
        style: {
          backgroundColor: '#10b981',
          color: '#ffffff',
        },
      })
      clearCart()
    } else {
      toast.error(language === 'VN' ? 'Đặt hàng thất bại!' : 'Order failed!', {
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
    <Card className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 lg:sticky lg:top-8'>
      <CardHeader>
        <CardTitle className='text-xl font-bold text-gray-900 dark:text-white'>
          {language === 'VN' ? 'Tổng hợp đơn hàng' : 'Order Summary'}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>
              {language === 'VN' ? 'Số lượng sản phẩm' : 'Total Products'}:
            </span>
            <span className='font-semibold text-gray-900 dark:text-white'>{totalProducts}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>
              {language === 'VN' ? 'Số lượng phụ kiện' : 'Total Accessories'}:
            </span>
            <span className='font-semibold text-gray-900 dark:text-white'>{totalItems}</span>
          </div>
        </div>

        <Separator />

        <div className='pt-2'>
          <Button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            size='lg'
            onClick={handleBuy}
          >
            {language === 'VN' ? 'Đặt hàng' : 'Buy Now'}
          </Button>
        </div>

        <div
          onClick={() => {
            window.location.href = language === 'VN' ? '/vi/danh-muc-san-pham' : '/en/product-categories'
          }}
          className='block cursor-pointer'
        >
          <Button
            variant='outline'
            className='w-full border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
          >
            {language === 'VN' ? 'Tiếp tục mua sắm' : 'Continue Shopping'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
