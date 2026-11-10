import type { NextConfig } from "next";

// Для GitHub Pages сайт живе за адресою vegamond.github.io/hive-intelligence-site,
// тому під час збірки в Actions задається PAGES_BASE_PATH. На Vercel змінна порожня.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
