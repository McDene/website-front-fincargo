/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "fincargo-backend-website.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
