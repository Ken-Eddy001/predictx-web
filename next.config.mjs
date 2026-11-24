/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework version via the X-Powered-By header.
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        // Apply baseline security headers to every route.
        source: "/(.*)",
        headers: [
          // Prevents MIME-type sniffing on responses.
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Stops the app from being framed by another origin (clickjacking).
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Limits referrer information sent to third-party origins.
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restricts access to sensitive browser APIs.
          // Adjust individual directives as new features are added.
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
            ].join(", "),
          },
          // Enforces secure HTTPS transport and protects against downgrade attacks (#493).
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Content Security Policy to constrain script execution, style injection, and network calls (#493).
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://horizon.stellar.org https://horizon-testnet.stellar.org https://soroban-testnet.stellar.org wss: https:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
