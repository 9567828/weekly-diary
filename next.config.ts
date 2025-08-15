import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@use "abstract/index.scss" as *;`,
  },
};

export default nextConfig;
