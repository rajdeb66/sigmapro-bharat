"use client";

import { useEffect, useState, createContext, useContext } from "react";

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
  dismissPrompt: () => void;
  showPrompt: boolean;
}

const PwaContext = createContext<PwaContextType>({
  isInstallable: false,
  isInstalled: false,
  promptInstall: async () => {},
  dismissPrompt: () => {},
  showPrompt: false,
});

export const usePwa = () => useContext(PwaContext);

export default function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SIGMAPRO PWA ServiceWorker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.log("SIGMAPRO ServiceWorker registration failed:", error);
          });
      });
    }

    // Check if already in standalone display mode (installed)
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;

      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check if user previously dismissed today
      const dismissedAt = localStorage.getItem("sigmapro_pwa_dismissed");
      const isDismissedRecently =
        dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 24 * 60 * 60 * 1000;

      // Handle beforeinstallprompt (Android, Chrome, Edge)
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);

        if (!isDismissedRecently) {
          // Delay display slightly so it doesn't interrupt immediate page landing
          setTimeout(() => {
            setShowPrompt(true);
          }, 4000);
        }
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      // Handle appinstalled event
      const handleAppInstalled = () => {
        setIsInstalled(true);
        setIsInstallable(false);
        setShowPrompt(false);
        setDeferredPrompt(null);
        console.log("SIGMAPRO PWA was installed successfully!");
      };

      window.addEventListener("appinstalled", handleAppInstalled);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.removeEventListener("appinstalled", handleAppInstalled);
      };
    }
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the PWA install prompt: ${outcome}`);

    if (outcome === "accepted") {
      setIsInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("sigmapro_pwa_dismissed", Date.now().toString());
    }
  };

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isInstalled,
        promptInstall,
        dismissPrompt,
        showPrompt,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}
