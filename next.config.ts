/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'data.terragreen-solutions.app',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Fallback für entwicklung
    unoptimized: process.env.NODE_ENV === 'development',
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

  experimental: {
    optimizePackageImports: ['@heroicons/react'],
    optimizeCss: true,
  }
}

module.exports = nextConfig