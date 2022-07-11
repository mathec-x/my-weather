/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['openweathermap.org'],
  },
}

module.exports = nextConfig
