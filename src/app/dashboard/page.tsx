"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  FileText,
  Bell,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Smartphone,
  Mail,
  ChevronRight,
  Sparkles,
  Edit2,
  Check,
  Activity,
  PieChart as PieIcon,
  Compass,
  Zap,
  Target,
  BarChart3,
  DollarSign,
  Download,
  AlertCircle,
  Briefcase,
  Share2,
  RefreshCw,
  Building,
  GraduationCap,
  Play,
  Award,
  X,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import {
  useAuth,
  PRESET_PROFILES,
  INITIAL_COURSES,
  INITIAL_SUBSCRIPTIONS,
  EnrolledCourse,
  ActiveSubscription,
} from "@/lib/auth-context";

export default function CustomerProfileDashboard() {
  const {
    user,
    updateProfile,
    loginAsPreset,
    setIsEditModalOpen,
    setIsSignInModalOpen,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "PORTFOLIO" | "COURSES" | "SUBSCRIPTIONS" | "KYC" | "ALERTS"
  >("PORTFOLIO");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "ALL">("1M");
  const [selectedCourseLesson, setSelectedCourseLesson] = useState<EnrolledCourse | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<EnrolledCourse | null>(null);
  const [invoiceNotice, setInvoiceNotice] = useState<string | null>(null);

  const customer = user || PRESET_PROFILES.rajesh;

  // Sync tab from URL query param if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "courses") setActiveTab("COURSES");
      else if (tab === "subscriptions" || tab === "plans") setActiveTab("SUBSCRIPTIONS");
      else if (tab === "kyc") setActiveTab("KYC");
      else if (tab === "alerts") setActiveTab("ALERTS");
    }
  }, []);

  const enrolledCourses =
    customer.enrolledCourses && customer.enrolledCourses.length > 0
      ? customer.enrolledCourses
      : INITIAL_COURSES;

  const activeSubscriptions =
    customer.activeSubscriptions && customer.activeSubscriptions.length > 0
      ? customer.activeSubscriptions
      : INITIAL_SUBSCRIPTIONS;

  // Performance Curve Points (SVG line chart data)
  const chartPoints = [
    { label: "1 Oct", val: 245000, x: 20, y: 155 },
    { label: "6 Oct", val: 258000, x: 100, y: 140 },
    { label: "12 Oct", val: 252000, x: 180, y: 148 },
    { label: "18 Oct", val: 278000, x: 260, y: 115 },
    { label: "24 Oct", val: 295000, x: 340, y: 88 },
    { label: "30 Oct", val: 304000, x: 420, y: 70 },
    { label: "5 Nov", val: 328000, x: 500, y: 40 },
    { label: "Today", val: 340870, x: 580, y: 22 },
  ];

  const svgPathD = chartPoints.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ""
  );

  const svgAreaD = `${svgPathD} L ${chartPoints[chartPoints.length - 1].x} 180 L ${chartPoints[0].x} 180 Z`;

  // Allocation breakdown
  const allocations = [
    { name: "Index Options (F&O)", pct: 45, val: "₹1,53,390", color: "#3b82f6" },
    { name: "Large Cap Cash Swing", pct: 30, val: "₹1,02,260", color: "#10b981" },
    { name: "Midcap Multibaggers", pct: 15, val: "₹51,130", color: "#f59e0b" },
    { name: "Cash Reserve / Margin", pct: 10, val: "₹34,090", color: "#6366f1" },
  ];

  // Tracked Positions
  const trackedCalls = [
    {
      id: "pos-1",
      scrip: "BANKNIFTY 51800 CE",
      type: "OPTIONS",
      buyPrice: 245.0,
      cmp: 288.0,
      qty: 150,
      investment: "₹36,750",
      currentValue: "₹43,200",
      pnl: "+₹6,450",
      pnlPct: "+17.5%",
      up: true,
      target: "₹340",
      stopLoss: "₹180",
      status: "RUNNING",
      analyst: "Amitabh Verma, CMT",
      riskReward: "1:2.4",
      progress: 68,
    },
    {
      id: "pos-2",
      scrip: "RELIANCE",
      type: "DELIVERY",
      buyPrice: 1268.0,
      cmp: 1274.5,
      qty: 100,
      investment: "₹1,26,800",
      currentValue: "₹1,27,450",
      pnl: "+₹650",
      pnlPct: "+0.51%",
      up: true,
      target: "₹1,340",
      stopLoss: "₹1,230",
      status: "RUNNING",
      analyst: "Rohan Singhal, CFA",
      riskReward: "1:3.0",
      progress: 25,
    },
    {
      id: "pos-3",
      scrip: "TATAPOWER",
      type: "DELIVERY",
      buyPrice: 434.0,
      cmp: 438.4,
      qty: 300,
      investment: "₹1,30,200",
      currentValue: "₹1,31,520",
      pnl: "+₹1,320",
      pnlPct: "+1.01%",
      up: true,
      target: "₹475",
      stopLoss: "₹415",
      status: "RUNNING",
      analyst: "Rohan Singhal, CFA",
      riskReward: "1:3.4",
      progress: 32,
    },
    {
      id: "pos-4",
      scrip: "NIFTY 24150 PE",
      type: "OPTIONS",
      buyPrice: 112.0,
      cmp: 172.0,
      qty: 225,
      investment: "₹25,200",
      currentValue: "₹38,700",
      pnl: "+₹13,500",
      pnlPct: "+53.5%",
      up: true,
      target: "₹165 (Hit)",
      stopLoss: "₹112 (Cost)",
      status: "TARGET 1 HIT",
      analyst: "Pooja Hegde, NISM",
      riskReward: "1:2.8",
      progress: 100,
    },
  ];

  const subscriptions = [
    {
      id: "sub-1",
      serviceName: "Nifty & Bank Nifty F&O Pro Pack",
      price: "₹4,999 / month",
      billingMethod: "UPI AutoPay (HDFC Bank ••••4102)",
      validTill: "28 Nov 2026",
      status: "ACTIVE",
      analyst: "Amitabh Verma, CMT (SEBI Reg. INH000008492)",
    },
    {
      id: "sub-2",
      serviceName: "NSE Midcap Multibaggers (Cash Swing)",
      price: "₹9,999 / quarter",
      billingMethod: "Razorpay NetBanking (ICICI Bank)",
      validTill: "15 Jan 2027",
      status: "ACTIVE",
      analyst: "Rohan Singhal, CFA (SEBI Reg. INH000011204)",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Quick Switch Personas Header Bar */}
        <div className="bg-brand-card/90 border border-brand-border rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-gold shrink-0" />
            <span className="text-xs text-brand-muted">
              Active Persona: <strong className="text-white">{customer.name}</strong> ({customer.accountTier})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">
              Switch Persona:
            </span>
            <button
              onClick={() => loginAsPreset("rajesh")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                customer.name.includes("Rajesh")
                  ? "bg-brand-blue text-white shadow"
                  : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
              }`}
            >
              Rajesh (F&O)
            </button>
            <button
              onClick={() => loginAsPreset("priya")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                customer.name.includes("Priya")
                  ? "bg-brand-green text-white shadow"
                  : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
              }`}
            >
              Priya (HNI Cash)
            </button>
            <button
              onClick={() => loginAsPreset("vikram")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                customer.name.includes("Vikram")
                  ? "bg-brand-gold text-black shadow"
                  : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
              }`}
            >
              Vikram (Scalper)
            </button>
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="sigma-btn-outline text-[11px] !py-1 !px-2.5 ml-1"
            >
              <Smartphone className="h-3 w-3 mr-1" /> Custom Login
            </button>
          </div>
        </div>

        {/* HERO: Investor Command Card */}
        <div className="relative bg-gradient-to-br from-brand-card via-[#111927] to-brand-card border border-brand-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Avatar + Identity */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="relative">
                <div
                  className={`h-18 w-18 sm:h-22 sm:w-22 rounded-2xl bg-gradient-to-br ${
                    customer.avatarColor || "from-blue-600 to-indigo-600"
                  } p-0.5 shadow-xl`}
                >
                  <div className="h-full w-full bg-brand-navy rounded-2xl flex items-center justify-center text-white font-black text-2xl sm:text-3xl font-mono">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-brand-green border-2 border-brand-navy rounded-full flex items-center justify-center text-black shadow">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {customer.name}
                  </h1>
                  <span className="sigma-badge-green text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> {customer.kycStatus}
                  </span>
                  <span className="sigma-badge-gold text-xs font-bold">
                    {customer.accountTier}
                  </span>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="sigma-btn-outline text-xs !py-1 !px-2.5 font-bold ml-1 flex items-center gap-1.5 border-brand-blue/40 text-brand-blue hover:text-white hover:bg-brand-blue/20"
                  >
                    <Edit2 className="h-3 w-3" /> Edit Profile Studio
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-muted">
                  <span>
                    Client ID: <strong className="text-white font-mono">{customer.clientId}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    PAN: <strong className="text-white font-mono">{customer.pan}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Demat: <strong className="text-brand-blue font-semibold">{customer.dematBroker} ({customer.dematClientId})</strong>
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-brand-muted">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-brand-green" /> {customer.phone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-brand-blue" /> {customer.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-brand-gold">
                    <Compass className="h-3.5 w-3.5" /> Capital: {customer.tradingCapital}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Balance & Value Highlights */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-brand-border/60">
              <div className="bg-brand-dark/90 border border-brand-border/90 rounded-2xl p-4 sm:p-5 text-right flex-1 sm:flex-none min-w-[200px]">
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block mb-0.5">
                  Total Tracked Portfolio Value
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ₹3,40,870
                </div>
                <div className="flex items-center justify-end gap-1 text-xs font-bold text-brand-green font-mono mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>+₹45,870 (+15.5%) All-Time</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="sigma-btn-gold text-xs !py-3 !px-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/10"
                >
                  <Edit2 className="h-3.5 w-3.5" /> Edit Full Profile & Demat
                </button>
                <Link
                  href="/"
                  className="sigma-btn-primary text-xs !py-2.5 !px-4 font-bold flex items-center justify-center gap-2"
                >
                  <Zap className="h-3.5 w-3.5" /> View Live Calls
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Illustrative Hero Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's P&L */}
          <div className="sigma-card p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-brand-muted tracking-wider">
                Today&apos;s Running P&L
              </span>
              <div className="h-8 w-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-brand-green font-mono mb-1">
              +₹21,920
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-green font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+6.84% across 4 active calls</span>
            </div>
            <div className="w-full bg-brand-dark rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-brand-green h-full rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          {/* Card 2: Win Rate */}
          <div className="sigma-card p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-brand-muted tracking-wider">
                Accredited Win Rate
              </span>
              <div className="h-8 w-8 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                <Target className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-brand-gold font-mono mb-1">
              82.4%
            </div>
            <div className="text-xs text-brand-muted">
              28 of 34 closed calls hit profit targets
            </div>
            <div className="w-full bg-brand-dark rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-brand-gold h-full rounded-full" style={{ width: "82.4%" }} />
            </div>
          </div>

          {/* Card 3: Capital Deployed */}
          <div className="sigma-card p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-brand-muted tracking-wider">
                Margin & Capital Deployed
              </span>
              <div className="h-8 w-8 rounded-lg bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-white font-mono mb-1">
              ₹3,18,950
            </div>
            <div className="text-xs text-brand-muted flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" />
              <span>Synced with {customer.dematBroker} ({customer.dematClientId})</span>
            </div>
            <div className="w-full bg-brand-dark rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-brand-blue h-full rounded-full" style={{ width: "70%" }} />
            </div>
          </div>

          {/* Card 4: Profit Factor */}
          <div className="sigma-card p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-brand-muted tracking-wider">
                Profit Factor
              </span>
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-indigo-300 font-mono mb-1">
              2.85x
            </div>
            <div className="text-xs text-brand-muted">
              Gross Gains ₹82.4k vs Losses ₹28.9k
            </div>
            <div className="w-full bg-brand-dark rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: "74%" }} />
            </div>
          </div>
        </div>

        {/* ILLUSTRATIVE SECTION: Portfolio Equity Growth Curve & Asset Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Vector Equity Chart */}
          <div className="lg:col-span-2 sigma-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="h-4 w-4 text-brand-green" />
                    Portfolio Equity Growth & Drawdown Curve
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Verified capital trajectory across recommended Indian F&O and Swing positions.
                  </p>
                </div>

                {/* Timeframe Switcher */}
                <div className="flex items-center gap-1 bg-brand-dark p-1 rounded-xl border border-brand-border">
                  {(["1D", "1W", "1M", "ALL"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        timeframe === t
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "text-brand-muted hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vector SVG Chart with Area Gradient */}
              <div className="w-full mt-2">
                <svg
                  viewBox="0 0 600 200"
                  className="w-full h-48 sm:h-56 overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="20" y1="40" x2="580" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="90" x2="580" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="140" x2="580" y2="140" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="180" x2="580" y2="180" stroke="#1e293b" />

                  {/* Gradient Area Fill */}
                  <path d={svgAreaD} fill="url(#equityGradient)" />

                  {/* Glowing Trend Line */}
                  <path
                    d={svgPathD}
                    fill="none"
                    stroke="url(#lineStroke)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Highlight Data Points */}
                  {chartPoints.map((pt, i) => (
                    <g key={i}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="4"
                        fill="#0a0e1a"
                        stroke={i === chartPoints.length - 1 ? "#f59e0b" : "#10b981"}
                        strokeWidth="2.5"
                      />
                      {i === chartPoints.length - 1 && (
                        <g>
                          <rect
                            x={pt.x - 45}
                            y={pt.y - 30}
                            width="90"
                            height="20"
                            rx="4"
                            fill="#151b28"
                            stroke="#f59e0b"
                            strokeWidth="1"
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 16}
                            textAnchor="middle"
                            fill="#f59e0b"
                            fontSize="10"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            ₹3,40,870
                          </text>
                        </g>
                      )}
                    </g>
                  ))}
                </svg>

                {/* X Axis Date labels */}
                <div className="flex justify-between text-[10px] text-brand-muted font-mono px-2 pt-2 border-t border-brand-border/60">
                  {chartPoints.map((pt, i) => (
                    <span key={i}>{pt.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Under Chart */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-border/60 mt-4 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-muted block">
                  Sharpe Ratio
                </span>
                <span className="text-sm font-extrabold text-white font-mono">2.64</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-muted block">
                  Max Drawdown
                </span>
                <span className="text-sm font-extrabold text-brand-green font-mono">-3.8%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-muted block">
                  Average Holding Time
                </span>
                <span className="text-sm font-extrabold text-brand-gold font-mono">3.4 Days</span>
              </div>
            </div>
          </div>

          {/* Right Col: Capital Allocation Breakdown */}
          <div className="sigma-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieIcon className="h-4 w-4 text-brand-gold" />
                  Asset Allocation
                </h3>
                <span className="text-[10px] sigma-badge-blue font-bold">Risk Balanced</span>
              </div>

              {/* Donut Chart */}
              <div className="py-4 flex justify-center">
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray="113.4 251.3"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray="75.4 251.3"
                      strokeDashoffset="-113.4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#f59e0b"
                      strokeWidth="12"
                      strokeDasharray="37.7 251.3"
                      strokeDashoffset="-188.8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#6366f1"
                      strokeWidth="12"
                      strokeDasharray="25.1 251.3"
                      strokeDashoffset="-226.5"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[10px] text-brand-muted font-bold block uppercase">
                      Deployed
                    </span>
                    <span className="text-lg font-black text-white font-mono">
                      90%
                    </span>
                    <span className="text-[9px] text-brand-green block font-semibold">
                      10% Cash
                    </span>
                  </div>
                </div>
              </div>

              {/* Segment Legend */}
              <div className="space-y-2.5 pt-2">
                {allocations.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-brand-muted font-medium">{item.name}</span>
                    </div>
                    <div className="font-mono text-right">
                      <span className="font-bold text-white mr-1.5">{item.val}</span>
                      <span className="text-[10px] text-brand-muted">({item.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/60 mt-4">
              <div className="p-2.5 bg-brand-dark/80 rounded-xl border border-brand-border/60 text-[11px] text-brand-muted flex items-center justify-between">
                <span>SEBI Risk Limit:</span>
                <span className="text-brand-green font-bold">Within 2.5% max capital risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-border pb-3 overflow-x-auto">
          {[
            { id: "PORTFOLIO", label: "Live Calls & Positions", icon: TrendingUp },
            {
              id: "COURSES",
              label: `My Courses (${enrolledCourses.length})`,
              icon: GraduationCap,
            },
            {
              id: "SUBSCRIPTIONS",
              label: `My Subscriptions (${activeSubscriptions.length})`,
              icon: CreditCard,
            },
            { id: "KYC", label: "SEBI KYC & Demat", icon: ShieldCheck },
            { id: "ALERTS", label: "Alert Channels", icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-brand-card text-brand-muted hover:text-white border border-brand-border"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: Detailed Position Tracker with Visual Progress */}
        {activeTab === "PORTFOLIO" && (
          <div className="space-y-6">
            <div className="sigma-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="h-4 w-4 text-brand-gold" />
                    Active High-Conviction Positions & Live Execution Matrix
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Real-time MTM valuation, target journey progress, and trailing stop-loss coordinates.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-muted">Auto-Tick Broadcast</span>
                  <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                </div>
              </div>

              {/* Visual Card Grid for each Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trackedCalls.map((pos) => {
                  return (
                    <div
                      key={pos.id}
                      className="bg-brand-dark/90 border border-brand-border hover:border-brand-blue/50 rounded-2xl p-5 transition-all shadow-md flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Top */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-white font-mono">
                              {pos.scrip}
                            </span>
                            <span className="sigma-badge-blue text-[9px] font-bold">
                              {pos.type}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              pos.status === "RUNNING"
                                ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/30"
                                : "bg-brand-green/20 text-brand-green border border-brand-green/30"
                            }`}
                          >
                            {pos.status}
                          </span>
                        </div>

                        {/* Price Matrix */}
                        <div className="grid grid-cols-4 gap-2 bg-brand-navy p-3 rounded-xl border border-brand-border/60 text-center mb-4">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Entry
                            </span>
                            <span className="text-xs font-mono font-bold text-white">
                              ₹{pos.buyPrice}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Live CMP
                            </span>
                            <span className="text-xs font-mono font-bold text-brand-green">
                              ₹{pos.cmp}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Target TP
                            </span>
                            <span className="text-xs font-mono font-bold text-brand-gold">
                              {pos.target}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-brand-muted block">
                              Stop Loss
                            </span>
                            <span className="text-xs font-mono font-bold text-brand-red">
                              {pos.stopLoss}
                            </span>
                          </div>
                        </div>

                        {/* Journey Progress Bar Towards Target */}
                        <div className="mb-4">
                          <div className="flex justify-between text-[10px] text-brand-muted mb-1 font-semibold">
                            <span>Target Progress Journey</span>
                            <span className="text-brand-green">{pos.progress}% Completed</span>
                          </div>
                          <div className="w-full bg-brand-navy rounded-full h-2 overflow-hidden border border-brand-border/60">
                            <div
                              className="bg-gradient-to-r from-brand-blue to-brand-green h-full rounded-full transition-all duration-500"
                              style={{ width: `${pos.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Returns & Lots Breakdown */}
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-brand-border/60 mb-3">
                          <div className="text-brand-muted">
                            Quantity: <strong className="text-white font-mono">{pos.qty} Units</strong>
                            <span className="text-[10px] block">Capital: {pos.investment}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-brand-green font-mono block">
                              {pos.pnl}
                            </span>
                            <span className="text-[10px] font-bold text-brand-green font-mono">
                              ({pos.pnlPct})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer: Analyst & Broker Action */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[11px] text-brand-muted">
                          Analyst: <strong className="text-white">{pos.analyst}</strong>
                        </span>
                        <button className="text-[11px] text-brand-blue hover:text-white font-bold flex items-center gap-1 transition-colors">
                          One-Click Order Sync ({customer.dematBroker.split(" ")[0]}) <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Customer Profile Course Library */}
        {activeTab === "COURSES" && (
          <div className="space-y-6">
            <div className="sigma-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-5 w-5 text-brand-blue" />
                    <h3 className="text-base font-bold text-white">
                      My Enrolled Trading Academy Courses
                    </h3>
                    <span className="sigma-badge-blue text-[10px] font-bold">
                      {enrolledCourses.length} Enrolled
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Lifetime access to HD video masterclasses, algorithmic trading code templates, and SEBI-accredited completion certificates.
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="sigma-btn-primary text-xs !py-2 !px-4 font-bold flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Explore Academy Store
                </Link>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-5 bg-brand-dark/90 rounded-2xl border border-brand-border hover:border-brand-blue/50 flex flex-col justify-between transition-all shadow-md group"
                  >
                    <div>
                      {/* Top banner pill */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/30">
                          Enrolled on {course.enrolledDate}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            course.progressPercent === 100
                              ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                              : "bg-brand-blue/20 text-brand-blue border border-brand-blue/40"
                          }`}
                        >
                          {course.progressPercent === 100
                            ? "Completed 100%"
                            : `${course.progressPercent}% In Progress`}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors mb-1.5 leading-snug">
                        {course.title}
                      </h4>

                      <p className="text-xs text-brand-muted mb-4">
                        Instructor: <strong className="text-white">{course.instructor}</strong>
                      </p>

                      {/* Progress Bar & Stats */}
                      <div className="space-y-1.5 mb-5 bg-brand-card/70 p-3 rounded-xl border border-brand-border/60">
                        <div className="flex justify-between text-xs">
                          <span className="text-brand-muted font-medium">Curriculum Progress</span>
                          <span className="font-bold text-white font-mono">
                            {course.completedLessons} / {course.totalLessons} Lessons Completed
                          </span>
                        </div>
                        <div className="w-full bg-brand-dark rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              course.progressPercent === 100 ? "bg-brand-green" : "bg-brand-blue"
                            }`}
                            style={{ width: `${course.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedCourseLesson(course)}
                        className="sigma-btn-primary text-xs !py-2 !px-4 font-bold flex items-center gap-1.5"
                      >
                        <Play className="h-3 w-3" />
                        {course.progressPercent === 100 ? "Review Lessons" : "Resume Video Lesson"}
                      </button>

                      {course.progressPercent === 100 && (
                        <button
                          onClick={() => setSelectedCertificate(course)}
                          className="sigma-btn-gold text-xs !py-2 !px-3.5 font-bold flex items-center gap-1.5 shadow-md shadow-brand-gold/15"
                        >
                          <Award className="h-3.5 w-3.5" />
                          View Certificate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Academy Store Upsell Banner */}
              <div className="mt-8 p-5 bg-gradient-to-r from-brand-card via-brand-dark to-brand-card rounded-2xl border border-brand-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-gold" />
                    Want to master more Indian Market strategies?
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Explore Advanced Options Greeks, Institutional Order Flow & Multibagger Valuation masterclasses.
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="sigma-btn-gold text-xs !py-2 !px-4 font-bold shrink-0 self-start sm:self-auto"
                >
                  Visit Academy Store (4 Available) →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: My Subscribed Services & Passes */}
        {activeTab === "SUBSCRIPTIONS" && (
          <div className="space-y-6">
            <div className="sigma-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-5 w-5 text-brand-gold" />
                    <h3 className="text-base font-bold text-white">
                      My Active SEBI Advisory Subscriptions & Calls Store
                    </h3>
                    <span className="sigma-badge-gold text-[10px] font-bold">
                      {activeSubscriptions.length} Active Passes
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Service fees are billed via compliant Indian payment gateways (Razorpay / UPI AutoPay) with official GST invoices.
                  </p>
                </div>

                <Link
                  href="/plans"
                  className="sigma-btn-gold text-xs !py-2 !px-4 font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-brand-gold/20"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Explore All Plans & Passes
                </Link>
              </div>

              {/* Invoices Notification */}
              {invoiceNotice && (
                <div className="mb-4 p-3 bg-brand-green/15 border border-brand-green/40 rounded-xl text-xs text-brand-green font-semibold flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{invoiceNotice}</span>
                  </div>
                  <button
                    onClick={() => setInvoiceNotice(null)}
                    className="text-brand-green/70 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {activeSubscriptions.map((sub, idx) => (
                  <div
                    key={sub.id || idx}
                    className="p-5 bg-brand-dark/90 rounded-2xl border border-brand-border hover:border-brand-gold/40 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-white text-base">
                          {sub.serviceName}
                        </span>
                        <span className="sigma-badge-green text-[10px] font-bold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                          {sub.status}
                        </span>
                        <span className="sigma-badge-gold text-[10px] font-bold">
                          {sub.tier} PASS
                        </span>
                      </div>

                      <div className="text-xs text-brand-muted space-y-1">
                        <p>
                          Lead Analyst: <strong className="text-white">{sub.analyst}</strong>
                        </p>
                        <p>
                          Payment Channel:{" "}
                          <strong className="text-brand-muted font-mono">{sub.billingMethod}</strong>
                        </p>
                        <p>
                          Pass Valid Through:{" "}
                          <strong className="text-brand-gold font-mono">{sub.validTill}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-brand-border/60">
                      <div>
                        <span className="text-2xl font-black text-white font-mono block lg:text-right">
                          {sub.pricePaid}
                        </span>
                        <span className="text-[10px] text-brand-muted block lg:text-right">
                          Includes 18% GST Compliance
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            setInvoiceNotice(
                              `✓ GST Tax Invoice #INV-2026-${1000 + idx} downloaded for ${sub.serviceName} (18% IGST input credit applied).`
                            );
                          }}
                          className="sigma-btn-outline text-[11px] !py-1.5 !px-3 font-semibold inline-flex items-center gap-1.5"
                        >
                          <Download className="h-3 w-3" /> GST Tax Invoice
                        </button>

                        <a
                          href="https://t.me"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sigma-btn-primary text-[11px] !py-1.5 !px-3 font-bold inline-flex items-center gap-1.5"
                        >
                          <ExternalLink className="h-3 w-3" /> VIP Signals Feed
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Plan Upgrade Banner */}
              <div className="mt-8 p-5 bg-gradient-to-r from-brand-card to-brand-dark rounded-2xl border border-brand-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-gold" />
                    Upgrade to All-Access Bharat VIP Pass
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Unlock all F&O Day Trading calls, Cash Multibaggers, and the complete Academy course catalog with 1-click execution.
                  </p>
                </div>
                <Link
                  href="/plans"
                  className="sigma-btn-gold text-xs !py-2.5 !px-5 font-bold shrink-0 self-start sm:self-auto shadow-md shadow-brand-gold/20"
                >
                  View Tiered Plans →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEBI KYC & Risk Profile Dossier */}
        {activeTab === "KYC" && (
          <div className="space-y-6">
            <div className="sigma-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-brand-green" />
                    SEBI Mandated Investor Classification & KYC Dossier
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Official regulatory credentials required for derivative signals and equity advisory execution.
                  </p>
                </div>

                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="sigma-btn-primary text-xs !py-2 !px-4 font-bold flex items-center gap-1.5"
                >
                  <Edit2 className="h-3.5 w-3.5" /> Launch Full KYC & Broker Studio
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-brand-dark rounded-2xl border border-brand-border space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">
                    Permanent Account Number (PAN)
                  </span>
                  <span className="text-base font-bold text-white font-mono">
                    {customer.pan}
                  </span>
                  <span className="text-[10px] text-brand-green font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> NSDL / Income Tax Database Verified
                  </span>
                </div>

                <div className="p-4 bg-brand-dark rounded-2xl border border-brand-border space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">
                    Aadhaar e-KYC Verification
                  </span>
                  <span className="text-base font-bold text-white font-mono">
                    XXXX-XXXX-{customer.aadhaarLast4 || "8921"}
                  </span>
                  <span className="text-[10px] text-brand-green font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> UIDAI OTP Biometric Authenticated
                  </span>
                </div>

                <div className="p-4 bg-brand-dark rounded-2xl border border-brand-border space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">
                    Assessed Risk Tolerance Profile
                  </span>
                  <span className="text-base font-bold text-brand-gold">
                    {customer.riskProfile}
                  </span>
                  <p className="text-[11px] text-brand-muted">
                    Trading Capital: <strong className="text-white">{customer.tradingCapital}</strong>
                  </p>
                  <p className="text-[11px] text-brand-muted">
                    Experience: <strong className="text-white">{customer.experienceLevel}</strong>
                  </p>
                </div>

                <div className="p-4 bg-brand-dark rounded-2xl border border-brand-border space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">
                    Demat & Trading Account Depository
                  </span>
                  <span className="text-base font-bold text-white">
                    {customer.dematBroker} ({customer.dematClientId})
                  </span>
                  <span className="text-[10px] text-brand-blue font-semibold block">
                    CDSL Depository Participant ID Verified
                  </span>
                  <span className="text-[10px] text-brand-muted block">
                    City: {customer.city}
                  </span>
                </div>
              </div>

              {/* Preferred Segments Badges */}
              <div className="mt-6 pt-5 border-t border-brand-border/60">
                <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2.5">
                  Subscribed Market Segments & Specializations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {customer.preferredSegments && customer.preferredSegments.length > 0 ? (
                    customer.preferredSegments.map((seg, idx) => (
                      <span key={idx} className="sigma-badge-blue text-xs font-bold py-1 px-3">
                        ✓ {seg}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-brand-muted">No custom segments selected. Click Edit Profile to add.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Alerts */}
        {activeTab === "ALERTS" && (
          <div className="space-y-6">
            <div className="sigma-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-brand-blue" />
                    Real-Time Trading Alert Dispatch Channels
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Toggle instant WhatsApp, Telegram, or SMS alerts for verified trade invalidations and target achievements.
                  </p>
                </div>

                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="sigma-btn-outline text-xs !py-1.5 !px-3 font-semibold"
                >
                  Configure Channels
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-4 bg-brand-dark rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-white block text-sm">
                      WhatsApp Instant Signal Push
                    </span>
                    <span className="text-brand-muted text-[11px]">
                      Delivering to {customer.phone}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${customer.whatsappAlerts ? "bg-brand-green/20 text-brand-green border border-brand-green/40" : "bg-brand-dark text-brand-muted border border-brand-border"}`}>
                    {customer.whatsappAlerts ? "ACTIVE" : "PAUSED"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-dark rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-white block text-sm">
                      Telegram VIP Channel Terminal
                    </span>
                    <span className="text-brand-muted text-[11px]">
                      Bot synced with Client ID {customer.clientId}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${customer.telegramAlerts ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/40" : "bg-brand-dark text-brand-muted border border-brand-border"}`}>
                    {customer.telegramAlerts ? "CONNECTED" : "DISCONNECTED"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-dark rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-white block text-sm">
                      SMS High-Priority Invalidation Alerts
                    </span>
                    <span className="text-brand-muted text-[11px]">
                      Direct SMS for emergency stop-loss modifications
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${customer.smsAlerts ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40" : "bg-brand-dark text-brand-muted border border-brand-border"}`}>
                    {customer.smsAlerts ? "ACTIVE" : "DISABLED"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regulatory Disclosure */}
        <div className="mt-12 text-center border-t border-brand-border/40 pt-6">
          <p className="text-[10px] text-brand-muted/70 leading-relaxed max-w-3xl mx-auto">
            SIGMAPRO Bharat is an institutional trading and research signal distribution platform for Indian securities. Investment in securities market are subject to market risks. Read all scheme related documents carefully before investing.
          </p>
        </div>

        {/* MODAL 1: In-Dashboard Video Lesson Viewer */}
        {selectedCourseLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-brand-card border border-brand-border rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="sigma-badge-blue text-[10px] font-bold">
                      Interactive Video Player
                    </span>
                    <span className="text-xs text-brand-muted">
                      {selectedCourseLesson.completedLessons} of {selectedCourseLesson.totalLessons} Lessons Done
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {selectedCourseLesson.title}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Mentor: <strong className="text-white">{selectedCourseLesson.instructor}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCourseLesson(null)}
                  className="p-2 text-brand-muted hover:text-white rounded-xl hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player Display Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-brand-border flex items-center justify-center group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70 flex flex-col justify-between p-4 sm:p-6">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="font-mono bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
                      Module 3: Institutional Order Flow & Gamma Surge Identification
                    </span>
                    <span className="sigma-badge-gold text-[10px] font-bold">1080p 60fps</span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand-blue/90 hover:bg-brand-blue flex items-center justify-center text-white cursor-pointer shadow-xl transform group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 ml-1 fill-white" />
                    </div>
                    <span className="text-xs font-bold text-white mt-3 bg-black/60 px-3 py-1 rounded-full">
                      Click to Stream Live Recording
                    </span>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-brand-blue h-full rounded-full" style={{ width: "42%" }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-white/70 font-mono">
                      <span>18:42 / 45:10</span>
                      <span>Speed: 1.25x • Indian Market Practicum</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Syllabus & Next Lesson Playlist */}
              <div>
                <h4 className="text-xs uppercase font-bold text-brand-muted tracking-wider mb-3">
                  Course Modules & Completed Checkpoints:
                </h4>
                <div className="space-y-2">
                  {[
                    { num: "01", title: "Market Microstructure & NSE Tick-by-Tick Architecture", dur: "32 mins", done: true },
                    { num: "02", title: "Options Greek Sensitivity: Delta Balancing & Theta Decay", dur: "48 mins", done: true },
                    { num: "03", title: "Institutional Order Flow & Gamma Surge Identification", dur: "45 mins", active: true },
                    { num: "04", title: "Live Execution Practicum: Bracket Orders & Risk Containment", dur: "54 mins", done: false },
                  ].map((lesson, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        lesson.active
                          ? "bg-brand-blue/15 border-brand-blue/50 text-white"
                          : lesson.done
                          ? "bg-brand-dark/80 border-brand-border text-brand-muted"
                          : "bg-brand-dark/40 border-brand-border/40 text-brand-muted/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-brand-gold font-bold">{lesson.num}</span>
                        <span className={lesson.active ? "font-bold text-white" : ""}>
                          {lesson.title}
                        </span>
                        {lesson.active && (
                          <span className="sigma-badge-blue text-[9px] font-bold">Currently Playing</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px]">{lesson.dur}</span>
                        {lesson.done && <CheckCircle2 className="h-4 w-4 text-brand-green" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs text-brand-muted">
                  Need doubts resolved? Join our weekly Live Doubt Clearing Webinar every Sunday 11 AM.
                </span>
                <button
                  onClick={() => setSelectedCourseLesson(null)}
                  className="sigma-btn-primary text-xs !py-2 !px-5 font-bold"
                >
                  Done Watching
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: SEBI Certificate of Completion Viewer */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-brand-card border-2 border-brand-gold/60 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative space-y-6 text-center">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-5 right-5 p-2 text-brand-muted hover:text-white rounded-xl hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/40 px-3.5 py-1 rounded-full text-xs font-bold text-brand-gold">
                  <Award className="h-4 w-4" /> SEBI ACCREDITED MASTERCLASS CERTIFICATE
                </div>
                <h3 className="text-2xl font-black text-white tracking-wide">
                  CERTIFICATE OF COMPLETION
                </h3>
                <p className="text-xs text-brand-muted">
                  Official Verification ID: <strong className="text-white font-mono">CERT-SIGMA-2026-BHARAT-0941</strong>
                </p>
              </div>

              {/* Certificate Canvas Mock */}
              <div className="p-6 bg-brand-dark/90 rounded-2xl border border-brand-border/80 space-y-4">
                <p className="text-xs text-brand-muted uppercase tracking-widest">
                  This is proudly conferred upon
                </p>
                <div className="text-2xl sm:text-3xl font-black text-brand-gold font-serif tracking-wider">
                  {customer.name}
                </div>
                <p className="text-xs text-brand-muted">
                  Client ID: <strong className="text-white font-mono">{customer.clientId}</strong> • PAN: <strong className="text-white font-mono">{customer.pan}</strong>
                </p>
                <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                  For demonstrated institutional proficiency and successful completion of the intensive masterclass curriculum in:
                </p>
                <div className="text-base font-bold text-white bg-brand-card/80 py-2 px-4 rounded-xl border border-brand-border">
                  {selectedCertificate.title}
                </div>
                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                  <div>
                    <span className="block font-bold text-white">{selectedCertificate.instructor}</span>
                    <span className="text-[10px]">Lead Market Mentor</span>
                  </div>
                  <div>
                    <span className="block font-bold text-brand-green font-mono">100% Verified</span>
                    <span className="text-[10px]">Date: 28 Oct 2026</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    alert(`Certificate PDF for ${customer.name} generated successfully!`);
                    setSelectedCertificate(null);
                  }}
                  className="sigma-btn-gold text-xs !py-2.5 !px-6 font-bold flex items-center gap-2 shadow-lg shadow-brand-gold/20"
                >
                  <Download className="h-4 w-4" /> Download Official PDF Certificate
                </button>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="sigma-btn-outline text-xs !py-2.5 !px-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
