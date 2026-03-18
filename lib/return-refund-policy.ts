export interface ReturnCondition {
  id: number
  title: string
}

export interface ReturnRefundPolicyContent {
  title: string
  returnConditions: {
    title: string
    intro: string
    conditions: ReturnCondition[]
    note: string
  }
  regulations: {
    title: string
    notificationTime: {
      title: string
      description: string
    }
    sendBackTime: {
      title: string
      description: string
    }
    returnLocation: {
      title: string
      description: string
    }
    contactNote: string
  }
}

export const returnRefundPolicyVN: ReturnRefundPolicyContent = {
  title: 'Chính sách đổi trả và hoàn tiền',
  returnConditions: {
    title: '1. Điều kiện đổi trả',
    intro:
      'Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:',
    conditions: [
      {
        id: 1,
        title: 'Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.',
      },
      {
        id: 2,
        title: 'Không đủ số lượng, không đủ bộ như trong đơn hàng.',
      },
      {
        id: 3,
        title: 'Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…',
      },
    ],
    note: 'Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.',
  },
  regulations: {
    title: '2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả',
    notificationTime: {
      title: 'Thời gian thông báo đổi trả:',
      description:
        'trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.',
    },
    sendBackTime: {
      title: 'Thời gian gửi chuyển trả sản phẩm:',
      description: 'trong vòng 14 ngày kể từ khi nhận sản phẩm.',
    },
    returnLocation: {
      title: 'Địa điểm đổi trả sản phẩm:',
      description:
        'Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.',
    },
    contactNote:
      'Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.',
  },
}

export const returnRefundPolicyEN: ReturnRefundPolicyContent = {
  title: 'Return and Refund Policy',
  returnConditions: {
    title: '1. Return Conditions',
    intro:
      'Customers need to check the condition of the goods and can exchange/return goods immediately at the time of delivery/receipt in the following cases:',
    conditions: [
      {
        id: 1,
        title:
          'Goods are not of the correct type, model as ordered or as shown on the website at the time of ordering.',
      },
      {
        id: 2,
        title: 'Insufficient quantity, incomplete set as in the order.',
      },
      {
        id: 3,
        title: 'External condition affected such as torn packaging, peeling, breakage…',
      },
    ],
    note: 'Customers are responsible for presenting relevant documents proving the aforementioned shortcomings to complete the return/exchange of goods.',
  },
  regulations: {
    title: '2. Regulations on notification time and sending returned products',
    notificationTime: {
      title: 'Return notification time:',
      description: 'within 48 hours from receiving the product for cases of missing accessories, gifts, or breakage.',
    },
    sendBackTime: {
      title: 'Time to send back returned products:',
      description: 'within 14 days from receiving the product.',
    },
    returnLocation: {
      title: 'Product return location:',
      description: 'Customers can bring the goods directly to our office/store or send them via postal service.',
    },
    contactNote:
      'In case customers have comments/complaints related to product quality, please contact our customer service hotline.',
  },
}
