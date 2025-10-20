/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // semua request ke /api/...
        destination: "http://localhost:2000/:path*", // diterusin ke backend
      },
    ];
  },
};

module.exports = nextConfig;
