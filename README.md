# SIGMAPRO Bharat — Indian Market Signals & Investor Terminal

A production-ready, high-speed trading signals platform and customer profile portal designed specifically for the Indian equity and derivatives market (NSE / BSE).

---

## 🇮🇳 Live Features

### 1. Major Indian Market Indices & Real-Time Prices
* **NIFTY 50** (`₹24,148.20`, `+0.52%`)
* **SENSEX** (`₹79,486.32`, `+0.50%`)
* **BANK NIFTY** (`₹51,780.45`, `+0.41%`)
* **NIFTY IT** (`₹41,892.10`, `+0.75%`)
* **NIFTY MIDCAP 100** (`₹56,412.80`, `+0.86%`)
* **INDIA VIX** (`14.28`, `-2.85%`)
* **Top Traded Bluechips**: RELIANCE, HDFCBANK, ICICIBANK, TCS, INFY, TATAMOTORS, LT, SBIN.

### 2. High-Conviction Indian Trading Calls
* **Segment Filter**: All Calls, Options F&O, Cash Delivery (Swing Multibaggers), Futures.
* Numerical buy zones, Target 1, Target 2, and Stop Loss in Indian Rupees (₹).
* Live status tracking and SEBI Registered Research Analyst accreditation tags.

### 3. Customer Authentication & Mobile Verification
* **Indian Mobile OTP Gateway** (`/api/auth/verify-otp`):
  * Request 6-digit verification code sent via SMS & WhatsApp.
  * Instant validation with interactive countdown and resend timer.
  * 1-Click Demo Login option for instant client onboarding.
* Persistent Auth Context (`localStorage`) syncing client profile across the platform.

### 4. Customer Profile Dashboard (`/dashboard`)
* Investor details: Name, Client ID, Verified PAN, Aadhaar e-KYC, linked Demat Broker (Zerodha Kite, Groww, AngelOne).
* Active calls tracker with live MTM and today's P&L summary (+₹21,920).
* Advisory subscriptions with UPI AutoPay management and GST tax invoices.
* SEBI-mandated risk profiling and real-time alert channels (WhatsApp, Telegram VIP, SMS).

---

## 🚀 Running the Production App

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Start the production server
npm start
```

Access the application in your browser at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Publish & Deployment Options

This application is fully production-optimized and can be deployed with one click:
* **Vercel**: Import this GitHub repository or folder; it will automatically detect Next.js.
* **AWS / Docker / VPS**: Run `npm run build && npm start`.
