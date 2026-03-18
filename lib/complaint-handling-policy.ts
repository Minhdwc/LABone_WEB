export interface ComplaintPolicyItem {
  id: number
  title: string
}

export interface ComplaintHandlingPolicyContent {
  title: string
  items: ComplaintPolicyItem[]
}

export const complaintHandlingPolicyVN: ComplaintHandlingPolicyContent = {
  title: 'Chính sách xử lý khiếu nại',
  items: [
    {
      id: 1,
      title: 'Tiếp nhận mọi khiếu nại của khách hàng liên quan đến việc sử dụng dịch vụ của công ty.',
    },
    {
      id: 2,
      title: 'Tất cả mọi trường hợp bảo hành, quý khách có thể liên hệ với chúng tôi để làm thủ tục bảo hành.',
    },
    {
      id: 3,
      title:
        'Thời gian giải quyết khiếu nại trong thời hạn tối đa là 03 (ba) ngày làm việc kể từ khi nhận được khiếu nại của khách hàng. Trong trường hợp bất khả kháng 2 bên sẽ tự thương lượng.',
    },
  ],
}

export const complaintHandlingPolicyEN: ComplaintHandlingPolicyContent = {
  title: 'Complaint Handling Policy',
  items: [
    {
      id: 1,
      title: "We accept all customer complaints related to the use of the company's services.",
    },
    {
      id: 2,
      title: 'For all warranty cases, customers can contact us to proceed with warranty procedures.',
    },
    {
      id: 3,
      title:
        "Complaint resolution time is a maximum of 03 (three) working days from the date of receiving the customer's complaint. In case of force majeure, both parties will negotiate.",
    },
  ],
}
