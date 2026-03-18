# Định nghĩa biến build cho phiên bản Node.
ARG NODE_VERSION=22.14.0
# Dùng image Node Alpine nhẹ làm stage cơ sở.
FROM node:${NODE_VERSION}-alpine AS base

# Thiết lập thư mục làm việc mặc định.
WORKDIR /app
# Vô hiệu hóa husky trong môi trường container.
ENV HUSKY=0
# Đặt port mặc định cho ứng dụng.
ENV PORT=3000

# Bắt đầu stage mới để cài đặt dependencies.
FROM base AS deps

# Cài thư viện glibc compatibility cần cho Node.
RUN apk add --no-cache \
    libc6-compat 

# Sao chép file mô tả phụ thuộc để cache tốt.
COPY package.json package-lock.json ./

# Cài đặt dependencies theo lockfile.
RUN npm ci

# Stage build tái sử dụng node_modules đã cài.
FROM deps AS builder

# Đảm bảo build ở chế độ production trong quá trình build.
ENV NODE_ENV=production
# Copy file .env.production* vào container.
COPY .env.production* ./
# Sao chép toàn bộ mã nguồn vào container.
COPY . .

# Build Next.js rồi loại bỏ devDependencies.
RUN npm run build && npm prune --omit=dev

# Xóa file .env.production sau khi build để không lưu trong image
RUN rm -f .env.production*
# Stage cuối cùng gọn nhẹ để chạy ứng dụng.
FROM base AS runner

# Thiết lập môi trường production cho container runtime.
ENV NODE_ENV=production

# Cài đặt vips để xử lý ảnh.
RUN apk add --no-cache \ 
    vips\
    libc6-compat

# Chặn cài wget/curl và xóa sẵn -- 11.12.25 ThanhHai
RUN apk del wget curl || true \
    && rm -f /usr/bin/wget /usr/bin/curl
# Khóa /tmp an toàn (sẽ mount tmpfs từ compose) -- 13.12.25 ThanhHai
RUN rm -rf /tmp/* && chmod 1777 /tmp

# Tạo user không đặc quyền để chạy app.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
# Chuyển sang user vừa tạo.
USER nextjs

# Sao chép metadata dự án.
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
# Mang thư viện đã cài vào runner (bao gồm sharp đã build).
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
# Copy tài nguyên tĩnh.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy kết quả build Next.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Thông báo container sẽ mở port 3000.
EXPOSE 3000

# Chạy server Next.js production.
CMD ["npm", "run", "start"]

