import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers for production
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          // Strict Transport Security - force HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Referrer policy - send referrer for same-origin, origin-only for cross-origin
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Disable permissions we don't need
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Cross-Origin policies
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          // Content Security Policy
          // NOTE: 'unsafe-inline' for style-src is required for Next.js SSR
          // 'unsafe-eval' is NOT used - we're strict on scripts
          {
            key: "Content-Security-Policy",
            value: [
              // Default to self only
              "default-src 'self'",
              // Scripts: self only, no eval
              "script-src 'self' 'unsafe-inline'",
              // Styles: self + inline (required for Next.js) + Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts: self + Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs + HTTPS images
              "img-src 'self' data: https:",
              // Connect (fetch/XHR): self + OpenAI API
              "connect-src 'self' https://api.openai.com",
              // Frames: none
              "frame-ancestors 'none'",
              // Form submissions: self
              "form-action 'self'",
              // Base URI: self
              "base-uri 'self'",
              // Object/embed: none
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
