import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import ProfileEditModal from "@/components/profile/ProfileEditModal";
import SignInModal from "@/components/auth/SignInModal";
import LiveTradeToast from "@/components/fomo/LiveTradeToast";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import PwaProvider from "@/components/pwa/PwaProvider";
import PwaInstallPrompt from "@/components/pwa/PwaInstallPrompt";

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "SIGMAPRO Bharat — Indian Market Signals & Customer Profile Terminal",
  description:
    "Live Indian market indices (NIFTY 50, SENSEX, BANK NIFTY), verified trading signals in INR, Academy Store, and personalized customer profile dashboard.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SIGMAPRO",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  applicationName: "SIGMAPRO Bharat",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SIGMAPRO" />
      </head>
      <body className="min-h-screen bg-brand-navy text-white antialiased pb-16 md:pb-0">
        <AuthProvider>
          <PwaProvider>
            {children}
            <ProfileEditModal />
            <SignInModal />
            <LiveTradeToast />
            <PwaInstallPrompt />
            <MobileBottomNav />
          </PwaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
