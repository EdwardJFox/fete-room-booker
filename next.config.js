/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.start.gg',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: ''
      }
    ],
  },
}

module.exports = nextConfig
