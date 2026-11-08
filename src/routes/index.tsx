import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/nempo-feed" });
  },
  head: () => ({
    meta: [
      { title: "NEMPO Garut — Studio Konten" },
      { name: "description", content: "Koleksi slide, animasi dan konten kreatif Nempo Organizer Garut." },
      { property: "og:title", content: "NEMPO Garut — Studio Konten" },
      { property: "og:description", content: "Koleksi slide, animasi dan konten kreatif Nempo Organizer Garut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
