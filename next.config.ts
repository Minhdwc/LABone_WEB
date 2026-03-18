import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload-aws-cls.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'labone-costmanagement.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 300,
  experimental: {
    optimizeCss: false,
  },
}

export default nextConfig
