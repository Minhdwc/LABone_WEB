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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useLanguageStore } from '@/store/language'
import { IProduct } from '@/types'

interface DialogRemoveProductProps {
  product: IProduct
  accessory?: IProduct | null
  onConfirm: () => void
  trigger: React.ReactNode
}

export default function DialogRemoveProduct({ product, accessory, onConfirm, trigger }: DialogRemoveProductProps) {
  const { language } = useLanguageStore()
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {accessory
              ? language === 'VN'
                ? 'Xác nhận xóa phụ kiện'
                : 'Confirm Remove Accessory'
              : language === 'VN'
                ? 'Xác nhận xóa sản phẩm'
                : 'Confirm Remove Product'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {accessory
              ? language === 'VN'
                ? `Bạn có chắc chắn muốn xóa phụ kiện "${accessory.product_name}" khỏi sản phẩm "${product.product_name}"?`
                : `Are you sure you want to remove accessory "${accessory.product_english_name || accessory.product_name}" from product "${product.product_english_name || product.product_name}"?`
              : language === 'VN'
                ? `Bạn có chắc chắn muốn xóa "${product.product_name}" khỏi giỏ hàng?`
                : `Are you sure you want to remove "${product.product_english_name || product.product_name}" from your cart?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>{language === 'VN' ? 'Hủy' : 'Cancel'}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className='bg-red-600 hover:bg-red-700 text-white cursor-pointer'>
            {language === 'VN' ? 'Xóa' : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
