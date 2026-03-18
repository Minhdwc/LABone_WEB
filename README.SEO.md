# LABone Website - Tài liệu SEO

## Mục lục

1. [Tổng quan về SEO](#tổng-quan-về-seo)
2. [Cơ chế SEO trong Next.js App Router](#cơ-chế-seo-trong-nextjs-app-router)
3. [Luồng hoạt động của SEO](#luồng-hoạt-động-của-seo)
4. [Cách thức triển khai SEO](#cách-thức-triển-khai-seo)
5. [Các thành phần SEO trong dự án](#các-thành-phần-seo-trong-dự-án)
6. [Cấu trúc file và thư mục](#cấu-trúc-file-và-thư-mục)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Tổng quan về SEO

SEO (Search Engine Optimization) là quá trình tối ưu hóa website để cải thiện thứ hạng trên các công cụ tìm kiếm như Google, Bing, v.v. Trong dự án LABone, chúng ta sử dụng Next.js 15 với App Router để triển khai SEO một cách tự động và hiệu quả.

### Các yếu tố SEO chính:

- **Metadata**: Title, Description, Keywords
- **Sitemap**: Giúp search engines khám phá và index các trang
- **Robots.txt**: Hướng dẫn search engines cách crawl website
- **Structured Data**: Schema markup (JSON-LD)
- **Open Graph & Twitter Cards**: Tối ưu hóa chia sẻ trên mạng xã hội
- **Canonical URLs**: Tránh duplicate content
- **Multilingual Support**: Hỗ trợ đa ngôn ngữ (Việt/Anh)

---

## Cơ chế SEO trong Next.js App Router

### 1. Metadata API

Next.js 15 cung cấp Metadata API để quản lý metadata một cách tập trung:

#### Static Metadata

Được định nghĩa trong `layout.tsx` được định nghĩa thông qua biến metadata

#### Dynamic Metadata

Sử dụng hàm `generateMetadata()` để tạo metadata động dựa trên dữ liệu động [...slug]

### 2. Sitemap Generation

Dự án sử dụng `next-sitemap` để tự động tạo sitemap:

- **Static Sitemap**: Tự động tạo từ các routes tĩnh
- **Dynamic Sitemap**: Tạo từ API routes cho products và categories
- **Sitemap Index**: Quản lý nhiều sitemap files

### 3. Robots.txt

File `robots.txt` được tạo ra với chức năng là quản lý sitemap, ngăn chặn và cho phép các đường dẫn cụ thể truy cập:

- Cho phép/chặn crawl các paths cụ thể
- Liên kết đến các sitemap files

---

## Luồng hoạt động của SEO

### 1. Luồng Metadata Generation

```
User Request
    ↓
Next.js App Router
    ↓
Layout/Page Component
    ↓
generateMetadata() (nếu có)
    ↓
Fetch Data từ API
    ↓
Generate Metadata Object
    ↓
Render HTML với <head> tags
    ↓
Search Engine Crawl
```

### 2. Luồng Sitemap Generation

#### Build Time (Static Sitemap):

```
Chạy lệnh npm run build
    ↓
next-sitemap đọc next-sitemap.config.ts
    ↓
Quét thư mục app/ để tìm routes
    ↓
Áp dụng hàm transform()
    ↓
Tạo các file sitemap.xml trong public/
    ↓
Tạo robots.txt
```

#### Runtime (Dynamic Sitemap):

```
Yêu cầu từ Bot Tìm kiếm
    ↓
GET /server-sitemap-products.xml
    ↓
Xử lý API Route Handler
    ↓
Lấy dữ liệu Sản phẩm từ Database/API
    ↓
Tạo Sitemap XML
    ↓
Trả về phản hồi XML
```

### 3. Luồng Crawling và Indexing

```
Bot Tìm kiếm
    ↓
Đọc robots.txt
    ↓
Theo dõi các liên kết sitemap
    ↓
Thu thập dữ liệu từng URL
    ↓
Đọc metadata trong <head>
    ↓
Lập chỉ mục nội dung
    ↓
Xếp hạng trong kết quả tìm kiếm
```

---

## Cách thức triển khai SEO

### 1. Metadata cho Root Layout

**File**: `app/layout.tsx`

Metadata cho Root Layout được định nghĩa dưới dạng static metadata object, bao gồm các thành phần chính:

- **title**: Tiêu đề mặc định của website
- **description**: Mô tả ngắn gọn về website
- **keywords**: Mảng các từ khóa liên quan
- **alternates**: Cấu hình canonical URL và các ngôn ngữ hỗ trợ (vi-VN, en-US)
- **robots**: Cấu hình cho search engines:
  - `index: true` - Cho phép index trang
  - `follow: true` - Cho phép follow các links
  - `googleBot`: Cấu hình riêng cho Google Bot với `max-image-preview: 'large'`

Nó quy định metadata mặc định cho toàn bộ website, trừ khi bị ghi đè bởi metadata ở các `layout.tsx` con

### 2. Dynamic Metadata cho Product Pages

File: `app/vi/san-pham/[...slug]/layout.tsx` hoặc `app/en/product/[...slug]/layout.tsx`

**Các bước triển khai:**

1. **Fetch data thông qua hàm get data():**

2. **Tạo hàm generateMetadata cho data được get ra:**

### 3. Cấu hình Sitemap

File: `next-sitemap.config.ts`

**Các thành phần chính:**

- **siteUrl**: URL gốc của website
- **generateRobotsTxt**: Tự động tạo robots.txt
- **sitemapSize**: Số lượng URLs tối đa trong mỗi sitemap file (7000)
- **generateIndexSitemap**: Tạo sitemap index
- **exclude**: Danh sách paths không thêm vào sitemap
- **robotsTxtOptions**: Cấu hình robots.txt
- **transform**: Function để cấu hình priority và changefreq cho từng route

## Các thành phần SEO trong dự án

### 1. Metadata Components

#### Root Layout Metadata

- **Location**: `app/layout.tsx`
- **Type**: Static
- **Purpose**: Metadata mặc định cho toàn bộ website

#### Product Page Metadata

- **Location**:
  - `app/vi/san-pham/[...slug]/layout.tsx`
  - `app/en/product/[...slug]/layout.tsx`
- **Type**: Dynamic
- **Purpose**: Metadata động cho từng sản phẩm

#### Category Page Metadata

- **Location**:
  - `app/vi/danh-muc-san-pham/[...slug]/layout.tsx`
  - `app/en/product-categories/[...slug]/layout.tsx`
- **Type**: Dynamic
- **Purpose**: Metadata động cho từng danh mục

### 2. Sitemap Files

#### Static Sitemap

- **Location**: `public/sitemap.xml` (auto-generated)
- **Generated by**: `next-sitemap` during build
- **Contains**: Static routes từ app directory

#### Dynamic Sitemaps

- **Products**: `/server-sitemap-products.xml`
- **Categories**: `/server-sitemap-categories.xml`
- **Generated by**: API routes at runtime
- **Contains**: Dynamic routes từ database/API

#### Sitemap Index

- **Location**: `public/sitemap-index.xml` (auto-generated)
- **Purpose**: Liên kết tất cả sitemap files

### 3. Robots.txt

- **Location**: `public/robots.txt` (auto-generated)
- **Configuration**: `next-sitemap.config.ts` → `robotsTxtOptions`
- **Contains**:
  - User-agent policies
  - Disallow paths (`/api/`, `/admin/`, `/dashboard/`)
  - Sitemap references

### 4. Open Graph & Twitter Cards

Được cấu hình ở openGraph và twitter trong metadata:

```typescript
openGraph: {
  ...
},
twitter: {
  ...
}
```

### 5. Canonical URLs

Được cấu hình trong `alternates.canonical`:

```typescript
alternates: {
  canonical: 'https://labone.vn/vi/san-pham/product-slug',
  languages: {
    'vi-VN': 'https://labone.vn/vi/san-pham/product-slug',
    'en-US': 'https://labone.vn/en/product/product-slug',
  },
}
```

### 6. Multilingual SEO

Dự án hỗ trợ 2 ngôn ngữ:

- **Vietnamese**: `/vi/*`
- **English**: `/en/*`

**Cấu trúc routes:**

- Products: `/vi/san-pham/[slug]` và `/en/product/[slug]`
- Categories: `/vi/danh-muc-san-pham/[slug]` và `/en/product-categories/[slug]`

**Hreflang tags**: Được tự động thêm qua `alternates.languages`

---

## Cấu trúc file và thư mục

```
LABone_website/
├── app/
│   ├── layout.tsx                          # Root layout với metadata mặc định
│   ├── vi/
│   │   ├── san-pham/
│   │   │   └── [...slug]/
│   │   │       └── layout.tsx              # Dynamic metadata cho product (VN)
│   │   └── danh-muc-san-pham/
│   │       └── [...slug]/
│   │           └── layout.tsx              # Dynamic metadata cho category (VN)
│   ├── en/
│   │   ├── product/
│   │   │   └── [...slug]/
│   │   │       └── layout.tsx              # Dynamic metadata cho product (EN)
│   │   └── product-categories/
│   │       └── [...slug]/
│   │           └── layout.tsx              # Dynamic metadata cho category (EN)
│   └── server-sitemap-products.xml/
│       └── route.ts                        # API route cho products sitemap
│   └── server-sitemap-categories.xml/
│       └── route.ts                        # API route cho categories sitemap
├── next-sitemap.config.ts                  # Cấu hình sitemap (TypeScript)
├── next-sitemap.config.js                  # Cấu hình sitemap (compiled)
├── public/
│   ├── sitemap.xml                         # Static sitemap (auto-generated)
│   ├── sitemap-index.xml                   # Sitemap index (auto-generated)
│   └── robots.txt                          # Robots.txt (auto-generated)
└── package.json                            # Dependencies: next-sitemap
```

---

## Environment Variables

Đảm bảo set các biến môi trường sau:

```env
SITE_URL='Đường dẫn chính của website'
# hoặc
NEXT_PUBLIC_SITE_URL='Đường dẫn chính của website'
```

**Lưu ý**: `next-sitemap` sẽ ưu tiên `SITE_URL`, sau đó mới đến `NEXT_PUBLIC_SITE_URL`.

---

## Scripts liên quan

Trong `package.json`, các scripts liên quan đến SEO:

```json
{
  "scripts": {
    "build": "next build" // Tự động generate sitemap sau khi build
  }
}
```

**Lưu ý**: `next-sitemap` tự động chạy sau `next build` để generate sitemap và robots.txt.

---

**Lưu ý**: Tài liệu này được cập nhật theo cấu trúc hiện tại của dự án. Khi có thay đổi về SEO implementation, vui lòng cập nhật tài liệu này.
