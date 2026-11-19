"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  X,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Volume2,
  Copy,
  Check,
  Calculator,
  ArrowRight,
  ExternalLink,
  Target,
  Clock,
  Layers,
  Cpu,
  Zap,
  BarChart2,
  Lock,
} from "lucide-react";
import Link from "next/link";

export interface TradeCallWithThesis {
  id: string;
  scrip: string;
  instrumentType: string;
  segment: string;
  expiry: string;
  side: "BUY" | "SELL";
  entry: string;
  target1: string;
  target2: string;
  stopLoss: string;
  riskReward: string;
  status: string;
  currentPrice: string;
  analyst: string;
  sebiReg: string;
  deliveredTime: string;
  rationale: string;
  isLocked?: boolean;
  unlockPlan?: string;
  planHref?: string;
  // Optional enriched thesis metadata
  thesisData?: {
    setupType: string;
    convictionPct: number;
    timeframe: string;
    catalysts: {
      category: "TECHNICAL" | "DERIVATIVE_OI" | "INSTITUTIONAL" | "FUNDAMENTAL";
      tag: string;
      title: string;
      description: string;
    }[];
    invalidationRule: string;
    audioDuration: string;
    audioBriefingScript: string;
    entryNum: number;
    target1Num: number;
    target2Num: number;
    stopLossNum: number;
    lotSize: number;
  };
}

interface AiTradeThesisDrawerProps {
  call: TradeCallWithThesis | null;
  isOpen: boolean;
  onClose: () => void;
  onCopyLevels?: (call: TradeCallWithThesis) => void;
}

export default function AiTradeThesisDrawer({
  call,
  isOpen,
  onClose,
  onCopyLevels,
}: AiTradeThesisDrawerProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [capitalAllocation, setCapitalAllocation] = useState<number>(25000);
  const [isCopied, setIsCopied] = useState(false);

  // Reset audio on open/call change
  useEffect(() => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [call?.id, isOpen]);

  // Audio waveform animation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2.5;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  if (!isOpen || !call) return null;

  // Derive intelligent thesis defaults if call doesn't have custom ones
  const isOption = call.instrumentType === "OPTIONS" || call.segment.includes("F&O");
  const entryAvg =
    call.thesisData?.entryNum ||
    (parseFloat(call.entry.replace(/[^0-9.]/g, "").slice(0, 4)) || 250);
  const target1Val =
    call.thesisData?.target1Num ||
    (parseFloat(call.target1.replace(/[^0-9.]/g, "")) || entryAvg * 1.35);
  const target2Val =
    call.thesisData?.target2Num ||
    (parseFloat(call.target2.replace(/[^0-9.]/g, "")) || entryAvg * 1.65);
  const stopLossVal =
    call.thesisData?.stopLossNum ||
    (parseFloat(call.stopLoss.replace(/[^0-9.]/g, "")) || entryAvg * 0.78);
  const lotSize = call.thesisData?.lotSize || (call.scrip.includes("BANKNIFTY") ? 15 : call.scrip.includes("NIFTY") ? 25 : 1);

  const riskPerUnit = Math.max(1, entryAvg - stopLossVal);
  const reward1PerUnit = Math.max(1, target1Val - entryAvg);
  const reward2PerUnit = Math.max(1, target2Val - entryAvg);

  // Position Sizing Calculations based on capital allocation slider
  const maxLots = Math.max(1, Math.floor(capitalAllocation / (entryAvg * lotSize)));
  const totalQuantity = maxLots * lotSize;
  const actualInvested = Math.round(totalQuantity * entryAvg);
  const maxRupeeRisk = Math.round(totalQuantity * riskPerUnit);
  const expectedGainT1 = Math.round(totalQuantity * reward1PerUnit);
  const expectedGainT2 = Math.round(totalQuantity * reward2PerUnit);
  const riskPctOfCapital = ((maxRupeeRisk / capitalAllocation) * 100).toFixed(1);

  // Catalysts fallback
  const catalysts = call.thesisData?.catalysts || [
    {
      category: "TECHNICAL",
      tag: "Price Action & Volume",
      title: "Breakout Confluence with Volume Spurt",
      description: `${call.scrip} is confirming a bullish momentum continuation above key 15-minute moving average pivots with surge in intraday volume.`,
    },
    {
      category: "DERIVATIVE_OI",
      tag: "Derivatives & OI",
      title: "Call Writing Squeeze & Unwinding Wall",
      description: "Aggressive Put addition observed at immediate support strike, forcing short sellers into covering stops.",
    },
    {
      category: "INSTITUTIONAL",
      tag: "Smart Money Flow",
      title: "Institutional Delivery & Sector Tailwinds",
      description: "Consistent block accumulation with index heavyweight banking/energy peers showing synchronized relative strength.",
    },
  ];

  const invalidationText =
    call.thesisData?.invalidationRule ||
    `Strict Invalidation Rule: A 15-minute candle close below ${call.stopLoss} automatically invalidates the structural thesis. Exit without hesitation; no averaging down allowed.`;

  const audioBriefing =
    call.thesisData?.audioBriefingScript ||
    `Good day traders. Research Desk here with the institutional breakdown for ${call.scrip}. We have identified an asymmetrical risk-reward setup around ${call.entry}. The risk is strictly capped at ${call.stopLoss} targeting ${call.target1} and ${call.target2}. Trade your plan and manage sizing.`;

  const handleCopy = () => {
    if (onCopyLevels) {
      onCopyLevels(call);
    } else {
      const text = `SIGMAPRO RESEARCH SETUP:\nScrip: ${call.scrip} (${call.segment})\nAction: ${call.side}\nBuy Range: ${call.entry}\nTarget 1: ${call.target1} | Target 2: ${call.target2}\nInvalidation (SL): ${call.stopLoss}\nAnalyst: ${call.analyst} (${call.sebiReg})\n*Execute independently on your broker terminal.`;
      navigator.clipboard.writeText(text);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Over Drawer Container */}
      <div
        className="relative w-full max-w-2xl bg-brand-navy border-l border-brand-border/80 text-white shadow-2xl flex flex-col h-full z-10 overflow-y-auto animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-brand-navy/95 backdrop-blur-xl border-b border-brand-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-sm">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded border border-brand-gold/40">
                  AI Research Copilot
                </span>
                <span className="text-xs text-brand-muted">
                  Conviction: <strong className="text-brand-green font-mono">{call.thesisData?.convictionPct || 91}%</strong>
                </span>
              </div>
              <h2 className="text-lg font-black text-white font-mono mt-0.5">
                {call.scrip} <span className="text-brand-gold">Thesis Drawer</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-brand-dark/80 hover:bg-brand-card border border-brand-border/70 text-brand-muted hover:text-white transition-colors"
            aria-label="Close Drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Quick Call Summary Banner */}
          <div className="bg-brand-card/90 rounded-2xl p-4 border border-brand-border/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-brand-border/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-gold">
                  {call.segment} • {call.expiry}
                </span>
                <span className="text-[11px] bg-brand-green/20 text-brand-green font-bold px-2 py-0.5 rounded-full border border-brand-green/40">
                  {call.status}
                </span>
              </div>
              <span className="text-xs text-brand-muted flex items-center gap-1 font-mono">
                <Clock className="h-3.5 w-3.5" /> Delivered {call.deliveredTime}
              </span>
            </div>

            {/* Price Matrix */}
            <div className="grid grid-cols-4 gap-2 pt-3 text-center">
              <div className="bg-brand-dark/70 p-2.5 rounded-xl border border-brand-border/60">
                <span className="text-[9px] uppercase font-bold text-brand-muted block">Buy Range</span>
                <span className="text-xs font-bold text-white font-mono">{call.entry}</span>
              </div>
              <div className="bg-brand-dark/70 p-2.5 rounded-xl border border-brand-green/30">
                <span className="text-[9px] uppercase font-bold text-brand-green block">Target 1</span>
                <span className="text-xs font-bold text-brand-green font-mono">{call.target1}</span>
              </div>
              <div className="bg-brand-dark/70 p-2.5 rounded-xl border border-brand-green/30">
                <span className="text-[9px] uppercase font-bold text-brand-green block">Target 2</span>
                <span className="text-xs font-bold text-brand-green font-mono">{call.target2}</span>
              </div>
              <div className="bg-brand-dark/70 p-2.5 rounded-xl border border-brand-red/30">
                <span className="text-[9px] uppercase font-bold text-brand-red block">Stop Loss</span>
                <span className="text-xs font-bold text-brand-red font-mono">{call.stopLoss}</span>
              </div>
            </div>
          </div>

          {/* Locked Notice for Members-only Calls */}
          {call.isLocked && (
            <div className="bg-brand-gold/10 border border-brand-gold/40 rounded-2xl p-4 flex items-start gap-3">
              <Lock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-brand-gold uppercase tracking-wider">
                  VIP Alpha Pass Required
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Exact numeric strikes and execution coordinates are reserved for active{" "}
                  <strong className="text-white">{call.unlockPlan || "VIP Subscribers"}</strong>.
                  Subscribe to unlock real-time execution alerts via WhatsApp and Telegram.
                </p>
                <div className="pt-2">
                  <Link
                    href={call.planHref || "/plans"}
                    className="sigma-btn-gold text-xs !py-1.5 !px-3 inline-flex font-bold items-center gap-1.5"
                  >
                    View Research Plans <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 30-Second AI Audio Briefing Player */}
          <div className="bg-brand-card/70 border border-brand-blue/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-brand-blue/15 flex items-center justify-center text-brand-blue">
                  <Volume2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    30-Sec AI Desk Audio Briefing
                    <span className="text-[9px] bg-brand-blue/20 text-brand-blue px-1.5 py-0.2 rounded font-black">
                      VOICE SYNTHESIS
                    </span>
                  </h4>
                  <p className="text-[10px] text-brand-muted">
                    Instant voice digest recorded by SEBI Lead Analyst
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-muted">
                {call.thesisData?.audioDuration || "0:38"}
              </span>
            </div>

            {/* Audio Waveform Player Bar */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                  isPlayingAudio
                    ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/30"
                    : "bg-brand-blue text-white hover:bg-brand-blue-hover shadow-lg shadow-brand-blue/20"
                }`}
                aria-label={isPlayingAudio ? "Pause Audio" : "Play Audio"}
              >
                {isPlayingAudio ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Simulated Waveform Bars */}
              <div className="flex-1 flex items-center gap-1 h-7 bg-brand-dark/90 px-3 rounded-xl border border-brand-border/60">
                {[18, 42, 65, 80, 50, 95, 30, 70, 85, 45, 60, 90, 75, 40, 85, 35, 65, 50, 90, 40, 70, 30, 80, 60, 40].map(
                  (height, idx) => {
                    const isPlayed = (idx / 25) * 100 <= audioProgress;
                    return (
                      <span
                        key={idx}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          isPlayed
                            ? "bg-brand-gold shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                            : "bg-brand-border"
                        } ${isPlayingAudio && isPlayed ? "animate-pulse" : ""}`}
                        style={{
                          height: `${Math.max(15, isPlayingAudio ? (height * (0.8 + Math.random() * 0.4)) : height)}%`,
                        }}
                      />
                    );
                  }
                )}
              </div>
            </div>

            {isPlayingAudio && (
              <p className="text-[11px] text-brand-muted/90 italic bg-brand-dark/60 p-2.5 rounded-xl border border-brand-border/40 animate-fadeIn">
                &ldquo;{audioBriefing}&rdquo;
              </p>
            )}
          </div>

          {/* Section: 3 Core Institutional Catalysts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-brand-gold" />
                3 Institutional Catalysts (&ldquo;Why Now?&rdquo;)
              </h3>
              <span className="text-[10px] text-brand-muted">Multi-Indicator Synthesis</span>
            </div>

            <div className="space-y-2.5">
              {catalysts.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-brand-card border border-brand-border/70 rounded-xl p-3.5 hover:border-brand-blue/40 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full bg-brand-blue/15 text-brand-blue text-[10px] font-black flex items-center justify-center font-mono">
                        0{idx + 1}
                      </span>
                      {cat.title}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-brand-dark text-brand-gold border border-brand-border/60">
                      {cat.tag}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed pl-6.5">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Risk / Reward Visualizer */}
          <div className="bg-brand-card border border-brand-border/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
                <BarChart2 className="h-4 w-4 text-brand-green" />
                Asymmetric Risk-to-Reward Geometry
              </h3>
              <span className="text-xs font-black font-mono text-brand-green bg-brand-green/10 border border-brand-green/30 px-2 py-0.5 rounded">
                R:R {call.riskReward}
              </span>
            </div>

            {/* Visual Risk / Reward Gauge Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="h-4 rounded-full overflow-hidden flex bg-brand-dark border border-brand-border">
                {/* Risk Bar (Red) */}
                <div
                  className="bg-brand-red flex items-center justify-center text-[8px] font-black text-white px-1 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"
                  style={{ width: "25%" }}
                  title="Downside Risk Boundary"
                >
                  RISK
                </div>
                {/* Reward Target 1 (Green) */}
                <div
                  className="bg-brand-green flex items-center justify-center text-[8px] font-black text-black px-1"
                  style={{ width: "35%" }}
                  title="Primary Profit Expansion"
                >
                  TARGET 1
                </div>
                {/* Reward Target 2 (Gold) */}
                <div
                  className="bg-brand-gold flex items-center justify-center text-[8px] font-black text-black px-1"
                  style={{ width: "40%" }}
                  title="Extended Runner Expansion"
                >
                  TARGET 2 (RUNNER)
                </div>
              </div>

              {/* Labels under Bar */}
              <div className="flex justify-between text-[10px] font-mono pt-1 text-brand-muted">
                <span className="text-brand-red font-bold">SL: {call.stopLoss}</span>
                <span className="text-white font-bold">Entry: {call.entry}</span>
                <span className="text-brand-green font-bold">T1: {call.target1}</span>
                <span className="text-brand-gold font-bold">T2: {call.target2}</span>
              </div>
            </div>
          </div>

          {/* Section: Strict Invalidation Rule */}
          <div className="bg-brand-red/10 border border-brand-red/30 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-brand-red uppercase tracking-wider flex items-center gap-1.5">
                Structural Invalidation Rule (No Averaging)
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                {invalidationText}
              </p>
            </div>
          </div>

          {/* Section: Position Sizing & Capital Allocation Calculator */}
          <div className="bg-brand-card border border-brand-border/80 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-brand-gold" />
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  Intelligent Position Size Calculator
                </h3>
              </div>
              <span className="text-[10px] text-brand-muted">
                Standard Lot: <strong className="text-white font-mono">{lotSize} Qty</strong>
              </span>
            </div>

            {/* Capital Chips */}
            <div className="space-y-2">
              <label className="text-[11px] text-brand-muted block font-medium">
                Select or Adjust Allocated Capital for this Trade:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[15000, 25000, 50000, 100000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCapitalAllocation(amount)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold font-mono transition-all ${
                      capitalAllocation === amount
                        ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30 border border-brand-blue"
                        : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
                    }`}
                  >
                    ₹{(amount / 1000).toFixed(0)}K
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={capitalAllocation}
                onChange={(e) => setCapitalAllocation(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-dark rounded-lg appearance-none cursor-pointer accent-brand-blue mt-2"
              />
              <div className="flex justify-between text-[10px] text-brand-muted font-mono">
                <span>₹10,000</span>
                <span className="text-brand-gold font-bold">Selected: ₹{capitalAllocation.toLocaleString("en-IN")}</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
              <div className="bg-brand-dark/90 p-2.5 rounded-xl border border-brand-border">
                <span className="text-[9px] uppercase font-bold text-brand-muted block font-sans">
                  Recommended Size
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {maxLots} {isOption ? `Lots (${totalQuantity} Q)` : `Shares`}
                </span>
                <span className="text-[9px] text-brand-muted/70 block font-sans">
                  ₹{actualInvested.toLocaleString("en-IN")} deployed
                </span>
              </div>

              <div className="bg-brand-dark/90 p-2.5 rounded-xl border border-brand-red/30">
                <span className="text-[9px] uppercase font-bold text-brand-red block font-sans">
                  Max Risk at SL
                </span>
                <span className="text-xs font-bold text-brand-red block mt-0.5">
                  -₹{maxRupeeRisk.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] text-brand-muted/70 block font-sans">
                  {riskPctOfCapital}% of capital
                </span>
              </div>

              <div className="bg-brand-dark/90 p-2.5 rounded-xl border border-brand-green/30">
                <span className="text-[9px] uppercase font-bold text-brand-green block font-sans">
                  Proj. Profit (T1)
                </span>
                <span className="text-xs font-bold text-brand-green block mt-0.5">
                  +₹{expectedGainT1.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] text-brand-gold block font-sans">
                  T2: +₹{expectedGainT2.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Broker Intent Action Buttons */}
          <div className="bg-brand-card/90 border border-brand-border rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">Execute Independently On Your Broker:</h4>
              <span className="text-[10px] text-brand-muted">Zero Execution Latency</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleCopy}
                className="bg-brand-dark hover:bg-brand-border/40 border border-brand-border text-white text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-brand-green" />
                    <span className="text-brand-green">Levels Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-brand-gold" />
                    <span>Copy Formatted Levels</span>
                  </>
                )}
              </button>

              <a
                href={`https://kite.zerodha.com`}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-blue/20"
              >
                <span>Launch Zerodha Kite</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="text-[9px] text-brand-muted/70 text-center">
              SIGMAPRO is an independent SEBI research advisory desk. You retain 100% control over trade execution on your broker account.
            </p>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="sticky bottom-0 bg-brand-navy/95 backdrop-blur-xl border-t border-brand-border px-6 py-3 flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-green" />
            <span>{call.analyst} • {call.sebiReg}</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-white hover:text-brand-gold font-bold underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
