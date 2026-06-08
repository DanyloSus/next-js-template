import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // SVGR: import SVGs as React components, e.g. `import Logo from "./logo.svg"`.
  // Configured for Turbopack (the default bundler in Next 16) via webpack-loader
  // interop. See node_modules/next/dist/docs -> turbopack config reference.
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

// next-intl: wires the request config so `useTranslations` etc. work in RSC.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
