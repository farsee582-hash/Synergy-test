import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  outputFileTracingIncludes: {
    '/api/**/*': ['./prisma/dev.db'],
  },
};

export default nextConfig;
