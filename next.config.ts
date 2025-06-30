import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "https://api.unclev.com.au",
      },
    ],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'export',
};

export default nextConfig;
