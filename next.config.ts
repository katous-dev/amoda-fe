import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'standalone',
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
   async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/1',
        permanent: true, 
      },
      {
        source: '/search',
        destination: '/search/1',
        permanent: true, 
      }
    ];
  }
};

export default nextConfig;
