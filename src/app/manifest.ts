import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SIGMAPRO — Indian Market Signals & Trading Terminal",
    short_name: "SIGMAPRO",
    description: "SEBI Registered Advisory, Nifty & Bank Nifty F&O Signals, Academy Store & Customer Profile Terminal",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0e1a",
    theme_color: "#0a0e1a",
    scope: "/",
    id: "/",
    lang: "en-IN",
    dir: "ltr",
    prefer_related_applications: false,
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
    screenshots: [
      {
        src: "/screenshots/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "SIGMAPRO Desktop Trading & Signals Terminal"
      },
      {
        src: "/screenshots/screenshot-mobile.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "SIGMAPRO Mobile Market Watch & Verified P&L"
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
