import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import ProfileEditModal from "@/components/profile/ProfileEditModal";
import SignInModal from "@/components/auth/SignInModal";

export const metadata: Metadata = {
  title: "SIGMAPRO Bharat — Indian Market Signals & Customer Profile Terminal",
  description: "Live Indian market indices (NIFTY 50, SENSEX, BANK NIFTY), verified trading signals in INR, and personalized customer profile dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-brand-navy text-white antialiased">
        <AuthProvider>
          {children}
          <ProfileEditModal />
          <SignInModal />
        </AuthProvider>
      </body>
    </html>
  );
}
