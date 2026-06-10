import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow embedding only from the Gaia Digital website (and ourselves).
          // frame-ancestors replaces X-Frame-Options, which cannot express an allowlist.
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://gaiaapp.net https://*.gaiaapp.net",
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
