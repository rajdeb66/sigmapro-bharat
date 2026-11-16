"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  enrolledDate: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  certificateIssued: boolean;
  thumbnail: string;
}

export interface ActiveSubscription {
  id: string;
  serviceName: string;
  tier: "MONTHLY" | "QUARTERLY" | "ANNUAL";
  pricePaid: string;
  billingMethod: string;
  validTill: string;
  status: "ACTIVE" | "EXPIRING_SOON";
  analyst: string;
  category: "F&O" | "CASH" | "COMBO" | "THEMATIC";
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  pan: string;
  aadhaarLast4: string;
  dematBroker: string;
  dematClientId: string;
  tradingCapital: string;
  experienceLevel: string;
  riskProfile: string;
  preferredSegments: string[];
  clientId: string;
  kycStatus: string;
  accountTier: string;
  joinedDate: string;
  whatsappAlerts: boolean;
  telegramAlerts: boolean;
  smsAlerts: boolean;
  avatarColor: string;
  enrolledCourses: EnrolledCourse[];
  activeSubscriptions: ActiveSubscription[];
}

export const INITIAL_COURSES: EnrolledCourse[] = [
  {
    id: "course-1",
    title: "Bank Nifty Zero-to-Hero Expiry Strategy Mastery",
    instructor: "Amitabh Verma, CMT (SEBI Reg.)",
    enrolledDate: "12 Oct 2026",
    progressPercent: 75,
    completedLessons: 9,
    totalLessons: 12,
    certificateIssued: false,
    thumbnail: "from-blue-600 to-indigo-700",
  },
  {
    id: "course-2",
    title: "Institutional Order Flow & Smart Money Concepts (NSE)",
    instructor: "Rohan Singhal, CFA",
    enrolledDate: "28 Sep 2026",
    progressPercent: 100,
    completedLessons: 16,
    totalLessons: 16,
    certificateIssued: true,
    thumbnail: "from-emerald-600 to-teal-700",
  },
];

export const INITIAL_SUBSCRIPTIONS: ActiveSubscription[] = [
  {
    id: "sub-1",
    serviceName: "Nifty & Bank Nifty F&O Alpha Pro",
    tier: "MONTHLY",
    pricePaid: "₹4,999 / mo",
    billingMethod: "UPI AutoPay (HDFC Bank ••••4102)",
    validTill: "28 Nov 2026",
    status: "ACTIVE",
    analyst: "Amitabh Verma, CMT (SEBI INH000008492)",
    category: "F&O",
  },
  {
    id: "sub-2",
    serviceName: "NSE Midcap Multibagger Compounding",
    tier: "QUARTERLY",
    pricePaid: "₹9,999 / qtr",
    billingMethod: "Razorpay NetBanking (ICICI)",
    validTill: "15 Jan 2027",
    status: "ACTIVE",
    analyst: "Rohan Singhal, CFA (SEBI INH000011204)",
    category: "CASH",
  },
];

export const PRESET_PROFILES: Record<string, UserProfile> = {
  rajesh: {
    name: "Rajesh Sharma",
    phone: "+91 98765 43210",
    email: "rajesh.sharma@investor.in",
    city: "Mumbai, Maharashtra",
    pan: "ABCDE1234F",
    aadhaarLast4: "8921",
    dematBroker: "Zerodha Kite",
    dematClientId: "ZR8842",
    tradingCapital: "₹15 Lakhs - ₹50 Lakhs",
    experienceLevel: "Pro Trader (5+ Years)",
    riskProfile: "Aggressive (F&O & Cash Qualified)",
    preferredSegments: ["BANKNIFTY Weekly Options", "NIFTY Index Scalping", "Large Cap Cash Swing"],
    clientId: "SIGMA-IN-9842",
    kycStatus: "SEBI Verified",
    accountTier: "Pro Member",
    joinedDate: "January 2024",
    whatsappAlerts: true,
    telegramAlerts: true,
    smsAlerts: true,
    avatarColor: "from-blue-600 to-indigo-600",
    enrolledCourses: INITIAL_COURSES,
    activeSubscriptions: INITIAL_SUBSCRIPTIONS,
  },
  priya: {
    name: "Priya Iyer",
    phone: "+91 98112 56789",
    email: "priya.iyer@wealthfund.in",
    city: "Bengaluru, Karnataka",
    pan: "PQXYZ9876K",
    aadhaarLast4: "4320",
    dematBroker: "Groww",
    dematClientId: "GW5194",
    tradingCapital: "₹50 Lakhs+ (HNI)",
    experienceLevel: "Portfolio Investor (7+ Years)",
    riskProfile: "Moderate Growth (Cash & Positional)",
    preferredSegments: ["Midcap Multibaggers", "Nifty IT Sector Rotation", "Large Cap Cash Swing"],
    clientId: "SIGMA-IN-4421",
    kycStatus: "SEBI Verified",
    accountTier: "HNI Elite",
    joinedDate: "November 2023",
    whatsappAlerts: true,
    telegramAlerts: false,
    smsAlerts: true,
    avatarColor: "from-emerald-600 to-teal-600",
    enrolledCourses: [INITIAL_COURSES[1]],
    activeSubscriptions: [INITIAL_SUBSCRIPTIONS[1]],
  },
  vikram: {
    name: "Vikramaditya Mehta",
    phone: "+91 97234 11223",
    email: "v.mehta@algotrader.co",
    city: "Ahmedabad, Gujarat",
    pan: "KLMNO4567M",
    aadhaarLast4: "7712",
    dematBroker: "AngelOne",
    dematClientId: "AO7741",
    tradingCapital: "₹5 Lakhs - ₹15 Lakhs",
    experienceLevel: "Active Derivative Trader (3-5 Years)",
    riskProfile: "Very Aggressive (F&O Futures & Zero-DTE)",
    preferredSegments: ["NIFTY 0DTE Options", "Stock Futures Momentum", "Bank Nifty Hero-Zero"],
    clientId: "SIGMA-IN-7719",
    kycStatus: "SEBI Verified",
    accountTier: "Alpha Trader",
    joinedDate: "March 2024",
    whatsappAlerts: true,
    telegramAlerts: true,
    smsAlerts: false,
    avatarColor: "from-amber-500 to-orange-600",
    enrolledCourses: [INITIAL_COURSES[0]],
    activeSubscriptions: [INITIAL_SUBSCRIPTIONS[0]],
  },
};

const DEFAULT_USER: UserProfile = PRESET_PROFILES.rajesh;

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (phone: string, name?: string) => void;
  loginAsPreset: (presetKey: "rajesh" | "priya" | "vikram") => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  enrollInCourse: (course: { id: string; title: string; instructor: string; thumbnail?: string; totalLessons?: number }) => void;
  subscribeToPlan: (plan: { id: string; name: string; tier: "MONTHLY" | "QUARTERLY" | "ANNUAL"; price: string; analyst?: string; category?: "F&O" | "CASH" | "COMBO" | "THEMATIC" }) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sigmapro_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(DEFAULT_USER);
        localStorage.setItem("sigmapro_auth_user", JSON.stringify(DEFAULT_USER));
      }
    } catch {
      setUser(DEFAULT_USER);
    }
  }, []);

  const login = (phone: string, name?: string) => {
    const formattedPhone = phone.startsWith("+91") ? phone : `+91 ${phone.trim()}`;
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      phone: formattedPhone,
      name: name && name.trim() ? name.trim() : DEFAULT_USER.name,
      clientId: `SIGMA-IN-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setUser(newUser);
    try {
      localStorage.setItem("sigmapro_auth_user", JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
    showToast(`Welcome back, ${newUser.name}! Profile authenticated.`);
  };

  const loginAsPreset = (presetKey: "rajesh" | "priya" | "vikram") => {
    const selected = PRESET_PROFILES[presetKey] || DEFAULT_USER;
    setUser(selected);
    try {
      localStorage.setItem("sigmapro_auth_user", JSON.stringify(selected));
    } catch (e) {
      console.error(e);
    }
    showToast(`Switched account to ${selected.name} (${selected.accountTier})`);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("sigmapro_auth_user");
    } catch (e) {
      console.error(e);
    }
    showToast("Signed out successfully.");
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    try {
      localStorage.setItem("sigmapro_auth_user", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast("✓ Profile updated & synchronized across platform!");
  };

  const enrollInCourse = (course: { id: string; title: string; instructor: string; thumbnail?: string; totalLessons?: number }) => {
    if (!user) return;
    const exists = user.enrolledCourses?.some((c) => c.id === course.id);
    if (exists) {
      showToast("You are already enrolled in this course! Check your Dashboard.");
      return;
    }

    const newEnrolled: EnrolledCourse = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      enrolledDate: "Just now",
      progressPercent: 5,
      completedLessons: 1,
      totalLessons: course.totalLessons || 12,
      certificateIssued: false,
      thumbnail: course.thumbnail || "from-blue-600 to-indigo-700",
    };

    const updated = {
      ...user,
      enrolledCourses: [newEnrolled, ...(user.enrolledCourses || [])],
    };
    setUser(updated);
    try {
      localStorage.setItem("sigmapro_auth_user", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`🎉 Enrolled in "${course.title}"! Course added to your Dashboard.`);
  };

  const subscribeToPlan = (plan: { id: string; name: string; tier: "MONTHLY" | "QUARTERLY" | "ANNUAL"; price: string; analyst?: string; category?: "F&O" | "CASH" | "COMBO" | "THEMATIC" }) => {
    if (!user) return;
    const validDate = new Date();
    if (plan.tier === "MONTHLY") validDate.setMonth(validDate.getMonth() + 1);
    if (plan.tier === "QUARTERLY") validDate.setMonth(validDate.getMonth() + 3);
    if (plan.tier === "ANNUAL") validDate.setFullYear(validDate.getFullYear() + 1);

    const newSub: ActiveSubscription = {
      id: `sub-${Date.now()}`,
      serviceName: plan.name,
      tier: plan.tier,
      pricePaid: plan.price,
      billingMethod: "UPI AutoPay Instant",
      validTill: validDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "ACTIVE",
      analyst: plan.analyst || "SEBI Certified Research Desk",
      category: plan.category || "F&O",
    };

    const updated = {
      ...user,
      activeSubscriptions: [newSub, ...(user.activeSubscriptions || [])],
    };
    setUser(updated);
    try {
      localStorage.setItem("sigmapro_auth_user", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`🚀 Subscribed to "${plan.name}"! Premium calls now unlocked.`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsPreset,
        logout,
        updateProfile,
        enrollInCourse,
        subscribeToPlan,
        toastMessage,
        showToast,
        isEditModalOpen,
        setIsEditModalOpen,
        isSignInModalOpen,
        setIsSignInModalOpen,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-md bg-brand-dark/95 border border-brand-green/40 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl shadow-brand-green/20 backdrop-blur-xl flex items-center gap-3 animate-bounce">
          <div className="h-6 w-6 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green shrink-0 font-bold">
            ✓
          </div>
          <span className="font-medium text-slate-100">{toastMessage}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
