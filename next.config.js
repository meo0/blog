/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.externals.push({
      "/pagefind/pagefind.js": "commonjs /pagefind/pagefind.js",
    });
    return config;
  },
};

module.exports = nextConfig;