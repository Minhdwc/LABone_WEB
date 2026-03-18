'use client'

import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/store/language'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import PreviewImage from '../../custom/preview-image'
import WebMenuProductService from '@/services/web-menu-product.service'
import WebMenuProductAccessoryService from '@/services/web-menu-product-accessory.service'
import { Loader2, Search } from 'lucide-react'
import { IWebMenuProduct, IWebMenuProductAccessory } from '@/types'
import DialogAccessory from './dialog-accessory'
import { Label } from '@/components/ui/label'

interface ProductsResponsePayload {
  data: IWebMenuProduct[]
  total: number
  totalPage: number
}
interface AccessoriesResponsePayload {
  data: IWebMenuProductAccessory[]
  total: number
  totalPage: number
}

interface ProductTableProps {
  products: IWebMenuProduct[]
  onAddOrderItem: (_product: IWebMenuProduct, _accessories: IWebMenuProductAccessory[]) => void
}

const ProductTable = ({ products, onAddOrderItem }: ProductTableProps) => {
  const { language } = useLanguageStore()
  const [dataProducts, setDataProducts] = useState<IWebMenuProduct[]>(products)
  const [totalProducts, setTotalProducts] = useState(products.length)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<IWebMenuProduct | null>(null)
  const [accessories, setAccessories] = useState<IWebMenuProductAccessory[]>([])
  const [accessoriesLoading, setAccessoriesLoading] = useState(false)
  const [accessoryError, setAccessoryError] = useState<string | null>(null)
  const [accessoryDialogOpen, setAccessoryDialogOpen] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    // Chỉ fetch khi có search value
    if (!debouncedSearch || debouncedSearch.trim() === '') {
      setDataProducts([])
      setTotalProducts(0)
      setTotalPages(1)
      return
    }

    const fetchProducts = async () => {
      try {
        const response = (await WebMenuProductService.getWebMenuProducts({
          limit: itemsPerPage,
          page: currentPage - 1,
          search: debouncedSearch,
          locale: language === 'VN' ? 'vi' : 'en',
        })) as ProductsResponsePayload

        const list = response.data || []
        const total = response.total ?? list.length
        const totalPage = response.totalPage ?? 1

        setDataProducts(list)
        setTotalProducts(total)
        setTotalPages(Math.max(totalPage, 1))
      } catch {
        setDataProducts([])
        setTotalProducts(0)
        setTotalPages(1)
      }
    }
    fetchProducts()
  }, [debouncedSearch, language, itemsPerPage, currentPage])

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const handleAddProduct = async (productItem: IWebMenuProduct, rowIndex: number) => {
    const productId = productItem.product?.product_id
    if (!productId) return
    setLoadingIndex(rowIndex)
    setAccessoriesLoading(true)
    setAccessoryError(null)

    try {
      const response = (await WebMenuProductAccessoryService.getWebMenuProductAccessory({
        limit: 100,
        product_id: productId,
        web_menu_product_id: productItem.web_menu_product_id,
      })) as AccessoriesResponsePayload

      const accessoriesList = response.data || []

      setSelectedProduct(productItem)
      setAccessories(accessoriesList)
      setAccessoryError(null)
      setAccessoryDialogOpen(true)
    } catch {
      setSelectedProduct(productItem)
      setAccessories([])
      setAccessoryError(language === 'VN' ? 'Không thể tải danh sách phụ kiện.' : 'Failed to load accessories.')
      setAccessoryDialogOpen(true)
    } finally {
      setAccessoriesLoading(false)
      setLoadingIndex(null)
    }
  }

  const handleAccessoryConfirm = (productItem: IWebMenuProduct, selectedAccessories: IWebMenuProductAccessory[]) => {
    onAddOrderItem(productItem, selectedAccessories)
    handleAccessoryDialogChange(false)
  }

  const handleAccessoryDialogChange = (open: boolean) => {
    setAccessoryDialogOpen(open)
    if (!open) {
      setSelectedProduct(null)
      setAccessories([])
      setAccessoryError(null)
    }
  }
  return (
    <div className='space-y-6'>
      <Card className='bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-sm'>
        <CardHeader className='space-y-4'>
          <div>
            <CardTitle className='text-2xl font-semibold text-gray-900 dark:text-white'>
              {language === 'VN' ? 'Danh sách sản phẩm' : 'Product List'}
            </CardTitle>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {language === 'VN'
                ? 'Tìm kiếm nhanh và thêm sản phẩm vào báo giá.'
                : 'Quickly search and add products to your quote.'}
            </p>
          </div>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-end'>
            <div className='flex-1'>
              <Label
                htmlFor='product-search'
                className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'
              >
                {language === 'VN' ? 'Tìm kiếm sản phẩm' : 'Search product'}
              </Label>
              <div className='mt-1 relative flex items-center'>
                <Search className='absolute left-3 h-4 w-4 text-gray-400' />
                <Input
                  id='product-search'
                  type='text'
                  placeholder={
                    language === 'VN'
                      ? 'Nhập tên, mã sản phẩm hoặc mô tả...'
                      : 'Enter product name, code or description...'
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='pl-9 pr-3 py-5 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-gray-400'
                />
              </div>
            </div>
            <div className='flex flex-col lg:w-48'>
              <Label
                htmlFor='items-per-page'
                className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'
              >
                {language === 'VN' ? 'Số sản phẩm hiển thị' : 'Items per page'}
              </Label>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger
                  id='items-per-page'
                  className='mt-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[9, 18, 45, 90].map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option} {language === 'VN' ? 'sản phẩm / trang' : 'items / page'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!debouncedSearch || debouncedSearch.trim() === '' ? (
            <div className='text-center py-12 flex flex-col items-center gap-3'>
              <div className='h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400'>
                <Search className='h-5 w-5' />
              </div>
              <div>
                <p className='text-gray-700 dark:text-gray-200 font-medium'>
                  {language === 'VN' ? 'Vui lòng tìm kiếm sản phẩm' : 'Please search for products'}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {language === 'VN'
                    ? 'Nhập từ khóa vào ô tìm kiếm để bắt đầu.'
                    : 'Enter keywords in the search box to get started.'}
                </p>
              </div>
            </div>
          ) : dataProducts.length === 0 ? (
            <div className='text-center py-12 flex flex-col items-center gap-3'>
              <div className='h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400'>
                <Search className='h-5 w-5' />
              </div>
              <div>
                <p className='text-gray-700 dark:text-gray-200 font-medium'>
                  {language === 'VN' ? 'Không tìm thấy sản phẩm nào' : 'No products found'}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {language === 'VN'
                    ? 'Hãy thử từ khóa khác hoặc giảm bộ lọc.'
                    : 'Try another keyword or adjust your filters.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Grid Card View - Mobile & Tablet */}
              <div className='lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {dataProducts.map((product, index) => {
                  const productName =
                    language === 'VN' ? product.product?.product_name : product.product?.product_english_name

                  return (
                    <div
                      key={index}
                      className='bg-white dark:bg-gray-900/40 rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-3'
                    >
                      {/* Image and Product Info */}
                      <div className='flex gap-3'>
                        <div className='h-20 w-20 sm:h-24 sm:w-24  rounded-none border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0'>
                          {product.product?.image_url ? (
                            <PreviewImage
                              imageUrl={product.product?.image_url}
                              clsx='w-full h-full rounded-none object-cover'
                            />
                          ) : (
                            <div className='h-full w-full flex items-center justify-center text-[10px] text-gray-400'>
                              {language === 'VN' ? 'Không ảnh' : 'No image'}
                            </div>
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-sm font-semibold text-gray-900 dark:text-white break-words line-clamp-2'>
                            {productName}
                          </h3>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 break-all'>
                            {product.product?.product_id + ' / ' || '---'} {product.product?.code || '---'}
                          </p>
                        </div>
                      </div>

                      {/* Category and Unit */}
                      <div className='space-y-2'>
                        <div className='text-xs text-gray-600 dark:text-gray-400'>
                          <span className='font-medium'>{language === 'VN' ? 'Đơn vị: ' : 'Unit: '}</span>
                          <span>
                            {language === 'VN'
                              ? product.product?.unit || '---'
                              : product.product?.unit_english || '---'}
                          </span>
                        </div>
                      </div>

                      {/* Add Button */}
                      <Button
                        className='w-full cursor-pointer disabled:cursor-not-allowed'
                        variant='outline'
                        size='sm'
                        onClick={() => handleAddProduct(product, index)}
                        disabled={loadingIndex === index}
                      >
                        {loadingIndex === index ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            {language === 'VN' ? 'Đang tải...' : 'Loading...'}
                          </>
                        ) : language === 'VN' ? (
                          'Thêm'
                        ) : (
                          'Add'
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>

              {/* Table View - Desktop */}
              <div className='hidden lg:block overflow-hidden border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-gray-50/80 dark:bg-gray-800/90'>
                      <TableHead className='text-xs uppercase tracking-wide text-gray-500'>
                        {language === 'VN' ? 'STT' : 'No.'}
                      </TableHead>
                      <TableHead className='text-xs uppercase tracking-wide text-gray-500 max-w-[300px]'>
                        <div className='flex flex-col gap-0.5'>
                          <span>{language === 'VN' ? 'Tên sản phẩm' : 'Product Name'}</span>
                          <span className='text-[11px] font-normal text-gray-400'>Model / Code</span>
                        </div>
                      </TableHead>
                      <TableHead className='text-xs uppercase tracking-wide text-gray-500'>
                        {language === 'VN' ? 'Hình ảnh' : 'Image'}
                      </TableHead>
                      <TableHead className='text-xs uppercase tracking-wide text-gray-500'>
                        {language === 'VN' ? 'Đơn vị' : 'Unit'}
                      </TableHead>
                      <TableHead className='text-right text-xs uppercase tracking-wide text-gray-500'>
                        {language === 'VN' ? 'Thao tác' : 'Actions'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataProducts.map((product, index) => {
                      const productName =
                        language === 'VN' ? product.product?.product_name : product.product?.product_english_name

                      return (
                        <TableRow
                          key={index}
                          className='transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-800/60'
                        >
                          <TableCell className='font-semibold text-gray-600 dark:text-gray-300'>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </TableCell>
                          <TableCell className='max-w-lg'>
                            <div className='space-y-1'>
                              <p
                                className='text-sm font-medium text-gray-900 dark:text-white whitespace-normal'
                                title={productName}
                              >
                                {productName}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400 flex gap-2 flex-wrap'>
                                <span className='inline-flex gap-1 items-center'>
                                  {product.product?.product_id + ' / ' || '---'}
                                </span>

                                <span className='inline-flex gap-1 items-center'>{product.product?.code || '---'}</span>
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='h-16 w-16 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800'>
                              {product.product?.image_url ? (
                                <PreviewImage
                                  imageUrl={product.product?.image_url}
                                  clsx='w-full h-full rounded-none object-cover'
                                />
                              ) : (
                                <div className='h-full w-full flex items-center justify-center text-[11px] text-gray-400'>
                                  {language === 'VN' ? 'Không ảnh' : 'No image'}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {language === 'VN' ? product.product?.unit : product.product?.unit_english || '---'}
                          </TableCell>
                          <TableCell className='text-right'>
                            <Button
                              className='cursor-pointer disabled:cursor-not-allowed'
                              variant='outline'
                              size='sm'
                              onClick={() => handleAddProduct(product, index)}
                              disabled={loadingIndex === index}
                            >
                              {loadingIndex === index ? (
                                <>
                                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                  {language === 'VN' ? 'Đang tải...' : 'Loading...'}
                                </>
                              ) : language === 'VN' ? (
                                'Thêm'
                              ) : (
                                'Add'
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    {language === 'VN' ? `${totalProducts} sản phẩm` : `${totalProducts} products`}
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className='px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      {language === 'VN' ? 'Trước' : 'Previous'}
                    </button>
                    <span className='px-3 py-1 text-sm'>
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className='px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      {language === 'VN' ? 'Sau' : 'Next'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <DialogAccessory
        language={language}
        selectedProduct={selectedProduct}
        accessories={accessories}
        accessoriesLoading={accessoriesLoading}
        isOpen={accessoryDialogOpen}
        onOpenChange={handleAccessoryDialogChange}
        onConfirm={handleAccessoryConfirm}
      />
    </div>
  )
}

export default ProductTable
