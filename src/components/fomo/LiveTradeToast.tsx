"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

interface TradeAlert {
  id: string;
  type: "TARGET_HIT" | "LOCKED_SURGE" | "SWING_BOOKED" | "TRAILING_SL";
  scrip: string;
  tag: string;
  gain: string;
  profitINR: string;
  timeAgo: string;
  analyst: string;
  isLocked?: boolean;
  actionText: string;
  actionHref: string;
}

const LIVE_ALERTS: TradeAlert[] = [
  {
    id: "alert-1",
    type: "TARGET_HIT",
    scrip: "BANKNIFTY 51800 CE",
    tag: "Target 2 Achieved",
    gain: "+75.0%",
    profitINR: "₹4,500 / lot",
    timeAgo: "2 mins ago",
    analyst: "Amitabh Verma, CMT",
    actionText: "View Call Levels",
    actionHref: "/#calls",
  },
  {
    id: "alert-2",
    type: "LOCKED_SURGE",
    scrip: "BANKNIFTY 51200 PE (0DTE)",
    tag: "Hero-Zero Gamma Spike",
    gain: "+114.0%",
    profitINR: "₹6,840 / lot",
    timeAgo: "7 mins ago",
    analyst: "Amitabh Verma, CMT",
    isLocked: true,
    actionText: "Unlock VIP Pass",
    actionHref: "/plans",
  },
  {
    id: "alert-3",
    type: "TARGET_HIT",
    scrip: "NIFTY 24150 PE",
    tag: "Target 1 Hit & Trailing",
    gain: "+49.5%",
    profitINR: "₹3,712 / lot",
    timeAgo: "14 mins ago",
    analyst: "Pooja Hegde, NISM-XV",
    actionText: "View Call Details",
    actionHref: "/#calls",
  },
  {
    id: "alert-4",
    type: "SWING_BOOKED",
    scrip: "RELIANCE Cash Swing",
    tag: "Positional Delivery Hit",
    gain: "+5.9%",
    profitINR: "₹7,450 / 100 shares",
    timeAgo: "28 mins ago",
    analyst: "Rohan Singhal, CFA",
    actionText: "View Equity Setup",
    actionHref: "/#calls",
  },
  {
    id: "alert-5",
    type: "LOCKED_SURGE",
    scrip: "[VIP] ENER*** POWER TECH",
    tag: "Multibagger Breakout",
    gain: "+22.4%",
    profitINR: "Accumulating Near Pivot",
    timeAgo: "41 mins ago",
    analyst: "Rohan Singhal, CFA",
    isLocked: true,
    actionText: "Unlock Multibagger",
    actionHref: "/plans",
  },
];

export default function LiveTradeToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissedByUser, setIsDismissedByUser] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDismissedByUser || isPaused) return;

    const timer = setInterval(() => {
      // Gentle fade out then switch
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_ALERTS.length);
        setIsVisible(true);
      }, 400);
    }, 7500);

    return () => clearInterval(timer);
  }, [isDismissedByUser, isPaused]);

  if (isDismissedByUser) return null;

  const alert = LIVE_ALERTS[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-5 left-5 z-40 max-w-sm w-[calc(100vw-2.5rem)] transition-all duration-500 transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-3 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-brand-card/95 backdrop-blur-xl border border-brand-border/90 hover:border-brand-gold/60 rounded-2xl p-4 shadow-2xl shadow-black/80 relative overflow-hidden group transition-all">
        {/* Subtle Top Indicator Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-green" />

        <div className="flex items-start justify-between gap-3">
          {/* Pulsing Icon */}
          <div className="h-9 w-9 rounded-xl bg-brand-dark/90 border border-brand-green/30 flex items-center justify-center text-brand-green shrink-0 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green" />
            </span>
          </div>

          {/* Alert Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  alert.isLocked
                    ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/30"
                    : "bg-brand-green/15 text-brand-green border border-brand-green/30"
                }`}
              >
                {alert.tag}
              </span>
              <span className="text-[10px] text-brand-muted font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" /> {alert.timeAgo}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2 mt-1">
              <span className="font-mono font-black text-sm text-white truncate">
                {alert.scrip}
              </span>
              <span className="font-mono font-black text-sm text-brand-green shrink-0">
                {alert.gain}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs mt-1 text-brand-muted">
              <span>Booked: <strong className="text-white font-mono">{alert.profitINR}</strong></span>
              <span className="text-[10px] text-brand-muted/80">{alert.analyst.split(",")[0]}</span>
            </div>

            {/* Quick Link */}
            <div className="mt-2.5 pt-2 border-t border-brand-border/60 flex items-center justify-between text-xs">
              <span className="text-[10px] text-brand-green font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-brand-green" /> Live Execution Verified
              </span>
              <Link
                href={alert.actionHref}
                className="text-brand-gold hover:text-white font-bold text-xs flex items-center gap-1 transition-colors"
              >
                {alert.actionText} →
              </Link>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissedByUser(true)}
            className="text-brand-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors -mr-1 -mt-1"
            title="Dismiss live trade ticker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
