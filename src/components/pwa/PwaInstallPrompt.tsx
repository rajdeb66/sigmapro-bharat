"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Share2, PlusSquare, Sparkles, Smartphone, CheckCircle2 } from "lucide-react";
import { usePwa } from "./PwaProvider";

export default function PwaInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall, dismissPrompt, showPrompt } = usePwa();
  const [isIos, setIsIos] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;

      setIsIos(isIosDevice);

      if (isIosDevice && !isStandalone) {
        const dismissedAt = localStorage.getItem("sigmapro_ios_pwa_dismissed");
        const isDismissedRecently =
          dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 24 * 60 * 60 * 1000;

        if (!isDismissedRecently) {
          setTimeout(() => {
            setShowIosPrompt(true);
          }, 5000);
        }
      }
    }
  }, []);

  const dismissIos = () => {
    setShowIosPrompt(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("sigmapro_ios_pwa_dismissed", Date.now().toString());
    }
  };

  if (isInstalled) return null;

  // Android / Chrome / Desktop Native PWA Prompt
  if (showPrompt && isInstallable) {
    return (
      <div className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:w-96 z-50 animate-fadeIn">
        <div className="bg-brand-card/95 backdrop-blur-xl border-2 border-brand-gold/60 p-4 rounded-2xl shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Top Gold Indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-blue to-brand-green" />

          <button
            onClick={dismissPrompt}
            className="absolute top-3 right-3 text-brand-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close install prompt"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center p-1.5 shrink-0 shadow-inner">
              <img
                src="/icons/icon-192.png"
                alt="SIGMAPRO App Icon"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="sigma-badge-gold text-[9px] font-black uppercase tracking-wider">
                  Mobile App
                </span>
                <span className="text-[10px] text-brand-green font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                  0-Latency Feed
                </span>
              </div>
              <h4 className="text-sm font-black text-white leading-tight">
                Install SIGMAPRO App
              </h4>
              <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">
                Fast 1-tap launch, instant F&O alerts & full-screen trading desk.
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-brand-border/60 flex items-center gap-2">
            <button
              onClick={promptInstall}
              className="flex-1 sigma-btn-gold text-xs !py-2.5 font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20"
            >
              <Download className="h-4 w-4" />
              Add to Home Screen
            </button>
            <button
              onClick={dismissPrompt}
              className="text-xs text-brand-muted hover:text-white px-3 py-2 rounded-lg font-semibold"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS Safari Custom Add to Home Screen Instructions
  if (showIosPrompt && isIos) {
    return (
      <div className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:w-96 z-50 animate-fadeIn">
        <div className="bg-brand-card/95 backdrop-blur-xl border-2 border-brand-blue/60 p-4 rounded-2xl shadow-2xl shadow-black/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-gold" />

          <button
            onClick={dismissIos}
            className="absolute top-3 right-3 text-brand-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center p-1.5 shrink-0">
              <img
                src="/icons/icon-192.png"
                alt="SIGMAPRO App"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <span className="sigma-badge-blue text-[9px] font-bold">iOS Native Web App</span>
              <h4 className="text-sm font-black text-white mt-0.5">
                Install on iPhone / iPad
              </h4>
            </div>
          </div>

          <div className="space-y-2 text-xs text-brand-muted bg-brand-dark/80 p-3 rounded-xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-white font-medium">
              <span className="h-5 w-5 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-[11px] font-bold text-brand-blue shrink-0">
                1
              </span>
              <span>Tap the <strong className="text-brand-blue inline-flex items-center gap-1">Share button <Share2 className="h-3.5 w-3.5 inline" /></strong> at bottom of Safari</span>
            </div>
            <div className="flex items-center gap-2 text-white font-medium">
              <span className="h-5 w-5 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-[11px] font-bold text-brand-blue shrink-0">
                2
              </span>
              <span>Select <strong className="text-brand-gold inline-flex items-center gap-1">Add to Home Screen <PlusSquare className="h-3.5 w-3.5 inline" /></strong></span>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={dismissIos}
              className="text-xs font-bold text-brand-gold hover:text-white px-3 py-1.5"
            >
              Got it, thanks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
