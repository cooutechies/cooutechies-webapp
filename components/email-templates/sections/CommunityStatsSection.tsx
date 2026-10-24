import * as React from "react";
import { Column, Row, Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailFonts } from "../styles/emailTheme";

const statsSection: CSSProperties = {
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  borderTop: "1px solid rgba(34, 197, 94, 0.1)",
  borderBottom: "1px solid rgba(34, 197, 94, 0.1)",
  padding: "36px 24px",
};

const statsHeading: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "20px",
  fontWeight: "800",
  color: "#f8fafc",
  textAlign: "center",
  margin: "0 0 28px 0",
  letterSpacing: "1px",
};

const statsRow: CSSProperties = {
  textAlign: "center",
};

const statColumn: CSSProperties = {
  width: "33.33%",
  textAlign: "center",
  padding: "0 6px",
};

const statNumber: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "36px",
  color: "#f8fafc",
  fontWeight: "900",
  background: "linear-gradient(135deg, #22c55e 0%, #eab308 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0 0 8px 0",
  lineHeight: "1",
};

const statLabel: CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontWeight: "600",
};

export function CommunityStatsSection() {
  return (
    <Section style={statsSection}>
      <Text style={statsHeading}>📊 Our Community Impact</Text>
      <Row style={statsRow}>
        <Column style={statColumn}>
          <Text style={statNumber}>500+</Text>
          <Text style={statLabel}>Active Members</Text>
        </Column>
        <Column style={statColumn}>
          <Text style={statNumber}>20+</Text>
          <Text style={statLabel}>Projects Built</Text>
        </Column>
        <Column style={statColumn}>
          <Text style={statNumber}>30+</Text>
          <Text style={statLabel}>Events Hosted</Text>
        </Column>
      </Row>
    </Section>
  );
}
