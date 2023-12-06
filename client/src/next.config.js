/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	async rewrites() {
		const isDev = process.env.NODE_ENV === 'development'

		const sourcePath = '/api/:path*'

		const rewrites = isDev
			? [
					{
						source: sourcePath,
						destination: 'http://localhost:8000/api/:path*'
					}
			  ]
			: []

		console.log('rewrites', rewrites)

		return rewrites
	}
}

module.exports = nextConfig
