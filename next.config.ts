/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['via.placeholder.com'] },
  reactStrictMode: true,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;