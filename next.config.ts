import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Enable Next.js image optimization for both local and remote images
    unoptimized: false,
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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 300,
  experimental: {
    // Keep CSS optimization disabled to avoid missing 'critters' module error during build
    optimizeCss: false,
  },
}

export default nextConfig
