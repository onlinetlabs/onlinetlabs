import type { NextConfig } from "next"
import { createContentlayerPlugin } from "next-contentlayer2"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  experimental: {
    turbo: {
      // ...
    },
  },
  transpilePackages: ['next-mdx-remote'],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
