import Link from "next/link";
import { TrendingUp, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-blue/10 border border-brand-blue/20">
              <TrendingUp className="h-4 w-4 text-brand-blue" />
            </div>
            <span className="text-base font-bold text-white">
              SIGMA<span className="text-brand-gold">PRO</span> BHARAT
            </span>
            <span className="text-xs text-brand-muted">• Indian Trading & Investment Alpha</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <ShieldCheck className="h-4 w-4 text-brand-green" />
            <span>SEBI Research Analyst Compliant • NSE / BSE Market Data</span>
          </div>
        </div>

        {/* Indian Statutory Disclaimer */}
        <div className="mt-6 pt-6 border-t border-brand-border/40 text-center">
          <p className="text-[10px] text-brand-muted/70 leading-relaxed max-w-4xl mx-auto">
            <strong>Standard SEBI Regulatory Disclosure:</strong> Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Derivative (F&O) trading carries high risk; SEBI study shows 9 out of 10 individual traders in equity F&O segment incurred net losses.
          </p>
          <p className="text-[10px] text-brand-muted/50 mt-2">
            © 2026 SIGMAPRO India Financial Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
