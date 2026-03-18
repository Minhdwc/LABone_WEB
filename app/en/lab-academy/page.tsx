import LabAcademyDetail from '@/components/features/lab-academy'
import WebLabAcademyPostService from '@/services/web-lab-academy-post.service'

async function getLabAcademyPosts() {
  try {
    const result = await WebLabAcademyPostService.getAllWebLabAcademyPosts()
    return result || { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  } catch {
    return { data: [], total: 0, pageCurrent: 1, totalPage: 0 }
  }
}

export default async function LabAcademyPage() {
  const labAcademyPosts = await getLabAcademyPosts()

  return <LabAcademyDetail labAcademy={labAcademyPosts} />
}
