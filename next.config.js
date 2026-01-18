/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // GitHub Pagesでは最初これが安全
  },
};

module.exports = nextConfig;