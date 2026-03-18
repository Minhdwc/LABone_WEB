'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useLanguageStore } from '@/store/language'
import { IProduct } from '@/types'
import { useCart } from '@/context/cart-provider'
import { toast } from 'sonner'

interface DialogAddAccessoryProps {
  product: IProduct // Sản phẩm cha
  accessory: IProduct // Phụ kiện
  quantity: number // Số lượng phụ kiện
  trigger: React.ReactNode
}

export default function DialogAddAccessory({ product, accessory, quantity, trigger }: DialogAddAccessoryProps) {
  const { language } = useLanguageStore()
  const { cart, addToCart, addAccessoryToProduct } = useCart()
  const [showWarningDialog, setShowWarningDialog] = useState(false)

  const productName = language === 'VN' ? product.product_name : product.product_english_name || product.product_name

  const accessoryName =
    language === 'VN' ? accessory.product_name : accessory.product_english_name || accessory.product_name

  // Xử lý khi click trigger
  const handleTriggerClick = () => {
    // Kiểm tra sản phẩm cha có trong giỏ hàng không
    const parentProductInCart = cart.some((item) => item.product.product_id === product.product_id)

    if (!parentProductInCart) {
      // Nếu chưa có -> hiện dialog cảnh báo
      setShowWarningDialog(true)
    } else {
      // Nếu đã có -> thêm accessory vào product
      handleAddAccessoryToExistingProduct()
    }
  }

  // Thêm accessory vào product đã có trong giỏ
  const handleAddAccessoryToExistingProduct = () => {
    const success = addAccessoryToProduct(product.product_id, accessory, quantity)

    if (success) {
      toast.success(language === 'VN' ? 'Thêm phụ kiện thành công' : 'Accessory added successfully', {
        description: `${accessoryName} (x${quantity})`,
        className: '!bg-green-500 !text-white !border-0',
        style: {
          backgroundColor: '#10b981',
          color: '#ffffff',
        },
        position: 'top-right',
      })
    }
  }
  //Xác nhận thêm sản phẩm và phụ kiện
  const handleConfirmAddBoth = () => {
    // Thêm product (quantity = 1) + accessory (quantity = quantity)
    addToCart(product, 1, [{ accessory, quantity }])

    toast.success(
      language === 'VN' ? 'Thêm sản phẩm và phụ kiện thành công' : 'Product and accessory added successfully',
      {
        description: `${productName} + ${accessoryName} (x${quantity})`,
        className: '!bg-green-500 !text-white !border-0',
        style: {
          backgroundColor: '#10b981',
          color: '#ffffff',
        },
        position: 'top-right',
      },
    )

    setShowWarningDialog(false)
  }

  return (
    <>
      {/* Trigger để mở dialog */}
      <div onClick={handleTriggerClick}>{trigger}</div>

      {/* Dialog cảnh báo khi product chưa có trong giỏ */}
      <AlertDialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'VN' ? 'Sản phẩm chưa có trong giỏ hàng' : 'Product not in cart'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'VN' ? (
                <>
                  Sản phẩm <strong>&quot;{productName}&quot;</strong> chưa có trong giỏ hàng. Bạn có muốn thêm sản phẩm
                  và phụ kiện <strong>&quot;{accessoryName}&quot;</strong> vào giỏ hàng không?
                </>
              ) : (
                <>
                  Product <strong>&quot;{productName}&quot;</strong> is not in your cart. Do you want to add both the
                  product and accessory <strong>&quot;{accessoryName}&quot;</strong> to your cart?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='cursor-pointer'>{language === 'VN' ? 'Hủy' : 'Cancel'}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAddBoth}
              className='bg-green-600 hover:bg-green-700 text-white cursor-pointer'
            >
              {language === 'VN' ? 'Thêm tất cả vào giỏ hàng' : 'Add All to Cart'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
