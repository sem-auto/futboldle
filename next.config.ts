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
      {
        source: "/perfil",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/progreso",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/vitrina",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/album",
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
      { source: "/mundialdle", destination: "/world-cups/mundialdle", permanent: true },
      { source: "/mundiales", destination: "/world-cups", permanent: true },
      { source: "/wordle-mundial", destination: "/world-cups/wordle", permanent: true },
      { source: "/top10-mundial", destination: "/world-cups/top10", permanent: true },
      { source: "/campeones-del-mundo", destination: "/world-cups/champions", permanent: true },
      { source: "/campeones", destination: "/world-cups/champions", permanent: true },
      { source: "/camino-al-titulo", destination: "/world-cups/camino", permanent: true },
      { source: "/temporadas/liga-bbva", destination: "/liga-bbva", permanent: true },
      { source: "/temporadas/mundiales", destination: "/world-cups", permanent: true },
      { source: "/tops", destination: "/admin/tops", permanent: false },
      { source: "/guias", destination: "/blog", permanent: false },
    ];
  },
};
export default nextConfig;
