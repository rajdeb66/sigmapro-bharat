"use client";

import { useState, useEffect } from "react";
import {
  X,
  Check,
  ShieldCheck,
  User,
  Smartphone,
  Mail,
  Building,
  CreditCard,
  Briefcase,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Compass,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { useAuth, UserProfile } from "@/lib/auth-context";

export default function ProfileEditModal() {
  const { user, updateProfile, isEditModalOpen, setIsEditModalOpen } = useAuth();

  const [activeTab, setActiveTab] = useState<"PERSONAL" | "BROKER" | "RISK" | "ALERTS">("PERSONAL");

  // Form states initialized with current user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaarLast4, setAadhaarLast4] = useState("");
  const [dematBroker, setDematBroker] = useState("");
  const [dematClientId, setDematClientId] = useState("");
  const [tradingCapital, setTradingCapital] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [riskProfile, setRiskProfile] = useState("");
  const [preferredSegments, setPreferredSegments] = useState<string[]>([]);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [avatarColor, setAvatarColor] = useState("from-blue-600 to-indigo-600");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCity(user.city || "");
      setPan(user.pan || "");
      setAadhaarLast4(user.aadhaarLast4 || "");
      setDematBroker(user.dematBroker || "Zerodha Kite");
      setDematClientId(user.dematClientId || "");
      setTradingCapital(user.tradingCapital || "₹15 Lakhs - ₹50 Lakhs");
      setExperienceLevel(user.experienceLevel || "Pro Trader (5+ Years)");
      setRiskProfile(user.riskProfile || "Aggressive (F&O & Cash Qualified)");
      setPreferredSegments(user.preferredSegments || []);
      setWhatsappAlerts(user.whatsappAlerts ?? true);
      setTelegramAlerts(user.telegramAlerts ?? true);
      setSmsAlerts(user.smsAlerts ?? true);
      setAvatarColor(user.avatarColor || "from-blue-600 to-indigo-600");
    }
  }, [user, isEditModalOpen]);

  if (!isEditModalOpen || !user) return null;

  const toggleSegment = (seg: string) => {
    if (preferredSegments.includes(seg)) {
      setPreferredSegments(preferredSegments.filter((s) => s !== seg));
    } else {
      setPreferredSegments([...preferredSegments, seg]);
    }
  };

  const calculateCompleteness = () => {
    let score = 0;
    if (name) score += 15;
    if (email) score += 15;
    if (phone) score += 15;
    if (pan && pan.length === 10) score += 15;
    if (dematBroker && dematClientId) score += 20;
    if (preferredSegments.length > 0) score += 10;
    if (tradingCapital) score += 10;
    return Math.min(score, 100);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      pan: pan.trim().toUpperCase(),
      aadhaarLast4: aadhaarLast4.trim(),
      dematBroker,
      dematClientId: dematClientId.trim().toUpperCase(),
      tradingCapital,
      experienceLevel,
      riskProfile,
      preferredSegments,
      whatsappAlerts,
      telegramAlerts,
      smsAlerts,
      avatarColor,
    });
    setIsEditModalOpen(false);
  };

  const availableSegments = [
    "BANKNIFTY Weekly Options",
    "NIFTY Index Scalping",
    "Large Cap Cash Swing",
    "Midcap Multibaggers",
    "Stock Futures Momentum",
    "NIFTY 0DTE Expiry Trades",
    "Commodities (MCX Gold/Silver)",
  ];

  const brokerOptions = [
    { name: "Zerodha Kite", icon: "🔴", desc: "India's largest discount broker" },
    { name: "Groww", icon: "🟢", desc: "Fast retail & F&O execution" },
    { name: "AngelOne", icon: "🔵", desc: "Institutional smartAPI integration" },
    { name: "Upstox", icon: "🟣", desc: "Pro multi-order terminal" },
    { name: "Dhan", icon: "🟡", desc: "Direct TradingView chart order sync" },
    { name: "ICICI Direct", icon: "🟠", desc: "3-in-1 institutional banking Demat" },
  ];

  const completeness = calculateCompleteness();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-brand-card border border-brand-border rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-brand-border/80 pb-5">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
              {name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "IN"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  Investor Profile Studio
                </h2>
                <span className="sigma-badge-gold text-[10px] font-bold">
                  SEBI KYC & Demat Sync
                </span>
              </div>
              <p className="text-xs text-brand-muted">
                Edit your identity, linked broker credentials, capital sizing, and risk classification.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(false)}
            className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Completeness Score */}
        <div className="relative z-10 mt-4 p-3 bg-brand-dark/90 rounded-2xl border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-brand-muted">
              Profile Completeness Score:{" "}
              <strong className="text-white font-mono">{completeness}%</strong>
            </span>
          </div>

          <div className="flex-1 max-w-xs bg-brand-navy rounded-full h-2 overflow-hidden border border-brand-border">
            <div
              className="bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>

          <span className="text-[10px] text-brand-green font-bold">
            {completeness === 100 ? "✓ 100% Fully Verified" : "Ready for SEBI Execution"}
          </span>
        </div>

        {/* Tabs Bar */}
        <div className="relative z-10 flex items-center gap-1.5 border-b border-brand-border/80 pt-4 pb-2 mb-6 overflow-x-auto">
          {[
            { id: "PERSONAL", label: "1. Personal & KYC", icon: User },
            { id: "BROKER", label: "2. Demat & Execution", icon: Building },
            { id: "RISK", label: "3. Capital & Risk", icon: Compass },
            { id: "ALERTS", label: "4. Signal Alerts", icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="relative z-10 space-y-5">
          {/* TAB 1: Personal & KYC */}
          {activeTab === "PERSONAL" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                    Legal Name (as per PAN)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="sigma-input pl-10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh.sharma@investor.in"
                      className="sigma-input pl-10 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                    Verified Indian Mobile Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="sigma-input pl-10 text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                    City & State
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="sigma-input text-xs"
                  />
                </div>
              </div>

              {/* PAN & Aadhaar */}
              <div className="p-4 bg-brand-dark/90 rounded-2xl border border-brand-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4 text-brand-gold" />
                    Income Tax PAN & Aadhaar e-KYC Verification
                  </span>
                  <span className="text-[10px] text-brand-green font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> NSDL Live API Validated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-muted mb-1">
                      10-Digit PAN Card
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      required
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="sigma-input text-xs font-mono font-bold tracking-widest text-brand-gold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-muted mb-1">
                      Aadhaar Last 4 Digits (e-KYC)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={aadhaarLast4}
                      onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, ""))}
                      placeholder="8921"
                      className="sigma-input text-xs font-mono font-bold tracking-widest"
                    />
                  </div>
                </div>
              </div>

              {/* Avatar Badge Color Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                  Personal Badge Theme
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Sapphire Blue", color: "from-blue-600 to-indigo-600" },
                    { label: "Emerald Alpha", color: "from-emerald-600 to-teal-600" },
                    { label: "Imperial Gold", color: "from-amber-500 to-orange-600" },
                    { label: "Royal Amethyst", color: "from-purple-600 to-pink-600" },
                  ].map((theme, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarColor(theme.color)}
                      className={`h-9 px-3 rounded-xl bg-gradient-to-r ${theme.color} text-[11px] font-bold text-white shadow-md transition-all flex items-center gap-1.5 ${
                        avatarColor === theme.color ? "ring-2 ring-white scale-105" : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      {avatarColor === theme.color && <Check className="h-3.5 w-3.5" />}
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Broker & Demat Connectivity */}
          {activeTab === "BROKER" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-semibold uppercase text-brand-muted mb-2">
                  Select Your Primary Indian Depository & Broker
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {brokerOptions.map((b) => (
                    <div
                      key={b.name}
                      onClick={() => setDematBroker(b.name)}
                      className={`p-3 rounded-2xl cursor-pointer border transition-all ${
                        dematBroker === b.name
                          ? "bg-brand-blue/15 border-brand-blue ring-1 ring-brand-blue/40"
                          : "bg-brand-dark/70 border-brand-border hover:border-brand-border/90"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{b.icon}</span>
                        <span className="text-xs font-bold text-white">{b.name}</span>
                      </div>
                      <span className="text-[10px] text-brand-muted leading-tight block">
                        {b.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                  Broker Trading Client ID / UCC
                </label>
                <input
                  type="text"
                  required
                  value={dematClientId}
                  onChange={(e) => setDematClientId(e.target.value.toUpperCase())}
                  placeholder="e.g. ZR8842 or GW5194"
                  className="sigma-input text-xs font-mono font-bold tracking-wider uppercase"
                />
                <p className="text-[10px] text-brand-muted mt-1">
                  Enables 1-Click Order Sync directly from SIGMAPRO signals to your broker basket order terminal.
                </p>
              </div>

              <div className="p-4 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                <div className="text-xs text-brand-muted leading-relaxed">
                  <strong className="text-white">CDSL / NSDL Secure Handshake:</strong> We never store trading PINs or OTPs. All broker order executions require your biometric / TOTP confirmation in compliance with SEBI circular CIR/MRD/DP/54/2022.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Risk & Capital Profiling */}
          {activeTab === "RISK" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                    Active Indian Trading Capital Bracket
                  </label>
                  <select
                    value={tradingCapital}
                    onChange={(e) => setTradingCapital(e.target.value)}
                    className="sigma-input text-xs"
                  >
                    <option value="₹2 Lakhs - ₹5 Lakhs">₹2 Lakhs - ₹5 Lakhs (Retail Active)</option>
                    <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs (Growth Trader)</option>
                    <option value="₹15 Lakhs - ₹50 Lakhs">₹15 Lakhs - ₹50 Lakhs (Pro Portfolio)</option>
                    <option value="₹50 Lakhs+ (HNI)">₹50 Lakhs+ (HNI / Family Office)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                    Live Trading Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="sigma-input text-xs"
                  >
                    <option value="Beginner (1-2 Years)">Beginner (1-2 Years)</option>
                    <option value="Active Derivative Trader (3-5 Years)">Active Derivative Trader (3-5 Years)</option>
                    <option value="Pro Trader (5+ Years)">Pro Trader (5+ Years)</option>
                    <option value="Portfolio Investor (7+ Years)">Portfolio Investor (7+ Years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-brand-muted mb-1.5">
                  SEBI Mandated Risk Category
                </label>
                <select
                  value={riskProfile}
                  onChange={(e) => setRiskProfile(e.target.value)}
                  className="sigma-input text-xs font-bold text-brand-gold"
                >
                  <option value="Conservative (Cash Only - Zero F&O)">Conservative (Cash Only - Zero F&O)</option>
                  <option value="Moderate Growth (Cash & Positional)">Moderate Growth (Cash & Positional)</option>
                  <option value="Aggressive (F&O & Cash Qualified)">Aggressive (F&O & Cash Qualified)</option>
                  <option value="Very Aggressive (F&O Futures & Zero-DTE)">Very Aggressive (F&O Futures & Zero-DTE)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-brand-muted mb-2">
                  Select Preferred Signals & Trading Segments
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSegments.map((seg) => {
                    const isSelected = preferredSegments.includes(seg);
                    return (
                      <button
                        key={seg}
                        type="button"
                        onClick={() => toggleSegment(seg)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                            : "bg-brand-dark text-brand-muted hover:text-white border border-brand-border"
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                        {seg}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Signal Alerts & Notification Channels */}
          {activeTab === "ALERTS" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-brand-muted leading-relaxed">
                Choose where you want high-conviction entry alerts and trailing stop-loss updates delivered.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-brand-dark rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-white text-xs block">
                      WhatsApp Instant Signal Push
                    </span>
                    <span className="text-[11px] text-brand-muted">
                      Direct WhatsApp broadcast for immediate execution
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="h-5 w-5 rounded border-brand-border bg-brand-card text-brand-green focus:ring-brand-green"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-dark rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-white text-xs block">
                      Telegram VIP Channel Terminal
                    </span>
                    <span className="text-[11px] text-brand-muted">
                      Bot synced with real-time target and trailing SL updates
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={telegramAlerts}
                    onChange={(e) => setTelegramAlerts(e.target.checked)}
                    className="h-5 w-5 rounded border-brand-border bg-brand-card text-brand-blue focus:ring-brand-blue"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-dark rounded-2xl border border-brand-border">
                  <div>
                    <span className="font-bold text-white text-xs block">
                      High-Priority Emergency SMS
                    </span>
                    <span className="text-[11px] text-brand-muted">
                      Zero-latency SMS if market invalidation occurs
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="h-5 w-5 rounded border-brand-border bg-brand-card text-brand-gold focus:ring-brand-gold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-brand-border/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="sigma-btn-outline text-xs !py-3 !px-5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="sigma-btn-gold text-xs !py-3 !px-6 font-bold flex items-center gap-2 shadow-lg shadow-brand-gold/10"
            >
              <Check className="h-4 w-4" />
              Save & Synchronize Customer Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
