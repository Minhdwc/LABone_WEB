import { NextRequest, NextResponse } from 'next/server'

// FIX: Dùng internal API URL cho server-side, không dùng public domain
// Tránh vòng lặp và timeout trên VPS nginx
const API_BASE_URL = process.env.INTERNAL_API_URL || process.env.BACKEND_API_URL || 'http://localhost:3001/web'

// Helper để get CORS headers - chấp nhận cả www và non-www
function getCorsHeaders(origin: string | null) {
  const allowedOrigins = [
    'https://labone.com.vn',
    'https://www.labone.com.vn',
    'http://labone.com.vn',
    'http://www.labone.com.vn',
    'http://localhost:3000',
  ]

  const isAllowedOrigin = origin && allowedOrigins.includes(origin)
  const corsOrigin = isAllowedOrigin ? origin : allowedOrigins[0]

  return {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }
}

// Helper để get cache control headers - disable caching
function getCacheHeaders() {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  }
}

// Helper để forward request đến backend
async function proxyRequest(request: NextRequest, method: string, path: string[]) {
  try {
    const pathString = path.join('/')
    const searchParams = request.nextUrl.searchParams
    const queryString = searchParams.toString()
    const url = `${API_BASE_URL}/${pathString}${queryString ? `?${queryString}` : ''}`
    // ✅ FIX 1: Chỉ forward headers thực sự có
    const headers: Record<string, string> = {}

    const contentType = request.headers.get('content-type')
    if (contentType) {
      headers['Content-Type'] = contentType
    }

    const authHeader = request.headers.get('Authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    const acceptHeader = request.headers.get('accept')
    if (acceptHeader) {
      headers['Accept'] = acceptHeader
    }

    // ✅ FIX 2: Chặn multipart/form-data qua proxy
    if (contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        {
          error: 'Multipart uploads should use dedicated endpoints',
          message: 'Please use /api/upload for file uploads',
        },
        {
          status: 400,
          headers: getCacheHeaders(),
        },
      )
    }

    // ✅ FIX 3: Thêm timeout để tránh treo pending
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60s timeout

    // ✅ FIX 5: Xác định body và có cần duplex không
    const hasBody = method !== 'GET' && method !== 'DELETE'
    const body = hasBody ? request.body : undefined

    const fetchOptions: RequestInit = {
      method,
      headers: {
        ...headers,
        // ✅ FIX 4: Force close connection để tránh socket leak
        Connection: 'close',
      },
      body,
      signal: controller.signal,
      cache: 'no-store',
    }

    // ✅ FIX 6: Thêm duplex: 'half' khi dùng ReadableStream body
    // Node.js fetch API yêu cầu option này khi body là ReadableStream
    if (hasBody && body) {
      // @ts-expect-error - duplex is required for ReadableStream body in Node.js
      fetchOptions.duplex = 'half'
    }

    const response = await fetch(url, fetchOptions)

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: response.statusText }
      }
      const corsHeaders = getCorsHeaders(request.headers.get('origin'))
      return NextResponse.json(errorData, {
        status: response.status,
        headers: {
          ...corsHeaders,
          ...getCacheHeaders(),
        },
      })
    }

    const data = await response.json()
    const corsHeaders = getCorsHeaders(request.headers.get('origin'))
    return NextResponse.json(data, {
      status: 200,
      headers: {
        ...corsHeaders,
        ...getCacheHeaders(),
      },
    })
  } catch (error) {
    const corsHeaders = getCorsHeaders(request.headers.get('origin'))

    // ✅ FIX 6: Cải thiện error handling cho timeout
    if (error instanceof Error && error.name === 'AbortError') {
      // eslint-disable-next-line no-console
      console.error('Request timeout:', path.join('/'))
      return NextResponse.json(
        {
          error: 'Request timeout',
          message: 'The request took too long to complete',
        },
        {
          status: 504,
          headers: {
            ...corsHeaders,
            ...getCacheHeaders(),
          },
        },
      )
    }

    // eslint-disable-next-line no-console
    console.error('Proxy request error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
        headers: {
          ...corsHeaders,
          ...getCacheHeaders(),
        },
      },
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request.headers.get('origin'))
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params
  return proxyRequest(request, 'GET', resolvedParams.path)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params
  return proxyRequest(request, 'POST', resolvedParams.path)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params
  return proxyRequest(request, 'PUT', resolvedParams.path)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params
  return proxyRequest(request, 'DELETE', resolvedParams.path)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params
  return proxyRequest(request, 'PATCH', resolvedParams.path)
}
