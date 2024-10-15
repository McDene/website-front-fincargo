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
        hostname: "website-back-fincargo.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
