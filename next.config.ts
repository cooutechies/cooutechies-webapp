import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cooutechies-webapp-storage.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
