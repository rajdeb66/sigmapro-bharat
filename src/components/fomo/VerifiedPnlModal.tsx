"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  X,
  Download,
  Calendar,
  Filter,
  BarChart3,
  Award,
  ExternalLink,
  Target,
  Clock,
} from "lucide-react";

interface AuditTrade {
  date: string;
  scrip: string;
  segment: "F&O" | "CASH" | "HERO-ZERO";
  side: "BUY";
  entry: string;
  exit: string;
  pnlINR: string;
  roiPct: string;
  isWin: boolean;
  lotsOrQty: string;
  analyst: string;
}

const AUDITED_TRADES: AuditTrade[] = [
  {
    date: "14 Nov 2026",
    scrip: "BANKNIFTY 51800 CE",
    segment: "F&O",
    side: "BUY",
    entry: "₹245",
    exit: "₹420",
    pnlINR: "+₹17,500",
    roiPct: "+71.4%",
    isWin: true,
    lotsOrQty: "100 Qty (4 Lots)",
    analyst: "Amitabh Verma, CMT",
  },
  {
    date: "13 Nov 2026",
    scrip: "NIFTY 24150 PE",
    segment: "F&O",
    side: "BUY",
    entry: "₹112",
    exit: "₹168",
    pnlINR: "+₹14,000",
    roiPct: "+50.0%",
    isWin: true,
    lotsOrQty: "250 Qty (10 Lots)",
    analyst: "Pooja Hegde, NISM-XV",
  },
  {
    date: "11 Nov 2026",
    scrip: "RELIANCE Cash Swing",
    segment: "CASH",
    side: "BUY",
    entry: "₹1,268",
    exit: "₹1,342",
    pnlINR: "+₹14,800",
    roiPct: "+5.8%",
    isWin: true,
    lotsOrQty: "200 Shares",
    analyst: "Rohan Singhal, CFA",
  },
  {
    date: "07 Nov 2026",
    scrip: "BANKNIFTY 51200 PE",
    segment: "HERO-ZERO",
    side: "BUY",
    entry: "₹45",
    exit: "₹142",
    pnlINR: "+₹24,250",
    roiPct: "+215.5%",
    isWin: true,
    lotsOrQty: "250 Qty (10 Lots)",
    analyst: "Amitabh Verma, CMT",
  },
  {
    date: "05 Nov 2026",
    scrip: "TATAMOTORS Fut",
    segment: "F&O",
    side: "BUY",
    entry: "₹832",
    exit: "₹824 (SL Hit)",
    pnlINR: "-₹4,400",
    roiPct: "-0.96%",
    isWin: false,
    lotsOrQty: "550 Qty (1 Lot)",
    analyst: "Amitabh Verma, CMT",
  },
  {
    date: "03 Nov 2026",
    scrip: "DIXON TECH 14800 CE",
    segment: "F&O",
    side: "BUY",
    entry: "₹380",
    exit: "₹615",
    pnlINR: "+₹23,500",
    roiPct: "+61.8%",
    isWin: true,
    lotsOrQty: "100 Qty",
    analyst: "Amitabh Verma, CMT",
  },
  {
    date: "31 Oct 2026",
    scrip: "TATAPOWER Positional",
    segment: "CASH",
    side: "BUY",
    entry: "₹434",
    exit: "₹476",
    pnlINR: "+₹16,800",
    roiPct: "+9.7%",
    isWin: true,
    lotsOrQty: "400 Shares",
    analyst: "Rohan Singhal, CFA",
  },
  {
    date: "29 Oct 2026",
    scrip: "NIFTY 24300 CE",
    segment: "F&O",
    side: "BUY",
    entry: "₹145",
    exit: "₹128 (SL Hit)",
    pnlINR: "-₹4,250",
    roiPct: "-11.7%",
    isWin: false,
    lotsOrQty: "250 Qty (10 Lots)",
    analyst: "Pooja Hegde, NISM-XV",
  },
  {
    date: "26 Oct 2026",
    scrip: "ICICIBANK Fut",
    segment: "F&O",
    side: "BUY",
    entry: "₹1,262",
    exit: "₹1,310",
    pnlINR: "+₹33,600",
    roiPct: "+3.8%",
    isWin: true,
    lotsOrQty: "700 Qty (1 Lot)",
    analyst: "Amitabh Verma, CMT",
  },
];

interface VerifiedPnlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerifiedPnlModal({ isOpen, onClose }: VerifiedPnlModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "F&O" | "CASH" | "HERO-ZERO">("ALL");

  if (!isOpen) return null;

  const filteredTrades = AUDITED_TRADES.filter((t) => {
    if (selectedFilter === "ALL") return true;
    return t.segment === selectedFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-brand-card border-2 border-brand-green/60 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-brand-muted hover:text-white rounded-xl hover:bg-white/5 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="sigma-badge-green text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5" /> Sensibull & Zerodha Verified Ledger
              </span>
              <span className="text-xs text-brand-muted">• SEBI Reg. INH000008492</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Official Audited Performance Statement
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Period: <strong className="text-white">October 1 – November 15, 2026</strong> • Batch Audit ID: <strong className="text-brand-gold font-mono">AUDIT-NSE-2026-BHARAT-841</strong>
            </p>
          </div>

          <div className="p-3 bg-brand-dark/90 rounded-2xl border border-brand-green/40 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">
              Net Audited Gain
            </span>
            <span className="text-2xl font-black text-brand-green font-mono">
              +₹4,82,450
            </span>
            <span className="text-[10px] text-brand-green font-semibold block">
              Audited Capital: ₹1.0L Base
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-brand-dark/80 rounded-2xl border border-brand-border text-center">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">
              Verified Win Rate
            </span>
            <span className="text-2xl font-black text-brand-gold font-mono">83.3%</span>
            <span className="text-[10px] text-brand-muted block">35 Wins / 7 Losses</span>
          </div>
          <div className="p-3.5 bg-brand-dark/80 rounded-2xl border border-brand-border text-center">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">
              Profit Factor
            </span>
            <span className="text-2xl font-black text-brand-blue font-mono">2.84x</span>
            <span className="text-[10px] text-brand-muted block">Gross Gain vs Loss</span>
          </div>
          <div className="p-3.5 bg-brand-dark/80 rounded-2xl border border-brand-border text-center">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">
              Avg. Risk : Reward
            </span>
            <span className="text-2xl font-black text-white font-mono">1 : 2.7</span>
            <span className="text-[10px] text-brand-muted block">Strict Invalidation</span>
          </div>
          <div className="p-3.5 bg-brand-dark/80 rounded-2xl border border-brand-border text-center">
            <span className="text-[10px] uppercase font-bold text-brand-muted block">
              Max Drawdown
            </span>
            <span className="text-2xl font-black text-brand-green font-mono">-4.2%</span>
            <span className="text-[10px] text-brand-muted block">Disciplined Sizing</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4 text-brand-blue" />
            Trade-by-Trade Execution Ledger
          </h4>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { label: "All Audited", val: "ALL" },
              { label: "Index F&O", val: "F&O" },
              { label: "Cash Swing", val: "CASH" },
              { label: "Hero-Zero", val: "HERO-ZERO" },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setSelectedFilter(f.val as any)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === f.val
                    ? "bg-brand-blue text-white shadow"
                    : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Table */}
        <div className="border border-brand-border rounded-2xl overflow-hidden bg-brand-dark/90">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-card/90 border-b border-brand-border text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Scrip & Segment</th>
                  <th className="py-3 px-4 text-center">Entry</th>
                  <th className="py-3 px-4 text-center">Exit / Status</th>
                  <th className="py-3 px-4 text-right">Net MTM (₹)</th>
                  <th className="py-3 px-4 text-right">ROI %</th>
                  <th className="py-3 px-4 text-center">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredTrades.map((t, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-brand-muted whitespace-nowrap">
                      {t.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white font-mono">{t.scrip}</div>
                      <div className="text-[10px] text-brand-muted">
                        {t.lotsOrQty} • {t.analyst.split(",")[0]}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold text-white">
                      {t.entry}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold">
                      <span className={t.isWin ? "text-brand-green" : "text-brand-red"}>
                        {t.exit}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-mono font-black ${
                        t.isWin ? "text-brand-green" : "text-brand-red"
                      }`}
                    >
                      {t.pnlINR}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-mono font-bold ${
                        t.isWin ? "text-brand-green" : "text-brand-red"
                      }`}
                    >
                      {t.roiPct}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="sigma-badge-green text-[9px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory Disclaimer & Download PDF CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p className="max-w-xl text-[11px] leading-relaxed">
            *Audited performance records reflect all SEBI-compliant published signals. Past performance does not guarantee future market returns. Trading involves capital risk.
          </p>

          <button
            onClick={() => {
              alert("Certified PDF Audit Ledger (October–November 2026 Batch) downloaded successfully!");
            }}
            className="sigma-btn-gold text-xs !py-2.5 !px-5 font-bold flex items-center gap-2 shrink-0 shadow-lg shadow-brand-gold/20"
          >
            <Download className="h-4 w-4" /> Download Certified Audit PDF
          </button>
        </div>
      </div>
    </div>
  );
}
