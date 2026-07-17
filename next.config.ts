import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/jugadores/:slug", destination: "/jugador/:slug", permanent: true },
      { source: "/clubes/:slug", destination: "/club/:slug", permanent: true },
      { source: "/selecciones/:slug", destination: "/seleccion/:slug", permanent: true },
      { source: "/ranking/:slug", destination: "/rankings/:slug", permanent: true },
      { source: "/tops", destination: "/admin/tops", permanent: false },
      { source: "/guias", destination: "/blog", permanent: false },
    ];
  },
};
export default nextConfig;
