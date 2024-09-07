/** @type {import('next').NextConfig} */
const nextConfig = {
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:3000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
