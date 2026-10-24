import type { CSSProperties } from "react";

export const emailColors = {
  primary: "#22c55e",
  primaryDark: "#16a34a",
  secondary: "#eab308",
  bgDark: "#0a0f1a",
  cardDark: "#151c2c",
  textPrimary: "#f8fafc",
  textMuted: "#94a3b8",
  textBody: "#cbd5e1",
  borderMuted: "rgba(148, 163, 184, 0.1)",
  borderPrimary: "rgba(34, 197, 94, 0.3)",
};

export const emailFonts = {
  heading: '"Orbitron", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

// ============================================
// SHARED LAYOUT STYLES
// ============================================
export const mainLayout: CSSProperties = {
  backgroundColor: emailColors.bgDark,
  fontFamily: emailFonts.body,
  padding: "40px 16px",
  margin: 0,
};

export const outerContainer: CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "4px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(234, 179, 8, 0.2), rgba(34, 197, 94, 0.1))",
};

export const innerContainer: CSSProperties = {
  backgroundColor: emailColors.cardDark,
  borderRadius: "20px",
  padding: 0,
  overflow: "hidden",
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
};

// ============================================
// HEADER STYLES
// ============================================
export const headerSection: CSSProperties = {
  textAlign: "center",
  padding: "48px 40px 32px 40px",
  background:
    "linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, transparent 100%)",
};

export const headerLogo: CSSProperties = {
  display: "block",
  margin: "0 auto 24px auto",
  width: "150px",
  height: "150px",
  borderRadius: "12px",
  boxShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4)",
  border: "2px solid rgba(34, 197, 94, 0.3)",
};

export const gradientLine: CSSProperties = {
  height: "3px",
  maxWidth: "120px",
  margin: "0 auto",
  background:
    "linear-gradient(90deg, transparent, #22c55e, #eab308, #22c55e, transparent)",
  borderRadius: "2px",
};

// ============================================
// BADGE STYLES
// ============================================
export const badgeSection: CSSProperties = {
  textAlign: "center",
  padding: "0 40px 24px 40px",
};

export const badgePill = (color = "#22c55e"): CSSProperties => ({
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "700",
  letterSpacing: "2px",
  color,
  backgroundColor: `${color}20`,
  padding: "10px 24px",
  borderRadius: "100px",
  border: `2px solid ${color}40`,
  margin: 0,
});

// ============================================
// HERO & TYPOGRAPHY
// ============================================
export const heroSection: CSSProperties = {
  textAlign: "center",
  padding: "0 40px 32px 40px",
};

export const mainHeading: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "36px",
  fontWeight: "800",
  color: emailColors.textPrimary,
  margin: "0 0 16px 0",
  lineHeight: "1.2",
  letterSpacing: "0.5px",
};

export const gradientText: CSSProperties = {
  background: "linear-gradient(135deg, #22c55e 0%, #eab308 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const heroSubtitle: CSSProperties = {
  fontSize: "17px",
  lineHeight: "1.6",
  color: emailColors.textMuted,
  margin: 0,
};

// ============================================
// GREETING & TEXT
// ============================================
export const greetingSection: CSSProperties = {
  padding: "0 40px 32px 40px",
};

export const greetingText: CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 16px 0",
};

export const nameHighlight: CSSProperties = {
  color: emailColors.primary,
  fontWeight: "800",
};

export const paragraphText: CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.75",
  color: emailColors.textBody,
  margin: "0 0 16px 0",
};

export const highlightStrong: CSSProperties = {
  color: emailColors.primary,
  fontWeight: "700",
};

// ============================================
// CTA BUTTON
// ============================================
export const ctaSection: CSSProperties = {
  textAlign: "center",
  padding: "40px",
};

export const ctaIntro: CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 20px 0",
};

export const ctaButton: CSSProperties = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
  padding: "18px 44px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "18px",
  fontFamily: emailFonts.heading,
  display: "inline-block",
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35)",
  border: "none",
  letterSpacing: "0.5px",
};

export const ctaSubtext: CSSProperties = {
  fontSize: "15px",
  color: emailColors.textMuted,
  margin: "18px 0 0 0",
  lineHeight: "1.5",
};

// ============================================
// FOOTER STYLES
// ============================================
export const footerSection: CSSProperties = {
  padding: "40px",
  textAlign: "center",
};

export const footerDivider: CSSProperties = {
  border: "none",
  borderTop: `1px solid ${emailColors.borderMuted}`,
  margin: "0 0 28px 0",
};

export const footerTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 12px 0",
};

export const footerText: CSSProperties = {
  color: emailColors.textMuted,
  fontSize: "15px",
  margin: "0 0 16px 0",
  lineHeight: "1.6",
};

export const footerLink: CSSProperties = {
  color: emailColors.primary,
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "16px",
};

export const socialText: CSSProperties = {
  color: emailColors.textMuted,
  fontSize: "14px",
  margin: "18px 0 0 0",
  lineHeight: "1.5",
};

export const copyrightText: CSSProperties = {
  color: "#64748b",
  fontSize: "13px",
  margin: "24px 0 0 0",
  lineHeight: "1.5",
};
