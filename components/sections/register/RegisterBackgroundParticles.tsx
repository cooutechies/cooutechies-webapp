"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
  { id: 0, delay: 0, x: 15, size: 3 },
  { id: 1, delay: 0.8, x: 25, size: 2.5 },
  { id: 2, delay: 1.6, x: 40, size: 4 },
  { id: 3, delay: 2.4, x: 55, size: 2.8 },
  { id: 4, delay: 3.2, x: 70, size: 3.5 },
  { id: 5, delay: 4, x: 85, size: 3.2 },
  { id: 6, delay: 0.5, x: 10, size: 3.8 },
  { id: 7, delay: 1.2, x: 30, size: 2.2 },
  { id: 8, delay: 2, x: 50, size: 4.5 },
  { id: 9, delay: 2.8, x: 65, size: 3.0 },
  { id: 10, delay: 3.6, x: 80, size: 2.7 },
  { id: 11, delay: 4.4, x: 90, size: 3.4 },
];

function FloatingParticle({
  delay,
  x,
  size,
}: {
  delay: number;
  x: number;
  size: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute rounded-full bg-primary/40 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        filter: "blur(1px)",
      }}
      initial={{ opacity: 0, y: "100vh" }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        y: ["100vh", "-20vh"],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
}

export function RegisterBackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      {PARTICLES.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} x={p.x} size={p.size} />
      ))}
    </div>
  );
}
