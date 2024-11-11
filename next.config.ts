import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No basePath needed for username.github.io repos
};

export default nextConfig;
