/** @type {import('next').NextConfig} */
// const isMock = process.env.NEXT_PUBLIC_API_MODE === "mock";
// const nextConfig = {
//   async rewrites() {
//     console.log("API MODE:", isMock);
//     if (isMock) return [];
//     return [
//       {
//         source: "/api/:path*", // semua request ke /api/...
//         destination: "http://localhost:2000/:path*", // diterusin ke backend
//       },
//     ];
//   },
// };
const nextConfig = {
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
