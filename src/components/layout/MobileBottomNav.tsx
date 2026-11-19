"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TrendingUp,
  Sparkles,
  GraduationCap,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import VerifiedPnlModal from "@/components/fomo/VerifiedPnlModal";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isPnlOpen, setIsPnlOpen] = useState(false);

  const navItems = [
    {
      label: "Advisory",
      href: "/",
      icon: TrendingUp,
      active: pathname === "/",
      badge: "LIVE",
      badgeColor: "bg-brand-green text-black",
    },
    {
      label: "Research Plans",
      href: "/plans",
      icon: Sparkles,
      active: pathname === "/plans",
      badge: "PRO",
      badgeColor: "bg-brand-gold text-black",
    },
    {
      label: "Academy",
      href: "/courses",
      icon: GraduationCap,
      active: pathname === "/courses",
    },
    {
      label: "Client Portal",
      href: "/dashboard",
      icon: User,
      active: pathname === "/dashboard",
    },
  ];

  return (
    <>
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-navy/95 backdrop-blur-2xl border-t border-brand-border/90 px-2 py-2 select-none shadow-[0_-8px_25px_rgba(0,0,0,0.6)]"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-brand-gold scale-105"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 transition-transform ${
                      isActive ? "stroke-[2.5px] text-brand-gold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "stroke-2"
                    }`}
                  />
                  {item.badge && (
                    <span
                      className={`absolute -top-1 -right-2 text-[8px] font-black px-1 py-0.2 rounded-full leading-none shadow-sm ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] mt-1 font-bold tracking-tight ${
                    isActive ? "text-brand-gold font-black" : "text-brand-muted"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Indicator Pip */}
                {isActive && (
                  <span className="absolute bottom-0 w-4 h-0.5 bg-brand-gold rounded-full shadow-[0_0_6px_#f59e0b]" />
                )}
              </Link>
            );
          })}

          {/* 5th Action: 1-Tap Sensibull Verified P&L Modal Button */}
          <button
            onClick={() => setIsPnlOpen(true)}
            className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-brand-green hover:text-white transition-all group"
            title="Inspect Sensibull Verified P&L Ledger"
          >
            <div className="relative p-1 rounded-lg bg-brand-green/10 border border-brand-green/30 group-active:scale-95 transition-transform">
              <ShieldCheck className="h-4 w-4 text-brand-green" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
              </span>
            </div>
            <span className="text-[9px] mt-1 font-bold text-brand-green tracking-tight whitespace-nowrap">
              P&L Ledger
            </span>
          </button>
        </div>
      </nav>

      {/* Verified P&L Modal triggered from mobile bottom bar */}
      <VerifiedPnlModal isOpen={isPnlOpen} onClose={() => setIsPnlOpen(false)} />
    </>
  );
}
