import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use modern image formats for better quality and smaller file sizes
    formats: ["image/avif", "image/webp"],

    // Device sizes for responsive images (common breakpoints)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for optimized srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Minimum cache TTL (in seconds) - 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },
};

export default nextConfig;
