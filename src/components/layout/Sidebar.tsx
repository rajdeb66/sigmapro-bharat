"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LucideIcon } from "lucide-react";

interface SidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
  subtitle?: string;
}

export default function Sidebar({ links, title, subtitle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-brand-border bg-brand-dark overflow-y-auto hidden lg:block">
      <div className="p-6">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h2>
        {subtitle && <p className="text-xs text-brand-muted mt-1">{subtitle}</p>}
      </div>
      <nav className="px-3 pb-6 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                  : "text-brand-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
