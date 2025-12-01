import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "famous-eagle-630.convex.cloud",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.placeholder.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ],
};

export default nextConfig;
