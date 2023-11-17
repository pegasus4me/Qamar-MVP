/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
          },
          {
            protocol : "https",
            hostname: "www.jsconsulting.kz"
          }
        ],
      },
}

module.exports = nextConfig
