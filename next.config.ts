import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin({
  // Enable type-safe message arguments
  experimental: {
    createMessagesDeclaration: "./messages/en-US.json",
  },
});

export default withNextIntl(nextConfig);
