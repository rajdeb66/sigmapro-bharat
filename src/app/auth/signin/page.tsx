"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useAuth, PRESET_PROFILES } from "@/lib/auth-context";

export default function IndianSignInPage() {
  const router = useRouter();
  const { login, loginAsPreset, isAuthenticated } = useAuth();

  const [authMode, setAuthMode] = useState<"OTP" | "PRESET">("OTP");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [phone, setPhone] = useState("9876543210");
  const [fullName, setFullName] = useState("Rajesh Sharma");
  const [otp, setOtp] = useState("");
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (step === "OTP" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formattedPhone = phone.startsWith("+91") ? phone : `+91 ${phone.trim()}`;
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SEND_OTP", phone: formattedPhone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP.");

      setSimulatedOtp(data.otp);
      setSuccessMsg(`OTP sent to ${formattedPhone}! Check the demo code below.`);
      setStep("OTP");
      setTimer(45);
    } catch (err: any) {
      setError(err.message || "Failed to deliver OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formattedPhone = phone.startsWith("+91") ? phone : `+91 ${phone.trim()}`;
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_OTP",
          phone: formattedPhone,
          otp: otp.trim(),
          name: fullName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP code.");

      login(formattedPhone, fullName);
      setSuccessMsg("Mobile Verified Successfully! Redirecting to Customer Dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: any) {
      setError(err.message || "Verification failed. Please check the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (key: "rajesh" | "priya" | "vikram") => {
    loginAsPreset(key);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 group mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-card border border-brand-blue/30 shadow-lg">
            <TrendingUp className="h-6 w-6 text-brand-blue" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            SIGMA<span className="text-brand-gold">PRO</span> BHARAT
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Customer Authentication & Sign In
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-brand-muted">
          Access your verified Indian market portfolio, active calls & KYC dossier
        </p>
      </div>

      {/* Auth Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg z-10">
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Method selector tabs */}
          <div className="grid grid-cols-2 gap-1.5 bg-brand-dark p-1.5 rounded-2xl border border-brand-border">
            <button
              type="button"
              onClick={() => setAuthMode("OTP")}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                authMode === "OTP"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              Indian Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("PRESET")}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === "PRESET"
                  ? "bg-brand-gold text-black shadow-md shadow-brand-gold/20"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" /> 1-Click Investor Profiles
            </button>
          </div>

          {error && (
            <div className="p-3.5 bg-brand-red/10 border border-brand-red/30 rounded-2xl flex items-center gap-2.5 text-brand-red text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-brand-green/10 border border-brand-green/30 rounded-2xl flex items-center gap-2.5 text-brand-green text-xs font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {authMode === "OTP" ? (
            step === "PHONE" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                    Investor Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="sigma-input pl-10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                    10-Digit Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <span className="bg-brand-dark border border-brand-border rounded-xl px-3 py-3 text-xs font-mono font-bold text-brand-muted flex items-center">
                      +91
                    </span>
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="sigma-input pl-10 text-xs font-mono font-bold tracking-wider"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-brand-muted mt-1.5">
                    We will send a 6-digit OTP code to this mobile number via SMS and WhatsApp.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="sigma-btn-primary w-full text-xs font-bold !py-3.5 justify-center shadow-lg shadow-brand-blue/20 disabled:opacity-50"
                >
                  {loading ? "Generating Secure OTP..." : "Get OTP via SMS & WhatsApp"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="bg-brand-dark/90 p-3.5 rounded-2xl border border-brand-border text-xs flex justify-between items-center">
                  <div>
                    <span className="text-brand-muted block text-[10px]">Verifying Number:</span>
                    <span className="font-mono font-bold text-white">+91 {phone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("PHONE");
                      setOtp("");
                      setError(null);
                    }}
                    className="text-xs text-brand-blue hover:underline font-semibold"
                  >
                    Change Number
                  </button>
                </div>

                {simulatedOtp && (
                  <div className="p-3.5 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl text-center">
                    <span className="text-[10px] text-brand-gold uppercase font-bold tracking-wider block mb-1">
                      Live Simulated SMS / WhatsApp Message
                    </span>
                    <div className="text-2xl font-black font-mono text-brand-gold tracking-widest">
                      {simulatedOtp}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtp(simulatedOtp)}
                      className="text-xs text-brand-blue hover:underline font-bold mt-1.5 inline-block"
                    >
                      Click here to auto-fill code {simulatedOtp}
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                    Enter 6-Digit Verification Code
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 6-digit OTP"
                      className="sigma-input pl-10 text-sm font-mono font-bold tracking-widest text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <span>Didn&apos;t receive code?</span>
                  {timer > 0 ? (
                    <span className="font-mono text-brand-gold">Resend in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-brand-blue hover:underline font-bold"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="sigma-btn-primary w-full text-xs font-bold !py-3.5 justify-center disabled:opacity-50"
                >
                  {loading ? "Validating Credentials..." : "Verify Mobile & Access Profile"}
                  <CheckCircle2 className="h-4 w-4 ml-1 text-brand-green" />
                </button>
              </form>
            )
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-brand-muted leading-relaxed">
                Choose any pre-verified Indian investor persona to instantly experience tailored market alpha:
              </p>

              <div className="space-y-3">
                {[
                  {
                    key: "rajesh" as const,
                    profile: PRESET_PROFILES.rajesh,
                    desc: "Pro Trader • Zerodha Kite • Nifty & Bank Nifty F&O",
                    highlight: "Active F&O Setup",
                  },
                  {
                    key: "priya" as const,
                    profile: PRESET_PROFILES.priya,
                    desc: "HNI Elite • Groww • Midcap Multibaggers & Cash Swing",
                    highlight: "Wealth Compounder",
                  },
                  {
                    key: "vikram" as const,
                    profile: PRESET_PROFILES.vikram,
                    desc: "Alpha Trader • AngelOne • 0DTE Options & Stock Futures",
                    highlight: "High-Frequency Scalp",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => handleSelectPreset(item.key)}
                    className="p-4 bg-brand-dark/90 hover:bg-brand-dark border border-brand-border hover:border-brand-blue/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group shadow-md"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm group-hover:text-brand-blue transition-colors">
                          {item.profile.name}
                        </span>
                        <span className="sigma-badge-gold text-[9px] font-bold">
                          {item.profile.accountTier}
                        </span>
                        <span className="sigma-badge-blue text-[9px] font-bold">
                          {item.highlight}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted">
                        {item.desc}
                      </p>
                    </div>

                    <div className="h-8 w-8 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Footer Links */}
          <div className="pt-4 border-t border-brand-border/80 flex items-center justify-between text-xs text-brand-muted">
            <Link href="/" className="hover:text-white transition-colors">
              ← Back to Market Watch
            </Link>
            <Link href="/dashboard" className="text-brand-blue hover:underline font-semibold">
              Skip to Dashboard Demo →
            </Link>
          </div>
        </div>
      </div>

      {/* SEBI Compliance Footnote */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mt-8 text-center z-10">
        <p className="text-[10px] text-brand-muted/60 leading-relaxed">
          SIGMAPRO Bharat • SEBI Reg. Compliant Research Distribution Platform • High-Security OTP Gateway
        </p>
      </div>
    </div>
  );
}
