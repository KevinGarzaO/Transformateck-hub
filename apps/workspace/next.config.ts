import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@transformateck/auth-workspace", "@transformateck/ui"],
};

export default nextConfig;
