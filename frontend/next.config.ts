import type { NextConfig } from "next"
import { createContentlayerPlugin } from "next-contentlayer2"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
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
