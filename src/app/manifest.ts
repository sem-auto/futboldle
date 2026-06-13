import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Futboldle",
    short_name: "Futboldle",
    description: "Minijuegos diarios de fútbol nostalgia para enfermos de la Liga BBVA.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f2ea",
    theme_color: "#18181b",
    lang: "es",
    categories: ["games", "sports", "entertainment"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
