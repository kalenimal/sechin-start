import type { NextConfig } from 'next';

/**
 * The app is fully static (mock data lives in the browser), so the same build runs on any static host.
 * - STATIC_EXPORT=true  → `out/` folder for GitHub Pages (see .github/workflows/pages.yml)
 * - NEXT_PUBLIC_BASE_PATH → sub-path the site is served from, e.g. "/sechin-platform"
 */
const staticExport = process.env.STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: staticExport ? 'export' : undefined,
  basePath,
  // Every route is a folder with index.html — static hosts serve it without rewrites.
  trailingSlash: true,
  poweredByHeader: false,
  images: staticExport
    ? { loader: 'custom', loaderFile: './src/shared/lib/image-loader.ts' }
    : { formats: ['image/avif', 'image/webp'] },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
