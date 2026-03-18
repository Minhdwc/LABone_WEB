// Data cho trang Training & Education dựa trên menu config
export interface TrainingCard {
  id: number
  title_vn: string
  title_en: string
  description_vn: string
  description_en: string
  image: string
  href_vn: string
  href_en: string
  fallbackColor: string
}

export const trainingEducationCards: TrainingCard[] = [
  {
    id: 1,
    title_vn: 'Đào tạo',
    title_en: 'Training',
    description_vn:
      'Tham gia các buổi đào tạo và hội thảo trực tuyến được tổ chức tại khu vực của bạn với các chuyên gia địa phương',
    description_en: 'Join training sessions and webinars hosted in your region with local experts',
    image: '/assets/training/training.webp',
    href_vn: '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc/dao-tao',
    href_en: '/en/lab-academy/education-and-training/training',
    fallbackColor: 'bg-blue-100',
  },
  {
    id: 2,
    title_vn: 'Thảo luận trực tuyến',
    title_en: 'Webinars',
    description_vn:
      'Tham gia các hội thảo trực tuyến toàn cầu với các chuyên gia hàng đầu thế giới về nhiều chủ đề khoa học',
    description_en: 'Participate in global webinars with leading world experts on various scientific topics',
    image: '/assets/training/webinar.jpg',
    href_vn: '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc/thao-luan-truc-tuyen',
    href_en: '/en/lab-academy/education-and-training/webinars',
    fallbackColor: 'bg-purple-100',
  },
  {
    id: 3,
    title_vn: 'Bài viết khoa học',
    title_en: 'Scientific Articles',
    description_vn:
      'Tổng hợp các bài viết, báo cáo, bài báo nghiên cứu khoa học về các chủ đề khoa học của các chuyên gia hàng đầu thế giới',
    description_en:
      'Summarize scientific articles, reports, research papers on various scientific topics from leading world experts',
    image: '/assets/training/post.jpg',
    href_vn: '/vi/khoa-hoc-va-dao-tao/dao-tao-va-giao-duc/bai-viet-khoa-hoc',
    href_en: '/en/lab-academy/education-and-training/post',
    fallbackColor: 'bg-green-100',
  },
]

// Content cho hero section
export const trainingEducationContent = {
  vn: {
    title: 'Đào tạo và Giáo dục',
    description: `<p>
      Trung tâm Đào tạo <strong>Labone</strong> đã và đang cung cấp các chương trình đào tạo chuyên sâu, 
      chất lượng cao nhằm đáp ứng nhu cầu ngày càng đa dạng của khách hàng trong lĩnh vực phòng thí nghiệm 
      và phân tích khoa học. Với đội ngũ chuyên gia giàu kinh nghiệm thực tiễn, Labone mang đến các khóa học 
      hàng đầu về thiết bị, quy trình và phương pháp ứng dụng trong nhiều lĩnh vực nghiên cứu khác nhau.
    </p>

    <p>
      Tất cả các khóa học của Labone được xây dựng và triển khai dựa trên nhu cầu thực tế của khách hàng, 
      kết hợp giữa nền tảng lý thuyết vững chắc và nội dung cập nhật liên tục theo những tiến bộ mới nhất 
      của khoa học – công nghệ. Chương trình đào tạo được thiết kế linh hoạt, tập trung vào khả năng ứng dụng, 
      giúp học viên nhanh chóng nâng cao kỹ năng và hiệu quả làm việc trong phòng thí nghiệm.
    </p>

    <p>
      Labone tổ chức đào tạo theo mô hình <strong>nhóm nhỏ</strong> nhằm đảm bảo sự tương tác tối ưu, 
      hướng dẫn sát sao và đủ thời gian thực hành cho từng học viên. Sau khi hoàn thành khóa học, 
      học viên sẽ nhận được <strong>chứng nhận từ Labone</strong> như một minh chứng cho năng lực 
      và sự tham gia thành công của mình.
    </p>

    <p>
      Hãy cùng <strong>Labone</strong> chuẩn bị vững vàng cho các tiêu chuẩn chất lượng cao 
      trong phòng thí nghiệm của bạn.
    </p>`,
  },
  en: {
    title: 'Education and Training',
    description: `<p>
  The <strong>Labone Training Center</strong> has been providing in-depth, high-quality training programs 
  to meet the increasingly diverse needs of customers in the fields of laboratory work and scientific analysis. 
  With a team of highly experienced professionals, Labone delivers leading courses on equipment, procedures, 
  and application methods across various research areas.
</p>

<p>
  All Labone courses are developed and implemented based on real customer needs, 
  combining a solid theoretical foundation with continuously updated content that reflects 
  the latest advancements in science and technology. The training programs are designed to be flexible 
  and application-focused, enabling participants to quickly enhance their skills and improve efficiency 
  in laboratory operations.
</p>

<p>
  Labone organizes training in <strong>small groups</strong> to ensure optimal interaction, 
  close guidance, and sufficient hands-on practice time for each participant. Upon completing the course, 
  participants will receive a <strong>certificate from Labone</strong> as proof of their competence 
  and successful participation.
</p>

<p>
  Join <strong>Labone</strong> and be well prepared to meet the high-quality standards 
  of your laboratory.
</p>
`,
  },
}

export const trainingEducationDetailContent = {
  vn: {
    title: 'Đào tạo',
    description: `<p>
      LABone cung cấp các chương trình đào tạo chuyên sâu, chất lượng cao nhằm đáp ứng nhu cầu ngày càng đa dạng của khách hàng trong lĩnh vực phòng thí nghiệm và phân tích khoa học.
    </p>
    <p>
      Labone tổ chức đào tạo theo mô hình <strong>nhóm nhỏ</strong> nhằm đảm bảo sự tương tác tối ưu, 
      hướng dẫn sát sao và đủ thời gian thực hành cho từng học viên.
    </p>
  `,
    image: '/assets/training/training.webp',
  },
  en: {
    title: 'Training',
    description: `<p>
      LABone provides in-depth, high-quality training programs to meet the increasingly diverse needs of customers in the fields of laboratory work and scientific analysis.
    </p>
    <p>
      Labone organizes training in <strong>small groups</strong> to ensure optimal interaction, 
      close guidance, and sufficient hands-on practice time for each participant.
    </p>
  `,
    image: '/assets/training/training.webp',
  },
}

export const webinarsDetailContent = {
  vn: {
    title: 'Thảo luận trực tuyến',
    description: `<p>LABone kết hợp với các chuyên gia hàng đầu thế giới để tổ chức các hội thảo trực tuyến toàn cầu, 
    giúp khách hàng học hỏi và trao đổi kinh nghiệm với các chuyên gia hàng đầu thế giới.</p>`,
    image: '/assets/training/webinar.jpg',
  },
  en: {
    title: 'Webinars',
    description: `<p>LABone collaborates with leading world experts to organize global webinars, 
    help customers learn and exchange experiences with leading world experts.</p>`,
    image: '/assets/training/webinar.jpg',
  },
}

export const postDetailContent = {
  vn: {
    title: 'Bài viết khoa học',
    description: `<p>LABone chia sẻ các bài viết khoa học, tài liệu chuyên ngành và kiến thức thực tiễn về thiết bị phòng thí nghiệm, quy trình phân tích và ứng dụng trong lĩnh vực dược phẩm, vi sinh, hóa học.</p>
    <p>Nội dung được biên soạn bởi đội ngũ chuyên gia, giúp bạn cập nhật xu hướng, nâng cao kỹ năng và áp dụng hiệu quả vào công việc hàng ngày.</p>`,
    image: '/assets/training/post.jpg',
  },
  en: {
    title: 'Scientific Articles',
    description: `<p>LABone shares scientific articles, technical documents and practical knowledge on laboratory equipment, analytical procedures and applications in pharmaceuticals, microbiology and chemistry.</p>
    <p>Content is prepared by our expert team to help you stay updated on trends, improve your skills and apply knowledge effectively in your daily work.</p>`,
    image: '/assets/training/post.jpg',
  },
}
