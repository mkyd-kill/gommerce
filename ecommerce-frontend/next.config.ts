import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_STATIC_IMAGE_URL}`)]
  }
};

export default nextConfig;