import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.5.111:8888/:path*",
      },
    ];
  },
};

export default nextConfig;
