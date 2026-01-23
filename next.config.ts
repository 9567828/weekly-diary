import { NextConfig } from "next";
import path from "path";
import nextPWA from "next-pwa";

const withPwa = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@use "abstract/index.scss" as *;`,
  },
  allowedDevOrigins: ["*.ngrok-free.dev", "localhost", "127.0.0.1"],
};

export default withPwa(nextConfig);
