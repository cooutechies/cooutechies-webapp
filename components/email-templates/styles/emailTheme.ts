import type { CSSProperties } from "react";

export const emailColors = {
  primary: "#22c55e",
  primaryHover: "#16a34a",
  secondary: "#eab308",
  bgDark: "#0b0f19",
  textPrimary: "#f8fafc",
  textBody: "#cbd5e1",
  textMuted: "#94a3b8",
  borderLight: "rgba(255, 255, 255, 0.08)",
  cardSubtle: "#111827",
};

export const emailFonts = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

// ============================================
// SHARED SEAMLESS LAYOUT STYLES (No nested box!)
// ============================================
export const mainLayout: CSSProperties = {
  backgroundColor: emailColors.bgDark,
  fontFamily: emailFonts.body,
  padding: "24px 12px 40px 12px",
  margin: 0,
};

export const emailContainer: CSSProperties = {
  maxWidth: "580px",
  margin: "0 auto",
  backgroundColor: emailColors.bgDark,
};

// ============================================
// HEADER STYLES
// ============================================
export const headerSection: CSSProperties = {
  textAlign: "center",
  paddingBottom: "20px",
  borderBottom: `1px solid ${emailColors.borderLight}`,
  marginBottom: "28px",
};

export const headerLogo: CSSProperties = {
  display: "block",
  margin: "0 auto",
  width: "150px",
  height: "auto",
};

// ============================================
// BADGE STYLES
// ============================================
export const badgeSection: CSSProperties = {
  textAlign: "left",
  margin: "0 0 16px 0",
};

export const badgePill = (color = "#22c55e"): CSSProperties => ({
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  color,
  backgroundColor: `${color}15`,
  padding: "5px 12px",
  borderRadius: "16px",
  border: `1px solid ${color}35`,
  margin: "0 0 16px 0",
});

// ============================================
// TYPOGRAPHY
// ============================================
export const mainHeading: CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 14px 0",
  lineHeight: "1.35",
};

export const greetingText: CSSProperties = {
  fontSize: "17px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 12px 0",
};

export const paragraphText: CSSProperties = {
  fontSize: "17px",
  lineHeight: "1.75",
  color: emailColors.textBody,
  margin: "0 0 18px 0",
};

export const bulletPoint: CSSProperties = {
  fontSize: "17px",
  lineHeight: "1.75",
  color: emailColors.textBody,
  margin: "0 0 12px 0",
};

export const bulletIcon: CSSProperties = {
  color: emailColors.primary,
  fontWeight: "700",
  marginRight: "8px",
};

export const textMuted: CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: emailColors.textMuted,
  margin: "16px 0 0 0",
};

export const nameHighlight: CSSProperties = {
  color: emailColors.primary,
  fontWeight: "700",
};

export const highlightStrong: CSSProperties = {
  color: emailColors.textPrimary,
  fontWeight: "600",
};

// ============================================
// OPEN LIST / HIGHLIGHT SECTION (No cramped box!)
// ============================================
export const highlightsSection: CSSProperties = {
  margin: "24px 0",
  padding: "16px 0",
  borderTop: `1px solid ${emailColors.borderLight}`,
  borderBottom: `1px solid ${emailColors.borderLight}`,
};

export const highlightsTitle: CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 12px 0",
};

// ============================================
// CTA BUTTON
// ============================================
export const ctaSection: CSSProperties = {
  textAlign: "left",
  margin: "28px 0 16px 0",
};

export const ctaButton: CSSProperties = {
  backgroundColor: emailColors.primary,
  color: "#052e16",
  padding: "13px 26px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "15px",
  display: "inline-block",
};

export const ctaSubtext: CSSProperties = {
  fontSize: "13px",
  color: emailColors.textMuted,
  marginTop: "10px",
  marginBottom: 0,
};

// ============================================
// FOOTER STYLES
// ============================================
export const footerSection: CSSProperties = {
  marginTop: "36px",
  paddingTop: "24px",
  borderTop: `1px solid ${emailColors.borderLight}`,
  textAlign: "center",
};

export const footerLinks: CSSProperties = {
  fontSize: "13px",
  color: emailColors.textMuted,
  marginBottom: "12px",
};

export const footerLink: CSSProperties = {
  color: emailColors.primary,
  textDecoration: "none",
  fontWeight: "600",
  margin: "0 8px",
};

export const copyrightText: CSSProperties = {
  color: "#64748b",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "4px 0",
};
