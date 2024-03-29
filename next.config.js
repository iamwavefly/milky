/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "subsidiary-api.arca-payments.network",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
