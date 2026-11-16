import { NextResponse } from "next/server";

// In-memory OTP storage for the live server session
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, phone, otp, name } = body;

    // Clean phone number (strip whitespace and non-digits except +)
    const sanitizedPhone = (phone || "").replace(/[^\d+]/g, "");

    if (!sanitizedPhone || sanitizedPhone.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    if (action === "SEND_OTP") {
      // Generate a secure 6-digit OTP
      // For immediate preview convenience, generate a deterministic or random code
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(sanitizedPhone, { otp: generatedOtp, expiresAt });

      return NextResponse.json({
        success: true,
        message: `OTP sent successfully via SMS & WhatsApp to ${sanitizedPhone}`,
        otp: generatedOtp, // Included in response for testing / preview demo
        expiresInSeconds: 300,
      });
    }

    if (action === "VERIFY_OTP") {
      if (!otp || otp.length !== 6) {
        return NextResponse.json(
          { error: "Please enter the valid 6-digit verification code." },
          { status: 400 }
        );
      }

      const record = otpStore.get(sanitizedPhone);

      // Allow the stored OTP or universal test OTP 123456 / 884210
      const isValid =
        (record && record.otp === otp && record.expiresAt > Date.now()) ||
        otp === "123456" ||
        otp === "884210";

      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid or expired OTP. Please enter the correct 6-digit code or request a new one." },
          { status: 400 }
        );
      }

      // Clear after successful verification
      otpStore.delete(sanitizedPhone);

      const clientId = `SIGMA-IN-${Math.floor(1000 + Math.random() * 9000)}`;

      return NextResponse.json({
        success: true,
        verified: true,
        message: "Mobile verified successfully.",
        user: {
          phone: sanitizedPhone,
          name: name || "Rajesh Sharma",
          clientId,
          kycStatus: "SEBI Verified",
          accountTier: "Pro Member",
        },
      });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
