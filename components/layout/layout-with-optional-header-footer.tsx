'use client'

import { usePathname } from 'next/navigation'
import Header from './header'
import Footer from './footer'

const PREVIEW_PATH_PREFIX = '/preview'

export default function LayoutWithOptionalHeaderFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPreview = pathname?.startsWith(PREVIEW_PATH_PREFIX)

  if (isPreview) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main id='main-content' role='main'>
        {children}
      </main>
      <Footer />
    </>
  )
}
