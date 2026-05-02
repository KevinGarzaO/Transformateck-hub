import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@transformateck/auth-workspace", "@transformateck/ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
