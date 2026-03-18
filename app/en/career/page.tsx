import CareerPageClient from '@/components/features/career/career-page-client'
import WebRecruitmentService from '@/services/web-recruitment.service'

interface GetRecruitmentsProps {
  type: string
}
async function getRecruitments({ type }: GetRecruitmentsProps) {
  try {
    const result = await WebRecruitmentService.getWebRecruitments({
      limit: 10,
      type: type,
    })
    return result
  } catch {
    return {
      data: [],
      total: 0,
      pageCurrent: 0,
      totalPage: 0,
    }
  }
}

export default async function CareerPage() {
  const normalRecruitments = await getRecruitments({ type: 'normal' })
  const hotRecruitments = await getRecruitments({ type: 'hot' })
  const internshipRecruitments = await getRecruitments({ type: 'intern' })

  return (
    <CareerPageClient
      locale='en'
      normalRecruitments={normalRecruitments}
      hotRecruitments={hotRecruitments}
      internshipRecruitments={internshipRecruitments}
    />
  )
}
