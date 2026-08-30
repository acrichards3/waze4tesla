/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // ponytail: Waze's iframe needs a first-party visitor cookie; Chrome blocks it cross-site.
  // Proxy embed.waze.com through our origin so LivemapConfig stops 400ing.
  async rewrites() {
    return [
      { source: "/waze-embed/:path*", destination: "https://embed.waze.com/:path*" },
      { source: "/api/config/:path*", destination: "https://embed.waze.com/api/config/:path*" },
      { source: "/web-events", destination: "https://embed.waze.com/web-events" },
      { source: "/web-events/:path*", destination: "https://embed.waze.com/web-events/:path*" },
      { source: "/web_api/:path*", destination: "https://embed.waze.com/web_api/:path*" },
    ];
  },
};

export default config;
