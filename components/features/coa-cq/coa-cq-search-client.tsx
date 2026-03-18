'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ICoaProductFile } from '@/types'
import WebCoaProductFileService from '@/services/web-coa-product-file.service'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomPagination from '@/components/custom/pagination/custom-pagination'
import { EyeIcon, Search } from 'lucide-react'
import { toast } from 'sonner'

interface CoaCqSearchClientProps {
  locale: 'vi' | 'en'
}

export default function CoaCqSearchClient({ locale }: CoaCqSearchClientProps) {
  const [coaProductFiles, setCoaProductFiles] = useState<ICoaProductFile[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const formSchema = z.object({
    productKey: z.string().min(1, {
      message: locale === 'vi' ? 'Key sản phẩm là bắt buộc' : 'Product key is required',
    }),
    lotNumber: z.string().min(1, {
      message: locale === 'vi' ? 'Mã lô là bắt buộc' : 'Lot number is required',
    }),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productKey: '',
      lotNumber: '',
    },
  })

  const handleSearch = async (values: FormValues) => {
    setLoading(true)
    setHasSearched(true)
    setPage(0)
    try {
      const response = await WebCoaProductFileService.getWebCoaProductFile({
        limit,
        page: 0,
        production_batch_id: values.lotNumber,
        product_version_id: values.productKey,
      })
      if (!response) {
        toast.error(locale === 'vi' ? 'Lỗi khi tìm kiếm COA, CQ' : 'Error searching COA, CQ')
        setCoaProductFiles([])
        setTotal(0)
        return
      }
      if (response.status === 200 && response.data.data.length > 0) {
        setCoaProductFiles(response.data.data)
        setTotal(response.data.total)
        toast.success(locale === 'vi' ? 'Tìm kiếm COA, CQ thành công' : 'Search COA, CQ successful', {
          duration: 1500,
          position: 'top-right',
          className: '!bg-green-500 !text-white !border-0',
          style: {
            backgroundColor: '#10b981',
            color: '#ffffff',
          },
        })
      } else {
        toast.error(locale === 'vi' ? 'Không tìm thấy chứng nhận chất lượng' : 'No quality certificate found', {
          duration: 1500,
          description:
            locale === 'vi'
              ? 'Vui lòng kiểm tra lại key sản phẩm và mã lô và thử lại'
              : 'Please check the product key and lot number again',
          position: 'top-right',
          className: '!bg-red-500 !text-white !border-0',
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
          },
        })
        setCoaProductFiles([])
        setTotal(0)
      }
    } catch {
      toast.error(locale === 'vi' ? 'Lỗi khi tìm kiếm COA, CQ' : 'Error searching COA, CQ')
      setCoaProductFiles([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
            {locale === 'vi' ? 'Tìm kiếm COA, CQ' : 'COA/CQ Search'}
          </h1>
          <p className='text-gray-600 text-sm sm:text-base'>
            {locale === 'vi' ? 'Tìm kiếm chứng chỉ chất lượng sản phẩm' : 'Search for product quality certificates'}
          </p>
        </div>

        {/* Search Form */}
        <Card className='bg-white shadow-sm border border-gray-200 rounded-lg'>
          <CardContent className='p-6 sm:p-8'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSearch)} className='space-y-6'>
                <FormField
                  control={form.control}
                  name='productKey'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium text-gray-900 mb-2 block'>
                        {locale === 'vi' ? 'Model | Code sản phẩm' : 'Model | Product Code'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder={locale === 'vi' ? 'Nhập model | code sản phẩm' : 'Enter model | product code'}
                          className='w-full h-12 text-base border-0 border-b-2 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 transition-colors bg-transparent px-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm mt-1' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lotNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium text-gray-900 mb-2 block'>
                        {locale === 'vi' ? 'Lot | Số seri' : 'Lot | Serial Number'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder={locale === 'vi' ? 'Nhập lot | số seri' : 'Enter lot | serial number'}
                          className='w-full h-12 text-base border-0 border-b-2 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 transition-colors bg-transparent px-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm mt-1' />
                    </FormItem>
                  )}
                />
                <div className='pt-2'>
                  <Button
                    type='submit'
                    disabled={loading || form.watch('productKey') === '' || form.watch('lotNumber') === ''}
                    className='w-full h-12 text-base font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-all duration-200  flex items-center justify-center gap-2 cursor-pointer'
                  >
                    {loading ? (
                      <>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>{locale === 'vi' ? 'Đang tìm kiếm...' : 'Searching...'}</span>
                      </>
                    ) : (
                      <>
                        <Search className='w-5 h-5' />
                        <span>{locale === 'vi' ? 'Tìm kiếm' : 'Search'}</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className='mt-8 max-w-4xl mx-auto'>
          {coaProductFiles.length > 0 ? (
            <>
              <div className='mb-4'>
                <p className='text-sm text-gray-600'>
                  {locale === 'vi' ? `Tìm thấy ${total} kết quả` : `Found ${total} result${total !== 1 ? 's' : ''}`}
                </p>
              </div>
              <div className='space-y-3'>
                {coaProductFiles.map((file) => (
                  <Card
                    key={file.coa_product_file_id}
                    className='bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
                  >
                    <CardContent className='p-5 sm:p-6'>
                      <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-lg font-semibold text-gray-900 mb-2 wrap-break-word'>{file.file_name}</h3>
                          {file.description && (
                            <p className='text-sm text-gray-600 mb-3 line-clamp-2'>{file.description}</p>
                          )}
                          {file.coaProduct && (
                            <div className='flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500 mt-3'>
                              <div>
                                <span className='font-medium text-gray-700'>
                                  {locale === 'vi' ? 'Phiên bản:' : 'Version:'}{' '}
                                </span>
                                <span>{file.coaProduct.product_version_id}</span>
                              </div>
                              <div>
                                <span className='font-medium text-gray-700'>
                                  {locale === 'vi' ? 'Lô sản xuất:' : 'Batch:'}{' '}
                                </span>
                                <span>{file.coaProduct.production_batch_id}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <Link href={`/file/${file.coa_product_file_id}`} passHref>
                          <Button
                            variant='outline'
                            className='flex items-center gap-2 shrink-0 border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-colors'
                          >
                            <EyeIcon className='w-4 h-4' />
                            <span>{locale === 'vi' ? 'Xem' : 'View'}</span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {total > 0 && (
                <div className='mt-6'>
                  <CustomPagination
                    pageViewOptions='even'
                    page={page}
                    setPage={setPage}
                    pageCurrent={page + 1}
                    totalPages={Math.ceil(total / limit)}
                    limit={limit}
                    setLimit={setLimit}
                  />
                </div>
              )}
            </>
          ) : (
            <Card className='bg-white shadow-sm border border-gray-200'>
              <CardContent className='p-12 text-center'>
                <div className='max-w-md mx-auto'>
                  <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Search className='w-8 h-8 text-gray-400' />
                  </div>
                  <p className='text-lg font-medium text-gray-900 mb-2'>
                    {locale === 'vi' ? 'Không tìm thấy kết quả' : 'No results found'}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {locale === 'vi'
                      ? 'Vui lòng thử lại với thông tin khác'
                      : 'Please try again with different information'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
