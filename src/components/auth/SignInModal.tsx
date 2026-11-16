"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Smartphone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useAuth, PRESET_PROFILES } from "@/lib/auth-context";

export default function SignInModal() {
  const router = useRouter();
  const { login, loginAsPreset, isSignInModalOpen, setIsSignInModalOpen } = useAuth();

  const [authMode, setAuthMode] = useState<"OTP" | "PRESETS">("OTP");
  const [phone, setPhone] = useState("9876543210");
  const [name, setName] = useState("Rajesh Sharma");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [otp, setOtp] = useState("");
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSignInModalOpen) return null;

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
      setStep("OTP");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
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
          name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP code.");

      login(formattedPhone, name);
      setIsSignInModalOpen(false);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (key: "rajesh" | "priya" | "vikram") => {
    loginAsPreset(key);
    setIsSignInModalOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-brand-card border border-brand-border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-brand-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-card border border-brand-blue/30 flex items-center justify-center text-brand-blue">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Customer Authentication
              </h2>
              <p className="text-[11px] text-brand-muted">
                SIGMAPRO Bharat • SEBI Reg. Terminal
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSignInModalOpen(false)}
            className="p-1.5 rounded-lg text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="relative z-10 grid grid-cols-2 gap-1.5 bg-brand-dark p-1.5 rounded-2xl border border-brand-border my-4">
          <button
            type="button"
            onClick={() => setAuthMode("OTP")}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === "OTP"
                ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                : "text-brand-muted hover:text-white"
            }`}
          >
            Mobile OTP Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("PRESETS")}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMode === "PRESETS"
                ? "bg-brand-gold text-black shadow-md shadow-brand-gold/20"
                : "text-brand-muted hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" /> 1-Click Personas
          </button>
        </div>

        {error && (
          <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-xl text-brand-red text-xs font-semibold mb-4">
            {error}
          </div>
        )}

        {authMode === "OTP" ? (
          <div className="relative z-10 space-y-4">
            {step === "PHONE" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-brand-muted mb-1">
                    Investor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="sigma-input text-xs"
                    placeholder="Rajesh Sharma"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-brand-muted mb-1">
                    Indian Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <span className="bg-brand-dark border border-brand-border rounded-lg px-2.5 py-2.5 text-xs font-mono font-bold text-brand-muted flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="sigma-input text-xs font-mono font-bold tracking-wider"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="sigma-btn-primary w-full text-xs font-bold !py-3 justify-center shadow-lg shadow-brand-blue/20"
                >
                  {loading ? "Sending OTP..." : "Get OTP on SMS & WhatsApp"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-brand-dark rounded-xl border border-brand-border text-xs flex justify-between items-center">
                  <span>Number: <strong className="text-white">+91 {phone}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("PHONE");
                      setOtp("");
                    }}
                    className="text-xs text-brand-blue hover:underline font-semibold"
                  >
                    Change
                  </button>
                </div>

                {simulatedOtp && (
                  <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-center">
                    <span className="text-[10px] text-brand-gold uppercase font-bold tracking-wider block mb-0.5">
                      Demo OTP Code
                    </span>
                    <div className="text-xl font-black font-mono text-brand-gold tracking-widest">
                      {simulatedOtp}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtp(simulatedOtp)}
                      className="text-[11px] text-brand-blue hover:underline font-bold mt-1 inline-block"
                    >
                      Click to auto-fill code {simulatedOtp}
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase font-bold text-brand-muted mb-1">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="sigma-input text-sm font-mono font-bold text-center tracking-widest"
                    placeholder="Enter code"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="sigma-btn-primary w-full text-xs font-bold !py-3 justify-center"
                >
                  {loading ? "Authenticating..." : "Verify & Access Profile"}
                  <CheckCircle2 className="h-4 w-4 ml-1 text-brand-green" />
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="relative z-10 space-y-3">
            <p className="text-xs text-brand-muted leading-relaxed">
              Select any pre-configured Indian investor profile to instantly experience tailored portfolio alpha:
            </p>

            <div className="space-y-2.5">
              {[
                {
                  key: "rajesh" as const,
                  name: PRESET_PROFILES.rajesh.name,
                  tier: PRESET_PROFILES.rajesh.accountTier,
                  broker: PRESET_PROFILES.rajesh.dematBroker,
                  focus: "Nifty & Bank Nifty F&O",
                  color: "border-brand-blue/40 hover:border-brand-blue",
                },
                {
                  key: "priya" as const,
                  name: PRESET_PROFILES.priya.name,
                  tier: PRESET_PROFILES.priya.accountTier,
                  broker: PRESET_PROFILES.priya.dematBroker,
                  focus: "Midcap Multibaggers & Large Cap Cash",
                  color: "border-brand-green/40 hover:border-brand-green",
                },
                {
                  key: "vikram" as const,
                  name: PRESET_PROFILES.vikram.name,
                  tier: PRESET_PROFILES.vikram.accountTier,
                  broker: PRESET_PROFILES.vikram.dematBroker,
                  focus: "0DTE Options Scalping & Futures",
                  color: "border-brand-gold/40 hover:border-brand-gold",
                },
              ].map((p) => (
                <div
                  key={p.key}
                  onClick={() => handleSelectPreset(p.key)}
                  className={`p-3.5 bg-brand-dark/90 rounded-2xl border ${p.color} cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-between shadow-sm`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{p.name}</span>
                      <span className="sigma-badge-gold text-[9px] font-bold">{p.tier}</span>
                    </div>
                    <span className="text-[10px] text-brand-muted block mt-0.5">
                      {p.broker} • {p.focus}
                    </span>
                  </div>
                  <span className="text-xs text-brand-blue font-bold flex items-center gap-1">
                    Select <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
