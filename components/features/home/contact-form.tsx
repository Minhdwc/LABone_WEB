'use client'

import { useForm } from 'react-hook-form'
import { useLanguageStore } from '@/store/language'
import { contactFormVN, contactFormEN } from '@/lib/containts'
import { companyInfo } from '@/lib/company-contants'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MapPin, Phone, Mail } from 'lucide-react'

type FormValues = {
  name: string
  email: string
  phone: string
  content: string
}

export default function ContactForm() {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? contactFormVN : contactFormEN

  // Google Maps URLs
  const mapAddress = encodeURIComponent(
    language === 'VN' ? content.contactInfo.address.titleMap : content.contactInfo.address.value,
  )
  const mapIframeUrl = `https://www.google.com/maps?q=${mapAddress}&output=embed`
  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapAddress}`
  const mapViewUrl = `https://www.google.com/maps/search/?api=1&query=${mapAddress}`

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      content: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    form.reset()
  }

  return (
    <div className='min-h-screen bg-blue-50 py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-bold text-blue-600 mb-3'>{content.title}</h1>
          <p className='text-base text-gray-600 max-w-3xl mx-auto leading-relaxed'>{content.description}</p>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
          {/* Contact Form */}
          <div className='space-y-6'>
            <Card className='bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 rounded-lg'>
              <CardContent className='p-6'>
                {/* Form Header */}
                <div className='mb-6 border-b-2 border-blue-100'>
                  <h2 className='text-lg font-bold text-gray-900'>
                    {language === 'VN' ? 'Gửi Tin Nhắn' : 'Send Message'}
                  </h2>
                  <p className='text-sm text-gray-600 mt-1'>
                    {language === 'VN'
                      ? 'Vui lòng điền thông tin để chúng tôi liên hệ với bạn'
                      : 'Please fill in the information so we can contact you'}
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name='name'
                      rules={{
                        required: language === 'VN' ? 'Vui lòng nhập tên của bạn' : 'Please enter your name',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-900 font-semibold text-sm'>
                            {content.form.name.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={content.form.name.placeholder}
                              className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name='email'
                      rules={{
                        required: language === 'VN' ? 'Vui lòng nhập email của bạn' : 'Please enter your email',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-900 font-semibold text-sm'>
                            {content.form.email.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder={content.form.email.placeholder}
                              className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Field */}
                    <FormField
                      control={form.control}
                      name='phone'
                      rules={{
                        required: language === 'VN' ? 'Vui lòng nhập số điện thoại' : 'Please enter your phone number',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-900 font-semibold text-sm'>
                            {content.form.phone.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='tel'
                              placeholder={content.form.phone.placeholder}
                              className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message Field */}
                    <FormField
                      control={form.control}
                      name='content'
                      rules={{
                        required: language === 'VN' ? 'Vui lòng nhập nội dung tin nhắn' : 'Please enter your message',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-900 font-semibold text-sm'>
                            {content.form.content.label}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={content.form.content.placeholder}
                              rows={5}
                              className=' border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type='submit'
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-base mt-2 cursor-pointer'
                    >
                      {content.form.submitButton}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <Card className='bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 rounded-lg'>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  {/* Map Header */}
                  <div className='border-b-2 border-blue-100'>
                    <h3 className='font-bold text-gray-900 text-lg'>{content.map.title}</h3>
                  </div>

                  {/* Google Maps Embed */}
                  <div className='w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
                    <iframe
                      src={mapIframeUrl}
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                      className='w-full h-full'
                      title={content.map.title}
                    />
                  </div>

                  {/* Map Actions */}
                  <div className='flex items-center justify-center gap-4 pt-3 border-t border-gray-200'>
                    <a
                      href={mapDirectionsUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors hover:underline'
                    >
                      {content.map.directions}
                    </a>
                    <span className='text-gray-300'>•</span>
                    <a
                      href={mapViewUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors hover:underline'
                    >
                      {content.map.viewLarger}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            {/* Contact Information Cards */}
            <div className='space-y-8'>
              {/* Vietnam Office Section */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 pb-3 border-b-2 border-blue-600'>
                  <h2 className='text-xl font-bold text-gray-900'>
                    {language === 'VN' ? 'LABone tại Việt Nam' : 'LABone in Vietnam'}
                  </h2>
                </div>

                <Card className='bg-gradient-to-br from-blue-50 to-white shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-all rounded-lg'>
                  <CardContent className='p-6 space-y-4'>
                    {/* Company Name Header */}
                    <div className='pb-4 border-b-2 border-blue-200'>
                      <h3 className='text-blue-700 font-bold text-lg uppercase tracking-wide'>{companyInfo.name.vi}</h3>
                    </div>

                    {/* Address */}
                    <div className='flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50/50 transition-colors'>
                      <div className='shrink-0 mt-1'>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                          <MapPin className='h-5 w-5 text-blue-600' />
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 mb-1.5 text-sm'>
                          {content.contactInfo.address.title}
                        </h4>
                        <p className='text-gray-600 text-sm leading-relaxed'>{companyInfo.address.vi.name}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className='flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50/50 transition-colors'>
                      <div className='shrink-0 mt-1'>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                          <Phone className='h-5 w-5 text-blue-600' />
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 mb-1.5 text-sm'>
                          {content.contactInfo.hotline.title}
                        </h4>
                        <a
                          href={`tel:${companyInfo.phone.vi.replace(/\s/g, '')}`}
                          className='text-blue-600 text-base hover:text-blue-700 transition-colors inline-block font-semibold hover:underline'
                        >
                          {companyInfo.phone.vi}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className='flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50/50 transition-colors'>
                      <div className='shrink-0 mt-1'>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                          <Mail className='h-5 w-5 text-blue-600' />
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 mb-1.5 text-sm'>
                          {content.contactInfo.email.title}
                        </h4>
                        <a
                          href={`mailto:${companyInfo.email.vi.trim()}`}
                          className='text-blue-600 text-sm hover:text-blue-700 transition-colors inline-block break-all font-medium hover:underline'
                        >
                          {companyInfo.email.vi}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* US Office Section */}
              <div className='space-y-4 pt-2'>
                <div className='flex items-center gap-2 pb-3 border-b-2 border-green-600'>
                  <h2 className='text-xl font-bold text-gray-900'>
                    {language === 'VN' ? 'LABone tại Hoa Kỳ' : 'LABone in USA'}
                  </h2>
                </div>

                <Card className='bg-gradient-to-br from-green-50 to-white shadow-md border-l-4 border-green-600 hover:shadow-lg transition-all rounded-lg'>
                  <CardContent className='p-6 space-y-4'>
                    {/* Company Name Header */}
                    <div className='pb-4 border-b-2 border-green-200'>
                      <h3 className='text-green-700 font-bold text-lg uppercase tracking-wide'>
                        {companyInfo.name.en}
                      </h3>
                    </div>

                    {/* Address */}
                    <div className='flex items-start gap-4 p-3 rounded-lg hover:bg-green-50/50 transition-colors'>
                      <div className='shrink-0 mt-1'>
                        <div className='p-2 bg-green-100 rounded-lg'>
                          <MapPin className='h-5 w-5 text-green-600' />
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 mb-1.5 text-sm'>
                          {content.contactInfo.address.title}
                        </h4>
                        <p className='text-gray-600 text-sm leading-relaxed'>{companyInfo.address.en.name}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className='flex items-start gap-4 p-3 rounded-lg hover:bg-green-50/50 transition-colors'>
                      <div className='shrink-0 mt-1'>
                        <div className='p-2 bg-green-100 rounded-lg'>
                          <Phone className='h-5 w-5 text-green-600' />
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 mb-1.5 text-sm'>
                          {content.contactInfo.hotline.title}
                        </h4>
                        <a
                          href={`tel:${companyInfo.phone.en.replace(/\s/g, '').replace('+', '')}`}
                          className='text-green-600 text-base hover:text-green-700 transition-colors inline-block font-semibold hover:underline'
                        >
                          {companyInfo.phone.en}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className='flex items-start gap-4 p-3 rounded-lg hover:bg-green-50/50 transition-colors'>
                      <div className='shrink-0 mt-1'>
                        <div className='p-2 bg-green-100 rounded-lg'>
                          <Mail className='h-5 w-5 text-green-600' />
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 mb-1.5 text-sm'>
                          {content.contactInfo.email.title}
                        </h4>
                        <a
                          href={`mailto:${companyInfo.email.en.trim()}`}
                          className='text-green-600 text-sm hover:text-green-700 transition-colors inline-block break-all font-medium hover:underline'
                        >
                          {companyInfo.email.en}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
