import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./prisma/dev.db'],
  },
};

export default nextConfig;
