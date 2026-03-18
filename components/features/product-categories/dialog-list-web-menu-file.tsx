import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { IWebMenu, IWebMenuFile } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import WebMenuFileService from '@/services/web-menu-file.service'
import { Badge } from '@/components/ui/badge'
import { useLanguageStore } from '@/store/language'
import CustomPagination from '@/components/custom/pagination/custom-pagination'

interface DialogListWebMenuFileProps {
  webMenuFile: IWebMenu
  type: string
}

const DialogListWebMenuFile = ({ webMenuFile, type }: DialogListWebMenuFileProps) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<IWebMenuFile[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const language = useLanguageStore()
  useEffect(() => {
    const fetchData = async () => {
      const response = await WebMenuFileService.getAllWebMenuFileWeb(webMenuFile.web_menu_id, type, limit, page)

      const items = response.data
      setData(items || [])
      setTotal(response.total)
      setTotalPages(response.totalPage)
    }
    fetchData()
  }, [type, webMenuFile.web_menu_id, limit, page])

  const pageCurrent = page + 1
  const title = type === 'brochure' ? 'Brochure' : 'Catalogue'
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray hover:bg-blue-50 cursor-pointer text-sm sm:text-base'
        >
          <span>{title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-lg sm:max-w-3xl lg:max-w-5xl max-h-[90vh] overflow-y-auto px-3 sm:px-6 py-4 sm:py-6'>
        <DialogHeader className='border-b pb-3 sm:pb-4'>
          <DialogTitle className='text-base sm:text-lg font-semibold'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <span className='truncate'>{title}</span>
              <Badge className='bg-blue-500 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5'>
                {total} {language.language === 'VN' ? 'tài liệu' : 'documents'}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='flex-1 overflow-auto bg-muted/20 px-2 sm:px-4 pt-3 sm:pt-4'>
          {/* Desktop / Tablet: Table view */}
          <div className='hidden md:block'>
            <div className='bg-white shadow-sm overflow-hidden rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[64px] text-center'>File</TableHead>
                    <TableHead className='max-w-[200px] text-center'>
                      {language.language === 'VN' ? 'Tên file' : 'File Name'}
                    </TableHead>
                    <TableHead className='max-w-[100px] text-center'>
                      {language.language === 'VN' ? 'Ngôn ngữ' : 'Language'}
                    </TableHead>
                    <TableHead className='max-w-[200px] text-center'>
                      {language.language === 'VN' ? 'Model | Sản phẩm' : 'Model | Product'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className='py-8 text-center text-sm text-muted-foreground'>
                        Không có dữ liệu tài liệu cho mục này.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((webMenuFile: IWebMenuFile) => (
                      <TableRow key={webMenuFile.web_menu_file_id} className='transition-colors hover:bg-muted/40'>
                        <TableCell>
                          <div className='flex items-center gap-3 min-w-0'>
                            <a
                              href={`/file/${webMenuFile.slug}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='cursor-pointer shrink-0'
                            >
                              <div className='flex h-8 w-8 items-center justify-center rounded bg-blue-600 transition-colors hover:bg-blue-700'>
                                <FileText className='h-4 w-4 text-white' />
                              </div>
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`/file/${webMenuFile.slug}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='line-clamp-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline'
                          >
                            {webMenuFile.folderFileProduct?.folder_file_product_name ?? 'Không có tên file'}
                          </a>
                        </TableCell>
                        <TableCell>
                          <span className='inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700'>
                            {language.language === 'VN'
                              ? webMenuFile.locale === 'vi'
                                ? 'Tiếng Việt'
                                : 'Tiếng Anh'
                              : webMenuFile.locale === 'vi'
                                ? 'Vietnamese'
                                : 'English'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {webMenuFile.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct?.product
                            ?.code
                            ? `${webMenuFile.folderFileProduct.folderProduct.folderLevelProduct.folderMainProduct.product.code} | `
                            : ''}
                          {language.language === 'VN'
                            ? webMenuFile.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct
                                ?.product?.product_name
                            : webMenuFile.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct
                                ?.product?.product_english_name}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile: Card view */}
          <div className='md:hidden space-y-3'>
            {data.length === 0 ? (
              <div className='text-center py-8 text-gray-500 text-sm'>
                {language.language === 'VN' ? 'Không có dữ liệu tài liệu cho mục này.' : 'No documents found.'}
              </div>
            ) : (
              data.map((file) => (
                <div
                  key={file.web_menu_file_id}
                  className='border border-gray-200 rounded-lg p-4 bg-white hover:border-blue-300 transition-colors'
                >
                  <div className='flex items-start gap-3'>
                    <a
                      href={`/file/${file.slug}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='shrink-0 cursor-pointer'
                    >
                      <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors'>
                        <FileText className='w-5 h-5 text-white' />
                      </div>
                    </a>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2'>
                        {file.folderFileProduct?.folder_file_product_name ?? 'Không có tên file'}
                      </h3>
                      <div className='flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600'>
                        <div className='flex items-center gap-1.5'>
                          <span className='font-medium'>{language.language === 'VN' ? 'Ngôn ngữ:' : 'Language:'}</span>
                          <span>
                            {language.language === 'VN'
                              ? file.locale === 'vi'
                                ? 'Tiếng Việt'
                                : 'Tiếng Anh'
                              : file.locale === 'vi'
                                ? 'Vietnamese'
                                : 'English'}
                          </span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <span className='font-medium'>{language.language === 'VN' ? 'Sản phẩm:' : 'Product:'}</span>
                          <span className='line-clamp-2'>
                            {language.language === 'VN'
                              ? file.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct?.product
                                  ?.product_name
                              : file.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct?.product
                                  ?.product_english_name}
                          </span>
                        </div>
                        {file.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct?.product
                          ?.code && (
                          <div className='flex items-center gap-1.5'>
                            <span className='font-medium'>Model:</span>
                            <span className='line-clamp-2'>
                              {
                                file.folderFileProduct?.folderProduct?.folderLevelProduct?.folderMainProduct?.product
                                  ?.code
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='flex items-center justify-center pt-2'>
            <CustomPagination
              page={page}
              setPage={setPage}
              pageCurrent={pageCurrent}
              totalPages={totalPages}
              limit={limit}
              setLimit={setLimit}
              pageViewOptions='even'
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogListWebMenuFile
