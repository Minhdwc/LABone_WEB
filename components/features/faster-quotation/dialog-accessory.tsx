'use client'

import { useEffect, useState } from 'react'

import PreviewImage from '../../custom/preview-image'
import { Loader2, PackageCheck } from 'lucide-react'
import { IWebMenuProduct, IWebMenuProductAccessory } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface DialogAccessoryProps {
  language: string
  selectedProduct: IWebMenuProduct | null
  accessories: IWebMenuProductAccessory[]
  accessoriesLoading: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (product: IWebMenuProduct, selectedAccessories: IWebMenuProductAccessory[]) => void
}

export default function DialogAccessory({
  language,
  selectedProduct,
  accessories,
  accessoriesLoading,
  isOpen,
  onOpenChange,
  onConfirm,
}: DialogAccessoryProps) {
  const dialogOpen = isOpen && !!selectedProduct
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<Array<number | string>>([])

  useEffect(() => {
    if (!dialogOpen) return
    setTimeout(() => {
      setSelectedAccessoryIds([])
    }, 0)
  }, [selectedProduct?.web_menu_product_id, dialogOpen])

  const toggleAccessory = (accessoryId: number | string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(accessoryId) ? prev.filter((id) => id !== accessoryId) : [...prev, accessoryId],
    )
  }

  const handleConfirm = () => {
    if (!selectedProduct) return

    const selectedAccessories = accessories.filter((accessory) =>
      selectedAccessoryIds.includes(accessory.accessory_product_id),
    )

    onConfirm(selectedProduct, selectedAccessories)
    onOpenChange(false)
  }

  if (!selectedProduct) {
    if (dialogOpen) {
      onOpenChange(false)
    }
    return null
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl space-y-4'>
        <DialogHeader>
          <DialogTitle className='text-base font-semibold'>
            {language === 'VN' ? 'Danh sách phụ kiện' : 'Accessories list'}
          </DialogTitle>
          <DialogDescription>
            {language === 'VN'
              ? 'Chọn phụ kiện để thêm vào danh sách báo giá'
              : 'Pick the accessories to add to your quotation list'}
          </DialogDescription>
        </DialogHeader>

        {accessoriesLoading ? (
          <div className='flex items-center gap-3 rounded-md border border-dashed border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
            <Loader2 className='h-4 w-4 animate-spin text-gray-400' />
            {language === 'VN' ? 'Đang tải danh sách phụ kiện...' : 'Loading accessories...'}
          </div>
        ) : accessories.length === 0 ? (
          <div className='flex flex-col items-center gap-3 rounded-md border border-dashed border-gray-200 px-10 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400'>
            <PackageCheck className='h-8 w-8 text-gray-300' />
            <p>
              {language === 'VN'
                ? 'Không tìm thấy phụ kiện phù hợp cho sản phẩm này.'
                : 'No suitable accessories found for this product.'}
            </p>
          </div>
        ) : (
          <div className='rounded-md border border-gray-100 dark:border-gray-800'>
            {selectedAccessoryIds && selectedAccessoryIds.length > 0 && (
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {language === 'VN'
                  ? `Đã chọn ${selectedAccessoryIds.length} phụ kiện`
                  : `Selected ${selectedAccessoryIds.length} accessories`}
              </span>
            )}
            <div className='max-h-[360px] space-y-3 overflow-auto p-3'>
              {accessories.map((accessory) => {
                const accessoryProduct = accessory.accessory_product
                const accessoryName =
                  language === 'VN' ? accessoryProduct?.product_name : accessoryProduct?.product_english_name

                return (
                  <div
                    key={accessory.web_menu_product_accesory_id}
                    className='flex flex-col gap-3 rounded-md border border-gray-100 bg-white/70 p-4 text-sm shadow-sm dark:border-gray-800 dark:bg-gray-900/40 sm:flex-row sm:items-center'
                  >
                    <div className='flex flex-1 cursor-pointer  items-center gap-3'>
                      <Checkbox
                        aria-label={language === 'VN' ? 'Chọn phụ kiện' : 'Select accessory'}
                        checked={selectedAccessoryIds.includes(accessory.accessory_product_id)}
                        onCheckedChange={() => toggleAccessory(accessory.accessory_product_id)}
                        className='mt-1 shrink-0'
                      />
                      <div className='h-14 w-14 shrink-0 overflow-hidden rounded border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/60'>
                        {accessoryProduct?.image_url ? (
                          <PreviewImage
                            imageUrl={accessoryProduct.image_url}
                            clsx='w-full h-16 object-cover rounded-none'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center text-[10px] text-gray-400'>
                            {language === 'VN' ? 'Không ảnh' : 'No image'}
                          </div>
                        )}
                      </div>
                      <div className='space-y-1'>
                        <p className='font-medium text-gray-900 dark:text-gray-50'>{accessoryName}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {accessoryProduct?.product_id} / {accessoryProduct?.code || '---'}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 sm:flex-col sm:items-end sm:text-sm'>
                      <span className='uppercase tracking-wide text-gray-400 dark:text-gray-500'>
                        {language === 'VN' ? 'Đơn vị' : 'Unit'}
                      </span>
                      <span className='font-medium text-gray-700 dark:text-gray-200'>
                        {language === 'VN' ? accessoryProduct?.unit : accessoryProduct?.unit_english}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <DialogFooter className='justify-end'>
          <Button className='cursor-pointer' onClick={handleConfirm} disabled={accessoriesLoading}>
            {language === 'VN' ? 'Xác nhận' : 'Confirm'}
          </Button>
          <Button className='cursor-pointer' variant='outline' onClick={() => onOpenChange(false)}>
            {language === 'VN' ? 'Đóng' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
