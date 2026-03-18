import LabAcademyDetail from '@/components/features/lab-academy'
import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'

// Map Vietnamese type slug to API type
function getTypeFromSlug(typeSlug: string): string | null {
  if (!typeSlug || typeof typeSlug !== 'string') {
    return null
  }
  const normalizedSlug = typeSlug.toLowerCase()

  // Map Vietnamese slugs
  if (normalizedSlug === 'dao-tao') {
    return 'training'
  }
  if (normalizedSlug === 'thao-luan-truc-tuyen') {
    return 'webinars'
  }
  if (normalizedSlug === 'bai-viet-khoa-hoc') {
    return 'post'
  }
  return null
}

async function getLabAcademyPostsByType(type: string) {
  try {
    const result = await WebLabAcademyPostService.getAllWebLabAcademyPosts({
      type,
    })
    return result || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  } catch {
    return { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  }
}

interface PageProps {
  params: Promise<{ type: string }>
}

export default async function TrainingEducationTypePage({ params }: PageProps) {
  const { type: typeSlug } = await params
  const apiType = getTypeFromSlug(typeSlug)

  if (!apiType) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Không tìm thấy</h1>
          <p className='text-gray-600'>Loại đào tạo bạn tìm không tồn tại.</p>
        </div>
      </div>
    )
  }

  const labAcademyPosts = await getLabAcademyPostsByType(apiType)

  return <LabAcademyDetail labAcademy={labAcademyPosts} type={apiType as 'training' | 'webinars'} />
}
