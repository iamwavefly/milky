/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "subsidiary-dashboard-api-service-dev.eks-alliancepay.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
