"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Activity,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  User,
  Zap,
  BarChart3,
  Search,
  Lock,
  Unlock,
  GraduationCap,
  Sparkles,
  BookOpen,
  CreditCard,
  ArrowRight,
  Award,
  Play,
  Star,
  ExternalLink,
} from "lucide-react";
import VerifiedPnlModal from "@/components/fomo/VerifiedPnlModal";

export default function IndianMarketMVPPage() {
  const [selectedSegment, setSelectedSegment] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerifiedPnlOpen, setIsVerifiedPnlOpen] = useState(false);

  // Major Indian Market Indices Data
  const majorIndices = [
    {
      name: "NIFTY 50",
      exchange: "NSE",
      price: "24,148.20",
      change: "+124.60",
      pct: "+0.52%",
      up: true,
      dayHigh: "24,198.50",
      dayLow: "24,022.10",
      fiftyTwoHigh: "26,277.35",
      fiftyTwoLow: "18,837.85",
    },
    {
      name: "SENSEX",
      exchange: "BSE",
      price: "79,486.32",
      change: "+398.15",
      pct: "+0.50%",
      up: true,
      dayHigh: "79,640.20",
      dayLow: "79,112.45",
      fiftyTwoHigh: "85,978.25",
      fiftyTwoLow: "64,831.30",
    },
    {
      name: "BANK NIFTY",
      exchange: "NSE F&O",
      price: "51,780.45",
      change: "+210.80",
      pct: "+0.41%",
      up: true,
      dayHigh: "51,910.00",
      dayLow: "51,460.30",
      fiftyTwoHigh: "54,467.35",
      fiftyTwoLow: "42,105.40",
    },
    {
      name: "NIFTY IT",
      exchange: "NSE",
      price: "41,892.10",
      change: "+312.40",
      pct: "+0.75%",
      up: true,
      dayHigh: "42,010.50",
      dayLow: "41,600.20",
      fiftyTwoHigh: "43,450.00",
      fiftyTwoLow: "30,810.00",
    },
    {
      name: "NIFTY MIDCAP 100",
      exchange: "NSE",
      price: "56,412.80",
      change: "+480.15",
      pct: "+0.86%",
      up: true,
      dayHigh: "56,580.00",
      dayLow: "55,910.00",
      fiftyTwoHigh: "60,925.00",
      fiftyTwoLow: "38,720.00",
    },
    {
      name: "INDIA VIX",
      exchange: "Volatility",
      price: "14.28",
      change: "-0.42",
      pct: "-2.85%",
      up: false,
      dayHigh: "15.10",
      dayLow: "14.12",
      fiftyTwoHigh: "23.15",
      fiftyTwoLow: "9.85",
    },
  ];

  // Today's Top Indian Equities (NSE)
  const topStocks = [
    {
      ticker: "RELIANCE",
      name: "Reliance Industries Ltd.",
      cmp: "1,274.50",
      change: "+18.40",
      pct: "+1.46%",
      up: true,
      volume: "8.4M",
      sector: "Energy / Retail",
    },
    {
      ticker: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      cmp: "1,742.80",
      change: "+14.20",
      pct: "+0.82%",
      up: true,
      volume: "12.1M",
      sector: "Private Banking",
    },
    {
      ticker: "TCS",
      name: "Tata Consultancy Services",
      cmp: "4,188.00",
      change: "+35.50",
      pct: "+0.85%",
      up: true,
      volume: "6.8M",
      sector: "IT Services",
    },
    {
      ticker: "TATAMOTORS",
      name: "Tata Motors Ltd.",
      cmp: "824.10",
      change: "-6.40",
      pct: "-0.77%",
      up: false,
      volume: "14.2M",
      sector: "Automobile",
    },
    {
      ticker: "LT",
      name: "Larsen & Toubro Ltd.",
      cmp: "3,612.00",
      change: "+28.00",
      pct: "+0.78%",
      up: true,
      volume: "1.9M",
      sector: "Capital Goods",
    },
    {
      ticker: "SBIN",
      name: "State Bank of India",
      cmp: "834.70",
      change: "+5.10",
      pct: "+0.61%",
      up: true,
      volume: "11.4M",
      sector: "PSU Banking",
    },
  ];

  // Today's High-Conviction Trading Calls (Indian Market Specific with Locked vs. Unlocked Teaser)
  const tradingCalls = [
    {
      id: "call-1",
      scrip: "BANKNIFTY 51800 CE",
      instrumentType: "OPTIONS",
      segment: "NSE F&O",
      expiry: "Current Weekly Expiry",
      side: "BUY",
      entry: "₹240 - ₹250",
      target1: "₹340",
      target2: "₹420",
      stopLoss: "₹180",
      riskReward: "1:2.4",
      status: "ACTIVE",
      currentPrice: "₹288 (+17.5%)",
      analyst: "Amitabh Verma, CMT",
      sebiReg: "SEBI Reg. INH000008492",
      deliveredTime: "10:15 AM (Live Session)",
      rationale:
        "HDFC Bank and ICICI Bank breaking 5-minute resistance simultaneously. High call open interest unwinding observed at 51,700 strike.",
      isLocked: false,
    },
    {
      id: "call-locked-1",
      scrip: "BANKNIFTY 51200 PE (0DTE Hero-Zero)",
      instrumentType: "OPTIONS",
      segment: "NSE F&O",
      expiry: "Thursday Weekly Expiry",
      side: "BUY",
      entry: "₹•• - ₹••",
      target1: "₹••• (3.2x)",
      target2: "₹••• (5.5x)",
      stopLoss: "₹••",
      riskReward: "1:4.5",
      status: "HIGH CONVICTION",
      currentPrice: "Live Trailing in Private Feed",
      analyst: "Amitabh Verma, CMT",
      sebiReg: "SEBI Reg. INH000008492",
      deliveredTime: "11:30 AM (Private Discord/WhatsApp)",
      rationale:
        "Severe call accumulation at 51,500 with Put unwinding. Extreme gamma explosion expected on intraday breakdown below 51,320 pivot.",
      isLocked: true,
      unlockPlan: "Nifty & Bank Nifty F&O Alpha Pass",
      planHref: "/plans",
    },
    {
      id: "call-2",
      scrip: "RELIANCE",
      instrumentType: "DELIVERY",
      segment: "NSE Cash (Swing)",
      expiry: "Holding Period: 2-3 Weeks",
      side: "BUY",
      entry: "₹1,265 - ₹1,272",
      target1: "₹1,340",
      target2: "₹1,390",
      stopLoss: "₹1,230",
      riskReward: "1:3.0",
      status: "ACTIVE",
      currentPrice: "₹1,274.50 (+1.46%)",
      analyst: "Rohan Singhal, CFA",
      sebiReg: "SEBI Reg. INH000011204",
      deliveredTime: "09:35 AM",
      rationale:
        "Double bottom formation completed on daily timeframe near 200 EMA support. Refined products margin recovery boosting earnings outlook.",
      isLocked: false,
    },
    {
      id: "call-locked-2",
      scrip: "[VIP] ENER*** POWER TECH LTD",
      instrumentType: "DELIVERY",
      segment: "NSE Smallcap (Multibagger)",
      expiry: "Holding Period: 3-6 Months",
      side: "BUY",
      entry: "₹••• - ₹•••",
      target1: "₹••• (+65%)",
      target2: "₹••• (+140%)",
      stopLoss: "₹••• (-8%)",
      riskReward: "1:8.0",
      status: "TOP ALPHA PICK",
      currentPrice: "Accumulating at Institutional Pivot",
      analyst: "Rohan Singhal, CFA",
      sebiReg: "SEBI Reg. INH000011204",
      deliveredTime: "Today 08:30 AM (Pre-Market Memo)",
      rationale:
        "Exclusive institutional order book expansion: Q2 revenue jumped 180% YoY, debt-free balance sheet, solar inverter PLI scheme allocation.",
      isLocked: true,
      unlockPlan: "All-Access Bharat VIP Pass",
      planHref: "/plans",
    },
    {
      id: "call-3",
      scrip: "NIFTY 24150 PE",
      instrumentType: "OPTIONS",
      segment: "NSE F&O",
      expiry: "Weekly Expiry",
      side: "BUY",
      entry: "₹110 - ₹115",
      target1: "₹165",
      target2: "₹210",
      stopLoss: "₹80",
      riskReward: "1:2.8",
      status: "TARGET 1 HIT",
      currentPrice: "₹172 (+49.5%)",
      analyst: "Pooja Hegde, NISM-XV",
      sebiReg: "SEBI Reg. INH000009842",
      deliveredTime: "Yesterday 02:40 PM",
      rationale:
        "Intraday rejection at 24,200 call-writing wall. Target 1 achieved with +50% return. Book 70% and trail SL to cost.",
      isLocked: false,
    },
    {
      id: "call-locked-3",
      scrip: "DIXON TECH 14800 CE",
      instrumentType: "OPTIONS",
      segment: "NSE F&O",
      expiry: "Monthly Expiry",
      side: "BUY",
      entry: "₹••• - ₹•••",
      target1: "₹••• (+75%)",
      target2: "₹••• (+120%)",
      stopLoss: "₹•••",
      riskReward: "1:3.2",
      status: "BREAKOUT ACTIVE",
      currentPrice: "Surging +22% Post Entry",
      analyst: "Amitabh Verma, CMT",
      sebiReg: "SEBI Reg. INH000008492",
      deliveredTime: "10:45 AM",
      rationale:
        "All-time high cup-and-handle breakout on electronics manufacturing index. Volume surged 3.8x above 20-day moving average.",
      isLocked: true,
      unlockPlan: "Nifty & Bank Nifty F&O Alpha Pass",
      planHref: "/plans",
    },
    {
      id: "call-4",
      scrip: "TATAPOWER",
      instrumentType: "DELIVERY",
      segment: "NSE Cash (Positional)",
      expiry: "Holding Period: 1 Month",
      side: "BUY",
      entry: "₹432 - ₹436",
      target1: "₹475",
      target2: "₹510",
      stopLoss: "₹415",
      riskReward: "1:3.4",
      status: "ACTIVE",
      currentPrice: "₹438.40 (+1.2%)",
      analyst: "Rohan Singhal, CFA",
      sebiReg: "SEBI Reg. INH000011204",
      deliveredTime: "09:45 AM",
      rationale:
        "Renewable energy capacity commissioning ahead of schedule. Institutional delivery percentage over 64% in last 3 sessions.",
      isLocked: false,
    },
  ];

  const filteredCalls = tradingCalls.filter((c) => {
    let matchesSegment = true;
    if (selectedSegment === "FREE") {
      matchesSegment = !c.isLocked;
    } else if (selectedSegment === "LOCKED") {
      matchesSegment = c.isLocked === true;
    } else if (selectedSegment !== "ALL") {
      matchesSegment = c.instrumentType === selectedSegment;
    }

    const matchesSearch =
      c.scrip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.segment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.analyst.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Hero Banner with Indian Market Overview & Direct Store CTAs */}
        <div className="bg-gradient-to-br from-brand-card via-brand-dark to-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="sigma-badge-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5" /> SEBI Registered Advisory & Academy
                </span>
                <span className="text-xs text-brand-muted">• Real-Time NSE / BSE Prices</span>
                <span className="text-xs text-brand-green font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" /> Live Market Session
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Indian Market Alpha, <br />
                <span className="sigma-gradient-text">Signals & Academy Store</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
                Unlock certified high-conviction Nifty & Bank Nifty F&O setups, multibagger cash swings, and master institutional trading strategies from SEBI-registered mentors.
              </p>

              {/* Action Pillars & Audited Ledger */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/plans"
                  className="sigma-btn-gold text-xs !py-3 !px-5 font-bold flex items-center gap-2 shadow-lg shadow-brand-gold/20"
                >
                  <Sparkles className="h-4 w-4" />
                  Subscription Plans & Tips Store
                </Link>
                <Link
                  href="/courses"
                  className="sigma-btn-primary text-xs !py-3 !px-5 font-bold flex items-center gap-2 shadow-lg shadow-brand-blue/20"
                >
                  <GraduationCap className="h-4 w-4" />
                  Academy Courses Store
                </Link>
                <button
                  onClick={() => setIsVerifiedPnlOpen(true)}
                  className="sigma-btn-outline text-xs !py-3 !px-4 font-bold flex items-center gap-2 border-brand-green/40 text-brand-green hover:bg-brand-green/10"
                >
                  <ShieldCheck className="h-4 w-4 text-brand-green" />
                  Sensibull Audited Ledger
                </button>
                <Link
                  href="/dashboard"
                  className="sigma-btn-outline text-xs !py-3 !px-4 font-bold flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  My Customer Profile
                </Link>
              </div>
            </div>

            {/* Quick Live Stats Pill Box */}
            <div className="grid grid-cols-2 gap-3 sm:w-80 bg-brand-dark/80 p-4 rounded-2xl border border-brand-border/80 shadow-inner">
              <button
                onClick={() => setIsVerifiedPnlOpen(true)}
                className="p-3 bg-brand-card/70 hover:bg-brand-card rounded-xl border border-brand-border/40 hover:border-brand-gold/60 text-left transition-all group cursor-pointer"
                title="Click to view verified P&L breakdown"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">
                    Historical Win Rate
                  </span>
                  <ExternalLink className="h-3 w-3 text-brand-gold opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-2xl font-black text-brand-gold font-mono group-hover:scale-105 inline-block transition-transform">
                  82.4%
                </span>
                <span className="text-[10px] text-brand-green font-semibold block flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 inline" /> Sensibull Audited ↗
                </span>
              </button>
              <div className="p-3 bg-brand-card/70 rounded-xl border border-brand-border/40">
                <span className="text-[10px] uppercase font-bold text-brand-muted block">
                  Active Calls Today
                </span>
                <span className="text-2xl font-black text-brand-green font-mono">7 Signals</span>
                <span className="text-[10px] text-brand-muted block">3 Free • 4 Premium</span>
              </div>
              <div className="p-3 bg-brand-card/70 rounded-xl border border-brand-border/40">
                <span className="text-[10px] uppercase font-bold text-brand-muted block">
                  Academy Students
                </span>
                <span className="text-2xl font-black text-brand-blue font-mono">5,200+</span>
                <span className="text-[10px] text-brand-muted block">Active Learners</span>
              </div>
              <div className="p-3 bg-brand-card/70 rounded-xl border border-brand-border/40">
                <span className="text-[10px] uppercase font-bold text-brand-muted block">
                  SEBI Research
                </span>
                <span className="text-2xl font-black text-white font-mono">100%</span>
                <span className="text-[10px] text-brand-green block">Reg. Compliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Major Market Indices (Today's Live Prices) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-blue" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Major Market Indices (Today&apos;s Live Prices)
              </h2>
            </div>
            <span className="text-[11px] text-brand-green font-semibold flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              NSE / BSE Real-Time Feed
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {majorIndices.map((idx, i) => (
              <div
                key={i}
                className="sigma-card p-3.5 border-brand-border hover:border-brand-blue/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white text-xs">{idx.name}</span>
                  <span className="text-[9px] text-brand-muted uppercase font-mono">
                    {idx.exchange}
                  </span>
                </div>
                <div className="text-base font-black text-white font-mono">
                  ₹{idx.price}
                </div>
                <div
                  className={`flex items-center text-xs font-bold font-mono mt-0.5 ${
                    idx.up ? "text-brand-green" : "text-brand-red"
                  }`}
                >
                  {idx.up ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {idx.change} ({idx.pct})
                </div>
                <div className="mt-2 pt-2 border-t border-brand-border/40 flex justify-between text-[9px] text-brand-muted">
                  <span>H: ₹{idx.dayHigh}</span>
                  <span>L: ₹{idx.dayLow}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Today's Most Active Indian Equities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-gold" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Most Active Indian Equities (NSE Bluechips)
              </h2>
            </div>
            <span className="text-xs text-brand-muted">Cash Segment Volume Leaders</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {topStocks.map((stk, i) => (
              <div
                key={i}
                className="p-3 bg-brand-dark/90 rounded-2xl border border-brand-border hover:border-brand-gold/40 transition-all"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-white font-mono">{stk.ticker}</span>
                  <span className="text-[9px] text-brand-muted">{stk.volume}</span>
                </div>
                <div className="text-[11px] text-brand-muted truncate mb-1">{stk.name}</div>
                <div className="text-sm font-black text-white font-mono">₹{stk.cmp}</div>
                <div
                  className={`text-[11px] font-bold font-mono ${
                    stk.up ? "text-brand-green" : "text-brand-red"
                  }`}
                >
                  {stk.pct}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: High-Conviction Indian Trading Calls with LOCKED VS. UNLOCKED TEASER */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-brand-gold" />
                <h2 className="text-xl font-bold text-white">
                  Today&apos;s Active Indian Trading Calls & Setups
                </h2>
                <span className="sigma-badge-blue text-[10px] font-bold">
                  {filteredCalls.length} Signals
                </span>
              </div>
              <p className="text-xs text-brand-muted">
                Public preview calls include full execution levels. Premium institutional calls are locked and unlocked with subscription passes.
              </p>
            </div>

            {/* Segment & Lock Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All Calls (7)", val: "ALL" },
                { label: "🔓 Free Public (4)", val: "FREE" },
                { label: "🔒 Premium Locked (3)", val: "LOCKED" },
                { label: "Options F&O", val: "OPTIONS" },
                { label: "Cash Delivery", val: "DELIVERY" },
              ].map((seg) => (
                <button
                  key={seg.val}
                  onClick={() => setSelectedSegment(seg.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSegment === seg.val
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calls Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCalls.map((call) => {
              const isLocked = call.isLocked;

              return (
                <div
                  key={call.id}
                  className={`sigma-card p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isLocked
                      ? "border-brand-gold/40 hover:border-brand-gold/70 bg-gradient-to-br from-brand-card via-brand-dark to-brand-card shadow-xl"
                      : "border-brand-border hover:border-brand-blue/50"
                  }`}
                >
                  <div>
                    {/* Top Bar: Scrip, Side, Status & Lock Tag */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-black text-white font-mono flex items-center gap-1.5">
                          {isLocked && <Lock className="h-4 w-4 text-brand-gold shrink-0" />}
                          {call.scrip}
                        </span>
                        <span
                          className={`font-black text-[10px] px-2 py-0.5 rounded ${
                            isLocked
                              ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
                              : "sigma-badge-green"
                          }`}
                        >
                          {call.side}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isLocked
                              ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/40"
                              : call.status === "ACTIVE"
                              ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/40"
                              : "bg-brand-green/20 text-brand-green border border-brand-green/40"
                          }`}
                        >
                          {call.status}
                        </span>
                        <span className="text-[10px] text-brand-muted flex items-center gap-0.5">
                          <Clock className="h-3 w-3" /> {call.deliveredTime}
                        </span>
                      </div>
                    </div>

                    {/* Segment & Analyst Tag */}
                    <div className="flex items-center justify-between text-xs text-brand-muted mb-4 pb-2 border-b border-brand-border/60">
                      <span className="font-semibold text-brand-gold">
                        {call.segment} • {call.expiry}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-white">
                        R:R {call.riskReward}
                      </span>
                    </div>

                    {/* Numerical Levels Matrix (Locked vs Unlocked) */}
                    {isLocked ? (
                      <div className="relative mb-4">
                        <div className="grid grid-cols-4 gap-2 bg-brand-dark/90 p-3 rounded-xl border border-brand-gold/30 text-center select-none filter blur-[2.5px] opacity-60">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Buy Zone
                            </span>
                            <span className="text-xs font-bold text-brand-gold font-mono">
                              {call.entry}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Target 1
                            </span>
                            <span className="text-xs font-bold text-brand-green font-mono">
                              {call.target1}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Target 2
                            </span>
                            <span className="text-xs font-bold text-brand-green font-mono">
                              {call.target2}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Stop Loss
                            </span>
                            <span className="text-xs font-bold text-brand-red font-mono">
                              {call.stopLoss}
                            </span>
                          </div>
                        </div>

                        {/* Lock Overlay Banner */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-brand-dark/95 border border-brand-gold/60 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                            <Lock className="h-3.5 w-3.5 text-brand-gold animate-bounce" />
                            <span className="text-xs font-extrabold text-brand-gold">
                              Coordinates Locked for Members
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 bg-brand-dark/80 p-3 rounded-xl border border-brand-border mb-4 text-center">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-brand-muted block">
                            Buy Zone
                          </span>
                          <span className="text-xs font-bold text-white font-mono">
                            {call.entry}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-brand-muted block">
                            Target 1
                          </span>
                          <span className="text-xs font-bold text-brand-green font-mono">
                            {call.target1}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-brand-muted block">
                            Target 2
                          </span>
                          <span className="text-xs font-bold text-brand-green font-mono">
                            {call.target2}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-brand-muted block">
                            Stop Loss
                          </span>
                          <span className="text-xs font-bold text-brand-red font-mono">
                            {call.stopLoss}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Live Status Tracker */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-brand-muted">Current Live Tick:</span>
                      <span
                        className={`font-bold font-mono ${
                          isLocked ? "text-brand-gold" : "text-brand-green"
                        }`}
                      >
                        {call.currentPrice}
                      </span>
                    </div>

                    {/* Rationale / Teaser Box */}
                    {isLocked ? (
                      <div className="bg-brand-dark/90 p-3 rounded-xl border border-brand-gold/30 mb-4 relative">
                        <div className="flex items-center gap-1.5 text-brand-gold text-xs font-bold mb-1">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Requires {call.unlockPlan}</span>
                        </div>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {call.rationale}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-brand-muted leading-relaxed bg-brand-dark/40 p-3 rounded-xl border border-brand-border/40 mb-4">
                        <strong className="text-white">Research Rationale:</strong> {call.rationale}
                      </p>
                    )}
                  </div>

                  {/* Bottom Bar: SEBI Analyst Info & CTA */}
                  <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-bold block text-[11px]">
                        {call.analyst}
                      </span>
                      <span className="text-[9px] text-brand-muted">
                        {call.sebiReg}
                      </span>
                    </div>

                    {isLocked ? (
                      <Link
                        href="/plans"
                        className="sigma-btn-gold text-[11px] !py-2 !px-4 font-bold flex items-center gap-1.5 shadow-md shadow-brand-gold/20"
                      >
                        <Lock className="h-3 w-3" />
                        Unlock Call (View Plans →)
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard"
                        className="sigma-btn-primary text-[11px] !py-2 !px-3.5 font-semibold flex items-center gap-1"
                      >
                        <User className="h-3 w-3" />
                        Track in Profile →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Academy & Courses Store Showcase */}
        <div className="bg-gradient-to-r from-brand-card via-brand-dark to-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-5 w-5 text-brand-blue" />
                <h2 className="text-xl font-bold text-white">
                  SIGMAPRO Bharat Academy Store
                </h2>
                <span className="sigma-badge-blue text-[10px] font-bold">Self-Paced Courses</span>
              </div>
              <p className="text-xs text-brand-muted">
                Learn institutional order flow, gamma scalping, and valuation frameworks from certified market veterans.
              </p>
            </div>

            <Link
              href="/courses"
              className="sigma-btn-primary text-xs !py-2.5 !px-5 font-bold flex items-center gap-1.5 self-start sm:self-auto"
            >
              Browse All Courses <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Course Card 1 */}
            <div className="p-5 bg-brand-dark/80 rounded-2xl border border-brand-border hover:border-brand-blue/50 flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="sigma-badge-gold text-[10px] font-bold">F&O Derivatives</span>
                  <div className="flex items-center gap-1 text-xs text-brand-gold font-bold">
                    <Star className="h-3.5 w-3.5 fill-brand-gold" />
                    <span>4.9 (420 reviews)</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors mb-1.5">
                  Bank Nifty Zero-to-Hero Expiry Strategy Mastery
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-4">
                  Master intraday gamma spikes, open interest unwinding & 0DTE options strike selection with strict 1:3 R:R.
                </p>

                <div className="flex items-center gap-4 text-xs text-brand-muted mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-blue" /> 14.5 Hours
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-brand-gold" /> 12 Video Modules
                  </span>
                  <span className="flex items-center gap-1 text-brand-green">
                    <Award className="h-3.5 w-3.5" /> Certificate
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-muted line-through mr-2">₹4,999</span>
                  <span className="text-lg font-black text-white font-mono">₹1,999</span>
                </div>
                <Link
                  href="/courses"
                  className="sigma-btn-primary text-xs !py-2 !px-4 font-bold flex items-center gap-1"
                >
                  <Play className="h-3 w-3" /> Preview & Enroll
                </Link>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="p-5 bg-brand-dark/80 rounded-2xl border border-brand-border hover:border-brand-green/50 flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="sigma-badge-green text-[10px] font-bold">Order Flow & Price Action</span>
                  <div className="flex items-center gap-1 text-xs text-brand-gold font-bold">
                    <Star className="h-3.5 w-3.5 fill-brand-gold" />
                    <span>4.95 (580 reviews)</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-brand-green transition-colors mb-1.5">
                  Institutional Order Flow & Smart Money Concepts (NSE)
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-4">
                  Decode institutional block deals, volume footprint imbalances, and liquidity sweeps in Indian equities and futures.
                </p>

                <div className="flex items-center gap-4 text-xs text-brand-muted mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-green" /> 18.0 Hours
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-brand-gold" /> 16 Modules
                  </span>
                  <span className="flex items-center gap-1 text-brand-green">
                    <Award className="h-3.5 w-3.5" /> Certificate
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-muted line-through mr-2">₹5,999</span>
                  <span className="text-lg font-black text-white font-mono">₹2,499</span>
                </div>
                <Link
                  href="/courses"
                  className="sigma-btn-primary text-xs !py-2 !px-4 font-bold flex items-center gap-1"
                >
                  <Play className="h-3 w-3" /> Preview & Enroll
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Subscription Plans & Calls Store Teaser */}
        <div className="bg-gradient-to-br from-brand-card to-brand-dark border border-brand-gold/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="h-5 w-5 text-brand-gold" />
                <h2 className="text-xl font-bold text-white">
                  Subscription Plans & Advisory Calls Store
                </h2>
                <span className="sigma-badge-gold text-[10px] font-bold">Tiered Access</span>
              </div>
              <p className="text-xs text-brand-muted">
                Choose the advisory package suited for your capital size and trading style with instant pass unlock.
              </p>
            </div>

            <Link
              href="/plans"
              className="sigma-btn-gold text-xs !py-2.5 !px-5 font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-brand-gold/20"
            >
              Compare All Plans <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Plan Card 1 */}
            <div className="p-5 bg-brand-dark/90 rounded-2xl border border-brand-border hover:border-brand-blue/50 flex flex-col justify-between">
              <div>
                <span className="sigma-badge-blue text-[10px] font-bold mb-2 inline-block">Active Day Traders</span>
                <h4 className="text-base font-bold text-white mb-1">F&O Alpha Pass</h4>
                <p className="text-xs text-brand-muted mb-4">
                  Intraday Nifty & Bank Nifty options with Hero-Zero expiry special alerts.
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-black text-white font-mono">₹4,999</span>
                  <span className="text-xs text-brand-muted"> / month</span>
                </div>
                <ul className="text-xs text-brand-muted space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> 2-4 Daily Index Option Calls
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> Trailing SL & Gamma Spike alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> Telegram & WhatsApp instant push
                  </li>
                </ul>
              </div>
              <Link href="/plans" className="sigma-btn-primary w-full text-xs !py-2 font-bold justify-center">
                Unlock F&O Alpha Pass
              </Link>
            </div>

            {/* Plan Card 2 (Recommended) */}
            <div className="p-5 bg-brand-dark/90 rounded-2xl border-2 border-brand-gold/60 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                Most Popular VIP
              </div>
              <div>
                <span className="sigma-badge-gold text-[10px] font-bold mb-2 inline-block">Complete Solution</span>
                <h4 className="text-base font-bold text-white mb-1">All-Access Bharat VIP Pass</h4>
                <p className="text-xs text-brand-muted mb-4">
                  Everything included: F&O Day Trading + Cash Swing + Multibaggers + Academy Store.
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-black text-brand-gold font-mono">₹8,999</span>
                  <span className="text-xs text-brand-muted"> / month</span>
                </div>
                <ul className="text-xs text-brand-muted space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold" /> ALL F&O Signals & Zero-to-Hero
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold" /> 3x Multibagger Smallcap research
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold" /> Full Access to All 4 Academy Courses
                  </li>
                </ul>
              </div>
              <Link href="/plans" className="sigma-btn-gold w-full text-xs !py-2 font-bold justify-center">
                Unlock All-Access VIP Pass
              </Link>
            </div>

            {/* Plan Card 3 */}
            <div className="p-5 bg-brand-dark/90 rounded-2xl border border-brand-border hover:border-brand-green/50 flex flex-col justify-between">
              <div>
                <span className="sigma-badge-green text-[10px] font-bold mb-2 inline-block">Working Professionals</span>
                <h4 className="text-base font-bold text-white mb-1">Cash Swing Multibaggers</h4>
                <p className="text-xs text-brand-muted mb-4">
                  Positional delivery setups for steady wealth creation without screen time stress.
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-black text-white font-mono">₹4,499</span>
                  <span className="text-xs text-brand-muted"> / month</span>
                </div>
                <ul className="text-xs text-brand-muted space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> 4-6 Monthly Positional Swings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> 1-3 Month Target Horizons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> SEBI Detailed Fundamental Reports
                  </li>
                </ul>
              </div>
              <Link href="/plans" className="sigma-btn-outline w-full text-xs !py-2 font-bold justify-center">
                Unlock Cash Swing Pass
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Profile Banner CTA */}
        <div className="bg-gradient-to-r from-brand-card via-brand-dark to-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 sigma-badge-gold text-xs mb-2 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> SEBI Compliant Customer Dossier
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Access Your Personal Customer Profile & Demat Sync
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
              Track your enrolled academy courses, active subscription passes, Zerodha/Groww demat sync, and live portfolio execution in one unified command center.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="sigma-btn-gold text-xs !py-3 !px-6 font-bold shrink-0 flex items-center gap-2"
          >
            <User className="h-4 w-4" /> Go To Customer Profile Dashboard
          </Link>
        </div>
      </main>

      <Footer />

      {/* Sensibull Audited Performance Ledger Modal */}
      <VerifiedPnlModal
        isOpen={isVerifiedPnlOpen}
        onClose={() => setIsVerifiedPnlOpen(false)}
      />
    </>
  );
}
