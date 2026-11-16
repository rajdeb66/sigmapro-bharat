"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  GraduationCap,
  Play,
  BookOpen,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  Video,
  FileText,
  Users,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface Lesson {
  title: string;
  duration: string;
  isFreePreview?: boolean;
}

interface Course {
  id: string;
  title: string;
  tagline: string;
  category: "F&O Derivatives" | "Price Action & Order Flow" | "Fundamental Investing" | "Quantitative";
  instructor: string;
  instructorRole: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  price: string;
  originalPrice: string;
  duration: string;
  totalLessons: number;
  thumbnailGradient: string;
  previewVideoUrl: string; // for mock player
  curriculum: { module: string; lessons: Lesson[] }[];
  keyOutcomes: string[];
}

export default function CoursesStorePage() {
  const { user, enrollInCourse, setIsSignInModalOpen } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [previewModalCourse, setPreviewModalCourse] = useState<Course | null>(null);
  const [enrolledSuccessCourse, setEnrolledSuccessCourse] = useState<Course | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ "mod-0": true });

  const courses: Course[] = [
    {
      id: "course-1",
      title: "Bank Nifty Zero-to-Hero Expiry Strategy Mastery",
      tagline: "Master intraday gamma spikes, open interest unwinding & 0DTE options strike selection with strict 1:3 R:R.",
      category: "F&O Derivatives",
      instructor: "Amitabh Verma, CMT",
      instructorRole: "SEBI Registered Research Analyst (INH000008492)",
      rating: 4.9,
      reviewsCount: 420,
      studentsCount: 2840,
      price: "₹1,999",
      originalPrice: "₹4,999",
      duration: "14.5 Hours • 12 Video Modules",
      totalLessons: 12,
      thumbnailGradient: "from-blue-600 via-indigo-700 to-brand-card",
      previewVideoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      keyOutcomes: [
        "Detect institutional strike pinning on Bank Nifty expiry days",
        "Gamma scalping with strict 15% stop-loss boundary rules",
        "Live 1-Click order execution with Zerodha & Groww brackets",
        "Includes access to Private Telegram Expiry Voice Room",
      ],
      curriculum: [
        {
          module: "Module 1: The Anatomy of Bank Nifty Derivatives",
          lessons: [
            { title: "Lesson 1: Strike Selection & Moneyness (ITM vs OTM on Expiry)", duration: "24 mins", isFreePreview: true },
            { title: "Lesson 2: Open Interest (OI) & PCR Data Interpretation Live", duration: "32 mins", isFreePreview: true },
            { title: "Lesson 3: Max Pain Theory vs Actual Institutional Settlement", duration: "28 mins" },
          ],
        },
        {
          module: "Module 2: High-Probability Setups & Entry Rules",
          lessons: [
            { title: "Lesson 4: The 01:45 PM Expiry Squeeze Setup", duration: "42 mins" },
            { title: "Lesson 5: Invalidation Points & Trailing SL Architecture", duration: "30 mins" },
            { title: "Lesson 6: Capital Sizing & The Rule of 2% Margin per Trade", duration: "25 mins" },
          ],
        },
      ],
    },
    {
      id: "course-2",
      title: "Institutional Order Flow & Smart Money Concepts (NSE)",
      tagline: "Trade like market makers: Decode dark pool transactions, liquidity sweep levels, and volume profile on Nifty & stocks.",
      category: "Price Action & Order Flow",
      instructor: "Rohan Singhal, CFA",
      instructorRole: "Former Desk Trader & SEBI Research Analyst",
      rating: 4.95,
      reviewsCount: 310,
      studentsCount: 1980,
      price: "₹4,499",
      originalPrice: "₹9,999",
      duration: "22 Hours • 16 Intensive Modules",
      totalLessons: 16,
      thumbnailGradient: "from-emerald-600 via-teal-700 to-brand-card",
      previewVideoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      keyOutcomes: [
        "Identify fair value gaps (FVG) and order blocks on 5m/15m charts",
        "Volume profile point-of-control (POC) rejection entries",
        "Avoid retail breakout traps at psychological round numbers",
        "Downloadable custom NSE Order Flow indicator bundle",
      ],
      curriculum: [
        {
          module: "Module 1: Liquidity Pools & Market Maker Manipulation",
          lessons: [
            { title: "Lesson 1: Who Really Moves the Indian Equity Market?", duration: "35 mins", isFreePreview: true },
            { title: "Lesson 2: Identifying Stop-Loss Clusters Above Day Highs", duration: "40 mins" },
            { title: "Lesson 3: High-Frequency Imbalances on Nifty Futures", duration: "45 mins" },
          ],
        },
        {
          module: "Module 2: Order Blocks & Premium/Discount Valuation",
          lessons: [
            { title: "Lesson 4: Bullish & Bearish Institutional Footprints", duration: "38 mins" },
            { title: "Lesson 5: Real-World Case Studies on Reliance & HDFC Bank", duration: "50 mins" },
          ],
        },
      ],
    },
    {
      id: "course-3",
      title: "Options Greeks Mastery & Delta-Neutral Hedging",
      tagline: "Generate consistent weekly returns using Iron Condors, Strangles, and dynamic Vega/Theta adjustments.",
      category: "F&O Derivatives",
      instructor: "Pooja Hegde, NISM-XV",
      instructorRole: "Derivatives Strategist & Options Portfolio Manager",
      rating: 4.88,
      reviewsCount: 185,
      studentsCount: 1420,
      price: "₹3,299",
      originalPrice: "₹6,999",
      duration: "18 Hours • 14 Step-by-Step Modules",
      totalLessons: 14,
      thumbnailGradient: "from-amber-600 via-orange-700 to-brand-card",
      previewVideoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      keyOutcomes: [
        "Demystifying Delta, Gamma, Theta decay, and Implied Volatility (IV)",
        "Constructing non-directional weekly expiry income strategies",
        "Defending losing adjustments when market gaps against your spread",
        "Live margin utilization with SEBI hedge benefit reduction",
      ],
      curriculum: [
        {
          module: "Module 1: The Mathematical Engine of Options Pricing",
          lessons: [
            { title: "Lesson 1: Black-Scholes Model simplified for Indian Retail", duration: "30 mins", isFreePreview: true },
            { title: "Lesson 2: Theta Decay Velocity from Monday to Thursday", duration: "35 mins" },
          ],
        },
      ],
    },
    {
      id: "course-4",
      title: "Equity Valuation & 10x Multibagger Fundamental Hunting",
      tagline: "Learn the exact balance sheet, cash flow, and ROCE screening playbook to find the next Titan or Trent early.",
      category: "Fundamental Investing",
      instructor: "Vikramaditya Mehta",
      instructorRole: "Senior Equity Portfolio Manager (HNI Fund)",
      rating: 4.85,
      reviewsCount: 240,
      studentsCount: 1650,
      price: "₹2,499",
      originalPrice: "₹5,499",
      duration: "16 Hours • 10 Financial Modeling Modules",
      totalLessons: 10,
      thumbnailGradient: "from-purple-600 via-indigo-800 to-brand-card",
      previewVideoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      keyOutcomes: [
        "Reading Indian Annual Reports & Auditor qualification notes",
        "Cash flow from operations (CFO) vs Net Profit forensic audit",
        "Promoter pledging & corporate governance red-flag detection",
        "Pre-built Excel DCF Valuation model templates included",
      ],
      curriculum: [
        {
          module: "Module 1: Financial Statement Forensics (Indian Companies)",
          lessons: [
            { title: "Lesson 1: Dissecting Cash Flow vs Reported Earnings", duration: "45 mins", isFreePreview: true },
            { title: "Lesson 2: Working Capital Traps in Capex-Heavy Firms", duration: "38 mins" },
          ],
        },
      ],
    },
  ];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === "ALL") return true;
    return c.category === selectedCategory;
  });

  const handleEnrollClick = (course: Course) => {
    if (!user) {
      setIsSignInModalOpen(true);
      return;
    }
    enrollInCourse({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      thumbnail: course.thumbnailGradient,
      totalLessons: course.totalLessons,
    });
    setEnrolledSuccessCourse(course);
  };

  const toggleModule = (modKey: string) => {
    setExpandedModules((prev) => ({ ...prev, [modKey]: !prev[modKey] }));
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-brand-card via-[#111927] to-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 sigma-badge-gold text-xs font-bold mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>SIGMAPRO BHARAT TRADING ACADEMY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Master the Indian Markets with <span className="sigma-gradient-text">SEBI Certified Mentors</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-brand-muted leading-relaxed">
              Actionable masterclasses from professional desk traders. Practical Bank Nifty expiry playbooks, institutional order flow blueprints, and forensic fundamental stock screening.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Users className="h-4 w-4 text-brand-blue" />
                <span>7,800+ Active Students</span>
              </div>
              <span className="text-brand-border">•</span>
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Award className="h-4 w-4 text-brand-gold" />
                <span>NISM & SEBI Verified Curricula</span>
              </div>
              <span className="text-brand-border">•</span>
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Video className="h-4 w-4 text-brand-green" />
                <span>Lifetime Access + Live Q&A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 border-b border-brand-border/80 pb-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            {[
              { id: "ALL", label: "All Masterclasses" },
              { id: "F&O Derivatives", label: "F&O Derivatives" },
              { id: "Price Action & Order Flow", label: "Order Flow (NSE)" },
              { id: "Fundamental Investing", label: "Fundamental Multibaggers" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-brand-card text-brand-muted hover:text-white border border-brand-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Link
            href="/plans"
            className="text-xs text-brand-gold hover:underline font-bold shrink-0 flex items-center gap-1"
          >
            Looking for live calls? View Subscription Plans →
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = user?.enrolledCourses?.some((c) => c.id === course.id);

            return (
              <div
                key={course.id}
                className="sigma-card border-brand-border hover:border-brand-blue/60 p-6 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Thumbnail / Header Gradient Area */}
                  <div
                    className={`h-40 rounded-2xl bg-gradient-to-br ${course.thumbnailGradient} p-5 relative overflow-hidden mb-5 flex flex-col justify-between shadow-inner`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-wider">
                        {course.category}
                      </span>
                      <button
                        onClick={() => setPreviewModalCourse(course)}
                        className="bg-black/70 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow transition-all hover:scale-105"
                      >
                        <Play className="h-3.5 w-3.5 fill-white text-white" />
                        Free Video Preview
                      </button>
                    </div>

                    <div className="text-white">
                      <span className="text-[11px] font-medium opacity-80 block">Instructor:</span>
                      <span className="text-base font-black tracking-wide flex items-center gap-1.5">
                        {course.instructor}
                        <ShieldCheck className="h-4 w-4 text-brand-green" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-black text-white group-hover:text-brand-blue transition-colors mb-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed mb-4">
                    {course.tagline}
                  </p>

                  {/* Rating & Duration */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted mb-4 pb-4 border-b border-brand-border/60">
                    <div className="flex items-center gap-1 text-white font-bold">
                      <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                      <span>{course.rating}</span>
                      <span className="text-brand-muted font-normal">({course.reviewsCount})</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-brand-blue" />
                      <span>{course.duration}</span>
                    </div>
                    <span>•</span>
                    <span className="text-brand-gold font-medium">{course.studentsCount} Students</span>
                  </div>

                  {/* Key Learning Points */}
                  <div className="space-y-2 mb-5">
                    <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                      What You Will Master:
                    </span>
                    {course.keyOutcomes.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-brand-muted">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Price & Enroll Button */}
                <div className="pt-4 border-t border-brand-border/80 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white font-mono">
                        {course.price}
                      </span>
                      <span className="text-xs text-brand-muted line-through font-mono">
                        {course.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-green font-bold block">
                      60% Early Bird Discount Applied
                    </span>
                  </div>

                  {isEnrolled ? (
                    <Link
                      href="/dashboard"
                      className="sigma-btn-outline text-xs !py-2.5 !px-4 font-bold border-brand-green/40 text-brand-green hover:bg-brand-green/10"
                    >
                      ✓ Enrolled • Open Player
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleEnrollClick(course)}
                      className="sigma-btn-primary text-xs !py-2.5 !px-5 font-bold flex items-center gap-1.5 shadow-lg shadow-brand-blue/20"
                    >
                      Enroll Now ({course.price})
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Preview & Curriculum Modal */}
        {previewModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
            <div className="bg-brand-card border border-brand-border rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 overflow-hidden">
              <div className="flex items-start justify-between gap-4 border-b border-brand-border/80 pb-4 mb-4">
                <div>
                  <span className="sigma-badge-gold text-[10px] font-bold mb-1 inline-block">
                    Free Video Preview
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {previewModalCourse.title}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Mentor: {previewModalCourse.instructor} • {previewModalCourse.instructorRole}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewModalCourse(null)}
                  className="p-1.5 text-brand-muted hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mock Video Player Box */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-brand-border relative mb-6 flex items-center justify-center group shadow-xl">
                <div className="text-center p-6 space-y-3">
                  <div className="h-16 w-16 rounded-full bg-brand-blue/30 border border-brand-blue/60 flex items-center justify-center text-white mx-auto shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="h-8 w-8 fill-white text-white ml-1" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Lesson 1 Free Preview: Strike Selection & Moneyness on Expiry
                    </span>
                    <span className="text-xs text-brand-muted">
                      Full 24-minute HD lesson unlocked for non-enrolled students
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Curriculum Accordion */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                  Complete Course Syllabus & Lesson Blueprint
                </h4>

                {previewModalCourse.curriculum.map((mod, i) => {
                  const modKey = `mod-${i}`;
                  const isExp = expandedModules[modKey];

                  return (
                    <div key={i} className="bg-brand-dark/90 rounded-2xl border border-brand-border overflow-hidden">
                      <button
                        onClick={() => toggleModule(modKey)}
                        className="w-full p-3.5 text-left text-xs font-bold text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span>{mod.module}</span>
                        {isExp ? <ChevronUp className="h-4 w-4 text-brand-muted" /> : <ChevronDown className="h-4 w-4 text-brand-muted" />}
                      </button>

                      {isExp && (
                        <div className="px-3.5 pb-3.5 space-y-2 border-t border-brand-border/60 pt-2 text-xs text-brand-muted">
                          {mod.lessons.map((ls, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1 border-b border-brand-border/40 last:border-0">
                              <span className="flex items-center gap-2">
                                {ls.isFreePreview ? (
                                  <span className="sigma-badge-green text-[9px] font-bold">Free Preview</span>
                                ) : (
                                  <Lock className="h-3 w-3 text-brand-muted" />
                                )}
                                <span className={ls.isFreePreview ? "text-white font-medium" : ""}>{ls.title}</span>
                              </span>
                              <span className="text-[10px] text-brand-muted font-mono">{ls.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between">
                <div>
                  <span className="text-xl font-black text-white font-mono block">
                    {previewModalCourse.price}
                  </span>
                  <span className="text-[10px] text-brand-green font-bold">Includes Certificate & Q&A Access</span>
                </div>

                <button
                  onClick={() => {
                    handleEnrollClick(previewModalCourse);
                    setPreviewModalCourse(null);
                  }}
                  className="sigma-btn-primary text-xs !py-3 !px-6 font-bold"
                >
                  Enroll in Full Masterclass →
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Enrollment Success Celebration Modal */}
        {enrolledSuccessCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-brand-card border-2 border-brand-green/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 text-center">
              <button
                onClick={() => setEnrolledSuccessCourse(null)}
                className="absolute top-5 right-5 p-2 text-brand-muted hover:text-white rounded-xl hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-16 w-16 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center text-brand-green mx-auto shadow-lg shadow-brand-green/20 animate-bounce">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div>
                <span className="sigma-badge-green text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  Enrollment Confirmed
                </span>
                <h3 className="text-xl font-bold text-white">
                  Welcome to the Masterclass!
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  You now have full lifetime access to <strong className="text-white">{enrolledSuccessCourse.title}</strong>, video practicums, code templates, and accredited SEBI completion certificate.
                </p>
              </div>

              <div className="p-4 bg-brand-dark rounded-2xl border border-brand-border text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Lead Mentor:</span>
                  <span className="font-bold text-white">{enrolledSuccessCourse.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Total Modules:</span>
                  <span className="font-mono text-brand-gold font-bold">{enrolledSuccessCourse.totalLessons} Video Lessons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Location:</span>
                  <span className="text-brand-blue font-bold">Synced with Customer Dashboard</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/dashboard?tab=courses"
                  className="sigma-btn-primary w-full sm:w-auto text-xs !py-3 !px-6 font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
                >
                  <GraduationCap className="h-4 w-4" />
                  Go to My Courses in Dashboard
                </Link>
                <button
                  onClick={() => setEnrolledSuccessCourse(null)}
                  className="sigma-btn-outline w-full sm:w-auto text-xs !py-3 !px-5"
                >
                  Keep Browsing
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
