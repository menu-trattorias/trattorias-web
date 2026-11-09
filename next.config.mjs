/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → plain HTML/CSS/JS in /out, deployable as-is to Cloudflare Pages.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
