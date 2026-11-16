"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Check,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Smartphone,
  ChevronRight,
  X,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface PlanTier {
  id: string;
  name: string;
  category: "F&O" | "CASH" | "COMBO" | "THEMATIC";
  badge?: string;
  analyst: string;
  sebiReg: string;
  description: string;
  monthlyPrice: string;
  quarterlyPrice: string;
  annualPrice: string;
  quarterlyDiscount: string;
  annualDiscount: string;
  features: string[];
  recommended?: boolean;
}

export default function PlansStorePage() {
  const { user, subscribeToPlan, setIsSignInModalOpen } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "QUARTERLY" | "ANNUAL">("QUARTERLY");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("plan-combo");
  const [checkoutModalPlan, setCheckoutModalPlan] = useState<PlanTier | null>(null);
  const [subscriptionSuccessPlan, setSubscriptionSuccessPlan] = useState<{
    plan: PlanTier;
    tier: string;
    price: string;
  } | null>(null);

  const plans: PlanTier[] = [
    {
      id: "plan-fo",
      name: "Nifty & Bank Nifty F&O Alpha Pass",
      category: "F&O",
      badge: "Active Day Traders",
      analyst: "Amitabh Verma, CMT",
      sebiReg: "SEBI Reg. INH000008492",
      description: "High-conviction intraday index options, Hero-Zero expiry strategies, and live strike unwinding alerts.",
      monthlyPrice: "₹4,999",
      quarterlyPrice: "₹11,999",
      annualPrice: "₹39,999",
      quarterlyDiscount: "Save 20%",
      annualDiscount: "Save 33%",
      features: [
        "2 to 4 high-probability F&O calls per day",
        "Exact Strike, Buy Price Zone, Target 1, Target 2 & Stop-Loss",
        "Live 1-Click Order Execution for Zerodha, Groww & AngelOne",
        "Instant WhatsApp & Telegram VIP Bot Channel Push",
        "Weekly Live Pre-Expiry Video Session (Thursdays 10:00 AM)",
      ],
    },
    {
      id: "plan-combo",
      name: "SIGMAPRO All-Access Bharat VIP Pass",
      category: "COMBO",
      badge: "MOST POPULAR",
      recommended: true,
      analyst: "Institutional SEBI Research Board",
      sebiReg: "SEBI Registered Advisory Group",
      description: "Everything in one terminal: All F&O calls, Swing multibaggers, Model Thematic portfolios & 2 Free Academy courses.",
      monthlyPrice: "₹7,999",
      quarterlyPrice: "₹18,999",
      annualPrice: "₹59,999",
      quarterlyDiscount: "Save 21%",
      annualDiscount: "Save 37%",
      features: [
        "ALL F&O Options Calls + Daily Index Gamma Scalps",
        "ALL NSE Cash Delivery & Swing Multibaggers (1-3 weeks)",
        "Curated Model Baskets (Defence, Green Energy, Dividend Cows)",
        "2 Complimentary Academy Video Masterclasses Included",
        "Direct Encrypted 1:1 Research Desk Chat for Portfolio Queries",
        "Guaranteed Zero-Latency Invalidation SMS for Risk Management",
      ],
    },
    {
      id: "plan-cash",
      name: "NSE Cash Swing & Multibagger Compounding",
      category: "CASH",
      badge: "Wealth Compounders",
      analyst: "Rohan Singhal, CFA",
      sebiReg: "SEBI Reg. INH000011204",
      description: "Positional swing equities and fundamentally screened smallcap/midcap multibagger ideas for working professionals.",
      monthlyPrice: "₹3,499",
      quarterlyPrice: "₹8,499",
      annualPrice: "₹27,999",
      quarterlyDiscount: "Save 19%",
      annualDiscount: "Save 33%",
      features: [
        "3 to 5 Positional Equity Calls per week (Holding: 10 to 45 days)",
        "Detailed Institutional Research PDF Note with Financial Valuation",
        "Target CAGR Potential: 25% - 40% with strict 5% max portfolio risk",
        "Quarterly Portfolio Review & Rebalancing Guidance",
        "WhatsApp Broadcast with trailing stop-loss milestones",
      ],
    },
  ];

  const handleSubscribeClick = (plan: PlanTier) => {
    if (!user) {
      setIsSignInModalOpen(true);
      return;
    }
    setCheckoutModalPlan(plan);
  };

  const confirmSubscription = () => {
    if (!checkoutModalPlan) return;
    const currentPrice =
      billingCycle === "MONTHLY"
        ? checkoutModalPlan.monthlyPrice
        : billingCycle === "QUARTERLY"
        ? checkoutModalPlan.quarterlyPrice
        : checkoutModalPlan.annualPrice;

    subscribeToPlan({
      id: checkoutModalPlan.id,
      name: checkoutModalPlan.name,
      tier: billingCycle,
      price: currentPrice,
      analyst: checkoutModalPlan.analyst,
      category: checkoutModalPlan.category,
    });
    setSubscriptionSuccessPlan({
      plan: checkoutModalPlan,
      tier: billingCycle,
      price: currentPrice,
    });
    setCheckoutModalPlan(null);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 sigma-badge-gold text-xs font-bold">
            <Sparkles className="h-4 w-4" />
            <span>SEBI ACCREDITED RESEARCH PLANS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Institutional Alpha at <span className="sigma-gradient-text">Affordable Retail Pricing</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Choose your trading edge. Real-time Nifty options buying/selling calls, high-conviction swing multibaggers, and direct WhatsApp alerts. Cancel anytime with zero lock-in.
          </p>

          {/* Billing Cycle Toggle Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-brand-card p-1.5 rounded-2xl border border-brand-border shadow-xl">
              <button
                onClick={() => setBillingCycle("MONTHLY")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === "MONTHLY"
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                Monthly Plan
              </button>

              <button
                onClick={() => setBillingCycle("QUARTERLY")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  billingCycle === "QUARTERLY"
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                <span>Quarterly (3 Months)</span>
                <span className="ml-1.5 text-[9px] bg-brand-gold text-black px-1.5 py-0.2 rounded font-black">
                  POPULAR
                </span>
              </button>

              <button
                onClick={() => setBillingCycle("ANNUAL")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  billingCycle === "ANNUAL"
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                <span>Annual (12 Months)</span>
                <span className="ml-1.5 text-[9px] bg-brand-green text-black px-1.5 py-0.2 rounded font-black">
                  SAVE 35%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const currentPrice =
              billingCycle === "MONTHLY"
                ? plan.monthlyPrice
                : billingCycle === "QUARTERLY"
                ? plan.quarterlyPrice
                : plan.annualPrice;

            const periodLabel =
              billingCycle === "MONTHLY"
                ? "billed monthly"
                : billingCycle === "QUARTERLY"
                ? "billed every 3 months"
                : "billed once a year";

            const isSubscribed = user?.activeSubscriptions?.some(
              (s) => s.serviceName.toLowerCase().includes(plan.name.slice(0, 10).toLowerCase())
            );

            return (
              <div
                key={plan.id}
                className={`sigma-card p-6 sm:p-8 flex flex-col justify-between relative transition-all rounded-3xl ${
                  plan.recommended
                    ? "border-brand-gold ring-1 ring-brand-gold/50 bg-gradient-to-b from-brand-card via-[#151d2f] to-brand-card shadow-2xl scale-[1.02] z-10"
                    : "border-brand-border hover:border-brand-blue/60"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    ★ MOST RECOMMENDED BY TRADERS
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="sigma-badge-blue text-[10px] font-bold">
                      {plan.badge || plan.category}
                    </span>
                    <span className="text-[11px] text-brand-green font-bold">
                      {billingCycle === "QUARTERLY" ? plan.quarterlyDiscount : billingCycle === "ANNUAL" ? plan.annualDiscount : "Standard"}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2 leading-snug">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="bg-brand-dark/90 p-4 rounded-2xl border border-brand-border/80 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                        {currentPrice}
                      </span>
                      <span className="text-xs text-brand-muted">
                        /{billingCycle === "MONTHLY" ? "mo" : billingCycle === "QUARTERLY" ? "3 mos" : "year"}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-muted block mt-1">
                      {periodLabel} • GST Tax Invoice Included
                    </span>
                  </div>

                  {/* Analyst Tag */}
                  <div className="flex items-center gap-2 text-xs text-brand-muted pb-4 border-b border-brand-border/60 mb-5">
                    <ShieldCheck className="h-4 w-4 text-brand-gold shrink-0" />
                    <div>
                      <span className="text-white font-bold block">{plan.analyst}</span>
                      <span className="text-[10px] text-brand-muted">{plan.sebiReg}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                      Included Deliverables:
                    </span>
                    {plan.features.map((ft, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-muted">
                        <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe Action */}
                <div>
                  {isSubscribed ? (
                    <Link
                      href="/dashboard"
                      className="sigma-btn-outline w-full text-xs !py-3 justify-center font-bold border-brand-green/40 text-brand-green hover:bg-brand-green/10"
                    >
                      ✓ Already Subscribed • View Active Feed
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSubscribeClick(plan)}
                      className={`${
                        plan.recommended ? "sigma-btn-gold" : "sigma-btn-primary"
                      } w-full text-xs font-bold !py-3.5 justify-center shadow-lg`}
                    >
                      Instant Unlock Pass ({currentPrice})
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </button>
                  )}
                  <span className="text-[9px] text-brand-muted text-center block mt-2">
                    Instant Telegram & WhatsApp bot activation upon checkout
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instant Checkout Confirmation Modal */}
        {checkoutModalPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
            <div className="bg-brand-card border border-brand-border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">
              <div className="flex items-start justify-between gap-4 border-b border-brand-border pb-4 mb-4">
                <div>
                  <span className="sigma-badge-gold text-[10px] font-bold mb-1 inline-block">
                    Confirm Advisory Pass
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {checkoutModalPlan.name}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Tier: {billingCycle} • Analyst: {checkoutModalPlan.analyst}
                  </p>
                </div>
              </div>

              <div className="bg-brand-dark p-4 rounded-2xl border border-brand-border mb-5 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Investor Account:</span>
                  <span className="text-white font-bold">{user?.name || "Rajesh Sharma"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Registered Mobile:</span>
                  <span className="text-white font-mono">{user?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Billing Cycle:</span>
                  <span className="text-brand-gold font-bold">{billingCycle} PASS</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-brand-border text-sm">
                  <span className="text-white font-bold">Total Payable:</span>
                  <span className="text-white font-black font-mono">
                    {billingCycle === "MONTHLY"
                      ? checkoutModalPlan.monthlyPrice
                      : billingCycle === "QUARTERLY"
                      ? checkoutModalPlan.quarterlyPrice
                      : checkoutModalPlan.annualPrice}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-brand-blue/10 border border-brand-blue/30 rounded-xl mb-6 flex items-start gap-2.5 text-[11px] text-brand-muted">
                <ShieldCheck className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                <span>
                  Immediate activation: All locked signals on Market Watch and WhatsApp alerts will be instantly unlocked on your account.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCheckoutModalPlan(null)}
                  className="sigma-btn-outline text-xs !py-3 flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubscription}
                  className="sigma-btn-gold text-xs !py-3 flex-1 justify-center font-bold"
                >
                  Confirm & Activate Now
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Subscription Success Celebration Modal */}
        {subscriptionSuccessPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-brand-card border-2 border-brand-gold/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 text-center">
              <button
                onClick={() => setSubscriptionSuccessPlan(null)}
                className="absolute top-5 right-5 p-2 text-brand-muted hover:text-white rounded-xl hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-16 w-16 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center text-brand-gold mx-auto shadow-lg shadow-brand-gold/20 animate-bounce">
                <Sparkles className="h-9 w-9" />
              </div>

              <div>
                <span className="sigma-badge-gold text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  Subscription Active • {subscriptionSuccessPlan.tier} Pass
                </span>
                <h3 className="text-xl font-bold text-white">
                  Pass Activated Successfully!
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  You now have unrestricted VIP access to <strong className="text-white">{subscriptionSuccessPlan.plan.name}</strong>. Premium trade signals, Hero-Zero expiry setups, and trailing SL alerts are unlocked.
                </p>
              </div>

              <div className="p-4 bg-brand-dark rounded-2xl border border-brand-border text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Advisory Desk:</span>
                  <span className="font-bold text-white">{subscriptionSuccessPlan.plan.analyst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Fee Paid:</span>
                  <span className="font-mono text-brand-green font-bold">{subscriptionSuccessPlan.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Channels:</span>
                  <span className="text-brand-gold font-bold">Instant Push via WhatsApp & Dashboard</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/dashboard?tab=subscriptions"
                  className="sigma-btn-gold w-full sm:w-auto text-xs !py-3 !px-6 font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20"
                >
                  <CreditCard className="h-4 w-4" />
                  View in Customer Profile
                </Link>
                <Link
                  href="/"
                  className="sigma-btn-primary w-full sm:w-auto text-xs !py-3 !px-5 flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  View Today&apos;s Calls
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
