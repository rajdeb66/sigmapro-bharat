import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SIGMAPRO Bharat — Indian Market Signals & Terminal",
    short_name: "SIGMAPRO",
    description: "SEBI Registered Advisory, Nifty & Bank Nifty F&O Signals, Academy Store & Customer Profile Terminal",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0e1a",
    theme_color: "#0a0e1a",
    scope: "/",
    id: "/",
    categories: ["finance", "business", "productivity", "education"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Market Calls",
        short_name: "Calls",
        description: "Today's Active High-Conviction Calls",
        url: "/#calls",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }]
      },
      {
        name: "VIP Plans",
        short_name: "Plans",
        description: "Subscription Passes & Pricing",
        url: "/plans",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }]
      },
      {
        name: "My Profile Terminal",
        short_name: "Profile",
        description: "Demat Sync & Customer Dossier",
        url: "/dashboard",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }]
      }
    ]
  };
}
