import { createFileRoute } from "@tanstack/react-router";
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { AppShell } from "@/components/app-shell";

const Entry = lazyWithRetry(() => import("@/apps/feed/entry"));

export const Route = createFileRoute("/nempo-feed/$")({
  head: () => ({
    meta: [
      { title: "Nempo Feed — Koleksi Konten Kreatif" },
      { name: "description", content: "Koleksi slide, animasi dan konten kreatif Nempo Organizer Garut." },
      { property: "og:title", content: "Nempo Feed — Koleksi Konten Kreatif" },
      { property: "og:description", content: "Koleksi slide, animasi dan konten kreatif Nempo Organizer Garut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AppShell app={Entry} />,
});
