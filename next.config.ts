import { NextConfig } from "next";
import path from "path";
import nextPWA from "next-pwa";

const withPwa = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  // 특정 페이지를 캐시에서 제외
  publicExcludes: ["!/[date]"],
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@use "abstract/index.scss" as *;`,
  },
  allowedDevOrigins: ["localhost", "222.111.69.130", "dev.weekly-diary.com"],
  turbopack: {
    resolveAlias: {
      underscore: "lodash",
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};

export default withPwa(nextConfig);
