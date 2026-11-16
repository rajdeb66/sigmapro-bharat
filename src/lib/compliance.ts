// src/lib/compliance.ts
// Mandatory legal and compliance disclaimer enforcement across SIGMAPRO

export const MANDATORY_DISCLAIMER =
  "SIGMAPRO is for educational purposes only. Not financial advice. Past performance does not guarantee future results.";

/**
 * Ensures any message, signal, or service note contains the mandatory disclaimer.
 */
export function enforceDisclaimer(content: string): string {
  if (content.includes(MANDATORY_DISCLAIMER)) {
    return content;
  }
  return `${content.trim()}\n\n---\n*Disclaimer: ${MANDATORY_DISCLAIMER}*`;
}

/**
 * Checks if a user's country code is subject to sanction gating.
 */
export function isJurisdictionBlocked(countryCode: string): boolean {
  const BLOCKED_CODES = ["KP", "IR", "SY", "CU", "RU", "MM"];
  return BLOCKED_CODES.includes(countryCode.toUpperCase());
}
