import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'
import LabAcademyPostDetail from '@/components/features/lab-academy/training-education/detail-post'

// Extract slug from URL path array (get last element)
function getSlug(slugArray: string | string[]): string {
  if (Array.isArray(slugArray)) {
    return slugArray[slugArray.length - 1] || ''
  }
  return slugArray || ''
}

async function getLabAcademyPostBySlug(slug: string) {
  try {
    const result = await WebLabAcademyPostService.getWebLabAcademyPostBySlug(slug, 'vi')
    return result || null
  } catch {
    return null
  }
}

interface PageProps {
  params: Promise<{ type: string; slug: string | string[] }>
}

export default async function LabAcademyPostSlugPage({ params }: PageProps) {
  const { slug } = await params
  const extractedSlug = getSlug(slug)

  const labAcademyPost = await getLabAcademyPostBySlug(extractedSlug)
  if (!labAcademyPost) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Không tìm thấy</h1>
          <p className='text-gray-600'>Bài viết bạn tìm không tồn tại.</p>
        </div>
      </div>
    )
  }

  return <LabAcademyPostDetail post={labAcademyPost} />
}
