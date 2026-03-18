'use client'

import Link from 'next/link'
import { useLanguageStore } from '@/store/language'

export default function NotFound() {
  const { language } = useLanguageStore()

  const contentNotFound = {
    title: language === 'VN' ? 'Trang không tồn tại' : "This page doesn't exist",
    message:
      language === 'VN'
        ? 'Trang bạn tìm có thể đã bị di chuyển hoặc không còn. Quay về trang chủ để tiếp tục.'
        : "The page you're looking for may have been moved or no longer exists. Head back to continue.",
    cta: language === 'VN' ? 'Quay về trang chủ' : 'Back to home',
  }

  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden bg-background'>
      {/* Atmospheric background: gradient mesh + subtle grain */}
      <div className='pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.25]' aria-hidden>
        <div className='absolute -left-[40%] -top-[20%] h-[80vmin] w-[80vmin] rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute -bottom-[30%] -right-[20%] h-[70vmin] w-[70vmin] rounded-full bg-primary/[0.07] blur-3xl dark:bg-primary/10' />
        <div
          className='absolute inset-0 opacity-[0.015] dark:opacity-[0.03]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <main className='relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center'>
        {/* Large display "404" with staggered fade-in */}
        <div className='flex items-baseline justify-center gap-1 sm:gap-2'>
          <span
            className='animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-[clamp(5rem,18vw,12rem)] font-extrabold tracking-tighter text-foreground/90 duration-700 ease-out'
            style={{ animationDelay: '0ms', animationFillMode: 'both' }}
          >
            4
          </span>
          <span
            className='animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-[clamp(5rem,18vw,12rem)] font-extrabold tracking-tighter text-primary duration-700 ease-out'
            style={{ animationDelay: '80ms', animationFillMode: 'both' }}
          >
            0
          </span>
          <span
            className='animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-[clamp(5rem,18vw,12rem)] font-extrabold tracking-tighter text-foreground/90 duration-700 ease-out'
            style={{ animationDelay: '160ms', animationFillMode: 'both' }}
          >
            4
          </span>
        </div>

        {/* Content block: asymmetric feel with max-width and spacing */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4 mt-8 flex max-w-md flex-col items-center gap-6 duration-700 ease-out sm:mt-10'
          style={{ animationDelay: '280ms', animationFillMode: 'both' }}
        >
          <h1 className='text-xl font-semibold tracking-tight text-foreground sm:text-2xl'>{contentNotFound.title}</h1>
          <p className='text-muted-foreground text-base leading-relaxed sm:text-lg'>{contentNotFound.message}</p>

          <Link
            href={language === 'VN' ? '/' : '/en/home'}
            className='group relative mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]'
          >
            {contentNotFound.cta}
            <span className='inline-block transition-transform duration-200 group-hover:translate-x-0.5' aria-hidden>
              →
            </span>
          </Link>
        </div>

        {/* Decorative line for spatial interest */}
        <div
          className='animate-in fade-in mt-16 h-px w-24 rounded-full bg-border duration-700 ease-out sm:mt-20'
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
          aria-hidden
        />
      </main>
    </div>
  )
}
