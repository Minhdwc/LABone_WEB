'use client'
import React, { useState } from 'react'
import { IRecruitmentApply } from '@/types'
import WebRecruitmentApplyService from '@/services/web-recruitment-apply.service'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface RecruitmentApplyFormProps {
  recruitmentId: string
  locale: string
}

const formSchema = z.object({
  recruitment_id: z.string().optional(),
  email: z.string().min(1, { message: 'Email không được để trống' }).email({ message: 'Email không hợp lệ' }),
  full_name: z.string().min(1, { message: 'Tên không được để trống' }),
  phone: z.string().min(1, { message: 'Số điện thoại không được để trống' }),
  file_cv_url: z.string().optional(),
  note: z.string().optional(),
  status: z.string(),
  createdAt: z.date().optional(),
})

type FormValues = z.infer<typeof formSchema>

export const RecruitmentApplyForm = ({ recruitmentId, locale }: RecruitmentApplyFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recruitment_id: recruitmentId,
      email: '',
      full_name: '',
      phone: '',
      file_cv_url: '',
      note: '',
      status: 'pending',
      createdAt: new Date(),
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type (PDF, DOC, DOCX)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        locale === 'vi' ? 'Chỉ chấp nhận file PDF, DOC hoặc DOCX' : 'Only PDF, DOC or DOCX files are allowed',
        {
          description: locale === 'vi' ? file.name + ' không đúng định dạng' : file.name + ' is not the correct format',
          className: '!bg-red-500 !text-white !border-0',
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
          },
          position: 'top-right',
          duration: 1500,
        },
      )
      e.target.value = ''
      return
    }

    if (file.size > maxSize) {
      toast.error(locale === 'vi' ? 'Kích thước file không được vượt quá 5MB' : 'File size must not exceed 5MB', {
        description: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        className: '!bg-red-500 !text-white !border-0',
        style: {
          backgroundColor: '#ef4444',
          color: '#ffffff',
        },
        position: 'top-right',
        duration: 1500,
      })
      e.target.value = '' // Reset input
      return
    }

    setSelectedFile(file)
  }

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      // Validate file is selected
      if (!selectedFile) {
        toast.error(locale === 'vi' ? 'Vui lòng chọn file CV' : 'Please select a CV file', {
          description: locale === 'vi' ? 'Vui lòng chọn file CV' : 'Please select a CV file',
          duration: 1500,
          className: '!bg-red-500 !text-white !border-0',
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
          },
          position: 'top-right',
        })
        setIsLoading(false)
        return
      }
      const formData = new FormData()
      formData.append('file', selectedFile)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const uploadResult = await uploadResponse.json()

      if (!uploadResult.success) {
        toast.error(locale === 'vi' ? 'Upload file CV thất bại' : 'Upload CV file failed', {
          description: selectedFile?.name + ' upload thất bại',
          className: '!bg-red-500 !text-white !border-0',
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
          },
          position: 'top-right',
          duration: 1500,
        })
        setIsLoading(false)
        return
      }

      const fileUrl = uploadResult.filePath

      const payload: IRecruitmentApply = {
        recruitment_id: recruitmentId,
        email: values.email,
        full_name: values.full_name,
        phone: values.phone,
        file_cv_url: fileUrl,
        note: values.note || '',
        status: 'pending',
      }

      await WebRecruitmentApplyService.createRecruitmentApply(payload)

      toast.success(
        locale === 'vi'
          ? 'Ứng tuyển thành công! Cảm ơn bạn đã quan tâm.'
          : 'Application submitted successfully! Thank you for your interest.',
        {
          description:
            locale === 'vi'
              ? 'Ứng tuyển thành công! Cảm ơn bạn đã quan tâm.'
              : 'Application submitted successfully! Thank you for your interest.',
          duration: 1500,
          className: '!bg-green-500 !text-white !border-0',
          style: {
            backgroundColor: '#10b981',
            color: '#ffffff',
          },
          position: 'top-right',
        },
      )

      form.reset({
        recruitment_id: recruitmentId,
        email: '',
        full_name: '',
        phone: '',
        file_cv_url: '',
        note: '',
        status: 'pending',
        createdAt: new Date(),
      })
      setSelectedFile(null)
      setOpen(false) // Đóng dialog sau khi submit thành công
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : locale === 'vi'
            ? 'Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại.'
            : 'An error occurred while submitting your application. Please try again.'
      toast.error(errorMessage, {
        duration: 1500,
        className: '!bg-red-500 !text-white !border-0',
        style: {
          backgroundColor: '#ef4444',
          color: '#ffffff',
        },
        position: 'top-right',
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-auto cursor-pointer hover:bg-blue-600 hover:text-white'>
          {locale === 'vi' ? 'Ứng tuyển' : 'Apply'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>
            {locale === 'vi' ? 'Ứng tuyển việc làm này' : 'Apply this job'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium text-red-500'>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder={locale === 'vi' ? 'Nhập email' : 'Enter email'}
                        className='h-10'
                        autoFocus
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium text-red-500'>{locale === 'vi' ? 'Tên*' : 'Name*'}</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder={locale === 'vi' ? 'Nhập tên' : 'Enter name'}
                        className='h-10'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium text-red-500'>
                      {locale === 'vi' ? 'Số điện thoại*' : 'Phone number*'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder={locale === 'vi' ? 'Nhập số điện thoại' : 'Enter phone number'}
                        className='h-10'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='file_cv_url'
                render={() => (
                  <FormItem>
                    <FormLabel className='font-medium text-red-500'>File CV*</FormLabel>
                    <FormControl>
                      <div className='space-y-2'>
                        <Input
                          type='file'
                          accept='.pdf,.doc,.docx'
                          onChange={handleFileChange}
                          className='h-10 cursor-pointer'
                          disabled={isLoading}
                        />
                        {selectedFile && (
                          <div className='text-sm text-gray-600 flex items-center gap-2'>{selectedFile.name}</div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className='text-xs text-gray-500 mt-1'>
                      {locale === 'vi'
                        ? 'Chấp nhận file PDF, DOC, DOCX (tối đa 5MB)'
                        : 'Accept PDF, DOC, DOCX files (max 5MB)'}
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium'>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={locale === 'vi' ? 'Nhập ghi chú' : 'Enter note'}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type='submit'
              className='w-full mt-4 cursor-pointer hover:bg-blue-600 hover:text-white'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  {locale === 'vi' ? 'Đang xử lý...' : 'Processing...'}
                </div>
              ) : locale === 'vi' ? (
                'Ứng tuyển'
              ) : (
                'Apply'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
