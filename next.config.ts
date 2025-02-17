import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/account/charge",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.s$css$/,
      }
    );

    return config;
  },
};

export default nextConfig;
