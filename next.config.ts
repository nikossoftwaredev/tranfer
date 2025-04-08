import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Temporarily ignore TypeScript errors during build
    // This should be removed once the issue with metadata params Promise types is resolved
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin({
  // Enable type-safe message arguments
  experimental: {
    createMessagesDeclaration: "./messages/en-US.json",
  },
});

export default withNextIntl(nextConfig);
