/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // This allows Next.js to use unoptimized images (for placeholders)
    unoptimized: true,
    // Don't break on missing images in development
    dangerouslyAllowSVG: true,
    remotePatterns: [],
  },
};

export default nextConfig;
