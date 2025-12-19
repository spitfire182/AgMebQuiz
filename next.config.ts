import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.agatameble.pl',
        pathname: '/**', // Pozwala na wszystkie ścieżki z tej domeny
      },
    ],
  },
};

export default nextConfig;
