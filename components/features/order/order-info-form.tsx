'use client'

import { useLanguageStore } from '@/store/language'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export interface OrderInfoFormData {
  tax_code: string
  company_name: string
  company_address: string
  company_phone: string
  company_email: string
  legal_representative: string
  contact_person: string
  note: string
}

interface OrderInfoFormProps {
  value: OrderInfoFormData
  onChange: (_formValue: OrderInfoFormData) => void
  onSubmit?: (_formValue: OrderInfoFormData) => void
}

export function OrderInfoForm({ value, onChange, onSubmit }: OrderInfoFormProps) {
  const { language } = useLanguageStore()

  const handleSearchInfo = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    const taxId = value.tax_code
    if (!taxId || taxId.trim() === '') {
      toast.error('Vui lòng nhập mã số thuế trước khi tra cứu!')
      return
    }
    try {
      const apiQuery = process.env.NEXT_PUBLIC_QR_INFORMATION_API_URL
      const response = await fetch(`${apiQuery}${taxId.trim()}`)
      const result = await response.json()
      if (result.code === '00') {
        onChange({
          ...value,
          company_name: result.data.name || '',
          company_address: result.data.address || '',
        })
        toast.success('Tra cứu thông tin thành công!')
      } else {
        toast.error('Không tìm thấy thông tin doanh nghiệp!')
      }
    } catch {
      toast.error('Không thể tra cứu thông tin. Vui lòng thử lại.')
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(value)
  }

  return (
    <Card className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
      <CardHeader>
        <CardTitle className='text-xl font-bold text-gray-900 dark:text-white'>
          {language === 'VN' ? 'Thông tin đặt hàng' : 'Order Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Mã số thuế / Tax ID */}
          {language === 'VN' && (
            <div className='space-y-2'>
              <Label htmlFor='taxId' className='text-sm font-medium'>
                Mã số thuế
              </Label>
              <div className='flex gap-2'>
                <Input
                  id='taxId'
                  type='text'
                  value={value.tax_code}
                  onChange={(e) => onChange({ ...value, tax_code: e.target.value })}
                  placeholder={language === 'VN' ? 'Nhập mã số thuế' : 'Enter tax ID'}
                  required
                />
                <Button type='button' onClick={handleSearchInfo} className='cursor-pointer min-w-[110px]'>
                  {language === 'VN' ? 'Tra cứu' : 'Lookup'}
                </Button>
              </div>
            </div>
          )}

          {/* Tên công ty / Company Name */}
          <div className='space-y-2'>
            <Label htmlFor='companyName' className='text-sm font-medium'>
              {language === 'VN' ? 'Tên công ty' : 'Company Name'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Input
              id='companyName'
              type='text'
              value={value.company_name}
              onChange={(e) => onChange({ ...value, company_name: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập tên công ty' : 'Enter company name'}
              required
            />
          </div>
          {/* Địa chỉ / Address */}
          <div className='space-y-2'>
            <Label htmlFor='company_address' className='text-sm font-medium'>
              {language === 'VN' ? 'Địa chỉ' : 'Address'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Textarea
              id='company_address'
              value={value.company_address}
              onChange={(e) => onChange({ ...value, company_address: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập địa chỉ công ty' : 'Enter company address'}
              rows={3}
              required
            />
          </div>
          {/* Người đại diện pháp luật / Legal Representative */}
          <div className='space-y-2'>
            <Label htmlFor='legal_representative' className='text-sm font-medium'>
              {language === 'VN' ? 'Người đại diện pháp luật' : 'Legal Representative'}
            </Label>
            <Input
              id='legal_representative'
              type='text'
              value={value.legal_representative}
              onChange={(e) => onChange({ ...value, legal_representative: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập người đại diện pháp luật' : 'Enter legal representative'}
              required
            />
          </div>
          {/* Người liên hệ / Contact Person */}
          <div className='space-y-2'>
            <Label htmlFor='contact_person' className='text-sm font-medium'>
              {language === 'VN' ? 'Người liên hệ' : 'Contact Person'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Input
              id='contact_person'
              type='text'
              value={value.contact_person}
              onChange={(e) => onChange({ ...value, contact_person: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập người liên hệ' : 'Enter contact person'}
              required
            />
          </div>
          {/* Số điện thoại / Phone */}
          <div className='space-y-2'>
            <Label htmlFor='company_phone' className='text-sm font-medium'>
              {language === 'VN' ? 'Số điện thoại' : 'Phone Number'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Input
              id='company_phone'
              type='tel'
              value={value.company_phone}
              onChange={(e) => onChange({ ...value, company_phone: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập số điện thoại' : 'Enter phone number'}
              required
            />
          </div>

          {/* Email */}
          <div className='space-y-2'>
            <Label htmlFor='company_email' className='text-sm font-medium'>
              {language === 'VN' ? 'Email' : 'Email'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Input
              id='company_email'
              type='email'
              value={value.company_email}
              onChange={(e) => onChange({ ...value, company_email: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập email' : 'Enter email'}
              required
            />
          </div>
          {/* Địa chỉ / Address */}
          <div className='space-y-2'>
            <Label htmlFor='company_address' className='text-sm font-medium'>
              {language === 'VN' ? 'Địa chỉ' : 'Address'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Textarea
              id='company_address'
              value={value.company_address}
              onChange={(e) => onChange({ ...value, company_address: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập địa chỉ công ty' : 'Enter company address'}
              rows={3}
              required
            />
          </div>
          {/* Người đại diện pháp luật / Legal Representative */}
          <div className='space-y-2'>
            <Label htmlFor='legal_representative' className='text-sm font-medium'>
              {language === 'VN' ? 'Người đại diện pháp luật' : 'Legal Representative'}
            </Label>
            <Input
              id='legal_representative'
              type='text'
              value={value.legal_representative}
              onChange={(e) => onChange({ ...value, legal_representative: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập người đại diện pháp luật' : 'Enter legal representative'}
              required
            />
          </div>
          {/* Người liên hệ / Contact Person */}
          <div className='space-y-2'>
            <Label htmlFor='contact_person' className='text-sm font-medium'>
              {language === 'VN' ? 'Người liên hệ' : 'Contact Person'}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            <Input
              id='contact_person'
              type='text'
              value={value.contact_person}
              onChange={(e) => onChange({ ...value, contact_person: e.target.value })}
              placeholder={language === 'VN' ? 'Nhập người liên hệ' : 'Enter contact person'}
              required
            />
          </div>

          {/* Ghi chú / Note */}
          <div className='space-y-2'>
            <Label htmlFor='company_note' className='text-sm font-medium'>
              {language === 'VN' ? 'Ghi chú' : 'Note'}
            </Label>
            <Textarea
              id='company_note'
              value={value.note}
              onChange={(e) => onChange({ ...value, note: e.target.value })}
              placeholder={language === 'VN' ? 'Ghi chú thêm (nếu có)' : 'Additional notes (optional)'}
              rows={3}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
