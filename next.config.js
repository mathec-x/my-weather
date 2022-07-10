/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['http://openweathermap.org'],
  },
}

module.exports = nextConfig
