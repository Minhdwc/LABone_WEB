export interface IBrand {
  brand_id: string
  brand_name: string
  brand_english_name: string
  description: string
  features: string[]
  color: string
  sampleImage: string
  logoImage: string
}

export interface IProduct {
  product_id: string
  product_old_id: string
  product_name: string
  product_english_name: string
  description: string
  english_description: string
  link_url: string
  image_url: string
  is_active: boolean
  property: string
  code: string
  unit: string
  unit_english?: string
  min_quantity: number
  product_group_id: string
  productGroup?: {
    product_group_name: string
  }
  packaging_specification?: string // Qui cách đóng gói
  packaging_specification_english?: string // Qui cách đóng gói english
  supply_standard?: string // Tiêu chuẩn cung cấp
  supply_standard_english?: string // Tiêu chuẩn cung cấp english
  specification?: string // Thông só kỹ thuật
  specification_english?: string // Thông só kỹ thuật english
  createdAt: Date
  updatedAt: Date
  cost: number
  account_id: string
  account?: {
    name: string
  }
  productFiles: IProductFile[]

  totalCloseStock: number
  warehouseProducts: IWarehouseProduct[]
  productVersions: IProductVersion[]
}
export interface IProductVersion {
  product_version_id: string
  product_id: string
  product_old_id?: string
  product_name: string
  product_english_name?: string
  description?: string
  english_description?: string
  packaging_specification?: string
  supply_standard?: string
  packaging_specification_english?: string
  supply_standard_english?: string
  link_url?: string
  image_url?: string
  property?: string
  code?: string
  unit?: string
  unit_english?: string
  min_quantity: number
  is_active: boolean
  account_id?: string
  product_group_id?: string
  createdAt: Date
  updatedAt: Date
}
export interface IWarehouseProduct {
  seri_product_id: string
  product_id: string
  product?: {
    product_name: string
    unit: string
    min_quantity: number
  }
  open_stock: number
  close_stock: number
  import_quantity: number
  export_quantity: number
  expired_date: Date
  is_active: boolean
  createdAt: Date
  updatedAt: Date
}
export interface IFolderFileProduct {
  folder_file_product_id: string
  folder_file_product_name: string
  description?: string
  is_public: boolean
  file_url: string
  account_id: string
  folder_product_id: string
  is_approved: boolean
  account?: {
    name?: string
  }
  createdAt?: Date
  updatedAt?: Date
  folderProduct?: {
    folderLevelProduct?: {
      folderMainProduct?: {
        product?: IProduct
      }
    }
  }
}

export interface IProductFile {
  product_file_id: string
  folder_file_product_id: string
  product_id: string
  folderFileProduct?: IFolderFileProduct
  description?: string
  type: string
  locale: string
  slug: string
  product?: {
    product_name: string
    product_english_name?: string
    code: string
  }
}
export interface IWebMenuProduct {
  web_menu_product_id: string
  product_id: string
  web_menu_id: string
  slug_vn: string
  slug_en: string
  product?: IProduct
  web_menu?: IWebMenu
  is_featured: boolean
  is_on_sale: boolean
  is_new: boolean
  productFiles?: IProductFile[]
  sale_tag?: string
  webMenuProductAccesories?: IWebMenuProductAccessory[]
}

export interface IWebMenu {
  web_menu_id: string
  web_menu_name_vn: string
  web_menu_name_en: string
  level: number
  web_parent_id?: string
  description_vn?: string
  description_en?: string
  image_url?: string
  banner_url?: string
  parent?: {
    web_parent_id: string
    web_parent_name_vn: string
    web_parent_name_en: string
  }
  type?: string
  children?: IWebMenu[]
  webMenuProducts?: IWebMenuProduct[]
  webUsageProducts?: IWebMenuProductUsage[]
  childrenPagination?: {
    total: number
    pageCurrent: number
    totalPage: number
    limitChildren: number
  }
  menuSelectedData?: IWebMenu
  is_leaf: boolean
  slug_vn: string
  slug_en: string
  createdAt: Date
  updatedAt: Date
}

export interface IWebMenuFile {
  web_menu_file_id: string
  folder_file_product_id: string
  web_menu_id: string
  type: string
  locale: string
  slug: string
  createdAt: Date
  updatedAt: Date
  webMenu: IWebMenu
  folderFileProduct?: IFolderFileProduct
}

export interface IWebMenuProductUsage {
  web_usage_product_id: string
  web_menu_id: string
  web_menu?: IWebMenu
  web_menu_product_id: string
  WebMenuProduct?: IWebMenuProduct
}
export interface IWebMenuProductAccessory {
  web_menu_product_accesory_id: string
  web_menu_product_id: string
  web_menu_product?: IWebMenuProduct
  accessory_product_id: string
  accessory_product?: IProduct
}
export interface ICartAccessoryItem {
  accessory: IProduct
  quantity: number
}

export interface ICartItem {
  product: IProduct
  quantity: number
  items?: ICartAccessoryItem[]
}

export interface ICart {
  customer_name: string
  customer_tax_code?: string
  customer_address?: string
  customer_phone?: string
  customer_email: string
  legal_representative?: string
  contact_person?: string
  note?: string
  status?: string
  createdAt: Date
  items?: ICartItem[]
}

export interface IWebNew {
  new_id: string
  title_vn: string
  title_en: string
  content_vn: string
  content_en: string
  short_content_vn: string
  short_content_en: string
  type: string
  main_image_url: string
  slug_vn: string
  slug_en: string
  createdAt: Date
  updatedAt: Date
}

export interface IWebEvent {
  event_id: string
  organization_logo_url: string
  topic_vn: string
  topic_en: string
  time_start: Date
  time_end: Date
  organization_name_vn: string
  organization_name_en: string
  booth_number_vn: string
  booth_number_en: string
  event_location_vn: string
  event_location_en: string
  organization_website: string
  createdAt: Date
  updatedAt: Date
  account_id: string
  account?: {
    name: string
  }
}

export interface ILevel {
  level_id: string
  level_name: string
  salary: number
}

export interface IRecruitment {
  recruitment_id: string
  title: string
  title_en: string
  position: string
  position_en: string
  quantity: number
  level_id: string
  job_type: string
  job_type_en: string
  location: string
  location_en: string
  salary: string
  salary_en: string
  description: string
  description_en: string
  requirement: string
  requirement_en: string
  education: string
  education_en: string
  benefit: string
  benefit_en: string
  createdAt: Date
  slug: string
  slug_en: string
  level?: ILevel
  type?: string
  is_active?: boolean
}

export interface IRecruitmentApply {
  recruitment_apply_id?: string
  recruitment_id: string
  full_name: string
  email: string
  phone: string
  file_cv_url: string
  note?: string
  status?: string
  createdAt?: Date
  recruitment?: IRecruitment
  level?: ILevel
}

export interface ICoaProductFile {
  coa_product_file_id: string
  coa_product_id: string
  description?: string | null
  file_name: string
  file_url: string
  slug: string
  createdAt: Date
  updatedAt: Date
  coaProduct?: {
    product_version_id: string
    production_batch_id: string
  }
}

// ===== Lab Academy (Web Academy) – khớp response Backend =====

export interface IWebSpeaker {
  web_speaker_id: string
  name_speaker: string
  degree_speaker: string
  image_url?: string
  description_vn?: string
  description_en?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IWebAcademyFile {
  web_academy_file_id: string
  file_name: string
  locale: string
  file_url: string
  description_vn?: string
  description_en?: string
  web_academy_id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IWebWebinar {
  web_webinar_id?: string
  web_academy_id?: string
  duration?: string
  link_url?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IWebTrainingOnline {
  status?: string
  web_training_online_id?: string
  web_academy_id?: string
  start_date_register?: Date
  end_date_register?: Date
  start_date?: Date
  end_date?: Date
  quantity?: number
  summary_vn?: string
  summary_en?: string
  key_learning_object_vn?: string
  key_learning_object_en?: string
  who_should_attend_vn?: string
  who_should_attend_en?: string
  pre_requirement_vn?: string
  pre_requirement_en?: string
  program_outline_vn?: string
  program_outline_en?: string
  type_training?: string
  accreditation_recognition_vn?: string
  accreditation_recognition_en?: string
  link_url?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IWebTrainingPlanAgenda {
  web_training_plan_detail_id?: string
  name_vn?: string
  name_en?: string
  time_start?: string
  time_end?: string
  content_agenda_vn?: string
  content_agenda_en?: string
  web_speaker_id?: string
  web_speaker?: IWebSpeaker
}
export interface IWebTrainingPlan {
  web_training_plan_id?: string
  web_training_offline_id?: string
  date?: string
  name_vn?: string
  name_en?: string
  planTimeAgendas?: IWebTrainingPlanAgenda[]
}
export interface IWebTrainingOffline {
  status?: string
  web_training_offline_id?: string
  web_academy_id?: string
  start_date_register?: Date
  end_date_register?: Date
  start_date?: Date
  end_date?: Date
  quantity?: number
  address?: string
  language?: string
  summary_vn?: string
  summary_en?: string
  key_learning_object_vn?: string
  key_learning_object_en?: string
  who_should_attend_vn?: string
  who_should_attend_en?: string
  pre_requirement_vn?: string
  pre_requirement_en?: string
  program_outline_vn?: string
  program_outline_en?: string
  accreditation_recognition_vn?: string
  accreditation_recognition_en?: string
  link_url?: string
  createdAt?: Date
  updatedAt?: Date
  webTrainingPlans?: IWebTrainingPlan[]
}

export interface IWebLabAcademyPost {
  web_academy_id: string
  image_url: string
  short_title: string
  title_vn: string
  title_en: string
  content_vn: string
  content_en: string
  type: string // webinars | training | post
  slug_vn: string
  slug_en: string
  is_full?: boolean
  list_image_url_tiptap?: string[]
  createdAt?: Date | string
  updatedAt?: Date | string
  account_id?: string
  account?: {
    name: string
  }
  webAcademyFiles?: IWebAcademyFile[]
  webAcademyPostSpeakers?: { web_speaker: IWebSpeaker }[]
  webWebinar?: IWebWebinar
  webTrainingOnline?: IWebTrainingOnline
  webTrainingOffline?: IWebTrainingOffline
}
export interface IWebLabAcademyPostApply {
  web_academy_apply_id: string
  web_academy_id: string
  full_name: string
  email: string
  phone: string
  year_of_birth: number
  is_approved: boolean
  createdAt?: Date
  updatedAt?: Date
}
