export async function fetchApiClient<T>(
  endpoint: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    headers?: Record<string, string>
  },
): Promise<T | null> {
  // Luôn gọi qua Next.js API route
  const url = `/api/v1${endpoint}`
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
      cache: 'no-store',
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(errorData.message || 'An error occurred')
    }

    // Trả về data
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    console.error('❌ Client API Error:', endpoint, error)
    throw new Error('Network error occurred')
  }
}

export async function fetchApiServer<T>(
  endpoint: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    headers?: Record<string, string>
  },
): Promise<T | null> {
  // Lấy URL backend từ env
  const baseUrl = process.env.INTERNAL_API_URL || 'http://localhost:3001/web'
  const url = `${baseUrl}${endpoint}`

  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
      next: { revalidate: 15 },
    })
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Server API Error:', endpoint, error)
    return null
  }
}

export const apiClient = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    fetchApiClient<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    fetchApiClient<T>(endpoint, { method: 'POST', body, headers }),

  put: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    fetchApiClient<T>(endpoint, { method: 'PUT', body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    fetchApiClient<T>(endpoint, { method: 'DELETE', headers }),

  patch: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    fetchApiClient<T>(endpoint, { method: 'PATCH', body, headers }),
}

// 🟢 Cho SERVER
export const apiServer = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    fetchApiServer<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    fetchApiServer<T>(endpoint, { method: 'POST', body, headers }),

  put: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    fetchApiServer<T>(endpoint, { method: 'PUT', body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    fetchApiServer<T>(endpoint, { method: 'DELETE', headers }),

  patch: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    fetchApiServer<T>(endpoint, { method: 'PATCH', body, headers }),
}

// ===== 4️⃣ API TỰ ĐỘNG DETECT MÔI TRƯỜNG =====
// Tự động chọn apiServer hoặc apiClient dựa trên môi trường
// Dùng khi bạn muốn code linh hoạt chạy cả client và server

export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) => {
    // Nếu KHÔNG phải browser (tức là server) → dùng apiServer
    if (typeof window === 'undefined') {
      return apiServer.get<T>(endpoint, headers)
    }
    // Ngược lại (là browser) → dùng apiClient
    return apiClient.get<T>(endpoint, headers)
  },

  post: <T>(endpoint: string, body?: any, headers?: Record<string, string>) => {
    if (typeof window === 'undefined') {
      return apiServer.post<T>(endpoint, body, headers)
    }
    return apiClient.post<T>(endpoint, body, headers)
  },

  put: <T>(endpoint: string, body?: any, headers?: Record<string, string>) => {
    if (typeof window === 'undefined') {
      return apiServer.put<T>(endpoint, body, headers)
    }
    return apiClient.put<T>(endpoint, body, headers)
  },

  delete: <T>(endpoint: string, headers?: Record<string, string>) => {
    if (typeof window === 'undefined') {
      return apiServer.delete<T>(endpoint, headers)
    }
    return apiClient.delete<T>(endpoint, headers)
  },

  patch: <T>(endpoint: string, body?: any, headers?: Record<string, string>) => {
    if (typeof window === 'undefined') {
      return apiServer.patch<T>(endpoint, body, headers)
    }
    return apiClient.patch<T>(endpoint, body, headers)
  },
}
