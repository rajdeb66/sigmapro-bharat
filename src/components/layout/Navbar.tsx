"use client";

import Link from "next/link";
import { useState } from "react";
import {
  TrendingUp,
  User,
  ShieldCheck,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  ChevronDown,
  Edit2,
  Sparkles,
  Lock,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, isAuthenticated, logout, loginAsPreset, setIsEditModalOpen, setIsSignInModalOpen } = useAuth();

  const marketTicker = [
    { name: "NIFTY 50", price: "24,148.20", change: "+124.60", pct: "+0.52%", up: true },
    { name: "SENSEX", price: "79,486.32", change: "+398.15", pct: "+0.50%", up: true },
    { name: "BANK NIFTY", price: "51,780.45", change: "+210.80", pct: "+0.41%", up: true },
    { name: "NIFTY IT", price: "41,892.10", change: "+312.40", pct: "+0.75%", up: true },
    { name: "INDIA VIX", price: "14.28", change: "-0.42", pct: "-2.85%", up: false },
  ];

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "IN";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-brand-border bg-brand-navy/95 backdrop-blur-xl">
      {/* Top Live Indian Indices Bar */}
      <div className="bg-brand-dark/90 border-b border-brand-border/60 px-4 py-1.5 overflow-x-auto text-[11px] select-none">
        <div className="max-w-7xl mx-auto flex items-center gap-6 min-w-max">
          <div className="flex items-center gap-1.5 text-brand-muted font-semibold uppercase tracking-wider text-[10px]">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <span>NSE/BSE LIVE</span>
          </div>

          <div className="flex items-center gap-6">
            {marketTicker.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-bold text-white">{item.name}</span>
                <span className="font-mono text-white">₹{item.price}</span>
                <span
                  className={`flex items-center font-mono font-semibold ${
                    item.up ? "text-brand-green" : "text-brand-red"
                  }`}
                >
                  {item.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {item.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-card border border-brand-blue/30 shadow-md">
              <TrendingUp className="h-5 w-5 text-brand-blue" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-white">
                  SIGMA<span className="text-brand-gold">PRO</span>
                </span>
                <span className="text-[10px] bg-brand-gold/15 text-brand-gold px-1.5 py-0.2 rounded font-extrabold tracking-wider border border-brand-gold/30">
                  BHARAT
                </span>
              </div>
              <p className="text-[9px] text-brand-muted uppercase tracking-wider">
                SEBI Reg. Research Advisory Desk
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-5">
            <Link
              href="/"
              className="text-xs uppercase font-bold tracking-wider text-brand-muted hover:text-white transition-colors"
            >
              Advisory Desk &amp; Calls
            </Link>
            <Link
              href="/plans"
              className="text-xs uppercase font-bold tracking-wider text-brand-gold hover:text-white transition-colors flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3 text-brand-gold" />
              Research Plans
            </Link>
            <Link
              href="/courses"
              className="text-xs uppercase font-bold tracking-wider text-brand-blue hover:text-white transition-colors"
            >
              Trading Academy
            </Link>
            <Link
              href="/dashboard"
              className="text-xs uppercase font-bold tracking-wider text-brand-muted hover:text-white transition-colors"
            >
              Client Portal
            </Link>
          </nav>

          {/* Customer Profile Pill / Sign In Action */}
          <div className="hidden md:flex items-center gap-3 relative">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2.5 bg-brand-card/90 hover:bg-brand-card border border-brand-border hover:border-brand-blue/50 px-3.5 py-1.5 rounded-2xl transition-all shadow-md"
                >
                  <div
                    className={`h-7 w-7 rounded-xl bg-gradient-to-br ${user.avatarColor || "from-blue-600 to-indigo-600"} flex items-center justify-center font-bold text-xs text-white shadow`}
                  >
                    {getInitials(user.name)}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{user.name}</span>
                      <ShieldCheck className="h-3 w-3 text-brand-green" />
                    </div>
                    <span className="text-[10px] text-brand-muted font-mono">
                      {user.clientId} • {user.dematBroker.split(" ")[0]}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-brand-muted ml-1" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-brand-card border border-brand-border rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-brand-border text-xs">
                      <p className="text-white font-black text-sm">{user.name}</p>
                      <p className="text-[11px] text-brand-muted font-mono">{user.phone}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="sigma-badge-green text-[9px] font-bold">
                          {user.kycStatus}
                        </span>
                        <span className="sigma-badge-gold text-[9px] font-bold">
                          {user.accountTier}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdown(false);
                          setIsEditModalOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-brand-blue hover:text-white hover:bg-white/5 flex items-center gap-2 font-semibold"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-brand-blue" />
                        Edit Profile & Demat Sync
                      </button>

                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdown(false)}
                        className="block px-4 py-2 text-xs text-brand-muted hover:text-white hover:bg-white/5"
                      >
                        Portfolio & Live P&L Dashboard
                      </Link>

                      <Link
                        href="/courses"
                        onClick={() => setProfileDropdown(false)}
                        className="block px-4 py-2 text-xs text-brand-muted hover:text-white hover:bg-white/5"
                      >
                        Trading Academy Courses ({user.enrolledCourses?.length || 0})
                      </Link>

                      <Link
                        href="/plans"
                        onClick={() => setProfileDropdown(false)}
                        className="block px-4 py-2 text-xs text-brand-muted hover:text-white hover:bg-white/5"
                      >
                        Active Subscriptions ({user.activeSubscriptions?.length || 0})
                      </Link>
                    </div>

                    {/* Switch Persona Shortcuts */}
                    <div className="px-4 py-2 border-t border-brand-border/60">
                      <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block mb-1.5">
                        Quick Switch Personas:
                      </span>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            loginAsPreset("rajesh");
                            setProfileDropdown(false);
                          }}
                          className="w-full text-left text-[11px] text-brand-muted hover:text-white block py-0.5 truncate"
                        >
                          • Rajesh Sharma (F&O Trader)
                        </button>
                        <button
                          onClick={() => {
                            loginAsPreset("priya");
                            setProfileDropdown(false);
                          }}
                          className="w-full text-left text-[11px] text-brand-muted hover:text-white block py-0.5 truncate"
                        >
                          • Priya Iyer (HNI Swing Investor)
                        </button>
                        <button
                          onClick={() => {
                            loginAsPreset("vikram");
                            setProfileDropdown(false);
                          }}
                          className="w-full text-left text-[11px] text-brand-muted hover:text-white block py-0.5 truncate"
                        >
                          • Vikramaditya Mehta (Alpha Scalper)
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-brand-border/80">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-brand-red hover:bg-brand-red/10 flex items-center gap-1.5 font-semibold"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSignInModalOpen(true)}
                  className="sigma-btn-primary text-xs !py-2 !px-4 font-bold shadow-md shadow-brand-blue/20"
                >
                  Sign In with Mobile OTP
                </button>
                <Link
                  href="/auth/signin"
                  className="sigma-btn-outline text-xs !py-2 !px-3"
                >
                  Sign In Page
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-brand-muted hover:text-white"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-card border-b border-brand-border p-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-white py-1.5"
          >
            Advisory Desk &amp; Calls
          </Link>
          <Link
            href="/plans"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-brand-gold py-1.5"
          >
            Advisory Research Plans
          </Link>
          <Link
            href="/courses"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-brand-blue py-1.5"
          >
            Trading Academy Masterclasses
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-white py-1.5"
          >
            Client Portal &amp; Dossier
          </Link>

          <div className="pt-2 border-t border-brand-border space-y-2">
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  className="sigma-btn-primary w-full text-xs !py-2.5 justify-center font-bold"
                >
                  <Edit2 className="h-4 w-4 mr-1" /> Edit Profile Studio
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="sigma-btn-outline w-full text-xs !py-2 justify-center text-brand-red border-brand-red/30"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1" /> Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsSignInModalOpen(true);
                }}
                className="sigma-btn-primary w-full text-xs !py-2.5 justify-center font-bold"
              >
                Sign In with Mobile OTP
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
