import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the "X-Powered-By: Next.js" header
  poweredByHeader: false,

  // Tree-shake heavy packages → smaller client bundle, faster TTI
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
