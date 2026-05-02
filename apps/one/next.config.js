/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@transformateck/auth-one", "@transformateck/ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
